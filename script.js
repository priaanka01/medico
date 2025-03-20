const medications = [
    {
        name: "Paracetamol",
        uses: "Pain relief, fever reduction",
        dosage: "500mg every 4-6 hours",
        sideEffects: "Nausea, liver damage in high doses",
        image: "images/paracetamol.jpg"
    },
    {
        name: "Amoxicillin",
        uses: "Antibiotic for bacterial infections",
        dosage: "500mg every 8 hours",
        sideEffects: "Allergic reactions, diarrhea",
        image: "images/amoxicillin.jpg"
    },
    {
        name: "Aspirin",
        uses: "Pain relief, anti-inflammatory",
        dosage: "325mg every 4-6 hours",
        sideEffects: "Stomach irritation, bleeding",
        image: "images/aspirin.jpg"
    },
    // Add more medications here
];

function searchMedication() {
    const searchQuery = document.getElementById("medication-search").value.toLowerCase();
    const result = medications.find(med => med.name.toLowerCase().includes(searchQuery));

    const medicationInfo = document.getElementById("medication-info");

    if (result) {
        medicationInfo.innerHTML = `
            <h3>${result.name}</h3>
            <img src="${result.image}" alt="${result.name}" class="medication-image" />
            <p><strong>Uses:</strong> ${result.uses}</p>
            <p><strong>Dosage:</strong> ${result.dosage}</p>
            <p><strong>Side Effects:</strong> ${result.sideEffects}</p>
        `;
    } else {
        medicationInfo.innerHTML = "<p>No medication found with that name.</p>";
    }
}
