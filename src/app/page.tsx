"use client"

import { useState, useEffect } from "react";

const T = {
  en: {
    appName:"Beecker Agents", catalogTab:"AI Agent Catalog", dashboardTab:"Dashboard", agentLabel:"Agent",
    catalogTitle:"AI Agent Catalog", dashboardTitle:"Dashboard",
    catalogSub:"24 production-ready agents automating end-to-end enterprise processes. Select a process area to explore agents and view full capability sheets.",
    dashboardSub:"Illustrative benchmark metrics, performance data, and a live look at deployed agents in action.",
    agents:"agents", home:"Home", backTo:"Back to", backToPlatform:"Back to Dashboard",
    capabilitySheet:"CAPABILITY SHEET", whatItDoes:"WHAT IT DOES", businessProblem:"BUSINESS PROBLEM SOLVED",
    idealUser:"IDEAL USER / OPERATOR", keyFeatures:"KEY FEATURES & CAPABILITIES",
    inputsRequired:"INPUTS REQUIRED", outputsDeliverables:"OUTPUTS & DELIVERABLES",
    maturityReadiness:"MATURITY & READINESS",
    limitations:"LIMITATIONS, DEPENDENCIES & IMPLEMENTATION REQUIREMENTS",
    productionReady:"Production-ready", transactionDetails:"Transaction details",
    processingTimeline:"Processing timeline", conversation:"Conversation",
    conversationSub:function(n){return "Between "+n+" (AI agent) and the end user";},
    messagePlaceholder:function(n){return "Message "+n+"...";}, send:"Send",
    processOverview:"Process overview", processOverviewSub:"Current pipeline stage distribution",
    recentExceptions:"Recent exceptions", recentExceptionsSub:"Pending human review",
    runHistory:"Run history", runHistorySub:"Click any row to view process detail and conversation",
    pageOf:function(a,b){return "Page "+a+" of "+b;}, prev:"Prev", next:"Next",
    active:"Active", viewDashboard:"View dashboard >",
    exceptionsPending:function(n){return n+" exception"+(n!==1?"s":"")+" pending review";},
    executionStart:"Execution start", status:"Status", duration:"Duration",
    description:"Description", reference:"Reference", requests:"requests",
    cycleTimeTitle:"Cycle time: manual vs automated", cycleTimeSub:"Days to complete, by process",
    manual:"Manual", automated:"Automated",
    savingsTitle:"Estimated annual savings", savingsSub:"USD thousands, by process area",
    roiTitle:"Cumulative ROI over 12 months", roiSub:"Return multiplier from go-live",
    sampleAgentsLabel:"SAMPLE DEPLOYED AGENTS",
    sampleAgentsSub:"Click any agent to view their live monitoring dashboard.",
    clickForCapability:"Click any agent for their full capability sheet.",
    agentReply:function(ref){return "Thank you for your message. I've noted your input and will update the process accordingly. I'll notify you of any changes to the status of "+ref+".";},
    trigger:"Trigger", moreAgents:function(n){return "+"+n+" more";},
    kpis:[
      {value:"78%",label:"Reduction in manual processing time",sub:"Across H2R, P2P, O2C"},
      {value:"$2.4M",label:"Est. annual savings per deployment",sub:"10,000+ transactions/month"},
      {value:"3.8x",label:"ROI within first 12 months",sub:"Combined H2R, P2P, O2C"},
      {value:"62%",label:"Lower cost-per-transaction",sub:"vs fully manual baseline"},
    ],
    chartLabels:{cycleItems:["Invoice","PO creation","Onboarding","Travel claim"],months:["M1","M2","M3","M4","M5","M6","M7","M8","M9","M10","M11","M12"]},
    areaDescs:{h2r:"End-to-end HR lifecycle automation from job opening planning through retirement processing.",p2p:"Full procurement lifecycle automation from demand planning through invoice processing and payment disbursement.",o2c:"Complete order fulfillment and receivables automation from order intake through accounts receivable management."},
    areaFulls:{h2r:"Hire-to-Retire",p2p:"Procure-to-Pay",o2c:"Order-to-Cash"},
    statusLabels:{"In progress":"In progress","Successful":"Successful","Completed":"Completed","In review":"In review"},
    agentDetails:{
      Fer:{module:"Job Opening Planning",trigger:"New Job Opening Detected",what:"Detects job opening signals from workforce data, org changes, or attrition events and automatically initiates requisition workflows.",problem:"Eliminates manual tracking of open positions and lag time between job opening identification and requisition creation.",users:["HR business partners","Workforce planners","HR operations staff","CHCO office support"],capabilities:["Monitors workforce data streams for job opening signals","Auto-populates requisition with position classification data","Routes draft requisition to designated approvers","Logs trigger event with timestamp and source","Integrates with HRIS and position management systems"],inputs:["Workforce planning data","Org structure records","Attrition / separation notices","Position classification data","Approval routing rules"],outputs:["Initiated requisition record","Routing notification to approvers","Position data pre-fill","Audit log of trigger event"],maturity:"Production-ready. Repeatable deployment pattern for HRIS-integrated environments.",limits:["Requires clean position data to pre-populate accurately","Job opening signals depend on upstream HR system data quality","Does not make hiring decisions","Requires HRIS integration and approval routing configuration"]},
      Lucas:{module:"Recruitment",trigger:"New Application Received",what:"Processes incoming applications, screens candidates against defined criteria, organizes applicant data, and routes qualified candidates to human reviewers with structured summaries.",problem:"Reduces the burden of manual application screening in high-volume hiring, ensuring consistent criteria application and faster movement of qualified candidates to human decision-makers.",users:["HR specialists","Hiring managers","EEO officers","Talent acquisition teams"],capabilities:["Ingests and normalizes applications from multiple channels","Applies defined screening criteria consistently","Generates structured candidate summaries","Routes to human reviewers by position","Maintains EEO documentation and audit log"],inputs:["Job applications and resumes","Position requirements / KSAs","Screening criteria and rules","EEO data","Assessment results"],outputs:["Screened applicant list with scores","Structured candidate summaries","Routed review queue","EEO documentation package","Audit trail of screening logic"],maturity:"Production-ready. Deployed in high-volume hiring environments with configurable criteria per position.",limits:["Screening quality depends on clarity of defined criteria","Does not make hiring selections — advisory only","Requires human review for all qualification determinations","ATS integration required"]},
      Isa:{module:"Selection, Hiring & Onboarding",trigger:"New Employee Hire Detected",what:"Manages offer workflows, coordinates hiring documentation collection, and executes structured onboarding task sequences from offer acceptance through first-day readiness.",problem:"Eliminates dropped tasks and delays in the offer-to-onboard process, ensuring every new hire completes required steps on time.",users:["HR onboarding specialists","Security / FSO staff","IT provisioning teams","New hire supervisors"],capabilities:["Triggers onboarding task sequences on hire confirmation","Tracks documentation completion in real time","Initiates background check and clearance workflows","Sends automated reminders for incomplete items","Coordinates across HR, IT, and security stakeholders"],inputs:["Offer acceptance confirmation","New hire personal data","Required documentation checklist","Background check rules","IT provisioning requests","Onboarding task templates"],outputs:["Completed onboarding task tracker","Documentation completion status","Background check initiation record","IT access request","Day-one readiness confirmation","Audit log"],maturity:"Production-ready. Modular task framework adapts to agency-specific onboarding requirements.",limits:["Cannot adjudicate clearances or make suitability determinations","Dependent on new hire responsiveness for document submission","IT provisioning timelines depend on external system capacity","Requires HRIS, background check system, and IT service desk integration"]},
      Ben:{module:"Performance & Development",trigger:"Performance Review Scheduled",what:"Schedules and orchestrates performance review cycles, collects self-assessments and manager inputs, flags overdue reviews, and consolidates data for HR reporting.",problem:"Prevents compliance failures from missed review deadlines and reduces administrative burden on managers and HR staff.",users:["HR specialists","Supervisors and managers","CHCO office staff","L&D teams"],capabilities:["Schedules review cycles and sends participant notifications","Collects self-assessments and manager inputs via structured forms","Tracks completion status across the organization","Flags overdue reviews for HR escalation","Consolidates appraisal data for reporting"],inputs:["Employee roster and review schedules","Performance plan templates","Self-assessment forms","Manager review inputs","Training and development records"],outputs:["Review cycle status dashboard","Completed appraisal packages","Overdue review alerts","Consolidated performance data","IDP tracking report","Audit log"],maturity:"Production-ready. Configurable for annual, mid-year, and probationary review cycles.",limits:["Does not assign or recommend performance ratings","Quality depends on supervisor participation and timely input","Cannot substitute for manager judgment in evaluation","Requires performance management platform integration"]},
      Lily:{module:"Compensation & Benefits",trigger:"Payroll Period Initiated",what:"Triggers payroll period processing, validates compensation data against HR records and policy rules, flags anomalies and discrepancies for review before payroll execution.",problem:"Reduces payroll errors caused by stale or inconsistent data and gives HR and finance staff actionable exception reports before disbursement.",users:["Payroll specialists","Benefits administrators","HR operations staff","Finance / budget analysts"],capabilities:["Triggers validation workflows at payroll cycle start","Compares compensation data to HR records and policy rules","Validates benefits elections against enrollment data","Flags anomalies and routes to reviewer","Generates pre-disbursement exception report"],inputs:["Payroll period schedule","Employee compensation records","Benefits elections data","Leave balances","Personnel action records","Payroll business rules"],outputs:["Pre-payroll validation report","Exception and anomaly list","Benefits reconciliation summary","Leave balance confirmation","Routed exceptions for approval","Audit log"],maturity:"Production-ready. Supports bi-weekly, semi-monthly, and monthly payroll cycles.",limits:["Validation quality depends on timeliness of upstream HR data","Does not execute payroll","Cannot adjudicate complex compensation disputes","Requires payroll system, HRIS, and leave management integration"]},
      Lisa:{module:"Travel & Expense",trigger:"Travel Reimbursement Request",what:"Processes travel reimbursement requests by extracting claim data, validating against per diem rules and travel policy, identifying exceptions, and routing compliant requests for approval.",problem:"Eliminates manual policy lookup and calculation for travel claims, reduces processing time, and catches policy violations before payment.",users:["Travelers / claimants","Travel administrators","Finance operations staff","Approving officials"],capabilities:["Extracts claim data from submitted forms and receipts","Validates against applicable per diem and travel policy rules","Calculates allowable vs. claimed amounts","Flags policy exceptions with specific rule citations","Routes compliant requests for approval"],inputs:["Travel reimbursement requests","Receipts and supporting documentation","Per diem rates and FTR/JTR rules","Trip authorization records","Approval routing rules"],outputs:["Validated reimbursement request","Policy compliance summary","Exception flags with detail","Routed approval package","Audit log"],maturity:"Production-ready. Configurable for FTR, JTR, and agency-specific travel policies.",limits:["Per diem rate accuracy depends on rule table maintenance","Unusual circumstances require human judgment","Receipt quality affects data extraction accuracy","Travel management system integration required"]},
      Cleo:{module:"Separation & Retirement",trigger:"Retirement Notification",what:"Manages offboarding and retirement processing workflows triggered by separation notifications, coordinating tasks across HR, IT, security, finance, and benefits.",problem:"Prevents gaps in offboarding that create security, financial, or compliance risks by orchestrating all steps from a single trigger.",users:["HR specialists","Security / FSO staff","IT administrators","Payroll and benefits teams","Supervisors"],capabilities:["Triggers multi-stakeholder offboarding task sequences","Coordinates clearance revocation and IT access termination","Calculates final pay, leave payouts, and benefits continuation","Tracks task completion across departments","Generates retirement documentation packages"],inputs:["Separation or retirement notice","Employee record and service history","Final leave balance data","Benefits continuation elections","IT asset inventory","Clearance and access records"],outputs:["Offboarding task completion tracker","Final pay calculation package","Clearance revocation request","IT access termination confirmation","Benefits transition documentation","Audit log"],maturity:"Production-ready. Handles voluntary separation, retirement, and RIF offboarding scenarios.",limits:["Retirement benefit calculations require current OPM rule accuracy","Clearance revocation timelines depend on security office capacity","Complex cases require specialist handling","Requires HRIS, IT provisioning, and security clearance system integration"]},
      Alice:{module:"Demand Planning",trigger:"Demand Signal Detected",what:"Analyzes demand signals from program data, consumption history, and operational inputs to initiate procurement planning workflows.",problem:"Reduces lag between mission need identification and procurement initiation, improving lead time management.",users:["Contracting officers / CORs","Program managers","Logistics and supply chain staff","Budget analysts"],capabilities:["Aggregates demand signals from multiple program data sources","Generates preliminary requirements documentation","Aligns demand forecasts with fiscal year budget data","Initiates procurement planning workflows","Flags supply risk based on lead time and inventory data"],inputs:["Program demand data","Historical consumption records","Budget and fiscal year data","Inventory levels","Program schedule data"],outputs:["Demand forecast summary","Initiated procurement planning record","Requirements draft","Budget alignment report","Audit log"],maturity:"Production-ready. Supports annual acquisition planning and ongoing demand monitoring cycles.",limits:["Forecast accuracy depends on data quality and historical record completeness","Cannot account for unplanned mission changes without updated inputs","Requires program management system and budget system integration"]},
      Jessica:{module:"Supplier Selection",trigger:"Vendor Need Identified",what:"Evaluates and scores supplier candidates against defined criteria including past performance, pricing, compliance status, and capability data.",problem:"Replaces time-consuming manual vendor research and scoring with consistent, documented evaluation that supports defensible source selection decisions.",users:["Contracting officers","Source selection officials","Small business specialists","Program managers"],capabilities:["Queries SAM.gov and debarment lists for compliance status","Scores suppliers against defined evaluation criteria","Flags small business categories and set-aside eligibility","Generates structured comparison summaries","Maintains evaluation audit trail"],inputs:["Supplier capability data","SAM.gov / EPLS registration status","Past performance records","Pricing data","Small business classification data","Evaluation criteria"],outputs:["Scored supplier comparison matrix","Compliance status summary","Small business eligibility flags","Source selection support package","Audit log"],maturity:"Production-ready. Criteria framework configurable per acquisition type and set-aside category.",limits:["Cannot make final source selection determinations — advisory only","Data quality depends on supplier registration accuracy","Complex procurements require additional technical evaluation","SAM.gov API access required"]},
      Elsa:{module:"Supplier Onboarding",trigger:"New Supplier Approved",what:"Automates supplier registration workflows including documentation collection, data validation, SAM.gov alignment checks, and vendor master data setup.",problem:"Eliminates manual data entry and back-and-forth with suppliers during registration, reducing onboarding time.",users:["Contracting officers","AP / finance staff","Procurement administrators","Vendor management teams"],capabilities:["Collects and validates supplier documentation","Verifies SAM.gov registration and expiration status","Validates banking and payment routing data","Creates vendor master record in financial system","Routes incomplete submissions back to supplier"],inputs:["Supplier registration request","Business documentation (TIN, banking)","SAM.gov registration data","Vendor classification data","Approval routing rules"],outputs:["Validated vendor master record","SAM.gov compliance confirmation","Banking data verification summary","Onboarding completion notification","Audit log"],maturity:"Production-ready. Supports new vendor setup and annual SAM.gov re-registration validation.",limits:["Cannot verify ownership or beneficial interest beyond submitted documentation","SAM.gov data accuracy depends on supplier registration maintenance","Requires financial system vendor master access and SAM.gov API integration"]},
      Olivia:{module:"PO Creation",trigger:"Requisition Approved",what:"Generates purchase orders from approved requisitions, applies validation checks for funding availability, contract linkage, and data completeness.",problem:"Eliminates manual PO drafting, reduces data entry errors, and ensures every PO is properly funded and approved before commitment.",users:["Contracting officers","Purchasing agents","Budget analysts","Program managers"],capabilities:["Generates PO from approved requisition data","Checks funds availability against budget system","Validates contract linkage and authority","Routes for approval based on dollar threshold","Records obligation upon approval"],inputs:["Approved requisition","Budget / funds availability data","Contract or BPA reference","Item/service specifications","Vendor master data","Approval thresholds"],outputs:["Draft PO with validation results","Funds availability confirmation","Approved PO ready for issuance","Obligation record","Audit log"],maturity:"Production-ready. Configurable for simplified acquisition and contract-based purchasing workflows.",limits:["Cannot create contracts or acquisition instruments","Funds availability check depends on real-time budget system data","Complex modifications require manual contracting action","Requires ERP/financial management system and budget system integration"]},
      Chris:{module:"Goods Receipt",trigger:"Delivery Received",what:"Records and validates goods and services receipts against purchase order data, identifies discrepancies in quantity, condition, or specifications.",problem:"Eliminates manual receiving log entries, ensures receipt documentation is complete before invoice processing begins.",users:["Receiving / warehouse staff","CORs / COTRs","Property managers","AP teams"],capabilities:["Records receipt against PO line items","Validates quantity and specification matches","Flags shortages, overages, or damaged goods","Generates structured receiving report","Updates property accountability records"],inputs:["Delivery documentation / packing list","Purchase order data","Inspection criteria","Property accountability rules","Acceptance authority designation"],outputs:["Validated receiving report","Discrepancy flags with detail","Property record update","Acceptance confirmation","3-way match input record","Audit log"],maturity:"Production-ready. Supports full and partial delivery scenarios with configurable acceptance rules.",limits:["Cannot perform physical inspection — supports documentation only","Condition assessment requires human inspector","Partial delivery handling requires defined business rules","Requires PO system and property management system integration"]},
      Tony:{module:"Inventory Management",trigger:"Inventory Update Detected",what:"Monitors inventory levels across locations, flags reorder points and stock-outs, reconciles discrepancies between physical counts and system records.",problem:"Prevents stockouts and excess inventory through proactive monitoring and maintains accurate property records required for audit.",users:["Supply chain / logistics staff","Property managers","Procurement teams","Finance / budget analysts"],capabilities:["Monitors stock levels against defined reorder thresholds","Reconciles system records with physical count data","Flags discrepancies and routes for investigation","Identifies excess and obsolete inventory","Generates audit-ready inventory reports"],inputs:["Inventory system data","Physical count records","Reorder point rules","Property accountability data","Consumption history"],outputs:["Inventory status report","Reorder recommendations","Discrepancy flags","Reconciliation summary","Excess property identification","Audit log"],maturity:"Production-ready. Supports multi-location inventory with configurable reorder and accountability rules.",limits:["Accuracy depends on real-time system data and physical count frequency","Cannot independently verify physical inventory","Disposal recommendations require human and regulatory review","Requires inventory management and property management system integration"]},
      Ryan:{module:"Returns Management",trigger:"Return Request Initiated",what:"Processes vendor return requests by documenting the return reason, coordinating with suppliers, initiating credit or replacement workflows.",problem:"Replaces manual return coordination with a structured, documented process that ensures credits are received and inventory is accurately updated.",users:["Receiving / supply staff","Contracting officers","AP teams","Property managers"],capabilities:["Initiates return authorization workflow","Notifies supplier with structured return documentation","Tracks credit or replacement receipt","Updates inventory records upon return confirmation","Maintains return audit trail"],inputs:["Return request with reason code","Original PO and receipt data","Vendor contact and return instructions","Inventory records","Credit/replacement rules"],outputs:["Return authorization record","Vendor return notification","Credit or replacement request","Updated inventory record","Audit log"],maturity:"Production-ready. Handles defective goods, over-delivery, and warranty return scenarios.",limits:["Supplier responsiveness affects process cycle time","Complex warranty or dispute cases require contracting officer involvement","Requires inventory system access and supplier communication integration"]},
      Daniel:{module:"Invoice Processing & 3-Way Match",trigger:"Invoice Received",what:"Automates the review of supplier invoices against purchase orders, receiving records, and business rules to identify matches, discrepancies, and exceptions requiring human review.",problem:"Reduces manual effort in invoice review, improves accuracy, speeds processing cycles, and allows AP staff to focus on exception handling.",users:["AP teams","Procurement analysts","Finance operations staff","Shared services personnel"],capabilities:["Extracts and normalizes data from invoices and supporting documents","Compares invoice details to PO and receipt records at line-item level","Flags quantity, pricing, or documentation mismatches","Routes exceptions to designated reviewers","Creates audit-ready processing summaries"],inputs:["Supplier invoices","Purchase orders","Goods receipt records","Vendor master data","Approval rules and tolerance thresholds","ERP data"],outputs:["3-way match result","Discrepancy report","Exception queue","Approval recommendation","Audit log"],maturity:"Production-ready. Repeatable deployment pattern for document-driven finance workflows.",limits:["Performance depends on document quality and OCR readability","Requires complete PO and receipt records to execute match","Final approval authority remains with authorized personnel","Requires ERP integration and defined matching rules and thresholds"]},
      David:{module:"Payment Processing",trigger:"Invoice Approved for Payment",what:"Validates approved invoices for payment readiness, applies final pre-payment checks, and routes payment packages to the appropriate disbursement channel.",problem:"Reduces payment errors and delays by ensuring all required approvals and documentation are complete before disbursement initiation.",users:["AP / disbursement staff","Finance operations teams","Budget analysts","Shared services personnel"],capabilities:["Validates approved invoice package completeness","Confirms vendor banking data accuracy","Applies pre-payment business rule checks","Routes to appropriate payment channel (EFT, check, IPAC)","Records disbursement data for financial reporting"],inputs:["Approved invoice package","Vendor banking / payment data","Funds certification","Payment method rules","Treasury / IPAC routing data"],outputs:["Payment-ready package","Pre-payment validation results","Payment routing confirmation","Disbursement record","Audit log"],maturity:"Production-ready. Supports EFT, check, and IPAC payment channels with configurable routing rules.",limits:["Does not execute payment independently — prepares and routes only","Dependent on approved invoice package completeness","IPAC and Treasury system integration requires agency-specific configuration"]},
      Nico:{module:"Order Processing",trigger:"New Order Received",what:"Ingests and validates incoming orders from internal or external customers, applies business rules for completeness and authorization, and initiates fulfillment workflows.",problem:"Eliminates manual order intake and routing, reduces order errors at the point of entry.",users:["Order management staff","Supply chain coordinators","Program managers","Customer service teams"],capabilities:["Ingests orders from multiple channels (EDI, portal, manual)","Validates against authorization, catalog, and inventory data","Routes exceptions for human review","Initiates fulfillment workflow on validation","Sends order acknowledgment to customer"],inputs:["Incoming order data","Customer / agency authorization data","Product or service catalog","Inventory availability data","Routing rules"],outputs:["Validated order record","Fulfillment initiation trigger","Order acknowledgment","Exception flags for incomplete orders","Audit log"],maturity:"Production-ready. Supports multi-channel order intake with configurable validation rules.",limits:["Validation quality depends on data completeness at submission","Unusual order types may require manual handling","Requires order management system and inventory system integration"]},
      Diana:{module:"Delivery Planning",trigger:"Order Validated",what:"Plans and schedules delivery logistics based on validated order data, inventory availability, and customer delivery requirements.",problem:"Replaces manual delivery planning with an automated, data-driven scheduling process that reduces delays and improves on-time delivery performance.",users:["Logistics coordinators","Supply chain planners","Warehouse managers","Program managers"],capabilities:["Generates delivery schedules based on order and inventory data","Allocates warehouse resources to order fulfillment","Flags SLA risk based on current capacity","Recommends carrier assignments","Updates delivery plan as conditions change"],inputs:["Validated order data","Inventory and warehouse data","Customer delivery requirements","SLA / delivery commitment rules","Carrier capacity data"],outputs:["Delivery schedule","Resource and capacity plan","SLA compliance forecast","Carrier assignment recommendations","Audit log"],maturity:"Production-ready. Configurable for single and multi-location fulfillment environments.",limits:["Planning accuracy depends on real-time inventory and carrier data","Unforeseen disruptions require human re-planning","Requires order management, warehouse management, and carrier data integration"]},
      James:{module:"Transportation Planning",trigger:"Delivery Scheduled",what:"Optimizes routing and carrier selection for outbound shipments based on delivery requirements, cost parameters, compliance rules, and carrier availability.",problem:"Replaces manual carrier selection and routing with automated optimization that reduces shipping costs and improves delivery reliability.",users:["Transportation coordinators","Logistics managers","Contracting officers","Supply chain staff"],capabilities:["Evaluates carrier options against cost, compliance, and capacity criteria","Generates optimized routing recommendations","Documents carrier compliance (small business, AbilityOne, etc.)","Creates shipment instruction packages","Tracks carrier selection rationale for audit"],inputs:["Delivery schedule data","Carrier database and rates","Routing optimization rules","Compliance requirements","Shipment specifications"],outputs:["Optimized routing plan","Carrier selection recommendation","Compliance documentation","Shipment instruction package","Audit log"],maturity:"Production-ready. Supports multi-carrier environments with configurable compliance rule sets.",limits:["Routing optimization depends on carrier data currency","Sensitive or classified shipments require additional security protocols","Requires carrier database and routing engine integration"]},
      Julia:{module:"Outbound Logistics",trigger:"Shipment Ready for Dispatch",what:"Manages outbound shipment execution including shipping document generation, carrier handoff coordination, tracking initiation, and delivery confirmation processing.",problem:"Eliminates manual shipping document preparation and handoff coordination, creates a real-time tracking record.",users:["Warehouse / shipping staff","Logistics coordinators","Property managers","Program managers"],capabilities:["Generates bills of lading and shipping documentation","Coordinates carrier pickup and handoff","Initiates shipment tracking","Processes delivery confirmation upon receipt","Flags shipment exceptions and delays"],inputs:["Approved shipment plan","Packing list and item data","Carrier instructions","Regulatory shipping requirements","Customer delivery confirmation rules"],outputs:["Shipping documentation package","Carrier handoff confirmation","Tracking number and shipment record","Delivery confirmation","Audit log"],maturity:"Production-ready. Supports standard and regulated shipment types with carrier API integration.",limits:["Cannot replace physical inspection or packing processes","Hazmat and classified item handling requires specialist oversight","Carrier API availability affects real-time tracking","Requires warehouse management and carrier API connectivity"]},
      Mia:{module:"Credit Management",trigger:"High-Risk Transaction Detected",what:"Evaluates credit exposure and financial risk for transactions and customer accounts, flags high-risk situations for human review.",problem:"Provides proactive risk visibility on AR balances and transaction exposure, reducing the likelihood of uncollectible receivables.",users:["Accounts receivable staff","Finance managers","Program managers","Budget analysts"],capabilities:["Evaluates account-level credit exposure against defined limits","Flags transactions that exceed risk thresholds","Generates credit status summaries by customer/agency","Tracks payment history trends","Routes high-risk flags for human review"],inputs:["Customer / agency account data","Transaction history","Outstanding AR balances","Credit limit rules","Payment history data"],outputs:["Credit risk assessment","High-risk transaction flags","Account status summary","Credit limit utilization report","Audit log"],maturity:"Production-ready. Configurable credit limit rules by account type and transaction category.",limits:["Risk assessment based on available financial data only","Cannot account for off-system obligations or unrecorded liabilities","Requires AR system integration and credit limit rule configuration"]},
      Nina:{module:"Accounts Receivable",trigger:"Invoice Issued",what:"Manages accounts receivable workflows by applying incoming payments to open invoices, flagging overdue accounts, generating aging reports, and initiating collections follow-up.",problem:"Reduces days sales outstanding and uncollectible balances by automating payment application and proactively identifying overdue accounts.",users:["Accounts receivable staff","Finance managers","Budget analysts","Collections officers"],capabilities:["Applies incoming payments to open invoice records","Generates AR aging reports by account and period","Flags overdue accounts and initiates collections follow-up","Reconciles inter-agency billing discrepancies","Produces data for financial statement reporting"],inputs:["Issued invoices / billing records","Incoming payment data","Aging rules and collection thresholds","Customer / agency account data","Debt collection rules"],outputs:["Payment application records","AR aging report","Overdue account alerts","Collections action initiation","Financial reporting data","Audit log"],maturity:"Production-ready. Supports standard and inter-agency AR workflows with configurable aging and collections rules.",limits:["Payment application accuracy depends on invoice and remittance data matching","Debt collection escalation beyond automated follow-up requires human and legal involvement","Requires financial management / AR system and payment receipt data feed integration"]},
    },
    exceptions:{
      Daniel:[{type:"Price mismatch on line item 3",ref:"INV-2025-1038",severity:"high"},{type:"Missing PO reference",ref:"INV-2025-1035",severity:"medium"},{type:"Duplicate invoice detected",ref:"INV-2025-1031",severity:"medium"},{type:"Quantity discrepancy — over-delivery",ref:"INV-2025-1027",severity:"high"},{type:"Vendor banking data mismatch",ref:"INV-2025-1022",severity:"high"},{type:"Invoice amount exceeds BPA ceiling",ref:"INV-2025-1018",severity:"medium"}],
      Isa:[{type:"Missing I-9 documentation",ref:"OB-2025-0094",severity:"high"},{type:"Background check delayed >10 days",ref:"OB-2025-0089",severity:"high"},{type:"IT provisioning request stalled",ref:"OB-2025-0087",severity:"medium"},{type:"Benefits enrollment not completed",ref:"OB-2025-0085",severity:"medium"},{type:"Emergency contact form missing",ref:"OB-2025-0083",severity:"medium"},{type:"Start date conflict with security clearance",ref:"OB-2025-0080",severity:"high"}],
      Nina:[{type:"Payment applied to wrong invoice",ref:"AR-2025-0315",severity:"high"},{type:"Remittance advice missing",ref:"AR-2025-0310",severity:"medium"},{type:"Inter-agency billing dispute",ref:"AR-2025-0307",severity:"high"},{type:"DSO exceeded 45-day threshold",ref:"AR-2025-0299",severity:"high"},{type:"Partial payment not reconciled",ref:"AR-2025-0295",severity:"medium"},{type:"Duplicate payment detected",ref:"AR-2025-0288",severity:"high"}],
    },
    runData:{
      Daniel:{runs:[
        {date:"Aug 05, 2025 · 11:41 AM",status:"In progress",duration:"1m 26s",desc:"Invoice validation batch",ref:"INV-2025-1042",stages:["Invoice received","Data extraction","2-way match","Record update"],stageStatus:[true,true,false,false],details:[{label:"Invoice number",val:"INV-2025-1042"},{label:"Vendor",val:"DHL Express Mexico"},{label:"Amount",val:"$4,320.00"},{label:"PO reference",val:"PO-0842"},{label:"Department",val:"Logistics"},{label:"Payment method",val:"EFT"}],chat:[{from:"agent",name:"Daniel",time:"11:41 AM",msg:"Hello, I've received invoice INV-2025-1042 from DHL Express Mexico for $4,320.00. Running 3-way match against PO-0842."},{from:"user",name:"Carlos Aguilar",time:"11:43 AM",msg:"Thanks Daniel, please flag anything over a 2% variance."},{from:"agent",name:"Daniel",time:"11:43 AM",msg:"Understood. Updated tolerance to 2%. Continuing validation."},{from:"user",name:"Carlos Aguilar",time:"11:50 AM",msg:"Any updates?"},{from:"agent",name:"Daniel",time:"11:50 AM",msg:"At 2-way match stage. Lines 1-6 matched. Item 7 shows $48 variance — within 2%. Estimated completion in 3 minutes."}]},
        {date:"Jul 22, 2025 · 03:15 PM",status:"Successful",duration:"1m 26s",desc:"3-way match processing batch",ref:"INV-2025-1041",stages:["Invoice received","Data extraction","2-way match","Record update"],stageStatus:[true,true,true,true],details:[{label:"Invoice number",val:"INV-2025-1041"},{label:"Vendor",val:"Francisco Javier Olvera"},{label:"Amount",val:"$1,850.00"},{label:"PO reference",val:"PO-0839"},{label:"Department",val:"Transport"},{label:"Payment method",val:"Corporate Credit Card"}],chat:[{from:"agent",name:"Daniel",time:"03:15 PM",msg:"Invoice INV-2025-1041 received. Starting validation against PO-0839."},{from:"user",name:"Ana Torres",time:"03:17 PM",msg:"Please double check the receipt documentation."},{from:"agent",name:"Daniel",time:"03:17 PM",msg:"Confirmed. All quantities and prices matched. Invoice approved and routed for payment."},{from:"user",name:"Ana Torres",time:"03:20 PM",msg:"Please send the audit summary to finance."},{from:"agent",name:"Daniel",time:"03:20 PM",msg:"Audit summary sent to finance@company.com. Record updated successfully."}]},
        {date:"Jun 10, 2025 · 08:32 AM",status:"In review",duration:"1m 26s",desc:"PO reconciliation batch",ref:"INV-2025-1040",stages:["Invoice received","Data extraction","2-way match","Record update"],stageStatus:[true,false,false,false],details:[{label:"Invoice number",val:"INV-2025-1040"},{label:"Vendor",val:"Alezo Logistics"},{label:"Amount",val:"$9,100.00"},{label:"PO reference",val:"Missing"},{label:"Department",val:"Operations"},{label:"Payment method",val:"EFT"}],chat:[{from:"agent",name:"Daniel",time:"08:32 AM",msg:"Invoice INV-2025-1040 received from Alezo Logistics. No matching PO reference found. Flagged for human review."},{from:"user",name:"Carlos Aguilar",time:"08:35 AM",msg:"Check if there's a blanket PO for Alezo on file."},{from:"agent",name:"Daniel",time:"08:35 AM",msg:"Found BPA-0012 up to $8,000. Invoice of $9,100 exceeds ceiling — contracting officer review required."},{from:"user",name:"Carlos Aguilar",time:"08:40 AM",msg:"Hold the invoice pending approval."},{from:"agent",name:"Daniel",time:"08:40 AM",msg:"Invoice on hold. Exception ticket #EXC-2025-088 created. CO notified."}]},
      ]},
      Isa:{runs:[
        {date:"Aug 12, 2025 · 09:00 AM",status:"In progress",duration:"3d 4h",desc:"New hire onboarding — Sarah Mitchell",ref:"OB-2025-0091",stages:["Offer accepted","Documentation","Background check","IT provisioning"],stageStatus:[true,true,false,false],details:[{label:"Onboarding ID",val:"OB-2025-0091"},{label:"New hire",val:"Sarah Mitchell"},{label:"Position",val:"Program Analyst GS-11"},{label:"Start date",val:"Sep 01, 2025"},{label:"Department",val:"IT Operations"},{label:"Security level",val:"Public Trust"}],chat:[{from:"agent",name:"Isa",time:"09:00 AM",msg:"Welcome Sarah! I've received your offer acceptance. I'll guide you through the next steps."},{from:"user",name:"Sarah Mitchell",time:"09:05 AM",msg:"Thank you! What do I need to do first?"},{from:"agent",name:"Isa",time:"09:05 AM",msg:"Documentation checklist sent to your email. Complete I-9, emergency contact, and benefits within 3 business days."},{from:"user",name:"Sarah Mitchell",time:"09:20 AM",msg:"I submitted everything. How long does the background check take?"},{from:"agent",name:"Isa",time:"09:20 AM",msg:"Public Trust clearances take 5-7 business days. IT access request submitted — laptop ready on start date."}]},
        {date:"Jul 28, 2025 · 10:15 AM",status:"Completed",duration:"4d 2h",desc:"New hire onboarding — Marcus Lee",ref:"OB-2025-0088",stages:["Offer accepted","Documentation","Background check","IT provisioning"],stageStatus:[true,true,true,true],details:[{label:"Onboarding ID",val:"OB-2025-0088"},{label:"New hire",val:"Marcus Lee"},{label:"Position",val:"Senior Analyst GS-13"},{label:"Start date",val:"Aug 04, 2025"},{label:"Department",val:"Finance"},{label:"Security level",val:"Secret"}],chat:[{from:"agent",name:"Isa",time:"10:15 AM",msg:"Hi Marcus, offer confirmed. SF-86 pre-filled — please review and sign within 48 hours."},{from:"user",name:"Marcus Lee",time:"10:30 AM",msg:"Done. What's next?"},{from:"agent",name:"Isa",time:"10:30 AM",msg:"Background check submitted. IT security notified for Secret-level provisioning."},{from:"user",name:"Marcus Lee",time:"Aug 03 · 2:00 PM",msg:"Am I all set for tomorrow?"},{from:"agent",name:"Isa",time:"Aug 03 · 2:05 PM",msg:"Yes! Clearance passed. Laptop ships by 9 AM. Credentials sent. Welcome aboard!"}]},
        {date:"Jul 10, 2025 · 02:00 PM",status:"In review",duration:"1d 6h",desc:"New hire onboarding — Diana Reyes",ref:"OB-2025-0081",stages:["Offer accepted","Documentation","Background check","IT provisioning"],stageStatus:[true,false,false,false],        details:[{label:"Onboarding ID",val:"OB-2025-0081"},{label:"New hire",val:"Diana Reyes"},{label:"Position",val:"Analyst GS-9"},{label:"Start date",val:"Aug 01, 2025"},{label:"Department",val:"HR"},{label:"Security level",val:"Public Trust"}],chat:[{from:"agent",name:"Isa",time:"02:00 PM",msg:"Hi Diana! Documentation package sent — complete all forms within 2 business days."},{from:"user",name:"Diana Reyes",time:"Jul 11 · 9:00 AM",msg:"I have a foreign passport and work visa for my I-9. Is that acceptable?"},{from:"agent",name:"Isa",time:"Jul 11 · 9:02 AM",msg:"Yes — foreign passport + I-94 is acceptable List A documentation. Please upload both in the portal."},{from:"user",name:"Diana Reyes",time:"Jul 11 · 11:00 AM",msg:"Uploaded both. Anything else?"},{from:"agent",name:"Isa",time:"Jul 11 · 11:01 AM",msg:"HR reviewing your I-9. Once cleared, I'll advance you to the background check stage."}]},
      ]},
      Nina:{runs:[
        {date:"Aug 10, 2025 · 08:00 AM",status:"In progress",duration:"2d 3h",desc:"AR aging review — Q3 collections",ref:"AR-2025-0312",stages:["Invoice issued","Payment matching","Aging review","Collections"],stageStatus:[true,true,true,false],details:[{label:"AR batch",val:"AR-2025-0312"},{label:"Period",val:"Q3 2025"},{label:"Open balance",val:"$184,500"},{label:"Accounts reviewed",val:"42"},{label:"Overdue accounts",val:"3"},{label:"DSO",val:"18 days"}],chat:[{from:"agent",name:"Nina",time:"08:00 AM",msg:"Q3 AR aging review complete. Three overdue: Meridian Group ($42,000, 45d), Apex ($18,200, 32d), Coastal ($9,100, 28d)."},{from:"user",name:"Ana Torres",time:"08:15 AM",msg:"Meridian is a recurring issue. Escalate to legal."},{from:"agent",name:"Nina",time:"08:15 AM",msg:"Escalating Meridian to legal collections. Debt summary sent to legal@company.com."},{from:"user",name:"Ana Torres",time:"08:20 AM",msg:"Send Apex and Coastal a standard past-due notice."},{from:"agent",name:"Nina",time:"08:20 AM",msg:"Notices sent with 10-day response windows. Auto-escalation set for Aug 20."}]},
        {date:"Jul 31, 2025 · 05:00 PM",status:"Successful",duration:"45m",desc:"Monthly payment application",ref:"AR-2025-0298",stages:["Invoice issued","Payment matching","Aging review","Collections"],stageStatus:[true,true,true,true],details:[{label:"AR batch",val:"AR-2025-0298"},{label:"Period",val:"July 2025"},{label:"Total applied",val:"$1,200,000"},{label:"Invoices matched",val:"89"},{label:"Unmatched items",val:"2"},{label:"Accuracy",val:"97.8%"}],chat:[{from:"agent",name:"Nina",time:"05:00 PM",msg:"July payment application complete. $1.2M matched across 89 invoices. Two remittances queued for manual review."},{from:"user",name:"Ana Torres",time:"05:05 PM",msg:"What were the two unmatched items?"},{from:"agent",name:"Nina",time:"05:06 PM",msg:"$9,800 from Horizon LLC (no invoice ref) and $4,400 partial from Delta Corp. Both in manual review folder."},{from:"user",name:"Ana Torres",time:"05:12 PM",msg:"I'll review those. Thanks Nina."},{from:"agent",name:"Nina",time:"05:12 PM",msg:"Month-end AR report sent to finance distribution list."}]},
        {date:"Jul 15, 2025 · 10:30 AM",status:"In review",duration:"1h 20m",desc:"Disputed invoice resolution",ref:"AR-2025-0271",stages:["Invoice issued","Payment matching","Aging review","Collections"],stageStatus:[true,true,false,false],details:[{label:"AR batch",val:"AR-2025-0271"},{label:"Account",val:"Meridian Group"},{label:"Disputed amount",val:"$42,000"},{label:"Invoice",val:"INV-2025-0744"},{label:"Dispute reason",val:"Service quality"},{label:"Days outstanding",val:"45"}],chat:[{from:"agent",name:"Nina",time:"10:30 AM",msg:"Dispute received from Meridian Group for INV-2025-0744 ($42,000) — service quality. Invoice on dispute hold."},{from:"user",name:"Carlos Aguilar",time:"10:45 AM",msg:"What documentation do we have on that delivery?"},{from:"agent",name:"Nina",time:"10:46 AM",msg:"Delivery confirmation Jul 1, signed by J. Hartman. Satisfaction acknowledgment on file. Compiling response package."},{from:"user",name:"Carlos Aguilar",time:"11:00 AM",msg:"Send the package to Meridian and cc me."},{from:"agent",name:"Nina",time:"11:01 AM",msg:"Package sent. 15-day resolution clock set — auto-escalates to collections if no response by July 30."}]},
      ]},
    },
  },
  es: {
    appName:"Beecker Agentes", catalogTab:"Catálogo de Agentes IA", dashboardTab:"Panel", agentLabel:"Agente",
    catalogTitle:"Catálogo de Agentes IA", dashboardTitle:"Panel",
    catalogSub:"24 agentes listos para producción que automatizan procesos empresariales de extremo a extremo.",
    dashboardSub:"Métricas de referencia ilustrativas, datos de rendimiento y una vista en vivo de los agentes desplegados en acción.",
    agents:"agentes", home:"Inicio", backTo:"Volver a", backToPlatform:"Volver al Panel",
    capabilitySheet:"FICHA DE CAPACIDADES", whatItDoes:"QUÉ HACE", businessProblem:"PROBLEMA DE NEGOCIO RESUELTO",
    idealUser:"USUARIO / OPERADOR IDEAL", keyFeatures:"CARACTERÍSTICAS Y CAPACIDADES CLAVE",
    inputsRequired:"ENTRADAS REQUERIDAS", outputsDeliverables:"SALIDAS Y ENTREGABLES",
    maturityReadiness:"MADUREZ Y PREPARACIÓN",
    limitations:"LIMITACIONES, DEPENDENCIAS Y REQUISITOS DE IMPLEMENTACIÓN",
    productionReady:"Listo para producción", transactionDetails:"Detalles de la transacción",
    processingTimeline:"Línea de tiempo de procesamiento", conversation:"Conversación",
    conversationSub:function(n){return "Entre "+n+" (agente IA) y el usuario final";},
    messagePlaceholder:function(n){return "Mensaje a "+n+"...";}, send:"Enviar",
    processOverview:"Resumen del proceso", processOverviewSub:"Distribución actual por etapa del flujo",
    recentExceptions:"Excepciones recientes", recentExceptionsSub:"Pendientes de revisión humana",
    runHistory:"Historial de ejecuciones", runHistorySub:"Haz clic en una fila para ver el detalle y la conversación",
    pageOf:function(a,b){return "Página "+a+" de "+b;}, prev:"Ant.", next:"Sig.",
    active:"Activo", viewDashboard:"Ver panel >",
    exceptionsPending:function(n){return n+" excepción"+(n!==1?"es":"")+" pendiente"+(n!==1?"s":"")+" de revisión";},
    executionStart:"Inicio de ejecución", status:"Estado", duration:"Duración",
    description:"Descripción", reference:"Referencia", requests:"solicitudes",
    cycleTimeTitle:"Tiempo de ciclo: manual vs automatizado", cycleTimeSub:"Días para completar, por proceso",
    manual:"Manual", automated:"Automatizado",
    savingsTitle:"Ahorro anual estimado", savingsSub:"Miles de USD, por área de proceso",
    roiTitle:"ROI acumulado en 12 meses", roiSub:"Multiplicador de retorno desde el inicio",
    sampleAgentsLabel:"AGENTES DESPLEGADOS DE MUESTRA",
    sampleAgentsSub:"Haz clic en cualquier agente para ver su panel de monitoreo en vivo.",
    clickForCapability:"Haz clic en cualquier agente para ver su ficha completa de capacidades.",
    agentReply:function(ref){return "Gracias por tu mensaje. He registrado tu aportación y actualizaré el proceso. Te notificaré de cualquier cambio en el estado de "+ref+".";},
    trigger:"Disparador", moreAgents:function(n){return "+"+n+" más";},
    kpis:[
      {value:"78%",label:"Reducción en tiempo de procesamiento manual",sub:"En H2R, P2P, O2C"},
      {value:"$2.4M",label:"Ahorro anual estimado por despliegue",sub:"10,000+ transacciones/mes"},
      {value:"3.8x",label:"ROI en los primeros 12 meses",sub:"H2R, P2P, O2C combinados"},
      {value:"62%",label:"Menor costo por transacción",sub:"vs. línea base completamente manual"},
    ],
    chartLabels:{cycleItems:["Factura","Creación OC","Incorporación","Viáticos"],months:["M1","M2","M3","M4","M5","M6","M7","M8","M9","M10","M11","M12"]},
    areaDescs:{h2r:"Automatización del ciclo de vida de RRHH de extremo a extremo.",p2p:"Automatización del ciclo de compras de extremo a extremo.",o2c:"Automatización completa del cumplimiento de pedidos y cuentas por cobrar."},
    areaFulls:{h2r:"Contratación a Jubilación",p2p:"Compra a Pago",o2c:"Pedido a Cobro"},
    statusLabels:{"In progress":"En progreso","Successful":"Exitoso","Completed":"Completado","In review":"En revisión"},
    agentDetails:{
      Fer:{module:"Planificación de Vacantes",trigger:"Nueva Vacante Detectada",what:"Detecta señales de nuevas vacantes e inicia automáticamente los flujos de solicitud.",problem:"Elimina el seguimiento manual de posiciones abiertas.",users:["Socios de negocio de RRHH","Planificadores de fuerza laboral","Personal de operaciones de RRHH","Apoyo de la oficina del CHCO"],capabilities:["Monitorea flujos de datos de personal","Prellena la solicitud con datos del puesto","Dirige el borrador a los aprobadores","Registra el evento disparador","Se integra con HRIS"],inputs:["Datos de planificación","Registros organizacionales","Avisos de rotación","Datos de clasificación","Reglas de enrutamiento"],outputs:["Registro de solicitud iniciada","Notificación a aprobadores","Prellenado de datos","Registro de auditoría"],maturity:"Listo para producción.",limits:["Requiere datos limpios","Señales dependen del HRIS","No toma decisiones","Requiere integración HRIS"]},
      Lucas:{module:"Reclutamiento",trigger:"Nueva Solicitud Recibida",what:"Procesa solicitudes, evalúa candidatos y dirige calificados a revisores humanos.",problem:"Reduce la carga del filtrado manual en contrataciones de alto volumen.",users:["Especialistas de RRHH","Gerentes de contratación","Oficiales EEO","Equipos de talento"],capabilities:["Ingesta solicitudes de múltiples canales","Aplica criterios consistentes","Genera resúmenes de candidatos","Dirige a revisores","Mantiene documentación EEO"],inputs:["Solicitudes y currículums","Requisitos del puesto","Criterios de evaluación","Datos EEO","Resultados de evaluaciones"],outputs:["Lista filtrada con puntuaciones","Resúmenes estructurados","Cola de revisión","Documentación EEO","Registro de auditoría"],maturity:"Listo para producción.",limits:["Calidad depende de criterios claros","No realiza selecciones","Requiere revisión humana","Se requiere ATS"]},
      Isa:{module:"Selección, Contratación e Incorporación",trigger:"Nueva Contratación Detectada",what:"Gestiona flujos de ofertas y ejecuta secuencias de incorporación hasta el primer día.",problem:"Elimina tareas omitidas y retrasos en el proceso de oferta a incorporación.",users:["Especialistas de incorporación","Personal de seguridad","Equipos de TI","Supervisores"],capabilities:["Activa secuencias al confirmar contratación","Rastrea documentación en tiempo real","Inicia verificaciones de antecedentes","Envía recordatorios automáticos","Coordina entre RRHH, TI y seguridad"],inputs:["Confirmación de aceptación","Datos del nuevo empleado","Lista de documentos","Reglas de antecedentes","Solicitudes de TI","Plantillas de tareas"],outputs:["Rastreador de tareas","Estado de documentación","Registro de antecedentes","Solicitud de acceso TI","Confirmación día uno","Registro de auditoría"],maturity:"Listo para producción.",limits:["No adjudica autorizaciones","Depende de respuesta del empleado","TI depende de capacidad externa","Requiere integración HRIS y TI"]},
      Ben:{module:"Desempeño y Desarrollo",trigger:"Evaluación Programada",what:"Orquesta ciclos de evaluación y consolida datos para informes de RRHH.",problem:"Previene fallas de cumplimiento por plazos omitidos.",users:["Especialistas de RRHH","Supervisores","Personal CHCO","Equipos L&D"],capabilities:["Programa ciclos","Recopila autoevaluaciones","Rastrea finalización","Marca vencidas","Consolida datos"],inputs:["Planilla de empleados","Plantillas","Formularios","Insumos de gerentes","Registros de capacitación"],outputs:["Panel de estado","Paquetes de evaluación","Alertas de vencidos","Datos consolidados","Reporte PDI","Auditoría"],maturity:"Listo para producción.",limits:["No asigna calificaciones","Depende de participación","No sustituye juicio del gerente","Requiere plataforma de desempeño"]},
      Lily:{module:"Compensación y Beneficios",trigger:"Período de Nómina Iniciado",what:"Valida datos de compensación y marca anomalías antes de ejecutar la nómina.",problem:"Reduce errores causados por datos inconsistentes.",users:["Especialistas de nómina","Administradores de beneficios","Operaciones RRHH","Analistas financieros"],capabilities:["Activa validaciones al inicio","Compara con registros HRIS","Valida inscripciones","Marca anomalías","Genera informe de excepciones"],inputs:["Calendario de nómina","Registros de compensación","Datos de beneficios","Balances de licencia","Reglas de negocio"],outputs:["Informe pre-nómina","Lista de excepciones","Conciliación de beneficios","Confirmación de licencia","Excepciones para aprobación","Auditoría"],maturity:"Listo para producción.",limits:["Depende de oportunidad de datos","No ejecuta nómina","No adjudica disputas","Requiere integración nómina-HRIS"]},
      Lisa:{module:"Viajes y Gastos",trigger:"Solicitud de Reembolso de Viaje",what:"Procesa solicitudes de reembolso validando contra políticas de viaje.",problem:"Elimina búsqueda manual de políticas y cálculos de viáticos.",users:["Viajeros","Administradores de viajes","Operaciones financieras","Aprobadores"],capabilities:["Extrae datos de recibos","Valida contra políticas","Calcula montos permitidos","Marca excepciones","Dirige para aprobación"],inputs:["Solicitudes de reembolso","Recibos","Tasas de viáticos","Autorizaciones de viaje","Reglas de enrutamiento"],outputs:["Solicitud validada","Resumen de cumplimiento","Marcas de excepciones","Paquete de aprobación","Auditoría"],maturity:"Listo para producción.",limits:["Precisión depende de tablas de reglas","Casos inusuales requieren juicio humano","Calidad del recibo afecta extracción","Requiere sistema de viajes"]},
      Cleo:{module:"Separación y Jubilación",trigger:"Notificación de Jubilación",what:"Gestiona flujos de desvinculación coordinando tareas entre múltiples áreas.",problem:"Previene brechas de seguridad y cumplimiento al desvincularse.",users:["Especialistas RRHH","Seguridad","TI","Nómina y beneficios","Supervisores"],capabilities:["Activa secuencias de desvinculación","Coordina revocación de accesos","Calcula pago final","Rastrea tareas","Genera documentación"],inputs:["Aviso de separación","Historial del empleado","Balance de licencia","Elecciones de beneficios","Inventario TI","Registros de acceso"],outputs:["Rastreador de tareas","Paquete de pago final","Solicitud de revocación","Confirmación de cierre TI","Documentación de beneficios","Auditoría"],maturity:"Listo para producción.",limits:["Cálculos requieren reglas OPM actuales","Tiempos dependen de seguridad","Casos complejos requieren especialista","Requiere integración HRIS-TI-seguridad"]},
      Alice:{module:"Planificación de Demanda",trigger:"Señal de Demanda Detectada",what:"Analiza señales de demanda e inicia flujos de planificación de adquisiciones.",problem:"Reduce el retraso entre necesidad e inicio de adquisición.",users:["Oficiales contratantes","Gerentes de programas","Logística","Analistas presupuestarios"],capabilities:["Agrega señales de demanda","Genera documentación de requisitos","Alinea con datos fiscales","Inicia flujos de adquisición","Marca riesgos de suministro"],inputs:["Datos de demanda","Historial de consumo","Datos fiscales","Niveles de inventario","Calendario del programa"],outputs:["Pronóstico de demanda","Registro de planificación","Borrador de requisitos","Informe presupuestario","Auditoría"],maturity:"Listo para producción.",limits:["Precisión depende de datos históricos","No considera cambios no planificados","Requiere integración con sistemas"]},
      Jessica:{module:"Selección de Proveedores",trigger:"Necesidad de Proveedor Identificada",what:"Evalúa proveedores y genera comparativos estructurados para decisores.",problem:"Reemplaza investigación manual con evaluación documentada y consistente.",users:["Oficiales contratantes","Selección de fuentes","Pequeñas empresas","Gerentes de programas"],capabilities:["Consulta SAM.gov","Puntúa proveedores","Marca elegibilidad para reservas","Genera comparativos","Mantiene auditoría"],inputs:["Capacidad del proveedor","SAM.gov","Desempeño anterior","Precios","Clasificación PYME","Criterios"],outputs:["Matriz comparativa","Estado de cumplimiento","Marcas de elegibilidad","Paquete de selección","Auditoría"],maturity:"Listo para producción.",limits:["No hace selecciones finales","Depende de registros actualizados","Adquisiciones complejas requieren evaluación técnica","Requiere API SAM.gov"]},
      Elsa:{module:"Incorporación de Proveedores",trigger:"Nuevo Proveedor Aprobado",what:"Automatiza el registro de proveedores y configuración en sistemas financieros.",problem:"Elimina entrada manual y comunicación de ida y vuelta durante el registro.",users:["Oficiales contratantes","AP / finanzas","Administradores de compras","Gestión de proveedores"],capabilities:["Recopila y valida documentación","Verifica SAM.gov","Valida datos bancarios","Crea registro maestro","Devuelve envíos incompletos"],inputs:["Solicitud de registro","Documentación empresarial","SAM.gov","Clasificación","Reglas de aprobación"],outputs:["Registro maestro validado","Confirmación SAM.gov","Verificación bancaria","Notificación de incorporación","Auditoría"],maturity:"Listo para producción.",limits:["No verifica propiedad real","SAM.gov depende del proveedor","Requiere integración con sistema financiero"]},
      Olivia:{module:"Creación de OC",trigger:"Requisición Aprobada",what:"Genera órdenes de compra desde requisiciones con validaciones de fondos y contratos.",problem:"Elimina borradores manuales y errores de entrada de datos.",users:["Oficiales contratantes","Agentes de compras","Analistas presupuestarios","Gerentes de programas"],capabilities:["Genera OC desde requisición","Verifica fondos","Valida contrato","Dirige por umbral","Registra obligación"],inputs:["Requisición aprobada","Fondos disponibles","Referencia de contrato","Especificaciones","Datos del proveedor","Umbrales"],outputs:["Borrador de OC","Confirmación de fondos","OC aprobada","Registro de obligación","Auditoría"],maturity:"Listo para producción.",limits:["No crea contratos","Depende de datos en tiempo real","Modificaciones complejas requieren acción manual","Requiere ERP"]},
      Chris:{module:"Recepción de Bienes",trigger:"Entrega Recibida",what:"Registra y valida recibos de bienes contra datos de la OC.",problem:"Elimina entradas manuales y asegura documentación completa antes de facturar.",users:["Almacén","CORs / COTRs","Propiedades","AP"],capabilities:["Registra recibo contra OC","Valida cantidades","Marca discrepancias","Genera informe","Actualiza propiedades"],inputs:["Documentación de entrega","Datos de OC","Criterios de inspección","Reglas de propiedades","Autoridad de aceptación"],outputs:["Informe validado","Marcas de discrepancia","Actualización de propiedades","Confirmación","Registro tripartita","Auditoría"],maturity:"Listo para producción.",limits:["No realiza inspección física","Condición requiere inspector humano","Entregas parciales requieren reglas","Requiere integración OC-propiedades"]},
      Tony:{module:"Gestión de Inventario",trigger:"Actualización de Inventario Detectada",what:"Monitorea niveles de inventario y reconcilia discrepancias entre conteos y sistema.",problem:"Previene agotamientos mediante monitoreo proactivo.",users:["Cadena de suministro","Propiedades","Compras","Analistas financieros"],capabilities:["Monitorea existencias","Reconcilia conteos","Marca discrepancias","Identifica excedentes","Genera informes de auditoría"],inputs:["Datos de inventario","Registros de conteo","Reglas de reorden","Datos de propiedades","Historial de consumo"],outputs:["Informe de estado","Recomendaciones de reorden","Marcas","Resumen de conciliación","Excedentes","Auditoría"],maturity:"Listo para producción.",limits:["Precisión depende de datos en tiempo real","No verifica inventario físico","Disposición requiere revisión humana","Requiere integración"]},
      Ryan:{module:"Gestión de Devoluciones",trigger:"Solicitud de Devolución Iniciada",what:"Procesa devoluciones coordinando con proveedores e iniciando créditos o reemplazos.",problem:"Reemplaza coordinación manual con proceso documentado y estructurado.",users:["Almacén","Oficiales contratantes","AP","Propiedades"],capabilities:["Inicia autorización de devolución","Notifica proveedor","Rastrea crédito","Actualiza inventario","Mantiene auditoría"],inputs:["Solicitud con código","OC y recibo original","Instrucciones del proveedor","Inventario","Reglas de crédito"],outputs:["Autorización de devolución","Notificación al proveedor","Solicitud de crédito","Inventario actualizado","Auditoría"],maturity:"Listo para producción.",limits:["Respuesta del proveedor afecta ciclo","Casos complejos requieren OC","Requiere sistema de inventario"]},
      Daniel:{module:"Procesamiento de Facturas y Conciliación Tripartita",trigger:"Factura Recibida",what:"Automatiza la revisión de facturas contra OC y registros de recepción.",problem:"Reduce esfuerzo manual en revisión de facturas y acelera ciclos de procesamiento.",users:["Equipos AP","Analistas","Operaciones financieras","Servicios compartidos"],capabilities:["Extrae y normaliza datos","Compara a nivel de línea","Marca discrepancias","Dirige excepciones","Crea resúmenes de auditoría"],inputs:["Facturas","Órdenes de compra","Registros de recepción","Datos maestros","Reglas y umbrales","ERP"],outputs:["Resultado de conciliación","Informe de discrepancias","Cola de excepciones","Recomendación de aprobación","Auditoría"],maturity:"Listo para producción.",limits:["Depende de calidad del documento","Requiere registros completos","Aprobación final requiere personal autorizado","Requiere ERP"]},
      David:{module:"Procesamiento de Pagos",trigger:"Factura Aprobada para Pago",what:"Valida facturas aprobadas y dirige paquetes de pago al canal de desembolso.",problem:"Reduce errores asegurando aprobaciones completas antes del desembolso.",users:["AP / desembolso","Operaciones financieras","Analistas presupuestarios","Servicios compartidos"],capabilities:["Valida paquete de facturas","Confirma datos bancarios","Aplica verificaciones previas","Dirige al canal apropiado","Registra desembolso"],inputs:["Paquete aprobado","Datos bancarios","Certificación de fondos","Reglas de pago","Datos de Tesorería"],outputs:["Paquete listo para pago","Validación previa","Confirmación de enrutamiento","Registro de desembolso","Auditoría"],maturity:"Listo para producción.",limits:["No ejecuta pagos — solo prepara","Depende de paquete completo","IPAC requiere configuración específica"]},
      Nico:{module:"Procesamiento de Pedidos",trigger:"Nuevo Pedido Recibido",what:"Ingesta y valida pedidos iniciando flujos de cumplimiento.",problem:"Elimina recepción manual y reduce errores en el punto de entrada.",users:["Gestión de pedidos","Coordinadores de cadena","Gerentes de programas","Servicio al cliente"],capabilities:["Ingesta pedidos multi-canal","Valida datos","Dirige excepciones","Inicia cumplimiento","Envía acuse de recibo"],inputs:["Datos del pedido","Autorización del cliente","Catálogo","Disponibilidad","Reglas de enrutamiento"],outputs:["Pedido validado","Disparador de cumplimiento","Acuse de recibo","Excepciones","Auditoría"],maturity:"Listo para producción.",limits:["Depende de integridad de datos","Pedidos inusuales requieren manejo manual","Requiere integración"]},
      Diana:{module:"Planificación de Entregas",trigger:"Pedido Validado",what:"Planifica y programa logística de entrega generando calendarios optimizados.",problem:"Reemplaza planificación manual con proceso automatizado basado en datos.",users:["Coordinadores de logística","Planificadores","Gerentes de almacén","Gerentes de programas"],capabilities:["Genera calendarios","Asigna recursos","Marca riesgos de SLA","Recomienda transportistas","Actualiza el plan"],inputs:["Pedido validado","Inventario y almacén","Requisitos del cliente","Reglas SLA","Capacidad de transportista"],outputs:["Calendario de entrega","Plan de recursos","Pronóstico SLA","Recomendaciones","Auditoría"],maturity:"Listo para producción.",limits:["Depende de datos en tiempo real","Interrupciones requieren re-planificación","Requiere integración"]},
      James:{module:"Planificación de Transporte",trigger:"Entrega Programada",what:"Optimiza enrutamiento y selección de transportistas para envíos salientes.",problem:"Reemplaza selección manual con optimización automatizada.",users:["Coordinadores de transporte","Gerentes de logística","Oficiales contratantes","Cadena de suministro"],capabilities:["Evalúa opciones de transportistas","Genera rutas optimizadas","Documenta cumplimiento","Crea paquetes de instrucciones","Rastrea selección para auditoría"],inputs:["Calendario de entrega","Base de datos de transportistas","Reglas de optimización","Requisitos de cumplimiento","Especificaciones"],outputs:["Plan optimizado","Recomendación de transportista","Documentación de cumplimiento","Instrucciones","Auditoría"],maturity:"Listo para producción.",limits:["Depende de datos del transportista","Envíos clasificados requieren protocolos adicionales","Requiere motor de enrutamiento"]},
      Julia:{module:"Logística de Salida",trigger:"Envío Listo para Despacho",what:"Gestiona ejecución de envíos incluyendo documentación y seguimiento.",problem:"Elimina preparación manual de documentos y coordina entrega al transportista.",users:["Almacén","Coordinadores de logística","Propiedades","Gerentes de programas"],capabilities:["Genera conocimientos de embarque","Coordina recogida","Inicia seguimiento","Procesa confirmación","Marca excepciones"],inputs:["Plan de envío","Lista de empaque","Instrucciones del transportista","Requisitos regulatorios","Reglas de confirmación"],outputs:["Documentación de envío","Confirmación al transportista","Número de rastreo","Confirmación de entrega","Auditoría"],maturity:"Listo para producción.",limits:["No reemplaza inspección física","Materiales peligrosos requieren especialista","API del transportista afecta rastreo","Requiere conectividad"]},
      Mia:{module:"Gestión de Crédito",trigger:"Transacción de Alto Riesgo Detectada",what:"Evalúa exposición crediticia y marca situaciones de alto riesgo para revisión.",problem:"Proporciona visibilidad proactiva de riesgos en cuentas por cobrar.",users:["CxC","Gerentes financieros","Gerentes de programas","Analistas presupuestarios"],capabilities:["Evalúa exposición crediticia","Marca transacciones de riesgo","Genera resúmenes de estado","Rastrea historial de pagos","Dirige marcas para revisión"],inputs:["Datos de cuenta","Historial de transacciones","Saldos pendientes","Reglas de límite","Historial de pagos"],outputs:["Evaluación de riesgo","Marcas de alto riesgo","Resumen de cuenta","Informe de utilización","Auditoría"],maturity:"Listo para producción.",limits:["Solo datos financieros disponibles","No considera pasivos no registrados","Requiere integración con CxC"]},
      Nina:{module:"Cuentas por Cobrar",trigger:"Factura Emitida",what:"Gestiona CxC aplicando pagos, marcando vencidos e iniciando cobros.",problem:"Reduce DSO automatizando aplicación de pagos e identificando cuentas vencidas.",users:["Personal CxC","Gerentes financieros","Analistas presupuestarios","Oficiales de cobros"],capabilities:["Aplica pagos a facturas","Genera informes de antigüedad","Marca vencidas e inicia cobros","Reconcilia facturación interinstitucional","Produce datos para estados financieros"],inputs:["Facturas emitidas","Datos de pagos","Reglas de antigüedad","Datos de cuenta","Reglas de cobro"],outputs:["Registros de aplicación","Informe de antigüedad","Alertas de vencidas","Inicio de cobros","Datos financieros","Auditoría"],maturity:"Listo para producción.",limits:["Precisión depende de coincidencia de datos","Escalación legal requiere intervención humana","Requiere integración con sistema financiero"]},
    },
    exceptions:{
      Daniel:[{type:"Discrepancia de precio en línea 3",ref:"INV-2025-1038",severity:"high"},{type:"Referencia de OC faltante",ref:"INV-2025-1035",severity:"medium"},{type:"Factura duplicada detectada",ref:"INV-2025-1031",severity:"medium"},{type:"Discrepancia de cantidad",ref:"INV-2025-1027",severity:"high"},{type:"Datos bancarios no coinciden",ref:"INV-2025-1022",severity:"high"},{type:"Monto excede techo del BPA",ref:"INV-2025-1018",severity:"medium"}],
      Isa:[{type:"Documentación I-9 faltante",ref:"OB-2025-0094",severity:"high"},{type:"Verificación de antecedentes demorada",ref:"OB-2025-0089",severity:"high"},{type:"Aprovisionamiento de TI bloqueado",ref:"OB-2025-0087",severity:"medium"},{type:"Inscripción a beneficios incompleta",ref:"OB-2025-0085",severity:"medium"},{type:"Formulario de contacto faltante",ref:"OB-2025-0083",severity:"medium"},{type:"Conflicto fecha inicio con autorización",ref:"OB-2025-0080",severity:"high"}],
      Nina:[{type:"Pago aplicado a factura incorrecta",ref:"AR-2025-0315",severity:"high"},{type:"Aviso de remesa faltante",ref:"AR-2025-0310",severity:"medium"},{type:"Disputa de facturación interinstitucional",ref:"AR-2025-0307",severity:"high"},{type:"DSO superó umbral de 45 días",ref:"AR-2025-0299",severity:"high"},{type:"Pago parcial sin conciliar",ref:"AR-2025-0295",severity:"medium"},{type:"Pago duplicado detectado",ref:"AR-2025-0288",severity:"high"}],
    },
    runData:{
      Daniel:{runs:[
        {date:"05 Ago 2025 · 11:41 AM",status:"In progress",duration:"1m 26s",desc:"Lote de validación de facturas",ref:"INV-2025-1042",stages:["Factura recibida","Extracción de datos","Conciliación 2 vías","Actualización de registro"],stageStatus:[true,true,false,false],details:[{label:"Número de factura",val:"INV-2025-1042"},{label:"Proveedor",val:"DHL Express México"},{label:"Monto",val:"$4,320.00"},{label:"Referencia OC",val:"OC-0842"},{label:"Departamento",val:"Logística"},{label:"Método de pago",val:"TEF"}],chat:[{from:"agent",name:"Daniel",time:"11:41 AM",msg:"Hola, factura INV-2025-1042 recibida."},{from:"user",name:"Carlos Aguilar",time:"11:43 AM",msg:"Marca variaciones mayores al 2%."},{from:"agent",name:"Daniel",time:"11:43 AM",msg:"Entendido. Tolerancia actualizada."},{from:"user",name:"Carlos Aguilar",time:"11:50 AM",msg:"¿Actualizaciones?"},{from:"agent",name:"Daniel",time:"11:50 AM",msg:"Líneas 1-6 correctas. Línea 7: variación de $48 — dentro del umbral."}]},
        {date:"22 Jul 2025 · 03:15 PM",status:"Successful",duration:"1m 26s",desc:"Lote de conciliación tripartita",ref:"INV-2025-1041",stages:["Factura recibida","Extracción de datos","Conciliación 2 vías","Actualización de registro"],stageStatus:[true,true,true,true],details:[{label:"Número de factura",val:"INV-2025-1041"},{label:"Proveedor",val:"Francisco Javier Olvera"},{label:"Monto",val:"$1,850.00"},{label:"Referencia OC",val:"OC-0839"},{label:"Departamento",val:"Transporte"},{label:"Método de pago",val:"Tarjeta Corporativa"}],chat:[{from:"agent",name:"Daniel",time:"03:15 PM",msg:"Factura recibida. Iniciando validación."},{from:"user",name:"Ana Torres",time:"03:17 PM",msg:"Verifica la documentación de recibo."},{from:"agent",name:"Daniel",time:"03:17 PM",msg:"Todo coincide. Factura aprobada."},{from:"user",name:"Ana Torres",time:"03:20 PM",msg:"Envía resumen a finanzas."},{from:"agent",name:"Daniel",time:"03:20 PM",msg:"Resumen enviado. Registro actualizado."}]},
        {date:"10 Jun 2025 · 08:32 AM",status:"In review",duration:"1m 26s",desc:"Lote de conciliación de OC",ref:"INV-2025-1040",stages:["Factura recibida","Extracción de datos","Conciliación 2 vías","Actualización de registro"],stageStatus:[true,false,false,false],details:[{label:"Número de factura",val:"INV-2025-1040"},{label:"Proveedor",val:"Alezo Logistics"},{label:"Monto",val:"$9,100.00"},{label:"Referencia OC",val:"No encontrada"},{label:"Departamento",val:"Operaciones"},{label:"Método de pago",val:"TEF"}],chat:[{from:"agent",name:"Daniel",time:"08:32 AM",msg:"Sin referencia de OC. Marcada para revisión."},{from:"user",name:"Carlos Aguilar",time:"08:35 AM",msg:"¿Hay OC abierta para Alezo?"},{from:"agent",name:"Daniel",time:"08:35 AM",msg:"BPA-0012 hasta $8,000. Monto excede techo — requiere revisión del OC."},{from:"user",name:"Carlos Aguilar",time:"08:40 AM",msg:"Retén hasta aprobación."},{from:"agent",name:"Daniel",time:"08:40 AM",msg:"Factura en espera. Ticket #EXC-2025-088 creado."}]},
      ]},
      Isa:{runs:[
        {date:"12 Ago 2025 · 09:00 AM",status:"In progress",duration:"3d 4h",desc:"Incorporación — Sarah Mitchell",ref:"OB-2025-0091",stages:["Oferta aceptada","Documentación","Verificación antecedentes","Aprovisionamiento TI"],stageStatus:[true,true,false,false],details:[{label:"ID incorporación",val:"OB-2025-0091"},{label:"Nuevo empleado",val:"Sarah Mitchell"},{label:"Puesto",val:"Analista GS-11"},{label:"Fecha inicio",val:"01 Sep 2025"},{label:"Departamento",val:"Operaciones TI"},{label:"Nivel de seguridad",val:"Confianza Pública"}],chat:[{from:"agent",name:"Isa",time:"09:00 AM",msg:"Bienvenida Sarah. Documentación enviada."},{from:"user",name:"Sarah Mitchell",time:"09:05 AM",msg:"¿Qué hago primero?"},{from:"agent",name:"Isa",time:"09:05 AM",msg:"Completa I-9 y beneficios en 3 días hábiles."},{from:"user",name:"Sarah Mitchell",time:"09:20 AM",msg:"¿Cuánto tarda la verificación?"},{from:"agent",name:"Isa",time:"09:20 AM",msg:"5-7 días hábiles. Solicitud TI enviada."}]},
        {date:"28 Jul 2025 · 10:15 AM",status:"Completed",duration:"4d 2h",desc:"Incorporación — Marcus Lee",ref:"OB-2025-0088",stages:["Oferta aceptada","Documentación","Verificación antecedentes","Aprovisionamiento TI"],stageStatus:[true,true,true,true],details:[{label:"ID incorporación",val:"OB-2025-0088"},{label:"Nuevo empleado",val:"Marcus Lee"},{label:"Puesto",val:"Analista Senior GS-13"},{label:"Fecha inicio",val:"04 Ago 2025"},{label:"Departamento",val:"Finanzas"},{label:"Nivel de seguridad",val:"Secreto"}],chat:[{from:"agent",name:"Isa",time:"10:15 AM",msg:"Oferta confirmada. SF-86 prellenado."},{from:"user",name:"Marcus Lee",time:"10:30 AM",msg:"Listo."},{from:"agent",name:"Isa",time:"10:30 AM",msg:"Verificación enviada. TI notificado."},{from:"user",name:"Marcus Lee",time:"03 Ago · 2:00 PM",msg:"¿Listo para mañana?"},{from:"agent",name:"Isa",time:"03 Ago · 2:05 PM",msg:"Sí. Laptop llega a las 9 AM. Bienvenido."}]},
        {date:"10 Jul 2025 · 02:00 PM",status:"In review",duration:"1d 6h",desc:"Incorporación — Diana Reyes",ref:"OB-2025-0081",stages:["Oferta aceptada","Documentación","Verificación antecedentes","Aprovisionamiento TI"],stageStatus:[true,false,false,false],details:[{label:"ID incorporación",val:"OB-2025-0081"},{label:"Nuevo empleado",val:"Diana Reyes"},{label:"Puesto",val:"Analista GS-9"},{label:"Fecha inicio",val:"01 Ago 2025"},{label:"Departamento",val:"RRHH"},{label:"Nivel de seguridad",val:"Confianza Pública"}],chat:[{from:"agent",name:"Isa",time:"02:00 PM",msg:"Paquete de documentación enviado."},{from:"user",name:"Diana Reyes",time:"11 Jul · 9:00 AM",msg:"Tengo pasaporte extranjero y visa."},{from:"agent",name:"Isa",time:"11 Jul · 9:02 AM",msg:"Sí, es válido. Sube ambos al portal."},{from:"user",name:"Diana Reyes",time:"11 Jul · 11:00 AM",msg:"Subí ambos."},{from:"agent",name:"Isa",time:"11 Jul · 11:01 AM",msg:"RRHH revisando. Te notifico en 24 horas."}]},
      ]},
      Nina:{runs:[
        {date:"10 Ago 2025 · 08:00 AM",status:"In progress",duration:"2d 3h",desc:"Revisión de antigüedad CxC — cobros Q3",ref:"AR-2025-0312",stages:["Factura emitida","Aplicación de pagos","Revisión de antigüedad","Cobros"],stageStatus:[true,true,true,false],details:[{label:"Lote CxC",val:"AR-2025-0312"},{label:"Período",val:"Q3 2025"},{label:"Saldo abierto",val:"$184,500"},{label:"Cuentas revisadas",val:"42"},{label:"Cuentas vencidas",val:"3"},{label:"DSO",val:"18 días"}],chat:[{from:"agent",name:"Nina",time:"08:00 AM",msg:"Revisión Q3 completa. Tres vencidas."},{from:"user",name:"Ana Torres",time:"08:15 AM",msg:"Escala Meridian a legal."},{from:"agent",name:"Nina",time:"08:15 AM",msg:"Escalando. Resumen enviado."},{from:"user",name:"Ana Torres",time:"08:20 AM",msg:"Envía aviso a Apex y Coastal."},{from:"agent",name:"Nina",time:"08:20 AM",msg:"Avisos enviados. Escalación automática el 20 de agosto."}]},
        {date:"31 Jul 2025 · 05:00 PM",status:"Successful",duration:"45m",desc:"Aplicación mensual de pagos",ref:"AR-2025-0298",stages:["Factura emitida","Aplicación de pagos","Revisión de antigüedad","Cobros"],stageStatus:[true,true,true,true],details:[{label:"Lote CxC",val:"AR-2025-0298"},{label:"Período",val:"Julio 2025"},{label:"Total aplicado",val:"$1,200,000"},{label:"Facturas conciliadas",val:"89"},{label:"Sin conciliar",val:"2"},{label:"Precisión",val:"97.8%"}],chat:[{from:"agent",name:"Nina",time:"05:00 PM",msg:"$1.2M conciliados en 89 facturas."},{from:"user",name:"Ana Torres",time:"05:05 PM",msg:"¿Cuáles sin conciliar?"},{from:"agent",name:"Nina",time:"05:06 PM",msg:"$9,800 Horizon LLC y $4,400 Delta Corp."},{from:"user",name:"Ana Torres",time:"05:12 PM",msg:"Los reviso ahora."},{from:"agent",name:"Nina",time:"05:12 PM",msg:"Informe mensual enviado."}]},
        {date:"15 Jul 2025 · 10:30 AM",status:"In review",duration:"1h 20m",desc:"Resolución de factura en disputa",ref:"AR-2025-0271",stages:["Factura emitida","Aplicación de pagos","Revisión de antigüedad","Cobros"],stageStatus:[true,true,false,false],details:[{label:"Lote CxC",val:"AR-2025-0271"},{label:"Cuenta",val:"Grupo Meridian"},{label:"Monto en disputa",val:"$42,000"},{label:"Factura",val:"INV-2025-0744"},{label:"Motivo",val:"Calidad del servicio"},{label:"Días pendientes",val:"45"}],chat:[{from:"agent",name:"Nina",time:"10:30 AM",msg:"Disputa de Meridian por $42,000. Factura en espera."},{from:"user",name:"Carlos Aguilar",time:"10:45 AM",msg:"¿Qué documentación tenemos?"},{from:"agent",name:"Nina",time:"10:46 AM",msg:"Confirmación del 1 de julio. Compilando paquete."},{from:"user",name:"Carlos Aguilar",time:"11:00 AM",msg:"Envía a Meridian y cópiame."},{from:"agent",name:"Nina",time:"11:01 AM",msg:"Paquete enviado. Reloj de 15 días iniciado."}]},
      ]},
    },
  },
};

