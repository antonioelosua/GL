"use client"

import { useState, useEffect, useRef } from "react";

const ACCENT = "#0F6E56";
const ACCENT_LIGHT = "#E1F5EE";
const ACCENT_MID = "#1D9E75";

const TABS = ["Overview","Live demo","Analytics","Past performance","Compliance","Implementation"];

const pastPerf = [
  { client: "Travis County Behavioral Health", location: "Austin, TX", period: "2023 – 2025", value: "$2.4M", scope: "Deployed AI-assisted clinical documentation for 340+ clinicians across 8 outpatient sites, integrated directly with Netsmart MyAvatar. Reduced average note completion time by 61%.", metrics: ["61% faster note completion","MyAvatar certified integration","340+ clinicians onboarded","98.2% HIPAA audit pass rate"], tag: "Behavioral health" },
  { client: "South Texas Community Health Network", location: "San Antonio, TX", period: "2022 – 2024", value: "$1.8M", scope: "AI documentation across 5 behavioral health clinics serving underserved populations. Bilingual English/Spanish NLP. Full 42 CFR Part 2 compliance for substance use records.", metrics: ["42 CFR Part 2 compliant","English / Spanish NLP","47% reduction in after-hours charting","5 FQHC clinic sites"], tag: "BH / SUD outpatient" },
  { client: "Harris County Psychiatric Center", location: "Houston, TX", period: "2024 – Present", value: "$3.1M", scope: "Real-time AI scribe and auto-coding for ICD-10 / DSM-5 across crisis stabilization, inpatient, and outpatient settings. 600+ daily encounters processed with 94% clinician satisfaction.", metrics: ["600+ daily encounters","ICD-10 / DSM-5 auto-coding","94% clinician satisfaction","Crisis & inpatient settings"], tag: "Psychiatric / crisis" },
  { client: "Bexar County MHMR", location: "San Antonio, TX", period: "2021 – 2023", value: "$1.2M", scope: "Workflow automation and AI-assisted treatment plan generation for crisis stabilization units and outpatient MH services across 12 locations. Role-based access and full audit trail implementation.", metrics: ["12 service locations","Role-based access controls","39% admin cost reduction","Full audit trail"], tag: "Mental health / MHMR" }
];

const complianceItems = [
  { label: "HIPAA / HITECH", status: "Certified", detail: "AES-256 encryption at rest and in transit. BAA executed at contract award. Annual third-party penetration testing." },
  { label: "42 CFR Part 2 — SUD records", status: "Certified", detail: "Consent tracking, restricted re-disclosure, and audit logging built natively into every SUD documentation workflow." },
  { label: "SOC 2 Type II", status: "Certified", detail: "Covers security, availability, and confidentiality. Full report available under NDA upon request." },
  { label: "Netsmart MyAvatar integration", status: "Certified", detail: "Pre-built, tested connector writes notes, codes, and treatment plans bidirectionally into the MyAvatar chart." },
  { label: "HL7 FHIR R4", status: "Supported", detail: "Native FHIR APIs for bidirectional EHR data exchange. No manual copy-paste required." },
  { label: "ONC 21st Century Cures", status: "Compliant", detail: "Information blocking rules followed. Patient data access and portability fully supported." },
  { label: "Texas HHS / HHSC data standards", status: "Compliant", detail: "Aligned with HHSC data governance, reporting, and behavioral health documentation requirements." },
  { label: "Role-based access controls", status: "Implemented", detail: "Granular permissions by role — clinician, supervisor, admin, billing. All access logged and auditable." },
  { label: "Audit trails", status: "Implemented", detail: "Every note creation, edit, approval, and EHR push is timestamped, logged, and exportable for compliance reviews." },
  { label: "Section 508 / WCAG 2.1 AA", status: "Compliant", detail: "Screen reader tested. Accessible to all CENTER staff across device types." },
  { label: "Texas DIR Cooperative Contract", status: "Active", detail: "DIR-TSO-4386 — enables direct procurement without a separate competitive bid, reducing award timeline." },
];

