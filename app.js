document.addEventListener('DOMContentLoaded', function() {
    // Initialisation des variables
    let organizationSize = '';
    let selectedServices = [];
    let relationWithBelgium = '';
    let servicesInEU = '';
    
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
    
    // Suppression des références aux éléments DOM pour l'évaluation du niveau d'assurance
    // car ces éléments ont été déplacés vers assurance_evaluation.html
    
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
                // Section B: Services fournis
                services: {
                    // Version simplifiée pour éviter l'erreur
                    selectedServices: selectedServices,
                    noneSelected: noneOfTheAboveCheckbox.checked
                },
                relationWithBelgium: relationWithBelgium,
                servicesInEU: servicesInEU,
                result: assessmentResult.textContent,
                details: resultDetails.textContent
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
    resultsContainer.appendChild(exportBtn);
    
    // Ajouter Font Awesome pour les icônes
    const fontAwesomeLink = document.createElement('link');
    fontAwesomeLink.rel = 'stylesheet';
    fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
    document.head.appendChild(fontAwesomeLink);
    
    // Implémentation de l'explication IA pour les résultats NIS2
    const getAIExplanationBtn = document.getElementById('getAIExplanationBtn');
    const aiExplanationContainer = document.getElementById('aiExplanationContainer');
    const aiLoading = document.getElementById('aiLoading');
    const aiContent = document.getElementById('aiContent');
    
    if (getAIExplanationBtn) {
        getAIExplanationBtn.addEventListener('click', function() {
            // Afficher le conteneur d'explication et l'indicateur de chargement
            aiExplanationContainer.style.display = 'block';
            aiLoading.style.display = 'block';
            aiContent.style.display = 'none';
            
            // Collecter toutes les données brutes des différentes sections pour l'IA
            const formData = {
                // Section A: Taille de l'organisation
                organizationSize: {
                    staffHeadcount: staffHeadcountSelect.value,
                    turnover: turnoverSelect.value,
                    balanceSheet: balanceSheetSelect.value,
                    calculatedSize: organizationSize
                },
                // Section B: Services fournis
                services: {
                    // Version simplifiée pour éviter l'erreur
                    selectedServices: selectedServices,
                    noneSelected: noneOfTheAboveCheckbox.checked
                },
                relationWithBelgium: relationWithBelgium,
                servicesInEU: servicesInEU,
                // Résultat calculé par l'outil
                toolResult: {
                    status: assessmentResult.textContent,
                    details: resultDetails.textContent
                }
            };
            
            // Préparation du prompt pour l'API OpenAI
            const promptMessage = `
Analysez les données d'évaluation NIS2 ci-dessous en tant qu'expert juridique:

A. TAILLE: ${formData.organizationSize.calculatedSize} (Effectif: ${formData.organizationSize.staffHeadcount}, CA: ${formData.organizationSize.turnover}, Bilan: ${formData.organizationSize.balanceSheet})

B. SERVICES SÉLECTIONNÉS: 
Codes bruts sélectionnés: ${selectedServices.join(', ')} 
Services identifiés: ${selectedServices.length > 0 ? 
    // Convertir manuellement les codes en noms de services connus en se basant sur nis2_data.js
    selectedServices.map(code => {
        switch(code) {
            // Banque
            case "C30": return "Établissements de crédit";
            case "C31": return "Opérateurs de systèmes de négociation";
            case "C32": return "Contreparties centrales";
            case "C33": return "Contreparties centrales (CCP)";
            case "C34": return "Prestataires de services de paiement";
            case "C35": return "Établissements de monnaie électronique";
            
            // Infrastructure numérique
            case "C36": return "Fournisseurs de points d'échange internet";
            case "C37": return "Fournisseurs de services DNS, à l'exclusion des opérateurs de serveurs racines de noms";
            case "C38": return "Registres de noms de domaine de premier niveau";
            case "C39": return "Fournisseurs de services d'informatique en nuage";
            case "C40": return "Fournisseurs de services de centres de données";
            case "C41": return "Fournisseurs de réseaux de diffusion de contenu";
            case "C42": return "Prestataires de services de confiance qualifiés";
            case "C43": return "Prestataires de services de confiance non qualifiés";
            
            // Fournisseurs de réseaux et services de communications électroniques
            case "C44": return "Fournisseurs de réseaux publics de communications électroniques";
            case "C45": return "Fournisseurs de services de communications électroniques accessibles au public";
            
            // Gestion des services informatiques (entreprise à entreprise)
            case "C47": return "Fournisseurs de services gérés";
            case "C48": return "Fournisseurs de services de sécurité gérés";
            
            // Fournisseurs numériques
            case "C50": return "Fournisseurs de places de marché en ligne";
            case "C51": return "Fournisseurs de moteurs de recherche en ligne";
            case "C52": return "Fournisseurs de plateformes de services de réseaux sociaux";
            
            // En cas de code non reconnu
            default: return `Service avec code ${code} (secteur potentiellement couvert par NIS2)`;
        }
    }).join(', ') 
    : "Aucun service sélectionné"}
${formData.services.noneSelected ? " (Aucun des secteurs NIS2 n'a été sélectionné)" : ""}
IMPORTANT: Les services suivants sont EXPLICITEMENT couverts par la directive NIS2, indépendamment des codes NACE:
- Fournisseurs de services gérés (C47)
- Fournisseurs de services d'informatique en nuage (C39)
- Fournisseurs de services de centres de données (C40)
- Fournisseurs de places de marché en ligne (C50)
- Fournisseurs de moteurs de recherche en ligne (C51)
- Autres services mentionnés dans la directive (C30-C52)

C. RELATION BELGIQUE: ${formData.relationWithBelgium}

D. SERVICES UE: ${formData.servicesInEU}

RÉSULTAT CALCULÉ: ${formData.toolResult.status}

INSTRUCTIONS PRÉCISES:
1. BASEZ VOTRE ANALYSE SUR LES SERVICES IDENTIFIÉS CI-DESSUS
2. Déterminez le statut NIS2: "Entité essentielle", "Entité importante" ou "Hors champ NIS2"
3. Si l'entité a sélectionné des services explicitement couverts par NIS2 (C30-C52), elle NE PEUT PAS être "Hors champ NIS2"
4. Identifiez clairement chaque service sélectionné par son nom complet et expliquez son impact sur la classification
5. Si votre conclusion diffère de l'outil, expliquez pourquoi en précisant quels services placent l'entité dans le champ d'application

FORMAT: Réponse affirmative et technique (max 250 mots). Évitez toute ambiguïté.`;
            
            // Vérifier si une clé API est stockée
            let apiKey = localStorage.getItem('openai_api_key');
            
            if (!apiKey) {
                // Demander la clé API si elle n'est pas stockée
                apiKey = window.prompt("Veuillez entrer votre clé API OpenAI pour générer des explications IA:", "");
                
                if (apiKey && apiKey.trim() !== "") {
                    // Demander confirmation pour stocker la clé (sécurité)
                    const storeKey = confirm("Souhaitez-vous que votre navigateur mémorise cette clé API pour les prochaines utilisations? (Assurez-vous que vous êtes sur un appareil sécurisé)");
                    
                    if (storeKey) {
                        localStorage.setItem('openai_api_key', apiKey);
                    }
                } else {
                    // Si l'utilisateur n'a pas fourni de clé API, utiliser la réponse simulée
                    aiLoading.style.display = 'none';
                    aiContent.style.display = 'block';
                    aiContent.innerHTML = generateSimulatedNIS2Explanation(assessmentResult.textContent, resultDetails.textContent);
                    return;
                }
            }
            
            // Configuration de la requête API
            const requestData = {
                model: "gpt-4o",
                messages: [
                    {
                        role: "developer",
                        content: "Vous êtes un expert en réglementation NIS2 qui explique les implications réglementaires et les obligations de conformité."
                    },
                    {
                        role: "user",
                        content: promptMessage
                    }
                ],
                temperature: 0.7,
                max_tokens: 400
            };
            
            // Appel à l'API OpenAI
            fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify(requestData)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // Afficher la réponse
                aiLoading.style.display = 'none';
                aiContent.style.display = 'block';
                aiContent.innerHTML = `<div class="ai-explanation">${data.choices[0].message.content.replace(/\n/g, '<br>')}</div>`;
            })
            .catch(error => {
                console.error('Error calling OpenAI API:', error);
                aiLoading.style.display = 'none';
                aiContent.style.display = 'block';
                
                // Gestion des différentes erreurs
                if (error.message.includes('401')) {
                    // Erreur d'authentification (clé API incorrecte)
                    aiContent.innerHTML = `
                        <div class="alert alert-danger">
                            <p><strong>Erreur d'authentification (401):</strong> Votre clé API semble être incorrecte ou expirée.</p>
                            <p>Veuillez vérifier votre clé API OpenAI dans les paramètres et réessayer.</p>
                        </div>
                        <div class="mt-3">
                            <p>En attendant, voici une explication générée localement :</p>
                            ${generateSimulatedNIS2Explanation(assessmentResult.textContent, resultDetails.textContent)}
                        </div>
                    `;
                }
                // Si c'est une erreur de quota dépassé (429 - Too Many Requests)
                else if (error.message.includes('429')) {
                    aiContent.innerHTML = `
                        <div class="alert alert-warning">
                            <p><strong>Quota API dépassé (429 - Too Many Requests):</strong> Vous avez atteint la limite de requêtes pour votre compte OpenAI.</p>
                            <p>Causes possibles :</p>
                            <ul>
                                <li>Votre compte gratuit a atteint sa limite mensuelle</li>
                                <li>Trop de requêtes ont été effectuées en peu de temps</li>
                                <li>Vous n'avez pas configuré de mode de paiement dans votre compte OpenAI</li>
                            </ul>
                        </div>
                        <div class="mt-3">
                            <p>En attendant, voici une explication générée localement :</p>
                            ${generateSimulatedNIS2Explanation(assessmentResult.textContent, resultDetails.textContent)}
                        </div>
                    `;
                }
                // Si c'est une erreur de quota insuffisant
                else if (error.message.includes('insufficient_quota') || error.message.includes('exceeded your current quota')) {
                    aiContent.innerHTML = `
                        <div class="alert alert-danger">
                            <p><strong>Quota insuffisant :</strong> Votre compte OpenAI n'a plus de crédits disponibles.</p>
                            <p>Pour résoudre ce problème :</p>
                            <ul>
                                <li>Vérifiez les détails de facturation de votre compte OpenAI</li>
                                <li>Ajoutez un moyen de paiement ou rechargez votre crédit</li>
                                <li>Passez à un plan payant si vous utilisez un compte gratuit</li>
                            </ul>
                            <p><a href="https://platform.openai.com/account/billing" target="_blank">Gérer votre compte OpenAI</a></p>
                        </div>
                        <div class="mt-3">
                            <p>En attendant, voici une explication générée localement :</p>
                            ${generateSimulatedNIS2Explanation(assessmentResult.textContent, resultDetails.textContent)}
                        </div>
                    `;
                }
                else {
                    // Autre erreur
                    aiContent.innerHTML = `
                        <div class="alert alert-danger">
                            <p><strong>Erreur:</strong> ${error.message}</p>
                        </div>
                        <div class="mt-3">
                            <p>En attendant, voici une explication générée localement :</p>
                            ${generateSimulatedNIS2Explanation(assessmentResult.textContent, resultDetails.textContent)}
                        </div>
                    `;
                }
            });
        });
    }
    
    // Fonction pour générer une explication NIS2 simulée en cas d'erreur ou d'absence de clé API
    function generateSimulatedNIS2Explanation(resultStatus, resultDetails) {
        let explanation = '<div class="ai-explanation-local">';
        
        if (resultStatus.includes('Entité importante')) {
            explanation += `
                <h5>Analyse de la qualification "Entité importante"</h5>
                <p>Votre organisation est considérée comme une <strong>Entité importante</strong> au sens de la directive NIS2. Cela implique un niveau intermédiaire d'obligations de cybersécurité.</p>
                
                <h5>Obligations principales</h5>
                <ul>
                    <li>Mettre en place des mesures techniques et organisationnelles de gestion des risques de cybersécurité</li>
                    <li>Notifier les incidents significatifs à l'autorité compétente</li>
                    <li>Mettre en œuvre une politique de cybersécurité</li>
                </ul>
                
                <h5>Calendrier de mise en conformité</h5>
                <p>Vous devrez vous conformer aux exigences NIS2 dans les 21 mois suivant l'entrée en vigueur de la loi nationale de transposition, soit probablement d'ici fin 2025.</p>
            `;
        } else if (resultStatus.includes('Entité essentielle')) {
            explanation += `
                <h5>Analyse de la qualification "Entité essentielle"</h5>
                <p>Votre organisation est considérée comme une <strong>Entité essentielle</strong> au sens de la directive NIS2. Cela implique le niveau le plus élevé d'obligations de cybersécurité.</p>
                
                <h5>Obligations principales</h5>
                <ul>
                    <li>Mettre en place des mesures techniques et organisationnelles avancées de gestion des risques</li>
                    <li>Notification rapide des incidents (24h pour l'alerte initiale)</li>
                    <li>Audits de sécurité réguliers</li>
                    <li>Responsabilité directe de l'organe de direction</li>
                </ul>
                
                <h5>Calendrier de mise en conformité</h5>
                <p>Vous devrez vous conformer aux exigences NIS2 dans les 18 mois suivant l'entrée en vigueur de la loi nationale de transposition, soit probablement d'ici mi-2025.</p>
            `;
        } else if (resultStatus.includes('Hors champ')) {
            explanation += `
                <h5>Analyse de la qualification "Hors champ"</h5>
                <p>Votre organisation n'entre actuellement pas dans le champ d'application de la directive NIS2. Cela signifie que vous n'êtes pas soumis aux obligations légales spécifiques de cette réglementation.</p>
                
                <h5>Recommandations</h5>
                <ul>
                    <li>Bien que non soumis à NIS2, il est recommandé d'adopter des mesures de cybersécurité adaptées à votre niveau de risque</li>
                    <li>Réévaluer régulièrement votre statut, car des changements dans la taille de l'organisation ou les services fournis pourraient modifier votre qualification</li>
                </ul>
                
                <h5>Bonnes pratiques</h5>
                <p>Considérez l'adoption volontaire des normes ISO 27001 ou du référentiel CyberFundamentals pour améliorer votre niveau de sécurité.</p>
            `;
        }
        
        explanation += '</div>';
        return explanation;
    }
});
