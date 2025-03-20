// Données extraites du fichier Assurance_Risk_formulas.json et Assurance_Risk_text.json
const assuranceData = {
    // Critères d'évaluation
    criteria: {
        // Valeurs pour les impacts
        impact: {
            "Low": 1,
            "Med": 2,
            "High": 3
        },
        // Valeurs pour les probabilités
        probability: {
            "Low": 1,
            "Med": 2,
            "High": 3
        },
        // Niveaux d'assurance
        assuranceLevels: {
            "BASIC": {
                threshold: 0,
                description: "Le niveau BASIC est recommandé pour les organisations présentant un niveau de risque faible. Il couvre les contrôles de sécurité fondamentaux."
            },
            "ESSENTIAL": {
                threshold: 20,
                description: "Le niveau ESSENTIAL est recommandé pour les organisations présentant un niveau de risque moyen. Il inclut des contrôles de sécurité plus avancés que le niveau BASIC."
            },
            "ADVANCED": {
                threshold: 40,
                description: "Le niveau ADVANCED est recommandé pour les organisations présentant un niveau de risque élevé. Il comprend des contrôles de sécurité approfondis et des mesures de protection avancées."
            }
        },
        // Facteurs de pondération pour les types d'acteurs menaçants
        threatActors: {
            "Competitors": 1.0,
            "Ideologues Hactivists": 1.2,
            "Terrorist": 1.5,
            "Cyber Criminals": 1.8,
            "Nation State actor": 2.0
        },
        // Facteurs de pondération pour les catégories d'attaques
        attackCategories: {
            "Sabotage": {
                weight: 1.5,
                threatActorWeights: {
                    "Competitors": 1.0,
                    "Ideologues Hactivists": 1.0,
                    "Terrorist": 2.0,
                    "Cyber Criminals": 2.0,
                    "Nation State actor": 3.0
                }
            },
            "Theft": {
                weight: 1.3,
                threatActorWeights: {
                    "Competitors": 1.0,
                    "Ideologues Hactivists": 1.0,
                    "Terrorist": 1.0,
                    "Cyber Criminals": 3.0,
                    "Nation State actor": 3.0
                }
            },
            "Crime": {
                weight: 1.4,
                threatActorWeights: {
                    "Competitors": 1.0,
                    "Ideologues Hactivists": 1.0,
                    "Terrorist": 1.0,
                    "Cyber Criminals": 3.0,
                    "Nation State actor": 1.0
                }
            },
            "Hactivism": {
                weight: 1.1,
                threatActorWeights: {
                    "Competitors": 1.0,
                    "Ideologues Hactivists": 2.0,
                    "Terrorist": 1.0,
                    "Cyber Criminals": 1.0,
                    "Nation State actor": 2.0
                }
            },
            "Disinfo": {
                weight: 1.0,
                threatActorWeights: {
                    "Competitors": 1.0,
                    "Ideologues Hactivists": 2.0,
                    "Terrorist": 1.0,
                    "Cyber Criminals": 1.0,
                    "Nation State actor": 1.0
                }
            }
        },
        // Facteurs de pondération pour la taille de l'organisation
        organizationSize: {
            "1": 1.0, // Petite
            "2": 1.5, // Moyenne
            "3": 2.0  // Grande
        },
        // Facteurs de pondération spécifiques aux secteurs
        sectors: {
            // Secteurs à haute criticité (Annexe I)
            "Energy": {
                baseMultiplier: 1.5,
                threatActorMultipliers: {
                    "Competitors": 1.0,
                    "Ideologues Hactivists": 1.0,
                    "Terrorist": 1.5,
                    "Cyber Criminals": 1.2,
                    "Nation State actor": 2.0
                },
                attackCategoryMultipliers: {
                    "Sabotage": 2.0,
                    "Theft": 1.5,
                    "Crime": 1.2,
                    "Hactivism": 1.0,
                    "Disinfo": 0.8
                },
                defaultAssuranceLevel: "ESSENTIAL"
            },
            "Transport": {
                baseMultiplier: 1.4,
                threatActorMultipliers: {
                    "Competitors": 1.0,
                    "Ideologues Hactivists": 1.0,
                    "Terrorist": 1.8,
                    "Cyber Criminals": 1.0,
                    "Nation State actor": 1.5
                },
                attackCategoryMultipliers: {
                    "Sabotage": 1.8,
                    "Theft": 1.2,
                    "Crime": 1.2,
                    "Hactivism": 1.0,
                    "Disinfo": 0.8
                },
                defaultAssuranceLevel: "ESSENTIAL"
            },
            "Banking": {
                baseMultiplier: 1.6,
                threatActorMultipliers: {
                    "Competitors": 1.0,
                    "Ideologues Hactivists": 1.2,
                    "Terrorist": 1.2,
                    "Cyber Criminals": 2.0,
                    "Nation State actor": 1.5
                },
                attackCategoryMultipliers: {
                    "Sabotage": 1.5,
                    "Theft": 2.0,
                    "Crime": 2.0,
                    "Hactivism": 1.2,
                    "Disinfo": 0.8
                },
                defaultAssuranceLevel: "ESSENTIAL"
            },
            "Health": {
                baseMultiplier: 1.5,
                threatActorMultipliers: {
                    "Competitors": 1.0,
                    "Ideologues Hactivists": 1.0,
                    "Terrorist": 1.2,
                    "Cyber Criminals": 1.8,
                    "Nation State actor": 1.5
                },
                attackCategoryMultipliers: {
                    "Sabotage": 1.8,
                    "Theft": 1.8,
                    "Crime": 1.8,
                    "Hactivism": 1.0,
                    "Disinfo": 0.8
                },
                defaultAssuranceLevel: "ESSENTIAL"
            },
            "Drinking water": {
                baseMultiplier: 1.4,
                threatActorMultipliers: {
                    "Competitors": 1.0,
                    "Ideologues Hactivists": 1.2,
                    "Terrorist": 1.8,
                    "Cyber Criminals": 1.0,
                    "Nation State actor": 1.5
                },
                attackCategoryMultipliers: {
                    "Sabotage": 2.0,
                    "Theft": 1.0,
                    "Crime": 1.0,
                    "Hactivism": 1.2,
                    "Disinfo": 1.0
                },
                defaultAssuranceLevel: "ESSENTIAL"
            },
            "Waste water": {
                baseMultiplier: 1.3,
                threatActorMultipliers: {
                    "Competitors": 1.0,
                    "Ideologues Hactivists": 1.2,
                    "Terrorist": 1.5,
                    "Cyber Criminals": 1.0,
                    "Nation State actor": 1.2
                },
                attackCategoryMultipliers: {
                    "Sabotage": 1.8,
                    "Theft": 1.0,
                    "Crime": 1.0,
                    "Hactivism": 1.2,
                    "Disinfo": 1.0
                },
                defaultAssuranceLevel: "ESSENTIAL"
            },
            "Digital Infrastructure": {
                baseMultiplier: 1.7,
                threatActorMultipliers: {
                    "Competitors": 1.2,
                    "Ideologues Hactivists": 1.5,
                    "Terrorist": 1.2,
                    "Cyber Criminals": 1.8,
                    "Nation State actor": 2.0
                },
                attackCategoryMultipliers: {
                    "Sabotage": 1.8,
                    "Theft": 1.8,
                    "Crime": 1.8,
                    "Hactivism": 1.5,
                    "Disinfo": 1.0
                },
                defaultAssuranceLevel: "ESSENTIAL"
            },
            "Public Administration": {
                baseMultiplier: 1.5,
                threatActorMultipliers: {
                    "Competitors": 1.0,
                    "Ideologues Hactivists": 1.5,
                    "Terrorist": 1.5,
                    "Cyber Criminals": 1.5,
                    "Nation State actor": 2.0
                },
                attackCategoryMultipliers: {
                    "Sabotage": 1.5,
                    "Theft": 1.8,
                    "Crime": 1.5,
                    "Hactivism": 1.5,
                    "Disinfo": 1.8
                },
                defaultAssuranceLevel: "ESSENTIAL"
            },
            "Space": {
                baseMultiplier: 1.6,
                threatActorMultipliers: {
                    "Competitors": 1.5,
                    "Ideologues Hactivists": 1.0,
                    "Terrorist": 1.2,
                    "Cyber Criminals": 1.0,
                    "Nation State actor": 2.0
                },
                attackCategoryMultipliers: {
                    "Sabotage": 1.8,
                    "Theft": 1.8,
                    "Crime": 1.0,
                    "Hactivism": 1.0,
                    "Disinfo": 1.2
                },
                defaultAssuranceLevel: "ESSENTIAL"
            },
            // Secteurs à criticité moyenne (Annexe II)
            "Post": {
                baseMultiplier: 1.2,
                threatActorMultipliers: {
                    "Competitors": 1.0,
                    "Ideologues Hactivists": 1.0,
                    "Terrorist": 1.0,
                    "Cyber Criminals": 1.5,
                    "Nation State actor": 1.2
                },
                attackCategoryMultipliers: {
                    "Sabotage": 1.2,
                    "Theft": 1.5,
                    "Crime": 1.5,
                    "Hactivism": 1.0,
                    "Disinfo": 1.0
                },
                defaultAssuranceLevel: "BASIC"
            },
            "Waste Management": {
                baseMultiplier: 1.1,
                threatActorMultipliers: {
                    "Competitors": 1.0,
                    "Ideologues Hactivists": 1.2,
                    "Terrorist": 1.0,
                    "Cyber Criminals": 1.0,
                    "Nation State actor": 1.0
                },
                attackCategoryMultipliers: {
                    "Sabotage": 1.5,
                    "Theft": 1.0,
                    "Crime": 1.0,
                    "Hactivism": 1.2,
                    "Disinfo": 1.0
                },
                defaultAssuranceLevel: "BASIC"
            },
            "Chemicals": {
                baseMultiplier: 1.4,
                threatActorMultipliers: {
                    "Competitors": 1.2,
                    "Ideologues Hactivists": 1.2,
                    "Terrorist": 1.5,
                    "Cyber Criminals": 1.0,
                    "Nation State actor": 1.5
                },
                attackCategoryMultipliers: {
                    "Sabotage": 1.8,
                    "Theft": 1.5,
                    "Crime": 1.0,
                    "Hactivism": 1.2,
                    "Disinfo": 1.0
                },
                defaultAssuranceLevel: "ESSENTIAL"
            },
            "Manufacturing": {
                baseMultiplier: 1.3,
                threatActorMultipliers: {
                    "Competitors": 1.5,
                    "Ideologues Hactivists": 1.0,
                    "Terrorist": 1.0,
                    "Cyber Criminals": 1.2,
                    "Nation State actor": 1.5
                },
                attackCategoryMultipliers: {
                    "Sabotage": 1.5,
                    "Theft": 1.8,
                    "Crime": 1.2,
                    "Hactivism": 1.0,
                    "Disinfo": 1.0
                },
                defaultAssuranceLevel: "BASIC"
            },
            "Research": {
                baseMultiplier: 1.3,
                threatActorMultipliers: {
                    "Competitors": 1.8,
                    "Ideologues Hactivists": 1.0,
                    "Terrorist": 1.0,
                    "Cyber Criminals": 1.2,
                    "Nation State actor": 1.8
                },
                attackCategoryMultipliers: {
                    "Sabotage": 1.2,
                    "Theft": 2.0,
                    "Crime": 1.2,
                    "Hactivism": 1.0,
                    "Disinfo": 1.0
                },
                defaultAssuranceLevel: "ESSENTIAL"
            },
            // Valeur par défaut pour les secteurs non spécifiés
            "default": {
                baseMultiplier: 1.0,
                threatActorMultipliers: {
                    "Competitors": 1.0,
                    "Ideologues Hactivists": 1.0,
                    "Terrorist": 1.0,
                    "Cyber Criminals": 1.0,
                    "Nation State actor": 1.0
                },
                attackCategoryMultipliers: {
                    "Sabotage": 1.0,
                    "Theft": 1.0,
                    "Crime": 1.0,
                    "Hactivism": 1.0,
                    "Disinfo": 1.0
                },
                defaultAssuranceLevel: "BASIC"
            }
        }
    },
    
    // Formules pour les calculs
    formulas: {
        // Calcul du score de risque pour une catégorie d'attaque et un acteur menaçant
        calculateRiskScore: function(impact, probability, orgSize, attackCategory, threatActor, sector) {
            const impactValue = this.getImpactValue(impact);
            const probValue = this.getProbabilityValue(probability);
            const orgSizeValue = this.getOrgSizeValue(orgSize);
            const attackWeight = this.getAttackWeight(attackCategory, threatActor);
            
            // Appliquer les multiplicateurs spécifiques au secteur
            const sectorData = this.getSectorData(sector);
            const sectorBaseMultiplier = sectorData.baseMultiplier;
            const sectorThreatActorMultiplier = sectorData.threatActorMultipliers[threatActor] || 1.0;
            const sectorAttackCategoryMultiplier = sectorData.attackCategoryMultipliers[attackCategory] || 1.0;
            
            return impactValue * probValue * orgSizeValue * attackWeight * 
                   sectorBaseMultiplier * sectorThreatActorMultiplier * sectorAttackCategoryMultiplier;
        },
        
        // Obtenir les données spécifiques à un secteur
        getSectorData: function(sector) {
            return assuranceData.criteria.sectors[sector] || assuranceData.criteria.sectors.default;
        },
        
        // Obtenir la valeur numérique de l'impact
        getImpactValue: function(impact) {
            return assuranceData.criteria.impact[impact] || 1;
        },
        
        // Obtenir la valeur numérique de la probabilité
        getProbabilityValue: function(probability) {
            return assuranceData.criteria.probability[probability] || 1;
        },
        
        // Obtenir la valeur numérique de la taille de l'organisation
        getOrgSizeValue: function(orgSize) {
            return assuranceData.criteria.organizationSize[orgSize] || 1;
        },
        
        // Obtenir le poids d'une catégorie d'attaque pour un acteur menaçant
        getAttackWeight: function(attackCategory, threatActor) {
            const category = assuranceData.criteria.attackCategories[attackCategory];
            if (!category) return 1;
            
            const actorWeight = category.threatActorWeights[threatActor] || 1;
            return category.weight * actorWeight;
        },
        
        // Calcul du niveau d'assurance recommandé
        calculateAssuranceLevel: function(totalRiskScore, sector) {
            const levels = assuranceData.criteria.assuranceLevels;
            const sectorData = this.getSectorData(sector);
            
            // Si le score est très bas, utiliser le niveau par défaut du secteur
            if (totalRiskScore < 10) {
                return {
                    level: sectorData.defaultAssuranceLevel,
                    description: levels[sectorData.defaultAssuranceLevel].description + 
                                " Ce niveau est recommandé par défaut pour le secteur " + sector + "."
                };
            }
            
            // Sinon, déterminer le niveau en fonction du score de risque
            if (totalRiskScore >= levels.ADVANCED.threshold) {
                return {
                    level: "ADVANCED",
                    description: levels.ADVANCED.description
                };
            } else if (totalRiskScore >= levels.ESSENTIAL.threshold) {
                return {
                    level: "ESSENTIAL",
                    description: levels.ESSENTIAL.description
                };
            } else {
                return {
                    level: "BASIC",
                    description: levels.BASIC.description
                };
            }
        },
        
        // Obtenir le nom du secteur à partir de l'ID du service
        getSectorFromServiceId: function(serviceId, selectedServices) {
            // Mapping des IDs de services vers les secteurs
            const serviceSectorMap = {
                // Banque et infrastructures des marchés financiers
                "C30": "Banking",
                "C32": "Banking",
                "C33": "Banking",
                
                // Infrastructure numérique
                "C36": "Digital Infrastructure",
                "C37": "Digital Infrastructure",
                "C38": "Digital Infrastructure",
                "C39": "Digital Infrastructure",
                "C40": "Digital Infrastructure",
                "C41": "Digital Infrastructure",
                "C42": "Digital Infrastructure",
                "C43": "Digital Infrastructure",
                "C44": "Digital Infrastructure",
                "C45": "Digital Infrastructure",
                "C46": "Digital Infrastructure",
                "C47": "Digital Infrastructure",
                "C48": "Digital Infrastructure",
                "C49": "Digital Infrastructure",
                "C50": "Digital Infrastructure",
                "C51": "Digital Infrastructure",
                "C52": "Digital Infrastructure",
                
                // Énergie
                "C53": "Energy",
                "C54": "Energy",
                "C55": "Energy",
                "C56": "Energy",
                "C57": "Energy",
                "C58": "Energy",
                "C59": "Energy",
                
                // Transport
                "C60": "Transport",
                "C61": "Transport",
                "C62": "Transport",
                "C63": "Transport",
                "C64": "Transport",
                "C65": "Transport",
                "C66": "Transport",
                
                // Santé
                "C67": "Health",
                "C68": "Health",
                "C69": "Health",
                "C70": "Health",
                
                // Eau potable
                "C71": "Drinking water",
                
                // Eaux usées
                "C72": "Waste water",
                
                // Administration publique
                "C73": "Public Administration",
                "C74": "Public Administration",
                
                // Espace
                "C75": "Space",
                
                // Services postaux
                "C76": "Post",
                
                // Gestion des déchets
                "C77": "Waste Management",
                
                // Produits chimiques
                "C78": "Chemicals",
                
                // Fabrication
                "C79": "Manufacturing",
                "C80": "Manufacturing",
                "C81": "Manufacturing",
                "C82": "Manufacturing",
                
                // Recherche
                "C83": "Research"
            };
            
            // Si aucun service n'est sélectionné, retourner le secteur par défaut
            if (!selectedServices || selectedServices.length === 0) {
                return "default";
            }
            
            // Trouver le premier service qui correspond à un secteur connu
            for (const service of selectedServices) {
                if (serviceSectorMap[service]) {
                    return serviceSectorMap[service];
                }
            }
            
            // Si aucun secteur correspondant n'est trouvé, retourner le secteur par défaut
            return "default";
        }
    }
};
