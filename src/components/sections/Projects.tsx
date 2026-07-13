"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronDown, LockKeyhole, ShieldCheck, X } from "lucide-react";
import { projects } from "@/data/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Project = (typeof projects)[number];

const projectsIntro = "A collection of AI, analytics, governance, and business-intelligence work. Open any project for its problem, solution, tools, and impact.";
const matrixGlyphs = "01<>[]{}#/\\";
const projectFilters = ["All", "AI Agents", "Analytics", "Governance", "Security"] as const;
type ProjectFilter = (typeof projectFilters)[number];

const reviewNotes = [
  { label: "Ingredient", change: "+ sunflower oil", className: "ingredient" },
  { label: "Nutrition", change: "Sodium updated", className: "nutrition" },
  { label: "Badge", change: "New certified mark", className: "badge" },
  { label: "Serving", change: "2 servings / pack", className: "serving" }
];

function LabelComparisonVisual() {
  const reduceMotion = useReducedMotion();
  const duration = reduceMotion ? 0 : 4.8;
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <div className="project-visual label-comparison-visual" aria-label="Product label comparison workflow showing four changes found">
      <div className="label-workflow" aria-hidden="true">
        {['Artwork', 'OCR', 'AI Review', 'PDF'].map((step, index) => (
          <span key={step} className={index === 2 ? 'active' : ''}>{step}</span>
        ))}
      </div>
      <motion.div className="label-stage" animate={reduceMotion ? undefined : { rotateX: [0, 1.2, 0], rotateY: [0, -1, 0] }} transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}>
        {['Version A', 'Version B'].map((version, index) => (
          <motion.div
            className={`package-label package-${index + 1}`}
            key={version}
            initial={reduceMotion ? false : { opacity: 0, y: 14, rotate: index ? 2 : -2 }}
            animate={{ opacity: 1, y: 0, rotate: index ? 1 : -1 }}
            transition={{ duration: reduceMotion ? 0 : .55, delay: reduceMotion ? 0 : index * .14, ease }}
          >
            <strong>{version}</strong><i /><i /><i /><em>{index ? 'NEW' : 'ORIGINAL'}</em>
          </motion.div>
        ))}
        <motion.div className="label-scan-beam" initial={false} animate={reduceMotion ? { top: '48%' } : { top: ['20%', '86%', '20%'] }} transition={{ duration, repeat: Infinity, ease: 'easeInOut', times: [0, .58, 1] }} aria-hidden="true" />
        {reviewNotes.map((note, index) => (
          <motion.div
            className={`label-note ${note.className}`}
            key={note.label}
            initial={reduceMotion ? false : { opacity: 0, scale: .82, y: 7 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: [0, 0, 1, 1, 0], scale: [0.82, 0.82, 1, 1, .94], y: [7, 7, 0, 0, -2] }}
            transition={reduceMotion ? { duration: 0 } : { duration, repeat: Infinity, delay: index * .16, times: [0, .2 + index * .05, .3 + index * .05, .82, 1], ease }}
          >
            <b>{note.label}</b><span>{note.change}</span>
          </motion.div>
        ))}
      </motion.div>
      <motion.div className="label-report" initial={reduceMotion ? false : { opacity: 0, x: 22 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: reduceMotion ? 0 : .5, delay: reduceMotion ? 0 : 1.35, ease }}>
        <span>PDF REPORT</span><strong>Review completed</strong><em>4 changes found</em>
      </motion.div>
    </div>
  );
}

const governanceNodes = [
  { name: "SharePoint", x: 18, y: 30, warning: true },
  { name: "Teams", x: 82, y: 23 },
  { name: "OneDrive", x: 84, y: 69 },
  { name: "Microsoft Entra", x: 18, y: 72 },
  { name: "Copilot", x: 31, y: 90 },
  { name: "Exchange", x: 69, y: 90 }
];

function GovernanceMapVisual({ autoPlay = false }: { autoPlay?: boolean }) {
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState(autoPlay);
  const [score, setScore] = useState(72);

  useEffect(() => {
    if (reduceMotion) {
      setScore(hovered ? 91 : 72);
      return;
    }

    const target = hovered ? 91 : 72;
    const interval = window.setInterval(() => {
      setScore((current) => {
        if (current === target) {
          window.clearInterval(interval);
          return current;
        }
        return current + Math.sign(target - current);
      });
    }, 34);
    return () => window.clearInterval(interval);
  }, [hovered, reduceMotion]);

  const connectionPaths = governanceNodes.map((node) => `M 50 52 L ${node.x} ${node.y}`);

  return (
    <motion.div
      className="project-visual governance-map-visual"
      aria-label={`Microsoft 365 tenant governance map. Governance score ${score}. ${hovered ? "External SharePoint access resolved. " : ""}1 risk resolved, 6 services monitored.`}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <div className="governance-heading"><span>Tenant governance map</span><b>LIVE</b></div>
      <svg className="governance-network" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <filter id="governance-glow"><feGaussianBlur stdDeviation=".55" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>
        {connectionPaths.map((path, index) => (
          <motion.path key={path} d={path} className={index === 0 && hovered ? "governance-link alert-link" : "governance-link"} initial={false} animate={{ pathLength: 1, opacity: hovered && index === 0 ? .9 : .48 }} transition={{ duration: reduceMotion ? 0 : .45 }} />
        ))}
        {!reduceMotion && connectionPaths.map((path, index) => (
          <motion.circle key={`particle-${path}`} r="1.05" className={index === 0 && hovered ? "governance-particle alert-particle" : "governance-particle"} filter="url(#governance-glow)" initial={{ offsetDistance: "0%" }} animate={{ offsetDistance: ["0%", "100%"] }} transition={{ duration: 2.1 + index * .16, delay: index * .13, repeat: Infinity, ease: "linear" }} style={{ offsetPath: `path('${path}')` }} />
        ))}
      </svg>
      <motion.div className="governance-core" animate={reduceMotion ? undefined : { scale: [1, 1.055, 1], boxShadow: ["0 0 14px rgba(91, 241, 206, .36)", "0 0 30px rgba(105, 230, 255, .72)", "0 0 14px rgba(91, 241, 206, .36)"] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}>
        <ShieldCheck /><strong>Governance</strong><span>Core</span>
      </motion.div>
      {governanceNodes.map((node, index) => (
        <motion.div key={node.name} className={`governance-node ${node.warning ? "sharepoint-node" : ""} ${node.warning && hovered ? "is-alert" : ""}`} style={{ left: `${node.x}%`, top: `${node.y}%` }} initial={reduceMotion ? false : { opacity: 0, scale: .72 }} animate={{ opacity: 1, scale: node.warning && hovered ? [1, 1.1, 1] : 1 }} transition={{ duration: reduceMotion ? 0 : .42, delay: reduceMotion ? 0 : index * .07 }}>
          <i /><span>{node.name}</span>
        </motion.div>
      ))}
      <motion.div className="governance-score" animate={{ borderColor: hovered ? "rgba(91, 241, 206, .76)" : "rgba(143, 226, 242, .32)" }}><span>Governance score</span><strong>{score}</strong></motion.div>
      <motion.div className="sharepoint-warning" initial={false} animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6, scale: hovered ? 1 : .94 }} transition={{ duration: reduceMotion ? 0 : .28 }} aria-hidden={!hovered}>
        <b>External access detected</b><span>SharePoint / Vendors</span>
      </motion.div>
      <motion.div className="permission-tree" initial={false} animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -7 }} transition={{ duration: reduceMotion ? 0 : .3, delay: reduceMotion ? 0 : .12 }} aria-hidden={!hovered}>
        <span>Vendors</span><i /><span>External user</span><i /><b>Link revoked</b>
      </motion.div>
      <motion.div className="resolve-shield" initial={false} animate={{ opacity: hovered ? 1 : 0, scale: hovered ? [0.7, 1.16, 1] : .7, rotate: hovered ? [0, -8, 0] : 0 }} transition={{ duration: reduceMotion ? 0 : .5, delay: reduceMotion ? 0 : .28 }} aria-hidden={!hovered}><ShieldCheck /></motion.div>
      <div className="governance-status"><span className={hovered ? "resolved" : ""}>{hovered ? "Risk resolved" : "Monitoring"}</span><b>1 risk resolved · 6 services monitored</b></div>
    </motion.div>
  );
}

