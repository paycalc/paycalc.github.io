# Source instruments

The primary documents PayCalc's numbers come from, kept here so any session —
Claude Code, Claude chat, Kimi, or a human — can check a clause without waiting
for someone to upload a file.

**Read this file before answering any question about a rate, an allowance or an
entitlement.** Then check the clause in the `.txt` (plain text, so it's
searchable) and quote it. Don't rely on memory, and don't take a reviewer's
citation on trust — the register in `CLAUDE.md` was built this way and every
entry in it is quotable from these files.

Each document is stored as the **PDF as issued** plus a plain-text extraction
made only so it can be searched. **If the two ever disagree, the PDF wins.**

> ⚖️ **These are unofficial convenience copies.** PayCalc is not affiliated with
> or endorsed by the State of Queensland, the QIRC or the ATO. Read
> **[Copyright, licensing and disclaimer](#copyright-licensing-and-disclaimer)**
> at the bottom of this file before relying on, quoting or redistributing
> anything in here.

---

## ⚠ Staleness triggers — check these first

| When | What happens | What to do |
|---|---|---|
| **31 Jul 2026** | EBA CB/2023/139 reaches **nominal expiry**. It keeps operating until replaced, so not an automatic problem — but a replacement is imminent. | Ask whether the YDC 2026 agreement has been certified. If it has, this folder is out of date. |
| **~1 Sep 2026** | **State Wage Case 2026.** Moves the award pay scale, and the in-charge allowance with it (Award 13.7(a)). Laundry, overtime meal and motor vehicle move separately by CPI (13.7(b)–(c)) — do **not** apply the wage-case percentage to those. | A new award reprint will be issued. Replace `award-*.pdf` and re-verify clause 12.2. Round each new fortnightly salary to a whole dollar before dividing by 76. |
| **1 Sep 2026** | The site's rates ribbon flips itself to amber "Check rates" (`validUntil` in `assets/app.js`). | Push `validUntil` forward only after actually re-checking against a new reprint. |
| **1 Jul 2027** | ATO bottom marginal rate 15% → 14%. Schedules 1 and 8 get reissued. | Replace `ato-schedule-1-*.pdf` and re-verify the five scale tables in `assets/app.js`. |

If today's date is past a trigger and nothing here has changed, say so to the
owner rather than quietly assuming the documents still hold.

---

## What's here

### `award-2016-reprint-2025-09-01.pdf` / `.txt`
**Youth Detention Centre Employees Award – State 2016**, QIRC reprint under
s 980 of the *Industrial Relations Act 2016*.

| | |
|---|---|
| Matter | **B/2025/49 and B/2025/50** |
| Reprinted after | 2025 State Wage Case general ruling (3.5%) |
| Certified by | M. Shelley, Registrar, 5 September 2025 |
| Operative | **1 September 2025** |
| Superseded by | The next State Wage Case reprint (expected ~1 Sep 2026) |

The pay scale is **clause 12.2** and prints fortnightly salaries as whole
dollars, footnoted "Rounded to the nearest dollar". Clause **8.3(c)** defines an
hour as 1/76th of that fortnightly rate — that's where the ÷76 comes from.

### `eba-cb-2023-139.pdf` / `.txt`
**Youth Detention Centre Certified Agreement 2023.**

| | |
|---|---|
| Matter | **CB/2023/139** |
| Certified by | C.M. Hartigan DP, 7 December 2023 |
| Operative | 7 December 2023 |
| **Nominal expiry** | **31 July 2026** — continues in force until replaced |
| Superseded by | Certification of the YDC 2026 agreement (offered, not certified as at 26 Jul 2026) |

Carries the allowances the award doesn't: consolidated shift (2.9), operational
(2.10), retention (2.12) and qualification (4.1–4.2). Clause **2.18(6)** is why
the award floor prevails over the agreement's own rates.

### `ato-schedule-1-nat1004-from-2026-07-01.pdf` / `.txt`
**ATO Schedule 1 (NAT 1004)** — statement of formulas for calculating amounts to
be withheld. **Applies to payments made from 1 July 2026**; PDF built 16 Jun 2026.

✅ **Verified 26 Jul 2026 against `assets/app.js`.** All five scales the
calculator offers — 1, 2, 3, 5 and 6 — match the schedule exactly: every
threshold and both coefficients, to four decimal places. This closed the last
major unverified input in the project.

The coefficients are **weekly**. The calculator's fortnightly handling (halve,
truncate cents, add 99c, apply, round, double) is the ATO's own fortnightly
method. Scale 4 (no TFN quoted — 47% resident / 45% foreign resident) is in the
schedule but deliberately not offered by the calculator.

*Extraction note: this PDF uses subset fonts, so the `.txt` layout is jumbled
even though the characters are right. Coefficient rows read as
`<weekly band> <a> <b>`.*

### `directive-12-24-special-leave.pdf` / `.txt`
**Special Leave — Directive 12/24**, made under the *Public Sector Act 2022*.
Effective **30 September 2024**, supersedes 05/17.

