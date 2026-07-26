# Source instruments

The primary documents PayCalc's numbers come from, kept here so any session —
Claude Code, Claude chat, Kimi, or a human — can check a clause without waiting
for someone to upload a file.

**Read this file before answering any question about a rate, an allowance or an
entitlement.** Then check the clause in the `.txt` (it's plain text, so it's
searchable) and quote it. Don't rely on memory, and don't take a reviewer's
citation on trust — the register in `CLAUDE.md` was built this way and every
entry in it is quotable from these files.

The `.docx` files are the originals as issued. The `.txt` files are plain-text
extractions of the same documents, made only so they can be searched — **if the
two ever disagree, the `.docx` wins.**

---

## ⚠ Staleness triggers — check these first

| When | What happens | What to do |
|---|---|---|
| **31 Jul 2026** | EBA CB/2023/139 reaches **nominal expiry**. It keeps operating until replaced, so this is not an automatic problem — but it means a replacement is imminent. | Ask whether the YDC 2026 agreement has been certified. If it has, this folder is out of date. |
| **~1 Sep 2026** | **State Wage Case 2026.** Moves the award pay scale, and the in-charge allowance with it (Award 13.7(a)). Laundry, overtime meal and motor vehicle move separately by CPI (13.7(b)–(c)) — do **not** apply the wage-case percentage to those. | A new award reprint will be issued. Replace `award-*.docx` and re-verify clause 12.2. Round each new fortnightly salary to a whole dollar before dividing by 76. |
| **1 Sep 2026** | The site's own rates ribbon flips to amber "Check rates" automatically (`validUntil` in `assets/app.js`). | Push `validUntil` forward only after actually re-checking against a new reprint. |
| **1 Jul 2027** | ATO bottom marginal rate 15% → 14%. Schedules 1 and 8 get reissued. | The tax tables are **not** held here — see below. |

If today's date is past a trigger and nothing in this folder has changed, say so
to the owner rather than quietly assuming the documents are still current.

---

## What's here

### `directive-12-24-special-leave.pdf` / `.txt`
**Special Leave — Directive 12/24**, Minister for Industrial Relations, made
under the *Public Sector Act 2022*. Effective **30 September 2024**, supersedes
05/17.

⚠ **Clause 4.2 is the one that matters:** *"This directive does not apply to
casual employees (except in relation to unpaid Bereavement Leave and unpaid
Compassionate Leave)."* Paid special leave exists **only** under this directive
— the award has none and the EBA's only special-leave reference is unpaid union
work — so **a casual has no paid special leave**, and the calculator zeroes it.

Also load-bearing: clause 9 defines **full pay** as "the employee's ordinary
rate of pay … inclusive of any fixed allowances that are part of the regular
fortnightly pay, **excluding shift penalties and consolidated shift allowance
payments**". That is why paid special leave keeps retention/TSV/qualification
but gets no CSA.

*Extraction note: page 1 of the PDF is flattened and its text doesn't extract.
Clauses 3–4 were transcribed from the rendered page into the top of the `.txt`
and are marked as such; the `.pdf` is authoritative.*

### `award-2016-reprint-2025-09-01.docx` / `.txt`
**Youth Detention Centre Employees Award – State 2016**, QIRC reprint under
s 980 of the *Industrial Relations Act 2016*.

| | |
|---|---|
| Matter | **B/2025/49 and B/2025/50** |
| Reprinted after | 2025 State Wage Case general ruling (3.5%) |
| Certified by | M. Shelley, Registrar, 5 September 2025 |
| Operative | **1 September 2025** |
| Superseded by | The next State Wage Case reprint (expected ~1 Sep 2026) |

The pay scale lives at **clause 12.2** and prints fortnightly salaries as whole
dollars, footnoted "Rounded to the nearest dollar". Clause **8.3(c)** defines an
hour as 1/76th of that fortnightly rate — that is where the ÷76 comes from.

### `eba-cb-2023-139.docx` / `.txt`
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

---

## 📋 Wanted — documents to add here, in priority order

Jaycob: these are the gaps, worst first. Drop any of them into a session and
they'll be added to this folder with the rest. Nothing here is urgent enough to
chase in one go.

