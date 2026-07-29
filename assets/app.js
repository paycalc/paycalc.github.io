"use strict";
/* ================================================================
   PayCalc — engine + UI. Mirrors PayCalc V19 (award 01.09.2025 ·
   ATO tables 01.07.2026) + user rate overrides.
   Independent & unofficial.
   ================================================================ */

/* ============ OFFICIAL RATES (PayCalc V19) ============ */
/* Hourly = fortnightly salary ÷ 76, where the fortnightly salary is the whole
   dollar amount payroll actually holds. The 2025 wage case multiplied each
   (whole dollar) fortnightly salary by 3.5% and rounded the result back to the
   nearest dollar — e.g. L4-4: $2,993 × 1.035 = $3,097.755 → $3,098 → $40.76316.
   Verified against a real payslip (11–24 Jul 2026): L4-4 $40.76316, L5-1
   $41.78947, both exact. Keep this rounding when the next wage case lands. */
const PAYSCALE=[['L3-1',33.71053],['L3-2',34.35526],['L3-3',35.07895],['L3-4',35.80263],
 ['L4-1',37.25],['L4-2',38.42105],['L4-3',39.61842],['L4-4',40.76316],
 ['L5-1',41.78947],['L5-2',43.10526],['L5-3',44.48684],['L5-4',45.82895],
 ['L6-1',47.76316],['L6-2',49.02632],['L6-3',50.22368]];
/* The "Q" (qualified) paypoints. Payroll folds the EBA 4.2 qualification allowance
   into the classification rate instead of paying it as its own line — YDZO3Q is
   L3-4 plus the OO3 allowance. Payslip-confirmed for L3-Q (13–26 Jun 2026, casual
   $45.43586); the rest are the same arithmetic on their level's top paypoint, which
   is the only paypoint the allowance is payable at anyway (EBA 4.2, and EBA 4.1(c)
   for casuals). Held as [code, award paypoint, its whole-dollar fortnightly, which
   allowance] rather than as an hourly rate, for two reasons: with the allowance in
   it the fortnightly is NOT a whole dollar, so it must not go through the
   whole-dollar wage-case rounding; and a wage case lifts the salary, not the
   allowance, so the two have to scale separately.
   The codes deliberately begin "L3".."L6" so the shift-class test in calc()
   — slice(0,2)==='L6' — keeps working and L6-Q correctly draws 27.46%. */
const QSCALE=[['L3-Q','L3-4',2721,'qual1'],['L4-Q','L4-4',3098,'qual2'],
 ['L5-Q','L5-4',3483,'qual2'],['L6-Q','L6-3',3817,'qual3']];
const R={shiftLo:0.2696,shiftHi:0.2746,tsvFull:0.571053,tsvHalf:0.28553,oper:4.9867,operCap:379,
 ret:0.5921,laun:0.080263,incharge:15.65,otMeal:17.35,qual1:41.5,qual2:42.8,qual3:44.6,
 empSuper:0.1275,contribTax:0.15,concCap:32500,fnPerYear:26,hrsPHRDO:7.6,
 validUntil:new Date('2026-09-01T00:00:00')};
const SC={
 '1':[[0,0.15,0.15],[188,0.2084,11.0185],[371,0.179,0.1066],[515,0.3227,74.1674],[932,0.32,71.6508],[2246,0.39,228.8816],[3303,0.47,493.1893]],
 '2':[[0,0,0],[362,0.15,54.3462],[538,0.25,108.2135],[673,0.17,54.3473],[721,0.179,60.8377],[865,0.3227,185.1935],[1282,0.32,181.7319],[2596,0.39,363.4627],[3653,0.47,655.7704]],
 '3':[[0,0.3,0.3],[2596,0.37,181.7308],[3653,0.45,474.0385]],
 '5':[[0,0,0],[362,0.15,54.3462],[721,0.159,60.8365],[865,0.3027,185.1923],[1282,0.3,181.7308],[2596,0.37,363.4615],[3653,0.45,655.7692]],
 '6':[[0,0,0],[362,0.15,54.3462],[721,0.159,60.8365],[865,0.3027,185.1923],[908,0.3527,230.6135],[1135,0.3127,185.1923],[1282,0.31,181.7308],[2596,0.38,363.4615],[3653,0.46,655.7692]]};
const HELP_TFTR=[[0,0,0],[1337,0.15,200.5615],[2494,0.17,250.4527],[3577,0.1,0]];
const HELP_NTFT=[[0,0,0],[987,0.15,148.0615],[2144,0.17,190.9527],[2727,0.1,0]];
const SCALE_TABLE={'1 - No tax-free threshold':'1','2 - Tax-free threshold claimed':'2','3 - Foreign resident':'3','5 - Full Medicare levy exemption':'5','6 - Half Medicare levy exemption':'6'};

/* Override panel fields: [key, label, unit hint, display factor, official display value] */
const OVR_FIELDS=[
 ['shiftLo','Shift allowance OO3–OO5','% of ord. earnings',100,26.96],
 ['shiftHi','Shift allowance OO6','% of ord. earnings',100,27.46],
 ['tsvFull','TSV locality — full','$ per fortnight',76,43.40],
 ['tsvHalf','TSV locality — half','$ per fortnight',76,21.70],
 ['oper','Operational allowance','$ per ordinary hour',1,4.9867],
 ['operCap','Operational cap','$ per fortnight',1,379],
 ['ret','Retention allowance','$ per fortnight',76,45.00],
 ['laun','Laundry allowance','$ per fortnight',76,6.10],
 ['incharge','In-charge allowance','$ per shift',1,15.65],
 ['otMeal','Overtime meal allowance','$ per meal',1,17.35],
 ['qual1','Qualification — OO3 (Cert IV)','$ per fortnight',1,41.50],
 ['qual2','Qualification — OO4/OO5 (Diploma)','$ per fortnight',1,42.80],
 ['qual3','Qualification — OO6 (Adv Diploma)','$ per fortnight',1,44.60],
 ['empSuper','Employer super','% of OTE',100,12.75],
 ['concCap','Concessional cap','$ per year',1,32500]];
/* No "Contributions tax" override any more. It only ever fed the salary-sacrifice
   gross-up, and once that went (27 Jul 2026) the field changed nothing on the page —
   a control that silently does nothing is worse than no control. R.contribTax stays as
   the documented 15% figure the Rates page and Pay Guide quote. */

