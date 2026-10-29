// QuantumBase Vocational 360 - Comprehensive Dataset
// National Skills Qualifications Framework (NSQF), Market Intelligence, and Family Counseling Data

const VOCATIONAL_CAREERS = [
  {
    id: "ev-powertrain",
    title: "Electric Vehicle (EV) Powertrain & Battery Systems Specialist",
    domain: "Green Energy & EV Systems",
    nsqfLevel: "NSQF Level 5",
    duration: "18 Months (6 Mo Classroom + 12 Mo Industry Apprenticeship)",
    startingStipend: 18500,
    startingSalary: 34000,
    year5Salary: 72000,
    year10Salary: 145000,
    placementRate: 94.6,
    hiringPartners: ["Tata Motors", "Ola Electric", "Ather Energy", "Mahindra Electric", "Exide Energy"],
    growthRate: "+38% Annual Industry Demand",
    safetyScore: 92,
    physicalStamina: 60,
    digitalSkills: 85,
    mechanicalDexterity: 88,
    academicProgression: "Direct lateral entry into 2nd year B.Voc in EV Technology or B.Tech Mechatronics",
    description: "Diagnose, assemble, calibrate, and service high-voltage lithium battery packs, regenerative braking systems, and EV powertrain controllers in automated assembly plants and high-tech workshops.",
    parentReassurance: {
      financialSecurity: "Immediate stipend from month 7; 100% formal corporate contract with Provident Fund (PF) and Medical Insurance.",
      socialPrestige: "Green technology specialist with advanced digital diagnostic tablets—far removed from unorganized roadside garages.",
      safetyStandard: "ISO 26262 High-Voltage Safety Certified workshops with robotic lifting and insulated safety gear."
    },
    quantumScores: {
      dexterity: 85,
      digital: 88,
      craftsmanship: 70,
      medicalCare: 20,
      fieldResilience: 80,
      enterprise: 82
    }
  },
  {
    id: "robotic-cnc",
    title: "Precision Robotic CNC & Smart Manufacturing Programmer",
    domain: "Precision Manufacturing & CNC Robotics",
    nsqfLevel: "NSQF Level 6",
    duration: "2 Years (Dual Vocational Training Diploma)",
    startingStipend: 19500,
    startingSalary: 38000,
    year5Salary: 85000,
    year10Salary: 175000,
    placementRate: 96.2,
    hiringPartners: ["Schneider Electric", "Larsen & Toubro (L&T)", "Godrej Aerospace", "Bharat Forge", "Bosch India"],
    growthRate: "+32% Annual Industry Demand",
    safetyScore: 95,
    physicalStamina: 50,
    digitalSkills: 92,
    mechanicalDexterity: 94,
    academicProgression: "Eligible for Advanced Diploma in Industrial Automation & Lateral Entry to B.Tech Manufacturing",
    description: "Program 5-axis robotic CNC milling machines, coordinate measuring systems, and digital twin manufacturing cells for aerospace, automotive, and defense hardware.",
    parentReassurance: {
      financialSecurity: "High demand in defense corridors (UP & Tamil Nadu corridors); permanent salary ladders with multinational firms.",
      socialPrestige: "Clean-room environment wearing anti-static coats, programming robotic arms using CAD/CAM workstations.",
      safetyStandard: "Automated interlocks and robotic safety cages ensure zero direct hazard exposure."
    },
    quantumScores: {
      dexterity: 95,
      digital: 92,
      craftsmanship: 85,
      medicalCare: 15,
      fieldResilience: 60,
      enterprise: 75
    }
  },
  {
    id: "biomedical-tech",
    title: "Biomedical Equipment Diagnostic & Hospital Systems Technician",
    domain: "Healthcare & Diagnostic Medical Tech",
    nsqfLevel: "NSQF Level 5",
    duration: "18 Months (Hospital-Embedded Apprenticeship)",
    startingStipend: 16000,
    startingSalary: 31000,
    year5Salary: 68000,
    year10Salary: 138000,
    placementRate: 92.4,
    hiringPartners: ["Apollo Hospitals", "Siemens Healthineers", "GE Healthcare", "Max Healthcare", "Fortis"],
    growthRate: "+29% Annual Industry Demand",
    safetyScore: 98,
    physicalStamina: 45,
    digitalSkills: 80,
    mechanicalDexterity: 78,
    academicProgression: "Pathway to B.Voc in Biomedical Instrumentation and Clinical Engineering licenses",
    description: "Install, calibrate, inspect, and maintain life-saving medical devices including MRI cooling units, dialysis machines, ventilators, and neonatal incubators in hospitals and diagnostic hubs.",
    parentReassurance: {
      financialSecurity: "Essential services classification ensures recess-proof employment; hospital staff medical allowances included.",
      socialPrestige: "Working in air-conditioned multispecialty hospitals alongside senior doctors and clinical specialists with high societal respect.",
      safetyStandard: "Clinical hygiene standards, zero heavy industrial hazard, ideal for both male and female candidates with high parental comfort."
    },
    quantumScores: {
      dexterity: 78,
      digital: 82,
      craftsmanship: 65,
      medicalCare: 95,
      fieldResilience: 40,
      enterprise: 70
    }
  },
  {
    id: "drone-avionics",
    title: "Commercial Drone Pilot & Precision Agri-Avionics Specialist",
    domain: "Agri-Tech & Drone Avionics",
    nsqfLevel: "NSQF Level 4-5",
    duration: "12 Months (DGCA Drone Certification + Agro-Sensors)",
    startingStipend: 20000,
    startingSalary: 36000,
    year5Salary: 78000,
    year10Salary: 160000,
    placementRate: 91.0,
    hiringPartners: ["Garuda Aerospace", "IFFCO Kisan", "Skylark Drones", "Adani Agri Logistics", "Survey of India Contractors"],
    growthRate: "+44% Annual Industry Demand (Drone Shakti Initiative)",
    safetyScore: 89,
    physicalStamina: 68,
    digitalSkills: 88,
    mechanicalDexterity: 82,
    academicProgression: "DGCA Remote Pilot License (RPL) Level 2 & Diploma in Avionics / GIS Cartography",
    description: "Operate octocopter agricultural sprayers, LiDAR terrain mapping drones, and inspect electrical transmission towers using thermal and multispectral sensors.",
    parentReassurance: {
      financialSecurity: "Government subsidy support under Drone Didi & Drone Shakti; huge scope for high-margin village micro-entrepreneurship.",
      socialPrestige: "Licensed Drone Aviator wearing uniform; respected as modern agricultural technologist revitalizing the rural economy.",
      safetyStandard: "Autonomous failsafe protocols, GPS geofencing, and DGCA regulatory flight compliance."
    },
    quantumScores: {
      dexterity: 80,
      digital: 90,
      craftsmanship: 72,
      medicalCare: 30,
      fieldResilience: 92,
      enterprise: 95
    }
  },
  {
    id: "solar-microgrid",
    title: "Solar Micro-Grid & Industrial Automation Installer",
    domain: "Sustainable Construction & Clean Energy",
    nsqfLevel: "NSQF Level 5",
    duration: "15 Months (National Solar Mission PM-Surya Ghar Alignment)",
    startingStipend: 17000,
    startingSalary: 32500,
    year5Salary: 74000,
    year10Salary: 150000,
    placementRate: 95.1,
    hiringPartners: ["Tata Power Solar", "Adani Solar", "Suzlon Energy", "Vikram Solar", "L&T Construction"],
    growthRate: "+41% Annual Demand (Surya Ghar Mega Scheme)",
    safetyScore: 91,
    physicalStamina: 75,
    digitalSkills: 75,
    mechanicalDexterity: 85,
    academicProgression: "Electrical Supervisor License 'A' Grade + B.Voc in Renewable Energy Systems",
    description: "Design rooftop solar PV arrays, configure hybrid string inverters, battery energy storage systems (BESS), and smart SCADA telemetry for industrial and residential micro-grids.",
    parentReassurance: {
      financialSecurity: "Over 1 Crore rooftop solar installations sanctioned by Government; limitless local contractor opportunities.",
      socialPrestige: "Certified Solar Engineer title, managing teams of apprentices with clean energy credentials.",
      safetyStandard: "Fall arrest harnesses, arc-flash protective gear, and certified electrical safety protocols."
    },
    quantumScores: {
      dexterity: 86,
      digital: 76,
      craftsmanship: 78,
      medicalCare: 10,
      fieldResilience: 88,
      enterprise: 88
    }
  },
  {
    id: "cyber-mechatronics",
    title: "Cyber-Physical Mechatronics & Industrial IoT Integrator",
    domain: "Cyber-Physical Automation & IoT",
    nsqfLevel: "NSQF Level 6",
    duration: "2 Years (Polytechnic Industry Co-op)",
    startingStipend: 21000,
    startingSalary: 39500,
    year5Salary: 92000,
    year10Salary: 190000,
    placementRate: 97.0,
    hiringPartners: ["Siemens India", "ABB India", "Honeywell Automation", "Rockwell Automation", "TCS Smart Factory"],
    growthRate: "+36% Annual Industry Demand",
    safetyScore: 96,
    physicalStamina: 40,
    digitalSkills: 95,
    mechanicalDexterity: 86,
    academicProgression: "Direct entry to B.Tech Electronics & Mechatronics / German Dual VET Equivalency",
    description: "Bridge physical machinery with cloud analytics by deploying PLC controllers, industrial edge gateways, sensor telemetry networks, and automated guided vehicles (AGVs).",
    parentReassurance: {
      financialSecurity: "Highest-bracket vocational compensation; globally recognized certifications with German DIHK alignment.",
      socialPrestige: "Works in high-tech control rooms wearing smart badge, equivalent to tech software/hardware systems engineer.",
      safetyStandard: "Modern digitalized automation floor with strict European safety standards."
    },
    quantumScores: {
      dexterity: 88,
      digital: 96,
      craftsmanship: 80,
      medicalCare: 20,
      fieldResilience: 50,
      enterprise: 80
    }
  }
];