1. **ATO Schedule 1** — [PAYG withholding, statement of formulas, NAT 1004](https://www.ato.gov.au/tax-rates-and-codes/payg-withholding-schedule-1-statement-of-formulas-for-calculating-amounts-to-be-withheld)
   — and **ATO Schedule 8** — [study and training support loans, NAT 3539](https://www.ato.gov.au/tax-rates-and-codes/schedule-8-statement-of-formulas-for-calculating-study-and-training-support-loans-components).
   **The single biggest gap.** Tax is the largest deduction on the payslip, the
   coefficients are hard-coded in `assets/app.js` (`SC`, `HELP_TFTR`,
   `HELP_NTFT`), and they are the only major input never checked against source
   — last verified 1 Sep 2025. The one piece of evidence since is a real payslip
   whose $994.00 withholding matched to the cent: a single point at a single
   income level. Take the version headed **"payments made from 1 July 2026"**.
   ⚠ Schedule 8 in particular has moved more than once lately — the ATO reissued
   it partway through 2025–26 (a separate edition covers 1 Jul – 23 Sep 2025),
   so check the effective date on whichever copy you grab.
2. **Locality Allowances — Directive 16/18**
   ([page](https://www.forgov.qld.gov.au/pay-benefits-and-policy/directives-policies-circulars-and-guidelines/locality-allowances-directive-1618)
   · [PDF](https://www.forgov.qld.gov.au/__data/assets/pdf_file/0028/185491/1618-locality-allowances.pdf)).
   Carries the TSV rates the calculator uses directly ($43.40 / $21.70 per
   fortnight) — a rate we publish and have never seen at source.
3. **Higher Duties — Directive 16/24**
   ([page](https://www.forgov.qld.gov.au/pay-benefits-and-policy/directives-policies-circulars-and-guidelines/higher-duties-directive-1624)
   · [PDF](https://www.forgov.qld.gov.au/__data/assets/pdf_file/0022/527116/higher-duties-directive-16-24.pdf)).
   Award cl 12.7 notes that a directive applies *"to the extent it provides a
   more generous entitlement"*, so this could override the 3-consecutive-days /
   one-full-shift rules. It also appears to describe HD as a *"relevant
   percentage of the difference"* between the substantive salary and the first
   paypoint of the higher level, which is a different mechanism from paying the
   full higher rate for HD hours the way the calculator (and the 26 Jul payslip)
   does. That is from a search summary, not the document — worth confirming.
4. **Recreation Leave — Directive 11/24**
   ([page](https://www.forgov.qld.gov.au/pay-benefits-and-policy/directives-policies-circulars-and-guidelines/recreation-leave-directive-1124)
   · [PDF](https://www.forgov.qld.gov.au/__data/assets/pdf_file/0023/527108/recreation-leave-directive-11-24.pdf)).
   Mostly accrual rather than rates; would confirm the five-weeks shiftworker
   entitlement and the 17.5% loading.
5. **Domestic Travelling & Relieving Expenses — Directive 13/23**
   ([page](https://www.forgov.qld.gov.au/pay-benefits-and-policy/directives-policies-circulars-and-guidelines/domestic-travelling-and-relieving-expenses-directive-1323)).
   Lowest value — only informs what belongs on the "other taxable earnings" line.
   Its rates track ATO Taxation Determination TD 2024/3 and adjust annually.

Already held: **Special Leave 12/24**
([page](https://www.forgov.qld.gov.au/pay-benefits-and-policy/directives-policies-circulars-and-guidelines/special-leave-directive-1224)).

The four directives are on forgov.qld.gov.au, which returns **403 to automated
fetches**, so they can't be pulled from inside a session — open the link in a
browser, download, and upload the file by hand. The ATO schedules download fine
in a browser too.

## What is *not* here, and matters

Everything in the wanted list above, plus:

- **Superannuation (State Public Sector) Regulation 2023** — the source of the
  12.75%. Lower priority than it looks: a real payslip's employer contribution
  came to exactly 12.75% of the full gross (laundry included), so the number and
  its base are both confirmed in practice.
- **Queensland Employment Standards** (Industrial Relations Act 2016, ch 2 pt 3).
  The award defers to it for annual leave (Div 5), long service leave (Div 9) and
  public holidays (Div 10). Nothing in the calculator turns on the QES text that
  isn't already settled by the award clauses that supplement it.

## Where to get current copies

Awards and certified agreements: **qirc.qld.gov.au**, searchable by matter
number. Directives: **forgov.qld.gov.au**. Tax tables: **ato.gov.au**.

## Copyright

These are public industrial instruments published by the Queensland Industrial
Relations Commission. Copyright remains with the State of Queensland; they are
reproduced here unmodified, for reference only. PayCalc is independent and
unofficial and is not endorsed by any of the bodies named in them.