function lk(t,x){let row=t[0];for(const r of t){if(x>=r[0])row=r;else break;}return row;}
function scaleTax(t,taxable){const x=Math.trunc(Math.max(0,taxable)/2),x099=x+0.99,r=lk(t,x);return Math.round(x099*r[1]-r[2])*2;}
/* Scaling a pay rate follows payroll's own arithmetic: take the whole-dollar
   fortnightly salary, apply the rise, round the answer back to the nearest dollar,
   then divide by 76 — the convention documented on PAYSCALE above and confirmed
   against a payslip. Multiplying the stored hourly rate instead drifts by up to
   43c a fortnight, with the sign varying by classification, which would make a
   wage-case preview disagree with the wage case. f===1 short-circuits so the
   published rates come back exactly as stored (they are held to 5 dp). */
function rateFor(code,cas,f,RR){
 f=f||1;
 /* A Q paypoint: scale the award salary the normal way, then add the allowance on
    top unscaled. Work off the fortnightly, never off a rounded hourly — $2,762.50
    ÷ 76 × 1.25 is $45.43586, but rounding the permanent rate to 5 dp first and then
    multiplying gives $45.43585. */
 const q=QSCALE.find(p=>p[0]===code);
 if(q){
  const salary=f===1?q[2]:Math.round(q[2]*f);
  const base=(salary+(+(RR||R)[q[3]]||0))/76;
  return cas?base*1.25:base;
 }
 const r=PAYSCALE.find(p=>p[0]===code);if(!r)return null;
 const base=f===1?r[1]:Math.round(Math.round(r[1]*76)*f)/76;
 return cas?base*1.25:base;
}

/* effective rates = official + any overrides */
function currentRates(){
 const r=Object.assign({},R);
 const o=state.ovr||{};
 for(const k in o){const v=parseFloat(o[k]);if(o[k]!==''&&!isNaN(v))r[k]=v;}
 r.scaleFactor=1+(+state.scalePct||0)/100;
 return r;
}
function isCustomized(){
 if(+state.scalePct)return true;
 const o=state.ovr||{};
 return Object.keys(o).some(k=>o[k]!==''&&!isNaN(parseFloat(o[k])));
}

