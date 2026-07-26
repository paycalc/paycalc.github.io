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

## What is *not* here, and matters

- **Four more directives**, cited across the site but not held: Higher Duties
  **16/24**, Recreation Leave **11/24**, Locality Allowances **16/18**, and
  Domestic Travelling & Relieving Expenses **13/23**. Published at
  forgov.qld.gov.au, which **blocks automated fetching** (403), so they can't be
  pulled from a session — ask the owner to upload one if a question turns on it.
  Of these, **16/18** carries the TSV rates the calculator uses ($43.40/$21.70
  per fortnight) and **16/24** could alter higher duties, since Award 12.7 notes
  a directive applies "to the extent it provides a more generous entitlement".
- **ATO Schedules 1 and 8** (PAYG and STSL coefficients, 1 Jul 2026). Hard-coded
  in `assets/app.js` and **the least-verified input in the whole calculator** —
  last checked against source 1 Sep 2025. The only evidence since is a real
  payslip whose $994.00 withholding matched to the cent (26 Jul 2026).
- **Superannuation (State Public Sector) Regulation 2023** — the 12.75% source.

## Where to get current copies

Awards and certified agreements: **qirc.qld.gov.au**, searchable by matter
number. Directives: **forgov.qld.gov.au**. Tax tables: **ato.gov.au**.

## Copyright

These are public industrial instruments published by the Queensland Industrial
Relations Commission. Copyright remains with the State of Queensland; they are
reproduced here unmodified, for reference only. PayCalc is independent and
unofficial and is not endorsed by any of the bodies named in them.
