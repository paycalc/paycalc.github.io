#!/usr/bin/env node
"use strict";
/* ============================================================================
   PayCalc engine regression harness — v2, refreshed 29 Jul 2026
   Against: paycalc.github.io @ 1b005a7 (post-Q-paypoints, post-no-gross-up)

   Run:   node tests/engine-regression.js            (from the repo root)
          node tests/engine-regression.js path/to/app.js
   Exit:  0 = all green. Open findings (section H) report separately and do
          NOT affect the exit code; when one flips to FIXED, move it into the
          main sections and delete it from H.

   Changelog vs the 27-Jul v1:
   - F6 re-pinned for the no-gross-up member contribution (payg 850/stsl 168/
     net 2770.27). F7 (flat-qual scenario) replaced by Q-classification pins
     F7–F9. B4 super-base invariant no longer references the removed r.QUAL.
     B7's r.QUAL pin removed (flat qualification setting is gone).
   - New guard sections: C (Q paypoints), D (TSV on leave, Dir 16/18 cl 10.1),
     E (member contribution, no gross-up), F (hdNone equivalence),
     G (migrateQual mapping).
   - H: open findings from the 29-Jul audit, with repro pins.
   ============================================================================ */
const fs = require('fs');
/* Defaults to the engine sitting next to this file's repo, so the usual case is
   just `node tests/engine-regression.js` with no argument. */
const path = process.argv[2] || require('path').join(__dirname, '..', 'assets', 'app.js');
if (!fs.existsSync(path)) { console.error('cannot find the engine at ' + path); process.exit(2); }
const src = fs.readFileSync(path, 'utf8');
const cut = src.lastIndexOf('\n', src.indexOf('============ FORMAT ============'));
const E = new Function('var state={ovr:{},scalePct:0};\n' + src.slice(0, cut) +
  '\nreturn {calc, currentRates, rateFor, scaleTax, PAYSCALE, QSCALE, R, SC, HELP_TFTR, HELP_NTFT, SCALE_TABLE};')();

const baseInput = {
  empType: 'Permanent', classCode: 'L5-1', customRate: '', hd: 'None', customHDRate: '',
  shiftClass: 'Auto', shiftClassHD: 'Auto', retention: 'Yes', tsv: 'None',
  ordHours: 76, ot: 0, ph: 0, quad: 0, hdOrd: 0, hdOT: 0, hdPH: 0, hdQuad: 0,
  leave: { sick: 0, ann: 0, lsl: 0, spec: 0 },
  phRdoDays: 0, inchargeNights: 0, otherTaxable: 0,
  scale: 'Auto', studyLoan: 'No', salSac: 'No — after-tax', memberPct: 5,
  extraSalSac: 0, customPreTax: 0, adminFee: 0, customPostTax: 0,
};
const I = over => {
  const o = Object.assign({}, baseInput, over || {});
  o.leave = Object.assign({ sick: 0, ann: 0, lsl: 0, spec: 0 }, (over && over.leave) || {});
  return o;
};
let pass = 0, fail = 0, open = 0;
const near = (a, b, eps) => Math.abs(a - b) <= (eps === undefined ? 0.011 : eps);
function ok(name, cond, detail) {
  if (cond) { pass++; console.log('  PASS  ' + name); }
  else { fail++; console.log('  FAIL  ' + name + (detail ? '  — ' + detail : '')); }
}
function eq(name, got, want, eps) { ok(name, near(got, want, eps), 'got ' + JSON.stringify(got) + ', want ' + JSON.stringify(want)); }
function openFinding(id, name, cond, detail) {
  open++;
  if (cond) console.log('  ' + id + ' FIXED (move to main sections)  ' + name);
  else console.log('  ' + id + ' OPEN  ' + name + (detail ? '  — ' + detail : ''));
}
function section(t) { console.log('\n== ' + t + ' =='); }

/* ============================================================================
   A. PINNED BASELINES — captured 29 Jul 2026 on official rates @ 1b005a7
   ============================================================================ */