/* ============ ENGINE (faithful to V19) ============ */
function calc(i){
 const RR=currentRates();
 const cas=i.empType==='Casual';
 const BaseRate=(i.classCode==='Custom'||!i.classCode)?(+i.customRate||0):(rateFor(i.classCode,cas,RR.scaleFactor,RR)??(+i.customRate||0));
 /* Classification on Custom with nothing typed: base pay is $0 while the flat
    allowances carry on paying, so the page shows a few hundred dollars of gross made
    entirely of allowances. Unlike the higher-duties version there's nothing sensible
    to fall back to — a substantive rate is the one thing we don't have — so this
    warns rather than substituting a number. */
 const customBaseEmpty=(i.classCode==='Custom'||!i.classCode)&&!(+i.customRate>0);
 /* HD hours with no HD level picked are paid as ordinary hours, at the substantive
    rate. They used to price at $0, which silently swallowed a whole shift — and $0
    is the one figure a worked hour can never be worth. The page warns when this
    happens; the estimate stays honest in the meantime.
    "Custom" with nothing typed in the rate box is the same situation wearing a
    different hat — an unfinished input, not a $0 shift — so it takes the same guard.
    It was the worse of the two, because the Custom branch left no warning showing at
    all: the breakdown just read "12.0 hrs @ HD rates" beside $0.00. */
 const hdCustomEmpty=(i.hd==='Custom'||!i.hd)&&!(+i.customHDRate>0);
 const hdNone=i.hd==='None'||hdCustomEmpty;
 const HDRate=hdNone?BaseRate:((i.hd==='Custom'||!i.hd)?(+i.customHDRate||0):(rateFor(i.hd,cas,RR.scaleFactor,RR)??(+i.customHDRate||0)));
 const ordH=+i.ordHours||0,ot=+i.ot||0,ph=+i.ph||0,quad=+i.quad||0;
 const hdOrd=+i.hdOrd||0,hdOT=+i.hdOT||0,hdPH=+i.hdPH||0,hdQuad=+i.hdQuad||0;
 /* Casuals: no paid sick or annual leave — the 25% loading is the trade, Award 8.3(e).
    Long service leave IS theirs (Award 8.3(h), 22(a)).
    Special leave is DELIBERATELY still paid here even though a casual isn't entitled
    to it (Special Leave Directive 12/24 cl 4.2 excludes casuals except for unpaid
    bereavement/compassionate). Owner's call, 26 Jul 2026: management does occasionally
    put casuals on special leave anyway, and it turns up on the odd payslip — this
    calculator's job is to match the payslip, not to enforce the directive. Do NOT
    zero this. The Pay Guide carries the entitlement warning instead. */
 const L=cas?{sick:0,ann:0,lsl:+i.leave.lsl||0,spec:+i.leave.spec||0}:i.leave;
 const LeaveHrs=L.sick+L.ann+L.lsl+L.spec, LeavePay=LeaveHrs*BaseRate;
 const LvShiftH=L.ann+L.lsl, LvOperH=L.ann+L.lsl+L.spec;
 const phRdo=cas?0:(+i.phRdoDays||0), incN=+i.inchargeNights||0, otherTax=+i.otherTaxable||0;
 const otMeals=+i.otMeals||0;
 const eff_tsv=cas?'None':i.tsv;

 const Eord=ordH*BaseRate+LeavePay;
 const Eot=ot*2*BaseRate, Eph=ph*2.5*BaseRate, Equad=quad*4*BaseRate;
 const Ehd=(hdOrd+hdOT*2+hdPH*2.5+hdQuad*4)*HDRate;
 const Ephrdo=cas?0:phRdo*RR.hrsPHRDO*BaseRate;
 const base=Eord+Eot+Eph+Equad+Ehd+Ephrdo;

 const sc=i.shiftClass, G50=sc==='None'?0:sc==='OO3-OO5 (26.96%)'?RR.shiftLo:sc==='OO6 (27.46%)'?RR.shiftHi:(String(i.classCode).slice(0,2)==='L6'?RR.shiftHi:RR.shiftLo);
 /* No HD level picked → the HD shift-class control is hidden, so it must not apply
    invisibly: those hours take the substantive class, like the ordinary hours they
    are being paid as. */
 const scH=i.shiftClassHD, hdShift=hdNone?G50:(scH==='None'?0:scH==='OO3-OO5 (26.96%)'?RR.shiftLo:scH==='OO6 (27.46%)'?RR.shiftHi:(String(i.hd).slice(0,2)==='L6'?RR.shiftHi:RR.shiftLo));
 const CSA=(ordH*BaseRate+LvShiftH*BaseRate)*G50+hdOrd*HDRate*hdShift;
 /* A worked public holiday counts toward the four flat allowances, exactly like an
    ordinary hour. Payroll-evidenced 29 Jul 2026 (Aurion Work Summary B, permanent
    L5-4, fortnight 4–17 Apr 2026): 53.5 ordinary + 22.5 worked PH hours, and every
    one of these four printed 76.00000 units at its full fortnightly value — TSV
    $43.40, operational $378.99, retention $45.00, laundry $6.10. Leaving `ph` out
    used to shave about $140 off the gross of a PH fortnight.
    Laundry's rule is now fully evidenced in both directions: it counts hours
    actually WORKED (ordinary, higher duties, public holiday) and never leave hours
    — Summary A clawed back $3.85 of laundry for 48 hours reclassified to recreation
    leave while the other three paid in full.
    Still deliberately out, because nothing has evidenced them: overtime and quad
    hours, and higher-duties PH hours (hdPH). */
 const tsvR=eff_tsv==='Full rate'?RR.tsvFull:eff_tsv==='Half rate'?RR.tsvHalf:0;
 const TSV=Math.min(ordH+hdOrd+LeaveHrs+ph,76)*tsvR;
 const OPER=Math.min((ordH+hdOrd+LvOperH+ph)*RR.oper,RR.operCap);
 const retR=i.retention==='Yes'?RR.ret:0;
 const RET=Math.min(ordH+hdOrd+LeaveHrs+ph,76)*retR;
 const LAUN=Math.min(ordH+hdOrd+ph,76)*RR.laun;
 /* No flat qualification allowance any more. EBA 4.2 only pays it at the top
    paypoint of a level, which is exactly what a Q classification is, so it is now
    inside the rate — where payroll puts it, and where it correctly gets pro-rated by
    hours, loaded 25% for casuals and counted in the CSA base. */
 const INCH=incN*RR.incharge, OTHER=otherTax;
 const OTMEAL=otMeals*RR.otMeal;
 const allow=CSA+TSV+OPER+RET+LAUN+INCH+OTMEAL+OTHER;
 const gross=base+allow;

 const mPct=(+i.memberPct||0)/100;
 /* Payroll deducts the elected percentage flat — it does NOT gross it up for the fund's
    15% contributions tax. Payslip-verified 27 Jul 2026 (permanent L5-2, 76 ord): the
    "Accum Plan Employee Sal Sac % Cont" line was $163.80, exactly 5.000% of the $3,276.00
    fortnightly salary. Grossing up would have made it $192.71 and cost $18.91 of net.
    A gross-up is something you elect yourself by typing 5.88 instead of 5 — the Pay Guide
    explains that. Don't put the ÷(1-contribTax) back.
    The base the percentage runs on is ordinary + leave + higher duties + public holiday
    hours at SINGLE time. Work Summary B: member contribution $174.15 = 5% × $3,483.00,
    where $3,483.00 is 53.5 ordinary + 22.5 PH hours priced at the plain hourly rate —
    the 150% public-holiday penalty lines are outside it, and so are overtime and quad. */
 const salsac=i.salSac==='No — after-tax'?0:mPct*(Eord+hdOrd*HDRate+ph*BaseRate);
 const extra=+i.extraSalSac||0, preTax=+i.customPreTax||0, fee=+i.adminFee||0;
 const taxable=gross-(salsac+extra+preTax+fee);
 const ScaleUsed=i.scale==='Auto'?'2 - Tax-free threshold claimed':i.scale;
 const payg=scaleTax(SC[SCALE_TABLE[ScaleUsed]],taxable);
 const stsl=i.studyLoan==='Yes'?scaleTax(ScaleUsed==='1 - No tax-free threshold'?HELP_NTFT:HELP_TFTR,taxable):0;
 const memAfter=i.salSac==='No — after-tax'?mPct*(Eord+hdOrd*HDRate+ph*BaseRate):0;
 const postTax=+i.customPostTax||0;
 const net=taxable-payg-stsl-memAfter-postTax;

 /* Laundry IS in the super base: a real payslip's employer contribution came to
    exactly 12.75% of the full gross, laundry included. Overtime and quad stay out
    (not ordinary-time earnings), and so do the overtime meal allowance and the
    free-text "other taxable" line.
    Worked public holidays ARE in it, penalty and all. Work Summary B's employer
    contribution was $785.94 = 12.75% × $6,164.24, and that gross includes both the
    PH hours at single time and the separate "Public Holiday Rostered On 150%" lines
    — i.e. the whole ×2.5. Which is also the expected answer: for a shift worker a
    rostered public-holiday shift is ordinary-time earnings for super purposes.
    Leaving Eph out understated super by $346.55 on that fortnight. */
 const empSuper=RR.empSuper*(Eord+Ephrdo+Eph+hdOrd*HDRate+allow-OTMEAL-OTHER);
 const sacTotal=salsac+extra, memTotal=memAfter, superTotal=empSuper+sacTotal+memTotal;
 const concAnnual=(empSuper+sacTotal)*RR.fnPerYear, headroom=RR.concCap-concAnnual, maxExtra=Math.max(0,headroom/RR.fnPerYear);
 const worked=ordH+ot+ph+quad+hdOrd+hdOT+hdPH+hdQuad, denom=worked+LeaveHrs;
 // "Extra above ordinary base pay": overtime, public holiday and quad count in full;
 // higher-duties overtime/PH/quad count in full; HD ordinary counts only the top-up over base.
 const bonus=Eot+Eph+Equad+(hdOT*2+hdPH*2.5+hdQuad*4)*HDRate+hdOrd*Math.max(0,HDRate-BaseRate);
 return {cas,BaseRate,HDRate,hdNone,customBaseEmpty,ordH,ot,ph,quad,hdOrd,hdOT,hdPH,hdQuad,hdHrs:hdOrd+hdOT+hdPH+hdQuad,phRdo,incN,otMeals,LeaveHrs,L,G50,
   Eord,Eot,Eph,Equad,Ehd,Ephrdo,base,CSA,TSV,OPER,RET,LAUN,INCH,OTMEAL,OTHER,allow,gross,
   salsac,extra,preTax,fee,taxable,ScaleUsed,payg,stsl,memAfter,memPct:mPct,postTax,net,otherDed:preTax+fee+postTax,
   empSuper,sacTotal,memTotal,superTotal,concAnnual,headroom,maxExtra,grossHr:denom?gross/denom:0,netHr:denom?net/denom:0,
   annualNet:net*RR.fnPerYear,annualGross:gross*RR.fnPerYear,bonus,effTax:taxable?payg/taxable:0,denom};
}

