function loadBorrowers() {
    const borrowers = JSON.parse(localStorage.getItem("borrowers") || "[]");
    const list = document.getElementById("list");
    list.innerHTML = "";

    borrowers.forEach((b, index) => {
        const interest = (b.amount * b.rate) / 100;
        const total = Number(b.amount) + interest;

        list.innerHTML += `
        <div class="borrower">
            <b>${b.name}</b><br>
            Amount: ₹${b.amount}<br>
            Interest/Month: ₹${interest.toFixed(2)}<br>
            Total: ₹${total.toFixed(2)}
        </div>`;
    });
}

function saveBorrower() {
    const name = document.getElementById("name").value.trim();
    const amount = parseFloat(document.getElementById("amount").value);
    const rate = parseFloat(document.getElementById("rate").value);

    if (!name || isNaN(amount) || isNaN(rate)) {
        alert("Please fill all fields.");
        return;
    }

    const borrowers = JSON.parse(localStorage.getItem("borrowers") || "[]");

    borrowers.push({
        name,
        amount,
        rate
    });

    localStorage.setItem("borrowers", JSON.stringify(borrowers));

    document.getElementById("name").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("rate").value = "";

    loadBorrowers();
}

window.onload = loadBorrowers;alert("Chandan Khata loaded successfully!");