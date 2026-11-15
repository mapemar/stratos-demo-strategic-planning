# STRATOS — Independent Strategic Planning Case Study

A browser-based portfolio demonstration of a strategic planning and business-intelligence workflow, using SACE as a public-information case study.

## Important notice
This is an independent personal portfolio project. It is not affiliated with, endorsed by, or produced for SACE. It does not represent SACE's internal views, data, forecasts, risk appetite, or approved business plan. It uses public-source information and illustrative assumptions. All figures should be checked against original public disclosures before professional reliance.

## Deploy as a static website
- Entry point: `index.html`
- No build command is required.
- Publish the repository root as the output directory.
- The PowerPoint export feature loads PptxGenJS from jsDelivr at runtime and therefore requires an internet connection.

## Prototype limitations
The application is a front-end demonstration. It does not include secure authentication, a server-side database, document OCR/parsing, a live LLM/RAG connection, automated data refresh, or a validated actuarial/regulatory capital model. Model outputs and workflow-completeness indicators are illustrative.

## AI industrial plan generator
- The final output page includes an OpenAI Responses API generator for a 15-chapter SACE industrial plan and an editable PowerPoint deck.
- It uses GPT-6.1 Sol with high reasoning and JSON output. The generator combines SACE50 public-plan context, historical financial baseline, current editable assumptions, scenario outputs, and text from the platform's strategic, export, macro, financial, risk, KPI and benchmarking workstreams.
- The user enters their own OpenAI API key at runtime. The key stays in browser memory for the current session only; it is not written to the repository or browser storage. Requests are sent directly from the browser to OpenAI. This is a personal-use BYOK prototype, not a secure multi-user production architecture. Do not enter confidential employer or client information.
- PDF export uses the browser print dialogue (choose Save as PDF); PowerPoint export downloads an editable .pptx.
- Generated AI content remains in the active browser session and is not automatically published to GitHub Pages. Save the PDF/PPTX locally to share it; generation must be repeated after a page refresh.
- Uploaded documents are not yet OCR-parsed or indexed into a RAG knowledge base. The generator uses curated public-source context and text extracted from existing STRATOS analytical modules. Human verification remains necessary.