⚠ **Clause 4.2 is the one that matters:** *"This directive does not apply to
casual employees (except in relation to unpaid Bereavement Leave and unpaid
Compassionate Leave)."* Paid special leave exists **only** under this directive
— the award has none and the EBA's only special-leave reference is unpaid union
work — so a casual has **no entitlement** to it.
🛑 The calculator still pays casual special leave anyway, deliberately. See the
casual-leave entry in `CLAUDE.md` before touching that: it models what payroll
sometimes does, and the warning lives in the Pay Guide wording instead.

Also load-bearing: clause 9 defines **full pay** as "the employee's ordinary rate
of pay … inclusive of any fixed allowances that are part of the regular
fortnightly pay, **excluding shift penalties and consolidated shift allowance
payments**". That's why paid special leave keeps retention/TSV/qualification but
gets no CSA — and it's what settled the retention-on-special-leave question.

*Extraction note: page 1 is flattened and doesn't extract. Clauses 3–4 were
transcribed from the rendered page into the top of the `.txt` and labelled as
transcribed.*

### `directive-16-18-locality-allowances.pdf` / `.txt`
**Locality Allowances — Directive 16/18.** Effective **11 May 2018**, supersedes
19/99 (the reference the EBA still carries at cl 2.8(2) is that stale one).

✅ **Verified 26 Jul 2026.** The schedule lists **Townsville $43.40 per
fortnight**, matching the site exactly. Clause 6 sets the full rate for an
employee with a dependent spouse, de facto or child, and **"one-half of the full
rate"** otherwise — $21.70, also matching. Both TSV figures now checked at source.

One rule the site doesn't mention: cl 8.1 pays the **half** rate even to an
employee with a dependent child if their spouse lives with them and is also
eligible for a locality allowance in their own right.

### `directive-16-24-higher-duties.pdf` / `.txt`
**Higher Duties — Directive 16/24**, made under the *Public Sector Act 2022*.

⚠ **cl 4.2(b): does not apply to casual employees.** So a casual's higher duties
comes from **Award cl 12.7 alone** — the full rate at the first paypoint of the
higher level — which is what the calculator pays and what the 26 Jul payslip
shows (12 hrs at the L5-1 rate, not a percentage top-up).

For **permanents** the directive does apply, and cl 9.1 pays a **"relevant
percentage" of the difference** between the substantive salary/paypoint and the
first paypoint of the higher level; cl 7.4 defines that percentage as the extent
to which the employee assumed the full duties, in the chief executive's opinion.
At 100% it comes to the same figure the calculator produces. Below 100% a
permanent would be paid less, and the calculator has no input for it.

Other clauses worth knowing: **cl 7.1** minimum period is more than 3 consecutive
working days at ≥75%, but 3 consecutive *weeks* below 75% — the award's
one-full-shift rule for youth worker→section supervisor and section→shift
supervisor is more generous and survives under the Award 12.7 note. **cl 10.1**
uses the next paypoint up where the substantive salary already exceeds the higher
level's first paypoint (never bites within OO3→OO6, since each level's first
paypoint sits above the previous level's top). **cl 11 and 15** keep the higher
duties amount running through recreation leave, long service leave, paid parental
leave and public holidays inside the relieving period.

### `directive-11-24-recreation-leave.pdf` / `.txt`
**Recreation Leave — Directive 11/24.** Effective **30 September 2024**,
supersedes 04/17. Applies to industrial-instrument public service employees
(cl 4.1); **cl 4.2(a) excludes casuals.**

Confirms two things the site says: Schedule One cl 2.1(b) gives continuous shift
workers in the Southern and Eastern Region **an extra week** on top of 20 days
(2.1(c) gives Northern and Western Region 25 days outright), so five weeks is
right; and cl 5.1–5.2 expressly provide **recreation leave on a half pay basis**
at the chief executive's discretion, which is what the Pay Guide's halved-hours
note is about.

🚩 **Open question — cl 16.1 pays continuous shift workers a 27.5% loading.**
The clause reads: salary "excluding ordinary shift, weekend and public holiday
penalties … plus a loading calculated at the rate of **27.5%** of this amount".
The calculator instead follows **EBA cl 2.9(5)**, where the CSA (26.96% for
OO3–OO5, 27.46% for OO6) continues through recreation leave *in lieu of* leave
loading. 27.5% is **higher** than 26.96%, and the Award cl 19 note says a
directive applies "to the extent it provides a more generous entitlement".

On a full fortnight of recreation leave that gap is about **$14–17** for OO3–OO5
(≈$35–43 a year over five weeks) and only ~$1.45 for OO6. **Nothing has been
changed** — which instrument governs is a question for a delegate or payroll, not
something to settle from the text alone, and no payslip we hold has recreation
leave on it. Flagged in the Pay Guide as an open question.

### `directive-13-23-domestic-travel.pdf` and `directive-13-23-rates-from-2025-09-01.pdf`
**Domestic Travelling and Relieving Expenses — Directive 13/23**, plus the rates
schedule after annual adjustment under clause 18, **effective 1 September 2025**.
Rates track ATO Taxation Determination **TD 2025/4** (Tables 1 and 4) and adjust
each year.