function RegulatoryPipelineVisual() {
  const reduceMotion = useReducedMotion();
  const loop = { duration: 8, repeat: Infinity, ease: "easeInOut" as const };
  const flow = () => reduceMotion ? undefined : { opacity: [0, 0, 1, 1, 0], offsetDistance: ["0%", "0%", "100%", "100%", "100%"] };

  return (
    <div className="project-visual regulatory-pipeline-visual" aria-label="Regulatory intelligence pipeline: three websites monitored, a content change is versioned, compared, reviewed by Claude AI, authenticated, governed, and sent to an audit trail. 1 regulatory change detected, 2 affected requirements, audit trail secured.">
      <svg viewBox="0 0 600 260" role="img" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="reg-flow" x1="0" x2="1"><stop stopColor="#70f8e5" /><stop offset="1" stopColor="#58cfee" /></linearGradient>
          <filter id="reg-glow"><feGaussianBlur stdDeviation="3" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>
        <g className="reg-websites">
          {[{ x: 22, label: "FDA" }, { x: 22, label: "EMA" }, { x: 22, label: "MHRA" }].map((site, index) => (
            <g key={site.label} transform={`translate(${site.x} ${31 + index * 45})`} className={index === 1 ? "reg-site reg-site-update" : "reg-site"}>
              <rect width="95" height="32" rx="5" /><path d="M0 9h95M8 5h1M13 5h1M18 5h1M10 16h44M10 22h65" /><text x="73" y="25">{site.label}</text>
              {index === 1 && <motion.circle cx="84" cy="5" r="3" animate={reduceMotion ? undefined : { opacity: [0, 1, 1, 0], scale: [.5, 1.2, 1, .5] }} transition={{ ...loop, times: [0, .18, .52, 1] }} />}
            </g>
          ))}
          <motion.g className="reg-radar" animate={reduceMotion ? undefined : { rotate: 360 }} transition={{ duration: 3.4, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "137px 92px" }}><path d="M137 92 L172 62 A46 46 0 0 0 137 46Z" /></motion.g>
          <circle className="reg-radar-ring" cx="137" cy="92" r="44" /><circle className="reg-radar-ring" cx="137" cy="92" r="27" /><circle className="reg-radar-dot" cx="137" cy="92" r="4" />
        </g>
        <path id="reg-to-sql" className="reg-flow-line" d="M118 94 C160 94 161 158 205 158" />
        <path id="reg-to-ai" className="reg-flow-line" d="M337 158 C360 158 361 111 395 111" />
        <path id="reg-to-audit" className="reg-flow-line" d="M484 111 C504 111 510 159 545 159" />
        {[{ path: "M118 94 C160 94 161 158 205 158", delay: .8 }, { path: "M337 158 C360 158 361 111 395 111", delay: 2.7 }, { path: "M484 111 C504 111 510 159 545 159", delay: 5.1 }].map((item, index) => (
          <motion.circle key={index} r="4" className="reg-packet" filter="url(#reg-glow)" style={{ offsetPath: `path('${item.path}')` }} animate={flow()} transition={{ ...loop, delay: item.delay, times: [0, item.delay / 8, (item.delay + 1.2) / 8, (item.delay + 1.6) / 8, 1] }} />
        ))}
        <g className="reg-sql" transform="translate(205 132)"><ellipse cx="61" cy="10" rx="58" ry="10" /><path d="M3 10v34c0 13 116 13 116 0V10M3 27c0 13 116 13 116 0" /><text x="25" y="28">SQL TRACKER</text><text x="17" y="44">Version 12  →  13</text></g>
        <g className="reg-diff" transform="translate(202 181)"><rect width="139" height="55" rx="6" /><text x="10" y="13">DOCUMENT DIFFERENCE</text><path d="M10 23h48M80 23h47M10 33h38M80 33h37M10 43h48M80 43h39" /><rect className="reg-added" x="10" y="20" width="48" height="6" /><rect className="reg-removed" x="80" y="30" width="37" height="6" /><rect className="reg-modified" x="10" y="40" width="48" height="6" /></g>
        <motion.g className="reg-claude" transform="translate(395 78)" animate={reduceMotion ? undefined : { filter: ["drop-shadow(0 0 2px #5bf1ce)", "drop-shadow(0 0 10px #6ae6ff)", "drop-shadow(0 0 2px #5bf1ce)"] }} transition={{ duration: 2.2, repeat: Infinity }}><circle cx="44" cy="33" r="31" /><path d="M30 33c6-13 20-13 27 0-7 13-21 13-27 0Zm9-7v14m-6-7h12" /><text x="21" y="75">CLAUDE AI</text><text x="4" y="88">COMPLIANCE REVIEW</text></motion.g>
        <g className="reg-security" transform="translate(490 63)"><rect x="0" y="25" width="28" height="22" rx="4" /><path d="M7 25v-8a7 7 0 0 1 14 0v8M47 11l16 7v12c0 11-8 17-16 20-8-3-16-9-16-20V18Z" /><path d="m41 30 5 5 9-11" /><text x="-6" y="60">AUTH + GOVERN</text></g>
        <g className="reg-audit" transform="translate(545 137)"><path d="M6 0v66M2 12h10M2 31h10M2 50h10" /><circle cx="7" cy="12" r="3" /><circle cx="7" cy="31" r="3" /><circle cx="7" cy="50" r="3" /><text x="18" y="16">AUDIT</text><text x="18" y="30">TIMELINE</text></g>
      </svg>
      <div className="reg-status"><span>1 regulatory change detected</span><i /> <span>2 affected requirements</span><i /> <b>Audit trail secured</b></div>
    </div>
  );
}

