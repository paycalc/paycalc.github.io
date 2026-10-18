# Source instruments — verification register

Every rate and rule in PayCalc has been checked against the primary document it
comes from. This file records **what was checked, against which version, and
what would make it stale.**

The documents themselves are **not kept here.** They were read in full on
26 July 2026, everything was verified, and the findings are written down — in
this file, in `CLAUDE.md`, on the Rates page and in the workbook. There is
nothing left to re-check until a **newer version of an instrument is issued**,
and the triggers for that are listed below. Links to the official copies are in
the table; if a session genuinely needs to read a clause again, ask Jaycob to
supply the document.

---

## ⚠ Re-check triggers

| When | What happens | What to do |
|---|---|---|
| **31 Jul 2026** | EBA CB/2023/139 reaches **nominal expiry**. It keeps operating until replaced, so not an automatic problem — but a replacement is imminent. | Ask whether the YDC 2026 agreement has been certified. If it has, everything below is out of date. *(Passed. Agreed in principle late Sep 2026, not yet certified — see the 18 Oct status below.)* |
| ~~**~1 Sep 2026**~~ | ~~State Wage Case 2026.~~ **Done 18 Oct 2026** — 4.75% from 1 Sep 2026, applied from the 1 Sep 2026 award reprint. See the 18 Oct status below. | — |
| **On payslips from 28 Oct 2026** | Owner-supplied: payroll starts paying the 2026 rates from 28 Oct 2026. | The first payslip at the new rates is the 2026 confirmation — see "What the next payslip should show" below. |
| **On certification of the YDC 2026 agreement** | Its rises build a **separate agreement ladder** against the award floor (EBA 2.18(6)); they are never added to the award table. | Read the certified text before touching rates. If its first rise is below 4.75% on the 31 Jul 2026 award rates (the July offer's was 3.5%), the 2026 award rates stay the higher ladder. |
| **~1 Sep 2027** | **State Wage Case 2027.** Moves the award pay scale, and the in-charge allowance with it (Award 13.7(a)). Laundry, overtime meal and motor vehicle move separately by CPI (13.7(b)–(c), ABS Table 18 sub-groups) — do **not** apply the wage-case percentage to those. | Get the new award reprint and re-verify clause 12.2, 13.2 and 13.6(b). **Round each new fortnightly salary to a whole dollar before dividing by 76.** |
| **1 Sep 2027** | The site's rates ribbon flips itself to amber "Check rates" (`validUntil` in `assets/app.js`; `RatesValidUntil` = Settings & Rates B49 in the workbook). | Push both forward only after actually re-checking. |
| **1 Jul 2027** | ATO bottom marginal rate 15% → 14%. Schedules 1 and 8 reissued. | Get the new Schedule 1 and re-verify the five scale tables in `assets/app.js`. |

If today's date is past a trigger, say so rather than assuming the figures still
hold.

**Trigger status — checked 29 Jul 2026:**

- **EBA CB/2023/139** — no replacement certified. QIRC's public service agreements
  listing still carries the 2023 agreement and nothing later for youth detention.
  Its nominal expiry is **in two days (31 Jul 2026)**; it keeps operating until
  replaced, so nothing changes on the day, but a replacement is close enough that
  it is worth asking about at every session from here.
- **State Wage Case 2026** — no decision published. The outside audit reports the
  applications were filed 2 Jun 2026 (**B/2026/59, B/2026/60**) seeking increases
  operative 1 Sep 2026 and still in submissions; a search on 29 Jul turned up the
  2025 decision (B/2025/49-50) and no 2026 one, which is consistent. The site's
  "~1 Sep 2026" expectation is on track.
- Both of the above are **absence-of-evidence checks** — a public search found
  nothing newer, which is not the same as a registry confirming nothing exists.
  Ask Jaycob if a date turns on it.

**Trigger status — updated 5 Aug 2026 (owner-supplied):**

- **The 31 Jul 2026 nominal-expiry trigger has passed.** Jaycob confirms the
  replacement agreement is **delayed** — the department has not responded to
  the unions' claims and industrial action is ongoing. Nothing has been
  certified, so CB/2023/139 keeps operating and every figure below stands.
  The Rates page carries the same status. Check again when the industrial
  action resolves or at the ~1 Sep 2026 wage case, whichever comes first.

**Trigger status — updated 18 Oct 2026 (the 2026 wage case is applied):**

- **State Wage Case 2026 — decided and applied.** Declaration of General Ruling
  (State Wage Case 2026) (No. 2) **[2026] QIRC 281**, matters **B/2026/59 and
  B/2026/60**, delivered 4 Sep 2026, operative **1 Sep 2026**: award wages
  **+4.75%** ([1](a)); casual rates follow the award's own method ([1](c));
  work-related monetary allowances +4.75% ([1](g)); expense allowances by Eight
  Capitals CPI ([1](h)); fortnightly salaries rounded to the nearest **$1**
  ([1](i)); no application to agreement-only figures ([4](a)) or locality
  allowances ([4](b)). Read directly from qirc.qld.gov.au (the QIRC PDFs fetched
  this time, unlike earlier sessions).
- **Award reprint read in full, 18 Oct 2026** — all 37 pages, matter
  B/2026/59–60, certified by the Registrar **11 Sep 2026**, operative
  **1 Sep 2026**. What changed for the calculator: cl 12.2 (all 15 salaries),
  13.2 in-charge **$16.39** (was $15.65), 13.6(b) laundry **$6.30/fn** (was
  $6.10). Also changed but not built: 13.5 overtime meal **$18.10** (was
  $17.35), 13.4 motor vehicle **$1.00/km** (was $0.99; motorcycle still $0.34).
  13.7(c) now cites **ABS Table 18** sub-groups (private motoring; take-away and
  fast foods; clothing and footwear), all "last adjusted 1 September 2026".
  Everything else the calculator relies on — 8.2, 8.3, 12.7, 15.5, 18.3, 18.4,
  19.1, 22, 23.1, 23.4 — reads as before.
- **Why the 4.75% reaches pay at all** (the General Ruling alone doesn't apply
  to agreement-covered staff, [4](a)): EBA CB/2023/139 **cl 2.18(6)** — *"no
  person covered by this Agreement will receive a rate of pay which is less than
  the corresponding rate of pay in the relevant parent award"* — and **2.18(5)**,
  *"Any increases in monetary amounts or other entitlements as a result of
  Commission decisions … will be applied"*; also 1.5(3), awards "as amended".
  Measured against the agreement's own Appendix 1 (final rates, 1 Aug 2025): the
  2025 award sat **1.44–1.53%** above them, the 2026 award sits **6.26–6.34%**
  above. *Read 18 Oct 2026: EBA 1.5, 2.1, 2.9–2.13, 2.18, 4.1–4.2 and Appendix 1
  only — not the whole agreement.*
- **Owner-supplied, 18 Oct 2026:** payroll starts paying the new rates from
  **28 Oct 2026**. The award has been operative since 1 Sep, so the
  1 Sep–27 Oct difference would ordinarily be owed as back pay — expect
  "Adjustments to Past Pays" lines; not modelled, not confirmed.
- **YDC 2026 agreement — agreed in principle, not certified.** ABC News
  (30 Sep 2026) reported an in-principle deal between the government and the
  AWU, Together and UWU after months of industrial action, still to go to a
  staff vote. Owner-supplied 18 Oct 2026: the agreement is still being written
  up. CB/2023/139 keeps operating; nothing changes until certification.
- `validUntil` (site) and `RatesValidUntil` (workbook B49) moved to
  **1 Sep 2027**.

---

## What was verified, and against what

| Instrument | Version checked | Result |
|---|---|---|
| [Youth Detention Centre Employees Award – State 2016](https://www.qirc.qld.gov.au/sites/default/files/2026-09/youth_detention_010926.pdf) | QIRC reprint under s 980, matter **B/2026/59 and B/2026/60**, certified 11 Sep 2026, operative **1 Sep 2026** — read in full 18 Oct 2026. *(Before that: B/2025/49–50, certified 5 Sep 2025, operative 1 Sep 2025, read 26 Jul 2026.)* | ✅ Pay scale and every award rule below |
| [General Ruling — State Wage Case 2026](https://www.qirc.qld.gov.au/sites/default/files/2026-09/2026_b59_b60_declaration_0.pdf) | [2026] QIRC 281, delivered 4 Sep 2026, operative **1 Sep 2026** | ✅ 4.75%, rounding rules, the CPI and agreement exclusions |
| [YDC Certified Agreement 2023](https://www.qirc.qld.gov.au) | **CB/2023/139**, certified 7 Dec 2023, nominal expiry **31 Jul 2026** | ✅ All allowances below |
| [ATO Schedule 1 (NAT 1004)](https://www.ato.gov.au/tax-rates-and-codes/payg-withholding-schedule-1-statement-of-formulas-for-calculating-amounts-to-be-withheld) | Applies from **1 Jul 2026**, PDF built 16 Jun 2026 | ✅ All five PAYG scales, exact |
| [ATO Schedule 8 (NAT 3539)](https://www.ato.gov.au/tax-rates-and-codes/schedule-8-statement-of-formulas-for-calculating-study-and-training-support-loans-components) | Applies from **1 Jul 2026** | ✅ Both STSL coefficient tables, exact |
| [Special Leave — Directive 12/24](https://www.forgov.qld.gov.au/pay-benefits-and-policy/directives-policies-circulars-and-guidelines/special-leave-directive-1224) | Effective **30 Sep 2024**, supersedes 05/17 | ✅ cl 4.2, cl 9 |
| [Locality Allowances — Directive 16/18](https://www.forgov.qld.gov.au/pay-benefits-and-policy/directives-policies-circulars-and-guidelines/locality-allowances-directive-1618) | Effective **11 May 2018**, supersedes 19/99 | ✅ TSV rates, exact |
| [Higher Duties — Directive 16/24](https://www.forgov.qld.gov.au/pay-benefits-and-policy/directives-policies-circulars-and-guidelines/higher-duties-directive-1624) | Made under the *Public Sector Act 2022* | ✅ cl 4.2, 7.1, 7.4, 9.1, 10.1, 11, 15 |
| [Recreation Leave — Directive 11/24](https://www.forgov.qld.gov.au/pay-benefits-and-policy/directives-policies-circulars-and-guidelines/recreation-leave-directive-1124) | Effective **30 Sep 2024**, supersedes 04/17 | ✅ Sch 1 cl 2.1, cl 5.1–5.2 · 🚩 cl 16.1, see below |
| [Domestic Travelling & Relieving Expenses — Directive 13/23](https://www.forgov.qld.gov.au/pay-benefits-and-policy/directives-policies-circulars-and-guidelines/domestic-travelling-and-relieving-expenses-directive-1323) | Rates schedule effective **1 Sep 2025**, tracking ATO TD 2025/4 | ✅ Informs the "other taxable earnings" line only |

### The pay scale — the most important finding

Award **cl 12.2** prints the fortnightly salaries as **whole dollars**, footnoted
*"Rounded to the nearest dollar"*. From **1 Sep 2026** (reprint B/2026/59–60):
2684 / 2735 / 2793 / 2850 · 2965 / 3059 / 3154 / 3245 · 3327 / 3432 / 3542 /
3648 · 3802 / 3903 / 3998. All fifteen match the calculator and the workbook
exactly, and each is the 2025 figure × 1.0475 rounded to the nearest dollar —
the General Ruling's own [1](i) rounding — so the convention below held for a
second wage case. *(2025 reprint, for reconciling earlier payslips: 2562 / 2611
/ 2666 / 2721 · 2831 / 2920 / 3011 / 3098 · 3176 / 3276 / 3381 / 3483 · 3630 /
3726 / 3817.)* Award **cl 8.3(c)** defines an hour as *"1/76th of the minimum
fortnightly rate"* — that is where the ÷76 comes from, and it is the award's own
arithmetic, not a convention we chose.

### Clause register — verified, don't re-derive

- Casual loading 25% — Award 8.3(c). Paid instead of annual leave,
  personal/carer's leave, notice, redundancy — **8.3(e)**. Counts for overtime,
  weekend, PH and shift payments — also 8.3(e). Casual LSL — 8.3(h) → cl 22(a).
- CSA 26.96% (OO3–OO5) / 27.46% (OO6) — EBA 2.9(4). Payable on recreation and
  long service leave only, in lieu of loading — 2.9(5). Not on overtime
  2.9(6)(i), PH hours (ii), RDO/TOIL (iii), other leave (iv).
- Operational $4.9867/hr, cap $379/fn from 1 Aug 2025 — EBA 2.10(3)(ii). On
  annual, LSL and special leave, not sick — 2.10(4)(iii), (5). In the super base
  — 2.10(6). Not in the CSA base — 2.10(7).
- Retention $45.00/fn after 2 years — EBA 2.12(1); all-purpose 2.12(2); in OTE
  2.12(3); **pro-rata for part-time and casual 2.12(4)**; not indexed 2.12(5).
- Laundry **$6.30/fn** — Award 13.6(b) (was $6.10 to 31 Aug 2026; moves by CPI,
  13.7(b)). In-charge **$16.39/shift** — 13.2 (was $15.65; moves with the wage
  case, 13.7(a)). **Overtime meal $18.10 — 13.5** (was $17.35; not built, see
  CLAUDE.md), another for each further 4 hrs continuous 13.5(e), and one if
  cancelled overtime spoiled a brought meal 13.5(f).
- Qualification $41.50 / $42.80 / $44.60 — EBA 4.2. Casual rule: one calendar
  year **and** 1,200 hours at the maximum paypoint — **EBA 4.1(c)**. The site maps
  these to levels (OO3 / OO4–OO5 / OO6); see the "Q" entry below, which is the only
  independent test that mapping has had.
- Higher duties — **Award 12.7** (the EBA has no 12.7): first paypoint of the
  higher level, after 3 consecutive days, or **one full shift** for youth
  worker→section supervisor and section→shift supervisor. Directive 16/24 pays a
  "relevant percentage" of the difference (cl 9.1) and **excludes casuals**
  (cl 4.2(b)).
- Overtime — shift workers are **flat double time**, Award 18.3(a). The
  time-and-a-half ladder in 18.2 is the day-worker rule. Recall min 2 hrs — 18.4.
- PH worked ×2.5, 4-hour minimum — Award 23.1(c). **Quad ×4** — Award 23.1(b):
  PH overtime pays double the overtime rate, and a shift worker's overtime rate
  is already double.
- PH on an RDO — extra day's wage, 7.6 hrs full-time, **casuals excluded** —
  Award 23.4.
- 17.5% leave loading — **Award 19.1(a)(ii)**, employees *other than* shift
  workers. The 14%-over-five variant is **EBA 2.13(2)(ii)** and covers Cleveland
  staff under the *General Employees* award, not us.
- Award floor prevails over the agreement — EBA 2.18(6).
- TSV — Townsville **$43.40/fn**, half rate **$21.70** where there's no dependent
  spouse, de facto or child (Directive 16/18 cl 6). Half rate also applies with a
  dependent child if the spouse is separately eligible — cl 8.1.
- Paid special leave exists **only** under Directive 12/24, whose **cl 4.2**
  excludes casuals except for unpaid bereavement and compassionate leave. Its
  cl 9 defines *full pay* as the ordinary rate "inclusive of any fixed allowances
  that are part of the regular fortnightly pay, excluding shift penalties and
  consolidated shift allowance payments" — which is why special leave keeps
  retention/TSV but gets no CSA.
- Recreation leave — five weeks for continuous shift workers (Dir 11/24 Sch 1
  cl 2.1(b), or 25 days outright in the Northern/Western region); half-pay
  recreation leave is a real entitlement (cl 5.1–5.2).
- **PAYG** — Schedule 1 scales 1, 2, 3, 5 and 6, every threshold and both
  coefficients. Scale 4 (no TFN) exists but isn't offered. **STSL** — Schedule 8,
  both tables: nil under $1,337/wk then 0.15/200.5615, 0.17/250.4527, 0.10/0 with
  the threshold claimed; nil under $987 then 0.15/148.0615, 0.17/190.9527, 0.10/0
  without. Coefficients are **weekly**; the fortnightly method (halve, drop cents,
  add 99c, apply, round, double) is the ATO's own. The workbook uses the same two
  tables at `LU_Scale_HELP_TFTR` / `LU_Scale_HELP_NTFT` and matches.
- **Which STSL table a foreign resident uses (scale 3)** — the calculator sends
  every scale except scale 1 to the threshold-claimed table, so a foreign
  resident lands on TFTR. An outside audit (27 Jul 2026) flagged this as a
  possible bug, reasoning that a foreign resident can't claim the threshold and
  so should use the no-threshold table. **The ATO groups them the other way.**
  Its own STSL tax tables (NAT 2173/2185) head that column *"claiming the
  tax-free threshold **or who are a foreign resident**"*, and the rate band it
  describes is the TFTR one. So the calculator is right, and the workbook's
  `Tax Engine!A17` label — "STSL — TFT claimed / foreign resident" — is quoting
  the ATO's own heading, not conflating two things.
  ⚠ *Evidence level:* the ATO's published wording, reached through search
  results, **not** a direct read — ato.gov.au still 403s automated fetches, so
  the page itself could not be opened. Good enough to leave the code alone;
  confirm off the printed table if it ever matters.

---

## 📄 Payroll evidence held

Payroll documents outrank re-reading an instrument. This is what we actually hold.

⚠ **Every document below was paid at the 2025 rates** (award reprint of
1 Sep 2025). Since the 18 Oct 2026 update the harness keeps a copy of the engine
with the 2025 tables put back (`E` in `tests/engine-regression.js`) so these
reproductions still run against the rates they were paid at; the live 2026 rates
are pinned separately (section J). Don't re-pin a reproduction to the new rates.

### What the next payslip should show (first one at the 2026 rates)

The owner expects a **casual** payslip in early Nov 2026. At the 2026 rates it
should carry, per hour: casual **L4-4 $53.37171** (= $3,245 ÷ 76 × 1.25),
casual L5-1 **$54.72039**, permanent L4-4 $42.69737. ⚠ Payroll derives the
casual rate off the full fortnightly (the 3Q slip showed it), while the engine
and Rates page multiply the 5-dp permanent rate by 1.25 — the two agree for L4-4
but the calculator prints L5-1 casual as 54.72040. That 0.00001/hr (under 0.1c a
fortnight) is the known convention gap, not a mismatch. **Laundry $6.30/fn** pro-rated by
worked hours (≈ $0.08289/hr); **retention unchanged** at $0.59210/hr (EBA
2.12(5) — not indexed); operational unchanged at $4.9867/hr. If it also carries
1 Sep–27 Oct back pay, those lines should be the rate difference only. A match
there is the payroll confirmation of everything in the 18 Oct status above.

### Aurion Work Summaries A and B — supplied 29 Jul 2026

Two period summaries (not payslips) for the same employee: **permanent L5-4,
Townsville, member 5% after-tax**. Between them they closed two parked questions
and produced three engine fixes. Every line below was re-derived and matched.

**Summary A — window around 10 Jul 2026.** A 76-hour worked fortnight, plus June
adjustments moving **48 h (05–08 Jun) from Ordinary to Recreation Leave**
(−48 h / −$2,199.79, +48 h / +$2,199.79).

| Line | Summary A | Engine (28 ord + 48 ann) |
|---|---:|---:|
| Base (76 h at L5-4) | 3,483.00 | 3,483.00 ✓ |
| CSA — "Consolidated Allow 26.96% WrkRec" | 939.02 | 939.02 ✓ |
| Townsville full rate | 43.40 | 43.40 ✓ |
| Operational | 378.99 | 378.99 ✓ |
| Retention | 45.00 | 45.00 ✓ |
| Laundry | 2.25 (= 6.10 − 3.85 clawed back) | 2.25 ✓ |
| Gross (period, incl. adjustments) | 4,891.66 | 4,891.66 ✓ |
| Employer super | 623.69 | 623.69 ✓ |
| Member 5% | 174.15 | 174.15 ✓ |

**Summary B — fortnight 4–17 Apr 2026 (Easter).** 53.5 ordinary hours + **22.5
worked public-holiday hours** (10.5 h on 04/04, 12 h on 05/04) = a full 76.
Payroll splits the ×2.5 into a base line at single time plus a separate
"Public Holiday Rostered On 150%" line; the engine's combined ×2.5 is the same
money. All four flat allowances printed **76.00000 units at full value**.

| Line | Summary B | Engine (53.5 ord + 22.5 ph) |
|---|---:|---:|
| PH base 10.5 h / 12 h | 481.20 / 549.95 | same ✓ |
| Ordinary 53.5 h | 2,451.85 | 2,451.85 ✓ |
| PH Rostered On 150% | 721.81 / 824.92 | same ✓ |
| CSA (on ordinary dollars only) | 661.02 | 661.02 ✓ |
| Townsville / operational / retention / laundry | 43.40 / 378.99 / 45.00 / 6.10 | same ✓ |
| Gross | 6,164.24 | 6,164.23 ✓ |
| Employer super | 785.94 | 785.94 ✓ |
| Member 5% | 174.15 | 174.15 ✓ |

**What they settled:**

1. ✅ **The 27.5% recreation-leave question — closed, the agreement governs.**
   The CSA element is literally named *"Consolidated Allow 26.96% WrkRec"*, on a
   base spanning worked **and** recreation hours, and 48 hours moved to recreation
   leave with **no CSA clawback and no leave-loading line of any kind** — no 17.5%,
   no 27.5%, anywhere on the summary. This is the payslip that had been asked for
   since 26 Jul. The engine was right; **stop raising it.**
2. ✅ **Worked public holidays — the engine was wrong in three places, fixed
   29 Jul 2026.** PH hours count toward all four flat allowances (E1); PH earnings
   sit in the employer super base at the full ×2.5 (E2); PH base hours at single
   time sit in the member % base (E3). Worth about **$140 gross + $347 super +
   $52 member** on that fortnight. CSA correctly stays **off** PH hours — confirmed,
   don't change it.
3. **Laundry's rule is now evidenced in both directions.** It counts hours actually
   worked (ordinary, HD, PH) and never leave hours — Summary A clawed back $3.85
   for the 48 recreation-leave hours while the other four allowances paid in full.
   This was previously labelled "our reading"; it isn't any more.
4. **Member % takes no gross-up** — $174.15 is exactly 5.000% of $3,483.00 on both
   summaries. Second independent confirmation of the 28 Jul change.

**Still unevidenced after these** — the engine excludes them everywhere and should
stay that way until a summary shows them: **overtime (×2) and quad (×4) hours** in
the allowance caps and the super base, and **higher-duties PH hours (`hdPH`)** in
the caps. The natural reading of E1 would include `hdPH`, but nothing has shown it.

*Source: two Aurion Work Summary images supplied by the owner 29 Jul 2026, read
directly. Element names quoted verbatim; all arithmetic re-derived in Node against
the engine and again in the workbook.*

### What the summaries reach

They reproduce **gross, employer super and the member contribution exactly** on
both fortnights. PAYG and net look out by $2 and $10 — until you account for the
tax year, after which they reconcile too (see below):

| | Summary A | Summary B |
|---|---:|---:|
| Gross — engine vs summary | 4,891.65 / 4,891.66 | 6,164.23 / 6,164.24 |
| Employer super | 623.69 / 623.69 ✓ | 785.94 / 785.94 ✓ |
| Member 5% | 174.15 / 174.15 ✓ | 174.15 / 174.15 ✓ |
| PAYG — engine vs implied | 1,202 / **1,204** | 1,678 / **1,688** |

✅ **The PAYG difference is fully explained, and the engine is right — it is a
tax-year boundary** (Jaycob's read, 29 Jul 2026, and it checks out to the dollar).

Both summaries pre-date the **1 July 2026 tax cut**, which dropped the
$18,201–$45,000 marginal rate from **16% to 15%**. For anyone earning above
$45,000 that is the whole band: $26,800 × 1% = **$268 a year = $10.31 a
fortnight**. The calculator holds the tables *from* 1 Jul 2026; payroll withheld
these fortnights *before* it.

Reconstructing the pre-cut scale 2 — the withholding formula is `round(x×a − b)×2`
on halved earnings, so a $10.31/fortnight difference is `b` moving **5.1538** on
every band above $45k/yr — reproduces payroll exactly:

| | engine, current tables | engine, pre-cut tables | payroll withheld |
|---|---:|---:|---:|
| **Summary B** — fortnight 4–17 Apr 2026 | 1,678 | **1,688** | **1,688** ✓ exact |
| **Summary A** — Jul 2026 fortnight + June adjustment | **1,202** | 1,212 | 1,204 |

Summary B is entirely FY2025-26 and matches the pre-cut tables **to the dollar**.
Summary A lands between the two because it *is* between the two: its July 2026
fortnight was withheld on the new tables ($1,202 — exactly what the engine gives)
and the June adjustment lines on the old ones, which is the residual $2.

⚠ **So expect this, don't fix it.** A work summary or payslip from **before
1 Jul 2026** will look about **$10 a fortnight** light on PAYG against this
calculator, and more if it spans a year boundary. That is the tax cut, not an
engine error. **The same thing happens again on 1 Jul 2027** — the rate drops
15% → 14% on the same band, so the same ~$10.31/fortnight offset reappears for
any FY2026-27 document compared against FY2027-28 tables.

*Evidence level: the pre-cut coefficients above are **reconstructed** from the
published size of the tax cut, not read from a FY2025-26 copy of NAT 1004
(ato.gov.au still 403s automated fetches). They land on Summary B's withheld
figure exactly, and the reconstructed band constants (180.0397 / 176.5781 /
358.3089 / 650.6166) sit within a tenth of a cent of the FY2025-26 scale 2 as
published, so the explanation is solid — but it is a derivation, not a source read.*

**The tax chain is covered from every side.** Schedule 1 and Schedule 8 were
verified line by line against NAT 1004 / NAT 3539 (26 Jul), the method is pinned
at five scales in `tests/engine-regression.js`, the summaries confirm the taxable
base itself — on both, the member contribution is after-tax, so taxable equals
gross, and gross reproduces exactly — and the withholding now reconciles against
a payroll document once the right tax year is used.

### ⚠ Gap — the 26 Jul 2026 payslip's totals aren't written down

Only three details of that slip (fortnight 11–24 Jul 2026, casual L4-4, two days
of L5-1 higher duties) were ever recorded: the `YD Retent 76` element at
$0.59210/hr, the two rates it confirms (L4-4 $40.76316, L5-1 $41.78947), and the
±1c line-item drift ($611.45/$611.44). Its input mix and its gross / PAYG / net /
employer-super totals are not in the repo, so its reported "agreed to 1 cent on
net" can't be re-derived by anyone but the owner.

**This is worth having but is not load-bearing** — every link in that chain is
independently verified above. Treat it as belt-and-braces, not as a blocker.

### 🎯 What evidence would actually be worth asking for

Both work summaries are **permanent L5-4**, so these have no reproducible pin at
all. In rough order of value:

1. **A fortnight with overtime on it.** The biggest open money question: do
   overtime and quad hours count toward the four flat allowance caps, and do
   their earnings sit in the employer super base? The engine excludes them
   everywhere. This is the same shape of risk as the worked-public-holiday
   finding, which was worth about $540 a fortnight and sat undetected purely
   because no summary had shown one.
2. **A casual fortnight, ideally with some higher duties.** Casual and HD are two
   of the most-used paths in the calculator and neither has a payroll
   reproduction pinned. It would also re-confirm retention-to-casuals pro-rata
   independently of the 26 Jul slip.
3. **A fortnight with higher duties over a public holiday** (`hdPH`), which is
   the last unevidenced corner of the E1 finding.

A work summary is enough — it carries every line plus gross, super and the member
contribution, and it is already de-identified. A full payslip is only needed if
PAYG or net is the question.

---

## 🔇 Parked — no unverified inputs

*The 27.5% recreation-leave loading used to be parked here. It was **closed
29 Jul 2026** by Aurion Work Summary A — see the payroll evidence above. The
agreement governs; the engine was already right.*

**The "Q" classifications — 4Q and 5Q are derived, not observed.** A payslip for
13–26 Jun 2026 carries classification **YDZO3Q** at a casual rate of **$45.43586**.
That is L3-4 ($2,721.00) plus the OO3 qualification allowance ($41.50) = **$2,762.50
a fortnight**, ÷ 76 × 1.25 — exact. So payroll folds the EBA 4.2 allowance into the
classification rate instead of paying it as a separate line, and "Q" means qualified.

- **3Q is payslip-confirmed.** 4Q ($3,140.80), 5Q ($3,525.80) and 6Q ($3,861.60)
  are the same arithmetic on their level's top paypoint using the site's own level
  mapping. **No payslip has shown any of them**, and whether payroll even uses a
  "6Q" code is unknown — the OO6 entitlement isn't in doubt, only the name. What
  settles it: one 4Q, 5Q or 6Q payslip.
- The 3Q slip is also the only independent check the level mapping has ever had, and
  it passes at one point: an OO3 carries $41.50, exactly as the mapping says.
  Careful — OO4 *and* OO5 share $42.80, so 5Q is $3,483 + $42.80, **not** + $44.60.
  $44.60 belongs to OO6. Whether a 6Q exists at all is unknown.
- Derive these off the **fortnightly**. $2,762.50 ÷ 76 × 1.25 = $45.43586, but
  rounding the permanent hourly to 5 dp first and then multiplying gives $45.43585.
  The payslip prints the rate as 36.34869 where $2,762.50 ÷ 76 rounds to 36.34868 —
  that is the slip dividing its stored casual rate back by the 1.2500 multiplier for
  display, not a different salary.
- ✅ **Built 27 Jul 2026 — the flat Qualification setting is gone.** Inside the rate
  the allowance is pro-rated by hours worked, takes the casual 25% and sits in the CSA
  base; paid flat it was outside all three, leaving a full-time OO3 **$11.19 a
  fortnight light** (~$291/yr). The direct evidence is the payslip's own `CONCS1`
  line, computed on 2180.92000 — the qualification-inclusive earnings. The four Q
  codes are now classifications (`L3-Q`–`L6-Q`), which loses nothing: EBA 4.2 pays
  the allowance only at a level's top paypoint, so the old setting could produce
  combinations like "L3-2 + Cert IV" that were never payable.
- The Q codes are named `L3-Q`..`L6-Q`, **not** `3Q`..`6Q`, on purpose: the
  shift-class test in `calc()` is `String(classCode).slice(0,2)==='L6'`, so a bare
  `6Q` would silently draw 26.96% instead of 27.46%. Keep the `L`.
- A wage case scales the **salary only**, not the allowance — `QSCALE` stores the
  award paypoint's whole-dollar fortnightly and the allowance separately for exactly
  this reason. Whether EBA 4.2 actually indexes with the wage case is not recorded
  anywhere; leaving the allowance flat is the assumption, matching how laundry is
  treated (Award 13.7 splits wage-case from CPI allowances). **Applied that way for
  the 2026 case (18 Oct 2026):** the General Ruling doesn't reach agreement-only
  figures ([4](a)), and EBA 4.2 has no indexation clause. At 2026 rates the four Q
  fortnightlies are $2,891.50 / $3,287.80 / $3,690.80 / $4,042.60 (the figures
  above are the 2025 ones). A 2026 Q payslip would test the flat-allowance
  assumption too.

**Not chased:** the *Superannuation (State Public Sector) Regulation 2023* (the
12.75% is already confirmed in practice — a payslip's employer contribution came
to exactly 12.75% of the full gross) and the *Queensland Employment Standards*
(the award clauses that supplement it already settle everything used here).

---

## Copyright and disclaimer

The instruments named above are public documents: industrial instruments
published by the **Queensland Industrial Relations Commission**, directives
issued under the *Public Sector Act 2022* (© **State of Queensland**), and
withholding schedules made by the Commissioner of Taxation (© **Commonwealth of
Australia**). Copies are **not reproduced here** — the table links to the
official versions, which are the only authoritative source.

**PayCalc is independent and unofficial.** It is a personal project by a private
individual and is **not affiliated with, endorsed by, or connected to** the State
of Queensland, the QIRC, the Department of Youth Justice and Victim Support, the
Commonwealth or the ATO. Clause references and quotations are given to show where
the numbers come from; quoting a public instrument implies no official standing
and no endorsement.

Nothing here is legal, industrial, financial or tax advice. Instruments are
amended and reprinted without notice — see the re-check triggers above. For a
decision about your own pay or entitlements, rely on your payslip and the
official instruments, and take it up with your payroll area, your union or a
qualified adviser.