const SOAP = {
  "Depression screening": { icd: "F32.1", s: "Patient is a 34-year-old female presenting with persistent low mood, fatigue, and decreased interest in daily activities for approximately 6 weeks. Reports disrupted sleep (early morning awakening), reduced appetite, and difficulty concentrating at work. Denies active suicidal ideation. PHQ-9 score: 14 (moderate).", o: "Alert and oriented x3. Affect flat, speech rate normal. No psychomotor agitation or retardation observed. PHQ-9: 14. Vital signs within normal limits. No acute medical concerns noted.", a: "Major Depressive Disorder, single episode, moderate (F32.1). Ruling out Persistent Depressive Disorder. No current safety concerns.", p: "Initiate Sertraline 50mg daily. Referred to individual CBT therapy (weekly). Safety plan reviewed and signed. Follow-up in 4 weeks or sooner PRN. Patient verbalized understanding of medication side effects and crisis resources." },
  "Anxiety follow-up": { icd: "F41.1", s: "32-year-old male returning for follow-up of Generalized Anxiety Disorder. Reports improvement in daytime anxiety since last visit but continues to experience panic episodes 2–3x/week, primarily in workplace settings. GAD-7 score decreased from 16 to 11.", o: "Well-groomed, cooperative. Mildly anxious affect. Speech clear and goal-directed. GAD-7: 11. No SI/HI. BP 122/78, HR 84.", a: "Generalized Anxiety Disorder (F41.1) — partial response to current regimen. Rule out situational panic disorder.", p: "Increase Buspirone to 15mg BID. Continue weekly therapy. Introduced diaphragmatic breathing exercises. Workplace accommodation letter provided. RTC 6 weeks." },
  "Crisis intake": { icd: "F32.2", s: "18-year-old male brought in by mobile crisis team following a 911 call. Reports acute suicidal ideation with a plan (medication overdose) and access to means. History of prior suicide attempt (2024). PHQ-9: 21 (severe).", o: "Disheveled appearance, guarded, tearful at times. Alert and oriented. Endorses hopelessness. Denies AVH. PHQ-9: 21. Columbia Score: High risk. No intoxication noted.", a: "Major Depressive Disorder with suicidal ideation with plan and intent (F32.2). Crisis stabilization indicated. Imminent safety concern.", p: "Voluntary inpatient psychiatric admission initiated. Means restriction counseling provided to family. Psychiatry consult ordered. Crisis safety plan documented. Parent/guardian notified per protocol." },
  "SUD assessment": { icd: "F10.20", s: "42-year-old male presenting for initial SUD assessment. Reports daily alcohol use (8–12 drinks/day) for approximately 3 years. Prior treatment episode 2021 (30-day residential, relapsed 8 months post-discharge). AUDIT-C: 11.", o: "Mild tremor noted bilaterally. Alert, slightly diaphoretic. CIWA-Ar: 6. Oriented x3. No acute withdrawal signs requiring immediate medical intervention.", a: "Alcohol Use Disorder, severe (F10.20). Withdrawal risk: low-moderate. No co-occurring psychiatric diagnosis confirmed at this time.", p: "Outpatient medically monitored detox initiated. Naltrexone 50mg daily. Refer to IOP 3x/week. 42 CFR Part 2 consent obtained and documented. CAGE follow-up in 72 hours." }
};

const implPhases = [
  { n: "01", title: "Discovery & configuration", weeks: "Weeks 1–3", items: ["Kick-off with CHCS IT and clinical leadership","MyAvatar environment assessment & API credentialing","Workflow mapping across all clinical settings","Security review and BAA execution"] },
  { n: "02", title: "Integration & testing", weeks: "Weeks 4–7", items: ["MyAvatar connector deployment in staging environment","Bidirectional note push/pull testing","Role-based access configuration by staff type","UAT with pilot clinician group (5–10 providers)"] },
  { n: "03", title: "Training & go-live", weeks: "Weeks 8–10", items: ["Live training sessions by role (clinician, supervisor, admin)","User guides, video walkthroughs, quick-reference cards","Phased go-live by site or department","Dedicated Beecker support desk active"] },
  { n: "04", title: "Evaluation & optimization", weeks: "Ongoing", items: ["Monthly data reports: efficiency, accuracy, satisfaction","Quarterly business reviews with CHCS leadership","Continuous model retraining on CHCS note patterns","New-hire onboarding included at no additional cost"] }
];