function AnalyticsWorkspaceVisual() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(true);
  const [kpis, setKpis] = useState([0, 0, 0]);
  const duration = reduceMotion ? 0 : 7.8;
  const sequence = active ? ["question", "sql", "kpis", "insight"] : [];

  useEffect(() => {
    if (!active || reduceMotion) {
      setKpis(reduceMotion ? [124, 186, 4820] : [0, 0, 0]);
      return;
    }

    const start = window.setTimeout(() => {
      const began = Date.now();
      const timer = window.setInterval(() => {
        const progress = Math.min(1, (Date.now() - began) / 1200);
        setKpis([Math.round(124 * progress), Math.round(186 * progress), Math.round(4820 * progress)]);
        if (progress === 1) window.clearInterval(timer);
      }, 30);
    }, 2800);
    return () => window.clearTimeout(start);
  }, [active, reduceMotion]);

  const visible = (step: string) => reduceMotion || sequence.includes(step);
  const transition = (delay: number) => ({ duration: reduceMotion ? 0 : .45, delay: reduceMotion ? 0 : delay, ease: "easeOut" as const });
  const packet = () => reduceMotion ? undefined : { opacity: [0, 0, 1, 1, 0], offsetDistance: ["0%", "0%", "100%", "100%", "100%"] };

  return (
    <motion.div className="project-visual analytics-workspace-visual" onHoverStart={() => setActive(true)} onHoverEnd={() => setActive(false)} onFocus={() => setActive(true)} onBlur={() => setActive(false)} aria-label="Analytics workspace answering which product category generated the most revenue. Organic Products led revenue, driven by returning customers.">
      <svg viewBox="0 0 600 260" role="img" preserveAspectRatio="xMidYMid meet">
        <title>Question-to-insight analytics workspace</title>
        <defs><filter id="analytics-glow"><feGaussianBlur stdDeviation="3" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter></defs>
        <motion.g animate={{ opacity: visible("question") ? 1 : .65 }} transition={transition(0)}><rect className="analytics-prompt" x="18" y="18" width="564" height="32" rx="8" /><text className="analytics-prompt-text" x="34" y="39">Which product category generated the most revenue?</text></motion.g>
        {[{ x: 45, label: "Question" }, { x: 190, label: "SQL Analysis" }, { x: 344, label: "KPI Calculation" }, { x: 493, label: "Business Insight" }].map((step, index) => <motion.g key={step.label} animate={{ opacity: visible(["question", "sql", "kpis", "insight"][index]) ? 1 : .25 }} transition={transition(index * 1.35)}><rect className="analytics-step" x={step.x} y="65" width={index === 2 ? 105 : 78} height="22" rx="11" /><text className="analytics-step-text" x={step.x + (index === 2 ? 52 : 39)} y="80" textAnchor="middle">{step.label}</text></motion.g>)}
        {[{ path: "M123 76H190", delay: .45 }, { path: "M268 76H344", delay: 1.8 }, { path: "M449 76H493", delay: 3.15 }].map((item) => <g key={item.path}><path className="analytics-connector" d={item.path} />{active && <motion.circle r="3.5" className="analytics-packet" filter="url(#analytics-glow)" style={{ offsetPath: `path('${item.path}')` }} animate={packet()} transition={{ duration, delay: item.delay, times: [0, item.delay / duration, (item.delay + .55) / duration, (item.delay + .9) / duration, 1], repeat: Infinity }} />}</g>)}
        <motion.g animate={{ opacity: visible("sql") ? 1 : .42, y: visible("sql") ? 0 : 6 }} transition={transition(1.35)}><rect className="analytics-panel" x="19" y="104" width="152" height="120" rx="8" /><text className="analytics-label" x="31" y="120">BUSINESS DATASET</text>{[0, 1, 2, 3, 4].map((row) => <g key={row}><path className="analytics-row" d={`M31 ${133 + row * 15}h126`} /><rect className={row === 1 ? "analytics-scan-cell" : "analytics-cell"} x="35" y={128 + row * 15} width={row === 1 ? 58 : 42 + row * 7} height="7" rx="2" /></g>)}<motion.rect className="analytics-scan" x="27" width="136" height="12" rx="3" animate={reduceMotion ? { y: 149 } : { y: active ? [126, 198, 126] : 126 }} transition={{ duration: 1.35, repeat: active ? Infinity : 0, ease: "easeInOut" }} /></motion.g>
        <motion.g animate={{ opacity: visible("kpis") ? 1 : 0, scale: visible("kpis") ? 1 : .88 }} transition={transition(2.7)}><rect className="analytics-panel" x="183" y="104" width="170" height="120" rx="8" /><text className="analytics-label" x="195" y="120">KPI CALCULATION</text>{[["$", `${kpis[0] / 100}`, "M Revenue"], ["", `${(kpis[1] / 10).toFixed(1)}`, "% Conversion"], ["", kpis[2].toLocaleString(), " Customers"]].map(([prefix, value, label], index) => <g key={label as string} transform={`translate(195 ${145 + index * 24})`}><text className="analytics-kpi" x="0" y="0">{prefix}{value}</text><text className="analytics-kpi-label" x="62" y="0">{label}</text></g>)}</motion.g>
        <motion.g animate={{ opacity: visible("insight") ? 1 : 0, x: visible("insight") ? 0 : 8 }} transition={transition(4.05)}><rect className="analytics-panel" x="365" y="104" width="216" height="120" rx="8" /><text className="analytics-label" x="377" y="120">REVENUE EXPLORER</text><path className="analytics-line" d="M378 169 L402 160 L425 166 L449 145 L474 151 L498 131 L525 139" /><path className="analytics-area" d="M378 169 L402 160 L425 166 L449 145 L474 151 L498 131 L525 139V181H378Z" /><circle className="analytics-donut-base" cx="550" cy="150" r="20" /><circle className="analytics-donut" cx="550" cy="150" r="20" /><text className="analytics-donut-text" x="550" y="153" textAnchor="middle">62%</text>{[["Organic Products", 82], ["Home Goods", 49], ["Snacks", 32]].map(([label, width], index) => <g key={label as string} transform={`translate(378 ${195 + index * 9})`}><text className={index === 0 ? "analytics-rank top" : "analytics-rank"} x="0" y="0">{label}</text><rect className={index === 0 ? "analytics-rank-bar top" : "analytics-rank-bar"} x="86" y="-6" width={width as number} height="5" rx="2" /></g>)}</motion.g>
        <motion.g animate={{ opacity: visible("insight") ? 1 : 0, y: visible("insight") ? 0 : 6 }} transition={transition(5.15)}><rect className="analytics-insight" x="58" y="236" width="484" height="17" rx="8" /><text className="analytics-insight-text" x="300" y="248" textAnchor="middle">Organic Products led revenue, driven by returning customers.</text></motion.g>
      </svg>
    </motion.div>
  );
}

function OutlookCalendarVisual() {
  const reduceMotion = useReducedMotion();
  const loop = { duration: reduceMotion ? 0 : 8, repeat: reduceMotion ? 0 : Infinity, ease: "easeInOut" as const };
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  return (
    <div className="project-visual outlook-calendar-visual" aria-label="Five-day Outlook calendar intelligence view. An AI scan detects two overlapping meetings, reschedules a client meeting, identifies three follow-ups, and creates two hours of protected focus time.">
      <div className="calendar-topbar"><span className="outlook-mark">O</span><b>Calendar intelligence</b><em>AI LIVE</em></div>
      <div className="calendar-frame" aria-hidden="true">
        <div className="calendar-times"><span>9 AM</span><span>11 AM</span><span>1 PM</span><span>3 PM</span></div>
        <div className="calendar-days">{days.map((day) => <span key={day}>{day}</span>)}</div>
        <div className="calendar-grid" />
        <motion.div className="ai-scan-line" animate={reduceMotion ? { left: "49%", opacity: .75 } : { left: ["2%", "95%", "2%"], opacity: [0, 1, 1, 0] }} transition={{ ...loop, times: [0, .12, .78, 1] }} />
        <div className="calendar-event priority-event" style={{ left: "3%", top: "25%", width: "17%" }}><b>Exec review</b><span>High priority</span></div>
        <div className="calendar-event followup-event" style={{ left: "23%", top: "49%", width: "17%" }}><b>Project sync</b><span>Follow-up required</span></div>
        <div className="calendar-event conflict-event" style={{ left: "43%", top: "31%", width: "17%" }}><b>Team planning</b><span>11:00–12:00</span></div>
        <motion.div className="calendar-event client-event" initial={false} animate={reduceMotion ? { left: "63%", top: "60%", opacity: 1 } : { left: ["43%", "45%", "54%", "63%", "63%"], top: ["38%", "27%", "43%", "60%", "60%"], opacity: [1, 1, 1, 1, 1] }} transition={{ ...loop, times: [0, .16, .37, .56, 1] }}><b>Northstar</b><span>Client meeting</span></motion.div>
        <motion.div className="conflict-warning" initial={false} animate={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: [0, 0, 1, 1, 0], scale: [.92, .92, 1, 1, .96] }} transition={{ ...loop, times: [0, .16, .24, .52, .61] }}>Schedule conflict</motion.div>
        <div className="calendar-event focus-event" style={{ left: "63%", top: "21%", width: "17%" }}><LockKeyhole /><b>Focus Time</b><span>2 hours protected</span></div>
        <div className="calendar-event followup-event" style={{ left: "83%", top: "45%", width: "14%" }}><b>Proposal</b><span>Follow-up</span></div>
      </div>
      <motion.div className="calendar-summary" initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={reduceMotion ? { opacity: 1 } : { opacity: [0, 0, 1, 1, 0], y: [8, 8, 0, 0, -2] }} transition={{ ...loop, times: [0, .56, .66, .93, 1] }}><b>2 conflicts resolved</b><i /> <span>3 follow-ups identified</span><i /> <em>2 hours focus time created</em></motion.div>
    </div>
  );
}

