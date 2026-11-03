export const profile = {
  name: "Vijayvenkatesh Jayaraj",
  shortName: "Vijay Jayaraj",

  title: "AI Engineer",

  role: "AI Engineer · Princeton, NJ",

  summary:
    "I’m an AI Engineer with 4.5 years in software and data engineering. I integrate pretrained models into AI agents and document pipelines deployed for clients, and make them reliable with evaluation, guardrails, and human review.",

  about:
    "I started in conversational AI at Kenyt.ai, where I designed and deployed 50+ Rasa chatbots during a 15-month internship. At Tata Consultancy Services I built ETL pipelines and demand-forecasting models, and today at Princeton IT Services I build AI agents and document pipelines that run for clients in production.",

  aboutMore:
    "I hold a master’s in business analytics from Clark University and a bachelor’s in computer science from Anna University. Most of my work is about making AI reliable: benchmarks against ground truth, confidence thresholds, human-in-the-loop review, and telemetry on every run.",

  email: "vijayvenkateshj012@gmail.com",
  location: "Princeton, New Jersey, USA",
  phone: "",
  showPhone: false,

  resume: "/Vijayvenkatesh_Jayaraj_Resume.pdf",

  links: {
    linkedin: "https://www.linkedin.com/in/vijayvenkatesh-jayaraj-766139139/",
    github: "https://github.com/Vijayvenkateshjayaraj"
  },

  availability:
    "I’m looking for AI Engineer roles."
} as const;

export const navigation = [
  ["About", "#about"],
  ["Projects", "#projects"],
  ["Experience", "#experience"],
  ["Skills", "#stack"],
  ["Contact", "#contact"]
] as const;
