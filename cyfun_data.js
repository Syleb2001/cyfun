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
                function: "PROTECT",
                category: "Access Control (PR.AC)",
                keyMeasure: true,
                controlId: "PR.AC-1",
                controlName: "Identities and credentials are issued, managed, verified, revoked, and audited for authorized devices, users and processes",
                requirement: "PR.AC-1.1: Unique user accounts shall be created for each individual.",
                guidance: "• Consider to create unique accounts for each employee. This allows you to track the actions of each individual and to remove access when an employee leaves.\n• Consider to create unique administrator accounts for each administrator. This allows you to track the actions of each administrator and to remove access when an administrator leaves.\n• Consider to create unique service accounts for each service. This allows you to track the actions of each service and to remove access when a service is no longer needed."
            },
            {
                function: "PROTECT",
                category: "Access Control (PR.AC)",
                keyMeasure: true,
                controlId: "PR.AC-1",
                controlName: "Identities and credentials are issued, managed, verified, revoked, and audited for authorized devices, users and processes",
                requirement: "PR.AC-1.2: All accounts shall have strong passwords.",
                guidance: "• Consider to use strong passwords for all accounts. A strong password is at least 12 characters long and contains a mix of uppercase and lowercase letters, numbers, and special characters.\n• Consider to use a password manager to generate and store strong passwords.\n• Consider to use multi-factor authentication for all accounts, especially for administrator accounts."
            },
            {
                function: "PROTECT",
                category: "Access Control (PR.AC)",
                keyMeasure: false,
                controlId: "PR.AC-2",
                controlName: "Physical access to assets is managed and protected",
                requirement: "PR.AC-2.1: Physical access to assets shall be managed and protected.",
                guidance: "• Consider implementing physical access controls to protect assets from unauthorized access.\n• Consider maintaining logs of physical access to sensitive areas.\n• Consider regularly reviewing and updating physical access controls."
            },
            {
                function: "PROTECT",
                category: "Access Control (PR.AC)",
                keyMeasure: false,
                controlId: "PR.AC-3",
                controlName: "Remote access is managed",
                requirement: "PR.AC-3.1: The organisation's wireless access points shall be secured.",
                guidance: "Consider the following when wireless networking is used:\n• Change the administrative password upon installation of a wireless access points.\n• Set the wireless access point so that it does not broadcast its Service Set Identifier (SSID).\n• Set your router to use at least WiFi Protected Access (WPA-2 or WPA-3 where possible), with the Advanced Encryption Standard (AES) for encryption.\n• Ensure that wireless internet access to customers is separated from your business network.\n• Connecting to unknown or unsecured / guest wireless access points, should be avoided, and if unavoidable done through an encrypted virtual private network (VPN) capability.\n• Manage all endpoint devices (fixed and mobile) according to the organization's security policies."
            },
            {
                function: "PROTECT",
                category: "Access Control (PR.AC)",
                keyMeasure: true,
                controlId: "PR.AC-4",
                controlName: "Access permissions and authorizations are managed, incorporating the principles of least privilege and separation of duties",
                requirement: "PR.AC-4.1: Access to information shall be restricted in accordance with the access control policy.",
                guidance: "• Consider to restrict access to information to only those who need it to perform their job functions.\n• Consider to review access rights regularly to ensure that they are still appropriate.\n• Consider to remove access rights when an employee leaves or changes roles."
            },
            {
                function: "PROTECT",
                category: "Access Control (PR.AC)",
                keyMeasure: true,
                controlId: "PR.AC-4",
                controlName: "Access permissions and authorizations are managed, incorporating the principles of least privilege and separation of duties",
                requirement: "PR.AC-4.4: Nobody shall have administrator privileges for daily tasks.",
                guidance: "Consider the following:\n• Separate administrator accounts from user accounts.\n• Do not privilege user accounts to effectuate administration tasks.\n• Create unique local administrator passwords and disable unused accounts.\n• Consider prohibiting Internet browsing from administrative accounts."
            },
            {
                function: "PROTECT",
                category: "Data Security (PR.DS)",
                keyMeasure: true,
                controlId: "PR.DS-1",
                controlName: "Data-at-rest is protected",
                requirement: "PR.DS-1.1: Sensitive data shall be protected at rest.",
                guidance: "• Consider to encrypt sensitive data at rest. This includes data stored on servers, workstations, mobile devices, and removable media.\n• Consider to use full-disk encryption for all devices that store sensitive data.\n• Consider to use file-level encryption for sensitive files."
            },
            {
                function: "PROTECT",
                category: "Data Security (PR.DS)",
                keyMeasure: true,
                controlId: "PR.DS-2",
                controlName: "Data-in-transit is protected",
                requirement: "PR.DS-2.1: Sensitive data shall be protected in transit.",
                guidance: "• Consider to encrypt sensitive data in transit. This includes data transmitted over networks, including the Internet.\n• Consider to use encrypted protocols such as HTTPS, SFTP, and SSH.\n• Consider to use a virtual private network (VPN) when connecting to the organization's network from outside."
            },
            {
                function: "PROTECT",
                category: "Maintenance (PR.MA)",
                keyMeasure: false,
                controlId: "PR.MA-1",
                controlName: "Maintenance and repair of organizational assets are performed and logged with approved tools",
                requirement: "PR.MA-1.1: Maintenance and repair of organizational assets shall be performed and logged with approved tools.",
                guidance: "• Consider maintaining a log of all maintenance and repair activities.\n• Consider using only approved tools and techniques for maintenance and repair.\n• Consider verifying that maintenance personnel have appropriate access and authorization."
            },
            {
                function: "PROTECT",
                category: "Information Protection Processes and Procedures (PR.IP)",
                keyMeasure: true,
                controlId: "PR.IP-4",
                controlName: "Backups of information are conducted, maintained, and tested",
                requirement: "PR.IP-4.1: Backups for organization's business critical data shall be conducted and stored on a system different from the device on which the original data resides.",
                guidance: "• Organization's business critical system's data includes for example software, configurations and settings, documentation, system configuration data including computer configuration backups, application configuration backups, etc.\n• Consider a regular backup and put it offline periodically.\n• Recovery time and recovery point objectives should be considered.\n• Consider not storing the organization's data backup on the same network as the system on which the original data resides and provide an offline copy. Among other things, this prevents file encryption by hackers (risk of ransomware)."
            },
            {
                function: "PROTECT",
                category: "Information Protection Processes and Procedures (PR.IP)",
                keyMeasure: false,
                controlId: "PR.IP-10",
                controlName: "Response and recovery plans are tested",
                requirement: "PR.IP-10.1: The organization shall test response and recovery plans to determine the effectiveness of the plans and the organizational readiness to execute the plans.",
                guidance: "• Consider to test response and recovery plans at least annually.\n• Consider to update response and recovery plans based on the results of the tests.\n• Consider to involve all relevant stakeholders in the tests."
            },
            {
                function: "PROTECT",
                category: "Information Protection Processes and Procedures (PR.IP)",
                keyMeasure: false,
                controlId: "PR.IP-11",
                controlName: "Cybersecurity is included in human resources practices (e.g., deprovisioning, personnel screening)",
                requirement: "PR.IP-11.1: Personnel having access to the organization's most critical information or technology shall be verified.",
                guidance: "The access to critical information or technology should be considered when recruiting, during employment and at termination.\nBackground verification checks should take into consideration applicable laws, regulations, and ethics in proportion to the business requirements, the classification of the information to be accessed and the perceived risks."
            },
            {
                function: "PROTECT",
                category: "Protective Technology (PR.PT)",
                keyMeasure: true,
                controlId: "PR.PT-1",
                controlName: "Audit/log records are determined, documented, implemented, and reviewed",
                requirement: "PR.PT-1.1: Audit/log records shall be determined, documented, implemented, and reviewed.",
                guidance: "• Consider implementing logging for all critical systems and applications.\n• Consider reviewing logs regularly to detect suspicious activity.\n• Consider protecting logs from unauthorized access, modification, or deletion."
            },
            {
                function: "PROTECT",
                category: "Protective Technology (PR.PT)",
                keyMeasure: true,
                controlId: "PR.PT-4",
                controlName: "Communications and control networks are protected",
                requirement: "PR.PT-4.1: Communications and control networks shall be protected.",
                guidance: "• Consider implementing network segmentation to separate different parts of your network.\n• Consider using firewalls to control traffic between network segments.\n• Consider encrypting sensitive network traffic."
            },
            // DETECT (DE)
            {
                function: "DETECT",
                category: "Anomalies and Events (DE.AE)",
                keyMeasure: false,
                controlId: "DE.AE-3",
                controlName: "Event data are collected and correlated from multiple sources and sensors",
                requirement: "DE.AE-3.1: Event data shall be collected and correlated from multiple sources and sensors.",
                guidance: "• Consider collecting and analyzing event data from various sources, such as network devices, servers, and security appliances.\n• Consider correlating events to identify patterns that might indicate security incidents.\n• Consider implementing a security information and event management (SIEM) system."
            },
            {
                function: "DETECT",
                category: "Security Continuous Monitoring (DE.CM)",
                keyMeasure: false,
                controlId: "DE.CM-1",
                controlName: "The network is monitored to detect potential cybersecurity events",
                requirement: "DE.CM-1.1: The network shall be monitored to detect potential cybersecurity events.",
                guidance: "• Consider implementing network monitoring tools to detect unusual or suspicious network activity.\n• Consider establishing baselines of normal network behavior to help identify anomalies.\n• Consider monitoring both inbound and outbound network traffic."
            },
            {
                function: "DETECT",
                category: "Security Continuous Monitoring (DE.CM)",
                keyMeasure: false,
                controlId: "DE.CM-3",
                controlName: "Personnel activity is monitored to detect potential cybersecurity events",
                requirement: "DE.CM-3.1: Personnel activity shall be monitored to detect potential cybersecurity events.",
                guidance: "• Consider monitoring user activity to detect unusual or suspicious behavior.\n• Consider implementing user behavior analytics to identify anomalies in user activity.\n• Consider monitoring privileged user activities more closely."
            },
            {
                function: "DETECT",
                category: "Security Continuous Monitoring (DE.CM)",
                keyMeasure: true,
                controlId: "DE.CM-4",
                controlName: "Malicious code is detected",
                requirement: "DE.CM-4.1: Anti-malware software shall be deployed on all systems commonly affected by malicious software.",
                guidance: "• Consider to deploy anti-malware software on all systems commonly affected by malicious software, including servers, workstations, and mobile devices.\n• Consider to configure anti-malware software to update automatically and to scan regularly.\n• Consider to configure anti-malware software to scan all files when they are accessed and to quarantine or remove malicious files."
            },
            {
                function: "DETECT",
                category: "Security Continuous Monitoring (DE.CM)",
                keyMeasure: true,
                controlId: "DE.CM-8",
                controlName: "Vulnerability scans are performed",
                requirement: "DE.CM-8.1: Vulnerability scans shall be performed on all internet facing systems.",
                guidance: "• Consider to perform vulnerability scans on all internet-facing systems at least monthly.\n• Consider to remediate vulnerabilities in a timely manner based on the risk they pose.\n• Consider to use automated tools to perform vulnerability scans."
            },
            // RESPOND (RS)
            {
                function: "RESPOND",
                category: "Response Planning (RS.RP)",
                keyMeasure: false,
                controlId: "RS.RP-1",
                controlName: "Response plan is executed during or after an incident",
                requirement: "RS.RP-1.1: The organization shall execute its response plan during or after an incident.",
                guidance: "• The incident response process should include a predetermined set of instructions or procedures to detect, respond to, and limit consequences of a malicious cyber-attack.\n• The roles, responsibilities, and authorities in the incident response plan should be specific on involved people, contact info, different roles and responsibilities, and who makes the decision to initiate recovery procedures as well as who will be the contact with appropriate external stakeholders."
            },
            {
                function: "RESPOND",
                category: "Communications (RS.CO)",
                keyMeasure: false,
                controlId: "RS.CO-3",
                controlName: "Information is shared consistent with response plans",
                requirement: "RS.CO-3.1: Information/cybersecurity incident information shall be communicated and shared with the organization's employees in a format that they can understand.",
                guidance: "There are no additional guidelines."
            },
            {
                function: "RESPOND",
                category: "Improvements (RS.IM)",
                keyMeasure: false,
                controlId: "RS.IM-1",
                controlName: "Response plans incorporate lessons learned",
                requirement: "RS.IM-1.1: Response plans shall incorporate lessons learned.",
                guidance: "• Consider conducting post-incident reviews to identify lessons learned.\n• Consider updating response plans based on the results of the tests.\n• Consider sharing lessons learned with relevant stakeholders."
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
                controlId: "ID.AM-1",
                controlName: "Physical devices and systems within the organization are inventoried",
                requirement: "ID.AM-1.2: The inventory of assets associated with information and information processing shall reflect changes in the organization's context and include all information necessary for effective accountability.",
                guidance: "• Inventory specifications include for example, manufacturer, device type, model, serial number, machine names and network addresses, physical location…\n• Accountability is the obligation to explain, justify, and take responsibility for one's actions, it implies answerability for the outcome of the task or process.\n• Changes include the decommissioning of material."
            },
            {
                function: "IDENTIFY",
                category: "Asset Management (ID.AM)",
                keyMeasure: false,
                controlId: "ID.AM-1",
                controlName: "Physical devices and systems within the organization are inventoried",
                requirement: "ID.AM-1.3: When unauthorized hardware is detected, it shall be quarantined for possible exception handling, removed, or replaced, and the inventory shall be updated accordingly.",
                guidance: "• Any unsupported hardware without an exception documentation, is designated as unauthorized.\n• Unauthorized hardware can be detected during inventory, requests for support by the user or other means."
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
                controlId: "ID.AM-2",
                controlName: "Software platforms and applications within the organization are inventoried",
                requirement: "ID.AM-2.2: The inventory of software platforms and applications associated with information and information processing shall reflect changes in the organization's context and include all information necessary for effective accountability.",
                guidance: "The inventory of software platforms and applications should include the title, publisher, initial install/use date, and business purpose for each entry; where appropriate, include the Uniform Resource Locator (URL), app store(s), version(s), deployment mechanism, and decommission date."
            },
            {
                function: "IDENTIFY",
                category: "Asset Management (ID.AM)",
                keyMeasure: false,
                controlId: "ID.AM-2",
                controlName: "Software platforms and applications within the organization are inventoried",
                requirement: "ID.AM-2.3: Individuals who are responsible and who are accountable for administering software platforms and applications within the organization shall be identified.",
                guidance: "There are no additional guidelines."
            },
            {
                function: "IDENTIFY",
                category: "Asset Management (ID.AM)",
                keyMeasure: false,
                controlId: "ID.AM-2",
                controlName: "Software platforms and applications within the organization are inventoried",
                requirement: "ID.AM-2.4: When unauthorized software is detected, it shall be quarantined for possible exception handling, removed, or replaced, and the inventory shall be updated accordingly.",
                guidance: "• Any unsupported software without an exception documentation, is designated as unauthorized.\n• Unauthorized software can be detected during inventory, requests for support by the user or other means."
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
                controlId: "ID.AM-3",
                controlName: "Organizational communication and data flows are mapped",
                requirement: "ID.AM-3.2: All connections within the organization's ICT/OT environment, and to other organization-internal platforms shall be mapped, documented, approved, and updated as appropriate.",
                guidance: "• Connection information includes, for example, the interface characteristics, data characteristics, ports, protocols, addresses, description of the data, security requirements, and the nature of the connection.\n• Configuration management can be used as supporting asset.\n• This documentation should not be stored only on the network it represents.\n• Consider keeping a copy of this documentation in a safe offline environment (e.g. offline hard disk, paper hardcopy, …)"
            },
            {
                function: "IDENTIFY",
                category: "Asset Management (ID.AM)",
                keyMeasure: false,
                controlId: "ID.AM-4",
                controlName: "External information systems are catalogued",
                requirement: "ID.AM-4.1: The organization shall map, document, authorize and when changes occur, update, all external services and the connections made with them.",
                guidance: "• Outsourcing of systems, software platforms and applications used within the organization is covered in ID.AM-1 & ID.AM-2\n• External information systems are systems or components of systems for which organizations typically have no direct supervision and authority over the application of security requirements and controls, or the determination of the effectiveness of implemented controls on those systems i.e., services that are run in cloud, SaaS, hosting or other external environments, API (Application Programming Interface)…\n• Mapping external services and the connections made to them and authorizing them in advance avoids wasting unnecessary resources investigating a supposedly non-authenticated connection to external systems."
            },
            {
                function: "IDENTIFY",
                category: "Asset Management (ID.AM)",
                keyMeasure: false,
                controlId: "ID.AM-5",
                controlName: "Resources are prioritized based on their classification, criticality, and business value",
                requirement: "ID.AM-5.1: The organization's resources (hardware, devices, data, time, personnel, information, and software) shall be prioritized based on their classification, criticality, and business value.",
                guidance: "• Determine organization's resources (e.g., hardware, devices, data, time, personnel, information, and software):\n  o What would happen to my business if these resources were made public, damaged, lost…?\n  o What would happen to my business when the integrity of resources is no longer guaranteed?\n  o What would happen to my business if I/my customers couldn't access these resources? And rank these resources based on their classification, criticality, and business value.\n• Resources should include enterprise assets.\n• Create a classification for sensitive information by first determining categories, e.g.\n  o Public - freely accessible to all, even externally\n  o Internal - accessible only to members of your organization\n  o Confidential - accessible only to those whose duties require access.\n• Communicate these categories and identify what types of data fall into these categories (HR data, financial data, legal data, personal data, etc.).\n• Consider the use of the Traffic Light Protocol (TLP).\n• Data classification should apply to the three aspects: C-I-A."
            },
            {
                function: "IDENTIFY",
                category: "Asset Management (ID.AM)",
                keyMeasure: true,
                controlId: "ID.AM-6",
                controlName: "Cybersecurity roles, responsibilities, and authorities for the entire workforce and third-party stakeholders are established",
                requirement: "ID.AM-6.1: Information security and cybersecurity roles, responsibilities and authorities within the organization shall be documented, reviewed, authorized, and updated and alignment with organization-internal roles and external partners.",
                guidance: "It should be considered to:\n• Describe security roles, responsibilities, and authorities: who in your organization should be consulted, informed, and held accountable for all or part of your assets.\n• Provide security roles, responsibilities, and authority for all key functions in information/cyber security (legal, detection activities…).\n• Include information/cybersecurity roles and responsibilities for third-party providers (e.g., suppliers, customers, partners) with physical or logical access to the organization's ICT/OT environment."
            },
            {
                function: "IDENTIFY",
                category: "Business Environment (ID.BE)",
                keyMeasure: false,
                controlId: "ID.BE-1",
                controlName: "The organization's role in the supply chain is identified and communicated",
                requirement: "ID.BE-1.1: The organization's role in the supply chain shall be identified, documented, and communicated.",
                guidance: "• The organisation should be able to clearly identify who is upstream and downstream of the organisation and which suppliers provide services, capabilities, products and items to the organisation.\n• The organisation should communicate its position to its upstream and downstream so that it is understood where they sit in terms of critical importance to the organisation's operations."
            },
            {
                function: "IDENTIFY",
                category: "Business Environment (ID.BE)",
                keyMeasure: false,
                controlId: "ID.BE-2",
                controlName: "The organization's place in critical infrastructure and its industry sector is identified and communicated",
                requirement: "ID.BE-2.1: The organization's place in critical infrastructure and its industry sector shall be identified and communicated.",
                guidance: "The organisation covered by NIS legislation has a responsibility to know the other organisations in the same sector in order to work with them to achieve the objectives set by NIS for that particular sector."
            },
            {
                function: "IDENTIFY",
                category: "Business Environment (ID.BE)",
                keyMeasure: false,
                controlId: "ID.BE-3",
                controlName: "Priorities regarding organizational mission, objectives, and activities are established and communicated",
                requirement: "ID.BE-3.1: Priorities for organizational mission, objectives, and activities are established and communicated.",
                guidance: "Information protection needs should be determined, and the related processes revised as necessary."
            },
            {
                function: "IDENTIFY",
                category: "Business Environment (ID.BE)",
                keyMeasure: false,
                controlId: "ID.BE-4",
                controlName: "Dependencies and critical functions for delivery of critical services are established",
                requirement: "ID.BE-4.1: Dependencies and mission-critical functions for the delivery of critical services shall be identified, documented, and prioritized according to their criticality as part of the risk assessment process.",
                guidance: "Dependencies and business critical functions should include support services."
            },
            {
                function: "IDENTIFY",
                category: "Business Environment (ID.BE)",
                keyMeasure: false,
                controlId: "ID.BE-5",
                controlName: "Resilience requirements to support delivery of critical services are established for all operating states",
                requirement: "ID.BE-5.1: To support cyber resilience and secure the delivery of critical services, the necessary requirements are identified, documented and their implementation tested and approved.",
                guidance: "• Consider implementing resiliency mechanisms to support normal and adverse operational situations (e.g., failsafe, load balancing, hot swap).\n• Consider aspects of business continuity management in e.g. Business Impact Analyse (BIA), Disaster Recovery Plan (DRP) and Business Continuity Plan (BCP)."
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
                controlId: "ID.GV-1",
                controlName: "Organizational cybersecurity policy is established and communicated",
                requirement: "ID.GV-1.2: An organization-wide information security and cybersecurity policy shall be established, documented, updated when changes occur, disseminated, and approved by senior management.",
                guidance: "The policy should include, for example:\n• The identification and assignment of roles, responsibilities, management commitment, coordination among organizational entities, and compliance. Guidance on role profiles along with their identified titles, missions, tasks, skills, knowledge, competences is available in the \"European Cybersecurity Skills Framework Role Profiles\" by ENISA. (https://www.enisa.europa.eu/publications/europeancybersecurity-skills-framework-role-profiles)\n• The coordination among organizational entities responsible for the different aspects of security (i.e., technical, physical, personnel, cyber-physical, information, access control, media protection, vulnerability management, maintenance, monitoring)\n• The coverage of the full life cycle of the ICT/OT systems."
            },
            {
                function: "IDENTIFY",
                category: "Governance (ID.GV)",
                keyMeasure: false,
                controlId: "ID.GV-3",
                controlName: "Legal and regulatory requirements regarding cybersecurity, including privacy and civil liberties obligations, are understood, and managed",
                requirement: "ID.GV-3.1: Legal and regulatory requirements regarding information/cybersecurity, including privacy obligations, shall be understood, and implemented.",
                guidance: "No additional guidance on this topic."
            },
            {
                function: "IDENTIFY",
                category: "Governance (ID.GV)",
                keyMeasure: false,
                controlId: "ID.GV-3",
                controlName: "Legal and regulatory requirements regarding cybersecurity, including privacy and civil liberties obligations, are understood, and managed",
                requirement: "ID.GV-3.2: Legal and regulatory requirements regarding information/cybersecurity, including privacy obligations, shall be managed.",
                guidance: "• There should be regular reviews to ensure the continuous compliance with legal and regulatory requirements regarding information/cybersecurity, including privacy obligations.\n• This requirement also applies to contractors and service providers."
            },
            {
                function: "IDENTIFY",
                category: "Governance (ID.GV)",
                keyMeasure: false,
                controlId: "ID.GV-4",
                controlName: "Governance and risk management processes address cybersecurity risks",
                requirement: "ID.GV-4.1: As part of the company's overall risk management, a comprehensive strategy to manage information security and cybersecurity risks shall be developed and updated when changes occur.",
                guidance: "This strategy should include determining and allocating the required resources to protect the organization's business-critical assets."
            },
            {
                function: "IDENTIFY",
                category: "Governance (ID.GV)",
                keyMeasure: false,
                controlId: "ID.GV-4",
                controlName: "Governance and risk management processes address cybersecurity risks",
                requirement: "ID.GV-4.2: Information security and cybersecurity risks shall be documented, formally approved, and updated when changes occur.",
                guidance: "Consider using Risk Management tools."
            },
            {
                function: "IDENTIFY",
                category: "Risk Assessment (ID.RA)",
                keyMeasure: false,
                controlId: "ID.RA-1",
                controlName: "Asset vulnerabilities are identified and documented",
                requirement: "ID.RA-1.1: Threats and vulnerabilities shall be identified.",
                guidance: "• A vulnerability refers to a weakness in the organization's hardware, software, or procedures. It is a gap through which a bad actor can gain access to the organization's assets. A vulnerability exposes an organization to threats.\n• A threat is a malicious or negative event that takes advantage of a vulnerability.\n• The risk is the potential for loss and damage when the threat does occur."
            },
            {
                function: "IDENTIFY",
                category: "Risk Assessment (ID.RA)",
                keyMeasure: false,
                controlId: "ID.RA-1",
                controlName: "Asset vulnerabilities are identified and documented",
                requirement: "ID.RA-1.2: A process shall be established to monitor, identify, and document vulnerabilities of the organisation's business critical systems in a continuous manner.",
                guidance: "• Where safe and feasible, the use of vulnerability scanning should be considered.\n• The organization should establish and maintain a testing program appropriate to its size, complexity, and maturity."
            },
            {
                function: "IDENTIFY",
                category: "Risk Assessment (ID.RA)",
                keyMeasure: false,
                controlId: "ID.RA-2",
                controlName: "Cyber threat intelligence is received from information sharing forums and sources",
                requirement: "ID.RA-2.1: A threat and vulnerability awareness program that includes a cross-organization information-sharing capability shall be implemented.",
                guidance: "A threat and vulnerability awareness program should include ongoing contact with security groups and associations to receive security alerts and advisories. (Security groups and associations include, for example, special interest groups, forums, professional associations, news groups, and/or peer groups of security professionals in similar organizations).This contact can include the sharing of information about potential vulnerabilities and incidents. This sharing capability should have an unclassified and classified information sharing capability."
            },
            {
                function: "IDENTIFY",
                category: "Risk Assessment (ID.RA)",
                keyMeasure: false,
                controlId: "ID.RA-5",
                controlName: "Threats, vulnerabilities, likelihoods, and impacts are used to determine risk",
                requirement: "ID.RA-5.1: The organization shall conduct risk assessments in which risk is determined by threats, vulnerabilities and impact on business processes and assets.",
                guidance: "• Keep in mind that threats exploit vulnerabilities.\n• Identify the consequences that losses of confidentiality, integrity and availability may have on the assets and related business processes."
            },
            {
                function: "IDENTIFY",
                category: "Risk Assessment (ID.RA)",
                keyMeasure: false,
                controlId: "ID.RA-5",
                controlName: "Threats, vulnerabilities, likelihoods, and impacts are used to determine risk",
                requirement: "ID.RA-5.2: The organization shall conduct and document risk assessments in which risk is determined by threats, vulnerabilities, impact on business processes and assets, and the likelihood of their occurrence.",
                guidance: "• Risk assessment should include threats from insiders and external parties.\n• Qualitative and/or quantitative risk analysis methods (MAPGOOD, ISO27005, CIS RAM, …) can be used together with software tooling."
            },
            {
                function: "IDENTIFY",
                category: "Risk Assessment (ID.RA)",
                keyMeasure: false,
                controlId: "ID.RA-6",
                controlName: "Risk responses are identified and prioritized",
                requirement: "ID.RA-6.1: A comprehensive strategy shall be developed and implemented to manage risks to the organization's critical systems, that includes the identification and prioritization of risk responses.",
                guidance: "• Management and employees should be involved in information- and cybersecurity.\n• It should be identified what the most important assets are, and how they are protected.\n• It should be clear what impact will be if these assets are compromised.\n• It should be established how the implementation of adequate mitigation measures will be organized."
            },
            {
                function: "IDENTIFY",
                category: "Risk Management (ID.RM)",
                keyMeasure: false,
                controlId: "ID.RM-1",
                controlName: "Risk management processes are established, managed, and agreed to by organizational stakeholders",
                requirement: "ID.RM-1.1: A cyber risk management process that identifies key internal and external stakeholders and facilitates addressing risk-related issues and information shall be created, documented, reviewed, approved, and updated when changes occur.",
                guidance: "External stakeholders include customers, investors, shareholders, suppliers, government agencies and the wider community."
            },
            {
                function: "IDENTIFY",
                category: "Risk Management (ID.RM)",
                keyMeasure: false,
                controlId: "ID.RM-2",
                controlName: "Organizational risk tolerance is determined and clearly expressed",
                requirement: "ID.RM-2.1: The organization shall clearly determine its risk appetite.",
                guidance: "Determination and expression of risk tolerance (risk appetite) should be in line with the policies on information security and cybersecurity, to facilitate demonstration of coherence between policies, risk tolerance and measures."
            },
            {
                function: "IDENTIFY",
                category: "Risk Management (ID.RM)",
                keyMeasure: false,
                controlId: "ID.RM-3",
                controlName: "The organization's determination of risk tolerance is informed by its role in critical infrastructure and sector specific risk analysis",
                requirement: "ID.RM-3.1: The organization's role in critical infrastructure and its sector shall determine the organization's risk appetite.",
                guidance: "No additional guidance on this topic."
            },
            {
                function: "IDENTIFY",
                category: "Supply Chain Risk Management (ID.SC)",
                keyMeasure: false,
                controlId: "ID.SC-2",
                controlName: "Suppliers and third-party partners of information systems, components, and services are identified, prioritized, and assessed using a cyber supply chain risk assessment process",
                requirement: "ID.SC-2.1: The organization shall conduct cyber supply chain risk assessments at least annually or when a change to the organization's critical systems, operational environment, or supply chain occurs; These assessments shall be documented, and the results disseminated to relevant stakeholders including those responsible for ICT/OT systems.",
                guidance: "This assessment should identify and prioritize potential negative impacts to the organization from the risks associated with the distributed and interconnected nature of ICT/OT product and service supply chains."
            },
            {
                function: "IDENTIFY",
                category: "Supply Chain Risk Management (ID.SC)",
                keyMeasure: false,
                controlId: "ID.SC-3",
                controlName: "Contracts with suppliers and third-party partners are used to implement appropriate measures designed to meet the objectives of an organization's cybersecurity program and Cyber Supply Chain Risk Management Plan",
                requirement: "ID.SC-3.1: Based on the results of the cyber supply chain risk assessment, a contractual framework for suppliers and external partners shall be established to address sharing of sensitive information and distributed and interconnected ICT/OT products and services.",
                guidance: "• Entities not subject to the NIS legislation should consider business critical suppliers and third-party partners only.\n• Keep in mind that GDPR requirements need to be fulfilled when business information contains personal data (applicable on all levels), i.e. security measures need to be addressed in the contractual framework."
            },
            {
                function: "IDENTIFY",
                category: "Supply Chain Risk Management (ID.SC)",
                keyMeasure: false,
                controlId: "ID.SC-4",
                controlName: "Suppliers and third-party partners are routinely assessed using audits, test results, or other forms of evaluations to confirm they are meeting their contractual obligations",
                requirement: "ID.SC-4.1: The organization shall review assessments of suppliers' and third-party partner's compliance with contractual obligations by routinely reviewing audits, test results, and other evaluations.",
                guidance: "Entities not subject to the NIS legislation could limit themselves to business-critical suppliers and third-party partners only."
            },
            {
                function: "IDENTIFY",
                category: "Supply Chain Risk Management (ID.SC)",
                keyMeasure: false,
                controlId: "ID.SC-5",
                controlName: "Response and recovery planning and testing are conducted with suppliers and third-party providers",
                requirement: "ID.SC-5.1: The organization shall identify and document key personnel from suppliers and third-party partners to include them as stakeholders in response and recovery planning activities.",
                guidance: "Entities not subject to the NIS legislation could limit themselves to business-critical suppliers and third-party partners only."
            },
            // PROTECT (PR)
            {
                function: "PROTECT",
                category: "Access Control (PR.AC)",
                keyMeasure: true,
                controlId: "PR.AC-1",
                controlName: "Identities and credentials are issued, managed, verified, revoked, and audited for authorized devices, users and processes",
                requirement: "PR.AC-1.3: Accounts shall be managed, including removal of accounts when no longer required.",
                guidance: "• Consider to implement a process for managing accounts, including creating, modifying, disabling, and removing accounts.\n• Consider to review accounts regularly to ensure that they are still needed and that the access rights are appropriate.\n• Consider to remove accounts when an employee leaves or changes roles."
            },
            {
                function: "PROTECT",
                category: "Access Control (PR.AC)",
                keyMeasure: true,
                controlId: "PR.AC-1",
                controlName: "Identities and credentials are issued, managed, verified, revoked, and audited for authorized devices, users and processes",
                requirement: "PR.AC-1.4: Multi-factor authentication shall be used for remote access to the organization's network.",
                guidance: "• Consider to use multi-factor authentication for all remote access to the organization's network.\n• Consider to use multi-factor authentication for all access to sensitive systems and data.\n• Consider to use multi-factor authentication for all administrator access."
            },
            {
                function: "PROTECT",
                category: "Access Control (PR.AC)",
                keyMeasure: false,
                controlId: "PR.AC-3",
                controlName: "Remote access is managed",
                requirement: "PR.AC-3.2: Remote access to the organization's network shall be monitored and controlled.",
                guidance: "• Consider to monitor and control all remote access to the organization's network.\n• Consider to use a virtual private network (VPN) for all remote access.\n• Consider to limit remote access to only those who need it to perform their job functions."
            },
            {
                function: "PROTECT",
                category: "Access Control (PR.AC)",
                keyMeasure: false,
                controlId: "PR.AC-5",
                controlName: "Network integrity is protected (e.g., network segregation, network segmentation)",
                requirement: "PR.AC-5.1: The organization's network shall be segregated.",
                guidance: "• Consider to segregate the network into different zones based on the sensitivity of the data and systems in each zone.\n• Consider to use firewalls and access control lists to control traffic between zones.\n• Consider to monitor traffic between zones for suspicious activity."
            },
            {
                function: "PROTECT",
                category: "Data Security (PR.DS)",
                keyMeasure: false,
                controlId: "PR.DS-3",
                controlName: "Assets are formally managed throughout removal, transfers, and disposition",
                requirement: "PR.DS-3.1: The organization shall protect and securely handle assets throughout their lifecycle.",
                guidance: "• Consider to implement procedures for the secure handling of assets throughout their lifecycle, including acquisition, use, maintenance, and disposal.\n• Consider to implement procedures for the secure disposal of assets, including the secure wiping of data storage devices.\n• Consider to implement procedures for the secure transfer of assets, including the secure transfer of data."
            },
            {
                function: "PROTECT",
                category: "Information Protection Processes and Procedures (PR.IP)",
                keyMeasure: true,
                controlId: "PR.IP-3",
                controlName: "Configuration change control processes are in place",
                requirement: "PR.IP-3.1: The organization shall test, validate, and document changes to the information systems before implementing the changes on the operational system.",
                guidance: "• Consider to implement a change management process that includes testing, validation, and documentation of changes before implementation.\n• Consider to implement a rollback plan for each change in case the change causes problems.\n• Consider to implement a change approval process that includes appropriate stakeholders."
            },
            {
                function: "PROTECT",
                category: "Information Protection Processes and Procedures (PR.IP)",
                keyMeasure: true,
                controlId: "PR.IP-12",
                controlName: "A vulnerability management plan is developed and implemented",
                requirement: "PR.IP-12.1: The organization shall develop and implement a vulnerability management plan.",
                guidance: "• Consider to implement a vulnerability management process that includes identifying, evaluating, treating, and reporting vulnerabilities.\n• Consider to implement a vulnerability scanning program that includes regular scanning of all systems.\n• Consider to implement a patch management process that includes timely application of security patches."
            },
            {
                function: "PROTECT",
                category: "Protective Technology (PR.PT)",
                keyMeasure: false,
                controlId: "PR.PT-1",
                controlName: "Audit/log records are determined, documented, implemented, and reviewed in accordance with policy",
                requirement: "PR.PT-1.1: The organization shall generate audit records containing information that establishes what type of event occurred, when the event occurred, where the event occurred, the source of the event, the outcome of the event, and the identity of any individuals or subjects associated with the event.",
                guidance: "• Consider to implement logging on all systems that includes the type of event, when the event occurred, where the event occurred, the source of the event, the outcome of the event, and the identity of any individuals or subjects associated with the event.\n• Consider to implement a log management system that collects, stores, and analyzes logs from all systems.\n• Consider to review logs regularly for suspicious activity."
            },
            // DETECT (DE)
            {
                function: "DETECT",
                category: "Anomalies and Events (DE.AE)",
                keyMeasure: false,
                controlId: "DE.AE-2",
                controlName: "Detected events are analyzed to understand attack targets and methods",
                requirement: "DE.AE-2.1: The organization shall analyze detected events to understand attack targets and methods.",
                guidance: "• Consider to implement a process for analyzing detected events to understand attack targets and methods.\n• Consider to use threat intelligence to understand attack targets and methods.\n• Consider to share information about attack targets and methods with appropriate stakeholders."
            },
            {
                function: "DETECT",
                category: "Security Continuous Monitoring (DE.CM)",
                keyMeasure: false,
                controlId: "DE.CM-1",
                controlName: "The network is monitored to detect potential cybersecurity events",
                requirement: "DE.CM-1.1: The organization shall monitor its networks to detect potential cybersecurity events.",
                guidance: "• Consider implementing network monitoring that includes monitoring for unauthorized access, unauthorized changes, and unusual traffic patterns.\n• Consider implementing intrusion detection systems that can detect potential cybersecurity events.\n• Consider implementing a security information and event management (SIEM) system that can collect and analyze security events from multiple sources."
            },
            {
                function: "DETECT",
                category: "Security Continuous Monitoring (DE.CM)",
                keyMeasure: false,
                controlId: "DE.CM-3",
                controlName: "Personnel activity is monitored to detect potential cybersecurity events",
                requirement: "DE.CM-3.1: The organization shall monitor personnel activity to detect potential cybersecurity events.",
                guidance: "• Consider monitoring personnel activity for unauthorized access, unauthorized changes, and unusual behavior.\n• Consider implementing user behavior analytics that can detect unusual behavior.\n• Consider implementing access controls that can prevent unauthorized access."
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
                function: "RECOVER",
                category: "Recovery Planning (RC.RP)",
                keyMeasure: false,
                controlId: "RC.RP-1",
                controlName: "Recovery plan is executed during or after a cybersecurity incident",
                requirement: "RC.RP-1.1: The organization shall execute its recovery plan during or after a cybersecurity incident.",
                guidance: "• Consider developing a recovery plan that outlines the steps to restore systems and data after an incident.\n• Consider testing the recovery plan regularly to ensure it is effective.\n• Consider updating the recovery plan based on lessons learned from incidents and exercises."
            },
            {
                function: "RECOVER",
                category: "Improvements (RC.IM)",
                keyMeasure: false,
                controlId: "RC.IM-1",
                controlName: "Lessons learned from incidents are incorporated into future strategies",
                requirement: "RC.IM-1.1: The organization shall incorporate lessons learned from incidents into future strategies.",
                guidance: "• Consider conducting post-incident reviews to identify lessons learned.\n• Consider updating response and recovery strategies based on lessons learned.\n• Consider sharing lessons learned with relevant stakeholders."
            },
            {
                function: "RECOVER",
                category: "Improvements (RC.IM)",
                keyMeasure: false,
                controlId: "RC.IM-2",
                controlName: "Response and recovery strategies are updated",
                requirement: "RC.IM-2.1: The organization shall update response and recovery strategies as needed.",
                guidance: "Ensure that response and recovery strategies are regularly reviewed and updated to reflect new insights and lessons learned."
            },
            {
                function: "RECOVER",
                category: "Communications (RC.CO)",
                keyMeasure: false,
                controlId: "RC.CO-1",
                controlName: "Public relations during recovery are managed",
                requirement: "RC.CO-1.1: The organization shall manage public relations during recovery.",
                guidance: "• Develop a communication plan to manage public relations during recovery.\n• Ensure clear and consistent communication with stakeholders."
            },
            {
                function: "RECOVER",
                category: "Communications (RC.CO)",
                keyMeasure: false,
                controlId: "RC.CO-3",
                controlName: "Recovery activities are communicated to stakeholders and management teams",
                requirement: "RC.CO-3.1: The organization shall communicate recovery activities to stakeholders and management teams.",
                guidance: "• Ensure that recovery activities are clearly communicated to all relevant parties.\n• Consider using multiple communication channels to reach all stakeholders."
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
                controlName: "Identities are proofed and bound to credentials and asserted in interactions",
                requirement: "PR.AC-6.1: The organization shall proof identities and bind them to credentials.",
                guidance: "• Consider to implement a process for verifying the identity of individuals before issuing credentials.\n• Consider to bind credentials to verified identities.\n• Consider to assert identities in interactions through authentication mechanisms."
            },
            {
                function: "PROTECT",
                category: "Awareness and Training (PR.AT)",
                keyMeasure: true,
                controlId: "PR.AT-1",
                controlName: "All users are informed and trained",
                requirement: "PR.AT-1.1: The organization shall provide cybersecurity awareness training to all users.",
                guidance: "• Consider to provide cybersecurity awareness training to all users, including employees, contractors, and third-party stakeholders.\n• Consider to tailor the training to the specific roles and responsibilities of the users.\n• Consider to provide the training at least annually and when significant changes occur."
            },
            {
                function: "PROTECT",
                category: "Data Security (PR.DS)",
                keyMeasure: false,
                controlId: "PR.DS-4",
                controlName: "Adequate capacity to ensure availability is maintained",
                requirement: "PR.DS-4.1: The organization shall maintain adequate capacity to ensure availability.",
                guidance: "• Consider to monitor system capacity and performance regularly.\n• Consider to implement capacity planning processes to ensure that adequate capacity is maintained.\n• Consider to implement redundancy and failover mechanisms to ensure availability."
            },
            {
                function: "PROTECT",
                category: "Data Security (PR.DS)",
                keyMeasure: false,
                controlId: "PR.DS-5",
                controlName: "Protections against data leaks are implemented",
                requirement: "PR.DS-5.1: The organization shall implement protections against data leaks.",
                guidance: "• Consider to implement data loss prevention (DLP) solutions that can detect and prevent data leaks.\n• Consider to implement access controls that limit access to sensitive data.\n• Consider to implement encryption for sensitive data in transit and at rest."
            },
            {
                function: "PROTECT",
                category: "Information Protection Processes and Procedures (PR.IP)",
                keyMeasure: true,
                controlId: "PR.IP-1",
                controlName: "A baseline configuration of information technology/industrial control systems is created and maintained incorporating security principles (e.g. concept of least functionality)",
                requirement: "PR.IP-1.1: The organization shall create and maintain a baseline configuration of information technology/industrial control systems.",
                guidance: "• Consider to create and maintain baseline configurations for all systems.\n• Consider to incorporate security principles, such as least functionality, in the baseline configurations.\n• Consider to review and update the baseline configurations regularly and when changes occur."
            },
            {
                function: "PROTECT",
                category: "Information Protection Processes and Procedures (PR.IP)",
                keyMeasure: true,
                controlId: "PR.IP-2",
                controlName: "A System Development Life Cycle to manage systems is implemented",
                requirement: "PR.IP-2.1: The organization shall implement a System Development Life Cycle to manage systems.",
                guidance: "• Consider to implement a System Development Life Cycle (SDLC) that includes security considerations at each phase.\n• Consider to include security testing in the SDLC.\n• Consider to include security reviews in the SDLC."
            },
            {
                function: "PROTECT",
                category: "Protective Technology (PR.PT)",
                keyMeasure: false,
                controlId: "PR.PT-2",
                controlName: "Removable media is protected and its use restricted according to policy",
                requirement: "PR.PT-2.1: The organization shall protect removable media and restrict its use according to policy.",
                guidance: "• Consider to implement policies and procedures for the use of removable media.\n• Consider to implement technical controls that restrict the use of removable media.\n• Consider to implement encryption for sensitive data stored on removable media."
            },
            // DETECT (DE)
            {
                function: "DETECT",
                category: "Anomalies and Events (DE.AE)",
                keyMeasure: false,
                controlId: "DE.AE-1",
                controlName: "A baseline of network operations and expected data flows for users and systems is established and managed",
                requirement: "DE.AE-1.1: The organization shall establish and manage a baseline of network operations and expected data flows for users and systems.",
                guidance: "• Consider to establish baselines for network operations and data flows.\n• Consider to monitor network operations and data flows for deviations from the baselines.\n• Consider to investigate and respond to deviations from the baselines."
            },
            {
                function: "DETECT",
                category: "Anomalies and Events (DE.AE)",
                keyMeasure: false,
                controlId: "DE.AE-3",
                controlName: "Event data are collected and correlated from multiple sources and sensors",
                requirement: "DE.AE-3.1: The organization shall collect and correlate event data from multiple sources and sensors.",
                guidance: "• Consider to implement a security information and event management (SIEM) system that can collect and correlate event data from multiple sources.\n• Consider to implement sensors and monitoring tools that can collect event data.\n• Consider to analyze correlated event data for patterns and anomalies."
            },
            {
                function: "DETECT",
                category: "Security Continuous Monitoring (DE.CM)",
                keyMeasure: false,
                controlId: "DE.CM-2",
                controlName: "The physical environment is monitored to detect potential cybersecurity events",
                requirement: "DE.CM-2.1: The organization shall monitor the physical environment to detect potential cybersecurity events.",
                guidance: "• Consider to implement physical security controls, such as surveillance cameras and access logs.\n• Consider to monitor physical security controls for unauthorized access and suspicious activity.\n• Consider to investigate and respond to potential physical security incidents."
            },
            {
                function: "DETECT",
                category: "Detection Processes (DE.DP)",
                keyMeasure: false,
                controlId: "DE.DP-1",
                controlName: "Roles and responsibilities for detection are well defined to ensure accountability",
                requirement: "DE.DP-1.1: The organization shall define roles and responsibilities for detection to ensure accountability.",
                guidance: "• Consider to define roles and responsibilities for detection activities, such as monitoring, analysis, and response.\n• Consider to assign these roles and responsibilities to specific individuals or teams.\n• Consider to ensure that these individuals or teams have the necessary skills and resources."
            },
            // RESPOND (RS)
            {
                function: "RESPOND",
                category: "Communications (RS.CO)",
                keyMeasure: false,
                controlId: "RS.CO-1",
                controlName: "Personnel know their roles and order of operations when a response is needed",
                requirement: "RS.CO-1.1: The organization shall ensure that personnel know their roles, objectives, restoration priorities, task sequences (order of operations) and assignment responsibilities for event response.",
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
                category: "Analysis (RS.AN)",
                keyMeasure: false,
                controlId: "RS.AN-2",
                controlName: "The impact of the incident is understood",
                requirement: "RS.AN-2.1: Thorough investigation and result analysis shall be the base for understanding the full implication of the information/cybersecurity incident.",
                guidance: "• Result analysis can involve the outcome of determining the correlation between the information of the detected event and the outcome of risk assessments. In this way, insight is gained into the impact of the event across the organization.\n• Consider including detection of unauthorized changes to its critical systems in its incident response capabilities."
            },
            {
                function: "RESPOND",
                category: "Mitigation (RS.MI)",
                keyMeasure: false,
                controlId: "RS.MI-1",
                controlName: "Incidents are contained",
                requirement: "RS.MI-1.1: The organization shall contain incidents to minimize their impact.",
                guidance: "• Consider to implement processes for containing incidents, such as isolating affected systems, blocking malicious traffic, and revoking compromised credentials.\n• Consider to document containment actions for each incident.\n• Consider to test containment procedures regularly to ensure their effectiveness."
            },
            // RECOVER (RC)
            {
                function: "RECOVER",
                category: "Recovery Planning (RC.RP)",
                keyMeasure: false,
                controlId: "RC.RP-1",
                controlName: "Recovery plan is executed during or after a cybersecurity incident",
                requirement: "RC.RP-1.2: The organization shall develop and implement a recovery plan.",
                guidance: "• Consider developing a recovery plan that outlines the steps to restore systems and data after an incident.\n• Consider testing the recovery plan regularly to ensure it is effective.\n• Consider updating the recovery plan based on lessons learned from incidents and tests."
            },
            {
                function: "RECOVER",
                category: "Improvements (RC.IM)",
                keyMeasure: false,
                controlId: "RC.IM-1",
                controlName: "Recovery plans incorporate lessons learned",
                requirement: "RC.IM-1.1: The organization shall incorporate lessons learned into recovery plans.",
                guidance: "• Consider conducting post-incident reviews to identify lessons learned.\n• Consider incorporating these lessons learned into recovery plans.\n• Consider sharing lessons learned with appropriate stakeholders."
            },
            {
                function: "RECOVER",
                category: "Communications (RC.CO)",
                keyMeasure: false,
                controlId: "RC.CO-1",
                controlName: "Public relations are managed",
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
        calculateCategoryScore: function(categoryId, documentationScores, implementationScores) {
            let docTotal = 0;
            let implTotal = 0;
            let count = 0;
            
            // Trouver tous les contrôles de cette catégorie
            const controls = this.getControlsByCategoryId(categoryId);
            
            controls.forEach(control => {
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
        
        // Obtenir tous les contrôles d'une catégorie
        getControlsByCategoryId: function(categoryId) {
            const level = document.getElementById('assessmentLevel').value;
            const allControls = cyfunData.controls[level];
            
            return allControls.filter(control => control.category.includes(categoryId));
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