// ─── AREA BASE ────────────────────────────────────────────────────────────────
var areaBase = [
  {id:"h2r",color:"#7c3aed",light:"#f5f3ff",border:"#c4b5fd",agents:[{name:"Fer",icon:"JP"},{name:"Lucas",icon:"RC"},{name:"Isa",icon:"OB"},{name:"Ben",icon:"PM"},{name:"Lily",icon:"CP"},{name:"Lisa",icon:"TE"},{name:"Cleo",icon:"SR"}]},
  {id:"p2p",color:"#6d28d9",light:"#f5f0ff",border:"#c4b5fd",agents:[{name:"Alice",icon:"DP"},{name:"Jessica",icon:"SS"},{name:"Elsa",icon:"SO"},{name:"Olivia",icon:"PO"},{name:"Chris",icon:"GR"},{name:"Tony",icon:"IM"},{name:"Ryan",icon:"RM"},{name:"Daniel",icon:"IP"},{name:"David",icon:"PP"}]},
  {id:"o2c",color:"#4338ca",light:"#eef2ff",border:"#a5b4fc",agents:[{name:"Nico",icon:"OP"},{name:"Diana",icon:"DL"},{name:"James",icon:"TP"},{name:"Julia",icon:"OL"},{name:"Ryan",icon:"RT"},{name:"Mia",icon:"CM"},{name:"Alice",icon:"SM"},{name:"Nina",icon:"AR"}]},
];