function DocumentReviewWorkflowVisual({ autoPlay = false }: { autoPlay?: boolean }) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(autoPlay);
  const running = autoPlay || active || reduceMotion;
  const transition = (delay: number) => ({ duration: reduceMotion ? 0 : .48, delay: reduceMotion ? 0 : delay, ease: "easeOut" as const });
  const visible = () => running ? { opacity: 1, y: 0 } : { opacity: .34, y: 5 };
  const fields = [
    ["Vendor", "Northstar Office"], ["Amount", "$24,800"], ["Due date", "Aug 15, 2026"], ["Department", "Operations"], ["Approval", "Signature missing"]
  ];

  return (
    <motion.div
      className="project-visual document-review-visual"
      onHoverStart={() => setActive(true)}
      onHoverEnd={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      aria-label="Business document review workflow. A SharePoint document is sent through Copilot Studio and an Azure Function to structured output. The document is complete except for final approval. 8 fields extracted and 1 action required."
    >
      <svg viewBox="0 0 600 260" role="img" preserveAspectRatio="xMidYMid meet">
        <title>Business document review workflow</title>
        <defs>
          <filter id="document-review-glow"><feGaussianBlur stdDeviation="3" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          <linearGradient id="document-review-beam" x1="0" x2="1"><stop stopColor="transparent" /><stop offset=".22" stopColor="#77fff0" /><stop offset=".78" stopColor="#72dfff" /><stop offset="1" stopColor="transparent" /></linearGradient>
        </defs>
        <g className="document-review-flow">
          {["SharePoint", "Copilot Studio", "Azure Function", "Structured Output"].map((step, index) => (
            <motion.g key={step} animate={visible()} transition={transition(index * 1.1)}>
              <rect x={16 + index * 146} y="13" width={index === 3 ? 122 : 111} height="20" rx="10" />
              <text x={71 + index * 146} y="27" textAnchor="middle">{step}</text>
              {index < 3 && <path d={`M${127 + index * 146} 23h27`} />}
            </motion.g>
          ))}
        </g>

        <motion.g className="document-review-folder" animate={reduceMotion ? { opacity: 1 } : { opacity: active ? [1, 1, .45] : 1 }} transition={{ duration: 6.6, repeat: active ? Infinity : 0, times: [0, .12, 1] }}>
          <path d="M28 73h37l8 8h57v55H28Z" /><path d="M28 83h102" />
          <text x="79" y="111" textAnchor="middle">VENDOR INVOICES</text><text x="79" y="123" textAnchor="middle">SharePoint</text>
        </motion.g>
        <motion.g className="document-review-document" animate={reduceMotion ? { x: 0, y: 0, rotate: 0, opacity: 1 } : { x: active ? [0, 44, 89, 89] : 0, y: active ? [0, -4, 0, 0] : 0, rotate: active ? [0, -2, 0, 0] : 0, opacity: 1 }} transition={{ duration: 6.6, repeat: active ? Infinity : 0, times: [0, .16, .3, 1], ease: "easeInOut" }} style={{ transformOrigin: "105px 102px" }}>
          <rect x="74" y="67" width="63" height="89" rx="5" /><path d="M119 67v18h18M85 96h40M85 108h40M85 120h30M85 132h37" />
          <text x="84" y="83">INVOICE</text>
          {[102, 114, 126, 138, 150].map((y, index) => <motion.rect key={y} className={index === 4 ? "document-review-alert-field" : "document-review-field"} x="83" y={y} width={index === 4 ? 39 : 45 - index * 3} height="6" rx="2" animate={{ opacity: running ? 1 : .45 }} transition={transition(2.25 + index * .23)} />)}
          <motion.rect className="document-review-beam" x="77" width="57" height="9" rx="3" animate={reduceMotion ? { y: 116, opacity: .7 } : { y: active ? [83, 145, 83] : 83, opacity: active ? [0, 1, 0] : 0 }} transition={{ duration: 1.55, delay: .7, repeat: active ? Infinity : 0, ease: "easeInOut" }} />
        </motion.g>

        <motion.g className="document-review-workspace" animate={visible()} transition={transition(2.15)}>
          <rect x="186" y="53" width="152" height="118" rx="8" /><text x="199" y="70">AI REVIEW WORKSPACE</text>
          <path d="M199 82h108M199 91h94M199 100h106M199 109h83M199 118h100M199 127h94M199 136h70" />
          {[[196, 77, 116, 13], [196, 98, 86, 12], [196, 119, 101, 12], [196, 140, 81, 12]].map(([x, y, width, height], index) => <motion.rect key={index} className={index === 3 ? "document-review-alert-highlight" : "document-review-highlight"} x={x} y={y} width={width} height={height} rx="3" animate={{ opacity: running ? [0, 1, 1] : .24 }} transition={{ duration: reduceMotion ? 0 : .5, delay: reduceMotion ? 0 : 2.6 + index * .24, times: [0, .35, 1] }} />)}
          <motion.g className="document-review-issue" animate={{ opacity: running ? 1 : 0, x: running ? 0 : -5 }} transition={transition(3.7)}><rect x="194" y="146" width="129" height="17" rx="4" /><text x="201" y="157">! Missing approval signature</text></motion.g>
        </motion.g>

        <g className="document-review-output">
          <text x="365" y="57">STRUCTURED INFORMATION</text>
          {fields.map(([label, value], index) => (
            <motion.g key={label} animate={visible()} transition={transition(3.15 + index * .28)}>
              <rect className={index === 4 ? "document-review-output-card alert" : "document-review-output-card"} x="363" y={65 + index * 22} width="214" height="18" rx="4" />
              <text className="document-review-output-label" x="371" y={77 + index * 22}>{label}</text><text className={index === 4 ? "document-review-output-value alert" : "document-review-output-value"} x="448" y={77 + index * 22}>{value}</text>
            </motion.g>
          ))}
        </g>
        <motion.g className="document-review-summary" animate={{ opacity: running ? 1 : 0, y: running ? 0 : 6 }} transition={transition(4.75)}><rect x="170" y="184" width="407" height="26" rx="6" /><text x="184" y="200">AI summary: Complete except for final approval.</text></motion.g>
        <motion.g className="document-review-status" animate={{ opacity: running ? 1 : .55 }} transition={transition(5.25)}><rect x="91" y="222" width="420" height="21" rx="10" /><text x="301" y="236" textAnchor="middle">Review completed · 8 fields extracted · 1 action required</text></motion.g>
      </svg>
    </motion.div>
  );
}

