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

### `directive-13-23-domestic-travel.pdf` and `directive-13-23-rates-from-2025-09-01.pdf`
**Domestic Travelling and Relieving Expenses — Directive 13/23**, plus the rates
schedule after annual adjustment under clause 18, **effective 1 September 2025**.
Rates track ATO Taxation Determination **TD 2025/4** (Tables 1 and 4) and adjust
each year.

Only informs what belongs on the calculator's "other taxable earnings" line —
nothing here feeds a calculation. *No `.txt`: the directive's body is flattened
in the PDF and doesn't extract; read the PDF.*

---

## 📋 Wanted — still missing, worst first

Drop any of these into a session and they'll be added here with the rest.

1. **ATO Schedule 8 (NAT 3539)** — study and training support loans.
   [ATO page](https://www.ato.gov.au/tax-rates-and-codes/schedule-8-statement-of-formulas-for-calculating-study-and-training-support-loans-components).
   ⚠ **A copy was uploaded on 26 Jul 2026 but it was the wrong edition** — built
   30 May 2024, i.e. FY2024-25, with a nil band up to $1,045.99/week. The
   calculator's tables (`HELP_TFTR`, `HELP_NTFT` in `assets/app.js`) start at
   $1,337/week, consistent with the post-2025-reform marginal structure indexed
   to 2026-27. They are internally coherent — each bracket joins the next
   continuously — but **unverified**. Get the edition headed *"applies to
   payments made from 1 July 2026"*; the ATO keeps old editions online and it's
   easy to grab the wrong one, so check the date before uploading.
2. **Locality Allowances — Directive 16/18**
   ([page](https://www.forgov.qld.gov.au/pay-benefits-and-policy/directives-policies-circulars-and-guidelines/locality-allowances-directive-1618)
   · [PDF](https://www.forgov.qld.gov.au/__data/assets/pdf_file/0028/185491/1618-locality-allowances.pdf)).
   Carries the TSV rates the calculator uses directly ($43.40 / $21.70 per
   fortnight) — rates we publish and have never seen at source.
3. **Higher Duties — Directive 16/24**
   ([page](https://www.forgov.qld.gov.au/pay-benefits-and-policy/directives-policies-circulars-and-guidelines/higher-duties-directive-1624)
   · [PDF](https://www.forgov.qld.gov.au/__data/assets/pdf_file/0022/527116/higher-duties-directive-16-24.pdf)).
   Award cl 12.7 notes a directive applies *"to the extent it provides a more
   generous entitlement"*. A search summary suggests it describes HD as a
   *"relevant percentage of the difference"* between the substantive salary and
   the first paypoint of the higher level — a different mechanism from paying the
   full higher rate for HD hours, which is what the calculator does and what the
   26 Jul payslip shows. From a summary, not the document; worth confirming.
4. **Recreation Leave — Directive 11/24**
   ([page](https://www.forgov.qld.gov.au/pay-benefits-and-policy/directives-policies-circulars-and-guidelines/recreation-leave-directive-1124)
   · [PDF](https://www.forgov.qld.gov.au/__data/assets/pdf_file/0023/527108/recreation-leave-directive-11-24.pdf)).
   Mostly accrual rather than rates; would confirm the five-weeks shiftworker
   entitlement and the 17.5% loading.

Lower value, not chased: **Superannuation (State Public Sector) Regulation 2023**
(the 12.75% — already confirmed in practice, a payslip's employer contribution
came to exactly 12.75% of the full gross) and the **Queensland Employment
Standards** (IR Act 2016 ch 2 pt 3 — the award clauses that supplement it already
settle everything the calculator uses).

The forgov links open fine in a browser; only **automated** fetching is blocked
(403), so download and upload by hand.

## Where to get current copies

Awards and certified agreements: **qirc.qld.gov.au**, searchable by matter
number. Directives: **forgov.qld.gov.au**. Tax schedules: **ato.gov.au**.

## Copyright

These are public instruments — industrial instruments published by the Queensland
Industrial Relations Commission, directives issued under the *Public Sector Act
2022*, and ATO withholding schedules. Copyright remains with the State of
Queensland and the Commonwealth; they are reproduced here unmodified, for
reference only. PayCalc is independent and unofficial and is not endorsed by any
of the bodies named in them.