const PARENT_MYTHS_VS_FACTS = [
  {
    id: "myth-stigma",
    myth: "Vocational trades are for students who failed standard academics and offer no social respect.",
    fact: "Modern NSQF vocational tracks (Level 5-7) are precision tech roles in robotics, EV, and avionics. Students earn nationally certified badges and wear corporate uniforms at firms like Tata, Siemens, and L&T.",
    evidence: "National Education Policy (NEP 2020) guarantees full credit equivalence between vocational diplomas and bachelor degrees (B.Voc / B.Tech lateral)."
  },
  {
    id: "myth-money",
    myth: "General college degrees (BA/B.Com) lead to much higher starting salaries than vocational training.",
    fact: "48% of general degree graduates remain unemployed or earn under ₹14,000/month after 3-4 years of tuition debt. Vocational apprentices earn ₹16k–₹21k/month stipend DURING training and ₹32k–₹40k upon certification with zero student loans.",
    evidence: "Government Labour Market Intelligence (LMI) Report 2025: Tech-skilled apprentices break even 6.5 years faster than conventional BA/BSc graduates."
  },
  {
    id: "myth-deadend",
    myth: "Once you enter a trade, your career growth is capped forever without a traditional degree.",
    fact: "NSQF offers seamless vertical mobility: NSQF Level 4 (ITI) -> Level 5 (Advanced Diploma) -> Level 6 (B.Voc Degree) -> Level 7 (M.Voc / Senior Plant Manager).",
    evidence: "Over 42,000 vocational graduates in 2024 transitioned into senior engineering and supervisory managerial roles within 5 years."
  },
  {
    id: "myth-girls",
    myth: "Vocational training is heavy physical labor not suitable for female students.",
    fact: "Over 62% of high-growth vocational roles are in precision electronics, biomedical lab calibration, solar micro-grid telemetry, and drone avionics—clean, air-conditioned, and automated environments.",
    evidence: "Government schemes offer dedicated women's hostels, 100% tuition waivers under PMKVY 4.0, and ₹3,000/month special female apprenticeship allowances."
  }
];