function NycTaxiMobilityVisual({ autoPlay = false }: { autoPlay?: boolean }) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(autoPlay);
  const [metrics, setMetrics] = useState([0, 0]);
  const running = autoPlay || active || reduceMotion;
  const routePaths = [
    { id: "taxi-midtown-downtown", path: "M278 80 C250 110 238 147 226 191", label: "Midtown → Downtown", revenue: "$48.2k", top: true },
    { id: "taxi-midtown-lga", path: "M278 80 C348 68 412 49 480 36", label: "Midtown → LaGuardia", revenue: "$31.8k" },
    { id: "taxi-downtown-jfk", path: "M226 191 C310 215 391 224 485 213", label: "Downtown → JFK", revenue: "$27.4k" }
  ];

  useEffect(() => {
    if (!running) {
      setMetrics([0, 0]);
      return;
    }
    if (reduceMotion) {
      setMetrics([1248, 48620]);
      return;
    }
    const started = Date.now();
    const timer = window.setInterval(() => {
      const progress = Math.min(1, (Date.now() - started) / 1250);
      setMetrics([Math.round(1248 * progress), Math.round(48620 * progress)]);
      if (progress === 1) window.clearInterval(timer);
    }, 28);
    return () => window.clearInterval(timer);
  }, [running, reduceMotion]);

  return (
    <motion.div
      className="project-visual nyc-taxi-visual"
      onHoverStart={() => setActive(true)}
      onHoverEnd={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      aria-label={`Animated Manhattan mobility map. ${metrics[0].toLocaleString()} trips and $${metrics[1].toLocaleString()} revenue. Midtown to Downtown is the highest-revenue route. Peak demand is 5 PM to 8 PM in Midtown.`}
    >
      <svg viewBox="0 0 600 260" role="img" preserveAspectRatio="xMidYMid meet">
        <title>NYC taxi trip mobility analysis</title>
        <defs>
          <linearGradient id="taxi-water" x1="0" x2="1"><stop stopColor="#071928" /><stop offset="1" stopColor="#0a3546" /></linearGradient>
          <linearGradient id="taxi-route" x1="0" x2="1"><stop stopColor="#68e8ff" /><stop offset="1" stopColor="#72f6d5" /></linearGradient>
          <filter id="taxi-glow"><feGaussianBlur stdDeviation="3" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>
        <rect className="taxi-map-bg" x="8" y="10" width="584" height="208" rx="12" />
        <path className="taxi-water" d="M34 30C113 8 169 17 212 42c34 20 68 21 103 7 83-34 160-23 252 5v140c-99 32-180 26-246 1-45-17-86-18-126-2-67 27-123 22-161-7Z" />
        <path className="taxi-manhattan" d="M261 31c15 10 29 29 34 52 7 31 0 68-19 111-11 25-20 37-34 38-14 0-25-14-29-37-7-40-1-77 15-117 12-31 20-43 33-47Z" />
        <path className="taxi-borough" d="M303 67c50-25 110-31 177-10l50 27-13 57-75 15-75-23-55-34Z" /><path className="taxi-borough" d="M307 148c49 9 100 23 160 52l37 16-13 24H331l-49-30Z" />
        <path className="taxi-street taxi-street-main" d="M265 43c-9 44-18 104-29 164M278 57c-4 44-10 95-22 148M248 68l36 9M239 101l50 11M230 137l54 12M220 172l54 12" />
        <path className="taxi-street" d="M320 90l156 28M332 119l111 25M334 168l99 34M357 185l-37 39" />
        {routePaths.map((route, index) => (
          <g key={route.id}>
            <motion.path id={route.id} className={route.top ? "taxi-route taxi-route-top" : "taxi-route"} d={route.path} initial={false} animate={{ pathLength: running ? 1 : .18, opacity: running ? 1 : .42 }} transition={{ duration: reduceMotion ? 0 : .75, delay: reduceMotion ? 0 : index * .28 }} />
            {running && !reduceMotion && <motion.g className="taxi-car" style={{ offsetPath: `path('${route.path}')` }} animate={{ offsetDistance: ["0%", "100%"] }} transition={{ duration: 2.7 + index * .35, delay: index * .48, repeat: Infinity, ease: "linear" }}><rect x="-5" y="-3" width="10" height="6" rx="2" /><circle cx="-2.7" cy="3" r="1.2" /><circle cx="2.7" cy="3" r="1.2" /></motion.g>}
          </g>
        ))}
        {[{ x: 278, y: 80, label: "Midtown" }, { x: 226, y: 191, label: "Downtown" }, { x: 480, y: 36, label: "LGA" }, { x: 485, y: 213, label: "JFK" }].map((spot, index) => (
          <g key={spot.label} className="taxi-place"><motion.circle className="taxi-hotspot" cx={spot.x} cy={spot.y} r="14" animate={reduceMotion ? { opacity: .75, scale: 1 } : { opacity: running ? [.28, .82, .28] : .2, scale: running ? [.78, 1.45, .78] : .72 }} transition={{ duration: 1.7 + index * .15, delay: index * .22, repeat: Infinity }} /><circle cx={spot.x} cy={spot.y} r="3.2" /><text x={spot.x + 7} y={spot.y - 7}>{spot.label}</text></g>
        ))}
        <g className="taxi-time"><rect x="25" y="23" width="114" height="24" rx="12" /><motion.circle cx="44" cy="35" r="4" animate={reduceMotion ? { cx: 118 } : { cx: running ? [44, 76, 118] : 44 }} transition={{ duration: 5.2, repeat: running ? Infinity : 0, ease: "easeInOut" }} /><text x="53" y="38">AM</text><text x="113" y="38">PM</text><motion.text x="149" y="39" animate={{ opacity: running ? 1 : .6 }} transition={{ duration: .2 }}>{running ? "Morning → Evening" : "Morning demand"}</motion.text></g>
        <g className="taxi-metrics"><rect x="25" y="165" width="145" height="43" rx="7" /><text x="36" y="181">TRIPS</text><text className="taxi-metric-value" x="36" y="200">{metrics[0].toLocaleString()}</text><text x="100" y="181">REVENUE</text><text className="taxi-metric-value" x="100" y="200">${Math.round(metrics[1] / 1000)}k</text></g>
        <motion.g className="taxi-top-route" initial={false} animate={{ opacity: running ? 1 : .42, y: running ? 0 : 5 }} transition={{ duration: reduceMotion ? 0 : .45, delay: reduceMotion ? 0 : .72 }}><rect x="365" y="166" width="202" height="42" rx="7" /><text x="376" y="181">HIGHEST-REVENUE ROUTE</text><text className="taxi-top-route-value" x="376" y="199">Midtown → Downtown · $48.2k</text></motion.g>
        <g className="taxi-caption"><rect x="93" y="228" width="414" height="20" rx="10" /><text x="300" y="242" textAnchor="middle">Peak demand: 5 PM–8 PM · Midtown</text></g>
      </svg>
    </motion.div>
  );
}