var areaIcons = {
  h2r:<svg width="26" height="26" viewBox="0 0 26 26" fill="none"><circle cx="13" cy="9" r="4.5" stroke="currentColor" strokeWidth="1.6"/><path d="M3.5 23c0-5.247 4.253-9.5 9.5-9.5s9.5 4.253 9.5 9.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>,
  p2p:<svg width="26" height="26" viewBox="0 0 26 26" fill="none"><rect x="3" y="7" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.6"/><rect x="15" y="11" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.6"/><path d="M11 11h4M11 15h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>,
  o2c:<svg width="26" height="26" viewBox="0 0 26 26" fill="none"><path d="M5 7h16M5 7l2-3M21 7l-2-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/><rect x="3" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.6"/><path d="M9 14l3 3 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>,
};

function getAreas(t) {
  return areaBase.map(function(a) {
    return Object.assign({}, a, {
      label: a.id.toUpperCase(),
      full: t.areaFulls[a.id],
      desc: t.areaDescs[a.id],
      agents: a.agents.map(function(ag) { return Object.assign({}, ag, t.agentDetails[ag.name]); })
    });
  });
}

// ─── NINA PAYROLL DATA ────────────────────────────────────────────────────────
var ninaPayrollAgent = {
  name:"Nina P.", role:"Payroll Unification & Processing", area:"H2R",
  color:"#0369a1", light:"#e0f2fe", border:"#7dd3fc", initials:"NP",
  stats:[
    {label:"Files processing today",val:"14"},
    {label:"Employees unified",val:"3,847"},
    {label:"Exceptions flagged",val:"7"},
    {label:"Avg processing time",val:"4.2 min"},
  ],
  exceptions:[
    {type:"Missing hours — Plant Monterrey, Week 42",ref:"UKG-2025-1041",severity:"high"},
    {type:"SAP format mismatch — Plant Guadalajara",ref:"SAP-2025-0892",severity:"high"},
    {type:"Duplicate employee ID detected",ref:"UKG-2025-1038",severity:"medium"},
    {type:"Overtime calculation variance >2%",ref:"UKG-2025-1035",severity:"medium"},
    {type:"Missing cost center — Plant Querétaro",ref:"SAP-2025-0887",severity:"high"},
    {type:"Kronos clock-in gap >8hrs flagged",ref:"KRN-2025-0441",severity:"medium"},
  ],
  runs:[
    {
      ref:"PAYROLL-W43-2025",date:"Oct 25, 2025 · 07:00 AM",status:"In progress",
      duration:"18m 32s",desc:"Week 43 payroll unification — 6 plants",
      stages:["File ingestion","Format normalization","Validation & matching","SAP upload","Approval routing"],
      stageStatus:[true,true,true,false,false],
      summary:{week:"Week 43 / 2025",plants:6,employees:3847,totalFiles:18,unifiedRecords:3712,exceptions:7,grossPayroll:"$4,218,540 MXN"},
      plants:[
        {name:"Plant Monterrey",  system:"UKG Kronos",employees:842,records:831,status:"Exception",issue:"Missing hours for 11 employees (shift overlap detected)"},
        {name:"Plant Guadalajara",system:"SAP HCM",   employees:654,records:654,status:"Normalized",issue:null},
        {name:"Plant Querétaro",  system:"UKG Kronos",employees:723,records:718,status:"Exception",issue:"5 records missing cost center mapping"},
        {name:"Plant Toluca",     system:"Excel/UKG", employees:512,records:512,status:"Normalized",issue:null},
        {name:"Plant CDMX",       system:"SAP HCM",   employees:698,records:698,status:"Normalized",issue:null},
        {name:"Plant Saltillo",   system:"UKG Kronos",employees:418,records:299,status:"Processing",issue:"File still ingesting — 119 records pending"},
      ],
      transactions:[
        {id:"TXN-001",plant:"Plant Monterrey",  empId:"EMP-4421",name:"Carlos Mendoza",  type:"Regular",  hours:40,overtime:0, gross:"$8,200 MXN", status:"Validated",source:"UKG Kronos",issue:null},
        {id:"TXN-002",plant:"Plant Monterrey",  empId:"EMP-4438",name:"Ana Torres",      type:"Regular",  hours:40,overtime:8, gross:"$10,450 MXN",status:"Validated",source:"UKG Kronos",issue:null},
        {id:"TXN-003",plant:"Plant Monterrey",  empId:"EMP-4455",name:"Luis García",     type:"Regular",  hours:0, overtime:0, gross:"$0 MXN",     status:"Exception",source:"UKG Kronos",issue:"Missing hours — no clock-in record found in Kronos"},
        {id:"TXN-004",plant:"Plant Guadalajara",empId:"EMP-2201",name:"María López",     type:"Regular",  hours:40,overtime:4, gross:"$9,100 MXN", status:"Validated",source:"SAP HCM",   issue:null},
        {id:"TXN-005",plant:"Plant Guadalajara",empId:"EMP-2215",name:"Pedro Ramírez",   type:"Sick leave",hours:24,overtime:0,gross:"$4,320 MXN", status:"Validated",source:"SAP HCM",   issue:null},
        {id:"TXN-006",plant:"Plant Querétaro",  empId:"EMP-3301",name:"Sofía Hernández", type:"Regular",  hours:40,overtime:12,gross:"$11,200 MXN",status:"Exception",source:"UKG Kronos",issue:"Cost center QRO-CC-009 not found in SAP master data"},
        {id:"TXN-007",plant:"Plant Toluca",     empId:"EMP-5512",name:"Jorge Castillo",  type:"Regular",  hours:40,overtime:0, gross:"$7,800 MXN", status:"Validated",source:"Excel/UKG", issue:null},
        {id:"TXN-008",plant:"Plant CDMX",       empId:"EMP-1102",name:"Valentina Cruz",  type:"Vacation", hours:40,overtime:0, gross:"$8,950 MXN", status:"Validated",source:"SAP HCM",   issue:null},
        {id:"TXN-009",plant:"Plant Saltillo",   empId:"EMP-6601",name:"Roberto Silva",   type:"Regular",  hours:40,overtime:6, gross:"$9,600 MXN", status:"Pending",  source:"UKG Kronos",issue:"Awaiting file completion"},
        {id:"TXN-010",plant:"Plant CDMX",       empId:"EMP-1145",name:"Daniela Morales", type:"Regular",  hours:38,overtime:0, gross:"$8,550 MXN", status:"Validated",source:"SAP HCM",   issue:null},
      ],
      chat:[
        {from:"agent",name:"Nina P.",time:"07:00 AM",msg:"Good morning. Week 43 payroll batch initiated. Ingesting files from 6 plants: Monterrey (UKG Kronos), Guadalajara (SAP HCM), Querétaro (UKG Kronos), Toluca (Excel/UKG), CDMX (SAP HCM), Saltillo (UKG Kronos)."},
        {from:"user",name:"Shared Services",time:"07:04 AM",msg:"Nina, Saltillo sent their file late again. Do you have it?"},
        {from:"agent",name:"Nina P.",time:"07:04 AM",msg:"Yes — Saltillo file received at 07:01 AM, currently ingesting. 119 of 418 records processed so far. Estimated completion in 6 minutes. All other plants are fully ingested."},
        {from:"user",name:"Shared Services",time:"07:12 AM",msg:"Any issues so far?"},
        {from:"agent",name:"Nina P.",time:"07:12 AM",msg:"Two exceptions flagged: (1) Plant Monterrey: 11 employees with missing hours — likely a Kronos shift overlap, HR confirmation needed. (2) Plant Querétaro: 5 records referencing cost center QRO-CC-009 which doesn't exist in SAP master data. I've paused those records pending correction."},
        {from:"user",name:"Shared Services",time:"07:18 AM",msg:"I'll check with Monterrey HR. On Querétaro — that cost center was renamed to QRO-CC-012 last month. Can you remap?"},
        {from:"agent",name:"Nina P.",time:"07:18 AM",msg:"Remapping QRO-CC-009 to QRO-CC-012 for all 5 affected records. I'll flag this in the exception log for the SAP master data team to update the mapping table so it doesn't recur. Records now queued for re-validation."},
      ],
    },
    {
      ref:"PAYROLL-W42-2025",date:"Oct 18, 2025 · 07:00 AM",status:"Successful",
      duration:"12m 14s",desc:"Week 42 payroll unification — 6 plants",
      stages:["File ingestion","Format normalization","Validation & matching","SAP upload","Approval routing"],
      stageStatus:[true,true,true,true,true],
      summary:{week:"Week 42 / 2025",plants:6,employees:3847,totalFiles:18,unifiedRecords:3847,exceptions:2,grossPayroll:"$4,197,880 MXN"},
      plants:[
        {name:"Plant Monterrey",  system:"UKG Kronos",employees:842,records:842,status:"Normalized",issue:null},
        {name:"Plant Guadalajara",system:"SAP HCM",   employees:654,records:654,status:"Normalized",issue:null},
        {name:"Plant Querétaro",  system:"UKG Kronos",employees:723,records:721,status:"Exception", issue:"2 duplicate employee IDs resolved manually"},
        {name:"Plant Toluca",     system:"Excel/UKG", employees:512,records:512,status:"Normalized",issue:null},
        {name:"Plant CDMX",       system:"SAP HCM",   employees:698,records:698,status:"Normalized",issue:null},
        {name:"Plant Saltillo",   system:"UKG Kronos",employees:418,records:420,status:"Exception", issue:"2 ghost records found — removed from batch"},
      ],
      transactions:[
        {id:"TXN-001",plant:"Plant Monterrey",  empId:"EMP-4421",name:"Carlos Mendoza", type:"Regular",hours:40,overtime:0,gross:"$8,200 MXN", status:"Validated",source:"UKG Kronos",issue:null},
        {id:"TXN-002",plant:"Plant Guadalajara",empId:"EMP-2201",name:"María López",    type:"Regular",hours:40,overtime:8,gross:"$10,640 MXN",status:"Validated",source:"SAP HCM",   issue:null},
        {id:"TXN-003",plant:"Plant Querétaro",  empId:"EMP-3311",name:"Héctor Vega",    type:"Regular",hours:40,overtime:4,gross:"$9,300 MXN", status:"Validated",source:"UKG Kronos",issue:null},
        {id:"TXN-004",plant:"Plant Saltillo",   empId:"EMP-6609",name:"Isaura Pérez",   type:"Regular",hours:40,overtime:0,gross:"$7,600 MXN", status:"Validated",source:"UKG Kronos",issue:null},
        {id:"TXN-005",plant:"Plant CDMX",       empId:"EMP-1102",name:"Valentina Cruz", type:"Regular",hours:40,overtime:6,gross:"$10,100 MXN",status:"Validated",source:"SAP HCM",   issue:null},
      ],
      chat:[
        {from:"agent",name:"Nina P.",time:"07:00 AM",msg:"Week 42 payroll batch started. All 6 plant files received on time. Beginning ingestion and format normalization."},
        {from:"agent",name:"Nina P.",time:"07:08 AM",msg:"Normalization complete. Two minor issues: (1) Querétaro — 2 duplicate employee IDs, resolved by keeping the most recent record. (2) Saltillo — 2 ghost records with no matching employee ID; removed. Total clean records: 3,847. Uploading to SAP now."},
        {from:"user",name:"Shared Services",time:"07:10 AM",msg:"Any overtime anomalies?"},
        {from:"agent",name:"Nina P.",time:"07:11 AM",msg:"No overtime anomalies this week. All records within approved thresholds. SAP upload complete. Payroll file routed to approving managers. Week 42 batch closed successfully."},
      ],
    },
    {
      ref:"PAYROLL-W41-2025",date:"Oct 11, 2025 · 07:00 AM",status:"In review",
      duration:"31m 05s",desc:"Week 41 payroll — SAP format mismatch escalated",
      stages:["File ingestion","Format normalization","Validation & matching","SAP upload","Approval routing"],
      stageStatus:[true,true,false,false,false],
      summary:{week:"Week 41 / 2025",plants:6,employees:3847,totalFiles:18,unifiedRecords:3621,exceptions:14,grossPayroll:"Pending"},
      plants:[
        {name:"Plant Monterrey",  system:"UKG Kronos",employees:842,records:842,status:"Normalized",issue:null},
        {name:"Plant Guadalajara",system:"SAP HCM",   employees:654,records:0,  status:"Exception", issue:"SAP HCM export format changed — column mapping broken, all records on hold"},
        {name:"Plant Querétaro",  system:"UKG Kronos",employees:723,records:723,status:"Normalized",issue:null},
        {name:"Plant Toluca",     system:"Excel/UKG", employees:512,records:512,status:"Normalized",issue:null},
        {name:"Plant CDMX",       system:"SAP HCM",   employees:698,records:544,status:"Exception", issue:"Same SAP format change — 154 records failed column mapping"},
        {name:"Plant Saltillo",   system:"UKG Kronos",employees:418,records:418,status:"Normalized",issue:null},
      ],
      transactions:[
        {id:"TXN-001",plant:"Plant Guadalajara",empId:"EMP-2201",name:"María López",    type:"Regular",hours:0,overtime:0,gross:"Pending",      status:"Exception",source:"SAP HCM",   issue:"Column 'COST_CTR' renamed to 'KOSTL' in new SAP export — mapping table needs update"},
        {id:"TXN-002",plant:"Plant CDMX",       empId:"EMP-1102",name:"Valentina Cruz", type:"Regular",hours:0,overtime:0,gross:"Pending",      status:"Exception",source:"SAP HCM",   issue:"Same SAP schema change — awaiting IT mapping table update"},
        {id:"TXN-003",plant:"Plant Monterrey",  empId:"EMP-4421",name:"Carlos Mendoza", type:"Regular",hours:40,overtime:0,gross:"$8,200 MXN",  status:"Validated",source:"UKG Kronos",issue:null},
      ],
      chat:[
        {from:"agent",name:"Nina P.",time:"07:00 AM",msg:"Week 41 issue detected immediately: Guadalajara and CDMX SAP HCM exports use a new column schema. Field 'COST_CTR' renamed to 'KOSTL' and 'PERNR' structure changed. This affects 808 records. I've halted processing for those plants and flagged for IT."},
        {from:"user",name:"Shared Services",time:"07:05 AM",msg:"Payroll is due today. Can you process the other plants while IT fixes the mapping?"},
        {from:"agent",name:"Nina P.",time:"07:05 AM",msg:"Yes — Monterrey, Querétaro, Toluca, and Saltillo are processing normally (3,039 records). I'll complete those and hold Guadalajara and CDMX. Generating partial SAP upload for the 4 clean plants now."},
        {from:"user",name:"Shared Services",time:"07:22 AM",msg:"IT says 2 hours to update the mapping. Can we approve the 4 plants now?"},
        {from:"agent",name:"Nina P.",time:"07:22 AM",msg:"Partial approval package sent for Plants Monterrey, Querétaro, Toluca, and Saltillo. Batch W41 flagged as 'In review' pending Guadalajara and CDMX. I'll auto-resume once IT confirms the mapping update."},
      ],
    },
  ],
};

