// Fonctions principales pour l'application CyFun Self-Assessment

// Variables globales pour stocker les scores
let documentationScores = {};
let implementationScores = {};
// Variable globale pour stocker les notes par contrôle
let controlNotes = {};
let currentAuditData = {}; // Pour stocker les données d'audit actuelles

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
    
    // Ajouter les écouteurs d'événements pour les boutons de chargement et de sauvegarde
    document.getElementById('loadAuditBtn').addEventListener('click', loadAuditFromFile);
    document.getElementById('saveAuditBtn').addEventListener('click', function() {
        saveAuditToFile(true);
    });
    
    // Ajouter le modal pour les notes
    const notesModalHtml = `
        <div class="modal fade" id="notesModal" tabindex="-1" aria-labelledby="notesModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="notesModalLabel">Notes</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fermer"></button>
                    </div>
                    <div class="modal-body" id="notesModalBody">
                        <!-- Le contenu sera injecté dynamiquement -->
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Ajouter le modal pour la visualisation radar
    const radarModalHtml = `
        <div class="modal fade" id="radarModal" tabindex="-1" aria-labelledby="radarModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="radarModalLabel">Visualisation des fonctions et catégories</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fermer"></button>
                    </div>
                    <div class="modal-body" id="radarModalBody">
                        <div class="row">
                            <div class="col-md-8 d-flex justify-content-center">
                                <div style="width: 600px; height: 600px;">
                                    <canvas id="radarChart"></canvas>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div id="radarLegend" class="mt-3"></div>
                                <div id="categoryDetails" class="mt-4">
                                    <h5>Détails de la catégorie</h5>
                                    <p>Cliquez sur une catégorie dans le graphique pour voir les détails.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', notesModalHtml);
    document.body.insertAdjacentHTML('beforeend', radarModalHtml);
    
    // Charger les notes sauvegardées
    loadNotes();
    
    // Ajouter le script Chart.js
    const chartScript = document.createElement('script');
    chartScript.src = 'https://cdn.jsdelivr.net/npm/chart.js';
    document.head.appendChild(chartScript);
    
    // Attendre que Chart.js soit chargé
    chartScript.onload = function() {
        console.log('Chart.js chargé avec succès');
    };
});

