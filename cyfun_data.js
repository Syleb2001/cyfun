// Données extraites des fichiers CyFun_text.json et CyFun_formulas.json
const cyfunData = {
    // Introduction et informations générales
    introduction: {
        description: "This workbook is the self-assessment tool for the CyberFundamentals Framework. The CyberFundamentals Framework is developed by the Centre for Cybersecurity Belgium (CCB), which operates under the authority of the Prime Minister of Belgium. The framework includes a set of concrete measures to protect data, significantly reduce the risk of the most common cyber-attacks, and increase the cyber resilience of organisations.",
        directions: "Each \"details\" tab contains the controls of the respective cyberfundamentals framework level (BASIC-IMPORTANT-ESSENTIAL). The way each control is assessed considers 2 angles: How the controle is documented (documentation maturity) and how that documentation is implemented (implementation maturity). The maturity of each of the controls is assessed using the explanation in the Maturity Levels tab."
    },
    
    // Niveaux de maturité
    maturityLevels: [
        {
            level: 1,
            name: "Initial",
            description: "Documentation: No Process documentation or not formally approved by management. Implementation: Standard process does not exist."
        },
        {
            level: 2,
            name: "Repeatable",
            description: "Documentation: Formally approved Process documentation exists but not reviewed in the previous 2 years. Implementation: Ad-hoc process exists and is done informally."
        },
        {
            level: 3,
            name: "Defined",
            description: "Documentation: Formally approved Process documentation exists, and exceptions are documented and approved. Documented & approved exceptions < 5% of the time. Implementation: Formal process exists and is implemented. Evidence available for most activities. Less than 10% process exceptions."
        },
        {
            level: 4,
            name: "Managed",
            description: "Documentation: Formally approved Process documentation exists, and exceptions are documented and approved. Documented & approved exceptions < 3% of the time. Implementation: Formal process exists and is implemented. Evidence available for all activities. Detailed metrics of the process are captured and reported. Minimal target for metrics has been established. Less than 5% of process exceptions."
        },
        {
            level: 5,
            name: "Optimizing",
            description: "Documentation: Formally approved Process documentation exists, and exceptions are documented and approved. Documented & approved exceptions < 0,5% of the time. Implementation: Formal process exists and is implemented. Evidence available for all activities. Detailed metrics of the process are captured and reported. Minimal target for metrics has been established and continually improving. Less than 1% of process exceptions."
        }
    ],
    
    // Seuils de conformité
    complianceThresholds: {
        BASIC: {
            conformant: 2.5,
            keyMeasure: 2.5,
            category: 2.5,
            total: 2.5,
            description: "Un score moyen de 2.5 ou plus est nécessaire pour être conforme au niveau BASIC."
        },
        IMPORTANT: {
            conformant: 3.0,
            keyMeasure: 3.0,
            category: 3.0,
            total: 3.0,
            description: "Un score moyen de 3.0 ou plus est nécessaire pour être conforme au niveau IMPORTANT."
        },
        ESSENTIAL: {
            conformant: 3.5,
            keyMeasure: 3.0,
            category: 3.0,
            total: 3.5,
            description: "Un score moyen de 3.5 ou plus est nécessaire pour être conforme au niveau ESSENTIAL."
        }
    },
    
    // Fonctions du framework
    functions: [
        {
            id: "ID",
            name: "IDENTIFY",
            description: "Développer une compréhension organisationnelle pour gérer les risques de cybersécurité des systèmes, des personnes, des actifs, des données et des capacités."
        },
        {
            id: "PR",
            name: "PROTECT",
            description: "Développer et mettre en œuvre des mesures de protection appropriées pour assurer la prestation des services critiques."
        },
        {
            id: "DE",
            name: "DETECT",
            description: "Développer et mettre en œuvre des activités appropriées pour identifier l'occurrence d'un événement de cybersécurité."
        },
        {
            id: "RS",
            name: "RESPOND",
            description: "Développer et mettre en œuvre des activités appropriées pour prendre des mesures concernant un incident de cybersécurité détecté."
        },
        {
            id: "RC",
            name: "RECOVER",
            description: "Développer et mettre en œuvre des activités appropriées pour maintenir les plans de résilience et restaurer les capacités ou services qui ont été altérés en raison d'un incident de cybersécurité."
        }
    ],
    
    // Contrôles par niveau
    controls: {
        // Niveau BASIC
        BASIC: [
            // IDENTIFY (ID)
            {
                function: "IDENTIFY",
                category: "Asset Management (ID.AM)",
                keyMeasure: false,
                controlId: "ID.AM-1",
                controlName: "Physical devices and systems within the organization are inventoried",
                requirement: "ID.AM-1.1: An inventory of assets associated with information and information processing facilities within the organization shall be documented, reviewed, and updated when changes occur.",
                guidance: "• This inventory includes fixed and portable computers, tablets, mobile phones, Programmable Logic Controllers (PLCs), sensors, actuators, robots, machine tools, firmware, network switches, routers, power supplies, and other networked components or devices.\n• This inventory must include all assets, whether or not they are connected to the organization's network.\n• The use of an IT asset management tool could be considered."
            },
            {
                function: "IDENTIFY",
                category: "Asset Management (ID.AM)",
                keyMeasure: false,
                controlId: "ID.AM-2",
                controlName: "Software platforms and applications within the organization are inventoried",
                requirement: "ID.AM-2.1: An inventory that reflects what software platforms and applications are being used in the organization shall be documented, reviewed, and updated when changes occur.",
                guidance: "• This inventory includes software programs, software platforms and databases, even if outsourced (SaaS).\n• Outsourcing arrangements should be part of the contractual agreements with the provider.\n• Information in the inventory should include for example: name, description, version, number of users, data processed, etc.\n• A distinction should be made between unsupported software and unauthorized software.\n• The use of an IT asset management tool could be considered."
            },
            {
                function: "IDENTIFY",
                category: "Asset Management (ID.AM)",
                keyMeasure: false,
                controlId: "ID.AM-3",
                controlName: "Organizational communication and data flows are mapped",
                requirement: "ID.AM-3.1: Information that the organization stores and uses shall be identified.",
                guidance: "• Start by listing all the types of information your business stores or uses. Define \"information type\" in any useful way that makes sense to your business. You may want to have your employees make a list of all the information they use in their regular activities. List everything you can think of, but you do not need to be too specific. For example, you may keep customer names and email addresses, receipts for raw material, your banking information, or other proprietary information.\n• Consider mapping this information with the associated assets identified in the inventories of physical devices, systems, software platforms and applications used within the organization (see ID.AM-1 & ID.AM-2)."
            },
            {
                function: "IDENTIFY",
                category: "Asset Management (ID.AM)",
                keyMeasure: false,
                controlId: "ID.AM-4",
                controlName: "External information systems are catalogued",
                requirement: "ID.AM-4.1: External information systems shall be catalogued.",
                guidance: "• External information systems include cloud services, outsourced services, and other third-party services that process, store, or transmit organizational information.\n• The catalogue should include information such as the service provider, the type of service, the data processed, and the security measures in place."
            },
            {
                function: "IDENTIFY",
                category: "Asset Management (ID.AM)",
                keyMeasure: false,
                controlId: "ID.AM-5",
                controlName: "Resources are prioritized based on their classification, criticality, and business value",
                requirement: "ID.AM-5.1: Resources shall be prioritized based on their classification, criticality, and business value.",
                guidance: "• Consider classifying resources based on their sensitivity and importance to the organization.\n• Consider prioritizing resources based on their criticality to business operations.\n• Consider the business value of resources when determining protection measures."
            },
            {
                function: "IDENTIFY",
                category: "Governance (ID.GV)",
                keyMeasure: false,
                controlId: "ID.GV-1",
                controlName: "Organizational cybersecurity policy is established and communicated",
                requirement: "ID.GV-1.1: Policies and procedures for information security and cyber security shall be created, documented, reviewed, approved, and updated when changes occur.",
                guidance: "• Policies and procedures used to identify acceptable practices and expectations for business operations, can be used to train new employees on your information security expectations, and can aid an investigation in case of an incident. These policies and procedures should be readily accessible to employees.\n• Policies and procedures for information- and cybersecurity should clearly describe your expectations for protecting the organization's information and systems, and how management expects the company's resources to be used and protected by all employees.\n• Policies and procedures should be reviewed and updated at least annually and every time there are changes in the organization or technology. Whenever the policies are changed, employees should be made aware of the changes."
            },
            {
                function: "IDENTIFY",
                category: "Governance (ID.GV)",
                keyMeasure: false,
                controlId: "ID.GV-3",
                controlName: "Legal and regulatory requirements regarding cybersecurity, including privacy and civil liberties obligations, are understood and managed",
                requirement: "ID.GV-3.1: Legal and regulatory requirements regarding information/cybersecurity, including privacy obligations, shall be understood and implemented.",
                guidance: "• Consider to identify and document applicable legal, regulatory, and contractual requirements and the organization's approach to meet these requirements for each information system and the organization.\n• Consider to implement appropriate procedures to ensure compliance with legislative, regulatory, and contractual requirements related to intellectual property rights and use of proprietary software products.\n• Consider to protect records against loss, destruction, falsification, unauthorized access, and unauthorized release, in accordance with legislative, regulatory, contractual, and business requirements."
            },
            {
                function: "IDENTIFY",
                category: "Governance (ID.GV)",
                keyMeasure: false,
                controlId: "ID.GV-4",
                controlName: "Governance and risk management processes address cybersecurity risks",
                requirement: "ID.GV-4.1: Governance and risk management processes shall address cybersecurity risks.",
                guidance: "• Consider integrating cybersecurity risk management into your organization's overall risk management processes.\n• Consider establishing a governance structure for cybersecurity, with clear roles and responsibilities.\n• Consider regular reporting on cybersecurity risks to senior management."
            },
            {
                function: "IDENTIFY",
                category: "Risk Assessment (ID.RA)",
                keyMeasure: false,
                controlId: "ID.RA-1",
                controlName: "Asset vulnerabilities are identified and documented",
                requirement: "ID.RA-1.1: Asset vulnerabilities shall be identified and documented.",
                guidance: "• Consider conducting regular vulnerability assessments of your organization's assets.\n• Consider documenting identified vulnerabilities and tracking their remediation.\n• Consider prioritizing vulnerabilities based on their potential impact and likelihood of exploitation."
            },
            {
                function: "IDENTIFY",
                category: "Risk Assessment (ID.RA)",
                keyMeasure: false,
                controlId: "ID.RA-5",
                controlName: "Threats, vulnerabilities, likelihoods, and impacts are used to determine risk",
                requirement: "ID.RA-5.1: Threats, vulnerabilities, likelihoods, and impacts shall be used to determine risk.",
                guidance: "• Consider using a risk assessment methodology that takes into account threats, vulnerabilities, likelihoods, and impacts.\n• Consider documenting the results of risk assessments and using them to inform security decisions.\n• Consider reviewing and updating risk assessments regularly."
            },
            // PROTECT (PR)
            {
                "function": "PROTECT",
                "category": "Identity Management, Authorization and Access Control (PR.AC)",
                "keyMeasure": true,
                "controlId": "PR.AC-1",
                "controlName": "Identities and credentials are issued, managed, verified, revoked, and audited for authorized devices, users, and processes.",
                "requirement": "PR.AC-1.1: Identities and credentials for authorized devices and users shall be managed. (Key measure)",
                "guidance": "Use a password policy (change defaults, avoid admin for daily tasks, maintain admin account list, require strong passwords, disable unused accounts) and group-based privilege management."
              },
              {
                "function": "PROTECT",
                "category": "Identity Management, Authorization and Access Control (PR.AC)",
                "keyMeasure": false,
                "controlId": "PR.AC-2",
                "controlName": "Physical access to assets is managed and protected.",
                "requirement": "PR.AC-2.1: Physical access to the facility, servers and network components shall be managed.",
                "guidance": "Secure keys, badges, and alarm codes; remove them promptly when employees leave; avoid leaving network ports accessible in public areas; log and restrict visitor access."
              },
              {
                "function": "PROTECT",
                "category": "Identity Management, Authorization and Access Control (PR.AC)",
                "keyMeasure": true,
                "controlId": "PR.AC-3",
                "controlName": "Remote access is managed.",
                "requirement": "PR.AC-3.1: The organisation's wireless access points shall be secured.\nPR.AC-3.2: The organization's networks when accessed remotely shall be secured, including through MFA. (Key measure)",
                "guidance": "Secure Wi-Fi (change default admin password, use WPA2/WPA3, separate guest network), avoid unsecured Wi-Fi, enforce MFA for remote systems (e.g. VPN, email, RDP)."
              },
              {
                "function": "PROTECT",
                "category": "Identity Management, Authorization and Access Control (PR.AC)",
                "keyMeasure": true,
                "controlId": "PR.AC-4",
                "controlName": "Access permissions and authorizations are managed, incorporating the principles of least privilege and separation of duties.",
                "requirement": "PR.AC-4.1: Access permissions for users shall be defined and managed. (Key measure)\nPR.AC-4.2: Identify who should have access to critical information and their means of access. (Key measure)\nPR.AC-4.3: Employees only get the access needed to do their jobs (Least Privilege). (Key measure)\nPR.AC-4.4: Nobody shall have administrator privileges for daily tasks. (Key measure)",
                "guidance": "Regularly review who has which access, enforce unique user accounts with strong passwords, separate admin vs. user accounts, revoke access immediately for departing staff."
              },
              {
                "function": "PROTECT",
                "category": "Identity Management, Authorization and Access Control (PR.AC)",
                "keyMeasure": true,
                "controlId": "PR.AC-5",
                "controlName": "Network integrity (network segregation, network segmentation…) is protected.",
                "requirement": "PR.AC-5.1: Firewalls shall be installed and activated on all the organization's networks. (Key measure)\nPR.AC-5.2: Where appropriate, network integrity of critical systems shall be protected by network segmentation and segregation. (Key measure)",
                "guidance": "Deploy firewalls at network boundaries and on devices (servers, desktops); consider minimizing the number of external access points to reduce exposure."
              },
              {
                "function": "PROTECT",
                "category": "Awareness and Training (PR.AT)",
                "keyMeasure": false,
                "controlId": "PR.AT-1",
                "controlName": "All users are informed and trained.",
                "requirement": "PR.AT-1.1: Employees shall be trained as appropriate.",
                "guidance": "Train everyone (including managers) on security policies and best practices upon hire and regularly; reinforce via ongoing awareness (e.g., phishing exercises)."
              },
              {
                "function": "PROTECT",
                "category": "Data Security (PR.DS)",
                "keyMeasure": false,
                "controlId": "PR.DS-1",
                "controlName": "Data-at-rest is protected.",
                "requirement": "No additional requirements for Basic; guidelines are provided to secure data at rest.",
                "guidance": "Consider encrypting sensitive data on storage media (laptops, USB, cloud), using tools like BitLocker or FileVault, and keep keys safe."
              },
              {
                "function": "PROTECT",
                "category": "Data Security (PR.DS)",
                "keyMeasure": false,
                "controlId": "PR.DS-2",
                "controlName": "Data-in-transit is protected.",
                "requirement": "No additional requirements for Basic; guidelines are provided to secure data in transit.",
                "guidance": "Encrypt sensitive documents or emails with supported tools; ensure secure channels (e.g. TLS) when transferring data over networks."
              },
              {
                "function": "PROTECT",
                "category": "Data Security (PR.DS)",
                "keyMeasure": false,
                "controlId": "PR.DS-3",
                "controlName": "Assets are formally managed throughout removal, transfers, and disposition.",
                "requirement": "PR.DS-3.1: Assets and media shall be disposed of safely.",
                "guidance": "Securely wipe or destroy data on retired devices (PCs, servers, disks, USB) before disposal; consider remote-wipe for laptops/mobile devices."
              },
              {
                "function": "PROTECT",
                "category": "Data Security (PR.DS)",
                "keyMeasure": false,
                "controlId": "PR.DS-7",
                "controlName": "The development and testing environment(s) are separate from the production environment.",
                "requirement": "No additional requirements for Basic; guidelines are provided to separate dev/test from production.",
                "guidance": "Test changes in a non-production environment first; adopt secure development lifecycle principles; avoid impacting live operations."
              },
              {
                "function": "PROTECT",
                "category": "Information Protection Processes and Procedures (PR.IP)",
                "keyMeasure": true,
                "controlId": "PR.IP-4",
                "controlName": "Backups of information are conducted, maintained, and tested.",
                "requirement": "PR.IP-4.1: Backups of business-critical data shall be conducted and stored separately. (Key measure)",
                "guidance": "Regularly back up critical data to a separate system or offline storage; consider frequency, retention, and testing to ensure recovery readiness."
              },
              {
                "function": "PROTECT",
                "category": "Information Protection Processes and Procedures (PR.IP)",
                "keyMeasure": false,
                "controlId": "PR.IP-11",
                "controlName": "Cybersecurity is included in human resources practices (deprovisioning, personnel screening…).",
                "requirement": "PR.IP-11.1: Personnel having access to the organization’s most critical information or technology shall be verified.",
                "guidance": "Screen individuals for sensitive roles, ensure background checks align with laws, and revoke access promptly upon role change or termination."
              },
              {
                "function": "PROTECT",
                "category": "Maintenance (PR.MA)",
                "keyMeasure": true,
                "controlId": "PR.MA-1",
                "controlName": "Maintenance and repair of organizational assets are performed and logged, with approved and controlled tools.",
                "requirement": "PR.MA-1.1: Patches and security updates for Operating Systems and critical system components shall be installed. (Key measure)",
                "guidance": "Install vendor-supported software only; apply patches promptly; dedicate time each month to check updates; use a patch-management tool if possible."
              },
              {
                "function": "PROTECT",
                "category": "Protective Technology (PR.PT)",
                "keyMeasure": true,
                "controlId": "PR.PT-1",
                "controlName": "Audit/log records are determined, documented, implemented, and reviewed in accordance with policy.",
                "requirement": "PR.PT-1.1: Logs shall be maintained, documented, and reviewed. (Key measure)",
                "guidance": "Enable logging on security solutions (firewalls, AV), store logs securely, review them for anomalies (e.g. unusual activity) and keep them for a set period."
              },
              {
                "function": "PROTECT",
                "category": "Protective Technology (PR.PT)",
                "keyMeasure": false,
                "controlId": "PR.PT-4",
                "controlName": "Communications and control networks are protected.",
                "requirement": "PR.PT-4.1: Web and e-mail filters shall be installed and used.",
                "guidance": "Deploy email filters to detect malicious attachments or links, configure web filters to block known-malicious sites, and keep these filters up to date."
              },
            // DETECT (DE)
            {
                "function": "DETECT",
                "category": "Anomalies and Events (DE.AE)",
                "keyMeasure": true,
                "controlId": "DE.AE-3",
                "controlName": "Event data are collected and correlated from multiple sources and sensors.",
                "requirement": "DE.AE-3.1: Activity logging (firewalls, anti-virus) shall be enabled, backed up, and reviewed. (Key measure)",
                "guidance": "Store logs for a defined period and review them for anomalies (e.g., high social media use or frequent malware detections) to spot potential problems or needed protections."
              },
              {
                "function": "DETECT",
                "category": "Security Continuous Monitoring (DE.CM)",
                "keyMeasure": false,
                "controlId": "DE.CM-1",
                "controlName": "The network is monitored to detect potential cybersecurity events.",
                "requirement": "DE.CM-1.1: Firewalls shall be installed and operated at network boundaries, complemented by firewall protection on endpoints.",
                "guidance": "Deploy firewalls at internet gateways and on devices (servers, desktops); consider minimizing the number of external access points to reduce exposure."
              },
              {
                "function": "DETECT",
                "category": "Security Continuous Monitoring (DE.CM)",
                "keyMeasure": false,
                "controlId": "DE.CM-3",
                "controlName": "Personnel activity is monitored to detect potential cybersecurity events.",
                "requirement": "DE.CM-3.1: Implement endpoint/network protection tools to track dangerous user behaviors.",
                "guidance": "Consider using Intrusion Detection/Prevention Systems (IDS/IPS) to identify and block suspicious activity from end-user devices."
              },
              {
                "function": "DETECT",
                "category": "Security Continuous Monitoring (DE.CM)",
                "keyMeasure": true,
                "controlId": "DE.CM-4",
                "controlName": "Malicious code is detected.",
                "requirement": "DE.CM-4.1: Anti-virus, anti-spyware, and other anti-malware software shall be installed and updated. (Key measure)",
                "guidance": "Install and regularly update malware protection on all devices; schedule real-time or frequent scans, and consider coverage for telework or BYOD systems."
              },
            // RESPOND (RS)
            {
                "function": "RESPOND",
                "category": "Response Planning (RS.RP)",
                "keyMeasure": false,
                "controlId": "RS.RP-1",
                "controlName": "Response plan is executed during or after an incident.",
                "requirement": "RS.RP-1.1: An incident response process, including roles, responsibilities, and authorities, shall be executed during or after an information/cybersecurity event on the organization's critical systems.",
                "guidance": "Develop a documented process with roles, responsibilities, and instructions to detect, respond to, and limit consequences of a malicious cyberattack; identify who decides on recovery and who contacts external stakeholders."
              },
              {
                "function": "RESPOND",
                "category": "Communications (RS.CO)",
                "keyMeasure": false,
                "controlId": "RS.CO-3",
                "controlName": "Information is shared consistent with response plans.",
                "requirement": "RS.CO-3.1: Information/cybersecurity incident information shall be communicated and shared with employees in an understandable format.",
                "guidance": "Notify staff about incidents with clear details (what happened, potential impact, steps to take) to ensure they can respond appropriately and maintain awareness."
              },
              {
                "function": "RESPOND",
                "category": "Improvements (RS.IM)",
                "keyMeasure": false,
                "controlId": "RS.IM-1",
                "controlName": "Response plans incorporate lessons learned.",
                "requirement": "RS.IM-1.1: The organization shall conduct post-incident evaluations to analyze lessons learned and improve processes, procedures, and technologies.",
                "guidance": "Bring involved personnel together after an incident to review actions taken, identify root causes, and adapt security measures to prevent recurrence and strengthen resilience."
              },
            // RECOVER (RC)
            {
                function: "RECOVER",
                category: "Recovery Planning (RC.RP)",
                keyMeasure: false,
                controlId: "RC.RP-1",
                controlName: "Recovery plan is executed during or after a cybersecurity incident",
                requirement: "RC.RP-1.1: The organization shall execute its recovery plan during or after a cybersecurity incident.",
                guidance: "• Consider developing a recovery plan that outlines the steps to restore systems and data after an incident.\n• Consider testing the recovery plan regularly to ensure it is effective.\n• Consider updating the recovery plan based on lessons learned from incidents and exercises."
            }
        ],
        
        // Niveau IMPORTANT
        IMPORTANT: [
            // IDENTIFY (ID)
            {
                "function": "IDENTIFY",
                "category": "Asset Management (ID.AM)",
                "keyMeasure": false,
                "controlId": "ID.AM-1",
                "controlName": "Physical devices and systems used within the organization are inventoried.",
                "requirement": "ID.AM-1.1: Document, review, and update an inventory of assets; quarantine or remove unauthorized hardware.",
                "guidance": "Maintain an up-to-date hardware inventory with device details (type, model, location); remove unsupported or unauthorized devices promptly."
              },
              {
                "function": "IDENTIFY",
                "category": "Asset Management (ID.AM)",
                "keyMeasure": false,
                "controlId": "ID.AM-2",
                "controlName": "Software platforms and applications used within the organization are inventoried.",
                "requirement": "ID.AM-2.1: Maintain and update a software inventory including responsible owners; quarantine or replace unauthorized software.",
                "guidance": "List all software (name, version, purpose), distinguish unsupported vs. unauthorized, and remove or replace any unauthorized software."
              },
              {
                "function": "IDENTIFY",
                "category": "Asset Management (ID.AM)",
                "keyMeasure": false,
                "controlId": "ID.AM-3",
                "controlName": "Organizational communication and data flows are mapped.",
                "requirement": "ID.AM-3.1: Identify and map stored data; ID.AM-3.2: Document all connections in ICT/OT environment, update changes.",
                "guidance": "List all data types, link them to assets, and document every network connection with details (ports, protocols, addresses) for clarity and control."
              },
              {
                "function": "IDENTIFY",
                "category": "Asset Management (ID.AM)",
                "keyMeasure": false,
                "controlId": "ID.AM-4",
                "controlName": "External information systems are catalogued.",
                "requirement": "ID.AM-4.1: Map, document, authorize, and update external services and their connections as they change.",
                "guidance": "Catalog all external systems (e.g., cloud, SaaS, hosting) and explicitly approve each connection; keep records updated to avoid unknown endpoints."
              },
              {
                "function": "IDENTIFY",
                "category": "Asset Management (ID.AM)",
                "keyMeasure": false,
                "controlId": "ID.AM-5",
                "controlName": "Resources are prioritized based on their classification, criticality, and business value.",
                "requirement": "ID.AM-5.1: Classify and rank resources (devices, data, personnel, etc.) by criticality and potential impact if compromised.",
                "guidance": "Define categories (public, internal, confidential), assess impact on confidentiality, integrity, and availability, and prioritize protection accordingly."
              },
              {
                "function": "IDENTIFY",
                "category": "Asset Management (ID.AM)",
                "keyMeasure": true,
                "controlId": "ID.AM-6",
                "controlName": "Cybersecurity roles, responsibilities, and authorities for the entire workforce and third-party stakeholders are established.",
                "requirement": "ID.AM-6.1: Document, approve, and update roles/responsibilities for security, including third parties. (Key measure)",
                "guidance": "Define who is accountable for each cybersecurity function; align roles with internal structures and external partners having system access."
              },
              {
                "function": "IDENTIFY",
                "category": "Business Environment (ID.BE)",
                "keyMeasure": false,
                "controlId": "ID.BE-1",
                "controlName": "The organization’s role in the supply chain is identified and communicated.",
                "requirement": "ID.BE-1.1: Document and communicate the organization’s upstream and downstream position in the supply chain.",
                "guidance": "Identify suppliers and customers critical to operations; clarify your role to each, ensuring they understand your significance and dependencies."
              },
              {
                "function": "IDENTIFY",
                "category": "Business Environment (ID.BE)",
                "keyMeasure": false,
                "controlId": "ID.BE-2",
                "controlName": "The organization’s place in critical infrastructure and its industry sector is identified and communicated.",
                "requirement": "ID.BE-2.1: Determine and share your status as part of critical infrastructure or a regulated sector.",
                "guidance": "If subject to NIS or similar legislation, identify relevant sector obligations; coordinate with others in the same sector for compliance."
              },
              {
                "function": "IDENTIFY",
                "category": "Business Environment (ID.BE)",
                "keyMeasure": false,
                "controlId": "ID.BE-3",
                "controlName": "Priorities regarding organizational mission, objectives, and activities are established and communicated.",
                "requirement": "ID.BE-3.1: Define and disseminate mission-critical objectives, ensuring cybersecurity measures align with them.",
                "guidance": "Identify key business goals and clarify how information protection needs support those goals; adjust processes as necessary."
              },
              {
                "function": "IDENTIFY",
                "category": "Business Environment (ID.BE)",
                "keyMeasure": false,
                "controlId": "ID.BE-4",
                "controlName": "Dependencies and critical functions for delivery of critical services are established.",
                "requirement": "ID.BE-4.1: Identify and prioritize dependencies and critical functions within risk assessments to ensure service continuity.",
                "guidance": "Include supportive services (logistics, IT, utilities) in your dependency list; evaluate potential business impact if they fail."
              },
              {
                "function": "IDENTIFY",
                "category": "Business Environment (ID.BE)",
                "keyMeasure": false,
                "controlId": "ID.BE-5",
                "controlName": "Resilience requirements to support delivery of critical services are established for all operating states.",
                "requirement": "ID.BE-5.1: Identify, document, and test resilience needs (normal, under attack, recovery) for critical services.",
                "guidance": "Use BIA, DRP, and BCP to define resilience mechanisms like failsafe or load balancing; test them to ensure readiness."
              },
              {
                "function": "IDENTIFY",
                "category": "Governance (ID.GV)",
                "keyMeasure": false,
                "controlId": "ID.GV-1",
                "controlName": "Organizational cybersecurity policy is established and communicated.",
                "requirement": "ID.GV-1.1: Create, approve, and update cybersecurity policies; ensure employees and stakeholders are informed.",
                "guidance": "Develop clear policies for expected security practices; review annually or after major changes, and train staff on updates."
              },
              {
                "function": "IDENTIFY",
                "category": "Governance (ID.GV)",
                "keyMeasure": false,
                "controlId": "ID.GV-3",
                "controlName": "Legal and regulatory requirements regarding cybersecurity, including privacy and civil liberties obligations, are understood and managed.",
                "requirement": "ID.GV-3.1: Understand and implement relevant cybersecurity/privacy regulations; review compliance regularly.",
                "guidance": "Identify applicable laws (GDPR, sector mandates) and integrate them into policies; ensure third-party compliance as well."
              },
              {
                "function": "IDENTIFY",
                "category": "Governance (ID.GV)",
                "keyMeasure": false,
                "controlId": "ID.GV-4",
                "controlName": "Governance and risk management processes address cybersecurity risks.",
                "requirement": "ID.GV-4.1: Develop a risk-focused cybersecurity strategy; ID.GV-4.2: Document and approve identified risks.",
                "guidance": "Allocate resources to protect key assets; record cybersecurity risks, their owners, and track mitigation efforts."
              },
              {
                "function": "IDENTIFY",
                "category": "Risk Assessment (ID.RA)",
                "keyMeasure": false,
                "controlId": "ID.RA-1",
                "controlName": "Asset vulnerabilities are identified and documented.",
                "requirement": "ID.RA-1.1: Identify threats and vulnerabilities; ID.RA-1.2: Continuously monitor and document critical systems' weaknesses.",
                "guidance": "Set up a program (scans/tests) to detect vulnerabilities in hardware/software, track them, and link them to potential threats."
              },
              {
                "function": "IDENTIFY",
                "category": "Risk Assessment (ID.RA)",
                "keyMeasure": false,
                "controlId": "ID.RA-2",
                "controlName": "Cyber threat intelligence is received from information sharing forums and sources.",
                "requirement": "ID.RA-2.1: Implement a threat/vulnerability awareness program that includes exchanging intelligence with security communities.",
                "guidance": "Join relevant security forums, subscribe to threat feeds, and share incident details with peers to bolster collective defenses."
              },
              {
                "function": "IDENTIFY",
                "category": "Risk Assessment (ID.RA)",
                "keyMeasure": false,
                "controlId": "ID.RA-5",
                "controlName": "Threats, vulnerabilities, likelihoods, and impacts are used to determine risk.",
                "requirement": "ID.RA-5.1: Perform risk assessments considering threats, vulnerabilities, impacts, and likelihood; document results.",
                "guidance": "Use a structured approach (qualitative/quantitative) to estimate risk levels; incorporate insider/external threats; guide prioritization."
              },
              {
                "function": "IDENTIFY",
                "category": "Risk Assessment (ID.RA)",
                "keyMeasure": false,
                "controlId": "ID.RA-6",
                "controlName": "Risk responses are identified and prioritized.",
                "requirement": "ID.RA-6.1: Develop a comprehensive strategy, prioritizing risk responses for critical threats and vulnerabilities.",
                "guidance": "Involve management and staff, identify top risks, define how to mitigate them, and outline clear responsibilities for implementation."
              },
              {
                "function": "IDENTIFY",
                "category": "Risk Management (ID.RM)",
                "keyMeasure": false,
                "controlId": "ID.RM-1",
                "controlName": "Risk management processes are established, managed, and agreed to by organizational stakeholders.",
                "requirement": "ID.RM-1.1: Create a cyber risk management process engaging internal/external stakeholders; review and update it as needed.",
                "guidance": "Define how risk info flows, who must be consulted, and how decisions are made; revise after major changes or annually."
              },
              {
                "function": "IDENTIFY",
                "category": "Risk Management (ID.RM)",
                "keyMeasure": false,
                "controlId": "ID.RM-2",
                "controlName": "Organizational risk tolerance is determined and clearly expressed.",
                "requirement": "ID.RM-2.1: Establish and document risk appetite aligned with cybersecurity policies and business needs.",
                "guidance": "Define acceptable risk levels (e.g., minimal downtime, no major data loss), share them with stakeholders, and review periodically."
              },
              {
                "function": "IDENTIFY",
                "category": "Risk Management (ID.RM)",
                "keyMeasure": false,
                "controlId": "ID.RM-3",
                "controlName": "The organization’s determination of risk tolerance is informed by its role in critical infrastructure and sector specific risk analysis.",
                "requirement": "ID.RM-3.1: Adjust risk appetite considering sector-specific guidance if part of critical infrastructure.",
                "guidance": "If designated as essential or part of critical infrastructure, adopt stricter measures reflecting broader societal impact."
              },
              {
                "function": "IDENTIFY",
                "category": "Supply Chain Risk Management (ID.SC)",
                "keyMeasure": false,
                "controlId": "ID.SC-2",
                "controlName": "Suppliers and third-party partners of information systems, components, and services are identified, prioritized, and assessed using a cyber supply chain risk assessment process.",
                "requirement": "ID.SC-2.1: Conduct supply chain risk assessments at least annually or when major changes occur; document and share results.",
                "guidance": "Focus on critical suppliers/partners, evaluate security posture, and address potential impacts on your operations; keep records updated."
              },
              {
                "function": "IDENTIFY",
                "category": "Supply Chain Risk Management (ID.SC)",
                "keyMeasure": false,
                "controlId": "ID.SC-3",
                "controlName": "Contracts with suppliers and third-party partners are used to implement appropriate measures designed to meet the objectives of an organization’s cybersecurity program and Cyber Supply Chain Risk Management Plan.",
                "requirement": "ID.SC-3.1: Incorporate security clauses in contracts (e.g. data protection, incident reporting) based on supply chain risk results.",
                "guidance": "Ensure business-critical suppliers address confidentiality, integrity, and availability; align with GDPR if personal data is involved."
              },
              {
                "function": "IDENTIFY",
                "category": "Supply Chain Risk Management (ID.SC)",
                "keyMeasure": false,
                "controlId": "ID.SC-4",
                "controlName": "Suppliers and third-party partners are routinely assessed using audits, test results, or other forms of evaluations to confirm they are meeting their contractual obligations.",
                "requirement": "ID.SC-4.1: Periodically assess supplier compliance (e.g. audits, certifications) with security obligations; focus on critical partners.",
                "guidance": "Request evidence of compliance (reports, certifications); follow up on findings; ensure high-risk suppliers implement corrective actions."
              },
              {
                "function": "IDENTIFY",
                "category": "Supply Chain Risk Management (ID.SC)",
                "keyMeasure": false,
                "controlId": "ID.SC-5",
                "controlName": "Response and recovery planning and testing are conducted with suppliers and third-party providers.",
                "requirement": "ID.SC-5.1: Include key supplier personnel in response/recovery planning and exercises, especially for business-critical partners.",
                "guidance": "Share incident and recovery procedures, contact lists, and escalation paths; test them together to ensure coordinated response in emergencies."
              },
            // PROTECT (PR)
            {
                "function": "PROTECT",
                "category": "Identity Management, Authentication and Access Control (PR.AC)",
                "keyMeasure": true,
                "controlId": "PR.AC-1",
                "controlName": "Identities and credentials are issued, managed, verified, revoked, and audited for authorized devices, users, and processes.",
                "requirement": "PR.AC-1.1: Identities and credentials for authorized devices and users shall be managed. (Key measure)\nPR.AC-1.2: Identities and credentials for authorized devices and users shall be managed, where feasible through automated mechanisms.",
                "guidance": "Identities and credentials for authorized devices and users could be managed through a password policy. A password policy is a set of rules designed to enhance ICT/OT security by encouraging the organization to:\n• Change all default passwords.\n• Ensure that no one works with administrator privileges for daily tasks.\n• Keep a limited and updated list of system administrator accounts.\n• Enforce password rules (e.g. sufficiently long with character variety) and change them periodically or upon suspicion of compromise.\n• Use only individual accounts and never share passwords.\n• Immediately disable unused accounts.\n• Manage rights and privileges by user groups.\nWhere feasible, automated mechanisms can help manage and audit credentials (e.g., strong authentication)."
              },
              {
                "function": "PROTECT",
                "category": "Identity Management, Authentication and Access Control (PR.AC)",
                "keyMeasure": false,
                "controlId": "PR.AC-2",
                "controlName": "Physical access to assets is managed and protected.",
                "requirement": "PR.AC-2.1: Physical access to the facility, servers, and network components shall be managed.\nPR.AC-2.2: The management of physical access shall include measures related to access in emergency situations.",
                "guidance": "Consider strictly managing keys, badges, and alarm codes. Retrieve keys or badges immediately when an employee leaves the organization. Change alarm codes frequently. Avoid giving out permanent codes or keys to external service providers unless access is traceable and restricted by time. Do not leave network ports accessible in public areas.\nImplement visitor logs, camera surveillance, or escort requirements as appropriate. Restrict access to servers and network components (e.g., locked rooms or cabinets)."
              },
              {
                "function": "PROTECT",
                "category": "Identity Management, Authentication and Access Control (PR.AC)",
                "keyMeasure": true,
                "controlId": "PR.AC-3",
                "controlName": "Remote access is managed.",
                "requirement": "PR.AC-3.1: The organization’s wireless access points shall be secured.\nPR.AC-3.2: Usage restrictions, connection requirements, and authorizations for remote access to the organization's critical systems shall be identified, documented, and implemented. (Key measure)\nPR.AC-3.3: The organization's networks when accessed remotely shall be secured, including through MFA.",
                "guidance": "• When using wireless networks, change default admin passwords, disable SSID broadcast if feasible, use WPA2/WPA3 with AES, and separate guest access from the business network.\n• For remote access, use strong (multi-factor) authentication on internet-facing systems, such as email, remote desktop, VPNs. Approve and log remote maintenance sessions.\n• Ensure users are visibly notified if a remote session is active. Align remote login credentials with company authentication policy."
              },
              {
                "function": "PROTECT",
                "category": "Identity Management, Authentication and Access Control (PR.AC)",
                "keyMeasure": true,
                "controlId": "PR.AC-4",
                "controlName": "Access permissions and authorizations are managed, incorporating the principles of least privilege and separation of duties.",
                "requirement": "PR.AC-4.1: Access permissions for users to the organization’s systems shall be defined and managed. (Key measure)\nPR.AC-4.2: Employee access to data/information is limited to what is necessary for their job (Least Privilege). (Key measure)\nPR.AC-4.3: Separation of duties shall be enforced.\nPR.AC-4.4: Nobody shall have administrator privileges for daily tasks. (Key measure)\nPR.AC-4.5: Privileged users shall be managed and monitored.",
                "guidance": "Create and regularly review access lists to determine who needs privileged or non-privileged access to which systems. Maintain separate accounts for administrators (no internet browsing with admin accounts). Immediately disable access for users who have left the organization or changed roles. Use group-based permissions where possible. Enforce the principle of least privilege to ensure employees only have the minimum access rights required. Enforce separation of duties so that no single individual can control all aspects of a critical transaction. Monitor privileged accounts and keep an updated list of system administrators."
              },
              {
                "function": "PROTECT",
                "category": "Identity Management, Authentication and Access Control (PR.AC)",
                "keyMeasure": true,
                "controlId": "PR.AC-5",
                "controlName": "Network integrity (network segregation, network segmentation…) is protected.",
                "requirement": "PR.AC-5.1: Firewalls shall be installed and activated on all the organization's networks. (Key measure)\nPR.AC-5.2: Where appropriate, network segmentation and segregation measures shall be in place. (Key measure)\nPR.AC-5.3: The organization shall monitor and control connections and communications at the external boundary and key internal boundaries.",
                "guidance": "Install and operate a firewall between your internal network and the internet. Use a closed (deny-all) policy and only open required services. Consider intrusion detection/prevention systems. Segment networks according to business function or risk level (e.g., VLANs, DMZ, internal segments). Limit external connections and use a VPN for secure remote communication. Separate guest/public Wi-Fi from internal networks."
              },
              {
                "function": "PROTECT",
                "category": "Identity Management, Authentication and Access Control (PR.AC)",
                "keyMeasure": false,
                "controlId": "PR.AC-6",
                "controlName": "Identities are proofed and bound to credentials and asserted in interactions.",
                "requirement": "PR.AC-6.1: Implement documented procedures for verifying the identity of individuals before issuing credentials that provide system access.",
                "guidance": "Before provisioning credentials or accounts, verify user identity (e.g., official ID, HR records). Formalize the process in writing and ensure it is consistently applied. Consider multi-factor authentication for higher-risk accounts or systems."
              },
              {
                "function": "PROTECT",
                "category": "Identity Management, Authentication and Access Control (PR.AC)",
                "keyMeasure": false,
                "controlId": "PR.AC-7",
                "controlName": "Identities are proofed, bound to credentials and asserted in interactions.",
                "requirement": "PR.AC-7.1: Perform a documented risk assessment for critical system transactions and authenticate users/devices commensurate with that risk (e.g. single-factor or multi-factor).",
                "guidance": "Use a security-by-design approach for new systems. For existing systems, conduct a separate risk assessment to determine appropriate authentication strength (e.g., multi-factor for privileged actions)."
              },
              {
                "function": "PROTECT",
                "category": "Awareness and Training (PR.AT)",
                "keyMeasure": false,
                "controlId": "PR.AT-1",
                "controlName": "All users are informed and trained.",
                "requirement": "PR.AT-1.1: Employees shall be trained as appropriate.",
                "guidance": "Train all users (including managers) when hired and periodically thereafter on the organization’s security policies, secure practices (e.g., recognizing phishing, managing passwords), and incident reporting procedures. Continually update training and reinforce it with awareness campaigns or drills."
              },
              {
                "function": "PROTECT",
                "category": "Awareness and Training (PR.AT)",
                "keyMeasure": false,
                "controlId": "PR.AT-2",
                "controlName": "Privileged users understand their roles and responsibilities.",
                "requirement": "PR.AT-2.1: Privileged users shall be qualified before privileges are granted, demonstrating their understanding of roles, responsibilities, and authorities.",
                "guidance": "Ensure that privileged users receive specialized training tailored to their elevated access. They should understand the scope of their privileges and the need to protect critical systems from misuse or error."
              },
              {
                "function": "PROTECT",
                "category": "Awareness and Training (PR.AT)",
                "keyMeasure": false,
                "controlId": "PR.AT-3",
                "controlName": "Third-party stakeholders (e.g., suppliers, customers, partners) understand their roles and responsibilities.",
                "requirement": "PR.AT-3.1: Security requirements for business-critical third-party stakeholders with physical/logical access to systems shall be established and enforced.",
                "guidance": "Communicate to third parties (e.g., contractors, suppliers) your security policies and expectations. Require them to notify the organization of any personnel changes impacting access, and have them attest that their staff understand the security obligations."
              },
              {
                "function": "PROTECT",
                "category": "Awareness and Training (PR.AT)",
                "keyMeasure": false,
                "controlId": "PR.AT-4",
                "controlName": "Senior executives understand their roles and responsibilities.",
                "requirement": "PR.AT-4.1: Senior executives shall demonstrate understanding and accountability for managing cybersecurity risk.",
                "guidance": "Executives should receive regular briefings on top risks, mitigation activities, and resource requirements. They must ensure the organization's cybersecurity strategy aligns with overall business objectives."
              },
              {
                "function": "PROTECT",
                "category": "Awareness and Training (PR.AT)",
                "keyMeasure": false,
                "controlId": "PR.AT-5",
                "controlName": "Physical and cybersecurity personnel understand their roles and responsibilities.",
                "requirement": "PR.AT-5.1: Physical security teams and cybersecurity teams shall be trained and informed about their respective duties, emphasizing collaboration and information sharing.",
                "guidance": "Encourage close cooperation between physical security staff and cybersecurity staff to handle events holistically. For instance, if a physical breach is detected, the cybersecurity team must be alerted to possible digital compromise, and vice versa."
              },
              {
                "function": "PROTECT",
                "category": "Data Security (PR.DS)",
                "keyMeasure": false,
                "controlId": "PR.DS-1",
                "controlName": "Data-at-rest is protected.",
                "requirement": "PR.DS-1.1: Sensitive data-at-rest shall be protected.",
                "guidance": "Consider using encryption techniques for data storage (servers, workstations, mobile devices, and removable media). Use full-disk encryption (e.g., BitLocker, FileVault) or file-level encryption for sensitive data. When storing sensitive data in the cloud, ensure robust encryption and key management."
              },
              {
                "function": "PROTECT",
                "category": "Data Security (PR.DS)",
                "keyMeasure": false,
                "controlId": "PR.DS-2",
                "controlName": "Data-in-transit is protected.",
                "requirement": "PR.DS-2.1: Sensitive data in transit shall be protected.",
                "guidance": "Use secure transmission protocols (e.g., TLS) for emails, file transfers, or web access involving sensitive data. When sending highly sensitive documents or communications, encrypt them with approved tools. Avoid sending unencrypted emails or attachments containing confidential information."
              },
              {
                "function": "PROTECT",
                "category": "Data Security (PR.DS)",
                "keyMeasure": false,
                "controlId": "PR.DS-3",
                "controlName": "Assets are formally managed throughout removal, transfers, and disposition.",
                "requirement": "PR.DS-3.1: Media and devices shall be disposed of safely, ensuring data destruction or sanitization prior to removal.",
                "guidance": "When retiring computers, servers, or storage media, securely wipe or destroy all data. If reusing devices, properly overwrite or degauss the storage. Consider remote-wiping solutions for mobile devices. Log asset transfers and removals to maintain accountability."
              },
              {
                "function": "PROTECT",
                "category": "Data Security (PR.DS)",
                "keyMeasure": false,
                "controlId": "PR.DS-4",
                "controlName": "Adequate capacity to ensure availability is maintained.",
                "requirement": "PR.DS-4.1: Capacity planning shall ensure adequate resources for critical operations.",
                "guidance": "Monitor resource usage (e.g., storage, CPU, bandwidth) and forecast demand to avoid disruptions. Plan for scalability and consider load-balancing or failover solutions for critical services."
              },
              {
                "function": "PROTECT",
                "category": "Data Security (PR.DS)",
                "keyMeasure": true,
                "controlId": "PR.DS-5",
                "controlName": "Protections against data leaks are implemented.",
                "requirement": "PR.DS-5.1: Monitor critical information to detect potential data leakage.",
                "guidance": "Implement Data Loss Prevention (DLP) solutions to monitor sensitive data movements (email, uploads, printing). Restrict or log mass-transfer of sensitive files. Regularly review alerts and investigate anomalies."
              },
              {
                "function": "PROTECT",
                "category": "Data Security (PR.DS)",
                "keyMeasure": false,
                "controlId": "PR.DS-6",
                "controlName": "Integrity checking mechanisms are used to verify software, firmware, and information integrity.",
                "requirement": "PR.DS-6.1: Mechanisms (e.g., checksums, digital signatures) shall be in place to verify integrity.",
                "guidance": "Use cryptographic checksums or digital signatures for critical software/firmware updates. Maintain a process to validate the authenticity and integrity of patches or files before installation."
              },
              {
                "function": "PROTECT",
                "category": "Data Security (PR.DS)",
                "keyMeasure": false,
                "controlId": "PR.DS-7",
                "controlName": "The development and testing environment(s) are separate from the production environment.",
                "requirement": "PR.DS-7.1: Production and non-production environments shall be segregated to reduce risk of unauthorized access or data loss.",
                "guidance": "Avoid using production data in testing unless anonymized or masked. Enforce access controls so that development staff cannot directly alter live systems. Use separate credentials and networks for test vs. production."
              },
              {
                "function": "PROTECT",
                "category": "Information Protection Processes and Procedures (PR.IP)",
                "keyMeasure": false,
                "controlId": "PR.IP-1",
                "controlName": "A baseline configuration of information technology/industrial control systems is created and maintained incorporating security principles.",
                "requirement": "PR.IP-1.1: A secure baseline configuration shall be established and maintained.",
                "guidance": "Document standard builds for operating systems, applications, and network devices. Include mandatory security settings (e.g., patches, configurations). Regularly review and update baselines to address new threats or system changes."
              },
              {
                "function": "PROTECT",
                "category": "Information Protection Processes and Procedures (PR.IP)",
                "keyMeasure": false,
                "controlId": "PR.IP-2",
                "controlName": "A System Development Life Cycle to manage systems is implemented.",
                "requirement": "PR.IP-2.1: The organization shall integrate security into the entire system development life cycle.",
                "guidance": "Apply security-by-design principles. For each development phase, address relevant security tasks (threat modeling, code reviews, testing). Maintain documentation and approval gates before moving to the next phase."
              },
              {
                "function": "PROTECT",
                "category": "Information Protection Processes and Procedures (PR.IP)",
                "keyMeasure": false,
                "controlId": "PR.IP-3",
                "controlName": "Configuration change control processes are in place.",
                "requirement": "PR.IP-3.1: Changes to business-critical systems shall be tracked, reviewed, tested, and approved.",
                "guidance": "Maintain a change management policy. Document requests, approvals, and implementation steps. Test changes in a non-production environment first to detect potential security or functional issues."
              },
              {
                "function": "PROTECT",
                "category": "Information Protection Processes and Procedures (PR.IP)",
                "keyMeasure": false,
                "controlId": "PR.IP-4",
                "controlName": "Backups of information are conducted, maintained, and tested.",
                "requirement": "PR.IP-4.1: Regular backups shall be performed and securely stored.\nPR.IP-4.2: Restore procedures shall be tested periodically.",
                "guidance": "Back up critical data frequently and store copies offsite or in the cloud with proper encryption. Test your ability to restore from backups to ensure data integrity and continuity of operations."
              },
              {
                "function": "PROTECT",
                "category": "Information Protection Processes and Procedures (PR.IP)",
                "keyMeasure": false,
                "controlId": "PR.IP-5",
                "controlName": "Policy and regulations regarding the physical operating environment for organizational assets are met.",
                "requirement": "PR.IP-5.1: The organization shall ensure compliance with relevant policies/regulations for the physical environment of assets (temperature, humidity, secure location).",
                "guidance": "Implement controls to keep server rooms at recommended temperature/humidity. Secure critical facilities from natural hazards or water leaks. Regularly inspect sites, keep them locked or monitored to prevent tampering."
              },
              {
                "function": "PROTECT",
                "category": "Information Protection Processes and Procedures (PR.IP)",
                "keyMeasure": false,
                "controlId": "PR.IP-6",
                "controlName": "Data is destroyed according to policy.",
                "requirement": "PR.IP-6.1: Data destruction or sanitization processes shall follow documented policies.",
                "guidance": "Define retention periods for different data types. When data exceeds its retention period or is no longer needed, securely wipe or destroy it. Ensure all copies, including backups, are also disposed of properly."
              },
              {
                "function": "PROTECT",
                "category": "Information Protection Processes and Procedures (PR.IP)",
                "keyMeasure": false,
                "controlId": "PR.IP-7",
                "controlName": "Protection processes are improved.",
                "requirement": "PR.IP-7.1: The organization shall periodically assess and update its protection processes based on new threats or lessons learned.",
                "guidance": "Review and revise protective measures after incidents, near-misses, or external threat updates. Conduct periodic gap analyses to identify areas for improvement in policies, configurations, or training."
              },
              {
                "function": "PROTECT",
                "category": "Information Protection Processes and Procedures (PR.IP)",
                "keyMeasure": false,
                "controlId": "PR.IP-8",
                "controlName": "Effectiveness of protection technologies is shared.",
                "requirement": "PR.IP-8.1: The organization shall measure and communicate the effectiveness of its protection technologies.",
                "guidance": "Share metrics (e.g., number of blocked attacks, patch status) with relevant stakeholders, including leadership. If appropriate, exchange best practices or intelligence with industry peers to improve collective defense."
              },
              {
                "function": "PROTECT",
                "category": "Information Protection Processes and Procedures (PR.IP)",
                "keyMeasure": false,
                "controlId": "PR.IP-9",
                "controlName": "Response plans (Incident Response and Business Continuity) and recovery plans (Incident Recovery and Disaster Recovery) are in place and managed.",
                "requirement": "PR.IP-9.1: Incident Response, Business Continuity, and Disaster Recovery plans shall be defined and maintained.\nPR.IP-9.2: These plans shall be tested periodically.",
                "guidance": "Document incident handling procedures, define communication channels, and identify decision-makers. Have backup resources in place (people, facilities, technology) to ensure critical operations continue. Conduct tabletop or live exercises to validate plan effectiveness."
              },
              {
                "function": "PROTECT",
                "category": "Information Protection Processes and Procedures (PR.IP)",
                "keyMeasure": false,
                "controlId": "PR.IP-11",
                "controlName": "Cybersecurity is included in human resources practices (deprovisioning, personnel screening…).",
                "requirement": "PR.IP-11.1: HR processes shall integrate cybersecurity aspects (e.g., background checks, exit processes).",
                "guidance": "Screen employees in sensitive positions according to legal requirements. When an employee leaves or changes roles, immediately revoke access, collect badges/devices, and update relevant systems. Clearly define security responsibilities in job descriptions."
              },
              {
                "function": "PROTECT",
                "category": "Information Protection Processes and Procedures (PR.IP)",
                "keyMeasure": false,
                "controlId": "PR.IP-12",
                "controlName": "A vulnerability management plan is developed and implemented.",
                "requirement": "PR.IP-12.1: The organization shall develop, document, and implement a process for identifying and remediating vulnerabilities.",
                "guidance": "Regularly scan systems for vulnerabilities and track remediation actions. Have a clear timeline for patching critical flaws. Consider an internal or external bug bounty program or responsible disclosure policy."
              },
              {
                "function": "PROTECT",
                "category": "Maintenance (PR.MA)",
                "keyMeasure": false,
                "controlId": "PR.MA-1",
                "controlName": "Maintenance and repair of organizational assets are performed and logged, with approved and controlled tools.",
                "requirement": "PR.MA-1.1: Maintenance and repair activities shall be authorized, logged, and use controlled tools.",
                "guidance": "Restrict maintenance to authorized personnel with the correct privileges. Keep an audit trail of maintenance actions. Ensure that any repair tools or replacement parts come from trusted sources and meet security requirements."
              },
              {
                "function": "PROTECT",
                "category": "Maintenance (PR.MA)",
                "keyMeasure": false,
                "controlId": "PR.MA-2",
                "controlName": "Remote maintenance of organizational assets is approved, logged, and performed in a manner that prevents unauthorized access.",
                "requirement": "PR.MA-2.1: Remote maintenance sessions shall be approved, monitored, and logged to prevent misuse.",
                "guidance": "Use secure protocols and multi-factor authentication for remote maintenance. Provide temporary credentials that expire after the session. Log all actions taken remotely for auditing. Alert system owners when remote sessions are active."
              },
              {
                "function": "PROTECT",
                "category": "Protective Technology (PR.PT)",
                "keyMeasure": false,
                "controlId": "PR.PT-1",
                "controlName": "Audit/log records are determined, documented, implemented, and reviewed in accordance with policy.",
                "requirement": "PR.PT-1.1: The organization shall determine which events to log, how logs are stored, and the review frequency.",
                "guidance": "Create a logging policy specifying which activities to record (e.g., authentication events, configuration changes). Store logs securely, protect them from tampering, and define retention times. Regularly review logs to detect anomalies."
              },
              {
                "function": "PROTECT",
                "category": "Protective Technology (PR.PT)",
                "keyMeasure": false,
                "controlId": "PR.PT-2",
                "controlName": "Removable media is protected, and its use restricted according to policy.",
                "requirement": "PR.PT-2.1: The use of removable media shall be restricted and monitored.",
                "guidance": "Limit removable media usage to essential business cases only. Scan media for malware upon insertion. Encrypt sensitive files stored on USB drives. Keep an inventory of approved devices, and train users on safe handling."
              },
              {
                "function": "PROTECT",
                "category": "Protective Technology (PR.PT)",
                "keyMeasure": false,
                "controlId": "PR.PT-3",
                "controlName": "The principle of least functionality is incorporated by configuring systems to provide only essential capabilities.",
                "requirement": "PR.PT-3.1: The organization shall configure business-critical systems to provide only essential capabilities.",
                "guidance": "Disable or remove unnecessary software, services, and ports. Regularly review configurations to ensure only authorized functionalities are active. Align with the principle of least privilege for both services and applications."
              },
              {
                "function": "PROTECT",
                "category": "Protective Technology (PR.PT)",
                "keyMeasure": false,
                "controlId": "PR.PT-4",
                "controlName": "Communications and control networks are protected.",
                "requirement": "PR.PT-4.1: Web and email filtering technologies shall be installed and used.",
                "guidance": "Use an email gateway capable of filtering spam, phishing, and malware attachments. Configure web content filtering to block known malicious websites or categories. Monitor and regularly update filters to stay effective."
              },
            // RESPOND (RS)
            {
                function: "RESPOND",
                category: "Response Planning (RS.RP)",
                keyMeasure: true,
                controlId: "RS.RP-1",
                controlName: "Response plan is executed during or after an incident",
                requirement: "RS.RP-1.2: An incident response process, including roles, responsibilities, and authorities, shall be executed during or after an information/cybersecurity event on the organization's critical systems.",
                guidance: "• The incident response process should include a predetermined set of instructions or procedures to detect, respond to, and limit consequences of a malicious cyber-attack.\n• The roles, responsibilities, and authorities in the incident response plan should be specific on involved people, contact info, different roles and responsibilities, and who makes the decision to initiate recovery procedures as well as who will be the contact with appropriate external stakeholders.\n• It should be considered to determine the causes of an information/cybersecurity event and implement a corrective action in order that the event does not recur or occur elsewhere (an infection by malicious code on one machine did not have spread elsewhere in the network). The effectiveness of any corrective action taken should be reviewed. Corrective actions should be appropriate to the effects of the information/cybersecurity event encountered."
            },
            {
                function: "RESPOND",
                category: "Communications (RS.CO)",
                keyMeasure: false,
                controlId: "RS.CO-1",
                controlName: "Personnel know their roles and order of operations when a response is needed",
                requirement: "RS.CO-1.1: The organization shall ensure that personnel understand their roles, objectives, restoration priorities, task sequences (order of operations) and assignment responsibilities for event response.",
                guidance: "Consider the use the CCB Incident Management Guide to guide you through this exercise and consider bringing in outside experts if needed. Test your plan regularly and adjust it after each incident."
            },
            {
                function: "RESPOND",
                category: "Communications (RS.CO)",
                keyMeasure: false,
                controlId: "RS.CO-2",
                controlName: "Incidents are reported consistent with established criteria",
                requirement: "RS.CO-2.1: The organization shall implement reporting on information/cybersecurity incidents on its critical systems in an organization-defined time frame to organization-defined personnel or roles.",
                guidance: "All users should have a single point of contact to report any incident and be encouraged to do so."
            },
            {
                function: "RESPOND",
                category: "Communications (RS.CO)",
                keyMeasure: false,
                controlId: "RS.CO-3",
                controlName: "Information is shared consistent with response plans",
                requirement: "RS.CO-3.1: Information/cybersecurity incident information shall be communicated and shared with the organization's employees in a format that they can understand.",
                guidance: "No additional guidance on this topic."
            },
            {
                function: "RESPOND",
                category: "Communications (RS.CO)",
                keyMeasure: false,
                controlId: "RS.CO-3",
                controlName: "Information is shared consistent with response plans",
                requirement: "RS.CO-3.2: The organization shall share information/cybersecurity incident information with relevant stakeholders as foreseen in the incident response plan.",
                guidance: "No additional guidance on this topic."
            },
            {
                function: "RESPOND",
                category: "Communications (RS.CO)",
                keyMeasure: false,
                controlId: "RS.CO-4",
                controlName: "Coordination with stakeholders occurs consistent with response plans",
                requirement: "RS.CO-4.1: The organization shall coordinate information/cybersecurity incident response actions with all predefined stakeholders.",
                guidance: "• Stakeholders for incident response include for example, mission/business owners, organization's critical system owners, integrators, vendors, human resources offices, physical and personnel security offices, legal departments, operations personnel, and procurement offices.\n• Coordination with stakeholders occurs consistent with incident response plans."
            },
            {
                function: "RESPOND",
                category: "Communications (RS.CO)",
                keyMeasure: false,
                controlId: "RS.CO-5",
                controlName: "Voluntary information sharing occurs with external stakeholders to achieve broader cybersecurity situational awareness",
                requirement: "RS.CO-5.1: The organization shall share information/cybersecurity event information voluntarily, as appropriate, with external stakeholders, industry security groups… to achieve broader information/cybersecurity situational awareness.",
                guidance: "No additional guidance on this topic."
            },
            {
                function: "RESPOND",
                category: "Analysis (RS.AN)",
                keyMeasure: false,
                controlId: "RS.AN-1",
                controlName: "Notifications from detection systems are investigated",
                requirement: "RS.AN-1.1: The organization shall investigate information/cybersecurity-related notifications generated from detection systems.",
                guidance: "No additional guidance on this topic."
            },
            {
                function: "RESPOND",
                category: "Analysis (RS.AN)",
                keyMeasure: false,
                controlId: "RS.AN-2",
                controlName: "The impact of the incident is understood",
                requirement: "RS.AN-2.1: Thorough investigation and result analysis shall be the base for understanding the full implication of the information/cybersecurity incident.",
                guidance: "• Result analysis can involve the outcome of determining the correlation between the information of the detected event and the outcome of risk assessments. In this way, insight is gained into the impact of the event across the organization.\n• Consider including detection of unauthorized changes to its critical systems in its incident response capabilities."
            },
            {
                function: "RESPOND",
                category: "Analysis (RS.AN)",
                keyMeasure: false,
                controlId: "RS.AN-4",
                controlName: "Incidents are categorized consistent with response plans",
                requirement: "RS.AN-4.1: Information/cybersecurity incidents shall be categorized according to the level of severity and impact consistent with the evaluation criteria included the incident response plan.",
                guidance: "• It should be considered to determine the causes of an information/cybersecurity incident and implement a corrective action in order that the incident does not recur or occur elsewhere.\n• The effectiveness of any corrective action taken should be reviewed.\n• Corrective actions should be appropriate to the effects of the information/cybersecurity incident encountered."
            },
            {
                function: "RESPOND",
                category: "Analysis (RS.AN)",
                keyMeasure: true,
                controlId: "RS.AN-5",
                controlName: "Processes are established to receive, analyse, and respond to vulnerabilities disclosed to the organization from internal and external sources",
                requirement: "RS.AN-5.1: The organization shall implement vulnerability management processes and procedures that include processing, analysing and remedying vulnerabilities from internal and external sources.",
                guidance: "Internal and external sources could be e.g. internal testing, security bulletins, or security researchers."
            },
            {
                function: "RESPOND",
                category: "Mitigation (RS.MI)",
                keyMeasure: false,
                controlId: "RS.MI-1",
                controlName: "Incidents are contained, mitigated, and newly identified vulnerabilities are mitigated or documented as accepted risks",
                requirement: "RS.MI-1.1: The organization shall implement an incident handling capability for information/cybersecurity incidents on its business-critical systems that includes preparation, detection and analysis, containment, eradication, recovery, and documented risk acceptance.",
                guidance: "A documented risk acceptance deals with risks that the organisation assesses as not dangerous to the organisation's business critical systems and where the risk owner formally accepts the risk (related with the risk appetite of the organization)"
            },
            {
                function: "RESPOND",
                category: "Improvements (RS.IM)",
                keyMeasure: false,
                controlId: "RS.IM-1",
                controlName: "Response plans incorporate lessons learned",
                requirement: "RS.IM-1.1: The organization shall conduct post-incident evaluations to analyse lessons learned from incident response and recovery, and consequently improve processes/procedures/technologies to enhance its cyber resilience.",
                guidance: "Consider bringing involved people together after each incident and reflect together on ways to improve what happened, how it happened, how we reacted, how it could have gone better, what should be done to prevent it from happening again, etc."
            },
            {
                function: "RESPOND",
                category: "Improvements (RS.IM)",
                keyMeasure: false,
                controlId: "RS.IM-1",
                controlName: "Response plans incorporate lessons learned",
                requirement: "RS.IM-1.2: Lessons learned from incident handling shall be translated into updated or new incident handling procedures that shall be tested, approved, and trained.",
                guidance: "No additional guidance on this topic."
            },
            {
                function: "RESPOND",
                category: "Improvements (RS.IM)",
                keyMeasure: false,
                controlId: "RS.IM-2",
                controlName: "Response and Recovery strategies are updated",
                requirement: "RS.IM-2.1: The organization shall update the response and recovery plans to address changes in its context.",
                guidance: "The organization's context relates to the organizational structure, its critical systems, attack vectors, new threats, improved technology, environment of operation, problems encountered during plan implementation/execution/testing and lessons learned."
            },
            {
                function: "RESPOND",
                category: "Communications (RS.CO)",
                keyMeasure: false,
                controlId: "RS.CO-1",
                controlName: "Personnel know their roles and order of operations when a response is needed",
                requirement: "RS.CO-1.1: The organization shall ensure that personnel understand their roles, objectives, restoration priorities, task sequences (order of operations) and assignment responsibilities for event response.",
                guidance: "Consider the use the CCB Incident Management Guide to guide you through this exercise and consider bringing in outside experts if needed. Test your plan regularly and adjust it after each incident."
            },
            {
                function: "RESPOND",
                category: "Communications (RS.CO)",
                keyMeasure: false,
                controlId: "RS.CO-2",
                controlName: "Incidents are reported consistent with established criteria",
                requirement: "RS.CO-2.1: The organization shall implement reporting on information/cybersecurity incidents on its critical systems in an organization-defined time frame to organization-defined personnel or roles.",
                guidance: "All users should have a single point of contact to report any incident and be encouraged to do so."
            },
            {
                function: "RESPOND",
                category: "Communications (RS.CO)",
                keyMeasure: false,
                controlId: "RS.CO-3",
                controlName: "Information is shared consistent with response plans",
                requirement: "RS.CO-3.1: Information/cybersecurity incident information shall be communicated and shared with the organization's employees in a format that they can understand.",
                guidance: "No additional guidance on this topic."
            },
            {
                function: "RESPOND",
                category: "Communications (RS.CO)",
                keyMeasure: false,
                controlId: "RS.CO-3",
                controlName: "Information is shared consistent with response plans",
                requirement: "RS.CO-3.2: The organization shall share information/cybersecurity incident information with relevant stakeholders as foreseen in the incident response plan.",
                guidance: "No additional guidance on this topic."
            },
            {
                function: "RESPOND",
                category: "Communications (RS.CO)",
                keyMeasure: false,
                controlId: "RS.CO-4",
                controlName: "Coordination with stakeholders occurs consistent with response plans",
                requirement: "RS.CO-4.1: The organization shall coordinate information/cybersecurity incident response actions with all predefined stakeholders.",
                guidance: "• Stakeholders for incident response include for example, mission/business owners, organization's critical system owners, integrators, vendors, human resources offices, physical and personnel security offices, legal departments, operations personnel, and procurement offices.\n• Coordination with stakeholders occurs consistent with incident response plans."
            },
            {
                function: "RESPOND",
                category: "Communications (RS.CO)",
                keyMeasure: false,
                controlId: "RS.CO-5",
                controlName: "Voluntary information sharing occurs with external stakeholders to achieve broader cybersecurity situational awareness",
                requirement: "RS.CO-5.1: The organization shall share information/cybersecurity event information voluntarily, as appropriate, with external stakeholders, industry security groups… to achieve broader information/cybersecurity situational awareness.",
                guidance: "No additional guidance on this topic."
            },
            {
                function: "RESPOND",
                category: "Analysis (RS.AN)",
                keyMeasure: false,
                controlId: "RS.AN-1",
                controlName: "Notifications from detection systems are investigated",
                requirement: "RS.AN-1.1: The organization shall investigate information/cybersecurity-related notifications generated from detection systems.",
                guidance: "No additional guidance on this topic."
            },
            {
                function: "RESPOND",
                category: "Analysis (RS.AN)",
                keyMeasure: false,
                controlId: "RS.AN-2",
                controlName: "The impact of the incident is understood",
                requirement: "RS.AN-2.1: Thorough investigation and result analysis shall be the base for understanding the full implication of the information/cybersecurity incident.",
                guidance: "• Result analysis can involve the outcome of determining the correlation between the information of the detected event and the outcome of risk assessments. In this way, insight is gained into the impact of the event across the organization.\n• Consider including detection of unauthorized changes to its critical systems in its incident response capabilities."
            },
            {
                function: "RESPOND",
                category: "Analysis (RS.AN)",
                keyMeasure: false,
                controlId: "RS.AN-4",
                controlName: "Incidents are categorized consistent with response plans",
                requirement: "RS.AN-4.1: Information/cybersecurity incidents shall be categorized according to the level of severity and impact consistent with the evaluation criteria included the incident response plan.",
                guidance: "• It should be considered to determine the causes of an information/cybersecurity incident and implement a corrective action in order that the incident does not recur or occur elsewhere.\n• The effectiveness of any corrective action taken should be reviewed.\n• Corrective actions should be appropriate to the effects of the information/cybersecurity incident encountered."
            },
            {
                function: "RESPOND",
                category: "Analysis (RS.AN)",
                keyMeasure: true,
                controlId: "RS.AN-5",
                controlName: "Processes are established to receive, analyse, and respond to vulnerabilities disclosed to the organization from internal and external sources",
                requirement: "RS.AN-5.1: The organization shall implement vulnerability management processes and procedures that include processing, analysing and remedying vulnerabilities from internal and external sources.",
                guidance: "Internal and external sources could be e.g. internal testing, security bulletins, or security researchers."
            },
            {
                function: "RESPOND",
                category: "Mitigation (RS.MI)",
                keyMeasure: false,
                controlId: "RS.MI-1",
                controlName: "Incidents are contained, mitigated, and newly identified vulnerabilities are mitigated or documented as accepted risks",
                requirement: "RS.MI-1.1: The organization shall implement an incident handling capability for information/cybersecurity incidents on its business-critical systems that includes preparation, detection and analysis, containment, eradication, recovery, and documented risk acceptance.",
                guidance: "A documented risk acceptance deals with risks that the organisation assesses as not dangerous to the organisation's business critical systems and where the risk owner formally accepts the risk (related with the risk appetite of the organization)"
            },
            // RECOVER (RC)
            {
                "function": "RECOVER",
                "category": "Recovery Planning (RC.RP)",
                "keyMeasure": false,
                "controlId": "RC.RP-1",
                "controlName": "Recovery plan is executed during or after a cybersecurity incident.",
                "requirement": "RC.RP-1.1: A documented recovery plan shall be defined, implemented, and maintained to promptly restore systems or assets affected by security incidents.",
                "guidance": "Include roles, responsibilities, and priorities for restoring operations after an incident; ensure the plan is regularly tested and updated."
              },
              {
                "function": "RECOVER",
                "category": "Improvements (RC.IM)",
                "keyMeasure": false,
                "controlId": "RC.IM-1",
                "controlName": "Recovery plans incorporate lessons learned.",
                "requirement": "RC.IM-1.1: The organization shall capture and integrate feedback from real or simulated incidents to improve recovery processes and procedures.",
                "guidance": "After each incident or exercise, gather relevant teams to discuss successes and failures; update recovery documentation and practices accordingly."
              },
              {
                "function": "RECOVER",
                "category": "Communications (RC.CO)",
                "keyMeasure": false,
                "controlId": "RC.CO-1",
                "controlName": "Public relations are managed.",
                "requirement": "RC.CO-1.1: The organization shall manage external communications (e.g., media, public) during the recovery phase.",
                "guidance": "Define who speaks to the media or public, ensure consistent messages, and coordinate with stakeholders to maintain trust and protect reputation."
              },
              {
                "function": "RECOVER",
                "category": "Communications (RC.CO)",
                "keyMeasure": false,
                "controlId": "RC.CO-3",
                "controlName": "Recovery activities are communicated to internal and external stakeholders as well as executive and management teams.",
                "requirement": "RC.CO-3.1: The organization shall keep management, staff, and relevant external parties informed about recovery status and progress.",
                "guidance": "Communicate timelines, milestones, and resource needs to ensure alignment, maintain stakeholder confidence, and support timely decision-making."
              }
        ],
        
        // Niveau ESSENTIAL
        ESSENTIAL: [
            // IDENTIFY (ID)
            {
                function: "IDENTIFY",
                category: "Asset Management (ID.AM)",
                keyMeasure: false,
                controlId: "ID.AM-1",
                controlName: "Physical devices and systems within the organization are inventoried",
                requirement: "ID.AM-1.2: The organization shall maintain an inventory of the organization's critical systems components and the essential functions and/or mission objectives they support.",
                guidance: "• Critical systems components are those components that are essential to the organization's mission and business functions.\n• This inventory should be updated regularly and when changes occur.\n• Consider to include in the inventory the following information: type of component, make, model, location, owner, and the essential functions and/or mission objectives they support."
            },
            {
                function: "IDENTIFY",
                category: "Asset Management (ID.AM)",
                keyMeasure: false,
                controlId: "ID.AM-4",
                controlName: "External information systems are catalogued",
                requirement: "ID.AM-4.1: The organization shall maintain an inventory of all external information systems and the data that is shared with them.",
                guidance: "• External information systems include cloud services, outsourced services, and other third-party services.\n• This inventory should include the type of service, the provider, the data shared, and the security measures in place.\n• This inventory should be updated regularly and when changes occur."
            },
            {
                function: "IDENTIFY",
                category: "Asset Management (ID.AM)",
                keyMeasure: false,
                controlId: "ID.AM-6",
                controlName: "Cybersecurity roles and responsibilities for the entire workforce and third-party stakeholders (e.g., suppliers, customers, partners) are established",
                requirement: "ID.AM-6.1: The organization shall define and communicate roles and responsibilities for cybersecurity to all relevant personnel and third-party stakeholders.",
                guidance: "• Consider to define roles and responsibilities for cybersecurity in job descriptions, contracts, and agreements.\n• Consider to communicate these roles and responsibilities to all relevant personnel and third-party stakeholders.\n• Consider to review and update these roles and responsibilities regularly and when changes occur."
            },
            {
                function: "IDENTIFY",
                category: "Business Environment (ID.BE)",
                keyMeasure: false,
                controlId: "ID.BE-1",
                controlName: "The organization's role in the supply chain is identified and communicated",
                requirement: "ID.BE-1.1: The organization shall identify and document its role in the supply chain.",
                guidance: "• Consider to identify and document the organization's role in the supply chain, including its dependencies on suppliers and customers.\n• Consider to communicate this role to all relevant stakeholders.\n• Consider to review and update this documentation regularly and when changes occur."
            },
            {
                function: "IDENTIFY",
                category: "Business Environment (ID.BE)",
                keyMeasure: false,
                controlId: "ID.BE-2",
                controlName: "The organization's place in critical infrastructure and its industry sector is identified and communicated",
                requirement: "ID.BE-2.1: The organization shall identify and document its place in critical infrastructure and its industry sector.",
                guidance: "• Consider to identify and document the organization's place in critical infrastructure and its industry sector.\n• Consider to communicate this information to all relevant stakeholders.\n• Consider to review and update this documentation regularly and when changes occur."
            },
            {
                function: "IDENTIFY",
                category: "Risk Assessment (ID.RA)",
                keyMeasure: true,
                controlId: "ID.RA-2",
                controlName: "Cyber threat intelligence is received from information sharing forums and sources",
                requirement: "ID.RA-2.1: The organization shall receive cyber threat intelligence from information sharing forums and sources.",
                guidance: "• Consider to participate in information sharing forums and communities.\n• Consider to subscribe to threat intelligence feeds from reputable sources.\n• Consider to share threat intelligence with appropriate stakeholders."
            },
            {
                function: "IDENTIFY",
                category: "Risk Assessment (ID.RA)",
                keyMeasure: true,
                controlId: "ID.RA-3",
                controlName: "Threats, both internal and external, are identified and documented",
                requirement: "ID.RA-3.1: The organization shall identify and document threats, both internal and external.",
                guidance: "• Consider to identify and document threats through threat modeling, threat intelligence, and historical data.\n• Consider to categorize threats based on their likelihood and potential impact.\n• Consider to review and update the threat documentation regularly and when changes occur."
            },
            {
                function: "IDENTIFY",
                category: "Supply Chain Risk Management (ID.SC)",
                keyMeasure: false,
                controlId: "ID.SC-1",
                controlName: "Cyber supply chain risk management processes are identified, established, assessed, managed, and agreed to by organizational stakeholders",
                requirement: "ID.SC-1.1: The organization shall establish and implement cyber supply chain risk management processes.",
                guidance: "• Consider to establish and implement processes for identifying, assessing, and managing cyber supply chain risks.\n• Consider to involve all relevant stakeholders in these processes.\n• Consider to review and update these processes regularly and when changes occur."
            },
            // PROTECT (PR)
            {
                function: "PROTECT",
                category: "Access Control (PR.AC)",
                keyMeasure: true,
                controlId: "PR.AC-1",
                controlName: "Identities and credentials are issued, managed, verified, revoked, and audited for authorized devices, users and processes",
                requirement: "PR.AC-1.5: Multi-factor authentication shall be used for all access to sensitive systems and data.",
                guidance: "• Consider to use multi-factor authentication for all access to sensitive systems and data.\n• Consider to use multi-factor authentication for all administrator access.\n• Consider to use multi-factor authentication for all remote access."
            },
            {
                function: "PROTECT",
                category: "Access Control (PR.AC)",
                keyMeasure: false,
                controlId: "PR.AC-2",
                controlName: "Physical access to assets is managed and protected",
                requirement: "PR.AC-2.1: The organization shall manage and protect physical access to assets.",
                guidance: "• Consider to implement physical access controls, such as locks, access cards, and security guards.\n• Consider to monitor physical access through logs and surveillance cameras.\n• Consider to review physical access logs regularly for suspicious activity."
            },
            {
                function: "PROTECT",
                category: "Access Control (PR.AC)",
                keyMeasure: false,
                controlId: "PR.AC-6",
                controlName: "Identities are proofed and bound to credentials and asserted in interactions"
                ,
                requirement: "PR.AC-6.1: The organization shall proof identities and bind them to credentials.",
                guidance: "• Consider to implement a process for verifying the identity of individuals before issuing credentials.\n• Consider to bind credentials to verified identities.\n• Consider to assert identities in interactions through authentication mechanisms."
            },
            {
                function: "PROTECT",
                category: "Awareness and Training (PR.AT)",
                keyMeasure: true,
                controlId: "PR.AT-1",
                controlName: "All users are informed and trained"
                ,
                requirement: "PR.AT-1.1: The organization shall provide cybersecurity awareness training to all users.",
                guidance: "• Consider to provide cybersecurity awareness training to all users, including employees, contractors, and third-party stakeholders.\n• Consider to tailor the training to the specific roles and responsibilities of the users.\n• Consider to provide the training at least annually and when significant changes occur."
            },
            {
                function: "PROTECT",
                category: "Data Security (PR.DS)",
                keyMeasure: false,
                controlId: "PR.DS-4",
                controlName: "Adequate capacity to ensure availability is maintained"
                ,
                requirement: "PR.DS-4.1: The organization shall maintain adequate capacity to ensure availability.",
                guidance: "• Consider to monitor system capacity and performance regularly.\n• Consider to implement capacity planning processes to ensure that adequate capacity is maintained.\n• Consider to implement redundancy and failover mechanisms to ensure availability."
            },
            {
                function: "PROTECT",
                category: "Data Security (PR.DS)",
                keyMeasure: false,
                controlId: "PR.DS-5",
                controlName: "Protections against data leaks are implemented"
                ,
                requirement: "PR.DS-5.1: The organization shall implement protections against data leaks.",
                guidance: "• Consider to implement data loss prevention (DLP) solutions that can detect and prevent data leaks.\n• Consider to implement access controls that limit access to sensitive data.\n• Consider to implement encryption for sensitive data in transit and at rest."
            },
            {
                function: "PROTECT",
                category: "Information Protection Processes and Procedures (PR.IP)",
                keyMeasure: true,
                controlId: "PR.IP-1",
                controlName: "A baseline configuration of information technology/industrial control systems is created and maintained incorporating security principles (e.g. concept of least functionality)"
                ,
                requirement: "PR.IP-1.1: The organization shall create and maintain a baseline configuration of information technology/industrial control systems.",
                guidance: "• Consider to create and maintain baseline configurations for all systems.\n• Consider to incorporate security principles, such as least functionality, in the baseline configurations.\n• Consider to review and update the baseline configurations regularly and when changes occur."
            },
            {
                function: "PROTECT",
                category: "Information Protection Processes and Procedures (PR.IP)",
                keyMeasure: true,
                controlId: "PR.IP-2",
                controlName: "A System Development Life Cycle to manage systems is implemented"
                ,
                requirement: "PR.IP-2.1: The organization shall implement a System Development Life Cycle to manage systems.",
                guidance: "• Consider to implement a System Development Life Cycle (SDLC) that includes security considerations at each phase.\n• Consider to include security testing in the SDLC.\n• Consider to include security reviews in the SDLC."
            },
            {
                function: "PROTECT",
                category: "Protective Technology (PR.PT)",
                keyMeasure: false,
                controlId: "PR.PT-2",
                controlName: "Removable media is protected and its use restricted according to policy"
                ,
                requirement: "PR.PT-2.1: The organization shall protect removable media and restrict its use according to policy.",
                guidance: "• Consider to implement policies and procedures for the use of removable media.\n• Consider to implement technical controls that restrict the use of removable media.\n• Consider to implement encryption for sensitive data stored on removable media."
            },
            // DETECT (DE)
            {
                function: "DETECT",
                category: "Anomalies and Events (DE.AE)",
                keyMeasure: false,
                controlId: "DE.AE-1",
                controlName: "A baseline of network operations and expected data flows for users and systems is established and managed"
                ,
                requirement: "DE.AE-1.1: The organization shall establish and manage a baseline of network operations and expected data flows for users and systems.",
                guidance: "• Consider to establish baselines for network operations and data flows.\n• Consider to monitor network operations and data flows for deviations from the baselines.\n• Consider to investigate and respond to deviations from the baselines."
            },
            {
                function: "DETECT",
                category: "Anomalies and Events (DE.AE)",
                keyMeasure: false,
                controlId: "DE.AE-3",
                controlName: "Event data are collected and correlated from multiple sources and sensors"
                ,
                requirement: "DE.AE-3.1: The organization shall collect and correlate event data from multiple sources and sensors.",
                guidance: "• Consider to implement a security information and event management (SIEM) system that can collect and correlate event data from multiple sources.\n• Consider to implement sensors and monitoring tools that can collect event data.\n• Consider to analyze correlated event data for patterns and anomalies."
            },
            {
                function: "DETECT",
                category: "Security Continuous Monitoring (DE.CM)",
                keyMeasure: false,
                controlId: "DE.CM-2",
                controlName: "The physical environment is monitored to detect potential cybersecurity events"
                ,
                requirement: "DE.CM-2.1: The organization shall monitor the physical environment to detect potential cybersecurity events.",
                guidance: "• Consider to implement physical security controls, such as surveillance cameras and access logs.\n• Consider to monitor physical security controls for unauthorized access and suspicious activity.\n• Consider to investigate and respond to potential physical security incidents."
            },
            {
                function: "DETECT",
                category: "Detection Processes (DE.DP)",
                keyMeasure: false,
                controlId: "DE.DP-1",
                controlName: "Roles and responsibilities for detection are well defined to ensure accountability"
                ,
                requirement: "DE.DP-1.1: The organization shall define roles and responsibilities for detection to ensure accountability.",
                guidance: "• Consider to define roles and responsibilities for detection activities, such as monitoring, analysis, and response.\n• Consider to assign these roles and responsibilities to specific individuals or teams.\n• Consider to ensure that these individuals or teams have the necessary skills and resources."
            },
            // RESPOND (RS)
            {
                function: "RESPOND",
                category: "Communications (RS.CO)",
                keyMeasure: false,
                controlId: "RS.CO-1",
                controlName: "Personnel know their roles and order of operations when a response is needed"
                ,
                requirement: "RS.CO-1.1: The organization shall ensure that personnel know their roles, objectives, restoration priorities, task sequences (order of operations) and assignment responsibilities for event response.",
                guidance: "Consider the use the CCB Incident Management Guide to guide you through this exercise and consider bringing in outside experts if needed. Test your plan regularly and adjust it after each incident."
            },
            {
                function: "RESPOND",
                category: "Communications (RS.CO)",
                keyMeasure: false,
                controlId: "RS.CO-2",
                controlName: "Incidents are reported consistent with established criteria"
                ,
                requirement: "RS.CO-2.1: The organization shall implement reporting on information/cybersecurity incidents on its critical systems in an organization-defined time frame to organization-defined personnel or roles.",
                guidance: "All users should have a single point of contact to report any incident and be encouraged to do so."
            },
            {
                function: "RESPOND",
                category: "Analysis (RS.AN)",
                keyMeasure: false,
                controlId: "RS.AN-2",
                controlName: "The impact of the incident is understood"
                ,
                requirement: "RS.AN-2.1: Thorough investigation and result analysis shall be the base for understanding the full implication of the information/cybersecurity incident.",
                guidance: "• Result analysis can involve the outcome of determining the correlation between the information of the detected event and the outcome of risk assessments. In this way, insight is gained into the impact of the event across the organization.\n• Consider including detection of unauthorized changes to its critical systems in its incident response capabilities."
            },
            {
                function: "RESPOND",
                category: "Mitigation (RS.MI)",
                keyMeasure: false,
                controlId: "RS.MI-1",
                controlName: "Incidents are contained"
                ,
                requirement: "RS.MI-1.1: The organization shall contain incidents to minimize their impact.",
                guidance: "• Consider to implement processes for containing incidents, such as isolating affected systems, blocking malicious traffic, and revoking compromised credentials.\n• Consider to document containment actions for each incident.\n• Consider to test containment procedures regularly to ensure their effectiveness."
            },
            // RECOVER (RC)
            {
                function: "RECOVER",
                category: "Recovery Planning (RC.RP)",
                keyMeasure: false,
                controlId: "RC.RP-1",
                controlName: "Recovery plan is executed during or after a cybersecurity incident"
                ,
                requirement: "RC.RP-1.2: The organization shall develop and implement a recovery plan.",
                guidance: "• Consider developing a recovery plan that outlines the steps to restore systems and data after an incident.\n• Consider testing the recovery plan regularly to ensure it is effective.\n• Consider updating the recovery plan based on lessons learned from incidents and tests."
            },
            {
                function: "RECOVER",
                category: "Improvements (RC.IM)",
                keyMeasure: false,
                controlId: "RC.IM-1",
                controlName: "Recovery plans incorporate lessons learned"
                ,
                requirement: "RC.IM-1.1: The organization shall incorporate lessons learned into recovery plans.",
                guidance: "• Consider conducting post-incident reviews to identify lessons learned.\n• Consider incorporating these lessons learned into recovery plans.\n• Consider sharing lessons learned with appropriate stakeholders."
            },
            {
                function: "RECOVER",
                category: "Communications (RC.CO)",
                keyMeasure: false,
                controlId: "RC.CO-1",
                controlName: "Public relations are managed"
                ,
                requirement: "RC.CO-1.1: The organization shall manage public relations during and after an incident.",
                guidance: "• Consider developing a communication plan for managing public relations during and after an incident.\n• Consider designating a spokesperson who will communicate with the public.\n• Consider preparing templates for public communications."
            }
        ]
    },
    
    // Catégories pour les résultats
    categories: [
        {
            id: "ID.AM",
            name: "Asset Management",
            description: "The data, personnel, devices, systems, and facilities that enable the organization to achieve business purposes are identified and managed consistent with their relative importance to organizational objectives and the organization's risk strategy."
        },
        {
            id: "ID.BE",
            name: "Business Environment",
            description: "The organization's mission, objectives, stakeholders, and activities are understood and prioritized; this information is used to inform cybersecurity roles, responsibilities, and risk management decisions."
        },
        {
            id: "ID.GV",
            name: "Governance",
            description: "The policies, procedures, and processes to manage and monitor the organization's regulatory, legal, risk, environmental, and operational requirements are understood and inform the management of cybersecurity risk."
        },
        {
            id: "ID.RA",
            name: "Risk Assessment",
            description: "The organization understands the cybersecurity risk to organizational operations (including mission, functions, image, or reputation), organizational assets, and individuals."
        },
        {
            id: "ID.SC",
            name: "Supply Chain Risk Management",
            description: "The organization's priorities, constraints, risk tolerances, and assumptions are established and used to support risk decisions associated with managing supply chain risk."
        },
        {
            id: "PR.AC",
            name: "Access Control",
            description: "Access to physical and logical assets and associated facilities is limited to authorized users, processes, and devices, and is managed consistent with the assessed risk of unauthorized access to authorized activities and transactions."
        },
        {
            id: "PR.AT",
            name: "Awareness and Training",
            description: "The organization's personnel and partners are provided cybersecurity awareness education and are trained to perform their cybersecurity-related duties and responsibilities consistent with related policies, procedures, and agreements."
        },
        {
            id: "PR.DS",
            name: "Data Security",
            description: "Information and records (data) are managed consistent with the organization's risk strategy to protect the confidentiality, integrity, and availability of information."
        },
        {
            id: "PR.IP",
            name: "Information Protection Processes and Procedures",
            description: "Security policies (that address purpose, scope, roles, responsibilities, management commitment, and coordination among organizational entities), processes, and procedures are maintained and used to manage protection of information systems and assets."
        },
        {
            id: "PR.MA",
            name: "Maintenance",
            description: "Maintenance and repairs of industrial control and information system components are performed consistent with policies and procedures."
        },
        {
            id: "PR.PT",
            name: "Protective Technology",
            description: "Technical security solutions are managed to ensure the security and resilience of systems and assets, consistent with related policies, procedures, and agreements."
        },
        {
            id: "DE.AE",
            name: "Anomalies and Events",
            description: "Anomalous activity is detected and the potential impact of events is understood."
        },
        {
            id: "DE.CM",
            name: "Security Continuous Monitoring",
            description: "The information system and assets are monitored to identify cybersecurity events and verify the effectiveness of protective measures."
        },
        {
            id: "DE.DP",
            name: "Detection Processes",
            description: "Detection processes and procedures are maintained and tested to ensure awareness of anomalous events."
        },
        {
            id: "RS.RP",
            name: "Response Planning",
            description: "Response processes and procedures are executed and maintained, to ensure response to detected cybersecurity incidents."
        },
        {
            id: "RS.CO",
            name: "Communications",
            description: "Response activities are coordinated with internal and external stakeholders."
        },
        {
            id: "RS.AN",
            name: "Analysis",
            description: "Analysis is conducted to ensure effective response and support recovery activities."
        },
        {
            id: "RS.MI",
            name: "Mitigation",
            description: "Activities are performed to prevent expansion of an event, mitigate its effects, and resolve the incident."
        },
        {
            id: "RS.IM",
            name: "Improvements",
            description: "Organizational response activities are improved by incorporating lessons learned from current and previous detection/response activities."
        },
        {
            id: "RC.RP",
            name: "Recovery Planning",
            description: "Recovery processes and procedures are executed and maintained to ensure restoration of systems or assets affected by cybersecurity incidents."
        },
        {
            id: "RC.IM",
            name: "Improvements",
            description: "Recovery planning and processes are improved by incorporating lessons learned into future activities."
        },
        {
            id: "RC.CO",
            name: "Communications",
            description: "Restoration activities are coordinated with internal and external parties."
        }
    ],
    
    // Formules pour les calculs
    formulas: {
        // Calcul du score moyen pour une catégorie
        calculateCategoryScore: function(categoryId, documentationScores, implementationScores, type) {
            let totalScore = 0;
            let count = 0;
            
            // Trouver tous les contrôles de cette catégorie
            const controls = this.getControlsByCategoryId(categoryId);
            
            console.log(`Calcul du score pour ${categoryId} (type=${type}), ${controls.length} contrôles trouvés`);
            
            // Si type est spécifié, on ne calcule que ce type de score
            if (type === 'documentation' || type === 'implementation') {
                controls.forEach(control => {
                    const controlId = control.controlId;
                    if (type === 'documentation' && documentationScores[controlId]) {
                        totalScore += documentationScores[controlId];
                        count++;
                    } else if (type === 'implementation' && implementationScores[controlId]) {
                        totalScore += implementationScores[controlId];
                        count++;
                    }
                });
            } else {
                controls.forEach(control => {
                    const controlId = control.controlId;
                    if (documentationScores[controlId] && implementationScores[controlId]) {
                        totalScore += (documentationScores[controlId] + implementationScores[controlId]) / 2;
                        count++;
                    }
                });
            }
            
            if (count === 0) {
                console.warn(`Aucun contrôle trouvé pour la catégorie ${categoryId}`);
                return type ? 0 : { documentation: 0, implementation: 0, average: 0 };
            }
            
            const average = totalScore / count;
            
            // Si un type spécifique est demandé, on retourne juste la valeur
            if (type) {
                return average;
            }
            
            // Sinon on calcule tout
            const docAvg = this.calculateCategoryScore(categoryId, documentationScores, implementationScores, 'documentation');
            const implAvg = this.calculateCategoryScore(categoryId, documentationScores, implementationScores, 'implementation');
            const totalAvg = (docAvg + implAvg) / 2;
            
            return {
                documentation: docAvg,
                implementation: implAvg,
                average: totalAvg
            };
        },
        
        // Obtenir tous les contrôles d'une catégorie
        getControlsByCategoryId: function(categoryId) {
            const level = document.getElementById('assessmentLevel').value;
            const allControls = cyfunData.controls[level];
            
            console.log(`Recherche des contrôles pour la catégorie: ${categoryId}`);
            
            // Simplification: On utilise une comparaison plus stricte
            return allControls.filter(control => {
                // Plusieurs méthodes d'extraction pour assurer la correspondance
                let extractedCategoryId;
                
                // Méthode 1: Extraction depuis les parenthèses
                const match = control.category.match(/\(([^)]+)\)/);
                if (match && match[1]) {
                    extractedCategoryId = match[1];
                } 
                // Méthode 2: Si pas de correspondance, vérifier si la catégorie contient l'ID directement
                else if (control.category.includes(categoryId)) {
                    extractedCategoryId = categoryId;
                } 
                // Méthode 3: Dernier recours - utiliser la catégorie complète
                else {
                    extractedCategoryId = control.category;
                }
                
                // Afficher pour débogage
                console.log(`Contrôle: ${control.controlId}, Catégorie: ${control.category}, ID extrait: ${extractedCategoryId}, Comparaison avec: ${categoryId}`);
                
                // Retourner true si l'ID extrait correspond à l'ID recherché
                return extractedCategoryId === categoryId || extractedCategoryId.includes(categoryId) || categoryId.includes(extractedCategoryId);
            });
        },
        
        // Calcul du score global
        calculateOverallScore: function(documentationScores, implementationScores) {
            const level = document.getElementById('assessmentLevel').value;
            const allControls = cyfunData.controls[level];
            
            let docTotal = 0;
            let implTotal = 0;
            let count = 0;
            
            allControls.forEach(control => {
                const controlId = control.controlId;
                if (documentationScores[controlId] && implementationScores[controlId]) {
                    docTotal += documentationScores[controlId];
                    implTotal += implementationScores[controlId];
                    count++;
                }
            });
            
            if (count === 0) return { documentation: 0, implementation: 0, average: 0 };
            
            const docAvg = docTotal / count;
            const implAvg = implTotal / count;
            const totalAvg = (docAvg + implAvg) / 2;
            
            return {
                documentation: docAvg,
                implementation: implAvg,
                average: totalAvg
            };
        },
        
        // Déterminer le statut de conformité
        determineComplianceStatus: function(overallScore) {
            const level = document.getElementById('assessmentLevel').value;
            const threshold = cyfunData.complianceThresholds[level].total;
            
            if (overallScore.average >= threshold) {
                return {
                    status: "Conforme",
                    description: `Votre organisation est conforme au niveau ${level} du CyberFundamentals Framework avec un score de ${overallScore.average.toFixed(2)}.`
                };
            } else {
                return {
                    status: "Non conforme",
                    description: `Votre organisation n'est pas conforme au niveau ${level} du CyberFundamentals Framework. Un score minimum de ${threshold} est requis, mais votre score actuel est de ${overallScore.average.toFixed(2)}.`
                };
            }
        }
    }
};