/* ============ FORMAT ============ */
const AUD=new Intl.NumberFormat('en-AU',{minimumFractionDigits:2,maximumFractionDigits:2});
const AUD0=new Intl.NumberFormat('en-AU',{minimumFractionDigits:0,maximumFractionDigits:0});
const $=v=>'$'+AUD.format(v), $0=v=>'$'+AUD0.format(v);
const hrs=v=>(Math.round(v*10)/10).toFixed(1), pct=v=>(v*100).toFixed(1)+'%';
const pct2=v=>(v*100).toFixed(2).replace(/\.00$/,'').replace(/(\.\d)0$/,'$1')+'%';

/* ============ STATE ============ */
const DEFAULTS={empType:'Permanent',classCode:'L5-1',customRate:'',hd:'None',customHDRate:'',
 shiftClass:'Auto',shiftClassHD:'Auto',retention:'Yes',tsv:'None',
 tsMode:'totals',ordHours:76,ot:0,ph:0,quad:0,hdOrd:0,hdOT:0,hdPH:0,hdQuad:0,
 leaveHrs:0,leaveType:'No leave',roster:[],
 phRdoDays:0,inchargeNights:0,otMeals:0,
 scale:'Auto',studyLoan:'No',salSac:'No — after-tax',memberPct:5,memberDirty:false,
 extraSalSac:0,customPreTax:0,adminFee:0,customPostTax:0,otherTaxable:0,
 ovr:{},scalePct:0};
const state=Object.assign({},DEFAULTS);
state.ovr=state.ovr||{};
const LEAVE_TYPES={'Sick / carer\'s':'sick','Annual / recreation':'ann','Long service':'lsl','Special':'spec'};
function leaveBuckets(){
 if(state.tsMode==='roster'){
  const b={sick:0,ann:0,lsl:0,spec:0};
  state.roster.forEach(r=>{if(b[r.type]!==undefined)b[r.type]+=(+r.hrs||0);});
  return b;
 }
 const b={sick:0,ann:0,lsl:0,spec:0};
 const k=LEAVE_TYPES[state.leaveType]; if(k)b[k]=+state.leaveHrs||0;
 return b;
}
function engineInput(){return Object.assign({},state,{leave:leaveBuckets()});}

/* ============ ROSTER ============ */
const TS_TYPES=[
 ['off','— off',0],['ord','Ordinary',12],['ot','Overtime ×2',2],['ph','Public holiday ×2.5',12],
 ['quad','Quad ×4',12],['hdOrd','HD ordinary',12],['hdOT','HD overtime ×2',2],
 ['hdPH','HD pub holiday ×2.5',12],['hdQuad','HD quad ×4',12],
 ['sick','Sick / carer’s',12],['ann','Annual leave',12],['lsl','Long service',12],['spec','Special leave',12]];
const TS_MAP={'ord':'ordHours','ot':'ot','ph':'ph','quad':'quad','hdOrd':'hdOrd','hdOT':'hdOT','hdPH':'hdPH','hdQuad':'hdQuad'};
/* what one day of each type is worth: ['B'ase or 'H'D rate, multiplier].
   Paid leave is always at the base rate. Off days have no entry. */
const TS_PAY={ord:['B',1],ot:['B',2],ph:['B',2.5],quad:['B',4],
 hdOrd:['H',1],hdOT:['H',2],hdPH:['H',2.5],hdQuad:['H',4],
 sick:['B',1],ann:['B',1],lsl:['B',1],spec:['B',1]};
const DAYS=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
/* One shift's base pay — the figure that lines up with an "Ordinary Hrs" line on
   a payslip. Allowances are paid across the fortnight, not per shift, so they
   are deliberately not in here. */
