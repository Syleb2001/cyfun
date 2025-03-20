// Fonctions principales pour l'application CyFun Self-Assessment

// Variables globales pour stocker les scores
let documentationScores = {};
let implementationScores = {};

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', function() {
    // Initialisation de la date d'aujourd'hui
    const today = new Date();
    document.getElementById('assessmentDate').valueAsDate = today;
    
    // Charger l'introduction
    loadIntroduction();
    
    // Charger les niveaux de maturité
    loadMaturityLevels();
    
    // Configurer les événements
    setupEventListeners();
    
    // Charger les contrôles par défaut (niveau BASIC)
    loadControls('BASIC');
});

// Charger l'introduction du framework
function loadIntroduction() {
    const introSection = document.getElementById('introductionSection');
    introSection.innerHTML = `
        <h3>Introduction au CyberFundamentals Framework</h3>
        <p>${cyfunData.introduction.description}</p>
        <p>${cyfunData.introduction.directions}</p>
    `;
}

// Charger les niveaux de maturité
function loadMaturityLevels() {
    const maturitySection = document.getElementById('maturityLevelsSection');
    let maturityContent = '<h3>Niveaux de maturité</h3>';
    maturityContent += '<div class="table-responsive"><table class="table table-bordered">';
    maturityContent += '<thead><tr><th>Niveau</th><th>Nom</th><th>Description</th></tr></thead>';
    maturityContent += '<tbody>';
    
    cyfunData.maturityLevels.forEach(level => {
        maturityContent += `
            <tr>
                <td>${level.level}</td>
                <td>${level.name}</td>
                <td>${level.description}</td>
            </tr>
        `;
    });
    
    maturityContent += '</tbody></table></div>';
    maturitySection.innerHTML = maturityContent;
}

// Configurer les écouteurs d'événements
function setupEventListeners() {
    // Changement de niveau d'évaluation
    document.getElementById('assessmentLevel').addEventListener('change', function() {
        const level = this.value;
        loadControls(level);
        resetScores();
    });
    
    // Bouton de calcul des résultats
    document.getElementById('calculateResults').addEventListener('click', function() {
        calculateResults();
    });
    
    // Note: Le bouton d'exportation des résultats (exportJSON) est créé dynamiquement
    // dans la fonction displayResults, donc son écouteur d'événement est ajouté là-bas
}