const TRAINING_HUBS_DIRECTORY = [
  {
    id: "hub-pune",
    name: "Tata Motors-Government ITI Centre of Excellence in EV Systems",
    state: "Maharashtra",
    district: "Pune / Pimpri",
    rating: 4.9,
    trades: ["EV Powertrain", "Precision Robotic CNC", "Cyber-Physical Mechatronics"],
    stipendProvided: "₹18,500/mo (NAPS Co-Funded)",
    hostelAvailable: true,
    womenHostel: true,
    feeWaiver: "100% Free under PMKVY Scheme",
    contact: "+91 20 2740 5500 | admissions@iti-pune-ev.gov.in"
  },
  {
    id: "hub-chennai",
    name: "Tamil Nadu Apex Skill Development Centre for Auto & Robotics",
    state: "Tamil Nadu",
    district: "Chennai / Sriperumbudur",
    rating: 4.8,
    trades: ["Precision Robotic CNC", "EV Powertrain", "Cyber-Physical Mechatronics"],
    stipendProvided: "₹19,000/mo (Direct Bank Transfer)",
    hostelAvailable: true,
    womenHostel: true,
    feeWaiver: "Subsidized by TN Skill Development Corp",
    contact: "+91 44 2250 8890 | registrar@tnsdc-apex.tn.gov.in"
  },
  {
    id: "hub-bengaluru",
    name: "Siemens-GTTC Centre for Advanced Medical & Automation Tech",
    state: "Karnataka",
    district: "Bengaluru / Peenya",
    rating: 4.9,
    trades: ["Biomedical Equipment Tech", "Cyber-Physical Mechatronics", "Commercial Drone Pilot"],
    stipendProvided: "₹21,000/mo",
    hostelAvailable: true,
    womenHostel: true,
    feeWaiver: "German DIHK Industry Partnership",
    contact: "+91 80 2839 1234 | contact@gttc-siemens.in"
  },
  {
    id: "hub-lucknow",
    name: "Defence Corridor Skill Hub & Drone Flight Institute",
    state: "Uttar Pradesh",
    district: "Lucknow / Kanpur Highway",
    rating: 4.7,
    trades: ["Commercial Drone Pilot", "Precision Robotic CNC", "Solar Micro-Grid"],
    stipendProvided: "₹17,500/mo",
    hostelAvailable: true,
    womenHostel: true,
    feeWaiver: "UP Skill Development Mission Sponsored",
    contact: "+91 522 245 9811 | admissions@upsdm-defence.org"
  },
  {
    id: "hub-ahmedabad",
    name: "Adani-Kavach Green Energy & Rooftop Solar Technical Academy",
    state: "Gujarat",
    district: "Ahmedabad / Mundra Cluster",
    rating: 4.8,
    trades: ["Solar Micro-Grid", "EV Powertrain", "Precision Robotic CNC"],
    stipendProvided: "₹18,000/mo",
    hostelAvailable: true,
    womenHostel: true,
    feeWaiver: "PM-Surya Ghar Corporate CSR Scholarship",
    contact: "+91 79 2656 5555 | skillacademy@adanienergy.com"
  }
];