function DiabetesReadmissionRiskVisual({ autoPlay = false }: { autoPlay?: boolean }) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(autoPlay);
  const [scores, setScores] = useState([0, 0]);
  const running = autoPlay || active || reduceMotion;
  const factors = ["3 previous admissions", "5-day length of stay", "Medication change", "A1C 8.9%"];

  useEffect(() => {
    if (!running) {
      setScores([0, 0]);
      return;
    }
    if (reduceMotion) {
      setScores([61, 74]);
      return;
    }
    const started = Date.now();
    const timer = window.setInterval(() => {
      const progress = Math.min(1, (Date.now() - started) / 1250);
      setScores([Math.round(61 * progress), Math.round(74 * progress)]);
      if (progress === 1) window.clearInterval(timer);
    }, 28);
    return () => window.clearInterval(timer);
  }, [running, reduceMotion]);

  const transition = (delay = 0) => ({ duration: reduceMotion ? 0 : .48, delay: reduceMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] as const });
  const factorPaths = ["M164 176C190 176 201 91 232 91", "M164 196C193 196 202 98 232 98", "M164 216C193 216 205 166 232 166", "M164 236C192 236 204 174 232 174"];

  return (
    <motion.div
      className="project-visual diabetes-risk-visual"
      tabIndex={0}
      role="img"
      aria-label={`Animated diabetes patient readmission-risk workflow. An anonymized patient profile is assessed by Logistic Regression and Random Forest. Logistic Regression: ${scores[0]} percent. Random Forest: ${scores[1]} percent. ${running ? "High readmission risk. Main factors: previous admissions, length of stay, medication changes, and A1C result. Follow-up recommended within 7 days." : "Hover or focus to run prediction."}`}
      onHoverStart={() => setActive(true)}
      onHoverEnd={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
    >
      <svg viewBox="0 0 600 260" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <defs>
          <linearGradient id="diabetes-flow" x1="0" x2="1"><stop stopColor="#68e8ff" /><stop offset="1" stopColor="#72f6d5" /></linearGradient>
          <filter id="diabetes-glow"><feGaussianBlur stdDeviation="2.5" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>
        <rect className="diabetes-panel" x="14" y="17" width="142" height="143" rx="10" />
        <text className="diabetes-kicker" x="27" y="39">ANONYMIZED PATIENT</text>
        <circle className="diabetes-avatar" cx="45" cy="64" r="14" /><path className="diabetes-avatar-line" d="M28 91c4-12 30-12 34 0" />
        <text className="diabetes-patient" x="68" y="62">Patient #4821</text><text className="diabetes-detail" x="68" y="77">Age 67 · Type 2</text>
        <path className="diabetes-profile-rule" d="M27 104h115" />
        <text className="diabetes-detail" x="27" y="122">Discharge planning</text><text className="diabetes-mint" x="27" y="141">Risk prediction ready</text>
        {factors.map((factor, index) => (
          <motion.g key={factor} animate={{ opacity: running ? 1 : .28, x: running ? 0 : -7 }} transition={transition(.28 + index * .15)}>
            <rect className="diabetes-factor" x="25" y={169 + index * 20} width="139" height="15" rx="4" /><circle className="diabetes-factor-dot" cx="34" cy={176.5 + index * 20} r="2.5" /><text className="diabetes-factor-text" x="42" y={179 + index * 20}>{factor}</text>
          </motion.g>
        ))}
        {factorPaths.map((path, index) => <motion.path key={path} className="diabetes-flow-line" d={path} initial={false} animate={{ pathLength: running ? 1 : 0, opacity: running ? .8 : 0 }} transition={transition(.7 + index * .12)} />)}
        {running && !reduceMotion && factorPaths.map((path, index) => <motion.circle key={`particle-${path}`} className="diabetes-particle" r="3" filter="url(#diabetes-glow)" style={{ offsetPath: `path('${path}')` }} animate={{ offsetDistance: ["0%", "100%"] }} transition={{ duration: 1.25, delay: .8 + index * .16, repeat: Infinity, ease: "linear" }} />)}
        <motion.g animate={{ opacity: running ? 1 : .38, scale: running ? 1 : .96 }} style={{ transformOrigin: "277px 94px" }} transition={transition(1.05)}>
          <rect className="diabetes-model" x="232" y="65" width="116" height="56" rx="8" /><text className="diabetes-model-title" x="290" y="87" textAnchor="middle">LOGISTIC</text><text className="diabetes-model-title" x="290" y="101" textAnchor="middle">REGRESSION</text>
        </motion.g>
        <motion.g animate={{ opacity: running ? 1 : .38, scale: running ? 1 : .96 }} style={{ transformOrigin: "277px 172px" }} transition={transition(1.2)}>
          <rect className="diabetes-model forest" x="232" y="143" width="116" height="56" rx="8" /><text className="diabetes-model-title" x="290" y="166" textAnchor="middle">RANDOM</text><text className="diabetes-model-title" x="290" y="180" textAnchor="middle">FOREST</text>
        </motion.g>
        <motion.path className="diabetes-output-line" d="M348 93h48" animate={{ pathLength: running ? 1 : 0, opacity: running ? 1 : 0 }} transition={transition(1.45)} /><motion.path className="diabetes-output-line" d="M348 171h48" animate={{ pathLength: running ? 1 : 0, opacity: running ? 1 : 0 }} transition={transition(1.6)} />
        <motion.g animate={{ opacity: running ? 1 : .25, x: running ? 0 : -5 }} transition={transition(1.72)}><rect className="diabetes-score-card" x="397" y="69" width="83" height="48" rx="8" /><text className="diabetes-score-label" x="407" y="86">PROBABILITY</text><text className="diabetes-score" x="407" y="106">{scores[0]}%</text></motion.g>
        <motion.g animate={{ opacity: running ? 1 : .25, x: running ? 0 : -5 }} transition={transition(1.88)}><rect className="diabetes-score-card forest" x="397" y="147" width="83" height="48" rx="8" /><text className="diabetes-score-label" x="407" y="164">PROBABILITY</text><text className="diabetes-score" x="407" y="184">{scores[1]}%</text></motion.g>
        <motion.g animate={{ opacity: running ? 1 : 0, scale: running ? 1 : .6 }} style={{ transformOrigin: "536px 135px" }} transition={transition(2.25)}><circle className="diabetes-risk-ring" cx="536" cy="135" r="49" /><circle className="diabetes-risk-core" cx="536" cy="135" r="40" /><text className="diabetes-risk-small" x="536" y="124" textAnchor="middle">HIGH</text><text className="diabetes-risk-label" x="536" y="140" textAnchor="middle">READMISSION</text><text className="diabetes-risk-label" x="536" y="153" textAnchor="middle">RISK</text></motion.g>
        <motion.g animate={{ opacity: running ? 1 : 0, y: running ? 0 : 5 }} transition={transition(2.62)}><rect className="diabetes-followup" x="207" y="222" width="329" height="23" rx="11.5" /><text x="371.5" y="237" textAnchor="middle">Follow-up recommended within 7 days</text></motion.g>
      </svg>
    </motion.div>
  );
}