section('A. Pinned baselines');
const PICK = r => ({ gross: r.gross, payg: r.payg, stsl: r.stsl, net: r.net, empSuper: r.empSuper, CSA: r.CSA, TSV: r.TSV, OPER: r.OPER, RET: r.RET, LAUN: r.LAUN });
const FIXTURES = [
  ['F1 perm L5-1 76h', I({}),
   { gross: 4462.34, payg: 1066, stsl: 0, net: 3237.54, empSuper: 568.95, CSA: 856.25, TSV: 0, OPER: 378.99, RET: 45, LAUN: 6.10 }],
  ['F2 casual L4-4 36ord+24hd(L5-1)', I({ empType: 'Casual', classCode: 'L4-4', hd: 'L5-1', ordHours: 36, hdOrd: 24, memberPct: 0 }),
   { gross: 4260.10, payg: 1000, stsl: 0, net: 3260.10, empSuper: 543.16, CSA: 832.53, TSV: 0, OPER: 299.20, RET: 35.53, LAUN: 4.82 }],
  ['F3 perm L4-4 64ord+12ann', I({ classCode: 'L4-4', ordHours: 64, leave: { ann: 12 } }),
   { gross: 4362.35, payg: 1034, stsl: 0, net: 3173.45, empSuper: 556.20, CSA: 835.22, TSV: 0, OPER: 378.99, RET: 45, LAUN: 5.14 }],
  /* F4 re-pinned 29 Jul after E1–E3 (worked PH). Three lines moved, all of them the
     fix landing: OPER 378.99 → 379.00 (76+4 PH hrs × $4.9867 now reaches the cap),
     so gross +1c; empSuper +$64.04 (Eph = 4 × 2.5 × $50.22368, × 12.75%); net −$10.03
     (member 5% now runs on the 4 PH hours at single time). CSA/TSV/RET/LAUN unmoved. */
  ['F4 perm L6-3 76ord+12ot+4ph+2quad', I({ classCode: 'L6-3', ordHours: 76, ot: 12, ph: 4, quad: 2 }),
   { gross: 7404.64, payg: 2170, stsl: 0, net: 5033.75, empSuper: 739.18, CSA: 1048.15, TSV: 0, OPER: 379.00, RET: 45, LAUN: 6.10 }],
  ['F5 casual L6-1 24ord+12spec', I({ empType: 'Casual', classCode: 'L6-1', ordHours: 24, leave: { spec: 12 }, memberPct: 0 }),
   { gross: 2745.58, payg: 516, stsl: 0, net: 2229.58, empSuper: 350.06, CSA: 393.47, TSV: 0, OPER: 179.52, RET: 21.32, LAUN: 1.93 }],
  /* F6 re-pinned 29 Jul: member contribution no longer grossed up (taxable higher) */
  ['F6 perm L4-2 38ord+38lsl, pre-tax salsac, HELP, +$200', I({ classCode: 'L4-2', ordHours: 38, leave: { lsl: 38 }, salSac: 'Yes — pre-tax', studyLoan: 'Yes', extraSalSac: 200 }),
   { gross: 4134.27, payg: 850, stsl: 168, net: 2770.27, empSuper: 527.12, CSA: 787.23, TSV: 0, OPER: 378.99, RET: 45, LAUN: 3.05 }],
  /* F7–F9: Q classifications (replaced the old flat-qual fixture) */
  ['F7 perm L3-Q 76h', I({ classCode: 'L3-Q' }),
   { gross: 3937.36, payg: 896, stsl: 0, net: 2903.23, empSuper: 502.01, CSA: 744.77, TSV: 0, OPER: 378.99, RET: 45, LAUN: 6.10 }],
  ['F8 casual L6-Q 60ord', I({ empType: 'Casual', classCode: 'L6-Q', ordHours: 60, memberPct: 0 }),
   { gross: 5196.78, payg: 1300, stsl: 0, net: 3896.78, empSuper: 662.59, CSA: 1046.44, TSV: 0, OPER: 299.20, RET: 35.53, LAUN: 4.82 }],
  ['F9 perm L5-Q 38ord+38spec', I({ classCode: 'L5-Q', ordHours: 38, leave: { spec: 38 } }),
   { gross: 4428.12, payg: 1054, stsl: 0, net: 3197.83, empSuper: 564.58, CSA: 475.28, TSV: 0, OPER: 378.99, RET: 45, LAUN: 3.05 }],
  /* A2 — Aurion Work Summary A (29 Jul 2026): permanent L5-4 Townsville, June
     fortnight = 28 worked + 48 recreation leave. Reproduces to the cent,
     including the laundry clawback for leave hours. PAYG/net not pinned —
     summaries aggregate pay events (see the 29-Jul evidence note). */
  ['A2 perm L5-4 28ord+48ann (Work Summary A)', I({ classCode: 'L5-4', ordHours: 28, leave: { ann: 48 }, tsv: 'Full rate' }),
   { gross: 4891.65, payg: 1202, stsl: 0, net: 3515.50, empSuper: 623.69, CSA: 939.02, TSV: 43.40, OPER: 378.99, RET: 45, LAUN: 2.25 }],
];
for (const [name, inp, want] of FIXTURES) {
  const got = PICK(E.calc(inp));
  const keys = Object.keys(want).filter(k => !near(got[k], want[k]));
  ok(name, keys.length === 0, keys.map(k => k + ': got ' + got[k].toFixed(2) + ' want ' + want[k].toFixed(2)).join('; '));
}

