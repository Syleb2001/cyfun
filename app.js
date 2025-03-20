document.addEventListener('DOMContentLoaded', function() {
    // Initialisation des variables
    let organizationSize = '';
    let selectedServices = [];
    let relationWithBelgium = '';
    let servicesInEU = '';
    let assuranceOrgSize = '';
    
    // Éléments DOM
    const staffHeadcountSelect = document.getElementById('staffHeadcount');
    const turnoverSelect = document.getElementById('turnover');
    const balanceSheetSelect = document.getElementById('balanceSheet');
    const organizationSizeSpan = document.getElementById('organizationSize');
    const sectorsContainer = document.getElementById('sectorsContainer');
    const noneOfTheAboveCheckbox = document.getElementById('noneOfTheAbove');
    const sectorWarning = document.getElementById('sectorWarning');
    const resetBtn = document.getElementById('resetBtn');
    const resultsContainer = document.getElementById('resultsContainer');
    const assessmentResult = document.getElementById('assessmentResult');
    const resultDetails = document.getElementById('resultDetails');
    
    // Éléments DOM pour l'évaluation du niveau d'assurance
    const orgSizeRadios = document.querySelectorAll('input[name="orgSize"]');
    const calculateAssuranceBtn = document.getElementById('calculateAssuranceBtn');
    const assuranceResultContainer = document.getElementById('assuranceResultContainer');
    const assuranceLevelElement = document.getElementById('assuranceLevel');
    const assuranceExplanationElement = document.getElementById('assuranceExplanation');
    
    // Initialisation des tooltips Bootstrap
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Génération dynamique des secteurs et services
    function generateSectorsAndServices() {
        sectorsContainer.innerHTML = '';
        
        nis2Data.sectors.forEach(sector => {
            const sectorDiv = document.createElement('div');
            sectorDiv.className = 'sector-category mb-4';
            sectorDiv.innerHTML = `<h5>${sector.name}</h5>`;
            
            sector.subcategories.forEach(subcategory => {
                const subcategoryDiv = document.createElement('div');
                subcategoryDiv.className = 'sector-subcategory';
                subcategoryDiv.innerHTML = `<h6>${subcategory.name}</h6>`;
                
                subcategory.services.forEach(service => {
                    const serviceDiv = document.createElement('div');
                    serviceDiv.className = 'sector-item form-check';
                    serviceDiv.innerHTML = `
                        <input class="form-check-input service-checkbox" type="checkbox" id="${service.id}" data-service-id="${service.id}">
                        <label class="form-check-label" for="${service.id}">
                            ${service.name}
                            <i class="fas fa-info-circle tooltip-icon" data-bs-toggle="tooltip" title="${service.tooltip}"></i>
                        </label>
                    `;
                    subcategoryDiv.appendChild(serviceDiv);
                });
                
                sectorDiv.appendChild(subcategoryDiv);
            });
            
            sectorsContainer.appendChild(sectorDiv);
        });
        
        // Ajouter les écouteurs d'événements aux cases à cocher des services
        document.querySelectorAll('.service-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', handleServiceSelection);
        });
    }
    
    // Gestion de la sélection des services
    function handleServiceSelection(e) {
        const serviceId = e.target.dataset.serviceId;
        const isChecked = e.target.checked;
        
        if (isChecked) {
            if (!selectedServices.includes(serviceId)) {
                selectedServices.push(serviceId);
            }
            
            // Si un service est sélectionné, décocher "Aucun des secteurs ci-dessus"
            if (noneOfTheAboveCheckbox.checked) {
                noneOfTheAboveCheckbox.checked = false;
            }
        } else {
            const index = selectedServices.indexOf(serviceId);
            if (index > -1) {
                selectedServices.splice(index, 1);
            }
        }
        
        // Vérifier si des services sont sélectionnés
        const hasSelectedServices = selectedServices.length > 0;
        
        // Afficher ou masquer l'avertissement
        sectorWarning.style.display = (hasSelectedServices && noneOfTheAboveCheckbox.checked) ? 'block' : 'none';
        
        updateResults();
    }
    
    // Gestion de la case à cocher "Aucun des secteurs ci-dessus"
    noneOfTheAboveCheckbox.addEventListener('change', function(e) {
        const isChecked = e.target.checked;
        
        if (isChecked) {
            // Décocher tous les services
            document.querySelectorAll('.service-checkbox').forEach(checkbox => {
                checkbox.checked = false;
            });
            selectedServices = [];
        }
        
        // Afficher ou masquer l'avertissement
        sectorWarning.style.display = (selectedServices.length > 0 && isChecked) ? 'block' : 'none';
        
        updateResults();
    });
    
    // Calcul de la taille de l'organisation
    function calculateOrganizationSize() {
        const staffHeadcount = staffHeadcountSelect.value;
        const turnover = turnoverSelect.value;
        const balanceSheet = balanceSheetSelect.value;
        
        if (staffHeadcount !== 'select' && turnover !== 'select' && balanceSheet !== 'select') {
            organizationSize = nis2Data.formulas.organizationSize(staffHeadcount, turnover, balanceSheet);
            organizationSizeSpan.textContent = organizationSize;
        } else {
            organizationSizeSpan.textContent = 'Veuillez compléter tous les champs';
            organizationSize = '';
        }
        
        updateResults();
    }
    
    // Écouteurs d'événements pour les sélecteurs de taille d'organisation
    staffHeadcountSelect.addEventListener('change', calculateOrganizationSize);
    turnoverSelect.addEventListener('change', calculateOrganizationSize);
    balanceSheetSelect.addEventListener('change', calculateOrganizationSize);
    
    // Gestion des questions conditionnelles dans la section C
    document.querySelectorAll('input[name="establishedInBelgium"]').forEach(radio => {
        radio.addEventListener('change', function(e) {
            relationWithBelgium = e.target.value;
            const mainEstablishmentQuestion = document.getElementById('mainEstablishmentQuestion');
            
            if (relationWithBelgium === 'Yes') {
                mainEstablishmentQuestion.style.display = 'block';
            } else {
                mainEstablishmentQuestion.style.display = 'none';
                // Réinitialiser la question conditionnelle
                document.getElementById('mainEstablishmentSelect').checked = true;
            }
            
            updateResults();
        });
    });
    
    // Gestion des services dans l'UE
    document.querySelectorAll('input[name="servicesInEU"]').forEach(radio => {
        radio.addEventListener('change', function(e) {
            servicesInEU = e.target.value;
            updateResults();
        });
    });
    
    // Mise à jour des résultats
    function updateResults() {
        // Vérifier si toutes les informations nécessaires sont fournies
        if (organizationSize && 
            (selectedServices.length > 0 || noneOfTheAboveCheckbox.checked) && 
            relationWithBelgium && relationWithBelgium !== 'Select' && 
            servicesInEU && servicesInEU !== 'Select') {
            
            // Calculer le résultat
            const result = nis2Data.formulas.calculateResult(
                organizationSize, 
                selectedServices, 
                relationWithBelgium, 
                servicesInEU
            );
            
            // Afficher le résultat
            assessmentResult.textContent = result.status;
            resultDetails.textContent = result.details;
            resultsContainer.style.display = 'block';
            
            // Ouvrir automatiquement la section des résultats
            const collapseE = document.getElementById('collapseE');
            const bsCollapseE = new bootstrap.Collapse(collapseE, { toggle: false });
            bsCollapseE.show();
        } else {
            resultsContainer.style.display = 'none';
        }
    }
    
    // Réinitialisation de l'évaluation
    resetBtn.addEventListener('click', function() {
        // Réinitialiser les sélecteurs de taille d'organisation
        staffHeadcountSelect.value = 'select';
        turnoverSelect.value = 'select';
        balanceSheetSelect.value = 'select';
        organizationSizeSpan.textContent = 'Veuillez compléter les champs ci-dessus';
        
        // Réinitialiser les services
        document.querySelectorAll('.service-checkbox').forEach(checkbox => {
            checkbox.checked = false;
        });
        noneOfTheAboveCheckbox.checked = false;
        sectorWarning.style.display = 'none';
        selectedServices = [];
        
        // Réinitialiser les questions de relation avec la Belgique
        document.getElementById('establishedSelect').checked = true;
        document.getElementById('mainEstablishmentQuestion').style.display = 'none';
        document.getElementById('mainEstablishmentSelect').checked = true;
        
        // Réinitialiser les services dans l'UE
        document.getElementById('servicesInEUSelect').checked = true;
        
        // Masquer les résultats
        resultsContainer.style.display = 'none';
        
        // Réinitialiser les variables
        organizationSize = '';
        relationWithBelgium = '';
        servicesInEU = '';
        
        // Réinitialiser les éléments d'évaluation du niveau d'assurance
        document.querySelectorAll('input[name="orgSize"]').forEach(radio => {
            radio.checked = false;
        });
        document.getElementById('sabotageThreatProb').value = '1';
        document.getElementById('theftThreatProb').value = '1';
        document.getElementById('crimeThreatProb').value = '1';
        document.getElementById('hacktivismThreatProb').value = '1';
        document.getElementById('disinfoThreatProb').value = '1';
        document.getElementById('threatActorCompetitors').checked = true;
        document.getElementById('threatActorHacktivists').checked = true;
        document.getElementById('threatActorTerrorists').checked = true;
        document.getElementById('threatActorCriminals').checked = true;
        document.getElementById('threatActorNationState').checked = true;
        assuranceResultContainer.style.display = 'none';
        
        // Fermer toutes les sections sauf la première
        const collapseA = document.getElementById('collapseA');
        const bsCollapseA = new bootstrap.Collapse(collapseA, { toggle: false });
        bsCollapseA.show();
        
        const collapseB = document.getElementById('collapseB');
        const bsCollapseB = new bootstrap.Collapse(collapseB, { toggle: false });
        bsCollapseB.hide();
        
        const collapseC = document.getElementById('collapseC');
        const bsCollapseC = new bootstrap.Collapse(collapseC, { toggle: false });
        bsCollapseC.hide();
        
        const collapseD = document.getElementById('collapseD');
        const bsCollapseD = new bootstrap.Collapse(collapseD, { toggle: false });
        bsCollapseD.hide();
        
        const collapseE = document.getElementById('collapseE');
        const bsCollapseE = new bootstrap.Collapse(collapseE, { toggle: false });
        bsCollapseE.hide();
        
        const collapseF = document.getElementById('collapseF');
        const bsCollapseF = new bootstrap.Collapse(collapseF, { toggle: false });
        bsCollapseF.hide();
    });
    
    // Gestion de la taille de l'organisation pour l'évaluation du niveau d'assurance
    orgSizeRadios.forEach(radio => {
        radio.addEventListener('change', function(e) {
            assuranceOrgSize = e.target.value;
        });
    });
    
    // Calcul du niveau d'assurance CyFun
    calculateAssuranceBtn.addEventListener('click', function() {
        // Vérifier si la taille de l'organisation est sélectionnée
        if (!assuranceOrgSize) {
            alert('Veuillez sélectionner la taille de votre organisation.');
            return;
        }
        
        // Récupérer les valeurs des menaces
        const sabotageThreatImpact = document.getElementById('sabotageThreatImpact').value;
        const sabotageThreatProb = document.getElementById('sabotageThreatProb').value;
        const theftThreatImpact = document.getElementById('theftThreatImpact').value;
        const theftThreatProb = document.getElementById('theftThreatProb').value;
        const crimeThreatImpact = document.getElementById('crimeThreatImpact').value;
        const crimeThreatProb = document.getElementById('crimeThreatProb').value;
        const hacktivismThreatImpact = document.getElementById('hacktivismThreatImpact').value;
        const hacktivismThreatProb = document.getElementById('hacktivismThreatProb').value;
        const disinfoThreatImpact = document.getElementById('disinfoThreatImpact').value;
        const disinfoThreatProb = document.getElementById('disinfoThreatProb').value;
        
        // Récupérer les acteurs menaçants sélectionnés
        const threatActors = [];
        if (document.getElementById('threatActorCompetitors').checked) threatActors.push('Competitors');
        if (document.getElementById('threatActorHacktivists').checked) threatActors.push('Ideologues Hactivists');
        if (document.getElementById('threatActorTerrorists').checked) threatActors.push('Terrorist');
        if (document.getElementById('threatActorCriminals').checked) threatActors.push('Cyber Criminals');
        if (document.getElementById('threatActorNationState').checked) threatActors.push('Nation State actor');
        
        // Vérifier si au moins un acteur menaçant est sélectionné
        if (threatActors.length === 0) {
            alert('Veuillez sélectionner au moins un type d\'acteur menaçant.');
            return;
        }
        
        // Déterminer le secteur en fonction des services sélectionnés
        const sector = assuranceData.formulas.getSectorFromServiceId(null, selectedServices);
        
        // Calculer le score de risque total
        let totalRiskScore = 0;
        
        // Convertir les valeurs numériques en niveaux textuels pour les formules
        const impactLevels = {
            '1': 'Low',
            '2': 'Med',
            '3': 'High'
        };
        
        const probLevels = {
            '1': 'Low',
            '2': 'Med',
            '3': 'High'
        };
        
        // Pour chaque acteur menaçant, calculer le score de risque pour chaque catégorie d'attaque
        threatActors.forEach(actor => {
            // Sabotage
            totalRiskScore += assuranceData.formulas.calculateRiskScore(
                impactLevels[sabotageThreatImpact],
                probLevels[sabotageThreatProb],
                assuranceOrgSize,
                'Sabotage',
                actor,
                sector
            );
            
            // Vol d'information
            totalRiskScore += assuranceData.formulas.calculateRiskScore(
                impactLevels[theftThreatImpact],
                probLevels[theftThreatProb],
                assuranceOrgSize,
                'Theft',
                actor,
                sector
            );
            
            // Crime
            totalRiskScore += assuranceData.formulas.calculateRiskScore(
                impactLevels[crimeThreatImpact],
                probLevels[crimeThreatProb],
                assuranceOrgSize,
                'Crime',
                actor,
                sector
            );
            
            // Hacktivisme
            totalRiskScore += assuranceData.formulas.calculateRiskScore(
                impactLevels[hacktivismThreatImpact],
                probLevels[hacktivismThreatProb],
                assuranceOrgSize,
                'Hactivism',
                actor,
                sector
            );
            
            // Désinformation
            totalRiskScore += assuranceData.formulas.calculateRiskScore(
                impactLevels[disinfoThreatImpact],
                probLevels[disinfoThreatProb],
                assuranceOrgSize,
                'Disinfo',
                actor,
                sector
            );
        });
        
        // Normaliser le score en fonction du nombre d'acteurs menaçants
        totalRiskScore = totalRiskScore / threatActors.length;
        
        // Déterminer le niveau d'assurance recommandé
        const assuranceResult = assuranceData.formulas.calculateAssuranceLevel(totalRiskScore, sector);
        
        // Afficher le résultat
        assuranceLevelElement.textContent = assuranceResult.level;
        
        // Ajouter l'information sur le secteur dans l'explication
        let sectorInfo = sector !== 'default' ? `pour le secteur ${sector} ` : '';
        assuranceExplanationElement.textContent = `Votre score de risque total ${sectorInfo}est de ${totalRiskScore.toFixed(2)}. ${assuranceResult.description}`;
        
        assuranceResultContainer.style.display = 'block';
        
        // Ouvrir automatiquement la section des résultats d'assurance
        const collapseF = document.getElementById('collapseF');
        const bsCollapseF = new bootstrap.Collapse(collapseF, { toggle: false });
        bsCollapseF.show();
    });
    
    // Initialisation de l'application
    generateSectorsAndServices();
    
    // Fonction pour exporter les paramètres en JSON
    function exportToJson() {
        // Récupérer tous les paramètres sélectionnés
        const exportData = {
            // Données NIS2
            nis2: {
                organizationInfo: {
                    staffHeadcount: staffHeadcountSelect.value,
                    turnover: turnoverSelect.value,
                    balanceSheet: balanceSheetSelect.value,
                    organizationSize: organizationSize
                },
                selectedServices: selectedServices,
                relationWithBelgium: relationWithBelgium,
                servicesInEU: servicesInEU,
                result: assessmentResult.textContent,
                details: resultDetails.textContent
            },
            // Données d'assurance
            assurance: {
                organizationSize: assuranceOrgSize,
                threatActors: {
                    competitors: document.getElementById('threatActorCompetitors').checked,
                    hacktivists: document.getElementById('threatActorHacktivists').checked,
                    terrorists: document.getElementById('threatActorTerrorists').checked,
                    criminals: document.getElementById('threatActorCriminals').checked,
                    nationState: document.getElementById('threatActorNationState').checked
                },
                threatAssessment: {
                    sabotage: {
                        impact: document.getElementById('sabotageThreatImpact').value,
                        probability: document.getElementById('sabotageThreatProb').value
                    },
                    theft: {
                        impact: document.getElementById('theftThreatImpact').value,
                        probability: document.getElementById('theftThreatProb').value
                    },
                    crime: {
                        impact: document.getElementById('crimeThreatImpact').value,
                        probability: document.getElementById('crimeThreatProb').value
                    },
                    hacktivism: {
                        impact: document.getElementById('hacktivismThreatImpact').value,
                        probability: document.getElementById('hacktivismThreatProb').value
                    },
                    disinfo: {
                        impact: document.getElementById('disinfoThreatImpact').value,
                        probability: document.getElementById('disinfoThreatProb').value
                    }
                },
                result: {
                    level: assuranceLevelElement.textContent,
                    explanation: assuranceExplanationElement.textContent
                }
            },
            // Métadonnées
            metadata: {
                exportDate: new Date().toISOString(),
                version: "1.0.0"
            }
        };
        
        // Convertir en JSON
        const jsonData = JSON.stringify(exportData, null, 2);
        
        // Créer un Blob pour le téléchargement
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        // Créer un lien de téléchargement
        const a = document.createElement('a');
        a.href = url;
        a.download = 'cyfun_assessment_' + new Date().toISOString().slice(0, 10) + '.json';
        
        // Déclencher le téléchargement
        document.body.appendChild(a);
        a.click();
        
        // Nettoyer
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 0);
    }
    
    // Ajouter un bouton d'exportation dans l'interface
    const exportBtn = document.createElement('button');
    exportBtn.className = 'btn btn-primary mt-3';
    exportBtn.innerHTML = '<i class="fas fa-download"></i> Exporter les résultats en JSON';
    exportBtn.addEventListener('click', exportToJson);
    
    // Ajouter le bouton après les résultats d'assurance
    assuranceResultContainer.appendChild(exportBtn);
    
    // Ajouter Font Awesome pour les icônes
    const fontAwesomeLink = document.createElement('link');
    fontAwesomeLink.rel = 'stylesheet';
    fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
    document.head.appendChild(fontAwesomeLink);
});