// ─── SHARED HELPERS ───────────────────────────────────────────────────────────
function LiveBadge(props) {
  var label = props.label || "Active";
  return (
    <span style={{display:"inline-flex",alignItems:"center",gap:6,background:"#dcfce7",color:"#166534",borderRadius:10,padding:"3px 10px",fontSize:11,fontWeight:500}}>
      <span style={{position:"relative",display:"inline-flex",width:8,height:8}}>
        <span style={{position:"absolute",inset:0,borderRadius:"50%",background:"#22c55e",animation:"live-ping 1.4s ease-out infinite",opacity:0.6}}></span>
        <span style={{position:"relative",width:8,height:8,borderRadius:"50%",background:"#16a34a",display:"inline-block"}}></span>
      </span>
      {label}
    </span>
  );
}

// ─── NINA PAYROLL VIEWS ───────────────────────────────────────────────────────
function NinaTransactionDetail(props) {
  var txn=props.txn, run=props.run, onBack=props.onBack;
  var c="#0369a1";
  var sBg=txn.status==="Validated"?"#dcfce7":txn.status==="Exception"?"#fee2e2":"#fef3c7";
  var sCol=txn.status==="Validated"?"#166534":txn.status==="Exception"?"#dc2626":"#92400e";
  var steps=[
    {label:"File ingested",detail:"Original "+txn.source+" format received and parsed",done:txn.status!=="Pending"},
    {label:"Format normalized",detail:"Mapped to unified payroll schema (UKG/SAP/Excel to Standard)",done:txn.status==="Validated"||txn.status==="Exception"},
    {label:"Employee matched",detail:"Cross-referenced against SAP master employee data",done:txn.status==="Validated"},
    {label:"Hours validated",detail:"Regular + overtime checked against Kronos clock-in records",done:txn.status==="Validated"},
    {label:"SAP upload ready",detail:"Record formatted for SAP HCM payroll batch upload",done:txn.status==="Validated"},
  ];
  var stepEls=[];
  for (var i=0;i<steps.length;i++) {
    var s=steps[i];
    stepEls.push(
      <div key={i} style={{display:"flex",alignItems:"flex-start",gap:10,marginBottom:10}}>
        <div style={{width:20,height:20,borderRadius:"50%",background:s.done?"#dcfce7":"#f3f4f6",border:"1.5px solid "+(s.done?"#22c55e":"#e5e7eb"),display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:2}}>
          {s.done?<svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>:<div style={{width:6,height:6,borderRadius:"50%",background:"#d1d5db"}}></div>}
        </div>
        <div>
          <div style={{fontSize:12,fontWeight:500,color:s.done?"#111827":"#9ca3af"}}>{s.label}</div>
          <div style={{fontSize:11,color:"#9ca3af"}}>{s.detail}</div>
        </div>
      </div>
    );
  }
  return (
    <div style={{padding:"24px 32px",maxWidth:800,margin:"0 auto"}}>
      <button onClick={onBack} style={{fontSize:12,padding:"6px 12px",borderRadius:6,border:"0.5px solid #e5e7eb",color:"#6b7280",cursor:"pointer",background:"#fff",display:"inline-flex",alignItems:"center",gap:5,marginBottom:20}}>
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M8 10.5L4.5 7 8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        Back to {run.ref}
      </button>
      <div style={{background:"#fff",border:"0.5px solid #e5e7eb",borderRadius:12,overflow:"hidden"}}>
        <div style={{background:c,padding:"20px 24px",display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
          <div>
            <div style={{fontSize:10,color:"rgba(255,255,255,0.6)",letterSpacing:"0.1em",marginBottom:4}}>TRANSACTION DETAIL · {run.ref}</div>
            <div style={{fontSize:20,fontWeight:500,color:"#fff",marginBottom:4}}>{txn.name}</div>
            <div style={{fontSize:12,color:"rgba(255,255,255,0.8)"}}>{txn.empId} · {txn.plant} · {txn.source}</div>
          </div>
          <span style={{background:sBg,color:sCol,borderRadius:6,padding:"4px 12px",fontSize:11,fontWeight:600}}>{txn.status}</span>
        </div>
        <div style={{padding:"24px",display:"flex",flexDirection:"column",gap:16}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12}}>
            {[{label:"Pay Type",val:txn.type},{label:"Regular Hours",val:txn.hours+"h"},{label:"Overtime Hours",val:txn.overtime+"h"},{label:"Gross Pay",val:txn.gross}].map(function(k,i){
              return <div key={i} style={{background:"#f8fafc",borderRadius:8,padding:"14px 16px",borderTop:"3px solid "+c}}>
                <div style={{fontSize:11,color:"#9ca3af",marginBottom:4}}>{k.label}</div>
                <div style={{fontSize:17,fontWeight:600,color:"#111827"}}>{k.val}</div>
              </div>;
            })}
          </div>
          <div style={{background:"#e0f2fe",borderLeft:"3px solid "+c,borderRadius:"0 8px 8px 0",padding:"14px 16px"}}>
            <div style={{fontSize:10,fontWeight:600,color:c,letterSpacing:"0.08em",marginBottom:8}}>SOURCE SYSTEM DETAILS</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px 24px",fontSize:13}}>
              <div><span style={{color:"#6b7280"}}>Source system: </span><span style={{fontWeight:500,color:"#111827"}}>{txn.source}</span></div>
              <div><span style={{color:"#6b7280"}}>Plant: </span><span style={{fontWeight:500,color:"#111827"}}>{txn.plant}</span></div>
              <div><span style={{color:"#6b7280"}}>Employee ID: </span><span style={{fontWeight:500,color:"#111827"}}>{txn.empId}</span></div>
              <div><span style={{color:"#6b7280"}}>Payroll week: </span><span style={{fontWeight:500,color:"#111827"}}>{run.summary.week}</span></div>
            </div>
          </div>
          <div style={{background:"#f9fafb",borderRadius:8,padding:"14px 16px"}}>
            <div style={{fontSize:10,fontWeight:600,color:"#9ca3af",letterSpacing:"0.08em",marginBottom:12}}>NORMALIZATION PIPELINE</div>
            {stepEls}
          </div>
          {txn.issue&&(
            <div style={{background:"#fff7ed",border:"0.5px solid #fed7aa",borderRadius:8,padding:"14px 16px"}}>
              <div style={{fontSize:10,fontWeight:600,color:"#c2410c",letterSpacing:"0.08em",marginBottom:6}}>EXCEPTION DETAIL</div>
              <p style={{margin:"0 0 10px",fontSize:13,color:"#111827"}}>{txn.issue}</p>
              <div style={{fontSize:12,color:"#9c400d",background:"#fef3c7",borderRadius:6,padding:"8px 12px"}}>Action required: Shared Services must correct source data or update the mapping table before this record can be uploaded to SAP.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function NinaRunDetail(props) {
  var run=props.run, onBack=props.onBack;
  var c="#0369a1";
  var stxnS=useState(null); var selTxn=stxnS[0]; var setSelTxn=stxnS[1];
  var msgsS=useState([]); var msgs=msgsS[0]; var setMsgs=msgsS[1];
  var inpS=useState(""); var input=inpS[0]; var setInput=inpS[1];
  if (selTxn) return <NinaTransactionDetail txn={selTxn} run={run} onBack={function(){setSelTxn(null);}} />;
  function sendMsg(){
    if(!input.trim())return;
    var nm=msgs.concat([{from:"user",name:"You",time:"now",msg:input}]);
    setMsgs(nm);setInput("");
    setTimeout(function(){setMsgs(nm.concat([{from:"agent",name:"Nina P.",time:"now",msg:"Thank you. I've noted your instruction and will update payroll batch "+run.ref+" accordingly."}]));},800);
  }
  var allMsgs=run.chat.concat(msgs);
  var stageEls=[];
  for(var si=0;si<run.stages.length;si++){
    var done=run.stageStatus[si],active=!done&&(si===0||run.stageStatus[si-1]);
    var sbg=done?c:active?"#f59e0b":"#e5e7eb",stC=done?c:active?"#92400e":"#9ca3af";
    stageEls.push(
      <div key={si} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",position:"relative"}}>
        {si<run.stages.length-1&&<div style={{position:"absolute",top:16,left:"50%",width:"100%",height:2,background:done?c+"55":"#e5e7eb",zIndex:0}}></div>}
        <div className={active?"thinking-dot":""} style={{width:32,height:32,borderRadius:"50%",background:done?c+"18":active?"#fef3c7":"#f9fafb",border:"2px solid "+sbg,display:"flex",alignItems:"center",justifyContent:"center",position:"relative",zIndex:1,marginBottom:8}}>
          {done?<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7l3 3 5-5" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>:<div style={{width:8,height:8,borderRadius:"50%",background:sbg}}></div>}
        </div>
        <div style={{fontSize:10,fontWeight:500,color:stC,textAlign:"center",maxWidth:90,lineHeight:1.3}}>{run.stages[si]}</div>
      </div>
    );
  }
  function tsc(s){return s==="Validated"?{bg:"#dcfce7",col:"#166534"}:s==="Exception"?{bg:"#fee2e2",col:"#dc2626"}:s==="Pending"?{bg:"#fef3c7",col:"#92400e"}:{bg:"#f3f4f6",col:"#374151"};}
  var txnRows=[];
  for(var ti=0;ti<run.transactions.length;ti++){
    var txn=run.transactions[ti];
    var ts=tsc(txn.status);
    (function(t){
      txnRows.push(
        <tr key={ti} onClick={function(){setSelTxn(t);}} style={{borderBottom:"0.5px solid #f3f4f6",cursor:"pointer"}}
          onMouseEnter={function(e){e.currentTarget.style.background="#f8fafc";}}
          onMouseLeave={function(e){e.currentTarget.style.background="transparent";}}>
          <td style={{padding:"10px 12px",color:c,fontWeight:500,fontSize:11}}>{t.id}</td>
          <td style={{padding:"10px 12px"}}><div style={{fontWeight:500,color:"#111827"}}>{t.name}</div><div style={{fontSize:10,color:"#9ca3af"}}>{t.empId}</div></td>
          <td style={{padding:"10px 12px",color:"#374151",fontSize:11}}>{t.plant}</td>
          <td style={{padding:"10px 12px"}}><span style={{background:"#f1f5f9",color:"#475569",borderRadius:5,padding:"2px 7px",fontSize:10,fontWeight:500}}>{t.source}</span></td>
          <td style={{padding:"10px 12px",color:"#374151"}}>{t.type}</td>
          <td style={{padding:"10px 12px",color:"#374151"}}>{t.hours}h</td>
          <td style={{padding:"10px 12px",color:t.overtime>0?"#7c3aed":"#9ca3af",fontWeight:t.overtime>0?600:400}}>{t.overtime>0?"+"+t.overtime+"h":"—"}</td>
          <td style={{padding:"10px 12px",fontWeight:500,color:"#111827"}}>{t.gross}</td>
          <td style={{padding:"10px 12px"}}>
            <div style={{display:"flex",alignItems:"center",gap:6}}>
              <span style={{background:ts.bg,color:ts.col,borderRadius:10,padding:"3px 9px",fontSize:11,fontWeight:500}}>{t.status}</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4 2l4 4-4 4" stroke={c} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </td>
        </tr>
      );
    })(txn);
  }
  var plantRows=[];
  for(var pi=0;pi<run.plants.length;pi++){
    var pl=run.plants[pi];
    var psc=pl.status==="Normalized"?{bg:"#dcfce7",col:"#166534"}:pl.status==="Exception"?{bg:"#fee2e2",col:"#dc2626"}:{bg:"#fef3c7",col:"#92400e"};
    plantRows.push(
      <tr key={pi} style={{borderBottom:"0.5px solid #f3f4f6"}}>
        <td style={{padding:"11px 12px",fontWeight:500,color:"#111827"}}>{pl.name}</td>
        <td style={{padding:"11px 12px"}}><span style={{background:"#f1f5f9",color:"#475569",borderRadius:5,padding:"2px 8px",fontSize:11,fontWeight:500}}>{pl.system}</span></td>
        <td style={{padding:"11px 12px",color:"#374151"}}>{pl.employees.toLocaleString()}</td>
        <td style={{padding:"11px 12px",color:"#374151"}}>{pl.records.toLocaleString()}</td>
        <td style={{padding:"11px 12px"}}><span style={{background:psc.bg,color:psc.col,borderRadius:10,padding:"3px 10px",fontSize:11,fontWeight:500}}>{pl.status}</span></td>
        <td style={{padding:"11px 12px",color:pl.issue?"#c2410c":"#9ca3af",fontSize:11}}>{pl.issue||"—"}</td>
      </tr>
    );
  }
  var msgEls=[];
  for(var mi=0;mi<allMsgs.length;mi++){
    var m=allMsgs[mi],isAg=m.from==="agent";
    msgEls.push(
      <div key={mi} style={{display:"flex",flexDirection:isAg?"row":"row-reverse",gap:10,alignItems:"flex-end"}}>
        <div style={{width:30,height:30,borderRadius:"50%",background:isAg?c:"#6b7280",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
          <span style={{fontSize:10,fontWeight:600,color:"#fff"}}>{isAg?"NP":"U"}</span>
        </div>
        <div style={{maxWidth:"70%"}}>
          <div style={{fontSize:10,color:"#9ca3af",marginBottom:3,textAlign:isAg?"left":"right"}}>{m.name} · {m.time}</div>
          <div style={{background:isAg?"#e0f2fe":"#f3f4f6",borderRadius:isAg?"0 10px 10px 10px":"10px 0 10px 10px",padding:"10px 14px",fontSize:13,color:"#111827",lineHeight:1.5}}>{m.msg}</div>
        </div>
      </div>
    );
  }
  return (
    <div style={{padding:"0 32px 32px",maxWidth:1100,margin:"0 auto"}}>
      <button onClick={onBack} style={{fontSize:12,padding:"6px 12px",borderRadius:6,border:"0.5px solid #e5e7eb",color:"#6b7280",cursor:"pointer",background:"#fff",display:"inline-flex",alignItems:"center",gap:5,margin:"20px 0 16px"}}>
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M8 10.5L4.5 7 8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        Back to Nina P.
      </button>
      <div style={{background:c,borderRadius:12,padding:"20px 24px",marginBottom:16,display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
        <div>
          <div style={{fontSize:10,color:"rgba(255,255,255,0.6)",letterSpacing:"0.1em",marginBottom:4}}>PAYROLL BATCH · {run.summary.week}</div>
          <div style={{fontSize:22,fontWeight:500,color:"#fff",marginBottom:4}}>{run.ref}</div>
          <div style={{fontSize:12,color:"rgba(255,255,255,0.75)"}}>{run.date} · {run.duration}</div>
        </div>
        <div style={{textAlign:"right"}}>
          <div style={{fontSize:22,fontWeight:700,color:"#fff"}}>{run.summary.grossPayroll}</div>
          <div style={{fontSize:11,color:"rgba(255,255,255,0.7)",marginTop:2}}>Gross payroll</div>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:12,marginBottom:16}}>
        {[{label:"Plants",val:run.summary.plants},{label:"Total employees",val:run.summary.employees.toLocaleString()},{label:"Files received",val:run.summary.totalFiles},{label:"Unified records",val:run.summary.unifiedRecords.toLocaleString()},{label:"Exceptions",val:run.summary.exceptions,warn:run.summary.exceptions>0}].map(function(k,i){
          return <div key={i} style={{background:"#fff",border:"0.5px solid #e5e7eb",borderRadius:10,padding:"14px 16px",borderTop:"3px solid "+(k.warn?"#ef4444":c)}}>
            <div style={{fontSize:11,color:"#9ca3af",marginBottom:4}}>{k.label}</div>
            <div style={{fontSize:22,fontWeight:600,color:k.warn?"#dc2626":c}}>{k.val}</div>
          </div>;
        })}
      </div>
      <div style={{background:"#fff",border:"0.5px solid #e5e7eb",borderRadius:10,padding:"18px 20px",marginBottom:16}}>
        <div style={{fontSize:13,fontWeight:500,color:"#111827",marginBottom:20}}>Processing pipeline</div>
        <div style={{display:"flex",alignItems:"flex-start",padding:"0 24px"}}>{stageEls}</div>
      </div>
      <div style={{background:"#fff",border:"0.5px solid #e5e7eb",borderRadius:10,padding:"18px 20px",marginBottom:16}}>
        <div style={{fontSize:13,fontWeight:500,color:"#111827",marginBottom:14}}>Plant file status</div>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
          <thead><tr style={{borderBottom:"0.5px solid #e5e7eb"}}>{["Plant","Source system","Employees","Records processed","Status","Notes"].map(function(h){return <th key={h} style={{padding:"8px 12px",textAlign:"left",fontSize:11,fontWeight:500,color:"#9ca3af"}}>{h}</th>;})}</tr></thead>
          <tbody>{plantRows}</tbody>
        </table>
      </div>
      <div style={{background:"#fff",border:"0.5px solid #e5e7eb",borderRadius:10,padding:"18px 20px",marginBottom:16}}>
        <div style={{fontSize:13,fontWeight:500,color:"#111827",marginBottom:4}}>Individual transactions</div>
        <div style={{fontSize:11,color:"#9ca3af",marginBottom:14}}>Click any row to view full transaction detail and normalization trace</div>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
          <thead><tr style={{borderBottom:"0.5px solid #e5e7eb"}}>{["ID","Employee","Plant","Source","Type","Hours","OT","Gross","Status"].map(function(h){return <th key={h} style={{padding:"8px 12px",textAlign:"left",fontSize:11,fontWeight:500,color:"#9ca3af"}}>{h}</th>;})}</tr></thead>
          <tbody>{txnRows}</tbody>
        </table>
      </div>
      <div style={{background:"#fff",border:"0.5px solid #e5e7eb",borderRadius:10,overflow:"hidden"}}>
        <div style={{padding:"14px 20px",borderBottom:"0.5px solid #e5e7eb"}}>
          <div style={{fontSize:13,fontWeight:500,color:"#111827"}}>Conversation</div>
          <div style={{fontSize:11,color:"#9ca3af"}}>Between Nina P. (AI agent) and Shared Services team</div>
        </div>
        <div style={{padding:"16px 20px",display:"flex",flexDirection:"column",gap:14,minHeight:200}}>{msgEls}</div>
        <div style={{padding:"12px 16px",borderTop:"0.5px solid #e5e7eb",display:"flex",gap:8}}>
          <input value={input} onChange={function(e){setInput(e.target.value);}} onKeyDown={function(e){if(e.key==="Enter")sendMsg();}} placeholder="Message Nina P...." style={{flex:1,fontSize:13,padding:"8px 12px",borderRadius:8,border:"0.5px solid #d1d5db",background:"#f9fafb",color:"#111827",outline:"none"}}/>
          <button onClick={sendMsg} style={{padding:"8px 16px",borderRadius:8,background:c,border:"none",cursor:"pointer",color:"#fff",fontSize:12,fontWeight:500}}>Send</button>
        </div>
      </div>
    </div>
  );
}

function NinaPayrollDashboard(props) {
  var onBack=props.onBack;
  var c="#0369a1";
  var ag=ninaPayrollAgent;
  var selRunS=useState(null); var selRun=selRunS[0]; var setSelRun=selRunS[1];
  var epS=useState({}); var excPageMap=epS[0]; var setExcPageMap=epS[1];
  var curPage=excPageMap.nina||0, perPage=3, total=Math.ceil(ag.exceptions.length/perPage);
  var excSlice=ag.exceptions.slice(curPage*perPage,(curPage+1)*perPage);
  if(selRun) return <NinaRunDetail run={selRun} onBack={function(){setSelRun(null);}} />;
  var stages=["File ingestion","Format normalization","Validation & matching","SAP upload","Approval routing"];
  var stageCounts=[6,5,4,3,1];
  function bsc(s){return s==="Successful"?{bg:"#dcfce7",col:"#166534"}:s==="In progress"?{bg:"#dbeafe",col:"#1e40af"}:s==="In review"?{bg:"#fef3c7",col:"#92400e"}:{bg:"#f3f4f6",col:"#374151"};}
  var stageEls=[];
  for(var si=0;si<stages.length;si++){
    var conn=si<stages.length-1?<div style={{position:"absolute",top:9,left:"50%",width:"100%",height:2,background:si<3?c+"55":"#e5e7eb",zIndex:0}}></div>:null;
    stageEls.push(<div key={si} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",position:"relative"}}>{conn}<div style={{width:20,height:20,borderRadius:"50%",background:si<4?c:c+"44",border:"2px solid #fff",position:"relative",zIndex:1,marginBottom:8}}></div><div style={{fontSize:10,fontWeight:500,color:c,textAlign:"center",maxWidth:90,lineHeight:1.3}}>{stages[si]}</div><div style={{fontSize:10,color:"#9ca3af",marginTop:2}}>{stageCounts[si]}</div></div>);
  }
  var excEls=[];
  for(var ei=0;ei<excSlice.length;ei++){
    var ex=excSlice[ei];
    excEls.push(<div key={ei} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 12px",background:"#f9fafb",borderRadius:8,marginBottom:8}}><div style={{width:8,height:8,borderRadius:"50%",background:ex.severity==="high"?"#ef4444":"#f59e0b",flexShrink:0}}></div><div style={{flex:1,minWidth:0}}><div style={{fontSize:11,fontWeight:500,color:"#111827",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{ex.type}</div><div style={{fontSize:10,color:"#9ca3af"}}>{ex.ref}</div></div></div>);
  }
  var runRows=[];
  for(var ri=0;ri<ag.runs.length;ri++){
    var r=ag.runs[ri];
    var sc=bsc(r.status);
    (function(row){
      runRows.push(<tr key={ri} onClick={function(){setSelRun(row);}} style={{borderBottom:"0.5px solid #f3f4f6",cursor:"pointer"}} onMouseEnter={function(e){e.currentTarget.style.background="#f8fafc";}} onMouseLeave={function(e){e.currentTarget.style.background="transparent;";}}>
        <td style={{padding:"12px",color:c,fontWeight:600}}>{row.ref}</td>
        <td style={{padding:"12px",color:"#6b7280",whiteSpace:"nowrap",fontSize:11}}>{row.date}</td>
        <td style={{padding:"12px"}}><span style={{background:sc.bg,color:sc.col,borderRadius:10,padding:"3px 10px",fontSize:11,fontWeight:500}}>{row.status}</span></td>
        <td style={{padding:"12px",color:"#6b7280"}}>{row.duration}</td>
        <td style={{padding:"12px",color:"#374151"}}>{row.summary.plants}</td>
        <td style={{padding:"12px",color:"#374151"}}>{row.summary.unifiedRecords.toLocaleString()}</td>
        <td style={{padding:"12px",fontWeight:500,color:"#111827"}}>{row.summary.grossPayroll}</td>
        <td style={{padding:"12px"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <span style={{color:row.summary.exceptions>0?"#dc2626":"#16a34a",fontWeight:600}}>{row.summary.exceptions}</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4 2l4 4-4 4" stroke={c} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </td>
      </tr>);
    })(r);
  }
  return (
    <div style={{padding:"0 32px 32px",maxWidth:1100,margin:"0 auto"}}>
      <div style={{padding:"20px 0 16px"}}>
        <button onClick={onBack} style={{fontSize:12,padding:"6px 12px",borderRadius:6,border:"0.5px solid #e5e7eb",color:"#6b7280",cursor:"pointer",background:"#fff",display:"inline-flex",alignItems:"center",gap:5,marginBottom:14}}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M8 10.5L4.5 7 8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Back to Dashboard
        </button>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:48,height:48,borderRadius:"50%",background:c,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <span style={{fontSize:15,fontWeight:700,color:"#fff"}}>NP</span>
          </div>
          <div>
            <div style={{fontSize:22,fontWeight:600,color:"#111827"}}>Nina P.</div>
            <div style={{fontSize:13,color:c}}>Payroll Unification &amp; Processing · UKG Kronos / SAP HCM / Excel</div>
          </div>
          <LiveBadge label="Active"/>
          <span style={{background:"#e0f2fe",color:c,borderRadius:6,padding:"3px 10px",fontSize:11,border:"0.5px solid #7dd3fc"}}>H2R</span>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:20}}>
        {ag.stats.map(function(s,i){return <div key={i} style={{background:"#fff",border:"0.5px solid #e5e7eb",borderRadius:10,padding:"16px",borderTop:"3px solid "+c}}><div style={{fontSize:11,color:"#9ca3af",marginBottom:4}}>{s.label}</div><div style={{fontSize:22,fontWeight:600,color:c}}>{s.val}</div></div>;})}
      </div>
      <div style={{background:"#fff",border:"0.5px solid #e5e7eb",borderRadius:10,padding:"16px 20px",marginBottom:16,display:"flex",alignItems:"center",flexWrap:"wrap",gap:12}}>
        <div style={{fontSize:11,fontWeight:600,color:"#9ca3af",letterSpacing:"0.06em",marginRight:4}}>INTEGRATED SYSTEMS</div>
        {[{name:"UKG Kronos",color:"#7c3aed",desc:"Clock-in/out, scheduling"},{name:"SAP HCM",color:"#0369a1",desc:"Master data, payroll upload"},{name:"Excel / UKG",color:"#16a34a",desc:"Plant manual exports"},{name:"SAP FI",color:"#b45309",desc:"Cost center validation"}].map(function(sys,i){
          return <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 14px",background:sys.color+"11",borderRadius:8,border:"0.5px solid "+sys.color+"33"}}>
            <div style={{width:8,height:8,borderRadius:"50%",background:sys.color}}></div>
            <div>
              <div style={{fontSize:12,fontWeight:600,color:sys.color}}>{sys.name}</div>
              <div style={{fontSize:10,color:"#9ca3af"}}>{sys.desc}</div>
            </div>
          </div>;
        })}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 320px",gap:16,marginBottom:16}}>
        <div style={{background:"#fff",border:"0.5px solid #e5e7eb",borderRadius:10,padding:"18px 20px"}}>
          <div style={{fontSize:13,fontWeight:500,color:"#111827",marginBottom:4}}>Processing pipeline</div>
          <div style={{fontSize:11,color:"#9ca3af",marginBottom:24}}>Current batch stage distribution</div>
          <div style={{display:"flex",alignItems:"flex-start",padding:"0 10px"}}>{stageEls}</div>
        </div>
        <div style={{background:"#fff",border:"0.5px solid #e5e7eb",borderRadius:10,padding:"18px 20px"}}>
          <div style={{fontSize:13,fontWeight:500,color:"#111827",marginBottom:4}}>Recent exceptions</div>
          <div style={{fontSize:11,color:"#9ca3af",marginBottom:14}}>Pending human review</div>
          {excEls}
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:8}}>
            <span style={{fontSize:11,color:"#9ca3af"}}>Page {curPage+1} of {total}</span>
            <div style={{display:"flex",gap:4}}>
              <button onClick={function(){setExcPageMap(function(p){var n=Object.assign({},p);n.nina=Math.max(0,curPage-1);return n;});}} disabled={curPage===0} style={{fontSize:11,padding:"3px 10px",borderRadius:5,border:"0.5px solid #e5e7eb",background:curPage===0?"#f9fafb":"#fff",color:curPage===0?"#d1d5db":c,cursor:curPage===0?"default":"pointer"}}>Prev</button>
              <button onClick={function(){setExcPageMap(function(p){var n=Object.assign({},p);n.nina=Math.min(total-1,curPage+1);return n;});}} disabled={curPage===total-1} style={{fontSize:11,padding:"3px 10px",borderRadius:5,border:"0.5px solid #e5e7eb",background:curPage===total-1?"#f9fafb":"#fff",color:curPage===total-1?"#d1d5db":c,cursor:curPage===total-1?"default":"pointer"}}>Next</button>
            </div>
          </div>
        </div>
      </div>
      <div style={{background:"#fff",border:"0.5px solid #e5e7eb",borderRadius:10,padding:"18px 20px"}}>
        <div style={{fontSize:13,fontWeight:500,color:"#111827",marginBottom:4}}>Payroll batch history</div>
        <div style={{fontSize:11,color:"#9ca3af",marginBottom:16}}>Click any row to view full batch detail, plant breakdown, and individual transactions</div>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
          <thead><tr style={{borderBottom:"0.5px solid #e5e7eb"}}>{["Batch ref","Date","Status","Duration","Plants","Records","Gross payroll","Exceptions"].map(function(h){return <th key={h} style={{padding:"8px 12px",textAlign:"left",fontSize:11,fontWeight:500,color:"#9ca3af"}}>{h}</th>;})}</tr></thead>
          <tbody>{runRows}</tbody>
        </table>
      </div>
    </div>
  );
}

// ─── CATALOG COMPONENTS ───────────────────────────────────────────────────────
function AgentDetail(props) {
  var a=props.agent,area=props.area,onBack=props.onBack,onHome=props.onHome,t=props.t;
  var c=area.color;
  function Row(rp){
    var rows=[];
    for(var i=0;i<rp.items.length;i++) rows.push(<div key={i} style={{display:"flex",gap:8,marginBottom:5,alignItems:"flex-start"}}><span style={{color:c,fontSize:12,flexShrink:0,marginTop:2}}>›</span><span style={{fontSize:13,color:"#111827",lineHeight:1.5}}>{rp.items[i]}</span></div>);
    return <div style={{background:"#f9fafb",borderRadius:8,padding:"14px 16px"}}><div style={{fontSize:10,fontWeight:500,color:"#9ca3af",letterSpacing:"0.08em",marginBottom:8}}>{rp.label}</div>{rows}</div>;
  }
  var userRows=[],capRows=[],limRows=[];
  for(var ui=0;ui<a.users.length;ui++) userRows.push(<div key={ui} style={{display:"flex",gap:8,marginBottom:5,alignItems:"flex-start"}}><span style={{color:c,fontSize:12,flexShrink:0,marginTop:2}}>›</span><span style={{fontSize:13,color:"#111827",lineHeight:1.5}}>{a.users[ui]}</span></div>);
  for(var ci=0;ci<a.capabilities.length;ci++) capRows.push(<div key={ci} style={{display:"flex",gap:8,marginBottom:5,alignItems:"flex-start"}}><span style={{color:c,fontSize:12,flexShrink:0,marginTop:2}}>›</span><span style={{fontSize:13,color:"#111827",lineHeight:1.5}}>{a.capabilities[ci]}</span></div>);
  for(var li=0;li<a.limits.length;li++) limRows.push(<div key={li} style={{display:"flex",gap:8,marginBottom:5,alignItems:"flex-start"}}><span style={{color:"#c2410c",fontSize:12,flexShrink:0,marginTop:2}}>›</span><span style={{fontSize:13,color:"#111827",lineHeight:1.5}}>{a.limits[li]}</span></div>);
  return (
    <div style={{padding:"24px 28px",maxWidth:860,margin:"0 auto"}}>
      <div style={{background:"#fff",border:"0.5px solid #e5e7eb",borderRadius:12,overflow:"hidden"}}>
        <div style={{background:c,padding:"22px 26px",display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:16}}>
          <div>
            <div style={{fontSize:10,color:"rgba(255,255,255,0.6)",fontWeight:500,letterSpacing:"0.1em",marginBottom:4}}>{area.label} · {area.full.toUpperCase()} · {t.capabilitySheet}</div>
            <div style={{fontSize:22,fontWeight:500,color:"#fff",marginBottom:4}}>{a.module}</div>
            <div style={{fontSize:12,color:"rgba(255,255,255,0.75)"}}>{t.agentLabel}: <strong style={{color:"#fff"}}>{a.name}</strong> · {t.trigger}: {a.trigger}</div>
          </div>
          <span style={{background:"rgba(255,255,255,0.2)",color:"#fff",borderRadius:6,padding:"4px 12px",fontSize:11,fontWeight:500,flexShrink:0}}>{t.productionReady}</span>
        </div>
        <div style={{padding:"22px 26px",display:"flex",flexDirection:"column",gap:14}}>
          <div style={{background:area.light,borderLeft:"3px solid "+c,borderRadius:"0 8px 8px 0",padding:"14px 16px"}}>
            <div style={{fontSize:10,fontWeight:500,color:c,letterSpacing:"0.08em",marginBottom:6}}>{t.whatItDoes}</div>
            <p style={{margin:0,fontSize:13,color:"#111827",lineHeight:1.65}}>{a.what}</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
            <div style={{background:area.light,borderRadius:8,padding:"14px 16px"}}>
              <div style={{fontSize:10,fontWeight:500,color:c,letterSpacing:"0.08em",marginBottom:6}}>{t.businessProblem}</div>
              <p style={{margin:0,fontSize:13,color:"#111827",lineHeight:1.65}}>{a.problem}</p>
            </div>
            <div style={{background:area.light,borderRadius:8,padding:"14px 16px"}}>
              <div style={{fontSize:10,fontWeight:500,color:c,letterSpacing:"0.08em",marginBottom:8}}>{t.idealUser}</div>
              {userRows}
            </div>
          </div>
          <div style={{background:"#f9fafb",borderRadius:8,padding:"14px 16px"}}>
            <div style={{fontSize:10,fontWeight:500,color:"#9ca3af",letterSpacing:"0.08em",marginBottom:8}}>{t.keyFeatures}</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4px 24px"}}>{capRows}</div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
            <Row label={t.inputsRequired} items={a.inputs}/>
            <Row label={t.outputsDeliverables} items={a.outputs}/>
          </div>
          <div style={{background:"#f0fdf4",border:"0.5px solid #bbf7d0",borderRadius:8,padding:"14px 16px"}}>
            <div style={{fontSize:10,fontWeight:500,color:"#16a34a",letterSpacing:"0.08em",marginBottom:6}}>{t.maturityReadiness}</div>
            <p style={{margin:0,fontSize:13,color:"#111827",lineHeight:1.65}}>{a.maturity}</p>
          </div>
          <div style={{background:"#fff7ed",border:"0.5px solid #fed7aa",borderRadius:8,padding:"14px 16px"}}>
            <div style={{fontSize:10,fontWeight:500,color:"#c2410c",letterSpacing:"0.08em",marginBottom:8}}>{t.limitations}</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4px 24px"}}>{limRows}</div>
          </div>
          <div style={{display:"flex",gap:8,paddingTop:4}}>
            <button onClick={onBack} style={{fontSize:12,padding:"7px 16px",borderRadius:6,border:"0.5px solid "+area.border,color:c,cursor:"pointer",background:"#fff"}}>{t.backTo} {area.label} {t.agents}</button>
            <button onClick={onHome} style={{fontSize:12,padding:"7px 16px",borderRadius:6,border:"0.5px solid #e5e7eb",color:"#6b7280",cursor:"pointer",background:"#fff"}}>{t.home}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function RunDetail(props) {
  var run=props.run,ag=props.agent,onBack=props.onBack,t=props.t;
  var c=ag.color;
  var msgsS=useState([]); var msgs=msgsS[0]; var setMsgs=msgsS[1];
  var inpS=useState(""); var input=inpS[0]; var setInput=inpS[1];
  function sendMsg(){
    if(!input.trim())return;
    var nm=msgs.concat([{from:"user",name:"You",time:"now",msg:input}]);
    setMsgs(nm);setInput("");
    setTimeout(function(){setMsgs(nm.concat([{from:"agent",name:ag.name,time:"now",msg:t.agentReply(run.ref)}]));},800);
  }
  var allMsgs=run.chat.concat(msgs);
  var stageEls=[];
  for(var si=0;si<run.stages.length;si++){
    var done=run.stageStatus[si],active=!done&&(si===0||run.stageStatus[si-1]);
    var sbg=done?c:active?"#f59e0b":"#e5e7eb",stC=done?c:active?"#92400e":"#9ca3af";
    stageEls.push(<div key={si} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",position:"relative"}}>
      {si<run.stages.length-1&&<div style={{position:"absolute",top:16,left:"50%",width:"100%",height:2,background:done?c+"55":"#e5e7eb",zIndex:0}}></div>}
      <div className={active?"thinking-dot":""} style={{width:32,height:32,borderRadius:"50%",background:done?c+"18":active?"#fef3c7":"#f9fafb",border:"2px solid "+sbg,display:"flex",alignItems:"center",justifyContent:"center",position:"relative",zIndex:1,marginBottom:8}}>
        {done?<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7l3 3 5-5" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>:<div style={{width:8,height:8,borderRadius:"50%",background:sbg}}></div>}
      </div>
      <div style={{fontSize:11,fontWeight:500,color:stC,textAlign:"center",maxWidth:100}}>{run.stages[si]}</div>
    </div>);
  }
  var msgEls=[];
  for(var mi=0;mi<allMsgs.length;mi++){
    var m=allMsgs[mi],isAg=m.from==="agent";
    msgEls.push(<div key={mi} style={{display:"flex",flexDirection:isAg?"row":"row-reverse",gap:10,alignItems:"flex-end"}}>
      <div style={{width:30,height:30,borderRadius:"50%",background:isAg?c:"#6b7280",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
        <span style={{fontSize:11,fontWeight:500,color:"#fff"}}>{isAg?ag.initials:"U"}</span>
      </div>
      <div style={{maxWidth:"68%"}}>
        <div style={{fontSize:10,color:"#9ca3af",marginBottom:3,textAlign:isAg?"left":"right"}}>{m.name} · {m.time}</div>
        <div style={{background:isAg?ag.light:"#f3f4f6",borderRadius:isAg?"0 10px 10px 10px":"10px 0 10px 10px",padding:"10px 14px",fontSize:13,color:"#111827",lineHeight:1.5}}>{m.msg}</div>
      </div>
    </div>);
  }
  return (
    <div style={{padding:"0 32px 32px",maxWidth:960,margin:"0 auto"}}>
      <div style={{display:"flex",alignItems:"center",gap:10,padding:"20px 0 16px"}}>
        <button onClick={onBack} style={{fontSize:12,padding:"6px 12px",borderRadius:6,border:"0.5px solid #e5e7eb",color:"#6b7280",cursor:"pointer",background:"#fff",display:"flex",alignItems:"center",gap:5}}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M8 10.5L4.5 7 8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          {t.backTo} {ag.name}
        </button>
        <span style={{fontSize:11,color:"#9ca3af"}}>›</span>
        <span style={{fontSize:12,color:c,fontWeight:500}}>{run.ref}</span>
        <span style={{fontSize:11,color:"#9ca3af"}}>· {run.desc}</span>
      </div>
      <div style={{background:"#fff",border:"0.5px solid #e5e7eb",borderRadius:10,padding:"18px 20px",marginBottom:16}}>
        <div style={{fontSize:13,fontWeight:500,color:"#111827",marginBottom:14}}>{t.transactionDetails}</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"10px 24px"}}>
          {run.details.map(function(d,i){return <div key={i}><div style={{fontSize:11,color:"#9ca3af",marginBottom:2}}>{d.label}</div><div style={{fontSize:13,color:"#111827",fontWeight:500}}>{d.val}</div></div>;})}
        </div>
      </div>
      <div style={{background:"#fff",border:"0.5px solid #e5e7eb",borderRadius:10,padding:"18px 20px",marginBottom:16}}>
        <div style={{fontSize:13,fontWeight:500,color:"#111827",marginBottom:20}}>{t.processingTimeline}</div>
        <div style={{display:"flex",alignItems:"flex-start",padding:"0 20px"}}>{stageEls}</div>
      </div>
      <div style={{background:"#fff",border:"0.5px solid #e5e7eb",borderRadius:10,overflow:"hidden"}}>
        <div style={{padding:"14px 20px",borderBottom:"0.5px solid #e5e7eb"}}>
          <div style={{fontSize:13,fontWeight:500,color:"#111827"}}>{t.conversation}</div>
          <div style={{fontSize:11,color:"#9ca3af"}}>{t.conversationSub(ag.name)}</div>
        </div>
        <div style={{padding:"16px 20px",display:"flex",flexDirection:"column",gap:14,minHeight:240}}>{msgEls}</div>
        <div style={{padding:"12px 16px",borderTop:"0.5px solid #e5e7eb",display:"flex",gap:8}}>
          <input value={input} onChange={function(e){setInput(e.target.value);}} onKeyDown={function(e){if(e.key==="Enter")sendMsg();}} placeholder={t.messagePlaceholder(ag.name)} style={{flex:1,fontSize:13,padding:"8px 12px",borderRadius:8,border:"0.5px solid #d1d5db",background:"#f9fafb",color:"#111827",outline:"none"}}/>
          <button onClick={sendMsg} style={{padding:"8px 16px",borderRadius:8,background:c,border:"none",cursor:"pointer",color:"#fff",fontSize:12,fontWeight:500}}>{t.send}</button>
        </div>
      </div>
    </div>
  );
}

function AgentMonitor(props) {
  var ag=props.agent,onBack=props.onBack,exceptionPages=props.exceptionPages,setExceptionPages=props.setExceptionPages,t=props.t;
  var c=ag.color;
  var selS=useState(null); var selectedRun=selS[0]; var setSelectedRun=selS[1];
  var langKey=t===T.es?"es":"en";
  var runHistory=(T[langKey].runData[ag.name]||{}).runs||[];
  var allExceptions=T[langKey].exceptions[ag.name]||[];
  var excPageSize=3,excPage=exceptionPages[ag.name]||0;
  var excTotalPages=Math.ceil(allExceptions.length/excPageSize);
  var exceptions=allExceptions.slice(excPage*excPageSize,(excPage+1)*excPageSize);
  var stages=runHistory[0]?runHistory[0].stages:[];
  var stageCounts=[4,3,2,3];
  function statusColor(s){return s==="Successful"||s==="Completed"?{bg:"#dcfce7",color:"#166534"}:s==="In progress"?{bg:"#dbeafe",color:"#1e40af"}:s==="In review"?{bg:"#fef3c7",color:"#92400e"}:{bg:"#f3f4f6",color:"#374151"};}
  function prevPage(){setExceptionPages(function(p){var n=Object.assign({},p);n[ag.name]=Math.max(0,excPage-1);return n;});}
  function nextPage(){setExceptionPages(function(p){var n=Object.assign({},p);n[ag.name]=Math.min(excTotalPages-1,excPage+1);return n;});}
  if(selectedRun) return <RunDetail run={selectedRun} agent={ag} onBack={function(){setSelectedRun(null);}} t={t}/>;
  var stageEls=[];
  for(var si=0;si<stages.length;si++){
    var conn=si<stages.length-1?<div style={{position:"absolute",top:8,left:"50%",width:"100%",height:2,background:si<2?c+"55":"#e5e7eb",zIndex:0}}></div>:null;
    stageEls.push(<div key={si} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",position:"relative"}}>{conn}<div style={{width:18,height:18,borderRadius:"50%",background:si<3?c:c+"44",border:"2px solid #fff",position:"relative",zIndex:1,marginBottom:8}}></div><div style={{fontSize:11,fontWeight:500,color:c,textAlign:"center",maxWidth:90}}>{stages[si]}</div><div style={{fontSize:11,color:"#9ca3af",marginTop:2}}>{stageCounts[si]} {t.requests}</div></div>);
  }
  var excEls=[];
  for(var ei=0;ei<exceptions.length;ei++){
    var ex=exceptions[ei];
    excEls.push(<div key={ei} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",background:"#f9fafb",borderRadius:8,marginBottom:8}}><div style={{width:8,height:8,borderRadius:"50%",background:ex.severity==="high"?"#ef4444":"#f59e0b",flexShrink:0}}></div><div style={{flex:1}}><div style={{fontSize:12,fontWeight:500,color:"#111827"}}>{ex.type}</div><div style={{fontSize:11,color:"#9ca3af"}}>{ex.ref}</div></div><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 3l4 4-4 4" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div>);
  }
  var runRows=[];
  for(var ri=0;ri<runHistory.length;ri++){
    var r=runHistory[ri];
    var sc=statusColor(r.status),ds=t.statusLabels[r.status]||r.status;
    (function(row){
      runRows.push(<tr key={ri} onClick={function(){setSelectedRun(row);}} style={{borderBottom:"0.5px solid #e5e7eb",cursor:"pointer"}} onMouseEnter={function(e){e.currentTarget.style.background="#f9fafb";}} onMouseLeave={function(e){e.currentTarget.style.background="transparent";}}>
        <td style={{padding:"12px",color:"#6b7280",whiteSpace:"nowrap"}}>{row.date}</td>
        <td style={{padding:"12px"}}><span style={{background:sc.bg,color:sc.color,borderRadius:10,padding:"3px 10px",fontSize:11,fontWeight:500}}>{ds}</span></td>
        <td style={{padding:"12px",color:"#6b7280"}}>{row.duration}</td>
        <td style={{padding:"12px",color:"#111827"}}>{row.desc}</td>
        <td style={{padding:"12px"}}><div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}><span style={{color:c,fontWeight:500}}>{row.ref}</span><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M4.5 2.5L8 6.5 4.5 10.5" stroke={c} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg></div></td>
      </tr>);
    })(r);
  }
  var thCells=[t.executionStart,t.status,t.duration,t.description,t.reference].map(function(h){return <th key={h} style={{padding:"8px 12px",textAlign:"left",fontSize:11,fontWeight:500,color:"#9ca3af",letterSpacing:"0.05em"}}>{h}</th>;});
  return (
    <div style={{padding:"0 32px 32px",maxWidth:960,margin:"0 auto"}}>
      <div style={{padding:"20px 0 16px"}}>
        <button onClick={onBack} style={{fontSize:12,padding:"6px 12px",borderRadius:6,border:"0.5px solid #e5e7eb",color:"#6b7280",cursor:"pointer",background:"#fff",display:"inline-flex",alignItems:"center",gap:5,marginBottom:14}}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M8 10.5L4.5 7 8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          {t.backToPlatform}
        </button>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:44,height:44,borderRadius:"50%",background:c,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><span style={{fontSize:14,fontWeight:500,color:"#fff"}}>{ag.initials}</span></div>
          <div><div style={{fontSize:20,fontWeight:500,color:"#111827"}}>{ag.name}</div><div style={{fontSize:12,color:c}}>{ag.role}</div></div>
          <LiveBadge label={t.active}/>
          <span style={{background:ag.light,color:c,borderRadius:6,padding:"3px 9px",fontSize:11,border:"0.5px solid "+ag.border}}>{ag.area}</span>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,minmax(0,1fr))",gap:12,marginBottom:20}}>
        {ag.stats.map(function(s,i){return <div key={i} style={{background:"#fff",border:"0.5px solid #e5e7eb",borderRadius:10,padding:"16px",borderTop:"3px solid "+c}}><div style={{fontSize:11,color:"#9ca3af",marginBottom:4}}>{s.label}</div><div style={{fontSize:22,fontWeight:500,color:c}}>{s.val}</div></div>;})}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 320px",gap:16,marginBottom:20}}>
        <div style={{background:"#fff",border:"0.5px solid #e5e7eb",borderRadius:10,padding:"18px 20px"}}>
          <div style={{fontSize:13,fontWeight:500,color:"#111827",marginBottom:4}}>{t.processOverview}</div>
          <div style={{fontSize:11,color:"#9ca3af",marginBottom:24}}>{t.processOverviewSub}</div>
          <div style={{display:"flex",alignItems:"flex-start",padding:"0 10px"}}>{stageEls}</div>
        </div>
        <div style={{background:"#fff",border:"0.5px solid #e5e7eb",borderRadius:10,padding:"18px 20px"}}>
          <div style={{fontSize:13,fontWeight:500,color:"#111827",marginBottom:4}}>{t.recentExceptions}</div>
          <div style={{fontSize:11,color:"#9ca3af",marginBottom:14}}>{t.recentExceptionsSub}</div>
          {excEls}
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:8}}>
            <span style={{fontSize:11,color:"#9ca3af"}}>{t.pageOf(excPage+1,excTotalPages)}</span>
            <div style={{display:"flex",gap:4}}>
              <button onClick={prevPage} disabled={excPage===0} style={{fontSize:11,padding:"3px 10px",borderRadius:5,border:"0.5px solid #e5e7eb",background:excPage===0?"#f9fafb":"#fff",color:excPage===0?"#d1d5db":c,cursor:excPage===0?"default":"pointer"}}>{t.prev}</button>
              <button onClick={nextPage} disabled={excPage===excTotalPages-1} style={{fontSize:11,padding:"3px 10px",borderRadius:5,border:"0.5px solid #e5e7eb",background:excPage===excTotalPages-1?"#f9fafb":"#fff",color:excPage===excTotalPages-1?"#d1d5db":c,cursor:excPage===excTotalPages-1?"default":"pointer"}}>{t.next}</button>
            </div>
          </div>
        </div>
      </div>
      <div style={{background:"#fff",border:"0.5px solid #e5e7eb",borderRadius:10,padding:"18px 20px"}}>
        <div style={{fontSize:13,fontWeight:500,color:"#111827",marginBottom:4}}>{t.runHistory}</div>
        <div style={{fontSize:11,color:"#9ca3af",marginBottom:16}}>{t.runHistorySub}</div>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
          <thead><tr style={{borderBottom:"0.5px solid #e5e7eb"}}>{thCells}</tr></thead>
          <tbody>{runRows}</tbody>
        </table>
      </div>
    </div>
  );
}

function ChartRenderer(props) {
  var lang=props.lang;
  useEffect(function(){
    var s=document.createElement("script");
    s.src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js";
    s.onload=function(){
      var C=window.Chart,g="rgba(150,150,150,0.12)",tc="#9ca3af",tl=T[lang].chartLabels;
      ["cycleChart","savingsChart","roiChart"].forEach(function(id){var el=document.getElementById(id);if(el&&el._ci){el._ci.destroy();el._ci=null;el._done=false;}});
      var e1=document.getElementById("cycleChart");
      if(e1&&!e1._done){e1._done=true;e1._ci=new C(e1,{type:"bar",data:{labels:tl.cycleItems,datasets:[{label:T[lang].manual,data:[3.2,2.8,6.4,4.1],backgroundColor:"#d1d5db",borderRadius:3},{label:T[lang].automated,data:[0.17,0.48,2.1,0.9],backgroundColor:"#7c3aed",borderRadius:3}]},options:{indexAxis:"y",responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{grid:{color:g},ticks:{color:tc,font:{size:11},callback:function(v){return v+"d";}}},y:{grid:{display:false},ticks:{color:tc,font:{size:11}}}}}})}
      var e2=document.getElementById("savingsChart");
      if(e2&&!e2._done){e2._done=true;e2._ci=new C(e2,{type:"bar",data:{labels:["H2R","P2P","O2C"],datasets:[{data:[620,1100,680],backgroundColor:["#7c3aed","#6d28d9","#4338ca"],borderRadius:4}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{grid:{display:false},ticks:{color:tc,font:{size:12}}},y:{grid:{color:g},ticks:{color:tc,font:{size:11},callback:function(v){return "$"+v+"K";}}}}}})}
      var e3=document.getElementById("roiChart");
      if(e3&&!e3._done){e3._done=true;e3._ci=new C(e3,{type:"line",data:{labels:tl.months,datasets:[{data:[0.2,0.4,0.7,1.0,1.3,1.7,2.1,2.5,2.9,3.2,3.5,3.8],borderColor:"#4338ca",backgroundColor:"rgba(67,56,202,0.08)",fill:true,tension:0.4,pointRadius:3,pointBackgroundColor:"#4338ca"}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{grid:{color:g},ticks:{color:tc,font:{size:11}}},y:{min:0,grid:{color:g},ticks:{color:tc,font:{size:11},callback:function(v){return v+"x";}}}}}})}
    };
    document.head.appendChild(s);
    return function(){if(document.head.contains(s))document.head.removeChild(s);};
  },[lang]);
  return null;
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  var mtS=useState("catalog"); var mainTab=mtS[0]; var setMainTab=mtS[1];
  var pvS=useState("overview"); var previewView=pvS[0]; var setPreviewView=pvS[1];
  var saS=useState(null); var selectedAgent=saS[0]; var setSelectedAgent=saS[1];
  var vS=useState("home"); var view=vS[0]; var setView=vS[1];
  var aaS=useState(null); var activeArea=aaS[0]; var setActiveArea=aaS[1];
  var agS=useState(null); var activeAgent=agS[0]; var setActiveAgent=agS[1];
  var epS=useState({}); var exceptionPages=epS[0]; var setExceptionPages=epS[1];
  var lS=useState("en"); var lang=lS[0]; var setLang=lS[1];

  var t=T[lang];
  var areas=getAreas(t);
  var purple="#7c3aed";

  function goHome(){setView("home");setActiveArea(null);setActiveAgent(null);}
  function goArea(a){setActiveArea(a);setActiveAgent(null);setView("area");}
  function goAgent(a){setActiveAgent(a);setView("agent");}

  var sampleAgents=[
    {name:"Daniel",role:T[lang].agentDetails.Daniel.module,area:"P2P",color:"#6d28d9",light:"#f5f0ff",border:"#c4b5fd",initials:"DA",stats:[{label:lang==="es"?"Procesando ahora":"Processing now",val:"15"},{label:lang==="es"?"Total procesado":"Total processed",val:"248"},{label:lang==="es"?"Precisión":"Accuracy",val:"99.8%"},{label:lang==="es"?"Tiempo prom.":"Avg time",val:"30s"}],exceptions:2},
    {name:"Isa",role:T[lang].agentDetails.Isa.module,area:"H2R",color:"#7c3aed",light:"#f5f3ff",border:"#c4b5fd",initials:"IS",stats:[{label:lang==="es"?"Incorporaciones activas":"Active onboardings",val:"7"},{label:lang==="es"?"Completados este mes":"Completed this mo.",val:"34"},{label:lang==="es"?"Tasa a tiempo":"On-time rate",val:"97.1%"},{label:lang==="es"?"Tiempo prom.":"Avg time",val:"2.1d"}],exceptions:1},
    {name:"Nina",role:T[lang].agentDetails.Nina.module,area:"O2C",color:"#4338ca",light:"#eef2ff",border:"#a5b4fc",initials:"NI",stats:[{label:lang==="es"?"Facturas abiertas":"Open invoices",val:"42"},{label:lang==="es"?"Cobrado este mes":"Collected this mo.",val:"$1.2M"},{label:lang==="es"?"DSO":"DSO",val:"18d"},{label:lang==="es"?"Alertas vencidas":"Overdue flags",val:"3"}],exceptions:3},
  ];

  var tabEls=[["catalog",t.catalogTab],["preview",t.dashboardTab],["payroll","Payroll Agent"]].map(function(item){
    var key=item[0],label=item[1],active=mainTab===key;
    return <button key={key} onClick={function(){setMainTab(key);if(key==="catalog")goHome();}} style={{height:"100%",padding:"0 18px",background:"none",border:"none",borderBottom:active?"2px solid "+purple:"2px solid transparent",cursor:"pointer",fontSize:13,fontWeight:active?500:400,color:active?purple:"#6b7280"}}>{label}</button>;
  });
  var areaNavEls=areas.map(function(a){
    var isAct=activeArea&&activeArea.id===a.id;
    return <button key={a.id} onClick={function(){goArea(a);}} style={{background:isAct?a.color+"18":"none",border:"0.5px solid",borderColor:isAct?a.border:"#e5e7eb",borderRadius:6,cursor:"pointer",padding:"4px 12px",fontSize:12,fontWeight:500,color:isAct?a.color:"#6b7280"}}>{a.label}</button>;
  });
  var langBtns=["en","es"].map(function(l){
    return <button key={l} onClick={function(){setLang(l);}} style={{fontSize:11,fontWeight:600,padding:"5px 10px",borderRadius:6,border:"0.5px solid #e5e7eb",background:lang===l?"#7c3aed":"#fff",color:lang===l?"#fff":"#374151",cursor:"pointer"}}>{l.toUpperCase()}</button>;
  });

  return (
    <div style={{fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",minHeight:"100vh",background:"#f3f4f6"}}>
      <style>{`
        @keyframes live-ping{0%{transform:scale(1);opacity:0.6;}100%{transform:scale(2.2);opacity:0;}}
        @keyframes pulse-ring{0%{box-shadow:0 0 0 0 rgba(245,158,11,0.5);}70%{box-shadow:0 0 0 7px rgba(245,158,11,0);}100%{box-shadow:0 0 0 0 rgba(245,158,11,0);}}
        .thinking-dot{animation:pulse-ring 1.4s ease-out infinite;}
      `}</style>

      {/* NAV */}
      <div style={{background:"#fff",borderBottom:"0.5px solid #e5e7eb",padding:"0 24px",display:"flex",alignItems:"center",height:52}}>
        <div style={{display:"flex",alignItems:"center",gap:8,padding:"0 16px 0 0",borderRight:"0.5px solid #e5e7eb",marginRight:16,flexShrink:0}}>
          <div style={{width:26,height:26,background:"linear-gradient(135deg,#7c3aed,#4338ca)",borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><rect x="1" y="1" width="4" height="4" rx="1" fill="white"/><rect x="8" y="1" width="4" height="4" rx="1" fill="white"/><rect x="1" y="8" width="4" height="4" rx="1" fill="white"/><rect x="8" y="8" width="4" height="4" rx="1" fill="white"/></svg>
          </div>
          <span style={{fontSize:13,fontWeight:500,color:"#111827"}}>{t.appName}</span>
        </div>
        <div style={{display:"flex",gap:0,height:"100%"}}>{tabEls}</div>
        {mainTab==="catalog"&&(
          <div style={{marginLeft:"auto",display:"flex",gap:8,alignItems:"center"}}>
            {activeArea&&(
              <span style={{fontSize:12,color:"#9ca3af",marginRight:4}}>
                <button onClick={goHome} style={{background:"none",border:"none",cursor:"pointer",fontSize:12,color:"#6b7280",padding:0}}>{t.home}</button>
                {" › "}
                <button onClick={function(){goArea(activeArea);}} style={{background:"none",border:"none",cursor:"pointer",fontSize:12,color:activeArea.color,padding:0}}>{activeArea.label}</button>
                {view==="agent"&&activeAgent?" › "+activeAgent.name:""}
              </span>
            )}
            {areaNavEls}
          </div>
        )}
        {mainTab!=="catalog"&&<div style={{flex:1}}/>}
        <div style={{marginLeft:12,flexShrink:0,display:"flex",gap:4}}>{langBtns}</div>
      </div>

      {/* CATALOG */}
      {mainTab==="catalog"&&(
        <div>
          {view==="home"&&(
            <div style={{padding:"40px 32px",maxWidth:960,margin:"0 auto"}}>
              <div style={{marginBottom:28}}>
                <div style={{fontSize:11,fontWeight:500,color:"#9ca3af",letterSpacing:"0.08em",marginBottom:6}}>BEECKER AUTONOMOUS AGENTS</div>
                <h1 style={{margin:"0 0 8px",fontSize:26,fontWeight:500,color:"#111827"}}>{t.catalogTitle}</h1>
                <p style={{margin:0,fontSize:14,color:"#6b7280",maxWidth:520}}>{t.catalogSub}</p>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>
                {areas.map(function(a){
                  return <button key={a.id} onClick={function(){goArea(a);}} style={{background:"#fff",border:"0.5px solid #e5e7eb",borderRadius:12,padding:"24px 20px",textAlign:"left",cursor:"pointer"}}
                    onMouseEnter={function(e){e.currentTarget.style.borderColor=a.border;}} onMouseLeave={function(e){e.currentTarget.style.borderColor="#e5e7eb";}}>
                    <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:16}}>
                      <div style={{color:a.color,background:a.light,borderRadius:10,width:46,height:46,display:"flex",alignItems:"center",justifyContent:"center"}}>{areaIcons[a.id]}</div>
                      <span style={{background:a.light,color:a.color,borderRadius:6,padding:"3px 10px",fontSize:11,fontWeight:500}}>{a.agents.length} {t.agents}</span>
                    </div>
                    <div style={{fontSize:17,fontWeight:500,color:"#111827",marginBottom:3}}>{a.label}</div>
                    <div style={{fontSize:12,color:a.color,marginBottom:8}}>{a.full}</div>
                    <p style={{margin:"0 0 14px",fontSize:13,color:"#6b7280",lineHeight:1.55}}>{a.desc}</p>
                    <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
                      {a.agents.slice(0,4).map(function(ag){return <span key={ag.name} style={{background:"#f9fafb",border:"0.5px solid #e5e7eb",borderRadius:5,padding:"2px 8px",fontSize:11,color:"#6b7280"}}>{ag.name}</span>;})}
                      {a.agents.length>4&&<span style={{fontSize:11,color:"#9ca3af",padding:"2px 4px"}}>{t.moreAgents(a.agents.length-4)}</span>}
                    </div>
                  </button>;
                })}
              </div>
            </div>
          )}
          {view==="area"&&activeArea&&(
            <div style={{padding:"28px 32px",maxWidth:980,margin:"0 auto"}}>
              <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:8}}>
                <div style={{color:activeArea.color,background:activeArea.light,borderRadius:10,width:42,height:42,display:"flex",alignItems:"center",justifyContent:"center"}}>{areaIcons[activeArea.id]}</div>
                <div>
                  <div style={{fontSize:10,color:"#9ca3af",fontWeight:500,letterSpacing:"0.07em"}}>{activeArea.label}</div>
                  <h2 style={{margin:0,fontSize:19,fontWeight:500,color:"#111827"}}>{activeArea.full}</h2>
                </div>
              </div>
              <p style={{margin:"0 0 22px",fontSize:13,color:"#6b7280"}}>{activeArea.desc} {t.clickForCapability}</p>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(175px,1fr))",gap:12}}>
                {activeArea.agents.map(function(ag){
                  return <button key={ag.name} onClick={function(){goAgent(ag);}} style={{background:"#fff",border:"0.5px solid #e5e7eb",borderRadius:12,padding:"16px 14px",textAlign:"left",cursor:"pointer"}}
                    onMouseEnter={function(e){e.currentTarget.style.borderColor=activeArea.border;e.currentTarget.style.background=activeArea.light;}}
                    onMouseLeave={function(e){e.currentTarget.style.borderColor="#e5e7eb";e.currentTarget.style.background="#fff";}}>
                    <div style={{width:34,height:34,background:activeArea.color+"18",borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:10}}>
                      <span style={{fontSize:11,fontWeight:500,color:activeArea.color}}>{ag.icon}</span>
                    </div>
                    <div style={{fontSize:14,fontWeight:500,color:"#111827",marginBottom:2}}>{ag.name}</div>
                    <div style={{fontSize:11,color:activeArea.color,marginBottom:6}}>{ag.module}</div>
                    <div style={{fontSize:10,color:"#9ca3af",lineHeight:1.4}}>{t.trigger}: {ag.trigger}</div>
                  </button>;
                })}
              </div>
            </div>
          )}
          {view==="agent"&&activeAgent&&activeArea&&(function(){
            var lA=areas.find(function(a){return a.id===activeArea.id;})||activeArea;
            var lAg=lA.agents.find(function(a){return a.name===activeAgent.name;})||activeAgent;
            return <AgentDetail agent={lAg} area={lA} onBack={function(){goArea(lA);}} onHome={goHome} t={t}/>;
          })()}
        </div>
      )}

      {/* DASHBOARD */}
      {mainTab==="preview"&&previewView==="overview"&&(
        <div style={{padding:"40px 32px",maxWidth:960,margin:"0 auto"}}>
          <div style={{marginBottom:28}}>
            <div style={{fontSize:11,fontWeight:500,color:"#9ca3af",letterSpacing:"0.08em",marginBottom:6}}>BEECKER AUTONOMOUS AGENTS</div>
            <h1 style={{margin:"0 0 8px",fontSize:26,fontWeight:500,color:"#111827"}}>{t.dashboardTitle}</h1>
            <p style={{margin:0,fontSize:14,color:"#6b7280",maxWidth:520}}>{t.dashboardSub}</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16,marginBottom:28}}>
            {[{id:"cycleChart",title:t.cycleTimeTitle,sub:t.cycleTimeSub,legend:[{color:"#d1d5db",label:t.manual},{color:"#7c3aed",label:t.automated}]},{id:"savingsChart",title:t.savingsTitle,sub:t.savingsSub,legend:[{color:"#7c3aed",label:"H2R"},{color:"#6d28d9",label:"P2P"},{color:"#4338ca",label:"O2C"}]},{id:"roiChart",title:t.roiTitle,sub:t.roiSub,legend:[{color:"#4338ca",label:"ROI (x)"}]}].map(function(ch){
              return <div key={ch.id} style={{background:"#fff",border:"0.5px solid #e5e7eb",borderRadius:10,padding:"16px"}}>
                <div style={{fontSize:12,fontWeight:500,color:"#111827",marginBottom:2}}>{ch.title}</div>
                <div style={{fontSize:11,color:"#9ca3af",marginBottom:10}}>{ch.sub}</div>
                <div style={{display:"flex",gap:12,marginBottom:10}}>{ch.legend.map(function(l){return <span key={l.label} style={{display:"flex",alignItems:"center",gap:4,fontSize:11,color:"#6b7280"}}><span style={{width:10,height:10,borderRadius:2,background:l.color,display:"inline-block"}}></span>{l.label}</span>;})}</div>
                <div style={{position:"relative",width:"100%",height:180}}><canvas id={ch.id}></canvas></div>
              </div>;
            })}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,minmax(0,1fr))",gap:16,marginBottom:36}}>
            {t.kpis.map(function(k,i){
              var colors=["#7c3aed","#6d28d9","#4338ca","#4338ca"];
              return <div key={i} style={{background:"#fff",border:"0.5px solid #e5e7eb",borderRadius:10,padding:"16px 16px 14px",borderTop:"3px solid "+colors[i]}}><div style={{fontSize:24,fontWeight:500,color:colors[i],marginBottom:4}}>{k.value}</div><div style={{fontSize:12,color:"#111827",lineHeight:1.45,marginBottom:5}}>{k.label}</div><div style={{fontSize:11,color:"#9ca3af"}}>{k.sub}</div></div>;
            })}
          </div>
          <div style={{marginBottom:14}}>
            <div style={{fontSize:11,fontWeight:500,color:"#9ca3af",letterSpacing:"0.08em",marginBottom:4}}>{t.sampleAgentsLabel}</div>
            <p style={{margin:"0 0 16px",fontSize:13,color:"#6b7280"}}>{t.sampleAgentsSub}</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>
            {sampleAgents.map(function(ag){
              return <button key={ag.name} onClick={function(){setSelectedAgent(ag);setPreviewView("agent");}} style={{background:"#fff",border:"0.5px solid #e5e7eb",borderRadius:12,padding:0,textAlign:"left",cursor:"pointer",overflow:"hidden",display:"flex",flexDirection:"column"}}
                onMouseEnter={function(e){e.currentTarget.style.borderColor=ag.border;}} onMouseLeave={function(e){e.currentTarget.style.borderColor="#e5e7eb";}}>
                <div style={{background:ag.light,padding:"16px 18px",display:"flex",alignItems:"center",gap:12,borderBottom:"0.5px solid #e5e7eb",width:"100%",boxSizing:"border-box"}}>
                  <div style={{width:44,height:44,borderRadius:"50%",background:ag.color,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><span style={{fontSize:14,fontWeight:500,color:"#fff"}}>{ag.initials}</span></div>
                  <div style={{flex:1,minWidth:0}}><div style={{fontSize:15,fontWeight:500,color:"#111827"}}>{ag.name}</div><div style={{fontSize:11,color:ag.color}}>{ag.role}</div></div>
                  <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4}}>
                    <LiveBadge label={t.active}/>
                    <span style={{background:ag.light,color:ag.color,borderRadius:6,padding:"2px 7px",fontSize:10,border:"0.5px solid "+ag.border}}>{ag.area}</span>
                  </div>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:0,flex:1}}>
                  {ag.stats.map(function(s,i){return <div key={i} style={{padding:"12px 16px",borderRight:i%2===0?"0.5px solid #e5e7eb":"none",borderBottom:i<2?"0.5px solid #e5e7eb":"none"}}><div style={{fontSize:10,color:"#9ca3af",marginBottom:3}}>{s.label}</div><div style={{fontSize:16,fontWeight:500,color:ag.color}}>{s.val}</div></div>;})}
                </div>
                <div style={{padding:"10px 18px",borderTop:"0.5px solid #e5e7eb",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <span style={{fontSize:11,color:"#9ca3af"}}>{t.exceptionsPending(ag.exceptions)}</span>
                  <span style={{fontSize:11,color:ag.color,fontWeight:500}}>{t.viewDashboard}</span>
                </div>
              </button>;
            })}
          </div>
          <ChartRenderer lang={lang}/>
        </div>
      )}
      {mainTab==="preview"&&previewView==="agent"&&selectedAgent&&(
        <AgentMonitor agent={selectedAgent} onBack={function(){setPreviewView("overview");}} exceptionPages={exceptionPages} setExceptionPages={setExceptionPages} t={t}/>
      )}

      {/* PAYROLL AGENT */}
      {mainTab==="payroll"&&(
        <NinaPayrollDashboard onBack={function(){setMainTab("preview");}}/>
      )}
    </div>
  );
}
