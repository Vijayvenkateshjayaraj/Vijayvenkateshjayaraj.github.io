from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics
from reportlab.platypus import (
    KeepTogether,
    ListFlowable,
    ListItem,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "Vijayvenkatesh_Jayaraj_Resume.pdf"

NAVY = colors.HexColor("#16324F")
BLUE = colors.HexColor("#2E6684")
TEXT = colors.HexColor("#202A33")
MUTED = colors.HexColor("#53616D")
RULE = colors.HexColor("#B9C9D4")
PALE = colors.HexColor("#EEF4F7")


def find_font(candidates: list[Path]) -> Path | None:
    return next((path for path in candidates if path.exists()), None)


regular_font = find_font(
    [
        Path("C:/Windows/Fonts/calibri.ttf"),
        Path("C:/Windows/Fonts/arial.ttf"),
    ]
)
bold_font = find_font(
    [
        Path("C:/Windows/Fonts/calibrib.ttf"),
        Path("C:/Windows/Fonts/arialbd.ttf"),
    ]
)

if regular_font and bold_font:
    pdfmetrics.registerFont(TTFont("ResumeRegular", str(regular_font)))
    pdfmetrics.registerFont(TTFont("ResumeBold", str(bold_font)))
    BODY_FONT = "ResumeRegular"
    BOLD_FONT = "ResumeBold"
else:
    BODY_FONT = "Helvetica"
    BOLD_FONT = "Helvetica-Bold"


styles = getSampleStyleSheet()
name_style = ParagraphStyle(
    "Name",
    parent=styles["Normal"],
    fontName=BOLD_FONT,
    fontSize=21,
    leading=23,
    textColor=NAVY,
    alignment=TA_CENTER,
    spaceAfter=2,
)
role_style = ParagraphStyle(
    "Role",
    parent=styles["Normal"],
    fontName=BOLD_FONT,
    fontSize=10.5,
    leading=12,
    textColor=BLUE,
    alignment=TA_CENTER,
    spaceAfter=4,
)
contact_style = ParagraphStyle(
    "Contact",
    parent=styles["Normal"],
    fontName=BODY_FONT,
    fontSize=8.4,
    leading=10,
    textColor=MUTED,
    alignment=TA_CENTER,
    spaceAfter=7,
)
section_style = ParagraphStyle(
    "Section",
    parent=styles["Heading2"],
    fontName=BOLD_FONT,
    fontSize=10.2,
    leading=12,
    textColor=NAVY,
    spaceBefore=4,
    spaceAfter=3,
    borderWidth=0,
)
body_style = ParagraphStyle(
    "Body",
    parent=styles["BodyText"],
    fontName=BODY_FONT,
    fontSize=8.5,
    leading=10.5,
    textColor=TEXT,
    spaceAfter=2,
)
job_style = ParagraphStyle(
    "Job",
    parent=body_style,
    fontName=BOLD_FONT,
    fontSize=9.2,
    leading=10.7,
    textColor=NAVY,
)
meta_style = ParagraphStyle(
    "Meta",
    parent=body_style,
    fontSize=8.2,
    leading=10,
    textColor=MUTED,
    alignment=2,
)
project_style = ParagraphStyle(
    "Project",
    parent=body_style,
    fontName=BOLD_FONT,
    fontSize=8.7,
    leading=10.2,
    textColor=TEXT,
)
skill_label_style = ParagraphStyle(
    "SkillLabel",
    parent=body_style,
    fontName=BOLD_FONT,
    fontSize=8.2,
    leading=10,
    textColor=NAVY,
)


def section(title: str):
    return Table(
        [[Paragraph(title.upper(), section_style)]],
        colWidths=[7.45 * inch],
        style=TableStyle(
            [
                ("BOTTOMPADDING", (0, 0), (-1, -1), 1.5),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("LINEBELOW", (0, 0), (-1, -1), 0.65, BLUE),
            ]
        ),
    )


def bullets(items: list[str]):
    return ListFlowable(
        [ListItem(Paragraph(item, body_style), leftIndent=9) for item in items],
        bulletType="bullet",
        start="circle",
        leftIndent=11,
        bulletFontName=BODY_FONT,
        bulletFontSize=6.5,
        bulletColor=BLUE,
        spaceAfter=2,
    )


def job(title: str, company: str, location: str, dates: str, items: list[str]):
    heading = Table(
        [
            [Paragraph(f"{title} | {company}", job_style), Paragraph(dates, meta_style)],
            [Paragraph(location, body_style), ""],
        ],
        colWidths=[5.75 * inch, 1.7 * inch],
        style=TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, 0), 0),
                ("BOTTOMPADDING", (0, 1), (-1, 1), 1),
            ]
        ),
    )
    return KeepTogether([heading, bullets(items)])


def project(name: str, description: str):
    return Paragraph(f"<b>{name}:</b> {description}", body_style)