/* ============================================================================
   B. INVARIANTS
   ============================================================================ */
section('B. Invariants');

/* B1 net identity across a sweep */
{
  let bad = '';
  for (const ord of [0, 12, 38, 76, 80]) for (const ot of [0, 4, 12]) for (const cas of [true, false]) {
    const r = E.calc(I({ empType: cas ? 'Casual' : 'Permanent', ordHours: ord, ot, memberPct: cas ? 0 : 5,
      extraSalSac: 100, customPreTax: 50, adminFee: 1.35, customPostTax: 20, studyLoan: 'Yes' }));
    const recon = r.gross - r.sacTotal - r.payg - r.stsl - r.memAfter - r.otherDed;
    if (!near(recon, r.net, 1e-9)) bad = `ord=${ord} ot=${ot} cas=${cas}: net ${r.net} vs recon ${recon}`;
  }
  ok('net = gross − all deductions (30-case sweep)', bad === '', bad);
}

/* B2 fortnight caps hold with hours stacked past 76 */
{
  const r = E.calc(I({ classCode: 'L4-4', ordHours: 64, hd: 'L5-1', hdOrd: 12, tsv: 'Full rate',
    leave: { sick: 12, ann: 12, lsl: 12, spec: 12 } }));
  eq('TSV pins at full $43.40 in pile-up', r.TSV, 43.40);
  eq('RET pins at full $45.00', r.RET, 45.00);
  eq('OPER pins at $379.00 cap', r.OPER, 379.00);
  ok('LAUN ≤ $6.10', r.LAUN <= 6.101, 'LAUN=' + r.LAUN);
}

/* B3 casual leave rules (settled 26 Jul 2026 — guard them) */
{
  const mk = lv => E.calc(I({ empType: 'Casual', classCode: 'L4-4', ordHours: 64, leave: lv, memberPct: 0 }));
  const base = mk({});
  eq('casual sick leave pays $0', mk({ sick: 12 }).Eord, base.Eord);
  eq('casual annual leave pays $0', mk({ ann: 12 }).Eord, base.Eord);
  const lsl = mk({ lsl: 12 });
  eq('casual LSL paid at loaded base', lsl.Eord - base.Eord, 12 * 40.76316 * 1.25);
  ok('casual LSL keeps CSA + operational', near(lsl.CSA - base.CSA, 12 * 40.76316 * 1.25 * 0.2696) &&
     near(lsl.OPER - base.OPER, 12 * 4.9867));
  const spec = mk({ spec: 12 });
  eq('casual special leave paid at loaded base (deliberate — payslip-matching)', spec.Eord - base.Eord, 12 * 40.76316 * 1.25);
  ok('casual special keeps operational but NOT CSA', near(spec.OPER - base.OPER, 12 * 4.9867) && near(spec.CSA, base.CSA));
  const t = E.calc(I({ empType: 'Casual', ordHours: 76, tsv: 'Full rate', phRdoDays: 1, memberPct: 0 }));
  eq('casual TSV forced to $0', t.TSV, 0);
  eq('casual PH-on-RDO forced to $0', t.Ephrdo, 0);
}

