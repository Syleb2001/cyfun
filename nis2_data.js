// Données extraites des fichiers JSON NIS2_scope_formulas.json et NIS2_scope_text.json
const nis2Data = {
    // Listes de référence
    lists: {
        yesNo: ["Oui", "Non", "Sélectionner"],
        enterpriseSize: ["Micro-entreprise", "Petite entreprise", "Moyenne entreprise", "Grande entreprise"],
        scope: ["Hors champ", "Entité importante", "Entité essentielle", "Hors champ (taille)"],
        result: ["Hors champ", "Entité importante", "Entité essentielle", "Hors champ (taille)", "Entité importante (DNS)", "Entité essentielle (DNS)", "Hors champ (services)", "Entité importante (registre TLD)"]
    },
    
    // Structure des secteurs et services
    sectors: [
        {
            name: "Banque",
            subcategories: [
                {
                    name: "Banque",
                    services: [
                        { id: "C30", name: "Établissements de crédit", tooltip: "Un établissement dont l'activité consiste à recevoir du public des dépôts ou d'autres fonds remboursables et à octroyer des crédits pour son propre compte." }
                    ]
                },
                {
                    name: "Infrastructures des marchés financiers",
                    services: [
                        { id: "C32", name: "Opérateurs de plateformes de négociation", tooltip: "Toute personne qui gère et/ou exploite un système multilatéral qui assure ou facilite la rencontre de multiples intérêts acheteurs et vendeurs exprimés par des tiers pour des instruments financiers." },
                        { id: "C33", name: "Contreparties centrales (CCP)", tooltip: "Une personne morale qui s'interpose entre les contreparties aux contrats négociés sur un ou plusieurs marchés financiers, en devenant l'acheteur vis-à-vis de tout vendeur et le vendeur vis-à-vis de tout acheteur." }
                    ]
                }
            ]
        },
        {
            name: "Numérique",
            subcategories: [
                {
                    name: "Infrastructure numérique",
                    services: [
                        { id: "C36", name: "Fournisseurs de points d'échange internet", tooltip: "Une installation de réseau qui permet l'interconnexion de plus de deux systèmes autonomes indépendants, essentiellement aux fins de faciliter l'échange de trafic internet." },
                        { id: "C37", name: "Fournisseurs de services DNS, à l'exclusion des opérateurs de serveurs racines de noms", tooltip: "Une entité qui fournit des services de résolution de noms de domaine récursifs ou faisant autorité à des utilisateurs finaux de l'internet ou à d'autres fournisseurs de services DNS." },
                        { id: "C38", name: "Registres de noms de domaine de premier niveau", tooltip: "Une entité qui a été déléguée un domaine de premier niveau spécifique et qui est responsable de l'administration du domaine de premier niveau, y compris l'enregistrement des noms de domaine sous le domaine de premier niveau et la gestion technique." },
                        { id: "C39", name: "Fournisseurs de services d'informatique en nuage", tooltip: "Un service numérique qui permet l'accès à un ensemble modulable et variable de ressources informatiques distribuées pouvant être partagées." },
                        { id: "C40", name: "Fournisseurs de services de centres de données", tooltip: "Une entité qui fournit des services englobant les structures, ou groupes de structures, dédiés à l'hébergement, à l'interconnexion et à l'exploitation centralisés d'équipements informatiques et de réseau fournissant des services de stockage, de traitement et de transport de données ainsi que toutes les installations et infrastructures de distribution d'énergie et de contrôle environnemental." },
                        { id: "C41", name: "Fournisseurs de réseaux de diffusion de contenu", tooltip: "Un réseau d'ordinateurs et de serveurs géographiquement distribués qui répliquent le contenu et les données provenant d'un serveur d'origine et les mettent à la disposition des utilisateurs finaux afin d'améliorer les performances, comme la vitesse de chargement." },
                        { id: "C42", name: "Prestataires de services de confiance qualifiés", tooltip: "Un prestataire de services de confiance qui fournit un ou plusieurs services de confiance qualifiés et qui a obtenu de l'organisme de contrôle le statut qualifié." },
                        { id: "C43", name: "Prestataires de services de confiance non qualifiés", tooltip: "Un prestataire de services de confiance qui fournit un ou plusieurs services de confiance." }
                    ]
                },
                {
                    name: "Fournisseurs de réseaux et services de communications électroniques",
                    services: [
                        { id: "C44", name: "Fournisseurs de réseaux publics de communications électroniques", tooltip: "Un réseau de communications électroniques utilisé entièrement ou principalement pour la fourniture de services de communications électroniques accessibles au public permettant le transfert d'informations entre les points de terminaison du réseau." },
                        { id: "C45", name: "Fournisseurs de services de communications électroniques accessibles au public", tooltip: "Un service normalement fourni contre rémunération via des réseaux de communications électroniques qui englobe, à l'exception des services consistant à fournir des contenus transmis à l'aide de réseaux et de services de communications électroniques ou à exercer une responsabilité éditoriale sur ces contenus, les types de services suivants: service d'accès à l'internet, service de communications interpersonnelles, services consistant entièrement ou principalement en la transmission de signaux." }
                    ]
                },
                {
                    name: "Gestion des services informatiques (entreprise à entreprise)",
                    services: [
                        { id: "C47", name: "Fournisseurs de services gérés", tooltip: "Un fournisseur de services qui assure l'exploitation, la maintenance et la surveillance quotidiennes des systèmes informatiques, des applications et de l'infrastructure informatique d'un client." },
                        { id: "C48", name: "Fournisseurs de services de sécurité gérés", tooltip: "Un fournisseur de services qui assure la surveillance et la gestion des dispositifs et des systèmes de sécurité d'un client." }
                    ]
                },
                {
                    name: "Fournisseurs numériques",
                    services: [
                        { id: "C50", name: "Fournisseurs de places de marché en ligne", tooltip: "Un service numérique qui permet aux consommateurs et/ou aux professionnels de conclure des contrats de vente ou de service en ligne avec des professionnels soit sur le site internet de la place de marché en ligne, soit sur le site internet d'un professionnel qui utilise des services informatiques fournis par la place de marché en ligne." },
                        { id: "C51", name: "Fournisseurs de moteurs de recherche en ligne", tooltip: "Un service numérique qui permet aux utilisateurs d'effectuer des recherches sur tous les sites internet ou sur les sites internet dans une langue donnée, sur la base d'une requête lancée sur n'importe quel sujet, sous la forme d'un mot clé, d'une phrase ou d'une autre entrée, et qui renvoie des liens à partir desquels il est possible de trouver des informations en rapport avec le contenu demandé." },
                        { id: "C52", name: "Fournisseurs de plateformes de services de réseaux sociaux", tooltip: "Une plateforme qui permet aux utilisateurs finaux de se connecter, de partager, de découvrir et de communiquer entre eux sur de multiples appareils, et notamment par des conversations en ligne, la publication de contenus, de vidéos et de recommandations." }
                    ]
                }
            ]
        },
        // Ajoutez les autres secteurs de la même manière
        {
            name: "Énergie",
            subcategories: [
                {
                    name: "Énergie - Électricité",
                    services: [
                        { id: "C55", name: "Entreprises d'électricité", tooltip: "Toute personne physique ou morale qui assure au moins une des fonctions suivantes: la production, le transport, la distribution, l'agrégation, la participation active de la demande, le stockage d'énergie, la fourniture ou l'achat d'électricité et qui est chargée des missions commerciales, techniques ou de maintenance liées à ces fonctions." },
                        // Ajoutez les autres services de cette sous-catégorie
                    ]
                },
                // Ajoutez les autres sous-catégories de l'énergie
            ]
        },
        // Ajoutez les autres secteurs (Alimentation, Santé, Fabrication, etc.)
    ],
    
    // Formules pour les calculs
    formulas: {
        // Détermination de la taille de l'organisation
        organizationSize: function(staffHeadcount, turnover, balanceSheet) {
            if (staffHeadcount === "0-49") {
                if ((turnover === "<10" && balanceSheet === "<10") || 
                    (turnover === "<10" && balanceSheet === "10-43") || 
                    (turnover === "10-50" && balanceSheet === "<10")) {
                    return "Micro-entreprise ou Petite entreprise";
                }
            } else if (staffHeadcount === "50-249") {
                if ((turnover === "10-50" && balanceSheet === "10-43") || 
                    (turnover === "10-50" && balanceSheet === "43+") || 
                    (turnover === "50+" && balanceSheet === "10-43")) {
                    return "Moyenne entreprise";
                }
            } else if (staffHeadcount === "250+") {
                return "Grande entreprise";
            }
            return "Veuillez compléter tous les champs";
        },
        
        // Calcul du résultat final
        calculateResult: function(organizationSize, selectedServices, relationWithBelgium, servicesInEU) {
            // Logique simplifiée pour l'exemple
            if (organizationSize === "Micro-entreprise ou Petite entreprise") {
                if (selectedServices.length > 0 && relationWithBelgium === "Yes" && servicesInEU === "Yes") {
                    return {
                        status: "Entité importante",
                        details: "Votre organisation est considérée comme une entité importante selon la loi NIS2 belge."
                    };
                }
            } else if (organizationSize === "Moyenne entreprise") {
                if (selectedServices.length > 0 && relationWithBelgium === "Yes" && servicesInEU === "Yes") {
                    return {
                        status: "Entité importante",
                        details: "Votre organisation est considérée comme une entité importante selon la loi NIS2 belge."
                    };
                }
            } else if (organizationSize === "Grande entreprise") {
                if (selectedServices.length > 0 && relationWithBelgium === "Yes" && servicesInEU === "Yes") {
                    // Vérifier si certains services spécifiques sont sélectionnés pour déterminer si c'est une entité essentielle
                    const essentialServices = ["C37", "C38", "C39", "C40", "C41", "C42", "C43", "C44", "C45", "C55", "C56", "C57", "C58", "C59", "C60", "C61", "C62", "C63", "C64", "C65", "C66", "C67", "C68", "C69", "C70", "C71", "C72", "C73", "C74", "C75", "C76", "C77", "C78", "C79", "C80", "C81", "C82", "C83"];
                    const hasEssentialService = selectedServices.some(service => essentialServices.includes(service));
                    
                    if (hasEssentialService) {
                        return {
                            status: "Entité essentielle",
                            details: "Votre organisation est considérée comme une entité essentielle selon la loi NIS2 belge."
                        };
                    } else {
                        return {
                            status: "Entité importante",
                            details: "Votre organisation est considérée comme une entité importante selon la loi NIS2 belge."
                        };
                    }
                }
            }
            
            return {
                status: "Hors champ",
                details: "Selon les informations fournies, votre organisation ne semble pas entrer dans le champ d'application de la loi NIS2 belge."
            };
        }
    }
};