// Charger les contrôles pour un niveau spécifique
function loadControls(level) {
    const controlsSection = document.getElementById('controlsSection');
    const controls = cyfunData.controls[level];
    
    console.log("Chargement des contrôles pour le niveau:", level);
    console.log("Contrôles disponibles:", controls);
    
    if (!controls || controls.length === 0) {
        controlsSection.innerHTML = `<p>Aucun contrôle disponible pour le niveau ${level}.</p>`;
        return;
    }
    
    // Créer un objet pour regrouper les contrôles par fonction
    const functionGroups = {
        "ID": {
            name: "IDENTIFY",
            description: "Développer une compréhension organisationnelle pour gérer les risques de cybersécurité des systèmes, des personnes, des actifs, des données et des capacités.",
            controls: []
        },
        "PR": {
            name: "PROTECT",
            description: "Développer et mettre en œuvre des mesures de protection appropriées pour assurer la prestation des services critiques.",
            controls: []
        },
        "DE": {
            name: "DETECT",
            description: "Développer et mettre en œuvre des activités appropriées pour identifier l'occurrence d'un événement de cybersécurité.",
            controls: []
        },
        "RS": {
            name: "RESPOND",
            description: "Développer et mettre en œuvre des activités appropriées pour prendre des mesures concernant un incident de cybersécurité détecté.",
            controls: []
        },
        "RC": {
            name: "RECOVER",
            description: "Développer et mettre en œuvre des activités appropriées pour maintenir les plans de résilience et restaurer les capacités ou services qui ont été altérés en raison d'un incident de cybersécurité.",
            controls: []
        }
    };
    
    // Regrouper les contrôles par fonction
    controls.forEach(control => {
        let functionId;
        if (control.function === "IDENTIFY") functionId = "ID";
        else if (control.function === "PROTECT") functionId = "PR";
        else if (control.function === "DETECT") functionId = "DE";
        else if (control.function === "RESPOND") functionId = "RS";
        else if (control.function === "RECOVER") functionId = "RC";
        else {
            console.error("Fonction inconnue:", control.function);
            return;
        }
        
        if (functionGroups[functionId]) {
            functionGroups[functionId].controls.push(control);
        }
    });
    
    // Générer le HTML pour les contrôles
    let html = `<h3>Contrôles d'évaluation - Niveau ${level}</h3>`;
    
    // Créer les onglets pour les fonctions
    html += '<ul class="nav nav-tabs" id="functionTabs" role="tablist">';
    
    Object.keys(functionGroups).forEach((functionId, index) => {
        const group = functionGroups[functionId];
        if (group.controls.length > 0) {
            const isActive = index === 0 ? 'active' : '';
            html += `
                <li class="nav-item" role="presentation">
                    <button class="nav-link ${isActive}" id="${functionId}-tab" data-bs-toggle="tab" 
                            data-bs-target="#${functionId}" type="button" role="tab" 
                            aria-controls="${functionId}" aria-selected="${index === 0}">
                        ${group.name}
                    </button>
                </li>
            `;
        }
    });
    
    html += '</ul>';
    
    // Créer le contenu des onglets
    html += '<div class="tab-content" id="functionTabsContent">';
    
    Object.keys(functionGroups).forEach((functionId, index) => {
        const group = functionGroups[functionId];
        if (group.controls.length > 0) {
            const isActive = index === 0 ? 'show active' : '';
            
            html += `
                <div class="tab-pane fade ${isActive}" id="${functionId}" role="tabpanel" aria-labelledby="${functionId}-tab">
                    <div class="p-3">
                        <h4>${group.name}</h4>
                        <p>${group.description}</p>
                        
                        <div class="table-responsive">
                            <table class="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>Catégorie</th>
                                        <th>Contrôle</th>
                                        <th>Exigence</th>
                                        <th>Conseils</th>
                                        <th>Documentation</th>
                                        <th>Implémentation</th>
                                    </tr>
                                </thead>
                                <tbody>
            `;
            
            // Ajouter chaque contrôle
            group.controls.forEach(control => {
                const controlId = control.controlId;
                const keyMeasure = control.keyMeasure ? '<span class="badge bg-warning">Mesure clé</span>' : '';
                
                html += `
                    <tr>
                        <td>${control.category || ''} ${keyMeasure}</td>
                        <td>${control.controlName || controlId}</td>
                        <td>${control.requirement || ''}</td>
                        <td>
                            <button class="btn btn-sm btn-info guidance-btn" data-control-id="${controlId}" data-control-name="${(control.controlName || controlId).replace(/'/g, "\\'")}">
                                Voir les conseils
                            </button>
                        </td>
                        <td>
                            <select id="doc-${controlId}" class="form-select documentation-maturity" data-control-id="${controlId}">
                                <option value="">Sélectionner...</option>
                                ${cyfunData.maturityLevels.map(level => 
                                    `<option value="${level.level}">${level.level} - ${level.name}</option>`
                                ).join('')}
                            </select>
                        </td>
                        <td>
                            <select id="impl-${controlId}" class="form-select implementation-maturity" data-control-id="${controlId}">
                                <option value="">Sélectionner...</option>
                                ${cyfunData.maturityLevels.map(level => 
                                    `<option value="${level.level}">${level.level} - ${level.name}</option>`
                                ).join('')}
                            </select>
                        </td>
                    </tr>
                `;
            });
            
            html += `
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            `;
        }
    });
    
    html += '</div>';
    
    // Ajouter le modal pour les conseils
    html += `
        <div class="modal fade" id="guidanceModal" tabindex="-1" aria-labelledby="guidanceModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="guidanceModalLabel">Conseils</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body" id="guidanceModalBody">
                        <!-- Le contenu sera injecté dynamiquement -->
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Insérer le HTML dans la section des contrôles
    controlsSection.innerHTML = html;
    console.log("Contenu des contrôles généré et inséré dans la page");
    
    // Ajouter les écouteurs d'événements après avoir inséré le HTML
    setupControlEventListeners();
}

// Configurer les écouteurs d'événements pour les contrôles
function setupControlEventListeners() {
    // Écouteurs pour les boutons de conseils
    const guidanceBtns = document.querySelectorAll('.guidance-btn');
    guidanceBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const controlId = this.getAttribute('data-control-id');
            const controlName = this.getAttribute('data-control-name');
            showGuidance(controlId, controlName);
            
            // Afficher le modal manuellement
            const guidanceModal = new bootstrap.Modal(document.getElementById('guidanceModal'));
            guidanceModal.show();
        });
    });
    
    // Écouteurs pour les sélecteurs de maturité de documentation
    const docSelects = document.querySelectorAll('.documentation-maturity');
    docSelects.forEach(select => {
        select.addEventListener('change', function() {
            const controlId = this.getAttribute('data-control-id');
            updateScore(controlId, 'documentation');
        });
    });
    
    // Écouteurs pour les sélecteurs de maturité d'implémentation
    const implSelects = document.querySelectorAll('.implementation-maturity');
    implSelects.forEach(select => {
        select.addEventListener('change', function() {
            const controlId = this.getAttribute('data-control-id');
            updateScore(controlId, 'implementation');
        });
    });
}

// Afficher les conseils pour un contrôle spécifique
function showGuidance(controlId, controlName) {
    console.log(`Affichage des conseils pour ${controlId}: ${controlName}`);
    
    // Trouver le contrôle correspondant
    let targetControl = null;
    const level = document.getElementById('assessmentLevel').value;
    const controls = cyfunData.controls[level];
    
    for (const control of controls) {
        if (control.controlId === controlId) {
            targetControl = control;
            break;
        }
    }
    
    if (!targetControl) {
        console.error(`Contrôle non trouvé: ${controlId}`);
        return;
    }
    
    // Mettre à jour le titre du modal
    document.getElementById('guidanceModalLabel').textContent = `Conseils pour ${controlName}`;
    
    // Mettre à jour le contenu du modal
    const guidanceContent = targetControl.guidance || 'Aucun conseil disponible pour ce contrôle.';
    document.getElementById('guidanceModalBody').innerHTML = `
        <p><strong>Exigence:</strong> ${targetControl.requirement || ''}</p>
        <p><strong>Conseils:</strong></p>
        <div class="guidance-content">${guidanceContent.replace(/\n/g, '<br>')}</div>
    `;
}

// Mettre à jour le score pour un contrôle
function updateScore(controlId, type) {
    console.log(`Mise à jour du score pour ${controlId}, type: ${type}`);
    
    // Déterminer l'ID correct de l'élément
    let selectId;
    if (type === 'documentation') {
        selectId = `doc-${controlId}`;
    } else if (type === 'implementation') {
        selectId = `impl-${controlId}`;
    } else {
        console.error(`Type non reconnu: ${type}`);
        return;
    }
    
    console.log(`Recherche de l'élément avec l'ID: ${selectId}`);
    const selectElement = document.getElementById(selectId);
    
    if (!selectElement) {
        console.error(`Élément non trouvé: ${selectId}`);
        return;
    }
    
    const value = parseInt(selectElement.value);
    
    if (isNaN(value)) {
        console.log(`Valeur non numérique pour ${controlId}, type: ${type}`);
        return;
    }
    
    console.log(`Score mis à jour pour ${controlId}, type: ${type}, valeur: ${value}`);
    
    if (type === 'documentation') {
        documentationScores[controlId] = value;
    } else {
        implementationScores[controlId] = value;
    }
}

// Réinitialiser les scores
function resetScores() {
    documentationScores = {};
    implementationScores = {};
    console.log("Scores réinitialisés");
}

// Calculer les résultats
function calculateResults() {
    console.log("Calcul des résultats...");
    console.log("Scores de documentation:", documentationScores);
    console.log("Scores d'implémentation:", implementationScores);
    
    const level = document.getElementById('assessmentLevel').value;
    const controls = cyfunData.controls[level];
    
    // Vérifier si tous les contrôles ont été évalués
    let allControlsEvaluated = true;
    const missingControls = [];
    
    controls.forEach(control => {
        const controlId = control.controlId;
        if (!documentationScores[controlId] || !implementationScores[controlId]) {
            allControlsEvaluated = false;
            missingControls.push(controlId);
        }
    });
    
    if (!allControlsEvaluated) {
        console.warn("Certains contrôles n'ont pas été évalués:", missingControls);
        alert(`Veuillez évaluer tous les contrôles avant de calculer les résultats. Contrôles manquants: ${missingControls.join(', ')}`);
        return;
    }
    
    // Calculer les scores par catégorie
    const categoryScores = {};
    const categories = cyfunData.categories;
    
    categories.forEach(category => {
        const categoryId = category.id;
        const categoryControls = cyfunData.formulas.getControlsByCategoryId(categoryId);
        
        if (categoryControls.length > 0) {
            const docScore = cyfunData.formulas.calculateCategoryScore(categoryId, documentationScores, implementationScores, 'documentation');
            const implScore = cyfunData.formulas.calculateCategoryScore(categoryId, documentationScores, implementationScores, 'implementation');
            
            if (!isNaN(docScore) && !isNaN(implScore)) {
                categoryScores[categoryId] = {
                    documentation: docScore,
                    implementation: implScore,
                    average: (docScore + implScore) / 2,
                    name: category.name,
                    description: category.description
                };
            }
        }
    });
    
    // Calculer le score global
    const overallScore = cyfunData.formulas.calculateOverallScore(documentationScores, implementationScores);
    
    // Déterminer le statut de conformité
    const complianceStatus = cyfunData.formulas.determineComplianceStatus(overallScore, level);
    
    // Générer la feuille de route si non conforme
    let roadmap = null;
    if (complianceStatus.status === "Non conforme") {
        roadmap = generateRoadmap(categoryScores, documentationScores, implementationScores, level);
    }
    
    // Notes et recommandations
    const notes = {
        organizationName: document.getElementById('organizationName').value || 'Non spécifié',
        assessmentDate: document.getElementById('assessmentDate').value || new Date().toISOString().split('T')[0],
        assessmentLevel: level,
        overallScore: overallScore,
        complianceStatus: complianceStatus,
        roadmap: roadmap
    };
    
    // Afficher les résultats
    displayResults(categoryScores, overallScore, complianceStatus, notes);
}

// Générer une feuille de route pour atteindre le niveau requis
function generateRoadmap(categoryScores, documentationScores, implementationScores, level) {
    const threshold = cyfunData.complianceThresholds[level].total;
    const controls = cyfunData.controls[level];
    const roadmap = {
        improvementAreas: [],
        priorityControls: [],
        generalRecommendations: []
    };
    
    // 1. Identifier les catégories les plus faibles
    const weakCategories = [];
    Object.keys(categoryScores).forEach(categoryId => {
        const category = categoryScores[categoryId];
        const categoryThreshold = cyfunData.complianceThresholds[level].category;
        
        if (category.average < categoryThreshold) {
            weakCategories.push({
                id: categoryId,
                name: category.name,
                score: category.average,
                gap: categoryThreshold - category.average
            });
        }
    });
    
    // Trier par écart le plus important
    weakCategories.sort((a, b) => b.gap - a.gap);
    
    // Ajouter les catégories faibles à la feuille de route
    weakCategories.forEach(category => {
        roadmap.improvementAreas.push({
            category: category.name,
            currentScore: category.score.toFixed(2),
            targetScore: cyfunData.complianceThresholds[level].category.toFixed(2),
            gap: category.gap.toFixed(2)
        });
    });
    
    // 2. Identifier les contrôles clés avec des scores faibles
    const weakKeyControls = [];
    controls.forEach(control => {
        if (control.keyMeasure) {
            const controlId = control.controlId;
            const docScore = documentationScores[controlId] || 0;
            const implScore = implementationScores[controlId] || 0;
            const avgScore = (docScore + implScore) / 2;
            const keyMeasureThreshold = cyfunData.complianceThresholds[level].keyMeasure;
            
            if (avgScore < keyMeasureThreshold) {
                weakKeyControls.push({
                    id: controlId,
                    name: control.controlName || controlId,
                    function: control.function,
                    category: control.category,
                    score: avgScore,
                    gap: keyMeasureThreshold - avgScore,
                    requirement: control.requirement,
                    guidance: control.guidance
                });
            }
        }
    });
    
    // Trier par écart le plus important
    weakKeyControls.sort((a, b) => b.gap - a.gap);
    
    // Ajouter les contrôles clés faibles à la feuille de route
    weakKeyControls.forEach(control => {
        roadmap.priorityControls.push({
            id: control.id,
            name: control.name,
            function: control.function,
            category: control.category,
            currentScore: control.score.toFixed(2),
            targetScore: cyfunData.complianceThresholds[level].keyMeasure.toFixed(2),
            requirement: control.requirement,
            guidance: control.guidance
        });
    });
    
    // 3. Ajouter des recommandations générales
    roadmap.generalRecommendations = [
        "Concentrez-vous d'abord sur l'amélioration des mesures clés identifiées pour un impact maximal.",
        "Documentez formellement vos processus de sécurité et assurez-vous qu'ils sont approuvés par la direction.",
        "Mettez en œuvre des processus formels et conservez des preuves de leur application.",
        "Établissez des métriques détaillées pour suivre l'efficacité de vos contrôles de sécurité.",
        "Révisez régulièrement vos politiques et procédures pour garantir leur pertinence continue."
    ];
    
    return roadmap;
}

// Afficher les résultats
function displayResults(categoryScores, overallScore, complianceStatus, notes) {
    const resultsSection = document.getElementById('resultsSection');
    
    // Créer le contenu HTML pour les résultats
    let html = `
        <div class="alert ${complianceStatus.status === 'Conforme' ? 'alert-success' : 'alert-warning'} mb-4">
            <h4 class="alert-heading">${complianceStatus.status} au niveau ${notes.assessmentLevel}</h4>
            <p>${complianceStatus.description}</p>
        </div>
        
        <div class="card mb-4">
            <div class="card-header">
                <h5>Informations générales</h5>
            </div>
            <div class="card-body">
                <p><strong>Organisation:</strong> ${notes.organizationName}</p>
                <p><strong>Date d'évaluation:</strong> ${notes.assessmentDate}</p>
                <p><strong>Niveau d'évaluation:</strong> ${notes.assessmentLevel}</p>
                <p><strong>Score global:</strong> ${overallScore.average.toFixed(2)}/5</p>
            </div>
        </div>
        
        <div class="card mb-4">
            <div class="card-header">
                <h5>Scores par catégorie</h5>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>Catégorie</th>
                                <th>Documentation</th>
                                <th>Implémentation</th>
                                <th>Moyenne</th>
                                <th>Statut</th>
                            </tr>
                        </thead>
                        <tbody>
    `;
    
    // Ajouter les scores par catégorie
    Object.keys(categoryScores).forEach(categoryId => {
        const category = categoryScores[categoryId];
        const threshold = cyfunData.complianceThresholds[notes.assessmentLevel].category;
        const isCompliant = category.average >= threshold;
        
        html += `
            <tr>
                <td>${category.name}</td>
                <td>${category.documentation.toFixed(2)}</td>
                <td>${category.implementation.toFixed(2)}</td>
                <td>${category.average.toFixed(2)}</td>
                <td>
                    <span class="badge ${isCompliant ? 'bg-success' : 'bg-danger'}">
                        ${isCompliant ? 'Conforme' : 'Non conforme'}
                    </span>
                </td>
            </tr>
        `;
    });
    
    html += `
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
    
    // Ajouter la feuille de route si non conforme
    if (notes.roadmap) {
        html += `
            <div class="card mb-4">
                <div class="card-header bg-primary text-white">
                    <h5 class="mb-0">Feuille de route pour atteindre le niveau ${notes.assessmentLevel}</h5>
                </div>
                <div class="card-body">
                    <div class="alert alert-info">
                        <i class="fas fa-info-circle me-2"></i>
                        Cette feuille de route identifie les domaines d'amélioration prioritaires pour atteindre le niveau de conformité requis.
                    </div>
                    
                    <h6 class="mt-4 mb-3"><i class="fas fa-chart-line me-2"></i>Domaines d'amélioration prioritaires</h6>
        `;
        
        if (notes.roadmap.improvementAreas.length > 0) {
            html += `
                <div class="table-responsive">
                    <table class="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>Catégorie</th>
                                <th>Score actuel</th>
                                <th>Score cible</th>
                                <th>Écart</th>
                            </tr>
                        </thead>
                        <tbody>
            `;
            
            notes.roadmap.improvementAreas.forEach(area => {
                html += `
                    <tr>
                        <td>${area.category}</td>
                        <td>${area.currentScore}</td>
                        <td>${area.targetScore}</td>
                        <td><span class="badge bg-warning">${area.gap}</span></td>
                    </tr>
                `;
            });
            
            html += `
                        </tbody>
                    </table>
                </div>
            `;
        } else {
            html += `<p>Toutes les catégories atteignent le score minimum requis.</p>`;
        }
        
        html += `
                    <h6 class="mt-4 mb-3"><i class="fas fa-key me-2"></i>Contrôles clés à améliorer</h6>
        `;
        
        if (notes.roadmap.priorityControls.length > 0) {
            notes.roadmap.priorityControls.forEach((control, index) => {
                html += `
                    <div class="card mb-3 border-warning">
                        <div class="card-header bg-light">
                            <strong>${control.id}: ${control.name}</strong>
                            <span class="badge bg-primary float-end">${control.function}</span>
                        </div>
                        <div class="card-body">
                            <p><strong>Catégorie:</strong> ${control.category}</p>
                            <p><strong>Score actuel:</strong> ${control.currentScore} 
                               <strong class="ms-3">Score cible:</strong> ${control.targetScore}</p>
                            <p><strong>Exigence:</strong> ${control.requirement}</p>
                            <div class="mt-3">
                                <p><strong>Conseils d'implémentation:</strong></p>
                                <ul>
                                    ${control.guidance.split('\n').map(line => 
                                        line.trim() ? `<li>${line.replace(/^•\s*/, '')}</li>` : ''
                                    ).join('')}
                                </ul>
                            </div>
                        </div>
                    </div>
                `;
            });
        } else {
            html += `<p>Tous les contrôles clés atteignent le score minimum requis.</p>`;
        }
        
        html += `
                    <h6 class="mt-4 mb-3"><i class="fas fa-lightbulb me-2"></i>Recommandations générales</h6>
                    <ul class="list-group mb-3">
        `;
        
        notes.roadmap.generalRecommendations.forEach(recommendation => {
            html += `<li class="list-group-item"><i class="fas fa-check-circle text-success me-2"></i>${recommendation}</li>`;
        });
        
        html += `
                    </ul>
                </div>
            </div>
        `;
    }
    
    html += `
        <div class="d-grid gap-2">
            <div class="row">
                <div class="col-md-6 mb-2">
                    <button class="btn btn-primary w-100" id="exportJSON">Exporter les résultats en JSON</button>
                </div>
                <div class="col-md-6 mb-2">
                    <button class="btn btn-danger w-100" id="exportPDF">Exporter en PDF professionnel</button>
                </div>
            </div>
        </div>
    `;
    
    // Insérer le HTML dans la section des résultats
    resultsSection.innerHTML = html;
    
    // Ajouter l'écouteur d'événement pour le bouton d'exportation JSON
    document.getElementById('exportJSON').addEventListener('click', function() {
        exportResults(categoryScores, overallScore, complianceStatus, notes);
    });
    
    // Ajouter l'écouteur d'événement pour le bouton d'exportation PDF
    document.getElementById('exportPDF').addEventListener('click', function() {
        exportPDF(categoryScores, overallScore, complianceStatus, notes);
    });
    
    // Ouvrir automatiquement la section des résultats
    const resultsCollapse = document.getElementById('collapseD');
    const bsCollapse = new bootstrap.Collapse(resultsCollapse, { toggle: false });
    bsCollapse.show();
}