/* B4 super base: 12.75% × OTE — includes laundry/CSA/TSV/oper/ret/inch (+qual via Eord
      for Q classifications) and, from 29 Jul (E2, Work Summary B), worked public
      holidays at the full ×2.5; excludes OT/quad/other-taxable */
{
  const r = E.calc(I({ ordHours: 76, ot: 12, ph: 12, quad: 2, otherTaxable: 500,
    inchargeNights: 3, tsv: 'Full rate' }));
  const want = 0.1275 * (r.Eord + r.Ephrdo + r.Eph + r.hdOrd * r.HDRate + r.CSA + r.TSV + r.OPER + r.RET + r.LAUN + r.INCH);
  eq('employer super = 12.75% × OTE exactly', r.empSuper, want);
  const q = E.calc(I({ classCode: 'L4-Q', ordHours: 76 }));
  eq('Q classification: super = 12.75% × gross exactly (qual inside base)', q.empSuper, 0.1275 * q.gross);
}

/* B5 tax spots (ATO NAT 1004 Sch 1 / NAT 3539 Sch 8, fortnightly halving method) */
{
  eq('PAYG scale 1 @ 4462.34', E.scaleTax(E.SC['1'], 4462.34), 1286, 0);
  eq('PAYG scale 2 @ 4462.34', E.scaleTax(E.SC['2'], 4462.34), 1066, 0);
  eq('PAYG scale 3 @ 4462.34', E.scaleTax(E.SC['3'], 4462.34), 1338, 0);
  eq('PAYG scale 5 @ 4462.34', E.scaleTax(E.SC['5'], 4462.34), 976, 0);
  eq('PAYG scale 6 @ 4462.34', E.scaleTax(E.SC['6'], 4462.34), 1020, 0);
  eq('PAYG scale 2 @ 1200', E.scaleTax(E.SC['2'], 1200), 84, 0);
  eq('HELP TFTR @ 4462.34', E.scaleTax(E.HELP_TFTR, 4462.34), 268, 0);
  eq('HELP TFTR nil @ 2674 (≈ $1,337/wk)', E.scaleTax(E.HELP_TFTR, 2674), 0, 0);
  eq('HELP NTFT @ 4462.34', E.scaleTax(E.HELP_NTFT, 4462.34), 376, 0);
}

/* B6 casual loading composition */
{
  const r = E.calc(I({ empType: 'Casual', classCode: 'L4-4', ordHours: 12, memberPct: 0 }));
  eq('casual L4-4 rate = 40.76316 × 1.25 = 50.95395', r.BaseRate, 50.95395, 1e-9);
}

/* B7 pass-through lines */
{
  const r = E.calc(I({ ordHours: 76, inchargeNights: 2 }));
  eq('in-charge 2 × $15.65', r.INCH, 31.30);
  ok('no QUAL field on the result (flat setting removed)', r.QUAL === undefined);
  /* Overtime meal allowance removed 29 Jul 2026 — meals are provided on site and it
     has never appeared on a payslip. It must not come back as a silent term. */
  ok('no OTMEAL term on the result', r.OTMEAL === undefined);
  ok('no otMeal rate in R', E.R.otMeal === undefined);
}

/* B8 zero hours → zero dollars, no NaN */
{
  const r = E.calc(I({ ordHours: 0, memberPct: 5 }));
  const nums = Object.values(r).filter(v => typeof v === 'number');
  ok('all-zero input: no NaN in result', nums.every(v => !isNaN(v)));
  eq('all-zero input: gross $0', r.gross, 0);
  eq('all-zero input: net $0', r.net, 0);
}

/* ============================================================================
   C. Q PAYPOINTS (28 Jul 2026 — qualification folded into the rate)
   ============================================================================ */
