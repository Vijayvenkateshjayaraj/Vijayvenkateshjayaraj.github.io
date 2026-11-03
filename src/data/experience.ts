type Role = {
  title: string;
  company: string;
  location?: string;
  dates: string;
  bullets: readonly string[];
};

export const experience: readonly Role[] = [
  {
    title: "AI Engineer",
    company: "Princeton IT Services",
    location: "Princeton, New Jersey",
    dates: "May 2025 – Present",
    bullets: [
      "Built a Copilot Studio label-review agent for a food brand that runs in production. It pulls label files from SharePoint through Microsoft Graph, detects ingredient, Nutrition Facts, and badge changes using OCR and OpenCV on Azure Functions, and returns annotated PDFs.",
      "Raised change-detection accuracy from 68% to 88% on a self-built 50-case ground-truth benchmark, using RapidOCR on ONNX Runtime and OpenCV, with confidence thresholds that flag unclear reads instead of guessing.",
      "Designed an on-device insurance intake agent that reads five-document broker packets (ACORD forms, loss runs, and email) with PyMuPDF, pdfplumber, RapidOCR, and local LLMs, routing uncertain values to human-in-the-loop review.",
      "Ran Qwen3-30B on an ASUS Ascent GX10 at ~30 tokens/s and built a Foundry Local-compatible bridge to Ollama/llama.cpp (CUDA), cutting six model calls from ~10 min on CPU to 62.6 s.",
      "Added enterprise governance to a Claude-powered regulatory agent: prompts and responses are audited in Microsoft Purview DSPM for AI via Microsoft Graph, with per-turn telemetry in App Insights queried using KQL.",
      "Built Microsoft 365 and Copilot risk monitoring for a client: 9 data-sync jobs load file-sharing, access, and AI-agent activity into PostgreSQL, helping remove 1,250 risky sharing links and save 40 hrs/month of access reviews.",
      "Automated weekly AI code reviews across 25+ repositories with Claude Code and GitHub Actions, flagging 50+ bugs and security risks and saving more than 5 hours per week of manual review."
    ]
  },
  {
    title: "Assistant System Engineer – Data & ML",
    company: "Tata Consultancy Services",
    location: "Kolkata, India",
    dates: "May 2022 – Nov 2023",
    bullets: [
      "Developed a demand forecasting and inventory optimization project for a retail company using Python, SQL, Pandas, and scikit-learn to support supply chain planning.",
      "Built Azure Data Factory ETL pipelines to integrate and clean sales and inventory data for forecasting seasonality, promotions, and purchasing trends.",
      "Trained and evaluated XGBoost and Random Forest models with time series cross-validation, MAE, and RMSE, and built Power BI dashboards to flag potential stockouts and excess inventory.",
      "Engineered lag and time-based features and tuned hyperparameters with GridSearchCV, reducing MAE by an estimated 12–15% over baseline models.",
      "Calculated safety stock levels and reorder points from forecasted demand and lead-time variability to reduce excess inventory and stockout risk."
    ]
  },
  {
    title: "Conversation Designer Intern",
    company: "Kenyt.ai",
    dates: "Jan 2020 – Mar 2021",
    bullets: [
      "Designed, built, and deployed 50+ conversational AI chatbots across real estate, healthcare, education, restaurants, and e-commerce, modeling intents, entities, training utterances, and dialogue flows in Rasa.",
      "Built reusable templates from JSON dialogue flows and knowledge bases, cutting client onboarding from 2 weeks to 3 days; created FAQ, payment, and booking modules reused across 100+ bots via REST APIs and webhooks.",
      "Ran QA, regression testing, and UAT with scripted conversations and Postman; weekly log reviews raised the answer rate by 20%."
    ]
  }
];
