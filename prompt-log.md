# Prompt Log - MarinLakbay: Marinduque Cultural Heritage & Eco-Tourism Guide

## Project Overview
- *Sector:* Tourism & Cultural Innovation
- *Project Title:* MarinLakbay: Marinduque Cultural Heritage & Eco-Tourism Guide
- *Local Challenge:* Tourists and local visitors in Marinduque find it difficult to access centralized information on cultural heritage spots, track eco-friendly travel habits, and keep a personal log of visited eco-tourism destinations.
- *Target Users:* Eco-tourists, local visitors, students, and tour guides in Marinduque.
- *Proposed Solution:* A single-page web prototype providing a local cultural heritage site guide, an interactive eco-responsible travel checklist, and a visited spot logger.

---

## Task 2: Zero-Shot Prompting (Baseline)
*Objective:* Observe baseline code generation from Copilot using a brief instruction without context or constraints.

*Exact Prompt:*
Create a simple website called MarinLakbay for eco-tourists in Marinduque. Include a cultural spots guide, an eco-friendly travel checklist, and a visited spot notes section. Use HTML, CSS, and JavaScript.


*Actual Copilot Output:*
- Saved in relative path: outputs/baseline-zero-shot/index.html

*What Worked:*
- Produced a single HTML file containing inline CSS and basic JavaScript for a checklist.
- Generated basic text placeholders for cultural spots and visitor feedback forms.

*What Needs Improvement:*
- Missing modular file structure (HTML, CSS, and JS were combined).
- Lack of input validation for visits and missing live progress tracking for the checklist.
- No responsive layout or WCAG accessibility considerations.

*Next Action / Verification:*
- Structure the prompt using the Anatomy of a Prompt framework (Role, Context, Constraints, Acceptance Criteria).

---

## Task 3: Improvement via Anatomy of a Prompt
*Objective:* Generate modular, responsive, and accessible code by structuring prompt components.

*Exact Prompt:*
Act as an experienced frontend web developer. Create a responsive single-page website called MarinLakbay for eco-tourists and heritage visitors in Marinduque, Philippines.

Context: The website aims to help users explore local cultural sites, complete an eco-responsible travel checklist, and log their visited heritage destinations.

Requirements:
1. Create a Cultural Spots Guide with general educational information about Boac Cathedral, Maniwaya Island, and Moriones Cultural Heritage.
2. Create an interactive Eco-Travel Checklist with checkboxes, a progress counter, a progress bar, and a reset button.
3. Create a Visited Spot Form where users can enter a destination name, rating out of 5, and date visited. Display valid entries in a table.

Constraints:
- Use semantic HTML5, CSS3, and vanilla JavaScript.
- Create separate index.html, style.css, and script.js files.
- Do not use frameworks, a backend, a database, authentication, or external APIs.
- Do not include live weather, real-time ferry booking, or live travel warnings.
- Use simple English and a warm cultural-and-nature-themed design (terracotta, gold, green accents).
- Make the website responsive on desktop and mobile devices.
- Include accessible form labels and visible keyboard focus indicators.

Acceptance Criteria:
- All three main features must be present.
- The checklist progress must update when items are checked or unchecked.
- The reset button must uncheck all checklist items.
- The form must validate required fields and reject ratings outside 1–5.
- Valid travel log entries must appear in the table.
- Use text-safe methods when displaying user input.
- Explain how to run and test the website.

Generate the complete code for all three files.


*Actual Copilot Output:*
- Generated modular index.html, style.css, and script.js.
- Preserved in relative path: outputs/structured-prompt-v1/

*Key Differences vs. Task 2 Baseline:*
1. *Code Structure:* Task 2 generated a single inline file, whereas Task 3 separated code cleanly into dedicated HTML, CSS, and JS files.
2. *Interactivity & Validation:* Task 3 added real-time percentage progress updates for eco-checks and valid rating constraints.

*What Worked:*
- Clean responsive layout with warm cultural design accents.
- Active progress calculation and clean dynamic table insertion.

*What Needs Improvement:*
- Cultural card layout lacked standardized card formats across all site descriptions.

---

## Task 4: Few-Shot and Role Assignment

### Task 4A: Few-Shot Prompting
*Objective:* Standardize cultural spot card layouts using explicit examples.

*Exact Prompt:*
Update the Cultural Spots Guide section of my MarinLakbay website using few-shot prompting.

Follow these examples:

Example 1:
Spot: Boac Cathedral
Category: Historical & Religious
Description: Built in the 18th century; serves as a historic sanctuary and architectural landmark.

Example 2:
Spot: Moriones Tradition
Category: Cultural Heritage
Description: A centuries-old Lenten observance featuring hand-carved wooden masks and tunic costumes.

Create two additional cultural spot entries using the same format. Use general educational information only. Do not invent live event dates, ticket prices, or guaranteed tour schedules.