function shiftPay(type,hrs,r){
 const m=TS_PAY[type]; if(!m)return 0;
 if(r.cas&&(type==='sick'||type==='ann'))return 0;   /* casuals: unpaid — mirrors the engine */
 return (+hrs||0)*(m[0]==='H'?r.HDRate:r.BaseRate)*m[1];
}
function ensureRoster(){if(state.roster.length!==14)state.roster=Array.from({length:14},()=>({type:'off',hrs:0}));}
function applyRoster(){
 ensureRoster();
 const t={ordHours:0,ot:0,ph:0,quad:0,hdOrd:0,hdOT:0,hdPH:0,hdQuad:0};
 state.roster.forEach(r=>{const k=TS_MAP[r.type]; if(k)t[k]+=(+r.hrs||0);});
 Object.assign(state,t);
}
function buildRoster(){
 const host=document.getElementById('roster'); if(!host)return;
 ensureRoster(); host.innerHTML='';
 for(let w=0;w<2;w++){
  const tag=document.createElement('div'); tag.className='weektag'; tag.textContent='Week '+(w+1); host.appendChild(tag);
  for(let d=0;d<7;d++){
   const i=w*7+d, row=document.createElement('div'); row.className='ts-row t-off'; row.dataset.i=i;
   row.innerHTML=`<span class="day">${DAYS[d]}<span class="wk"> · W${w+1}</span></span><select aria-label="${DAYS[d]} week ${w+1} type"></select><input class="num" type="number" step="0.5" min="0" aria-label="${DAYS[d]} week ${w+1} hours"><span class="pay"></span>`;
   const sel=row.querySelector('select'), inp=row.querySelector('input');
   TS_TYPES.forEach(([v,l])=>sel.appendChild(new Option(l,v)));
   sel.value=state.roster[i].type; inp.value=state.roster[i].hrs||'';
   sel.addEventListener('change',()=>{const t=TS_TYPES.find(x=>x[0]===sel.value);
     state.roster[i].type=sel.value; state.roster[i].hrs=t?t[2]:0; inp.value=state.roster[i].hrs||'';
     paintRow(row); applyRoster(); syncTotalsPanel(); update();});
   inp.addEventListener('input',()=>{state.roster[i].hrs=parseFloat(inp.value)||0; applyRoster(); syncTotalsPanel(); update();});
   paintRow(row); host.appendChild(row);
  }
 }
}
function paintRow(row){
 const t=row.querySelector('select').value;
 row.className='ts-row '+(t==='off'?'t-off':['sick','ann','lsl','spec'].includes(t)?'t-leave':['ph','quad','hdPH','hdQuad'].includes(t)?'t-ph':'');
}
/* fill the $ column and the "base pay from these shifts" total */
function paintRosterPay(r){
 const host=document.getElementById('roster'); if(!host)return;
 let tot=0;
 host.querySelectorAll('.ts-row').forEach(row=>{
  const d=state.roster[+row.dataset.i]; if(!d)return;
  const p=shiftPay(d.type,d.hrs,r); tot+=p;
  const cell=row.querySelector('.pay');
  cell.textContent=d.type==='off'?'—':$(p);
  cell.classList.toggle('zero',p<0.005);
 });
 setTxt('roster-total',$(tot));
}

/* ============ OVERRIDE PANEL ============ */
/* The "this field has been overridden" highlight has to come from the stylesheet, not
   from an inline style. It used to hard-code the light theme's cream (#FBF0D6), which
   in dark mode sat behind the near-white --text and made the number you had just typed
   invisible. --amber-tint / --amber-line already flip with the theme, so the class
   works in both. */
function markOvr(el,on){el.classList.toggle('ovr-on',on);}
function buildOvrPanel(){
 const og=document.getElementById('ovr-grid'); if(!og)return;
 OVR_FIELDS.forEach(([k,label,unit,f,ph])=>{
  const d=document.createElement('div'); d.className='mg';
  const lab=document.createElement('label'); lab.innerHTML=`${label} <span class="mult">${unit}</span>`;
  const inp=document.createElement('input'); inp.className='num'; inp.type='number'; inp.step='any'; inp.min='0';
  inp.placeholder=ph; inp.dataset.ovr=k; inp.dataset.factor=f;
  inp.setAttribute('aria-label',label+' — '+unit+' (official '+ph+')');
  inp.addEventListener('input',()=>{
   if(inp.value===''){delete state.ovr[k]; markOvr(inp,false);}
   else{let v=parseFloat(inp.value); if(!isNaN(v)){const c=clampNum(v,inp); if(c!==v){v=c; inp.value=v;} state.ovr[k]=v/f; markOvr(inp,true);}}
   update();
  });
  d.appendChild(lab); d.appendChild(inp); og.appendChild(d);
 });
 /* The 27 Jul clamp pass reached every other typed input but missed this one, so a
    typed −5 was accepted and quietly scaled the whole pay scale DOWN. Same treatment
    as the override fields: clamp to the min/max the markup declares and correct the
    field, so the page can't show one number and calculate another. */
 const sp=document.getElementById('scalePct');
 if(sp)sp.addEventListener('input',()=>{
  if(sp.value===''){state.scalePct=0;}
  else{let v=parseFloat(sp.value); if(isNaN(v))v=0; const c=clampNum(v,sp); if(c!==v){v=c; sp.value=v;} state.scalePct=v;}
  markOvr(sp,(+state.scalePct)!==0); update();
 });
 const rst=document.getElementById('ovr-reset');
 if(rst)rst.addEventListener('click',()=>{state.ovr={};state.scalePct=0;paintOvrPanel();update();});
 paintOvrPanel();
}
function paintOvrPanel(){
 document.querySelectorAll('[data-ovr]').forEach(el=>{
  const k=el.dataset.ovr,f=parseFloat(el.dataset.factor||'1');
  const on=state.ovr&&state.ovr[k]!==undefined&&!isNaN(parseFloat(state.ovr[k]));
  el.value=on?(+state.ovr[k]*f):'';
  markOvr(el,on);
 });
 const sp=document.getElementById('scalePct');
 if(sp){const v=+state.scalePct||0; sp.value=v||''; markOvr(sp,v!==0);}
}

/* ============ CALCULATOR PAGE ============ */
/* Every number input in the markup declares min (and sometimes max), but a browser
   only enforces those for the spinner arrows and the – / + buttons — typed text
   goes straight through. Typing -20 into Ordinary hours used to give a negative
   gross, a negative net and negative super. */
function clampNum(v,el){
 const lo=parseFloat(el.min),hi=parseFloat(el.max);
 if(!isNaN(lo)&&v<lo)return lo;
 if(!isNaN(hi)&&v>hi)return hi;
 return v;
}
function setTxt(id,t){const e=document.getElementById(id);if(e)e.textContent=t;}
function amt(id,v,{minus=false}={}){const e=document.getElementById(id);if(!e)return;
 e.textContent=(minus&&v>0?'– ':'')+$(v);e.classList.toggle('zero',Math.abs(v)<0.005&&!minus);}
/* Split the SAME formatted string every other net display uses, so the hero can
   never disagree with the breakdown. Doing the cents by hand (round((x-d)*100))
   printed three digits whenever the cents rounded up to 100 — a net of
   $1,463.9956 showed as "$1,463.100" instead of "$1,464.00". */
function heroNet(v){const neg=v<0,s=AUD.format(Math.abs(v)),i=s.lastIndexOf('.');
 return `<span class="cur">$</span>${neg?'-':''}${s.slice(0,i)}<span class="cents">${s.slice(i)}</span>`;}
function syncSeg(){document.querySelectorAll('.seg[data-group]').forEach(seg=>{const g=seg.dataset.group;
 seg.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.v===state[g]?'true':'false'));});}
