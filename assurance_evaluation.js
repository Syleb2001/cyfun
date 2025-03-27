document.addEventListener('DOMContentLoaded', function() {
    // Éléments DOM
    const calculateAssuranceBtn = document.getElementById('calculateAssuranceLevel');
    const assuranceLevelResult = document.getElementById('assuranceLevelResult');
    const recommendedAssuranceLevel = document.getElementById('recommendedAssuranceLevel');
    const assuranceLevelDescription = document.getElementById('assuranceLevelDescription');
    const resetAssuranceBtn = document.getElementById('resetAssuranceBtn');

    // Types d'acteurs menaçants
    const threatActorCheckboxes = [
        document.getElementById('scriptKiddies'),
        document.getElementById('hacktivists'),
        document.getElementById('criminals'),
        document.getElementById('insiders'),
        document.getElementById('stateActors')
    ];

    // Catégories d'attaques (impact et probabilité)
    const threatCategories = [
        {
            name: 'Sabotage/Perturbation',
            impact: document.getElementById('sabotageThreatImpact'),
            probability: document.getElementById('sabotageThreatProbability')
        },
        {
            name: 'Espionnage/Vol de données',
            impact: document.getElementById('espionageThreatImpact'),
            probability: document.getElementById('espionageThreatProbability')
        },
        {
            name: 'Fraude/Crime financier',
            impact: document.getElementById('fraudThreatImpact'),
            probability: document.getElementById('fraudThreatProbability')
        },
        {
            name: 'Désinformation',
            impact: document.getElementById('disinfoThreatImpact'),
            probability: document.getElementById('disinfoThreatProbability')
        }
    ];

    // Calcul du niveau d'assurance
    calculateAssuranceBtn.addEventListener('click', function() {
        // Vérification des acteurs menaçants sélectionnés
        let selectedThreatActors = 0;
        threatActorCheckboxes.forEach(checkbox => {
            if (checkbox && checkbox.checked) {
                selectedThreatActors++;
            }
        });

        // Si aucun acteur menaçant n'est sélectionné, afficher un message
        if (selectedThreatActors === 0) {
            alert('Veuillez sélectionner au moins un type d\'acteur menaçant.');
            return;
        }

        // Calcul du score de risque total
        let totalRiskScore = 0;
        let maxPossibleScore = 0;

        threatCategories.forEach(category => {
            if (category.impact && category.probability) {
                const impactValue = parseInt(category.impact.value);
                const probabilityValue = parseInt(category.probability.value);
                const categoryScore = impactValue * probabilityValue;
                
                totalRiskScore += categoryScore;
                maxPossibleScore += 9; // Le score maximum possible par catégorie est 3*3=9
            }
        });

        // Facteur de pondération basé sur le nombre d'acteurs menaçants (plus d'acteurs = plus de risque)
        const threatActorWeight = Math.min(1 + (selectedThreatActors * 0.05), 1.25);
        totalRiskScore = totalRiskScore * threatActorWeight;
        
        // Normalisation du score (pourcentage du maximum possible)
        const normalizedScore = (totalRiskScore / maxPossibleScore) * 100;
        
        // Détermination du niveau d'assurance
        let assuranceResult;
        if (normalizedScore < 30) {
            assuranceResult = {
                level: "Basic (B)",
                description: "Le niveau d'assurance Basic est adapté aux organisations avec un profil de risque faible. Il comprend des contrôles de sécurité fondamentaux pour protéger contre les menaces courantes."
            };
        } else if (normalizedScore < 60) {
            assuranceResult = {
                level: "Substantial (S)",
                description: "Le niveau d'assurance Substantial est recommandé pour les organisations avec un profil de risque modéré. Il comprend des contrôles de sécurité plus robustes et une surveillance continue."
            };
        } else {
            assuranceResult = {
                level: "High (H)",
                description: "Le niveau d'assurance High est essentiel pour les organisations avec un profil de risque élevé. Il comprend des contrôles de sécurité avancés, des tests réguliers et une surveillance approfondie."
            };
        }

        // Affichage des résultats
        recommendedAssuranceLevel.textContent = assuranceResult.level;
        assuranceLevelDescription.textContent = assuranceResult.description;
        assuranceLevelResult.style.display = 'block';
    });

    // Réinitialisation de l'évaluation
    resetAssuranceBtn.addEventListener('click', function() {
        // Réinitialiser les acteurs menaçants
        threatActorCheckboxes.forEach(checkbox => {
            if (checkbox) {
                checkbox.checked = false;
            }
        });

        // Réinitialiser les catégories d'attaques
        threatCategories.forEach(category => {
            if (category.impact && category.probability) {
                category.impact.value = "1";
                category.probability.value = "1";
            }
        });

        // Masquer les résultats
        assuranceLevelResult.style.display = 'none';
    });
});