section('C. Q paypoints');
{
  const want = { 'L3-Q': [2721, 41.5, '36.34868', '45.43586'], 'L4-Q': [3098, 42.8, '41.32632', '51.65789'],
                 'L5-Q': [3483, 42.8, '46.39211', '57.99013'], 'L6-Q': [3817, 44.6, '50.81053', '63.51316'] };
  for (const code of Object.keys(want)) {
    const [fn, al, pStr, cStr] = want[code];
    eq(code + ' perm = (salary+allow)/76', E.rateFor(code, false, 1, E.R), (fn + al) / 76, 1e-9);
    eq(code + ' casual = ×1.25 after the fold', E.rateFor(code, true, 1, E.R), (fn + al) / 76 * 1.25, 1e-9);
    eq(code + ' perm prints ' + pStr, E.rateFor(code, false, 1, E.R).toFixed(5), pStr);
    eq(code + ' casual prints ' + cStr, E.rateFor(code, true, 1, E.R).toFixed(5), cStr);
  }
  /* wage-case preview: salary scales with whole-$ rounding, allowance flat */
  eq('L3-Q +3.5% perm', E.rateFor('L3-Q', false, 1.035, E.R), (Math.round(2721 * 1.035) + 41.5) / 76, 1e-9);
  eq('L6-Q +3.5% casual', E.rateFor('L6-Q', true, 1.035, E.R), (Math.round(3817 * 1.035) + 44.6) / 76 * 1.25, 1e-9);
  /* shift-class slice test: L6-Q must draw 27.46% */
  eq('L6-Q draws 27.46% CSA', E.calc(I({ classCode: 'L6-Q' })).G50, 0.2746, 1e-9);
  eq('L5-Q draws 26.96% CSA', E.calc(I({ classCode: 'L5-Q' })).G50, 0.2696, 1e-9);
  /* CSA picks up the in-rate qualification */
  const dq = E.calc(I({ classCode: 'L3-Q' })), dp = E.calc(I({ classCode: 'L3-4' }));
  eq('L3-Q − L3-4 CSA = $41.50 × 26.96% ≈ $11.19', dq.CSA - dp.CSA, 41.5 * 0.2696);
}

/* ============================================================================
   D. TSV ON LEAVE — Directive 16/18 cl 10.1 (payable on any full-salary leave)
   ============================================================================ */
section('D. TSV on leave (16/18 cl 10.1)');
{
  const tsv = lv => E.calc(I({ classCode: 'L5-1', ordHours: 38, leave: lv, tsv: 'Full rate' })).TSV;
  const fullWorked = E.calc(I({ classCode: 'L5-1', ordHours: 76, tsv: 'Full rate' })).TSV;
  eq('38ord+38ann: TSV still full $43.40', tsv({ ann: 38 }), 43.40);
  eq('38ord+38lsl: TSV still full $43.40', tsv({ lsl: 38 }), 43.40);
  eq('38ord+38sick: TSV still full $43.40', tsv({ sick: 38 }), 43.40);
  eq('38ord+38spec: TSV still full $43.40', tsv({ spec: 38 }), 43.40);
  ok('full worked week TSV equals all leave-week TSVs', [tsv({ ann: 38 }), tsv({ lsl: 38 }), tsv({ sick: 38 }), tsv({ spec: 38 })].every(v => near(v, fullWorked)) && near(fullWorked, 43.40));
}

/* ============================================================================
   E. MEMBER CONTRIBUTION — no gross-up (payslip-verified 27 Jul 2026)
   ============================================================================ */
section('E. Member contribution');
{
  const pre = E.calc(I({ classCode: 'L5-2', salSac: 'Yes — pre-tax' }));
  const post = E.calc(I({ classCode: 'L5-2', salSac: 'No — after-tax' }));
  eq('pre-tax: 5% of $3,276.00 = $163.80 (no ÷0.85)', pre.salsac, 163.80);
  eq('after-tax member equals pre-tax amount', post.memAfter, pre.salsac);
  eq('pre-tax reduces taxable by the contribution', pre.taxable, pre.gross - 163.80);
  /* base = ordinary earnings + HD ordinary only — no CSA/allowances */
  const hd = E.calc(I({ classCode: 'L4-4', ordHours: 64, hd: 'L5-1', hdOrd: 12, salSac: 'Yes — pre-tax' }));
  eq('member % on Eord + hdOrd×HDRate only', hd.salsac, 0.05 * (hd.Eord + 12 * hd.HDRate));
}

/* ============================================================================
   F. HD = NONE — pays as ordinary hours at the substantive rate (fixed 27 Jul)
   ============================================================================ */