const MULTILINGUAL_IVR_SCRIPTS = {
  hi: {
    language: "हिंदी (Hindi)",
    agentName: "कौशल सारथी (Kaushal Saarthi)",
    scenarios: [
      {
        title: "पिता की चिंता: क्या ईवी या रोबोटिक्स में भविष्य पक्का है?",
        parentAudioText: "नमस्ते! मेरा बेटा 12वीं के बाद आईटीआई या वोकेशनल कोर्स करने की कह रहा है। क्या इसमें सचमुच सरकारी और प्राइवेट कंपनियों में पक्की नौकरी मिलती है, या फिर यह सिर्फ छोटा-मोटा काम है?",
        botAudioText: "नमस्ते आदरणीय अभिभावक जी! आपकी चिंता बिल्कुल स्वाभाविक है। आजकल की वोकेशनल ट्रेनिंग पहले जैसी नहीं रही। टाटा मोटर्स और श्नाइडर जैसी कंपनियों में आधुनिक ईवी और रोबोटिक्स तकनीशियन को ट्रेनिंग के दौरान ही ₹18,000 मासिक स्टाइपेंड मिलता है। पूरा होने पर ₹34,000 से ₹40,000 की शुरुआती पक्की नौकरी मिलती है। साथ ही राष्ट्रीय शिक्षा नीति (NEP 2020) के तहत आपका बेटा आगे चलकर बी.वॉक या बी.टेक की डिग्री भी ले सकता है। किसी तरह का कर्ज़ नहीं लेना पड़ता!",
        keyTakeaway: "ट्रेनिंग में ही ₹18k स्टाइपेंड + डिग्री की पूर्ण मान्यता + सुरक्षित भविष्य।"
      },
      {
        title: "माता की चिंता: क्या बेटियों के लिए बायोमेडिकल और सोलर सुरक्षित है?",
        parentAudioText: "मेरी बेटी 10वीं पास है। क्या यह वोकेशनल कोर्स बेटियों के लिए सुरक्षित और सम्मानजनक हैं? क्या हॉस्टल की सुविधा मिलेगी?",
        botAudioText: "आदरणीय माता जी! बायोमेडिकल इक्विपमेंट और ऑटोमेशन लैब का काम एयर-कंडीशंड अस्पतालों (जैसे अपोलो, मैक्स) में आधुनिक मशीनों की जांच का होता है। इसमें कोई भारी शारीरिक श्रम नहीं है। सरकारी केंद्रों में बालिकाओं के लिए मुफ्त हॉस्टल, 100% फीस माफी और महिला सुरक्षा विंग मौजूद है। आज 40% से अधिक लड़कियां इन आधुनिक ट्रेड्स में शीर्ष पदों पर काम कर रही हैं।",
        keyTakeaway: "अस्पतालों में सम्मानजनक पद + 100% मुफ्त हॉस्टल व फीस माफी।"
      }
    ]
  },
  mr: {
    language: "मराठी (Marathi)",
    agentName: "कौशल्य मित्र (Kaushalya Mitra)",
    scenarios: [
      {
        title: "पालकांची शंका: पारंपारिक पदवीपेक्षा वोकेशनल कोर्स कसा चांगला आहे?",
        parentAudioText: "माझा मुलगा बीए किंवा बीकॉम ऐवजी मेकॅट्रॉनिक्स किंवा सीएनसी रोबोटिक्स शिकू इच्छितो. समाजात याला काय प्रतिष्ठा मिळेल?",
        botAudioText: "नमस्कार काका! आज सामान्य पदवी घेतलेल्या 50% तरुणांना लगेच नोकरी मिळत नाही आणि शिक्षणावर लाखो रुपये खर्च होतात. याउलट, वोकेशनल कोर्सेसमध्ये महिंद्रा, टाटा आणि बॉशसारख्या नामांकित कंपन्यांमध्ये 6 व्या महिन्यापासूनच दरमहा ₹18,000 ते ₹20,000 स्टायपेंड सुरू होतो. हा मुलगा लॅपटॉपवर रोबोटिक मशीनचे प्रोग्रामिंग करतो, त्यामुळे त्याला उच्च सामाजिक प्रतिष्ठा व आर्थिक स्थैर्य मिळते.",
        keyTakeaway: "शून्य कर्ज + पहिल्या वर्षापासून कमाई + नामांकित कंपन्यांमध्ये नोकरी."
      }
    ]
  },
  ta: {
    language: "தமிழ் (Tamil)",
    agentName: "திறன் வழிகாட்டி (Thiran Vazhikatti)",
    scenarios: [
      {
        title: "பெற்றோர் கேள்வி: தொழிற்கல்வி முடித்த பிறகு கல்லூரி பட்டம் பெற முடியுமா?",
        parentAudioText: "வணக்கம். எனது மகன் பாலிடெக்னிக் தொழிற்கல்வி சேர்ந்தால், எதிர்காலத்தில் இன்ஜினியரிங் பட்டம் பெற முடியுமா?",
        botAudioText: "வணக்கம்! புதிய கல்விக் கொள்கையின்படி (NEP 2020), தொழிற்கல்வி சான்றிதழ் பெற்ற மாணவர்கள் நேரடியாக இரண்டாம் ஆண்டு பி.டெக் அல்லது பி.வோக் பட்டப்படிப்பில் சேரலாம். படித்துக்கொண்டே வேலை செய்யும் வசதி இருப்பதால் படிப்புக்கு கடன் வாங்க தேவையில்லை.",
        keyTakeaway: "நேரடி பி.டெக் வாய்ப்பு + படிக்கும் போதே சம்பளம்."
      }
    ]
  },
  te: {
    language: "తెలుగు (Telugu)",
    agentName: "నైపుణ్య మిత్ర (Naipunya Mitra)",
    scenarios: [
      {
        title: "తండ్రి ఆందోళన: EV లేదా రోబోటిక్స్ కోర్సుతో భవిష్యత్తు సురక్షితమేనా?",
        parentAudioText: "నమస్కారం! నా కొడుకు 10వ లేదా 12వ తరగతి తర్వాత సాధారణ డిగ్రీ కాకుండా EV లేదా రోబోటిక్స్ టెక్నీషియన్ కోర్సు చేస్తానంటున్నాడు. దీనిలో నిజంగా మంచి కంపెనీల్లో ఉద్యోగం, జీతం వస్తాయా? లేక చిన్న పనులకే పరిమితమవుతాడా?",
        botAudioText: "నమస్కారం అండీ! మీ ఆలోచన చాలా సమంజసమైనది. నేటి వృత్తి విద్యా కోర్సులు పూర్వపు పద్ధతుల్లో లేవు. టాటా మోటార్స్, ష్నైడర్ ఎలక్ట్రిక్ వంటి అగ్రశ్రేణి కంపెనీలలో శిక్షణ సమయంలోనే నెలకు ₹18,000 నుండి ₹20,000 వరకు స్టైపెండ్ లభిస్తుంది. కోర్సు పూర్తయ్యాక నెలకు ₹35,000 నుండి ₹40,000 ప్రారంభ వేతనంతో శాశ్వత ఉద్యోగం లభిస్తుంది. అంతేకాకుండా, నూతన జాతీయ విద్యా విధానం (NEP 2020) ప్రకారం మీ అబ్బాయి భవిష్యత్తులో నేరుగా B.Voc లేదా B.Tech డిగ్రీ కూడా పొందవచ్చు. చదువు కోసం ఎలాంటి అప్పులు చేయాల్సిన అవసరం లేదు!",
        keyTakeaway: "శిక్షణలోనే ₹18k స్టైపెండ్ + పూర్తి డిగ్రీ సమానత్వం + సురక్షిత భవిష్యత్తు."
      },
      {
        title: "తల్లి ఆందోళన: ఆడపిల్లలకు బయోమెడికల్ మరియు సోలార్ టెక్నాలజీ సురక్షితమేనా?",
        parentAudioText: "మా అమ్మాయికి వృత్తి విద్య నేర్పించాలనుకుంటున్నాము. బయోమెడికల్ పరికరాలు లేదా ఆటోమేషన్ కోర్సులు ఆడపిల్లలకు సురక్షితమేనా? హాస్టల్ మరియు స్కాలర్‌షిప్ సదుపాయాలు ఉంటాయా?",
        botAudioText: "నమస్కారం అమ్మగారూ! బయోమెడికల్ ఎక్విప్‌మెంట్ టెక్నాలజీ అనేది అపోలో, మణిపాల్ వంటి ప్రముఖ మల్టీ-స్పెషాలిటీ ఆసుపత్రులలో అత్యాధునిక స్కానింగ్, డయాలసిస్ యంత్రాలను కంప్యూటర్ ద్వారా నిర్వహించే అత్యంత గౌరవప్రదమైన పని. ఇందులో ఎటువంటి శారీరక శ్రమ ఉండదు. ప్రభుత్వ శిక్షణా కేంద్రాలలో బాలికలకు ప్రత్యేక భద్రతతో కూడిన ఉచిత హాస్టళ్లు, 100% ఫీజు మినహాయింపు మరియు ప్రత్యేక ప్రోత్సాహకాలు ఉన్నాయి. ప్రస్తుతం ఈ రంగంలో 40% పైగా మహిళా ఇంజనీర్లు రాణిస్తున్నారు.",
        keyTakeaway: "ఆసుపత్రులలో గౌరవప్రదమైన ఉద్యోగం + 100% ఉచిత హాస్టల్ & ఫీజు మినహాయింపు."
      }
    ]
  },
  en: {
    language: "English",
    agentName: "QuantumBase Family Counselor",
    scenarios: [
      {
        title: "Parent FAQ: Long-term career ceiling and overseas mobility",
        parentAudioText: "We worry that choosing a vocational trade creates a career glass ceiling compared to a 4-year university engineering degree. How do technicians advance?",
        botAudioText: "Hello! Modern NSQF Level 5 to 7 qualifications align directly with international apprenticeship frameworks (such as the German DIHK model). In practice, vocational graduates enter companies 2 to 3 years earlier, accumulate real plant experience without debt, and advance into Lead Automation Technicians, Quality Chiefs, or plant supervisors earning ₹12-18 Lakhs annually by age 28.",
        keyTakeaway: "No glass ceiling: Direct promotion to plant manager & German-aligned credentials."
      }
    ]
  }
};
