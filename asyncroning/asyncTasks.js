// Fonction utilitaire pour simuler un délai
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Tâche 01 : Itérer avec Async/Await
async function iterateWithAsyncAwait(values) {
    console.log("Tâche 01 : Début d'itération avec délai");
    for (const value of values) {
        console.log(value); // Enregistre la valeur
        await delay(1000); // Attend 1 seconde
    }
    console.log("Tâche 01 : Fin d'itération");
}

// Tâche 02 : Attendre un appel API avec gestion des erreurs
const fakeApiCall = (shouldFail = false) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFail) {
                reject(new Error("Erreur : Impossible de récupérer les données."));
            } else {
                resolve({ data: "Données API simulées" });
            }
        }, 2000); // Délai de 2 secondes
    });
};

async function awaitCall(shouldFail = false) {
    console.log("Tâche 02 : Appel d'API");
    try {
        const response = await fakeApiCall(shouldFail);
        console.log("Données reçues :", response.data);
    } catch (error) {
        console.error("Une erreur est survenue :", error.message);
    }
    console.log("Tâche 02 : Fin de l'appel");
}

// Tâche 04 : Attente de requêtes simultanées
const fetchData = (id) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Données pour l'ID: ${id}`);
        }, Math.random() * 2000); // Délai aléatoire jusqu'à 2 secondes
    });
};

async function concurrentRequests() {
    console.log("Tâche 04 : Début des requêtes simultanées");
    try {
        const [result1, result2] = await Promise.all([
            fetchData(1), // Premier appel
            fetchData(2), // Deuxième appel
        ]);
        console.log("Résultats combinés :", result1, result2);
    } catch (error) {
        console.error("Erreur lors des requêtes :", error.message);
    }
    console.log("Tâche 04 : Fin des requêtes simultanées");
}

// Test des fonctions
(async function main() {
    console.log("\n==== Exécution des tâches ====\n");

    // Exécution de la tâche 01
    await iterateWithAsyncAwait([1, 2, 3, 4, 5]);

    console.log("\n-----------------------------\n");

    // Exécution de la tâche 02
    await awaitCall(false); // Appel réussi
    await awaitCall(true);  // Appel échoué

    console.log("\n-----------------------------\n");

    // Exécution de la tâche 04
    await concurrentRequests();

    console.log("\n==== Toutes les tâches terminées ====");
})();