// Exporter les résultats en PDF
function exportPDF(categoryScores, overallScore, complianceStatus, notes) {
    // Accéder aux objets jsPDF depuis le namespace global
    const { jsPDF } = window.jspdf;
    
    // Créer un nouveau document PDF
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });
    
    // Définir les couleurs
    const primaryColor = [41, 128, 185]; // Bleu
    const secondaryColor = [39, 174, 96]; // Vert
    const dangerColor = [231, 76, 60]; // Rouge
    const warningColor = [243, 156, 18]; // Orange
    
    // Ajouter un en-tête avec logo (simulé par un rectangle coloré)
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(0, 0, 210, 30, 'F');
    
    // Titre du rapport
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.text('Rapport d\'évaluation CyFun', 105, 15, { align: 'center' });
    
    // Sous-titre
    doc.setFontSize(12);
    doc.text('Évaluation de conformité au CyberFundamentals Framework', 105, 22, { align: 'center' });
    
    // Informations générales
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.text('Informations générales', 14, 40);
    
    // Ligne de séparation
    doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setLineWidth(0.5);
    doc.line(14, 43, 196, 43);
    
    // Détails de l'organisation
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text(`Organisation: ${notes.organizationName}`, 14, 50);
    doc.text(`Date d'évaluation: ${notes.assessmentDate}`, 14, 56);
    doc.text(`Niveau d'évaluation: ${notes.assessmentLevel}`, 14, 62);
    
    // Score global et statut
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    
    // Définir la couleur en fonction du statut
    if (complianceStatus.status === 'Conforme') {
        doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    } else {
        doc.setTextColor(dangerColor[0], dangerColor[1], dangerColor[2]);
    }
    
    doc.text(`Statut: ${complianceStatus.status}`, 14, 72);
    doc.text(`Score global: ${overallScore.average.toFixed(2)}/5`, 14, 79);
    
    // Réinitialiser la couleur du texte
    doc.setTextColor(0, 0, 0);
    
    // Description du statut
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    
    // Ajouter la description avec retour à la ligne automatique
    const splitDescription = doc.splitTextToSize(complianceStatus.description, 180);
    doc.text(splitDescription, 14, 86);
    
    // Position Y après la description
    let yPos = 86 + (splitDescription.length * 6);
    
    // Scores par catégorie
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Scores par catégorie', 14, yPos + 10);
    
    // Ligne de séparation
    doc.line(14, yPos + 13, 196, yPos + 13);
    
    // Tableau des scores par catégorie
    const categoryData = [];
    Object.keys(categoryScores).forEach(categoryId => {
        const category = categoryScores[categoryId];
        const threshold = cyfunData.complianceThresholds[notes.assessmentLevel].category;
        const isCompliant = category.average >= threshold;
        
        categoryData.push([
            category.name,
            category.documentation.toFixed(2),
            category.implementation.toFixed(2),
            category.average.toFixed(2),
            isCompliant ? 'Conforme' : 'Non conforme'
        ]);
    });
    
    // Ajouter le tableau au document
    doc.autoTable({
        startY: yPos + 18,
        head: [['Catégorie', 'Documentation', 'Implémentation', 'Moyenne', 'Statut']],
        body: categoryData,
        theme: 'grid',
        headStyles: {
            fillColor: primaryColor,
            textColor: [255, 255, 255],
            fontStyle: 'bold'
        },
        columnStyles: {
            0: { cellWidth: 60 },
            4: { 
                cellWidth: 30,
                fontStyle: 'bold',
                halign: 'center'
            }
        },
        didDrawCell: function(data) {
            // Colorer la cellule de statut
            if (data.column.index === 4 && data.section === 'body') {
                const status = data.cell.raw;
                if (status === 'Conforme') {
                    doc.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
                } else {
                    doc.setFillColor(dangerColor[0], dangerColor[1], dangerColor[2]);
                }
                doc.setTextColor(255, 255, 255);
                
                // Dessiner un rectangle coloré pour le statut
                doc.rect(data.cell.x + 1, data.cell.y + 1, data.cell.width - 2, data.cell.height - 2, 'F');
                
                // Réécrire le texte
                doc.setFontSize(10);
                doc.text(status, data.cell.x + data.cell.width / 2, data.cell.y + data.cell.height / 2 + 1, {
                    align: 'center',
                    baseline: 'middle'
                });
            }
        }
    });
    
    // Obtenir la position Y après le tableau
    yPos = doc.lastAutoTable.finalY + 10;
    
    // Ajouter la feuille de route si non conforme et s'il y a de la place
    if (notes.roadmap) {
        // Vérifier s'il reste assez d'espace sur la page, sinon ajouter une nouvelle page
        if (yPos > 230) {
            doc.addPage();
            yPos = 20;
        }
        
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.text(`Feuille de route pour atteindre le niveau ${notes.assessmentLevel}`, 14, yPos);
        
        // Ligne de séparation
        doc.line(14, yPos + 3, 196, yPos + 3);
        
        // Réinitialiser la couleur du texte
        doc.setTextColor(0, 0, 0);
        
        // Description de la feuille de route
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        doc.text('Cette feuille de route identifie les domaines d\'amélioration prioritaires pour atteindre le niveau de conformité requis.', 14, yPos + 10);
        
        // Domaines d'amélioration prioritaires
        if (notes.roadmap.improvementAreas.length > 0) {
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.text('Domaines d\'amélioration prioritaires', 14, yPos + 20);
            
            // Tableau des domaines d'amélioration
            const improvementData = [];
            notes.roadmap.improvementAreas.forEach(area => {
                improvementData.push([
                    area.category,
                    area.currentScore,
                    area.targetScore,
                    area.gap
                ]);
            });
            
            // Ajouter le tableau au document
            doc.autoTable({
                startY: yPos + 25,
                head: [['Catégorie', 'Score actuel', 'Score cible', 'Écart']],
                body: improvementData,
                theme: 'grid',
                headStyles: {
                    fillColor: warningColor,
                    textColor: [255, 255, 255],
                    fontStyle: 'bold'
                },
                columnStyles: {
                    0: { cellWidth: 80 },
                    3: { fontStyle: 'bold' }
                }
            });
            
            // Mettre à jour la position Y
            yPos = doc.lastAutoTable.finalY + 10;
        }
        
        // Contrôles clés à améliorer
        if (notes.roadmap.priorityControls.length > 0) {
            // Vérifier s'il reste assez d'espace sur la page, sinon ajouter une nouvelle page
            if (yPos > 230) {
                doc.addPage();
                yPos = 20;
            }
            
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.text('Contrôles clés à améliorer', 14, yPos);
            
            // Ajouter chaque contrôle clé
            notes.roadmap.priorityControls.forEach((control, index) => {
                // Vérifier s'il reste assez d'espace sur la page, sinon ajouter une nouvelle page
                if (yPos > 220) {
                    doc.addPage();
                    yPos = 20;
                }
                
                // Titre du contrôle
                doc.setFillColor(245, 245, 245);
                doc.rect(14, yPos + 5, 182, 8, 'F');
                
                doc.setFontSize(12);
                doc.setFont('helvetica', 'bold');
                doc.text(`${control.id}: ${control.name}`, 16, yPos + 10);
                
                // Badge de fonction
                doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
                doc.rect(160, yPos + 6, 30, 6, 'F');
                doc.setTextColor(255, 255, 255);
                doc.setFontSize(8);
                doc.text(control.function, 175, yPos + 10, { align: 'center' });
                doc.setTextColor(0, 0, 0);
                
                // Détails du contrôle
                doc.setFontSize(10);
                doc.setFont('helvetica', 'normal');
                yPos += 15;
                doc.text(`Catégorie: ${control.category}`, 16, yPos);
                yPos += 6;
                doc.text(`Score actuel: ${control.currentScore}    Score cible: ${control.targetScore}`, 16, yPos);
                yPos += 6;
                
                // Exigence avec retour à la ligne automatique
                doc.setFont('helvetica', 'bold');
                doc.text('Exigence:', 16, yPos);
                doc.setFont('helvetica', 'normal');
                const splitRequirement = doc.splitTextToSize(control.requirement, 170);
                doc.text(splitRequirement, 16, yPos + 6);
                
                // Mettre à jour la position Y après l'exigence
                yPos += 6 + (splitRequirement.length * 5);
                
                // Conseils d'implémentation
                doc.setFont('helvetica', 'bold');
                doc.text('Conseils d\'implémentation:', 16, yPos);
                doc.setFont('helvetica', 'normal');
                
                // Traiter chaque ligne de conseil
                const guidanceLines = control.guidance.split('\n').filter(line => line.trim());
                yPos += 6;
                
                guidanceLines.forEach(line => {
                    // Vérifier s'il reste assez d'espace sur la page, sinon ajouter une nouvelle page
                    if (yPos > 270) {
                        doc.addPage();
                        yPos = 20;
                    }
                    
                    // Nettoyer la ligne et ajouter un bullet point
                    const cleanLine = line.replace(/^•\s*/, '');
                    const splitLine = doc.splitTextToSize(`• ${cleanLine}`, 170);
                    doc.text(splitLine, 16, yPos);
                    
                    // Mettre à jour la position Y
                    yPos += splitLine.length * 5;
                });
                
                // Espacement entre les contrôles
                yPos += 10;
            });
        }
        
        // Recommandations générales
        if (notes.roadmap.generalRecommendations.length > 0) {
            // Vérifier s'il reste assez d'espace sur la page, sinon ajouter une nouvelle page
            if (yPos > 230) {
                doc.addPage();
                yPos = 20;
            }
            
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.text('Recommandations générales', 14, yPos);
            yPos += 10;
            
            // Ajouter chaque recommandation
            notes.roadmap.generalRecommendations.forEach((recommendation, index) => {
                // Vérifier s'il reste assez d'espace sur la page, sinon ajouter une nouvelle page
                if (yPos > 270) {
                    doc.addPage();
                    yPos = 20;
                }
                
                doc.setFontSize(10);
                doc.setFont('helvetica', 'normal');
                
                // Ajouter un bullet point et la recommandation avec retour à la ligne automatique
                const splitRecommendation = doc.splitTextToSize(`• ${recommendation}`, 170);
                doc.text(splitRecommendation, 16, yPos);
                
                // Mettre à jour la position Y
                yPos += splitRecommendation.length * 5 + 2;
            });
        }
    }
    
    // Ajouter une page pour la signature
    doc.addPage();
    
    // Ajouter un pied de page avec signature
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('Ce rapport a été généré automatiquement par l\'outil d\'évaluation CyFun.', 105, 240, { align: 'center' });
    
    // Ajouter la date et l'heure
    const now = new Date();
    const dateStr = now.toLocaleDateString('fr-FR', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    const timeStr = now.toLocaleTimeString('fr-FR', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    doc.text(`Généré le ${dateStr} à ${timeStr}`, 105, 246, { align: 'center' });
    
    // Ajouter la signature
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Anderson SPRL', 105, 260, { align: 'center' });
    
    // Simuler une signature manuscrite avec une image (ici un texte stylisé)
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(24);
    doc.setTextColor(0, 0, 150);
    doc.text('Anderson', 105, 270, { align: 'center' });
    
    // Enregistrer le PDF
    doc.save(`cyfun_rapport_${notes.assessmentLevel.toLowerCase()}_${notes.organizationName.replace(/\s+/g, '_').toLowerCase()}.pdf`);
}

// Exporter les résultats
function exportResults(categoryScores, overallScore, complianceStatus, notes) {
    // Créer l'objet de données pour l'exportation
    const exportData = {
        metadata: {
            version: "1.0",
            exportDate: new Date().toISOString(),
            tool: "CyFun Self-Assessment Tool"
        },
        organization: {
            name: notes.organizationName,
            assessmentDate: notes.assessmentDate
        },
        assessment: {
            level: notes.assessmentLevel,
            overallScore: overallScore,
            complianceStatus: complianceStatus.status,
            complianceMessage: complianceStatus.description
        },
        categoryScores: {},
        controlScores: {
            documentation: documentationScores,
            implementation: implementationScores
        }
    };
    
    // Ajouter les scores par catégorie
    Object.keys(categoryScores).forEach(categoryId => {
        const category = categoryScores[categoryId];
        exportData.categoryScores[categoryId] = {
            name: category.name,
            documentation: category.documentation,
            implementation: category.implementation,
            average: category.average
        };
    });
    
    // Ajouter la feuille de route si elle existe
    if (notes.roadmap) {
        exportData.roadmap = {
            improvementAreas: notes.roadmap.improvementAreas,
            priorityControls: notes.roadmap.priorityControls,
            generalRecommendations: notes.roadmap.generalRecommendations
        };
    }
    
    // Convertir en JSON
    const jsonData = JSON.stringify(exportData, null, 2);
    
    // Créer un blob et un lien de téléchargement
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `cyfun_assessment_${notes.assessmentLevel.toLowerCase()}_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    
    // Nettoyer
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 0);
}

// Ajouter une feuille de style CSS personnalisée pour l'application
function addCustomStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .guidance-content {
            white-space: pre-line;
            margin-top: 10px;
            padding: 10px;
            background-color: #f8f9fa;
            border-radius: 5px;
        }
        
        .key-measure {
            font-weight: bold;
            color: #dc3545;
        }
        
        .maturity-level-info {
            margin-bottom: 20px;
        }
        
        .category-header {
            background-color: #f8f9fa;
            padding: 10px;
            margin-bottom: 15px;
            border-radius: 5px;
        }
    `;
    document.head.appendChild(styleElement);
}

// Ajouter les styles personnalisés
addCustomStyles();