Only informs what belongs on the calculator's "other taxable earnings" line —
nothing here feeds a calculation. *No `.txt`: the directive's body is flattened
in the PDF and doesn't extract; read the PDF.*

---

## 📋 Wanted — one document still missing

**ATO Schedule 8 (NAT 3539)** — study and training support loans.
[ATO page](https://www.ato.gov.au/tax-rates-and-codes/schedule-8-statement-of-formulas-for-calculating-study-and-training-support-loans-components).

⚠ **Two attempts, both the same wrong file.** The PDF behind the obvious link
(`NAT 3539 … DIGITAL`) is built **30 May 2024** — FY2024-25, nil band to
$1,045.99/week — and downloading it again gets a byte-identical copy. Don't
retry that route. Try instead: the **HTML page** on ato.gov.au, which carries the
current coefficients inline, or the software-developers listing at
[Statement of formula rates and thresholds](https://softwaredevelopers.ato.gov.au/list/tax-preparation/statement-formula-rates-and-thresholds).
Whatever you grab, confirm the nil band starts near **$1,337/week** before
uploading — that's the figure the calculator uses, and if the document says
$1,045.99 it's the old one again. The
calculator's tables (`HELP_TFTR`, `HELP_NTFT` in `assets/app.js`) start at
$1,337/week, consistent with the post-2025-reform marginal structure indexed to
2026-27. They are internally coherent — each bracket joins the next continuously
— but **unverified**. Get the edition headed *"applies to payments made from
1 July 2026"*; the ATO keeps old editions online and it is easy to grab the wrong
one, so check the date before uploading. Only affects people carrying a study
loan.

Lower value, not chased: **Superannuation (State Public Sector) Regulation 2023**
(the 12.75% — already confirmed in practice, a payslip's employer contribution
came to exactly 12.75% of the full gross) and the **Queensland Employment
Standards** (IR Act 2016 ch 2 pt 3 — the award clauses that supplement it already
settle everything the calculator uses).

## Where to get current copies

Awards and certified agreements: **qirc.qld.gov.au**, searchable by matter
number. Directives: **forgov.qld.gov.au**. Tax schedules: **ato.gov.au**.

## Copyright, licensing and disclaimer

**These are not the official copies.** They are convenience copies kept for
reference. If anything turns on the wording, go to the official source — QIRC
awards and agreements at **qirc.qld.gov.au**, directives at
**forgov.qld.gov.au**, tax schedules at **ato.gov.au**. Where a copy here and
the official version differ, the official version governs.

**PayCalc is independent and unofficial.** It is a personal project by a private
individual. It is **not affiliated with, endorsed by, or connected to** the State
of Queensland, the Queensland Industrial Relations Commission, the Department of
Youth Justice and Victim Support, the Commonwealth, or the Australian Taxation
Office. Nothing in this folder implies any of those bodies endorse this site, its
author, or its calculations. The documents are reproduced to show where the
numbers come from, not to suggest any official standing.

**Attribution.**

- The **award** and the **certified agreement** are industrial instruments
  published by the **Queensland Industrial Relations Commission**.
- The **directives** (11/24, 12/24, 13/23, 16/18, 16/24) are issued by the
  Minister for Industrial Relations / Office of Industrial Relations under the
  *Public Sector Act 2022*. © **State of Queensland**.
- **ATO Schedule 1 (NAT 1004)** is a withholding schedule made by the
  Commissioner of Taxation. © **Commonwealth of Australia**.

Queensland Government material is, unless otherwise noted, licensed
**CC BY 4.0**, which permits redistribution provided the copyright notice is kept
and the State of Queensland is attributed as the source — both of which are done
here. ATO material may be copied and distributed freely provided it is not done
**in any way that suggests the ATO or the Commonwealth endorses** the user or
their products or services — hence the statement above.

**The PDFs are unmodified.** Each `.pdf` is the file as issued, complete with its
own copyright notice, crest and branding. Coats of arms, crests, logos and
trade marks are generally **excluded** from the open licences above and remain
the property of the issuing body; their presence in an unmodified document is not
a licence to use them separately, and implies no endorsement.

⚠ **The `.txt` files are adaptations, not official text.** They are automated
extractions made only so the documents can be searched. Layout is lost, some
characters may be mangled, and in two cases text was transcribed by hand where a
page would not extract (Directive 12/24 clauses 3–4, and headings in the ATO
schedule) — those are labelled in the files themselves. Treat every `.txt` as a
finding aid. **If the `.txt` and the `.pdf` disagree, the `.pdf` wins**, and if
the `.pdf` and the official published version disagree, the official version wins.

**No warranty, no advice.** These copies are provided as is. They may be
superseded at any time — see the staleness triggers at the top of this file.
Nothing here is legal, industrial, financial or tax advice. For a decision about
your own pay or entitlements, rely on your payslip and the official instruments,
and take it up with your payroll area, your union or a qualified adviser.

**Removal.** If you are a rights holder and want any document here taken down,
raise an issue on the repository and it will be removed.
