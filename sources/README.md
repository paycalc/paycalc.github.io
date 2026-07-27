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
| **31 Jul 2026** | EBA CB/2023/139 reaches **nominal expiry**. It keeps operating until replaced, so not an automatic problem — but a replacement is imminent. | Ask whether the YDC 2026 agreement has been certified. If it has, everything below is out of date. |
| **~1 Sep 2026** | **State Wage Case 2026.** Moves the award pay scale, and the in-charge allowance with it (Award 13.7(a)). Laundry, overtime meal and motor vehicle move separately by CPI (13.7(b)–(c)) — do **not** apply the wage-case percentage to those. | Get the new award reprint and re-verify clause 12.2. **Round each new fortnightly salary to a whole dollar before dividing by 76.** |
| **1 Sep 2026** | The site's rates ribbon flips itself to amber "Check rates" (`validUntil` in `assets/app.js`). | Push `validUntil` forward only after actually re-checking. |
| **1 Jul 2027** | ATO bottom marginal rate 15% → 14%. Schedules 1 and 8 reissued. | Get the new Schedule 1 and re-verify the five scale tables in `assets/app.js`. |

If today's date is past a trigger, say so rather than assuming the figures still
hold.

---

## What was verified, and against what

| Instrument | Version checked | Result |
|---|---|---|
| [Youth Detention Centre Employees Award – State 2016](https://www.qirc.qld.gov.au) | QIRC reprint under s 980, matter **B/2025/49 and B/2025/50**, certified 5 Sep 2025, operative **1 Sep 2025** | ✅ Pay scale and every award rule below |
| [YDC Certified Agreement 2023](https://www.qirc.qld.gov.au) | **CB/2023/139**, certified 7 Dec 2023, nominal expiry **31 Jul 2026** | ✅ All allowances below |
| [ATO Schedule 1 (NAT 1004)](https://www.ato.gov.au/tax-rates-and-codes/payg-withholding-schedule-1-statement-of-formulas-for-calculating-amounts-to-be-withheld) | Applies from **1 Jul 2026**, PDF built 16 Jun 2026 | ✅ All five PAYG scales, exact |
| [Special Leave — Directive 12/24](https://www.forgov.qld.gov.au/pay-benefits-and-policy/directives-policies-circulars-and-guidelines/special-leave-directive-1224) | Effective **30 Sep 2024**, supersedes 05/17 | ✅ cl 4.2, cl 9 |
| [Locality Allowances — Directive 16/18](https://www.forgov.qld.gov.au/pay-benefits-and-policy/directives-policies-circulars-and-guidelines/locality-allowances-directive-1618) | Effective **11 May 2018**, supersedes 19/99 | ✅ TSV rates, exact |
| [Higher Duties — Directive 16/24](https://www.forgov.qld.gov.au/pay-benefits-and-policy/directives-policies-circulars-and-guidelines/higher-duties-directive-1624) | Made under the *Public Sector Act 2022* | ✅ cl 4.2, 7.1, 7.4, 9.1, 10.1, 11, 15 |
| [Recreation Leave — Directive 11/24](https://www.forgov.qld.gov.au/pay-benefits-and-policy/directives-policies-circulars-and-guidelines/recreation-leave-directive-1124) | Effective **30 Sep 2024**, supersedes 04/17 | ✅ Sch 1 cl 2.1, cl 5.1–5.2 · 🚩 cl 16.1, see below |
| [Domestic Travelling & Relieving Expenses — Directive 13/23](https://www.forgov.qld.gov.au/pay-benefits-and-policy/directives-policies-circulars-and-guidelines/domestic-travelling-and-relieving-expenses-directive-1323) | Rates schedule effective **1 Sep 2025**, tracking ATO TD 2025/4 | ✅ Informs the "other taxable earnings" line only |

### The pay scale — the most important finding

Award **cl 12.2** prints the fortnightly salaries as **whole dollars**, footnoted
*"Rounded to the nearest dollar"*: 2562 / 2611 / 2666 / 2721 · 2831 / 2920 /
3011 / 3098 · 3176 / 3276 / 3381 / 3483 · 3630 / 3726 / 3817. All fifteen match
the calculator exactly. Award **cl 8.3(c)** defines an hour as *"1/76th of the
minimum fortnightly rate"* — that is where the ÷76 comes from, and it is the
award's own arithmetic, not a convention we chose.

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
- Laundry $6.10/fn — Award 13.6(b). In-charge $15.65/shift — 13.2.
  **Overtime meal $17.35 — 13.5**, another for each further 4 hrs continuous
  13.5(e), and one if cancelled overtime spoiled a brought meal 13.5(f).
- Qualification $41.50 / $42.80 / $44.60 — EBA 4.2. Casual rule: one calendar
  year **and** 1,200 hours at the maximum paypoint — **EBA 4.1(c)**.
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

---

## 🚩 Still open

**1. ATO Schedule 8 (NAT 3539) — study and training support loans, never verified.**
[ATO page](https://www.ato.gov.au/tax-rates-and-codes/schedule-8-statement-of-formulas-for-calculating-study-and-training-support-loans-components).
⚠ **Known trap — the PDF on that page is stale.** The page itself *is* the
current "applies to payments made from 1 July 2026" edition, but its
`NAT 3539 … DIGITAL` PDF download is built 30 May 2024 (FY2024-25, nil band to
$1,045.99/week). Two attempts on 26 Jul 2026 produced byte-identical copies of
that old file. **Don't download the PDF** — read the coefficients off the page,
or print the page to PDF from the browser. The
[fortnightly STSL tax table](https://www.ato.gov.au/tax-rates-and-codes/study-and-training-support-loans-fortnightly-tax-table)
is an easier cross-check since it's already in fortnights.

Sanity-check before using anything: the nil band should run to about
**$1,337/week** (≈$2,674/fortnight). If it says $1,045.99, it's the old one.

Neither ato.gov.au nor softwaredevelopers.ato.gov.au can be fetched from inside
a session — both return 403 — so this has to come from a browser by hand.

The calculator's `HELP_TFTR` / `HELP_NTFT` tables are internally coherent and fit
the post-2025-reform marginal structure indexed to 2026-27, but that is
inference, not verification. Only affects people carrying a study loan.

**2. Recreation leave loading — 27.5% vs the CSA.** Directive 11/24 **cl 16.1**
pays a continuous shift worker salary excluding shift/weekend/PH penalties **plus
27.5%**. The calculator follows EBA 2.9(5) instead, where the CSA (26.96% for
OO3–OO5) continues through recreation leave in lieu of loading. 27.5% is higher,
and the Award cl 19 note says a directive applies "to the extent it provides a
more generous entitlement". Worth roughly **$14–17 per fortnight** of recreation
leave for OO3–OO5, ~$1.45 for OO6. **Deliberately not changed** — which
instrument governs is a delegate or payroll question, and no payslip we hold has
recreation leave on it. Don't quietly resolve it either way.

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
