export const projects = [
  {
    name: "Product Label Comparison & Review Agent",
    dates: "2025 – Present",
    category: "AI Automation / Computer Vision",
    description:
      "Built an AI-powered review agent that compares packaging artwork versions and identifies changes in ingredients, nutrition facts, serving details, certification badges, and visual layout.",
    points: [
      "Designed a reusable computer-vision and OCR pipeline without hardcoded coordinates.",
      "Connected Copilot Studio, Azure Functions, SharePoint, and Microsoft Graph for end-to-end workflow automation.",
      "Generated client-ready PDF reports with visual evidence, summaries, and review findings.",
      "Implemented secure authentication, background processing, and production-ready error handling."
    ],
    tools: [
      "Python",
      "Azure Functions",
      "Copilot Studio",
      "SharePoint",
      "Microsoft Graph",
      "OpenCV",
      "RapidOCR",
      "ONNX Runtime"
    ],
    impact:
      "Reduced manual artwork review effort by converting unstructured packaging files into structured, audit-friendly findings."
  },
  {
    name: "M365 Governance Intelligence Platform",
    dates: "2025 – Present",
    category: "Microsoft 365 Security / Governance Analytics",
    description:
      "Built a Microsoft 365 security and governance analytics platform that helps organizations monitor SharePoint and OneDrive exposure, Entra ID user posture, Copilot activity, admin operations, and AI-agent governance from centralized dashboards.",
    points: [
      "Developed Microsoft Graph ingestion workflows to collect users, groups, sites, permissions, sign-in activity, and sharing metadata.",
      "Designed role-based dashboards for executive risk summaries, SharePoint exposure, Entra ID users/groups, Copilot telemetry, and job monitoring.",
      "Built PostgreSQL-backed reporting models using inventory tables, audit logs, job history, and materialized views.",
      "Implemented Entra ID group-based access control for protected admin, job control, license, and agent management workflows.",
      "Added admin controls for scheduling, run-now execution, permission revoke tracking, worker health, feature flags, and license-gated functionality."
    ],
    tools: [
      "Next.js",
      "Python",
      "PostgreSQL",
      "Microsoft Graph",
      "Microsoft Entra ID",
      "Docker",
      "Power Platform",
      "Application Insights"
    ],
    impact:
      "Centralized Microsoft 365 governance, security monitoring, Copilot telemetry, and admin operations into a single analytics platform."
  },
  {
  name: "Outlook Calendar Intelligence Agent",
  dates: "2025 – Present",
  category: "AI Agents / Microsoft Graph Automation",
  description:
    "Built an AI-powered Outlook Calendar Agent that allows authorized users to query organizational calendar data through a conversational interface using natural language.",
  points: [
    "Developed a Streamlit-based chat interface powered by Claude API and Microsoft Graph API.",
    "Built tool-calling workflows to retrieve today’s meetings, upcoming meetings, next meetings, date-range schedules, attendee searches, keyword searches, and meeting duration analysis.",
    "Implemented access control to ensure only authorized users can query calendar information.",
    "Added session-based conversation history, activity logging, retry handling, and user-friendly error messages.",
    "Integrated Azure Application Insights telemetry to monitor usage, tool execution, access events, failures, and runtime exceptions."
  ],
  tools: [
    "Python",
    "Streamlit",
    "Claude API",
    "Microsoft Graph API",
    "Azure Application Insights",
    "Prompt Engineering",
    "Tool Calling",
    "Access Control"
  ],
  impact:
    "Made calendar data easier to access and analyze by turning Outlook scheduling information into a secure, conversational business workflow."
  },
  {
  name: "Regulatory Intelligence & AI Governance Agent",
  dates: "2025 – Present",
  category: "AI Agents / Regulatory Automation / AI Governance",
  description:
    "Built an enterprise-ready Claude AI agent for regulatory monitoring, combining web scraping, SQL-based version tracking, change detection, authenticated access, telemetry, and AI governance.",
  points: [
    "Built a Claude-powered agent to scrape regulatory pages, store content in SQL Server, and detect changes across document versions.",
    "Created tool-calling workflows for regulation lookup, version comparison, change-log review, and monitored URL management.",
    "Integrated Microsoft Entra ID, Azure Application Insights, and Microsoft Purview DSPM for AI for enterprise authentication, telemetry, and governance.",
    "Designed a Streamlit interface with chat history, quick metrics, monitored URL controls, and real-time tool execution feedback."
  ],
  tools: [
    "Python",
    "Streamlit",
    "Claude API",
    "SQL Server",
    "Microsoft Entra ID",
    "Application Insights",
    "Microsoft Purview DSPM for AI",
    "Web Scraping"
  ],
  impact:
    "Helped turn changing regulatory web content into searchable, version-controlled, and audit-friendly intelligence."
  },
  {
    name: "Business Document Review Agent",
    dates: "2025 – Present",
    category: "AI Agents / Workflow Automation",
    description:
      "Created AI-driven workflows to help business teams review documents, extract key information, summarize findings, and speed up decision-making.",
    points: [
      "Built agent workflows for document intake, review, and structured output generation.",
      "Used prompt engineering and automation logic to improve response consistency.",
      "Integrated business files from SharePoint into automated review workflows.",
      "Created summaries and outputs designed for non-technical stakeholders."
    ],
    tools: [
      "Copilot Studio",
      "Azure Functions",
      "SharePoint",
      "Power Automate",
      "Microsoft Graph",
      "Prompt Engineering",
      "REST APIs"
    ],
    impact:
      "Helped reduce repetitive document-review work and made business information easier to process and act on."
  },
  {
    name: "NYC Taxi Data Analysis",
    dates: "Aug 2024 – Nov 2024",
    category: "Business Intelligence / SQL Analytics",
    description:
      "Analyzed NYC taxi trip data to uncover revenue trends, operational patterns, driver performance, and rider behavior.",
    points: [
      "Used CTEs, joins, subqueries, and window functions for advanced SQL analysis.",
      "Built analytical queries to identify trip patterns, revenue trends, and performance insights.",
      "Created stakeholder-style reporting outputs for business interpretation.",
      "Translated raw trip data into clear operational insights."
    ],
    tools: [
      "SQL",
      "Data Analysis",
      "Business Intelligence",
      "Dashboarding",
      "Reporting"
    ],
    impact:
      "Supported data-driven decision-making by identifying trends useful for operational planning and performance improvement."
  },
  {
    name: "Diabetes Patient Readmission Analysis",
    dates: "Jan 2024 – May 2024",
    category: "Predictive Analytics / Machine Learning",
    description:
      "Built machine learning models to analyze diabetic patient readmission risk and identify important clinical and operational factors.",
    points: [
      "Applied Logistic Regression and Random Forest models for prediction.",
      "Performed data cleaning, feature analysis, and model evaluation.",
      "Identified key factors associated with patient readmission risk.",
      "Documented the analysis as a clinical decision-support use case."
    ],
    tools: [
      "Python",
      "Pandas",
      "scikit-learn",
      "Random Forest",
      "Logistic Regression",
      "Healthcare Analytics"
    ],
    impact:
      "Supported better understanding of readmission risk factors and potential strategies for improving patient outcomes."
  },
  {
    name: "Secure File Access Management System",
    dates: "Jan 2022 – May 2022",
    category: "Security / Software Engineering",
    description:
      "Designed a secure file-access system with encrypted file sharing, QR-based key access, and email notification workflows.",
    points: [
      "Implemented secure file-access and transfer workflows.",
      "Added encryption logic and QR-code-based key sharing.",
      "Configured email alerts for access and sharing events.",
      "Documented functionality and supported UAT-style testing."
    ],
    tools: [
      "Security",
      "Encryption",
      "QR Code",
      "Email Alerts",
      "UAT",
      "Software Engineering"
    ],
    impact:
      "Improved secure file-sharing workflows and demonstrated compliance-focused access control design."
  }
] as const;