section('F. hdNone equivalence');
{
  for (const cc of ['L3-1', 'L4-4', 'L6-3', 'L3-Q', 'L6-Q']) for (const emp of ['Permanent', 'Casual']) {
    const a = E.calc(I({ classCode: cc, empType: emp, ordHours: 64, hdOrd: 12, hd: 'None', memberPct: 0 }));
    const b = E.calc(I({ classCode: cc, empType: emp, ordHours: 76, memberPct: 0 }));
    ok(cc + ' ' + emp + ': 64+12 HD(None) ≡ 76 ord', near(a.gross, b.gross, 0.005) && near(a.net, b.net, 0.005) && near(a.CSA, b.CSA, 0.005));
  }
  const r = E.calc(I({ classCode: 'L4-4', ordHours: 64, hdOrd: 12, hd: 'None' }));
  ok('hdNone flag set', r.hdNone === true);
  eq('hdNone HDRate = BaseRate', r.HDRate, r.BaseRate, 1e-12);
  /* F2, landed 29 Jul: HD = Custom with the rate box empty is the same unfinished
     input as HD = None, and must behave identically rather than paying $0. */
  const empty = E.calc(I({ classCode: 'L4-4', ordHours: 64, hd: 'Custom', customHDRate: '', hdOrd: 12 }));
  const none = E.calc(I({ classCode: 'L4-4', ordHours: 64, hd: 'None', hdOrd: 12 }));
  ok('F2 HD=Custom with empty rate ≡ HD=None', near(empty.Ehd, none.Ehd, 0.005) && near(empty.CSA, none.CSA, 0.005) && near(empty.gross, none.gross, 0.005));
  ok('F2 sets hdNone so the page warns', empty.hdNone === true);
  eq('F2 pays those hours at base, not $0', empty.Ehd, 12 * empty.BaseRate, 0.005);
  /* ...but a rate that IS typed must still be honoured. */
  const typed = E.calc(I({ classCode: 'L4-4', ordHours: 64, hd: 'Custom', customHDRate: 52.23684, hdOrd: 12 }));
  ok('F2 guard does not swallow a typed custom HD rate', typed.hdNone === false && near(typed.HDRate, 52.23684, 1e-9));
}

/* ============================================================================
   G. migrateQual — old saved setups upgrade to Q codes (extracted from source)
   ============================================================================ */
section('G. migrateQual');
{
  const qs = src.match(/const QSCALE=\[[\s\S]*?\];/)[0];
  const mq = src.match(/function migrateQual\(saved\)\{[\s\S]*?\n\}/)[0];
  const cases = [
    [{ qual: 'Cert IV', classCode: 'L3-4' }, 'L3-Q'], [{ qual: 'Diploma', classCode: 'L4-4' }, 'L4-Q'],
    [{ qual: 'Diploma', classCode: 'L5-4' }, 'L5-Q'], [{ qual: 'Adv Diploma', classCode: 'L6-3' }, 'L6-Q'],
    [{ qual: 'Cert IV', classCode: 'L3-2' }, 'L3-2'],           // never payable — untouched
    [{ qual: 'Diploma', classCode: 'L4-2' }, 'L4-2'],           // never payable — untouched
    [{ qual: 'None', classCode: 'L5-1' }, 'L5-1'],
    [{ qual: 'Adv Diploma', classCode: 'L3-4' }, 'L3-Q'],       // mismatch — level wins (EBA 4.1(a) "or higher")
    [{ qual: 'Cert IV', classCode: 'L3-Q' }, 'L3-Q'],           // already migrated
  ];
  new Function('state', 'cases', 'report', qs + '\n' + mq + '\n' + `
    for (const [saved, want] of cases) {
      state = { classCode: saved.classCode, qual: saved.qual };
      migrateQual(saved);
      report('migrate ' + saved.classCode + ' + ' + saved.qual + ' → ' + want,
        state.classCode === want && state.qual === undefined,
        'got ' + state.classCode + ', qual still ' + state.qual);
    }`)({}, cases, (n, c, d) => ok(n, c, d));
}