function syncTotalsPanel(){
 ['ordHours','ot','ph','quad','hdOrd','hdOT','hdPH','hdQuad'].forEach(id=>{const el=document.getElementById(id);if(el)el.value=state[id]||'';});
 const lt=document.getElementById('tsTotals'); if(lt)lt.textContent=hrs(state.ordHours+state.ot+state.ph+state.quad+state.hdOrd+state.hdOT+state.hdPH+state.hdQuad+leaveBuckets().sick+leaveBuckets().ann+leaveBuckets().lsl+leaveBuckets().spec)+' hrs total';
}

function update(){
 const onCalc=!!document.getElementById('hero-net'); if(!onCalc)return;
 const cas=state.empType==='Casual';
 document.getElementById('customRate-wrap').style.display=state.classCode==='Custom'?'flex':'none';
 document.getElementById('customHDRate-wrap').style.display=state.hd==='Custom'?'flex':'none';
 document.getElementById('hdshift-row').style.display=(state.hd!=='None')?'grid':'none';
 document.getElementById('tsv-casual').classList.toggle('show',cas&&state.tsv!=='None');
 document.getElementById('phrdo-casual').classList.toggle('show',cas&&(+state.phRdoDays>0));
 const pTotals=document.getElementById('panel-totals'),pRoster=document.getElementById('panel-roster');
 if(pTotals)pTotals.style.display=state.tsMode==='totals'?'':'none';
 if(pRoster)pRoster.style.display=state.tsMode==='roster'?'':'none';

 const RR=currentRates();
 const r=calc(engineInput());
 const cust=isCustomized();
 document.getElementById('hd-none-warn').classList.toggle('show',r.hdNone&&r.hdHrs>0);
 document.getElementById('custom-rate-warn').classList.toggle('show',r.customBaseEmpty&&(r.hdHrs>0||r.ordH>0||r.ot>0||r.ph>0||r.quad>0||r.LeaveHrs>0));
 /* Overtime, PH and quad legitimately sit on top of the 76, so they're left out of
    this count — only the hours that make up the fortnight itself are totted up. */
 const fnHrs=r.ordH+r.hdOrd+r.LeaveHrs;
 document.getElementById('over-fn-warn').classList.toggle('show',fnHrs>76.0001);
 setTxt('over-fn-hrs',hrs(fnHrs)+' hrs');

 setTxt('rate-now','$'+(+r.BaseRate||0).toFixed(5)+'/hr'+(cas?' (incl. 25% loading)':'')+(RR.scaleFactor!==1?' · scale '+(RR.scaleFactor>1?'+':'')+((RR.scaleFactor-1)*100).toFixed(2)+'%':''));
 setTxt('hdrate-now',state.hd!=='None'&&state.hd!=='Custom'?('$'+(+r.HDRate||0).toFixed(5)+'/hr HD'):'');
 setTxt('adv-status',cust?'⚠ custom rates active':'official rates');

 document.getElementById('hero-net').innerHTML=heroNet(r.net);
 setTxt('hero-yeargross',$0(r.annualGross)); setTxt('hero-year',$0(r.annualNet)); setTxt('hero-etr',pct(r.effTax));
 setTxt('s-gross',$0(r.gross)); setTxt('s-tax',$0(r.payg)); setTxt('s-super',$0(r.empSuper));
 setTxt('s-ghr','$'+AUD.format(r.grossHr)); setTxt('s-nhr','$'+AUD.format(r.netHr));
 setTxt('s-extra',$0(r.bonus));

 const stale=new Date()>RR.validUntil,rb=document.getElementById('ribbon');
 rb.className='ribbon '+((stale||cust)?'warn':'ok');
 setTxt('ribbon-tag',cust?'Custom rates':(stale?'Check rates':'Current'));
 setTxt('ribbon-txt',cust?'Custom rates active — figures are not the published award rates. Manage or clear them in “Advanced — override rates” below.':(stale?'Rates were verified as at 1 Sep 2025 (good until 1 Sep 2026) — a new wage case or agreement may now apply.':'Award floor rates verified as at 1 Sep 2025 (good until 1 Sep 2026) · ATO tax tables 1 Jul 2026.'));

 const bits=[hrs(r.ordH)+' ord'];
 if(r.hdHrs>0)bits.push(hrs(r.hdHrs)+' HD'); if(r.LeaveHrs>0)bits.push(hrs(r.LeaveHrs)+' leave');
 if(r.ot+r.ph+r.quad>0)bits.push(hrs(r.ot+r.ph+r.quad)+' penalties');
 setTxt('brk-hrs',bits.join(' · '));

 const lvTxt=r.LeaveHrs>0?('  +  '+hrs(r.LeaveHrs)+' leave @ base'):'';
 setTxt('fx-ord',hrs(r.ordH)+' × '+$(r.BaseRate)+lvTxt); amt('a-ord',r.Eord);
 setTxt('fx-ot',hrs(r.ot)+' × '+$(r.BaseRate*2)); amt('a-ot',r.Eot);
 setTxt('fx-ph',hrs(r.ph)+' × '+$(r.BaseRate*2.5)); amt('a-ph',r.Eph);
 setTxt('fx-quad',hrs(r.quad)+' × '+$(r.BaseRate*4)); amt('a-quad',r.Equad);
 setTxt('fx-hd',hrs(r.hdHrs)+(r.hdNone?' hrs @ base rate — no HD level picked':' hrs @ HD rates')); amt('a-hd',r.Ehd);
 setTxt('fx-phrdo',r.phRdo>0?r.phRdo+(r.phRdo===1?' day × ':' days × ')+hrs(RR.hrsPHRDO)+' hrs':'award cl 23.4'); amt('a-phrdo',r.Ephrdo);
 amt('a-base',r.base);
 setTxt('fx-csa',(r.G50>0?pct2(r.G50):'—')+' of ordinary earnings'); amt('a-csa',r.CSA);
 setTxt('fx-tsv','$'+AUD.format(RR.tsvFull*76)+' / $'+AUD.format(RR.tsvHalf*76)+' per fn · to 76'); amt('a-tsv',r.TSV);
 setTxt('fx-oper','$'+RR.oper.toFixed(4)+'/hr · cap '+$0(RR.operCap)); amt('a-oper',r.OPER);
 setTxt('fx-ret','$'+AUD.format(RR.ret*76)+'/fn · to 76'); amt('a-ret',r.RET);
 setTxt('fx-laun','$'+AUD.format(RR.laun*76)+'/fn · to 76'); amt('a-laun',r.LAUN);
 setTxt('fx-inch',r.incN+' × '+$(RR.incharge)); amt('a-inch',r.INCH);
 setTxt('fx-otmeal',r.otMeals+' × '+$(RR.otMeal)); amt('a-otmeal',r.OTMEAL); amt('a-other',r.OTHER);
 amt('a-allow',r.allow); amt('a-gross',r.gross);
 setTxt('fx-scale',r.ScaleUsed.replace(/^(\d).*/,'scale $1')+(state.scale==='Auto'?' · auto':''));
 amt('a-payg',r.payg,{minus:true}); amt('a-stsl',r.stsl,{minus:true}); amt('a-salsac',r.sacTotal,{minus:true});
 setTxt('fx-mem',pct2(r.memPct)+' of base'); amt('a-mem',r.memAfter,{minus:true});
 /* Live preview under the contribution-rate box, so the % isn't the only thing on the
    page. Pre-tax and after-tax deduct different amounts for the same %, and only this
    line shows it. Blank at 0% — the CSS hides an empty note. */
 const memAmt=r.memAfter+r.salsac;
 setTxt('mem-prev',memAmt<0.005?'':'≈ '+$(memAmt)+' a fortnight'+
   (r.memAfter>0?', taken after tax':', taken before tax'));
 amt('a-otherded',r.otherDed,{minus:true}); amt('a-net',r.net);

 const hide=(line,cond)=>{const el=document.querySelector(`[data-line="${line}"]`);if(el)el.style.display=cond?'none':'';};
 hide('ot',r.Eot<0.005);hide('ph',r.Eph<0.005);hide('quad',r.Equad<0.005);
 hide('hd',r.Ehd<0.005&&r.hdHrs<0.005);hide('phrdo',r.Ephrdo<0.005);
 hide('tsv',r.TSV<0.005);hide('ret',r.RET<0.005);
 hide('incharge',r.INCH<0.005);hide('otmeal',r.OTMEAL<0.005);hide('other',r.OTHER<0.005);
 hide('stsl2',r.stsl<0.005);hide('salsac2',r.sacTotal<0.005);hide('otherded',r.otherDed<0.005);

 setTxt('super-rate','employer '+pct2(RR.empSuper)+' of OTE');
 setTxt('su-emp-k','Employer ('+pct2(RR.empSuper)+')');
 setTxt('su-emp',$(r.empSuper));setTxt('su-sac',$(r.sacTotal));setTxt('su-mem',$(r.memTotal));
 setTxt('su-head',$0(Math.max(0,r.headroom)));setTxt('su-total',$(r.superTotal));
 setTxt('su-cap',$0(RR.concCap));setTxt('su-used',$0(r.concAnnual));setTxt('su-max',$(r.maxExtra));

 const g=r.gross||1,segs={net:Math.max(0,r.net),tax:r.payg,stsl:r.stsl,salsac:r.sacTotal,mem:r.memAfter,other:r.otherDed};
 for(const k in segs){const p=segs[k]/g;
  document.getElementById('bar-'+k).style.width=(p*100)+'%';
  setTxt('v-'+k,$0(segs[k]));setTxt('p-'+k,(p*100).toFixed(1)+'%');
  document.querySelector(`.leg[data-k="${k}"]`).classList.toggle('off',segs[k]<0.005);}
 paintRosterPay(r);
 renderPayslip(r);
 announce(r);
}

