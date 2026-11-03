export const projects = [
  {
    name: "Product Label Comparison & Review Agent",
    kind: "agent",
    pipeline: ["SharePoint via Graph", "OCR + OpenCV diff", "Confidence check", "Annotated PDF"],
    dates: "2025 – Present",
    category: "AI Agent / Document AI & Vision",
    description:
      "A Copilot Studio label-review agent for a food brand that runs in production. It pulls label files from SharePoint, detects changes to ingredients, Nutrition Facts, and certification badges, and returns annotated PDFs.",
    points: [
      "Detects ingredient, Nutrition Facts, and badge changes using OCR and OpenCV on Azure Functions with Python.",
      "Raised change-detection accuracy from 68% to 88% on a self-built 50-case ground-truth benchmark.",
      "Uses RapidOCR on ONNX Runtime, with confidence thresholds that flag unclear reads instead of guessing.",
      "Pulls label files from SharePoint through Microsoft Graph and returns annotated PDF reports.",
      "Built a reusable computer-vision and OCR pipeline without hardcoded coordinates."
    ],
    tools: ["Copilot Studio", "Python", "Azure Functions", "Microsoft Graph", "SharePoint", "RapidOCR", "ONNX Runtime", "OpenCV"],
    impact:
      "Runs in production for a food brand, reducing label review time, with change-detection accuracy raised from 68% to 88%."
  },
  {
    name: "Insurance Intake Agent",
    kind: "agent",
    pipeline: ["Broker packet", "PDF + OCR parse", "Local LLM extract", "Human review"],
    dates: "2025 – Present",
    category: "AI Agent / Document AI / Local LLMs",
    description:
      "An on-device intake agent that reads five-document insurance broker packets, including ACORD forms, loss runs, and email, and extracts the values underwriters need.",
    points: [
      "Parses broker documents with PyMuPDF, pdfplumber, and RapidOCR.",
      "Extracts fields with local LLMs so documents stay on the device.",
      "Routes uncertain values to external models for human-in-the-loop review.",
      "Designed to improve intake reliability while limiting unsupported outputs."
    ],
    tools: ["Python", "PyMuPDF", "pdfplumber", "RapidOCR", "Local LLMs", "Human-in-the-loop"],
    impact:
      "Improved intake reliability for broker packets while limiting unsupported model outputs."
  },
  {
    name: "Local LLM Inference Bridge",
    kind: "platform",
    pipeline: ["Foundry Local API", "Bridge", "Ollama / llama.cpp", "CUDA GPU"],
    dates: "2025 – Present",
    category: "AI Infrastructure / Local LLMs",
    description:
      "Ran Qwen3-30B on an ASUS Ascent GX10 and built a Foundry Local-compatible bridge to Ollama and llama.cpp so agents can use local GPU models.",
    points: [
      "Served Qwen3-30B locally on an ASUS Ascent GX10 at about 30 tokens per second.",
      "Built a Foundry Local-compatible bridge to Ollama and llama.cpp with CUDA.",
      "Cut a six-call model workflow from about 10 minutes on CPU to 62.6 seconds."
    ],
    tools: ["Qwen3", "Ollama", "llama.cpp (CUDA)", "Foundry Local", "Python", "ASUS Ascent GX10"],
    impact:
      "Cut six model calls from about 10 minutes on CPU to 62.6 seconds on local GPU hardware."
  },
  {
    name: "Regulatory Intelligence & AI Governance Agent",
    kind: "agent",
    pipeline: ["Scrape sources", "SQL versioning", "Change detection", "LLM agent"],
    dates: "2025 – Present",
    category: "AI Agents / Regulatory Automation / AI Governance",
    description:
      "An enterprise Claude AI agent for regulatory monitoring that combines web scraping, SQL-based version tracking, change detection, authenticated access, telemetry, and AI governance.",
    points: [
      "Scrapes regulatory pages, stores content in SQL Server, and detects changes across document versions.",
      "Audits prompts and responses in Microsoft Purview DSPM for AI via Microsoft Graph.",
      "Logs per-turn telemetry in Application Insights, queried with KQL.",
      "Provides tool calls for regulation lookup, version comparison, change-log review, and monitored URL management.",
      "Uses Microsoft Entra ID for authentication and a Streamlit interface with chat history and monitored URL controls."
    ],
    tools: ["Python", "Claude API", "SQL Server", "Microsoft Purview DSPM for AI", "Microsoft Graph", "Application Insights", "KQL", "Microsoft Entra ID", "Streamlit"],
    impact:
      "Turned changing regulatory web content into searchable, version-controlled intelligence with every prompt and response audited."
  },
  {
    name: "Microsoft 365 & Copilot Risk Monitoring",
    kind: "platform",
    pipeline: ["9 sync jobs", "PostgreSQL models", "Entra ID access", "Risk dashboards"],
    dates: "2025 – Present",
    category: "Microsoft 365 Security / Governance Analytics",
    description:
      "A Microsoft 365 and Copilot risk monitoring platform for a client that tracks SharePoint and OneDrive sharing, Entra ID access, Copilot activity, and AI-agent usage from central dashboards.",
    points: [
      "Runs 9 data-sync jobs that load file-sharing, access, and AI-agent activity into PostgreSQL.",
      "Collects users, groups, sites, permissions, sign-in activity, and sharing metadata through Microsoft Graph.",
      "Provides role-based dashboards for executive risk summaries, SharePoint exposure, Entra ID users and groups, and Copilot telemetry.",
      "Uses Entra ID group-based access control for admin, job control, license, and agent management.",
      "Includes admin controls for scheduling, run-now jobs, permission revoke tracking, worker health, and feature flags."
    ],
    tools: ["Next.js", "Python", "PostgreSQL", "Microsoft Graph", "Microsoft Entra ID", "Docker", "Power Platform", "Application Insights"],
    impact:
      "Helped remove 1,250 risky sharing links and save 40 hours a month of access reviews."
  },
  {
    name: "AI Code Review Automation",
    kind: "agent",
    pipeline: ["Weekly schedule", "GitHub Actions", "Claude Code review", "Findings"],
    dates: "2025 – Present",
    category: "AI Agents / Developer Tooling",
    description:
      "Automated weekly AI code reviews across 25+ repositories with Claude Code and GitHub Actions.",
    points: [
      "Runs on a weekly GitHub Actions schedule across 25+ repositories.",
      "Flagged 50+ bugs and security risks.",
      "Saves more than 5 hours per week of manual review."
    ],
    tools: ["Claude Code", "GitHub Actions"],
    impact:
      "Flagged 50+ bugs and security risks and saves more than 5 hours a week of manual review."
  },
  {
    name: "Outlook Calendar Intelligence Agent",
    kind: "agent",
    pipeline: ["Chat prompt", "LLM tool call", "Graph API", "Answer + telemetry"],
    dates: "2025 – Present",
    category: "AI Agents / Microsoft Graph Automation",
    description:
      "An AI-powered Outlook Calendar agent that lets authorized users query organizational calendar data in natural language.",
    points: [
      "Built a Streamlit chat interface powered by the Claude API and Microsoft Graph API.",
      "Built tool calls for today’s meetings, upcoming meetings, date-range schedules, attendee and keyword searches, and meeting duration analysis.",
      "Restricted access so only authorized users can query calendar information.",
      "Added session history, activity logging, retry handling, and readable error messages.",
      "Sent usage, tool execution, access events, and failures to Azure Application Insights."
    ],
    tools: ["Python", "Streamlit", "Claude API", "Microsoft Graph API", "Azure Application Insights", "Prompt Engineering", "Tool Calling", "Access Control"],
    impact:
      "Made Outlook calendar data easy to query through a secure conversational workflow."
  },
  {
    name: "Business Document Review Agent",
    kind: "agent",
    pipeline: ["SharePoint intake", "Extraction", "AI summary", "Structured output"],
    dates: "2025 – Present",
    category: "AI Agents / Workflow Automation",
    description:
      "AI workflows that help business teams review documents, extract key information, and summarize findings.",
    points: [
      "Built agent workflows for document intake, review, and structured output.",
      "Used prompt engineering and automation logic to keep responses consistent.",
      "Connected SharePoint files to automated review workflows.",
      "Wrote summaries for non-technical stakeholders."
    ],
    tools: ["Copilot Studio", "Azure Functions", "SharePoint", "Power Automate", "Microsoft Graph", "Prompt Engineering", "REST APIs"],
    impact:
      "Reduced repetitive document-review work and made business information easier to act on."
  },
  {
    name: "E-commerce / Business Analytics Agent",
    kind: "agent",
    pipeline: ["Business question", "Prompt + SQL", "KPI analysis", "Insight summary"],
    dates: "2025 – Present",
    category: "Business Analytics / AI Agents",
    description:
      "An analytics-agent concept for e-commerce teams to explore sales trends, product performance, and customer behavior through natural-language questions.",
    points: [
      "Designed agent workflows for KPI lookup, sales trend summaries, and product-performance analysis.",
      "Structured outputs around revenue, conversion, customer segments, and product categories.",
      "Used prompt engineering and reporting logic to turn business questions into short, stakeholder-ready answers.",
      "Created a reusable pattern that connects dashboards, tabular data, and AI-assisted reporting."
    ],
    tools: ["Python", "SQL", "Business Intelligence", "Prompt Engineering", "AI Agents", "Dashboarding", "Data Analysis"],
    impact:
      "Moved business users from static reports to question-driven analysis of sales and operations."
  },
  {
    name: "Conversational AI Chatbots",
    kind: "agent",
    pipeline: ["Intents + entities", "Dialogue flows", "REST + webhooks", "QA + UAT"],
    dates: "Jan 2020 – Mar 2021",
    category: "Conversational AI / Kenyt.ai",
    description:
      "Designed, built, and deployed 50+ Rasa chatbots for clients in real estate, healthcare, education, restaurants, and e-commerce.",
    points: [
      "Modeled intents, entities, training utterances, and dialogue flows in Rasa.",
      "Built reusable templates from JSON dialogue flows and knowledge bases, cutting client onboarding from 2 weeks to 3 days.",
      "Created FAQ, payment, and booking modules reused across 100+ bots via REST APIs and webhooks.",
      "Ran QA, regression testing, and UAT with scripted conversations and Postman; weekly log reviews raised the answer rate by 20%."
    ],
    tools: ["Rasa", "Dialogflow", "JSON", "REST APIs", "Webhooks", "Postman"],
    impact:
      "Cut client onboarding from 2 weeks to 3 days and raised the answer rate by 20%."
  },
  {
    name: "Demand Forecasting & Inventory Optimization",
    kind: "data",
    pipeline: ["ADF ETL", "Lag features", "XGBoost + RF", "Power BI"],
    dates: "2022",
    category: "Machine Learning / Forecasting",
    description:
      "A demand forecasting and inventory optimization project for a retail company, built at Tata Consultancy Services to support supply chain planning.",
    points: [
      "Built Azure Data Factory ETL pipelines to integrate and clean sales and inventory data.",
      "Engineered rolling averages, holiday flags, and promotion indicators, and tuned models with GridSearchCV.",
      "Trained XGBoost and Random Forest models with time series cross-validation, MAE, and RMSE.",
      "Calculated safety stock and reorder points from forecasted demand and lead-time variability.",
      "Built Power BI dashboards to flag potential stockouts and excess inventory."
    ],
    tools: ["Python", "SQL", "Pandas", "scikit-learn", "XGBoost", "Random Forest", "Azure Data Factory", "Power BI"],
    impact:
      "Reduced forecast MAE by an estimated 12–15% over baseline models and helped lower excess inventory and stockout risk."
  },
  {
    name: "Diabetes Patient Readmission Prediction",
    kind: "data",
    pipeline: ["Data cleaning", "Feature engineering", "LogReg + Random Forest", "Cross-validation"],
    dates: "Jan 2024 – May 2024",
    category: "Machine Learning / Clark University",
    description:
      "Classification models that predict diabetic patient readmission risk and identify the factors behind it.",
    points: [
      "Trained Logistic Regression and Random Forest classifiers in scikit-learn.",
      "Random Forest reached 0.89 ROC-AUC and 84% accuracy.",
      "Collaborated on feature engineering to identify readmission risk factors.",
      "Evaluated models with cross-validation."
    ],
    tools: ["Python", "Pandas", "scikit-learn", "Random Forest", "Logistic Regression", "Healthcare Analytics"],
    impact:
      "Random Forest model reached 0.89 ROC-AUC and 84% accuracy on readmission prediction."
  },
  {
    name: "NYC Taxi Data Analysis",
    kind: "data",
    pipeline: ["Trip data", "SQL CTEs + windows", "Trend analysis", "Reporting"],
    dates: "Aug 2024 – Nov 2024",
    category: "Business Intelligence / SQL Analytics",
    description:
      "Analyzed NYC taxi trip data to find revenue trends, operational patterns, driver performance, and rider behavior.",
    points: [
      "Used CTEs, joins, subqueries, and window functions for SQL analysis.",
      "Wrote queries to find trip patterns, revenue trends, and performance insights.",
      "Produced stakeholder-style reports for business readers.",
      "Turned raw trip data into clear operational findings."
    ],
    tools: ["SQL", "Data Analysis", "Business Intelligence", "Dashboarding", "Reporting"],
    impact:
      "Identified trends useful for operational planning and performance improvement."
  },
  {
    name: "Secure File Access Management System",
    kind: "platform",
    pipeline: ["Encrypt file", "QR key share", "Access control", "Email alerts"],
    dates: "Jan 2022 – May 2022",
    category: "Security / Software Engineering",
    description:
      "A secure file-access system with encrypted file sharing, QR-based key access, and email notifications.",
    points: [
      "Implemented secure file-access and transfer workflows.",
      "Added encryption and QR-code-based key sharing.",
      "Configured email alerts for access and sharing events.",
      "Documented functionality and supported UAT-style testing."
    ],
    tools: ["Security", "Encryption", "QR Code", "Email Alerts", "UAT", "Software Engineering"],
    impact:
      "Demonstrated compliance-focused access control for secure file sharing."
  }
] as const;