Display all spot entries as consistent, responsive cards using semantic HTML and CSS. Keep the existing website design and features. Do not rewrite unrelated code.


*Actual Copilot Output:*
- Generated formatted cards for Boac Cathedral, Moriones Tradition, Maniwaya Island, and Bathala Cave.
- Saved in relative path: outputs/few-shot-cards.html

*Observation:*
- Few-shot prompting ensured consistent card dimensions, badge positioning, and typography across all entries.

---

### Task 4B: Role Assignment Prompting
*Objective:* Identify accessibility and semantic flaws using an auditor perspective.

*Exact Prompt:*
Act as a Web Accessibility (WCAG 2.2) Specialist and Code Auditor. Review the current index.html and script.js files for the MarinLakbay website. Identify accessibility or semantic HTML defects (e.g., missing labels, keyboard navigation issues, focus states, or DOM injection risks). Provide a brief critique and recommended code corrections.


*Actual Copilot Output:*
- Copilot flagged missing aria-live dynamic announcements for the checklist progress bar and recommended explicit label-to-input pairings.
- Preserved response in: outputs/accessibility-audit-response.md

*Observation:*
- Role assignment brought attention to keyboard navigation and screen-reader usability concerns.

---

## Task 5: Structured Technical Reasoning & Refinement
*Objective:* Conduct a technical diagnosis and apply verifiable fixes.

*Exact Prompt:*
Review my MarinLakbay codebase. Check whether the interactive checklist updates correctly, whether form validation prevents invalid ratings, and whether the layout works on mobile. Identify the two most important implementation issues. Recommend minimal, targeted fixes and explain how to verify them.


*Selected Issues & Corrections:*
1. *Dynamic Text Insertion Risk:* Destination inputs were inserted using innerHTML, posing potential XSS script execution vulnerabilities. Refactored using safe textContent DOM nodes.
2. *Form Accessibility & Input Constraints:* Rating input field allowed negative or arbitrarily large integers. Implemented strict min="1" and max="5" boundary checks in JavaScript.

*Verification Results:*
- Inputted string tags (<script>alert('XSS')</script>) into destination fields; rendered safely as plain text string.
- Tested entering invalid ratings (e.g., 0 or 10), which triggered a clear user warning alert.

---

## Task 6: Final Comparison & Reflection

### Comparison Table
| Technique | Observation / Result |
| :--- | :--- |
| *Zero-Shot* | Produced an incomplete prototype without code separation, mobile styling, or input validation. |
| *Structured Prompt* | Successfully generated a modular 3-file frontend prototype meeting all technical specifications. |
| *Few-Shot* | Ensured uniform structural presentation and card hierarchy across all tourism site entries. |
| *Role Assignment* | Uncovered non-visual accessibility flaws (WCAG compliance, dynamic ARIA regions). |
| *Structured Analysis* | Solved DOM security risks (XSS) and validated user rating range logic. |

### Final Reflection
Prompt engineering functions as a lightweight technical specification tool. AI generation speeds up setup, but human supervision and verification remain vital to ensure code safety, accessibility, and user-experience quality.
Brian
## Task 5: Structured Technical Reasoning & Refinement
*Objective:* Conduct a technical diagnosis and apply verifiable fixes.

*Exact Prompt:*
Review my MarinLakbay codebase. Check whether the interactive checklist updates correctly, whether form validation prevents invalid ratings, and whether the layout works on mobile. Identify the two most important implementation issues. Recommend minimal, targeted fixes and explain how to verify them.


*Selected Issues & Corrections:*
1. *Dynamic Text Insertion Risk:* Destination inputs were inserted using innerHTML, posing potential XSS script execution vulnerabilities. Refactored using safe textContent DOM nodes.
2. *Form Accessibility & Input Constraints:* Rating input field allowed negative or arbitrarily large integers. Implemented strict min="1" and max="5" boundary checks in JavaScript.

*Verification Results:*
- Inputted string tags (<script>alert('XSS')</script>) into destination fields; rendered safely as plain text string.
- Tested entering invalid ratings (e.g., 0 or 10), which triggered a clear user warning alert.

---

## Task 6: Final Comparison & Reflection

### Comparison Table
| Technique | Observation / Result |
| :--- | :--- |
| *Zero-Shot* | Produced an incomplete prototype without code separation, mobile styling, or input validation. |
| *Structured Prompt* | Successfully generated a modular 3-file frontend prototype meeting all technical specifications. |
| *Few-Shot* | Ensured uniform structural presentation and card hierarchy across all tourism site entries. |
| *Role Assignment* | Uncovered non-visual accessibility flaws (WCAG compliance, dynamic ARIA regions). |
| *Structured Analysis* | Solved DOM security risks (XSS) and validated user rating range logic. |

### Final Reflection
Prompt engineering functions as a lightweight technical specification tool. AI generation speeds up setup, but human supervision and verification remain vital to ensure code safety, accessibility, and user-experience quality.