const qrModules = [[0, 0], [1, 0], [2, 0], [4, 0], [6, 0], [7, 0], [8, 0], [0, 1], [2, 1], [4, 1], [6, 1], [8, 1], [0, 2], [1, 2], [2, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [3, 3], [5, 3], [7, 3], [0, 4], [2, 4], [3, 4], [4, 4], [6, 4], [8, 4], [1, 5], [3, 5], [5, 5], [7, 5], [0, 6], [1, 6], [2, 6], [4, 6], [6, 6], [7, 6], [8, 6], [0, 7], [2, 7], [3, 7], [5, 7], [6, 7], [8, 7], [0, 8], [1, 8], [2, 8], [4, 8], [5, 8], [7, 8], [8, 8]];

function SecureFileAccessVisual({ autoPlay = false }: { autoPlay?: boolean }) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(autoPlay);
  const running = autoPlay || active || reduceMotion;
  const transition = (delay: number, duration = .45) => ({ duration: reduceMotion ? 0 : duration, delay: reduceMotion ? 0 : delay, ease: "easeOut" as const });
  const reveal = (delay: number) => {
    void delay;
    return { opacity: 1 };
  };
  const accessPath = "M247 130 C303 130 318 130 365 130";

  return <motion.div className="project-visual secure-file-access-visual" tabIndex={0} onHoverStart={() => setActive(true)} onFocus={() => setActive(true)} aria-label="Secure file access workflow. A document is encrypted and locked, a QR access key verifies the recipient, then the file is opened and recorded in the audit timeline.">
    <svg viewBox="0 0 600 260" role="img" preserveAspectRatio="xMidYMid meet">
      <title>Encrypted file sharing workflow</title><defs><filter id="secure-file-glow"><feGaussianBlur stdDeviation="3" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter></defs>
      <text className="secure-kicker" x="23" y="27">SECURE FILE ACCESS</text><path className="secure-connection" d={accessPath} />
      {running && !reduceMotion && <motion.circle r="4" className="secure-packet" filter="url(#secure-file-glow)" style={{ offsetPath: `path('${accessPath}')` }} animate={{ opacity: [0, 0, 1, 1, 0], offsetDistance: ["0%", "0%", "100%", "100%", "100%"] }} transition={{ duration: 6.4, repeat: Infinity, times: [0, .34, .52, .6, 1], ease: "linear" }} />}
      <g className="secure-source" transform="translate(25 70)"><rect width="78" height="90" rx="8" /><path d="M18 16h29l13 13v44H18Z M47 16v14h13 M27 47h25M27 58h25M27 69h18" /><text x="39" y="108" textAnchor="middle">DOCUMENT</text></g>
      <motion.g className="secure-gateway" transform="translate(124 66)" animate={reveal(0)} transition={transition(0)}><rect width="105" height="98" rx="9" /><text x="52" y="20" textAnchor="middle">ENCRYPTION</text><text x="52" y="32" textAnchor="middle">GATEWAY</text><motion.text className="secure-cipher" x="52" y="58" textAnchor="middle" animate={{ opacity: running ? [1, 0, 1] : 1 }} transition={{ duration: reduceMotion ? 0 : 1.2, repeat: running ? Infinity : 0, delay: .65 }}>ACME.pdf</motion.text><motion.text className="secure-cipher secure-cipher-encrypted" x="52" y="58" textAnchor="middle" animate={{ opacity: running ? [0, 1, 0] : 0 }} transition={{ duration: reduceMotion ? 0 : 1.2, repeat: running ? Infinity : 0, delay: .65 }}>4A#9!8$K</motion.text><path d="M24 72h57" /></motion.g>
      <motion.g className="secure-locked-file" transform="translate(245 80)" animate={reveal(.85)} transition={transition(.85)}><path d="M0 17h37l9 9v59H0Z M37 17v10h10 M13 43h21M13 52h21M13 61h14" /><motion.path className="secure-lock-shackle" d="M13 35v-9a10 10 0 0 1 20 0v9" animate={{ pathLength: running ? 1 : 0 }} transition={transition(1.25, .55)} /><motion.rect className="secure-lock-body" x="9" y="34" width="28" height="23" rx="4" animate={{ scale: running ? 1 : .78, opacity: running ? 1 : .35 }} transition={transition(1.55, .35)} /><text x="23" y="80" textAnchor="middle">LOCKED</text></motion.g>
      <motion.g className="secure-qr" transform="translate(255 177)" animate={reveal(1.65)} transition={transition(1.65)}><rect x="-7" y="-16" width="79" height="79" rx="7" /><text x="32" y="-5" textAnchor="middle">QR ACCESS KEY</text>{qrModules.map(([x, y], index) => <motion.rect key={`${x}-${y}`} x={x * 6 + 4} y={y * 6 + 4} width="5" height="5" rx=".8" initial={{ opacity: .15, scale: .2 }} animate={running ? { opacity: 1, scale: 1 } : { opacity: .15, scale: .2 }} transition={transition(1.75 + index * .018, .28)} />)}</motion.g>
      <motion.g className="secure-recipient" transform="translate(384 60)" animate={reveal(2.7)} transition={transition(2.7)}><circle cx="37" cy="22" r="13" /><path d="M14 64c3-18 16-27 23-27s20 9 23 27" /><text x="37" y="81" textAnchor="middle">RECIPIENT</text><motion.path className="secure-scan" d="M2 5h12M2 5v12M60 5H72M72 5v12M2 54v12h12M72 54v12H60" animate={{ opacity: running ? [0, 1, 1, 0] : 0 }} transition={{ duration: reduceMotion ? 0 : 1.2, delay: 3.1, repeat: running ? Infinity : 0, repeatDelay: 5 }} /></motion.g>
      <motion.g className="secure-verification" transform="translate(469 64)" animate={reveal(3.5)} transition={transition(3.5)}><rect width="108" height="48" rx="7" /><path d="m12 18 5 5 9-11" /><text x="31" y="22">Identity verified</text><text x="31" y="36">Key valid</text></motion.g>
      <motion.g className="secure-opened-file" transform="translate(455 129)" animate={reveal(4.15)} transition={transition(4.15)}><path d="M0 11h39l8 8v42H0Z M39 11v9h8 M12 31h24M12 39h24" /><motion.path className="secure-unlock" d="M13 23v-6a9 9 0 0 1 18 0v6" animate={{ pathLength: running ? [1, 1, .35] : 1, x: running ? [0, 0, 8] : 0 }} transition={{ duration: reduceMotion ? 0 : .55, delay: 4.55 }} /><rect x="9" y="22" width="26" height="19" rx="4" /><text x="24" y="65" textAnchor="middle">OPENED</text></motion.g>
      <motion.g className="secure-email" transform="translate(346 188)" animate={reveal(5)} transition={transition(5)}><rect width="204" height="32" rx="7" /><path d="M12 9l13 9 13-9" /><text x="43" y="20">File accessed successfully</text></motion.g>
      <motion.g className="secure-audit" animate={reveal(5.45)} transition={transition(5.45)}><path d="M27 241h545" />{["Encrypted", "Shared", "Verified", "Opened"].map((event, index) => <motion.g key={event} transform={`translate(${75 + index * 135} 241)`} animate={reveal(5.5 + index * .18)} transition={transition(5.5 + index * .18)}><circle r="4" /><text y="15" textAnchor="middle">{event}</text></motion.g>)}</motion.g>
    </svg>
  </motion.div>;
}

function getProjectVisual(project: Project, autoPlay = false) {
  if (project.name === "Product Label Comparison & Review Agent") return <LabelComparisonVisual />;
  if (project.name === "M365 Governance Intelligence Platform") return <GovernanceMapVisual autoPlay={autoPlay} />;
  if (project.name === "Regulatory Intelligence & AI Governance Agent") return <RegulatoryPipelineVisual />;
  if (project.name === "E-commerce / Business Analytics Agent") return <AnalyticsWorkspaceVisual />;
  if (project.name === "Outlook Calendar Intelligence Agent") return <OutlookCalendarVisual />;
  if (project.name === "Business Document Review Agent") return <DocumentReviewWorkflowVisual autoPlay={autoPlay} />;
  if (project.name === "NYC Taxi Data Analysis") return <NycTaxiMobilityVisual autoPlay={autoPlay} />;
  if (project.name === "Secure File Access Management System") return <SecureFileAccessVisual autoPlay={autoPlay} />;
  if (project.name === "Diabetes Patient Readmission Analysis") return <DiabetesReadmissionRiskVisual autoPlay={autoPlay} />;
  return null;
}

function matchesFilter(project: Project, filter: ProjectFilter) {
  if (filter === "All") return true;
  if (filter === "AI Agents") return project.category.includes("AI Agents") || project.category.includes("AI Automation");
  if (filter === "Analytics") return project.category.includes("Analytics") || project.category.includes("Business Intelligence");
  return project.category.includes(filter);
}