/* ============================================================================
   H. OPEN FINDINGS (29 Jul 2026 audit) — repro pins. Not counted in pass/fail.
      When a fix lands and the pin flips to FIXED, move it into the main
      sections above and delete it here.
   ============================================================================ */
/* ============================================================================
   H. Worked public holidays — E1–E3, landed 29 Jul 2026
   Aurion Work Summary B: fortnight 4–17 Apr 2026, permanent L5-4 Townsville,
   53.5 ordinary + 22.5 worked PH hours (Easter), member 5% after-tax.
   Payroll pays all four flat allowances at their full 76-hour value, pays
   employer super on the PH earnings (penalty included), counts PH base hours
   in the member % base, and keeps CSA off PH hours entirely.
   PAYG/net deliberately not pinned — a summary aggregates pay events.
   ============================================================================ */
section('H. Worked public holidays (Work Summary B)');
{
  const r = E.calc(I({ classCode: 'L5-4', ordHours: 53.5, ph: 22.5, tsv: 'Full rate' }));
  eq('E1 TSV pays full $43.40 on a PH fortnight', r.TSV, 43.40);
  eq('E1 operational pays full $378.99', r.OPER, 378.99);
  eq('E1 retention pays full $45.00', r.RET, 45.00);
  eq('E1 laundry pays full $6.10', r.LAUN, 6.10);
  eq('E1 gross reproduces Summary B', r.gross, 6164.24);
  eq('E2 employer super = 12.75% × 6,164.24', r.empSuper, 785.94);
  eq('E3 member 5% × 3,483.00 (ord + PH at single time)', r.memAfter, 174.15);
  eq('CSA excludes PH hours (ordinary dollars only)', r.CSA, 661.02);
  /* The base lines payroll printed separately: PH at single time, then the
     "Public Holiday Rostered On 150%" top-up. The engine's combined ×2.5 is
     the same money — check it splits back to the two printed figures. */
  eq('PH single time 10.5h + 12h = 1,031.15', 22.5 * r.BaseRate, 1031.15);
  eq('PH 150% top-up = 1,546.73', 22.5 * r.BaseRate * 1.5, 1546.73);
  eq('Eph is the two combined', r.Eph, 1031.15 + 1546.73);
  /* Still deliberately excluded — no summary or payslip has evidenced them. */
  const ot = E.calc(I({ classCode: 'L5-4', ordHours: 53.5, ot: 22.5, tsv: 'Full rate' }));
  ok('overtime hours still excluded from the caps (unevidenced)',
    near(ot.LAUN, 53.5 * E.R.laun) && near(ot.OPER, 53.5 * E.R.oper));
}

section('I. Open findings');
/* F2 landed 29 Jul 2026 — pins promoted to section F above. */
/* E1–E3 landed 29 Jul 2026 — pins promoted to section H above. */

/* F1 — workbook-only: Tax Engine F6 returns 0 when B7="None" while HD hours are
        entered. Not testable from this harness; verify in the spreadsheet:
        perm L4-4, 64 ord + 12 HD ord, B7=None → J47 should equal 12×BaseRate. */
/* F4 resolved 29 Jul 2026 — chosen behaviour: WARN, don't substitute. Unlike the
   higher-duties case there is no substantive rate to fall back on, so the engine
   flags customBaseEmpty and the page shows a warning under the classification. */
{
  const r = E.calc(I({ classCode: 'Custom', customRate: '', ordHours: 76 }));
  ok('F4 flags a Custom classification with no rate typed', r.customBaseEmpty === true);
  eq('F4 base pay is still $0 (nothing to fall back to)', r.Eord, 0);
  const typed = E.calc(I({ classCode: 'Custom', customRate: 45, ordHours: 76 }));
  ok('F4 flag clears once a rate is typed', typed.customBaseEmpty === false);
  eq('F4 typed custom rate is honoured', typed.Eord, 76 * 45);
  const listed = E.calc(I({ classCode: 'L5-1', ordHours: 76 }));
  ok('F4 flag never fires on a listed classification', listed.customBaseEmpty === false);
}

console.log('\n========================================');
console.log('PASS: ' + pass + '   FAIL: ' + fail + '   OPEN: ' + open);
process.exit(fail ? 1 : 0);