/* One polite announcement once typing settles, rather than one per keystroke. */
let srTimer=null;
function announce(r){
 const el=document.getElementById('hero-sr'); if(!el)return;
 clearTimeout(srTimer);
 srTimer=setTimeout(()=>{el.textContent='Net this fortnight '+$(r.net)+'. Gross '+$(r.gross)+', PAYG tax '+$(r.payg)+', employer super '+$(r.empSuper)+'.';},700);
}

function renderPayslip(rOrEvent){
 const r=(rOrEvent&&rOrEvent.gross!==undefined)?rOrEvent:calc(engineInput());
 [['gross',r.gross],['tax',r.payg],['net',r.net],['emp',r.empSuper]].forEach(([k,v])=>{
  setTxt('pc-'+k,$(v));
  const inp=document.getElementById('ps-'+k),flag=document.getElementById('pf-'+k);
  const raw=inp.value.trim();
  if(raw===''){flag.className='flag blank';flag.textContent='—';return;}
  const diff=parseFloat(raw)-v;
  if(Math.abs(diff)<0.5){flag.className='flag match';flag.textContent='✓ match';}
  else{flag.className='flag miss';flag.textContent=(diff>0?'+':'')+AUD0.format(diff);}
 });
}

/* ---- actions ---- */
function download(name,text,type){
 const blob=new Blob([text],{type:type||'text/plain'}),a=document.createElement('a');
 a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();
 setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},400);
}
/* export a copy — deleting memberDirty from the live state would make the next
   Permanent/Casual switch silently reset the member contribution % */
function saveSetup(){const out=Object.assign({},state);delete out.memberDirty;
 download('paycalc-setup.json',JSON.stringify(out,null,1),'application/json');}
/* Setups saved before 27 Jul 2026 carry a flat `qual` setting that no longer exists.
   Dropping it silently would quietly cut ~$41-45 a fortnight off someone's saved
   estimate, so move them to the matching Q paypoint instead. The qualification they
   picked doesn't come into it — the amount follows the level, and EBA 4.2 only pays
   at the top paypoint anyway, so a saved "L3-2 + Cert IV" was never payable and is
   left alone rather than silently upgraded. */
function migrateQual(saved){
 delete state.qual;
 if(!saved||!saved.qual||saved.qual==='None')return;
 const q=QSCALE.find(p=>p[1]===saved.classCode);
 if(q)state.classCode=q[0];
}
function loadSetup(file){
 const rd=new FileReader();
 rd.onload=()=>{try{const s=JSON.parse(rd.result);Object.assign(state,DEFAULTS,s);state.ovr=state.ovr||{};
   migrateQual(s);rebuildAll();}catch(e){alert('That file doesn’t look like a PayCalc setup.');}};
 rd.readAsText(file);
}
function rebuildAll(){
 document.querySelectorAll('input[data-bind],select[data-bind]').forEach(el=>{
  const id=el.dataset.bind; el.value=state[id];
 });
 buildRoster(); syncTotalsPanel(); paintOvrPanel(); syncSeg(); update();
}

