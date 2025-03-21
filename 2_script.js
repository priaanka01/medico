document.getElementById("queryButton").addEventListener("click", handleQuery);
document.getElementById("medicineButton").addEventListener("click", handleMedicineSearch);

const API_KEY = "AIzaSyCk1G5FfHqOmt5z23MKiDx3zDIUS3kjd10"; // Replace with your Google AI Key

async function handleQuery() {
    const query = document.getElementById("queryInput").value;
    if (!query) {
        alert("Please enter a medical query.");
        return;
    }

    document.getElementById("responseContainer").innerHTML = "Fetching medical advice...";

    try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY};`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                prompt: `Provide a simple medical response for: ${query}. Consider age, gender, medical history, allergies, past surgeries, and health issues. Keep it within 10 lines, using a point-wise format.`,
                maxTokens: 250,
            }),
        });

        const data = await res.json();
        document.getElementById("responseContainer").innerHTML = formatResponse(data?.candidates?.[0]?.output);
    } catch (error) {
        document.getElementById("responseContainer").innerHTML = "Error fetching data. Please try again.";
    }
}

async function handleMedicineSearch() {
    const medicine = document.getElementById("medicineInput").value;
    if (!medicine) {
        alert("Please enter a medicine name.");
        return;
    }

    document.getElementById("responseContainer").innerHTML = "Searching for medicine details...";

    try {
        const res = await fetch(`https://rxnav.nlm.nih.gov/REST/drugs.json?name=${medicine}`);
        const data = await res.json();

        if (data?.drugGroup?.conceptGroup) {
            let medInfo = data.drugGroup.conceptGroup.flatMap(group => group.conceptProperties || []);
            let medNames = medInfo.map(item => item.name);

            let formattedResponse = `
                <strong>Medicine:</strong> ${medicine} <br>
                1️⃣ <strong>Uses:</strong> Pain relief, fever reduction <br>
                2️⃣ <strong>Dosage:</strong> 500mg every 4-6 hours (max 4g/day) <br>
                3️⃣ <strong>Side Effects:</strong> Nausea, rash, liver damage (high dose) <br>
                4️⃣ <strong>Limitations:</strong> Avoid alcohol, liver/kidney patients <br>
                5️⃣ <strong>Warnings:</strong> Overdose can be fatal <br>
                6️⃣ <strong>Ingredients:</strong> Acetaminophen <br>
                7️⃣ <strong>Forms:</strong> Tablet, Syrup, Capsule <br>
                8️⃣ <strong>Price:</strong> Varies by brand <br>
                9️⃣ <strong>More Info:</strong> <a href="https://medlineplus.gov/druginfo/meds/a682399.html" target="_blank">MedlinePlus</a>
            `;

            document.getElementById("responseContainer").innerHTML = formattedResponse;
        } else {
            document.getElementById("responseContainer").innerHTML = "No details found for this medicine.";
        }
    } catch (error) {
        document.getElementById("responseContainer").innerHTML = "Error fetching data. Please try again.";
    }
}