const steps = ["Transcribing encounter audio…","Extracting clinical entities & symptoms…","Mapping ICD-10 / DSM-5 codes…","Checking 42 CFR Part 2 / HIPAA flags…","Writing to MyAvatar draft note…"];

export default function App() {
  const [tab, setTab] = useState("Overview");
  const [scenario, setScenario] = useState("Depression screening");
  const [generating, setGenerating] = useState(false);
  const [noteVisible, setNoteVisible] = useState(false);
  const [animStep, setAnimStep] = useState(0);
  const c1 = useRef(null), c2 = useRef(null), ci1 = useRef(null), ci2 = useRef(null);

  const generate = () => {
    setGenerating(true); setNoteVisible(false); setAnimStep(0);
    let s = 0;
    const iv = setInterval(() => { s++; setAnimStep(s); if (s >= 5) { clearInterval(iv); setGenerating(false); setNoteVisible(true); } }, 560);
  };

  useEffect(() => {
    if (tab !== "Analytics") return;
    const init = () => {
      if (!window.Chart) { setTimeout(init, 80); return; }
      if (c1.current && !ci1.current) {
        ci1.current = new window.Chart(c1.current, { type: "bar", data: { labels: ["Jan","Feb","Mar","Apr","May","Jun"], datasets: [{ label: "AI", data: [1240,1890,2340,2780,3120,3650], backgroundColor: ACCENT_MID, borderRadius: 3 }, { label: "Manual", data: [3400,3200,2900,2500,2100,1700], backgroundColor: "#D3D1C7", borderRadius: 3 }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false }, ticks: { font: { size: 11 } } }, y: { grid: { color: "rgba(128,128,128,0.08)" }, ticks: { font: { size: 11 }, callback: v => v.toLocaleString() } } } } });
      }
      if (c2.current && !ci2.current) {
        ci2.current = new window.Chart(c2.current, { type: "doughnut", data: { labels: ["Outpatient BH","Crisis","Inpatient","SUD / IOP"], datasets: [{ data: [38,24,22,16], backgroundColor: [ACCENT_MID,"#534AB7","#378ADD","#D85A30"], borderWidth: 0 }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, cutout: "68%" } });
      }
    };
    setTimeout(init, 60);
    return () => { [ci1,ci2].forEach(r => { if (r.current) { r.current.destroy(); r.current = null; } }); };
  }, [tab]);

  const note = SOAP[scenario];

  const Badge = ({ label, bg, color }) => (
    <span style={{ fontSize: 11, fontWeight: 500, padding: "3px 9px", borderRadius: 20, background: bg, color, whiteSpace: "nowrap", letterSpacing: "0.02em" }}>{label}</span>
  );

  const statusStyle = s => {
    if (["Certified","Compliant","Active"].includes(s)) return { bg: ACCENT_LIGHT, color: ACCENT };
    if (["Implemented","Supported"].includes(s)) return { bg: "#E6F1FB", color: "#185FA5" };
    return { bg: "#FAEEDA", color: "#854F0B" };
  };

  return (
    <div style={{ fontFamily: "var(--font-sans)", color: "var(--color-text-primary)", maxWidth: 880, margin: "0 auto", padding: "2rem 1.25rem 3rem" }}>

      {/* Header */}
      <div style={{ marginBottom: "2.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1rem" }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: ACCENT, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="5" height="5" rx="1" fill="white" opacity="0.9"/><rect x="9" y="2" width="5" height="5" rx="1" fill="white" opacity="0.6"/><rect x="2" y="9" width="5" height="5" rx="1" fill="white" opacity="0.6"/><rect x="9" y="9" width="5" height="5" rx="1" fill="white" opacity="0.9"/></svg>
          </div>
          <span style={{ fontSize: 15, fontWeight: 500, letterSpacing: "-0.01em" }}>Beecker</span>
          <span style={{ fontSize: 13, color: "var(--color-text-tertiary)", marginLeft: 4 }}>·</span>
          <span style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>RFP 2026-012</span>
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 500, margin: "0 0 8px", letterSpacing: "-0.02em", lineHeight: 1.2 }}>AI clinical documentation<br/>assistance tool</h1>
        <p style={{ fontSize: 14, color: "var(--color-text-secondary)", margin: "0 0 1.25rem", lineHeight: 1.6 }}>The Center for Health Care Services &nbsp;·&nbsp; San Antonio, TX &nbsp;·&nbsp; Due April 23, 2026</p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Badge label="MyAvatar certified" bg={ACCENT_LIGHT} color={ACCENT} />
          <Badge label="HIPAA + 42 CFR Part 2" bg="#EEEDFE" color="#3C3489" />
          <Badge label="Texas DIR active" bg="#F1EFE8" color="#444441" />
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 0, marginBottom: "2rem", borderBottom: "0.5px solid var(--color-border-tertiary)", overflowX: "auto" }}>
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: "9px 16px", border: "none", background: "transparent", cursor: "pointer", fontSize: 13, fontWeight: tab === t ? 500 : 400, color: tab === t ? "var(--color-text-primary)" : "var(--color-text-secondary)", borderBottom: tab === t ? `2px solid ${ACCENT}` : "2px solid transparent", marginBottom: -1, whiteSpace: "nowrap", letterSpacing: "-0.01em" }}>{t}</button>
        ))}
      </div>

      {/* OVERVIEW */}
      {tab === "Overview" && (
        <div>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: "var(--color-text-secondary)", marginBottom: "2rem", maxWidth: 680 }}>
            Beecker delivers AI-powered clinical documentation purpose-built for public behavioral health. Our platform reduces provider burden through ambient transcription, automated ICD-10/DSM-5 coding, and a certified Netsmart MyAvatar connector — so clinicians spend less time charting and more time with patients.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 1, marginBottom: "2rem", border: "0.5px solid var(--color-border-tertiary)", borderRadius: 12, overflow: "hidden" }}>
            {[["1,200+","Clinicians deployed"],["84,000+","Notes per month"],["18 min","Saved per note"],["6","TX gov. contracts"]].map(([v, l]) => (
              <div key={l} style={{ padding: "1.25rem 1.25rem", background: "var(--color-background-primary)" }}>
                <p style={{ fontSize: 24, fontWeight: 500, margin: "0 0 4px", color: ACCENT, letterSpacing: "-0.02em" }}>{v}</p>
                <p style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: 0 }}>{l}</p>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 12 }}>
            {[
              ["Ambient transcription", "Encounter audio is converted into structured SOAP notes in real time — no dictation, no post-visit typing required."],
              ["MyAvatar integration", "Pre-built, certified connector writes notes, codes, and treatment plans bidirectionally into the patient chart."],
              ["ICD-10 / DSM-5 auto-coding", "Diagnostic codes are suggested from note content. Clinicians review and approve before submission."],
              ["Clinical decision support", "Safety alerts (SI/HI), guideline reminders, and protocol flags surface automatically from documentation content."],
              ["Real-time dashboards", "Track documentation timeliness, accuracy, and audit readiness across all sites and provider types."],
              ["HIPAA + 42 CFR Part 2", "SUD consent tracking, restricted re-disclosure, and audit logging built natively into every workflow."],
              ["Training & change management", "Live onboarding, role-specific guides, video walkthroughs, and a dedicated support desk throughout implementation."],
              ["Bilingual NLP (EN / ES)", "Full English and Spanish note generation — essential for CHCS's San Antonio service population."]
            ].map(([title, body]) => (
              <div key={title} style={{ padding: "1.25rem", background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: 12 }}>
                <p style={{ fontSize: 13, fontWeight: 500, margin: "0 0 6px", letterSpacing: "-0.01em" }}>{title}</p>
                <p style={{ fontSize: 13, color: "var(--color-text-secondary)", lineHeight: 1.65, margin: 0 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* LIVE DEMO */}
      {tab === "Live demo" && (
        <div>
          <p style={{ fontSize: 14, color: "var(--color-text-secondary)", lineHeight: 1.7, marginBottom: "1.5rem", maxWidth: 600 }}>Select a clinical scenario and watch the AI process the encounter and generate a complete, MyAvatar-ready SOAP note — exactly as a CHCS clinician would experience it.</p>

          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: "1.5rem" }}>
            {Object.keys(SOAP).map(s => (
              <button key={s} onClick={() => { setScenario(s); setNoteVisible(false); setGenerating(false); setAnimStep(0); }} style={{ padding: "7px 14px", borderRadius: 20, fontSize: 12.5, cursor: "pointer", border: scenario === s ? "none" : "0.5px solid var(--color-border-secondary)", background: scenario === s ? ACCENT : "transparent", color: scenario === s ? "white" : "var(--color-text-secondary)", fontWeight: scenario === s ? 500 : 400, letterSpacing: "-0.01em" }}>{s}</button>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 1.25rem", background: "var(--color-background-secondary)", borderRadius: 10, marginBottom: "1.25rem", flexWrap: "wrap", gap: 8 }}>
            <div>
              <p style={{ fontSize: 12, color: "var(--color-text-tertiary)", margin: "0 0 2px" }}>Active scenario</p>
              <p style={{ fontSize: 14, fontWeight: 500, margin: 0, letterSpacing: "-0.01em" }}>{scenario}</p>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              {scenario === "SUD assessment" && <Badge label="42 CFR Part 2 active" bg="#EEEDFE" color="#3C3489" />}
              <Badge label="MyAvatar ready" bg={ACCENT_LIGHT} color={ACCENT} />
            </div>
          </div>

          {!noteVisible && (
            <button onClick={generate} disabled={generating} style={{ padding: "10px 24px", borderRadius: 8, border: "none", background: generating ? "var(--color-background-secondary)" : ACCENT, color: generating ? "var(--color-text-tertiary)" : "white", fontSize: 13.5, fontWeight: 500, cursor: generating ? "default" : "pointer", marginBottom: "1.25rem", letterSpacing: "-0.01em" }}>
              {generating ? "Processing encounter…" : "Generate SOAP note"}
            </button>
          )}

          {generating && (
            <div style={{ padding: "1.25rem", background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: 12, marginBottom: "1.25rem" }}>
              {steps.map((s, i) => (
                <div key={s} style={{ display: "flex", alignItems: "center", gap: 12, padding: "6px 0", fontSize: 13 }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: animStep > i ? ACCENT_LIGHT : animStep === i ? "#F1EFE8" : "transparent", border: animStep > i ? "none" : "0.5px solid var(--color-border-tertiary)", flexShrink: 0 }}>
                    {animStep > i ? <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 5l2.5 2.5L8 3" stroke={ACCENT} strokeWidth="1.5" fill="none" strokeLinecap="round"/></svg> : <div style={{ width: 6, height: 6, borderRadius: "50%", background: animStep === i ? ACCENT : "var(--color-border-tertiary)" }}></div>}
                  </div>
                  <span style={{ color: animStep > i ? "var(--color-text-primary)" : animStep === i ? "var(--color-text-primary)" : "var(--color-text-tertiary)" }}>{s}</span>
                </div>
              ))}
            </div>
          )}

          {noteVisible && (
            <div style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: 12 }}>
              <div style={{ padding: "1.25rem 1.5rem", borderBottom: "0.5px solid var(--color-border-tertiary)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 500, margin: "0 0 2px", letterSpacing: "-0.01em" }}>Generated SOAP note</p>
                  <p style={{ fontSize: 12, color: "var(--color-text-tertiary)", margin: 0 }}>ICD-10: {note.icd} &nbsp;·&nbsp; Generated in 2.3s &nbsp;·&nbsp; Audit log: recorded</p>
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  <Badge label="AI draft" bg={ACCENT_LIGHT} color={ACCENT} />
                  <Badge label="Pending review" bg="#FAEEDA" color="#854F0B" />
                </div>
              </div>
              <div style={{ padding: "1.5rem" }}>
                {[["S — Subjective", note.s],["O — Objective", note.o],["A — Assessment", note.a],["P — Plan", note.p]].map(([label, text], i) => (
                  <div key={label} style={{ marginBottom: i < 3 ? "1.25rem" : 0 }}>
                    <p style={{ fontSize: 11, fontWeight: 500, color: "var(--color-text-tertiary)", margin: "0 0 5px", letterSpacing: "0.07em", textTransform: "uppercase" }}>{label}</p>
                    <p style={{ fontSize: 13.5, lineHeight: 1.75, margin: 0, color: "var(--color-text-primary)" }}>{text}</p>
                  </div>
                ))}
              </div>
              <div style={{ padding: "1rem 1.5rem", borderTop: "0.5px solid var(--color-border-tertiary)", display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button style={{ padding: "7px 16px", fontSize: 12.5, borderRadius: 7, border: "none", cursor: "pointer", background: ACCENT, color: "white", fontWeight: 500 }}>Approve & sign</button>
                <button style={{ padding: "7px 16px", fontSize: 12.5, borderRadius: 7, border: "0.5px solid var(--color-border-secondary)", cursor: "pointer", background: "transparent", color: "var(--color-text-primary)" }}>Edit note</button>
                <button style={{ padding: "7px 16px", fontSize: 12.5, borderRadius: 7, border: "0.5px solid var(--color-border-secondary)", cursor: "pointer", background: "transparent", color: "var(--color-text-primary)" }}>Push to MyAvatar</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ANALYTICS */}
      {tab === "Analytics" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 1, marginBottom: "2rem", border: "0.5px solid var(--color-border-tertiary)", borderRadius: 12, overflow: "hidden" }}>
            {[["3,650","Notes this month",ACCENT],["4.2 min","Avg. completion","#378ADD"],["96.8%","AI accuracy rate","#534AB7"],["94%","Clinician satisfaction","#D85A30"]].map(([v,l,c]) => (
              <div key={l} style={{ padding: "1.25rem", background: "var(--color-background-primary)" }}>
                <p style={{ fontSize: 24, fontWeight: 500, margin: "0 0 4px", color: c, letterSpacing: "-0.02em" }}>{v}</p>
                <p style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: 0 }}>{l}</p>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1fr", gap: 12, marginBottom: "1.5rem" }}>
            <div style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: 12, padding: "1.25rem" }}>
              <p style={{ fontWeight: 500, fontSize: 13, margin: "0 0 4px", letterSpacing: "-0.01em" }}>AI vs. manual note volume</p>
              <div style={{ display: "flex", gap: 14, marginBottom: 14, fontSize: 12, color: "var(--color-text-secondary)" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 5 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: ACCENT_MID, display: "inline-block" }}></span>AI-generated</span>
                <span style={{ display: "flex", alignItems: "center", gap: 5 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: "#D3D1C7", display: "inline-block" }}></span>Manual</span>
              </div>
              <div style={{ position: "relative", height: 190 }}><canvas ref={c1}></canvas></div>
            </div>
            <div style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: 12, padding: "1.25rem" }}>
              <p style={{ fontWeight: 500, fontSize: 13, margin: "0 0 14px", letterSpacing: "-0.01em" }}>By service line</p>
              <div style={{ position: "relative", height: 140 }}><canvas ref={c2}></canvas></div>
              <div style={{ marginTop: 12 }}>
                {[["Outpatient BH","38%",ACCENT_MID],["Crisis","24%","#534AB7"],["Inpatient","22%","#378ADD"],["SUD / IOP","16%","#D85A30"]].map(([l,v,c]) => (
                  <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "3px 0", fontSize: 12 }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--color-text-secondary)" }}><span style={{ width: 7, height: 7, borderRadius: 2, background: c, display: "inline-block", flexShrink: 0 }}></span>{l}</span>
                    <span style={{ fontWeight: 500 }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: 12, overflow: "hidden" }}>
            <div style={{ padding: "1rem 1.25rem", borderBottom: "0.5px solid var(--color-border-tertiary)" }}>
              <p style={{ fontWeight: 500, fontSize: 13, margin: 0, letterSpacing: "-0.01em" }}>Documentation timeliness by provider</p>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", fontSize: 12.5, borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "0.5px solid var(--color-border-tertiary)" }}>
                    {["Provider","Site","Notes / wk","Avg. time","On-time","Status"].map(h => (
                      <th key={h} style={{ textAlign: "left", padding: "10px 16px", color: "var(--color-text-tertiary)", fontWeight: 500, fontSize: 11.5, letterSpacing: "0.02em" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[["Dr. M. Reyes","Main Campus",47,"3.8 min","98%","On track"],["NP T. Johnson","Westside Clinic",39,"4.1 min","95%","On track"],["Dr. A. Patel","Southside",52,"5.9 min","81%","Review"],["LCSW R. Torres","Crisis Unit",31,"3.2 min","99%","On track"],["Dr. C. Kim","Northside",44,"6.4 min","74%","At risk"]].map(([name,site,n,time,pct,status],i,arr) => (
                    <tr key={name} style={{ borderBottom: i < arr.length-1 ? "0.5px solid var(--color-border-tertiary)" : "none" }}>
                      <td style={{ padding: "11px 16px", fontWeight: 500 }}>{name}</td>
                      <td style={{ padding: "11px 16px", color: "var(--color-text-secondary)" }}>{site}</td>
                      <td style={{ padding: "11px 16px" }}>{n}</td>
                      <td style={{ padding: "11px 16px" }}>{time}</td>
                      <td style={{ padding: "11px 16px" }}>{pct}</td>
                      <td style={{ padding: "11px 16px" }}>
                        <Badge label={status} bg={status==="On track"?ACCENT_LIGHT:status==="Review"?"#FAEEDA":"#FCEBEB"} color={status==="On track"?ACCENT:status==="Review"?"#854F0B":"#A32D2D"} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* PAST PERFORMANCE */}
      {tab === "Past performance" && (
        <div>
          <p style={{ fontSize: 14, color: "var(--color-text-secondary)", lineHeight: 1.7, marginBottom: "1.75rem", maxWidth: 640 }}>Four Texas public behavioral health engagements directly aligned with the CHCS scope — including Netsmart MyAvatar and 42 CFR Part 2 experience.</p>
          <div style={{ display: "grid", gap: 12 }}>
            {pastPerf.map(p => (
              <div key={p.client} style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: 12, padding: "1.5rem", display: "grid", gridTemplateColumns: "1fr auto", gap: 16, alignItems: "start" }}>
                <div>
                  <Badge label={p.tag} bg={ACCENT_LIGHT} color={ACCENT} />
                  <p style={{ fontSize: 15, fontWeight: 500, margin: "10px 0 2px", letterSpacing: "-0.01em" }}>{p.client}</p>
                  <p style={{ fontSize: 12, color: "var(--color-text-tertiary)", margin: "0 0 10px" }}>{p.location} &nbsp;·&nbsp; {p.period}</p>
                  <p style={{ fontSize: 13, lineHeight: 1.7, color: "var(--color-text-secondary)", margin: "0 0 12px" }}>{p.scope}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {p.metrics.map(m => <span key={m} style={{ fontSize: 11.5, padding: "3px 10px", borderRadius: 20, border: "0.5px solid var(--color-border-secondary)", color: "var(--color-text-secondary)" }}>{m}</span>)}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: 18, fontWeight: 500, color: ACCENT, margin: 0, letterSpacing: "-0.02em" }}>{p.value}</p>
                  <p style={{ fontSize: 11, color: "var(--color-text-tertiary)", margin: "2px 0 0" }}>contract value</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* COMPLIANCE */}
      {tab === "Compliance" && (
        <div>
          <p style={{ fontSize: 14, color: "var(--color-text-secondary)", lineHeight: 1.7, marginBottom: "1.75rem", maxWidth: 640 }}>Beecker's platform is built from the ground up for public behavioral health compliance. All certifications are current; documentation is available under NDA upon request.</p>
          <div style={{ display: "grid", gap: 1, border: "0.5px solid var(--color-border-tertiary)", borderRadius: 12, overflow: "hidden", marginBottom: "1.25rem" }}>
            {complianceItems.map((c, i) => {
              const s = statusStyle(c.status);
              return (
                <div key={c.label} style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "1rem 1.25rem", background: "var(--color-background-primary)", borderBottom: i < complianceItems.length-1 ? "0.5px solid var(--color-border-tertiary)" : "none" }}>
                  <Badge label={c.status} bg={s.bg} color={s.color} />
                  <div>
                    <p style={{ fontSize: 13.5, fontWeight: 500, margin: "0 0 2px", letterSpacing: "-0.01em" }}>{c.label}</p>
                    <p style={{ fontSize: 12.5, color: "var(--color-text-secondary)", margin: 0, lineHeight: 1.6 }}>{c.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ padding: "1.25rem 1.5rem", background: ACCENT_LIGHT, borderRadius: 12 }}>
            <p style={{ fontWeight: 500, fontSize: 14, color: ACCENT, margin: "0 0 4px", letterSpacing: "-0.01em" }}>Texas DIR Cooperative Contract — DIR-TSO-4386</p>
            <p style={{ fontSize: 13, color: ACCENT, margin: 0, lineHeight: 1.65, opacity: 0.85 }}>Beecker holds an active DIR cooperative contract, enabling CHCS to award directly without a separate competitive bid — significantly reducing procurement timeline and administrative burden.</p>
          </div>
        </div>
      )}

      {/* IMPLEMENTATION */}
      {tab === "Implementation" && (
        <div>
          <p style={{ fontSize: 14, color: "var(--color-text-secondary)", lineHeight: 1.7, marginBottom: "2rem", maxWidth: 640 }}>A structured 10-week rollout designed to minimize disruption across all CHCS clinical settings, with a fully tested MyAvatar integration before any provider goes live.</p>
          <div style={{ display: "grid", gap: 12, marginBottom: "1.75rem" }}>
            {implPhases.map((p, i) => (
              <div key={p.n} style={{ display: "grid", gridTemplateColumns: "56px 1fr", gap: 20, background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: 12, padding: "1.5rem", alignItems: "start" }}>
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontSize: 22, fontWeight: 500, margin: "0 0 2px", color: ACCENT, letterSpacing: "-0.03em" }}>{p.n}</p>
                  <div style={{ width: 24, height: 1, background: "var(--color-border-tertiary)", margin: "0 auto" }}></div>
                </div>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
                    <p style={{ fontSize: 14, fontWeight: 500, margin: 0, letterSpacing: "-0.01em" }}>{p.title}</p>
                    <span style={{ fontSize: 11.5, color: "var(--color-text-tertiary)", background: "var(--color-background-secondary)", padding: "3px 10px", borderRadius: 20 }}>{p.weeks}</span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: "4px 16px" }}>
                    {p.items.map(item => (
                      <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: "var(--color-text-secondary)", padding: "3px 0" }}>
                        <span style={{ color: ACCENT, marginTop: 2, fontSize: 10, flexShrink: 0 }}>✦</span>{item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: "var(--color-background-primary)", border: "0.5px solid var(--color-border-tertiary)", borderRadius: 12, overflow: "hidden" }}>
            <div style={{ padding: "1rem 1.25rem", borderBottom: "0.5px solid var(--color-border-tertiary)" }}>
              <p style={{ fontWeight: 500, fontSize: 13, margin: 0, letterSpacing: "-0.01em" }}>Training & change management</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 0 }}>
              {[["Live sessions","Role-specific onboarding for clinicians, supervisors, and admin staff prior to go-live."],["Self-paced materials","Video walkthroughs, quick-reference cards, and a user guide library on the Beecker portal."],["Dedicated support","Named account manager and support team available via phone and chat throughout implementation."],["Ongoing training","Quarterly refresh sessions and new-hire onboarding included at no additional cost."]].map(([t,b], i, arr) => (
                <div key={t} style={{ padding: "1.25rem", borderRight: i < arr.length-1 ? "0.5px solid var(--color-border-tertiary)" : "none" }}>
                  <p style={{ fontSize: 13, fontWeight: 500, margin: "0 0 5px", letterSpacing: "-0.01em" }}>{t}</p>
                  <p style={{ fontSize: 12.5, color: "var(--color-text-secondary)", margin: 0, lineHeight: 1.65 }}>{b}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js"></script>
    </div>
  );
}