// Charger l'introduction du framework
function loadIntroduction() {
    const introSection = document.getElementById('introductionSection');
    
    // Créer le HTML pour l'introduction
    const html = `
        <div class="card mb-4">
            <div class="card-body">
                <h2>Introduction au CyberFundamentals Framework</h2>
                <p>
                    This workbook is the self-assessment tool for the CyberFundamentals
                    Framework. The CyberFundamentals
                    Framework is developed by the Centre for Cybersecurity Belgium (CCB), which operates under the authority of the
                    Prime Minister of Belgium. The framework includes a set of concrete measures to protect data, significantly reduce
                    the risk of the most common cyber-attacks, and increase the cyber resilience of organisations.
                </p>
                <p>
                    Each "details" tab contains the controls of the respective cyberfundamentals framework level (BASIC-IMPORTANT-
                    ESSENTIAL). The way each control is assessed considers 2 angles: How the controle is documented (documentation
                    maturity) and how that documentation is implemented (implementation maturity). The maturity of each of the
                    controls is assessed using the explanation in the Maturity Levels tab.
                </p>
            </div>
        </div>
    `;
    
    // Insérer le HTML dans la section d'introduction
    introSection.innerHTML = html;
    
    // Définir la date d'aujourd'hui comme date d'évaluation par défaut
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('assessmentDate').value = today;
    
    // Configurer la sauvegarde automatique
    setupAutoSave();
    
    // Charger les contrôles pour le niveau par défaut
    const defaultLevel = document.getElementById('assessmentLevel').value;
    loadControls(defaultLevel);
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
    let html = `
        <div class="d-flex justify-content-between align-items-center mb-3">
            <h3>Contrôles d'évaluation - Niveau ${level}</h3>
            <button id="viewRadarBtn" class="btn btn-primary">Visualiser les fonctions</button>
        </div>
    `;
    
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
                            <button class="btn btn-sm ${controlNotes[controlId] ? 'btn-success' : 'btn-outline-secondary'} notes-btn mt-1" data-control-id="${controlId}" data-control-name="${(control.controlName || controlId).replace(/'/g, "\\'")}">
                                Notes
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
    
    // Écouteurs pour les boutons de notes
    const notesBtns = document.querySelectorAll('.notes-btn');
    notesBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const controlId = this.getAttribute('data-control-id');
            const controlName = this.getAttribute('data-control-name');
            showNotes(controlId, controlName);
            
            // Afficher le modal manuellement
            const notesModal = new bootstrap.Modal(document.getElementById('notesModal'));
            notesModal.show();
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
    
    // Écouteur pour le bouton de visualisation radar
    document.getElementById('viewRadarBtn').addEventListener('click', function() {
        showRadarVisualization();
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

// Afficher et éditer les notes pour un contrôle spécifique
function showNotes(controlId, controlName) {
    console.log(`Affichage des notes pour ${controlId}: ${controlName}`);
    
    // Mettre à jour le titre du modal
    document.getElementById('notesModalLabel').textContent = `Notes pour ${controlName}`;
    
    // Récupérer les notes existantes ou initialiser avec une chaîne vide
    const existingNotes = controlNotes[controlId] || '';
    
    // Mettre à jour le contenu du modal
    document.getElementById('notesModalBody').innerHTML = `
        <div class="mb-3">
            <textarea id="notes-${controlId}" class="form-control" rows="6" placeholder="Saisissez vos notes ici...">${existingNotes}</textarea>
        </div>
        <button id="save-notes-${controlId}" class="btn btn-primary">Enregistrer</button>
    `;
    
    // Ajouter un écouteur d'événement pour le bouton d'enregistrement
    setTimeout(() => {
        document.getElementById(`save-notes-${controlId}`).addEventListener('click', function() {
            const notes = document.getElementById(`notes-${controlId}`).value;
            saveNotes(controlId, notes);
            
            // Fermer le modal
            const notesModalElement = document.getElementById('notesModal');
            const notesModal = bootstrap.Modal.getInstance(notesModalElement);
            notesModal.hide();
            
            // Afficher un message de confirmation
            alert('Notes enregistrées avec succès!');
        });
    }, 100);
}

// Sauvegarder les notes pour un contrôle
function saveNotes(controlId, notes) {
    console.log(`Sauvegarde des notes pour ${controlId}`);
    controlNotes[controlId] = notes;
    
    // Sauvegarder dans le stockage local pour persistance
    try {
        localStorage.setItem('cyfun_notes', JSON.stringify(controlNotes));
    } catch (e) {
        console.error('Erreur lors de la sauvegarde des notes dans le stockage local:', e);
    }
    
    // Mettre à jour la couleur du bouton Notes
    updateNotesButtonColor(controlId);
}

// Charger les notes depuis le stockage local
function loadNotes() {
    try {
        const savedNotes = localStorage.getItem('cyfun_notes');
        if (savedNotes) {
            controlNotes = JSON.parse(savedNotes);
            console.log('Notes chargées depuis le stockage local');
            
            // Mettre à jour les couleurs des boutons après le chargement des contrôles
            setTimeout(updateAllNotesButtonColors, 500);
        }
    } catch (e) {
        console.error('Erreur lors du chargement des notes depuis le stockage local:', e);
    }
}

// Mettre à jour la couleur du bouton Notes
function updateNotesButtonColor(controlId) {
    const notesBtn = document.querySelector(`.notes-btn[data-control-id="${controlId}"]`);
    if (notesBtn) {
        const hasNotes = controlNotes[controlId] && controlNotes[controlId].trim() !== '';
        
        // Supprimer les classes existantes
        notesBtn.classList.remove('btn-outline-secondary', 'btn-success');
        
        // Ajouter la classe appropriée
        if (hasNotes) {
            notesBtn.classList.add('btn-success');
        } else {
            notesBtn.classList.add('btn-outline-secondary');
        }
    }
}

// Mettre à jour la couleur de tous les boutons Notes
function updateAllNotesButtonColors() {
    Object.keys(controlNotes).forEach(controlId => {
        updateNotesButtonColor(controlId);
    });
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
    
    // Sauvegarder automatiquement après la mise à jour d'un score
    const orgName = document.getElementById('organizationName').value;
    if (orgName && orgName.trim() !== '') {
        // Utiliser un délai pour éviter des sauvegardes trop fréquentes
        clearTimeout(window.autoSaveTimeout);
        window.autoSaveTimeout = setTimeout(() => saveAuditToFile(false), 2000);
    }
}

// Fonction pour sauvegarder l'audit
function saveAuditToFile(forceDownload = false) {
    const organizationName = document.getElementById('organizationName').value;
    
    if (!organizationName || organizationName.trim() === '') {
        console.warn("Nom d'organisation non spécifié, impossible de sauvegarder l'audit");
        return;
    }
    
    // Récupérer le niveau d'évaluation actuel
    const level = document.getElementById('assessmentLevel').value;
    
    // Créer l'objet de données d'audit
    const auditData = {
        metadata: {
            lastSaved: new Date().toISOString(),
            version: "1.0"
        },
        organization: {
            name: organizationName,
            assessmentDate: document.getElementById('assessmentDate').value || new Date().toISOString().split('T')[0]
        },
        assessment: {
            level: level
        },
        documentationScores: documentationScores,
        implementationScores: implementationScores,
        notes: controlNotes
    };
    
    // Mettre à jour les données d'audit actuelles
    currentAuditData = auditData;
    
    // Convertir en JSON
    const jsonData = JSON.stringify(auditData, null, 2);
    
    // Créer un nom de fichier sécurisé basé sur le nom de l'organisation
    const safeOrgName = organizationName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const fileName = `${safeOrgName}_audit.json`;
    
    // Sauvegarder dans le localStorage
    try {
        localStorage.setItem('cyfun_current_audit', jsonData);
        console.log(`Audit sauvegardé en mémoire pour ${organizationName}`);
    } catch (e) {
        console.error('Erreur lors de la sauvegarde de l\'audit dans le stockage local:', e);
    }
    
    // Si forceDownload est true, télécharger le fichier
    if (forceDownload) {
        // Créer un Blob avec les données JSON
        const blob = new Blob([jsonData], { type: 'application/json' });
        
        // Utiliser l'API de téléchargement pour sauvegarder le fichier
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        
        // Nettoyer
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(a.href);
        }, 0);
        
        console.log(`Audit téléchargé dans ${fileName}`);
        
        // Afficher un message de confirmation
        const saveNotification = document.createElement('div');
        saveNotification.className = 'alert alert-success alert-dismissible fade show';
        saveNotification.setAttribute('role', 'alert');
        saveNotification.innerHTML = `
            <strong>Sauvegarde réussie!</strong> L'audit pour ${organizationName} a été sauvegardé.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        
        // Ajouter la notification en haut de la page
        const container = document.querySelector('.container');
        container.insertBefore(saveNotification, container.firstChild);
        
        // Supprimer automatiquement après 5 secondes
        setTimeout(() => {
            if (saveNotification.parentNode) {
                saveNotification.parentNode.removeChild(saveNotification);
            }
        }, 5000);
    }
}

// Charger un audit depuis un fichier JSON
function loadAuditFromFile() {
    // Créer un élément input de type fichier
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json';
    
    // Ajouter un gestionnaire d'événements pour le changement de fichier
    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const auditData = JSON.parse(e.target.result);
                
                // Vérifier si les données sont valides
                if (!auditData.organization || !auditData.assessment) {
                    throw new Error("Format de fichier d'audit invalide");
                }
                
                // Mettre à jour les données d'audit actuelles
                currentAuditData = auditData;
                
                // Mettre à jour les champs du formulaire
                document.getElementById('organizationName').value = auditData.organization.name || '';
                document.getElementById('assessmentDate').value = auditData.organization.assessmentDate || new Date().toISOString().split('T')[0];
                
                // Mettre à jour le niveau d'évaluation et charger les contrôles correspondants
                const level = auditData.assessment.level || 'BASIC';
                document.getElementById('assessmentLevel').value = level;
                loadControls(level);
                
                // Mettre à jour les scores
                documentationScores = auditData.documentationScores || {};
                implementationScores = auditData.implementationScores || {};
                controlNotes = auditData.notes || {};
                
                // Mettre à jour l'interface utilisateur avec les scores chargés
                updateUIWithLoadedScores();
                
                console.log("Audit chargé avec succès");
                
                // Afficher un message de confirmation
                const loadNotification = document.createElement('div');
                loadNotification.className = 'alert alert-success alert-dismissible fade show';
                loadNotification.setAttribute('role', 'alert');
                loadNotification.innerHTML = `
                    <strong>Chargement réussi!</strong> L'audit pour ${auditData.organization.name} a été chargé.
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                `;
                
                // Ajouter la notification en haut de la page
                const container = document.querySelector('.container');
                container.insertBefore(loadNotification, container.firstChild);
                
                // Supprimer automatiquement après 5 secondes
                setTimeout(() => {
                    if (loadNotification.parentNode) {
                        loadNotification.parentNode.removeChild(loadNotification);
                    }
                }, 5000);
            } catch (error) {
                console.error("Erreur lors du chargement de l'audit:", error);
                alert("Erreur lors du chargement de l'audit. Le fichier pourrait être corrompu ou dans un format incorrect.");
            }
        };
        reader.readAsText(file);
    });
    
    // Déclencher le clic sur l'élément input
    fileInput.click();
}

// Mettre à jour l'interface utilisateur avec les scores chargés
function updateUIWithLoadedScores() {
    // Mettre à jour les sélecteurs de maturité pour la documentation
    Object.keys(documentationScores).forEach(controlId => {
        const selectElement = document.getElementById(`doc-${controlId}`);
        if (selectElement) {
            selectElement.value = documentationScores[controlId];
        }
    });
    
    // Mettre à jour les sélecteurs de maturité pour l'implémentation
    Object.keys(implementationScores).forEach(controlId => {
        const selectElement = document.getElementById(`impl-${controlId}`);
        if (selectElement) {
            selectElement.value = implementationScores[controlId];
        }
    });
}

// Ajouter une sauvegarde automatique lors des modifications importantes
function setupAutoSave() {
    // Sauvegarde lors du changement de nom d'organisation
    document.getElementById('organizationName').addEventListener('change', function() {
        if (this.value && this.value.trim() !== '') {
            saveAuditToFile(false);
        }
    });
    
    // Sauvegarde lors du changement de niveau d'évaluation
    document.getElementById('assessmentLevel').addEventListener('change', function() {
        // La sauvegarde sera déclenchée après le chargement des contrôles
        const orgName = document.getElementById('organizationName').value;
        if (orgName && orgName.trim() !== '') {
            // Attendre que les contrôles soient chargés avant de sauvegarder
            setTimeout(() => saveAuditToFile(false), 500);
        }
    });
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
    
    console.log("Catégories disponibles:", categories);
    console.log("Scores de documentation complets:", documentationScores);
    console.log("Scores d'implémentation complets:", implementationScores);
    
    // Vérifier si nous avons bien des scores
    const hasScores = Object.keys(documentationScores).length > 0 && Object.keys(implementationScores).length > 0;
    if (!hasScores) {
        console.error("Aucun score n'a été trouvé. Assurez-vous d'avoir évalué les contrôles.");
        alert("Aucun score n'a été trouvé. Assurez-vous d'avoir évalué les contrôles.");
        return;
    }
    
    // Traiter chaque catégorie
    categories.forEach(category => {
        const categoryId = category.id;
        console.log(`Traitement de la catégorie ${categoryId} (${category.name})`);
        
        // Obtenir les contrôles pour cette catégorie
        const categoryControls = cyfunData.formulas.getControlsByCategoryId(categoryId);
        console.log(`Catégorie ${categoryId} (${category.name}):`, categoryControls);
        
        // Calculer les scores uniquement si des contrôles ont été trouvés
        if (categoryControls && categoryControls.length > 0) {
            console.log(`${categoryControls.length} contrôles trouvés pour ${categoryId}`);
            
            // Calculer directement les scores sans passer par la fonction existante
            let docTotal = 0;
            let implTotal = 0;
            let count = 0;
            
            categoryControls.forEach(control => {
                const controlId = control.controlId;
                if (documentationScores[controlId] && implementationScores[controlId]) {
                    docTotal += documentationScores[controlId];
                    implTotal += implementationScores[controlId];
                    count++;
                    console.log(`Ajout du contrôle ${controlId} aux scores: Doc=${documentationScores[controlId]}, Impl=${implementationScores[controlId]}`);
                }
            });
            
            if (count > 0) {
                const docScore = docTotal / count;
                const implScore = implTotal / count;
                const avgScore = (docScore + implScore) / 2;
                
                console.log(`Scores calculés pour ${categoryId}: Doc=${docScore.toFixed(2)}, Impl=${implScore.toFixed(2)}, Avg=${avgScore.toFixed(2)}`);
                
                categoryScores[categoryId] = {
                    documentation: docScore,
                    implementation: implScore,
                    average: avgScore,
                    name: category.name,
                    description: category.description
                };
            } else {
                console.warn(`Aucun score n'a pu être calculé pour la catégorie ${categoryId}`);
            }
        } else {
            console.warn(`Aucun contrôle trouvé pour la catégorie ${categoryId}`);
        }
    });
    
    console.log("Scores par catégorie:", categoryScores);
    
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
    
    console.log("Fonction displayResults appelée avec:", { categoryScores, overallScore, complianceStatus, notes });
    
    // Créer le HTML pour les résultats
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
    console.log("Nombre de catégories à afficher:", Object.keys(categoryScores).length);
    
    // Débogage - afficher toutes les catégories disponibles
    console.log("categoryScores complet:", categoryScores);
    
    if (Object.keys(categoryScores).length === 0) {
        html += `
            <tr>
                <td colspan="5" class="text-center">Aucune donnée disponible</td>
            </tr>
        `;
    } else {
        Object.keys(categoryScores).forEach(categoryId => {
            const category = categoryScores[categoryId];
            console.log(`Affichage de la catégorie ${categoryId}:`, category);
            
            const threshold = cyfunData.complianceThresholds[notes.assessmentLevel].category;
            const isCompliant = category.average >= threshold;
            
            html += `
                <tr>
                    <td>${category.name} (${categoryId})</td>
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
    }
    
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
            yPos += 10;
            
            // Ajouter chaque contrôle clé
            notes.roadmap.priorityControls.forEach((control, index) => {
                // Vérifier s'il reste assez d'espace sur la page, sinon ajouter une nouvelle page
                if (yPos > 270) {
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
    const exportData = {
        metadata: {
            exportDate: new Date().toISOString(),
            version: "1.0"
        },
        organization: {
            name: notes.organizationName,
            assessmentDate: notes.assessmentDate
        },
        assessment: {
            level: notes.assessmentLevel,
            overallScore: overallScore,
            complianceStatus: complianceStatus
        },
        categoryScores: categoryScores,
        documentationScores: documentationScores,
        implementationScores: implementationScores,
        notes: controlNotes, // Inclure les notes dans l'exportation
        roadmap: notes.roadmap
    };
    
    // Convertir en JSON
    const jsonData = JSON.stringify(exportData, null, 2);
    
    // Créer un Blob et un lien de téléchargement
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `cyfun_assessment_${notes.organizationName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    
    // Nettoyer
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 0);
}

// Afficher la visualisation radar des fonctions et catégories
function showRadarVisualization() {
    console.log('Affichage de la visualisation radar');
    
    // Récupérer les données pour le graphique
    const level = document.getElementById('assessmentLevel').value;
    const controls = cyfunData.controls[level];
    
    // Regrouper les contrôles par fonction et catégorie
    const functionGroups = {
        "ID": { name: "IDENTIFY", categories: {}, color: 'rgba(54, 162, 235, 0.7)' },
        "PR": { name: "PROTECT", categories: {}, color: 'rgba(75, 192, 192, 0.7)' },
        "DE": { name: "DETECT", categories: {}, color: 'rgba(255, 206, 86, 0.7)' },
        "RS": { name: "RESPOND", categories: {}, color: 'rgba(255, 99, 132, 0.7)' },
        "RC": { name: "RECOVER", categories: {}, color: 'rgba(153, 102, 255, 0.7)' }
    };
    
    // Compter les contrôles par catégorie et fonction
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
        
        const category = control.category || 'Non catégorisé';
        
        if (!functionGroups[functionId].categories[category]) {
            functionGroups[functionId].categories[category] = {
                count: 0,
                controls: []
            };
        }
        
        functionGroups[functionId].categories[category].count++;
        functionGroups[functionId].categories[category].controls.push(control);
    });
    
    // Préparer les données pour le graphique radar
    const datasets = [];
    const allCategories = new Set();
    
    // Collecter toutes les catégories uniques
    Object.keys(functionGroups).forEach(functionId => {
        Object.keys(functionGroups[functionId].categories).forEach(category => {
            allCategories.add(category);
        });
    });
    
    // Convertir en tableau et trier
    const labels = Array.from(allCategories).sort();
    
    // Limiter le nombre de catégories si nécessaire pour éviter la surcharge
    const maxCategories = 12;
    let displayLabels = labels;
    if (labels.length > maxCategories) {
        // Trier par nombre total de contrôles et prendre les plus importantes
        const categoryCounts = {};
        labels.forEach(category => {
            let total = 0;
            Object.keys(functionGroups).forEach(functionId => {
                if (functionGroups[functionId].categories[category]) {
                    total += functionGroups[functionId].categories[category].count;
                }
            });
            categoryCounts[category] = total;
        });
        
        displayLabels = labels
            .sort((a, b) => categoryCounts[b] - categoryCounts[a])
            .slice(0, maxCategories);
    }
    
    // Créer un dataset pour chaque fonction
    Object.keys(functionGroups).forEach(functionId => {
        const group = functionGroups[functionId];
        const data = displayLabels.map(category => {
            return group.categories[category] ? group.categories[category].count : 0;
        });
        
        datasets.push({
            label: group.name,
            data: data,
            backgroundColor: group.color,
            borderColor: group.color.replace('0.7', '1'),
            borderWidth: 2,
            pointBackgroundColor: group.color.replace('0.7', '1'),
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: group.color.replace('0.7', '1'),
            pointRadius: 4
        });
    });
    
    // Afficher le modal
    const radarModal = new bootstrap.Modal(document.getElementById('radarModal'));
    radarModal.show();
    
    // Créer le graphique radar
    setTimeout(() => {
        // Détruire le graphique existant s'il y en a un
        if (window.radarChartInstance) {
            window.radarChartInstance.destroy();
        }
        
        const ctx = document.getElementById('radarChart').getContext('2d');
        
        window.radarChartInstance = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: displayLabels,
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.raw} contrôle(s)`;
                            }
                        }
                    }
                }
            }
        });
        
        // Créer la légende interactive
        createInteractiveLegend(functionGroups, displayLabels);
    }, 300);
}

// Afficher les détails d'une catégorie
function showCategoryDetails(functionId, category, functionGroups) {
    const categoryDetailsElement = document.getElementById('categoryDetails');
    const functionName = functionGroups[functionId].name;
    const categoryData = functionGroups[functionId].categories[category];
    
    if (!categoryData) {
        categoryDetailsElement.innerHTML = `
            <h5>Détails de la catégorie</h5>
            <p>Aucun contrôle trouvé pour ${category} dans ${functionName}.</p>
        `;
        return;
    }
    
    let html = `
        <h5>${category} (${functionName})</h5>
        <p><strong>Nombre de contrôles:</strong> ${categoryData.count}</p>
        <div class="list-group">
    `;
    
    categoryData.controls.forEach(control => {
        html += `
            <div class="list-group-item">
                <h6>${control.controlName || control.controlId}</h6>
                <p class="mb-1"><small>${control.requirement || 'Aucune exigence spécifiée'}</small></p>
            </div>
        `;
    });
    
    html += '</div>';
    categoryDetailsElement.innerHTML = html;
}

// Créer une légende interactive pour le graphique radar
function createInteractiveLegend(functionGroups, categories) {
    const legendElement = document.getElementById('radarLegend');
    let html = '<h5>Fonctions</h5><div class="list-group">';
    
    Object.keys(functionGroups).forEach(functionId => {
        const group = functionGroups[functionId];
        const totalControls = Object.values(group.categories).reduce((sum, cat) => sum + cat.count, 0);
        
        html += `
            <div class="list-group-item d-flex justify-content-between align-items-center" 
                 style="cursor: pointer; border-left: 5px solid ${group.color};"
                 onclick="highlightFunction('${functionId}')">
                ${group.name}
                <span class="badge bg-primary rounded-pill">${totalControls}</span>
            </div>
        `;
    });
    
    html += '</div>';
    
    html += '<h5 class="mt-3">Catégories</h5><div class="list-group">';
    
    categories.forEach(category => {
        let totalInCategory = 0;
        Object.keys(functionGroups).forEach(functionId => {
            if (functionGroups[functionId].categories[category]) {
                totalInCategory += functionGroups[functionId].categories[category].count;
            }
        });
        
        html += `
            <div class="list-group-item d-flex justify-content-between align-items-center" 
                 style="cursor: pointer;"
                 onclick="highlightCategory('${category}')">
                ${category}
                <span class="badge bg-secondary rounded-pill">${totalInCategory}</span>
            </div>
        `;
    });
    
    html += '</div>';
    
    legendElement.innerHTML = html;
    
    // Ajouter les fonctions de mise en évidence au contexte global
    window.highlightFunction = function(functionId) {
        const chart = window.radarChartInstance;
        if (!chart) return;
        
        const datasetIndex = Object.keys(functionGroups).indexOf(functionId);
        
        // Réinitialiser l'opacité pour tous les datasets
        chart.data.datasets.forEach((dataset, index) => {
            dataset.backgroundColor = dataset.backgroundColor.replace(', 0.7)', ', 0.2)');
            dataset.borderColor = dataset.borderColor.replace(', 1)', ', 0.2)');
        });
        
        // Mettre en évidence le dataset sélectionné
        chart.data.datasets[datasetIndex].backgroundColor = chart.data.datasets[datasetIndex].backgroundColor.replace(', 0.2)', ', 0.7)');
        chart.data.datasets[datasetIndex].borderColor = chart.data.datasets[datasetIndex].borderColor.replace(', 0.2)', ', 1)');
        
        chart.update();
        
        // Afficher les détails de la fonction
        const categoryDetailsElement = document.getElementById('categoryDetails');
        const functionName = functionGroups[functionId].name;
        const totalControls = Object.values(functionGroups[functionId].categories).reduce((sum, cat) => sum + cat.count, 0);
        
        let html = `
            <h5>${functionName}</h5>
            <p><strong>Nombre total de contrôles:</strong> ${totalControls}</p>
            <h6>Catégories:</h6>
            <ul>
        `;
        
        Object.keys(functionGroups[functionId].categories).forEach(category => {
            const count = functionGroups[functionId].categories[category].count;
            html += `<li>${category}: ${count} contrôle(s)</li>`;
        });
        
        html += '</ul>';
        categoryDetailsElement.innerHTML = html;
    };
    
    window.highlightCategory = function(categoryName) {
        const chart = window.radarChartInstance;
        if (!chart) return;
        
        const categoryIndex = chart.data.labels.indexOf(categoryName);
        
        // Afficher les détails de la catégorie
        const categoryDetailsElement = document.getElementById('categoryDetails');
        
        let html = `
            <h5>${categoryName}</h5>
            <div class="list-group">
        `;
        
        Object.keys(functionGroups).forEach(functionId => {
            const group = functionGroups[functionId];
            if (group.categories[categoryName]) {
                const categoryData = group.categories[categoryName];
                
                html += `
                    <div class="list-group-item" style="border-left: 5px solid ${group.color};">
                        <h6>${group.name} (${categoryData.count} contrôle(s))</h6>
                        <div class="ms-3">
                `;
                
                categoryData.controls.forEach(control => {
                    html += `
                        <div class="mb-2">
                            <strong>${control.controlName || control.controlId}</strong>
                            <p class="mb-1 small">${control.requirement || 'Aucune exigence spécifiée'}</p>
                        </div>
                    `;
                });
                
                html += '</div></div>';
            }
        });
        
        html += '</div>';
        categoryDetailsElement.innerHTML = html;
    };
}