export function Projects() {
  const reduceMotion = useReducedMotion();
  const [caseStudy, setCaseStudy] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("All");
  const [selectedProject, setSelectedProject] = useState<Project>(projects[0]);
  const [typingRun, setTypingRun] = useState(-1);
  const [revealedCharacters, setRevealedCharacters] = useState(0);
  const [matrixGlyph, setMatrixGlyph] = useState("0");
  const hoverTimer = useRef<number | null>(null);
  const visibleProjects = projects.filter((project) => matchesFilter(project, activeFilter));

  useEffect(() => {
    const section = document.getElementById("projects");
    if (!section) return;

    let wasVisible = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !wasVisible) setTypingRun((run) => run + 1);
      wasVisible = entry.isIntersecting;
    }, { threshold: .2 });

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typingRun < 0) return;
    setRevealedCharacters(0);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevealedCharacters(projectsIntro.length);
      return;
    }

    let character = 0;
    const interval = window.setInterval(() => {
      character = Math.min(character + 3, projectsIntro.length);
      setRevealedCharacters(character);
      setMatrixGlyph(matrixGlyphs[character % matrixGlyphs.length]);
      if (character >= projectsIntro.length) window.clearInterval(interval);
    }, 42);

    return () => window.clearInterval(interval);
  }, [typingRun]);

  const isIntroComplete = revealedCharacters >= projectsIntro.length;

  useEffect(() => {
    if (!visibleProjects.some((project) => project.name === selectedProject.name)) setSelectedProject(visibleProjects[0]);
  }, [activeFilter, selectedProject.name, visibleProjects]);

  function selectProject(project: Project) {
    if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
    setSelectedProject(project);
  }

  function scheduleHover(project: Project) {
    if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setSelectedProject(project), 150);
  }

  function moveSelection(current: Project, direction: number) {
    const index = visibleProjects.findIndex((project) => project.name === current.name);
    const next = visibleProjects[(index + direction + visibleProjects.length) % visibleProjects.length];
    selectProject(next);
  }

  return (
    <section id="projects" className="section alt">
      <div className="container">
        <SectionHeading
          eyebrow="Work"
          title="Selected projects"
        />
        <p className="section-intro matrix-copy" aria-label={projectsIntro}>
          <span className="matrix-copy-measure" aria-hidden="true">{projectsIntro}</span>
          <span className="matrix-copy-output" aria-hidden="true">
            {projectsIntro.slice(0, revealedCharacters)}
            {!isIntroComplete && typingRun >= 0 && <span className="matrix-cursor">{matrixGlyph}</span>}
            {isIntroComplete && <span className="matrix-cursor matrix-cursor-idle">_</span>}
          </span>
        </p>

        <div className="project-filter-bar" role="toolbar" aria-label="Filter projects">
          {projectFilters.map((filter) => <button key={filter} type="button" className={activeFilter === filter ? "is-active" : ""} aria-pressed={activeFilter === filter} onClick={() => setActiveFilter(filter)}>{filter}</button>)}
        </div>

        <div className="project-explorer">
          <nav className="project-navigator" aria-label="Project navigation">
            <p>Project index <span>{String(selectedProject ? visibleProjects.findIndex((project) => project.name === selectedProject.name) + 1 : 0).padStart(2, "0")}/{String(visibleProjects.length).padStart(2, "0")}</span></p>
            <div role="list">
              {visibleProjects.map((project, index) => <button key={project.name} type="button" role="listitem" className={selectedProject.name === project.name ? "is-active" : ""} aria-current={selectedProject.name === project.name ? "true" : undefined} onClick={() => selectProject(project)} onFocus={() => selectProject(project)} onMouseEnter={() => scheduleHover(project)} onMouseLeave={() => hoverTimer.current && window.clearTimeout(hoverTimer.current)} onKeyDown={(event) => { if (event.key === "ArrowDown" || event.key === "ArrowRight") { event.preventDefault(); moveSelection(project, 1); } if (event.key === "ArrowUp" || event.key === "ArrowLeft") { event.preventDefault(); moveSelection(project, -1); } }}><span>{String(index + 1).padStart(2, "0")}</span>{project.name}</button>)}
            </div>
          </nav>

          <AnimatePresence mode="wait" initial={false}>
            <motion.article key={selectedProject.name} className="project-feature" initial={reduceMotion ? false : { opacity: 0, scale: .985 }} animate={{ opacity: 1, scale: 1 }} exit={reduceMotion ? undefined : { opacity: 0, scale: 1.01 }} transition={{ duration: reduceMotion ? 0 : .28, ease: [0.22, 1, 0.36, 1] }}>
              <div className="project-feature-visual">{getProjectVisual(selectedProject, true)}</div>
              <div className="project-feature-copy"><p className="project-category">{selectedProject.category}</p><h3>{selectedProject.name}</h3><p>{selectedProject.description}</p><div className="badges">{selectedProject.tools.slice(0, 5).map((tool) => <span key={tool}>{tool}</span>)}</div><div className="project-impact"><strong>Business impact</strong><p>{selectedProject.impact}</p></div><button className="project-case-button" type="button" onClick={() => setCaseStudy(selectedProject)}>View project <ArrowUpRight /></button></div>
            </motion.article>
          </AnimatePresence>
        </div>

        <div className="project-accordion" aria-label="Project explorer">
          {visibleProjects.map((project, index) => {
            const open = selectedProject.name === project.name;
            return <article key={project.name} className={open ? "is-open" : ""}><button type="button" aria-expanded={open} aria-controls={`project-panel-${index}`} onClick={() => selectProject(project)} onFocus={() => selectProject(project)}><span>{String(index + 1).padStart(2, "0")}</span>{project.name}<ChevronDown /></button><AnimatePresence initial={false}>{open && <motion.div id={`project-panel-${index}`} className="project-accordion-panel" initial={reduceMotion ? false : { height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={reduceMotion ? undefined : { height: 0, opacity: 0 }} transition={{ duration: reduceMotion ? 0 : .24 }}><div className="project-feature-visual">{getProjectVisual(project, true)}</div><p className="project-category">{project.category}</p><p>{project.description}</p><div className="badges">{project.tools.slice(0, 4).map((tool) => <span key={tool}>{tool}</span>)}</div><p className="project-impact"><strong>Impact: </strong>{project.impact}</p><button className="project-case-button" type="button" onClick={() => setCaseStudy(project)}>View project <ArrowUpRight /></button></motion.div>}</AnimatePresence></article>;
          })}
        </div>
      </div>

      {caseStudy && (
        <div
          className="case-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-title"
          onClick={() => setCaseStudy(null)}
        >
          <div className="case-modal-panel" onClick={(event) => event.stopPropagation()}>
            <button className="case-close" type="button" onClick={() => setCaseStudy(null)} aria-label="Close case study">
              <X />
            </button>
            <p className="project-category">{caseStudy.category}</p>
            <h3 id="case-study-title">{caseStudy.name}</h3>
            {caseStudy.dates && <p className="muted">{caseStudy.dates}</p>}
            <p className="case-description">{caseStudy.description}</p>
            {(() => {
              const visual = getProjectVisual(caseStudy, true);
              return visual && <div className="case-study-visual" aria-label={`${caseStudy.name} animated project preview`}>{visual}</div>;
            })()}
            <div className="case-columns">
              <div>
                <h4>What was built</h4>
                <ul>
                  {caseStudy.points.map((point) => <li key={point}>{point}</li>)}
                </ul>
              </div>
              <div>
                <h4>Tools used</h4>
                <div className="badges">
                  {caseStudy.tools.map((tool) => <span key={tool}>{tool}</span>)}
                </div>
                <div className="case-impact">
                  <strong>Business impact</strong>
                  <p>{caseStudy.impact}</p>
                </div>
                <div className="case-impact">
                  <strong>Business problem</strong>
                  <p>{caseStudy.description}</p>
                </div>
                <div className="case-impact">
                  <strong>Solution built</strong>
                  <p>{caseStudy.points[0]}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