/* ============ BOOT ============ */
document.addEventListener('DOMContentLoaded',()=>{
 /* nav active state */
 const pg=(location.pathname.split('/').pop()||'index.html');
 document.querySelectorAll('.nav a').forEach(a=>{if(a.getAttribute('href')===pg)a.classList.add('on');});

 /* footer — single disclaimer (all pages) */
 const f=document.getElementById('site-footer');
 if(f){
  f.innerHTML=`<div class="disclaimer">
   <p><b>Independent &amp; unofficial — estimates only.</b> PayCalc is a personal project by a private individual. It is not affiliated with, endorsed by, or connected to the Queensland Government, the Department of Youth Justice and Victim Support, the Queensland Industrial Relations Commission, the ATO, QSuper, or any union. Names of awards and agreements identify only the public documents the calculations are based on. All rates come from those public instruments (the Youth Detention Centre Employees Award – State 2016, the Youth Detention Centre Certified Agreement 2023 CB/2023/139, ATO Schedules 1 &amp; 8, the Superannuation (State Public Sector) Regulation 2023, and Queensland Government directives); copyright in them remains with the State of Queensland and the Commonwealth. Outputs are simplified per-fortnight estimates for operational shiftworkers on the OO3–OO6 12-hour continuous roster; they are general information only, not financial, tax, superannuation, legal, or industrial advice.</p>
   <p><b>No guarantee — your payslip wins.</b> Rates change and this site may contain errors or stale figures at any time. It is provided “as is” without warranty. Payroll may legitimately pay above the award floor shown here. Your official payslip, QSuper statements and the instruments themselves are the only authoritative sources — if this calculator and your payslip differ, rely on the payslip, and take pay questions to your payroll/HR area, your union, or a qualified adviser. To the maximum extent permitted by law, the author accepts no liability for any loss, underpayment, tax outcome, or decision arising from use of this site; you use it at your own risk and are responsible for verifying every figure. Nothing here excludes any right under the Australian Consumer Law that cannot lawfully be excluded.</p>
   <p><b>Privacy.</b> Everything runs in your browser — no accounts, no analytics, no server. Nothing you type is collected, stored, or transmitted; downloads save to your own device.</p>
  </div>`;
 }

 const onCalc=!!document.getElementById('hero-net');
 if(!onCalc)return;

 /* classification selects */
 const c=document.getElementById('classCode');
 c.appendChild(new Option('Custom rate','Custom'));
 /* Each Q sits directly after the paypoint it is built on, so the list reads the way
    you think — level, top of level, top of level qualified. Q goes on the substantive
    list only: higher duties pays the FIRST paypoint of the higher level (Award 12.7),
    so a Q rate can never be an HD rate. */
 PAYSCALE.forEach(p=>{
  c.appendChild(new Option(p[0],p[0]));
  const q=QSCALE.find(x=>x[1]===p[0]);
  if(q)c.appendChild(new Option(q[0]+' — qualified',q[0]));
 });
 c.value=state.classCode;
 const h=document.getElementById('hd');
 h.appendChild(new Option('None','None'));h.appendChild(new Option('Custom rate','Custom'));
 PAYSCALE.forEach(p=>h.appendChild(new Option(p[0],p[0])));
 h.value=PAYSCALE.some(p=>p[0]===state.hd)?state.hd:'None'; state.hd=h.value;

 /* segmented */
 document.querySelectorAll('.seg[data-group]').forEach(seg=>{
  const g=seg.dataset.group;
  seg.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{
   state[g]=b.dataset.v;
   if(g==='empType'&&!state.memberDirty){state.memberPct=(state.empType==='Casual')?0:5;const mp=document.getElementById('memberPct');if(mp)mp.value=state.memberPct;}
   if(g==='tsMode'&&state.tsMode==='roster'){applyRoster();syncTotalsPanel();}
   syncSeg();update();
  }));
 });

 /* bound inputs */
 document.querySelectorAll('[data-bind]').forEach(el=>{
  const id=el.dataset.bind; el.value=state[id];
  el.addEventListener('input',()=>{
   let v=el.value;
   if(el.type==='number'){
    v=el.value===''?(id==='customRate'||id==='customHDRate'?'':0):parseFloat(el.value);
    if(typeof v==='number'&&isNaN(v))v=0;
    if(typeof v==='number'){const c=clampNum(v,el); if(c!==v){v=c; el.value=v;}}
   }
   state[id]=v; if(id==='memberPct')state.memberDirty=true; update();
  });
 });

 /* steppers */
 document.querySelectorAll('[data-step]').forEach(btn=>btn.addEventListener('click',()=>{
  const id=btn.dataset.step,d=parseFloat(btn.dataset.d),el=document.getElementById(id);
  let v=(parseFloat(el.value)||0)+d;if(v<0)v=0;el.value=v;state[id]=v;update();
 }));

 /* roster + quick actions */
 buildRoster(); syncTotalsPanel();
 const qf=document.getElementById('quickfill');
 if(qf)qf.addEventListener('click',()=>{state.ordHours=76;syncTotalsPanel();update();});
 const rc=document.getElementById('roster-clear');
 if(rc)rc.addEventListener('click',()=>{state.roster=state.roster.map(()=>({type:'off',hrs:0}));buildRoster();applyRoster();syncTotalsPanel();update();});

 /* override panel */
 buildOvrPanel();

 /* payslip inputs */
 ['ps-gross','ps-tax','ps-net','ps-emp'].forEach(id=>document.getElementById(id).addEventListener('input',renderPayslip));

 /* action buttons */
 const on=(id,fn)=>{const e=document.getElementById(id);if(e)e.addEventListener('click',fn);};
 on('btn-save',saveSetup);
 const lf=document.getElementById('load-file');
 if(lf)lf.addEventListener('change',()=>{if(lf.files[0])loadSetup(lf.files[0]);lf.value='';});

 syncSeg(); update();
});