def build_resume():
    doc = SimpleDocTemplate(
        str(OUTPUT),
        pagesize=LETTER,
        rightMargin=0.52 * inch,
        leftMargin=0.52 * inch,
        topMargin=0.38 * inch,
        bottomMargin=0.36 * inch,
        title="Vijayvenkatesh Jayaraj - AI & Business Solution Analyst Resume",
        author="Vijayvenkatesh Jayaraj",
        subject="Professional resume",
    )

    story = [
        Paragraph("VIJAYVENKATESH JAYARAJ", name_style),
        Paragraph("AI &amp; BUSINESS SOLUTION ANALYST", role_style),
        Paragraph(
            '+1 (774) 525-6102&nbsp;&nbsp; | &nbsp;&nbsp;'
            '<link href="mailto:vijayvenkateshj012@gmail.com" color="#2E6684">vijayvenkateshj012@gmail.com</link>'
            '&nbsp;&nbsp; | &nbsp;&nbsp;Princeton, NJ&nbsp;&nbsp; | &nbsp;&nbsp;'
            '<link href="https://www.linkedin.com/in/vijayvenkatesh-jayaraj-766139139/" color="#2E6684">LinkedIn</link>',
            contact_style,
        ),
        section("Professional Summary"),
        Paragraph(
            "AI and business solution analyst with experience translating business requirements into reliable analytics, "
            "automation, and enterprise AI workflows. Builds data validation, reporting, document intelligence, and "
            "governance solutions that reduce manual effort, improve data quality, and support confident decisions.",
            body_style,
        ),
        section("Professional Experience"),
        job(
            "AI & Business Solution Analyst",
            "Princeton IT Services",
            "Princeton, NJ",
            "May 2025 - Present",
            [
                "Build data validation and reconciliation workflows that improve accuracy across business and enterprise systems.",
                "Develop SQL and Excel-based checks to identify mismatches, reduce manual review, and support audit-ready reporting.",
                "Create SharePoint tracking logs to manage data issues, ownership, resolution progress, and operational follow-ups.",
                "Build AI-powered business agents and automation workflows for document review, information processing, and repetitive task reduction.",
            ],
        ),
        job(
            "Assistant System Engineer",
            "Tata Consultancy Services",
            "Kolkata, India",
            "Aug 2022 - Nov 2023",
            [
                "Translated business requirements into technical solutions for enterprise reporting, monitoring, and data workflows.",
                "Automated ETL and reporting workflows using SQL, Databricks, Azure Data Factory, and reusable transformation logic.",
                "Modernized legacy data workflows with Spark SQL and Databricks to improve processing performance and reliability.",
                "Built validation checks to identify transformation errors before deployment and reduce downstream reporting issues.",
            ],
        ),
        section("Selected AI & Business Solutions"),
        project(
            "Product Label Comparison & Review Agent",
            "Designed an AI-powered review platform using computer vision and OCR to compare packaging versions, detect content and layout changes, and generate client-ready reports with annotated evidence.",
        ),
        project(
            "Microsoft 365 Governance Intelligence Platform",
            "Developed centralized governance reporting for Microsoft 365 security, SharePoint exposure, identity management, Copilot activity, and administrative operations.",
        ),
        project(
            "Regulatory Intelligence & AI Governance Agent",
            "Built workflows that monitor regulatory websites, detect content changes, maintain version-controlled intelligence, and support enterprise authentication and monitoring.",
        ),
        project(
            "Outlook Calendar Intelligence Agent",
            "Developed a conversational assistant for natural-language meeting search, scheduling, attendee analysis, and operational monitoring.",
        ),
        section("Education"),
        Table(
            [
                [Paragraph("<b>Master of Science in Business Analytics</b> | Clark University, Worcester, MA", body_style), Paragraph("2024 - 2025", meta_style)],
                [Paragraph("<b>Bachelor of Engineering</b> | Anna University, Chennai, India", body_style), Paragraph("2018 - 2022", meta_style)],
            ],
            colWidths=[6.05 * inch, 1.4 * inch],
            style=TableStyle(
                [
                    ("VALIGN", (0, 0), (-1, -1), "TOP"),
                    ("LEFTPADDING", (0, 0), (-1, -1), 0),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                    ("TOPPADDING", (0, 0), (-1, -1), 0),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
                ]
            ),
        ),
        section("Technical Skills"),
        Table(
            [
                [Paragraph("AI & Automation", skill_label_style), Paragraph("AI agents, Copilot Studio, computer vision, OCR, prompt engineering, REST APIs, Power Automate", body_style)],
                [Paragraph("Analytics", skill_label_style), Paragraph("Python, SQL, Power BI, Tableau, Excel, Pandas, NumPy, Matplotlib, scikit-learn", body_style)],
                [Paragraph("Data & Cloud", skill_label_style), Paragraph("Databricks, Spark SQL, PostgreSQL, MySQL, SQL Server, Snowflake, Azure Data Factory, Azure Functions, Blob Storage, Key Vault, AWS", body_style)],
            ],
            colWidths=[1.15 * inch, 6.3 * inch],
            style=TableStyle(
                [
                    ("VALIGN", (0, 0), (-1, -1), "TOP"),
                    ("LEFTPADDING", (0, 0), (-1, -1), 0),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                    ("TOPPADDING", (0, 0), (-1, -1), 1),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
                    ("BACKGROUND", (0, 0), (0, -1), PALE),
                ]
            ),
        ),
    ]

    doc.build(story)


if __name__ == "__main__":
    build_resume()
