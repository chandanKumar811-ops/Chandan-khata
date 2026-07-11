function loadBorrowers() {
    const borrowers = JSON.parse(localStorage.getItem("borrowers") || "[]");
    const list = document.getElementById("list");
    list.innerHTML = "";

const paid = JSON.parse(localStorage.getItem("paid") || "[]");
const paidList = document.getElementById("paidList");

paidList.innerHTML = "";

paid.forEach((p) => {
    paidList.innerHTML += `
    <div class="borrower">
        <b>${p.name} ✅</b>
    </div>`;
});

    borrowers.forEach((b, index) => {
        const parts = b.date.split("-");
const startDate = new Date(parts[0], parts[1] - 1, parts[2]);
const today = new Date();

        startDate.setHours(0,0,0,0);
today.setHours(0,0,0,0);

let totalDays = Math.round((today - startDate) / (1000 * 60 * 60 * 24));

const months = Math.floor(totalDays / 30);
const remainingDays = totalDays % 30;

const monthlyInterest = (b.amount * b.rate) / 100;
const dailyInterest = monthlyInterest / 30;

const interest = (monthlyInterest * months) + (dailyInterest * remainingDays);

const total = Number(b.amount) + interest;

        list.innerHTML += `
<div class="borrower" onclick="showDetails(${index})">
    <b>${b.name}</b>
</div>`;
    });
}

function saveBorrower() {
    const name = document.getElementById("name").value.trim();
    const amount = parseFloat(document.getElementById("amount").value);
    const rate = parseFloat(document.getElementById("rate").value);
    const date = document.getElementById("date").value;

    if (!name || isNaN(amount) || isNaN(rate) || !date) {
        alert("Please fill all fields.");
        return;
    }

    const borrowers = JSON.parse(localStorage.getItem("borrowers") || "[]");

    borrowers.push({
        name,
        amount,
        rate,
        date
    });

    localStorage.setItem("borrowers", JSON.stringify(borrowers));

    document.getElementById("name").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("rate").value = "";
    document.getElementById("date").value = "";

    loadBorrowers();
}

function deleteBorrower(index) {
    const borrowers = JSON.parse(localStorage.getItem("borrowers") || "[]");

    borrowers.splice(index, 1);

    localStorage.setItem("borrowers", JSON.stringify(borrowers));

    loadBorrowers();
}

function showDetails(index) {
    const borrowers = JSON.parse(localStorage.getItem("borrowers") || "[]");
    const b = borrowers[index];

    const parts = b.date.split("-");
    const startDate = new Date(parts[0], parts[1] - 1, parts[2]);
    const today = new Date();

    startDate.setHours(0,0,0,0);
    today.setHours(0,0,0,0);

    const totalDays = Math.round(
        (today - startDate) / (1000 * 60 * 60 * 24)
    );

    const months = Math.floor(totalDays / 30);
    const remainingDays = totalDays % 30;

    const monthlyInterest = (b.amount * b.rate) / 100;
    const dailyInterest = monthlyInterest / 30;

    const interest =
        (monthlyInterest * months) +
        (dailyInterest * remainingDays);

    const total = Number(b.amount) + interest;

    const list = document.getElementById("list");

    list.innerHTML = `
    <div class="borrower">
        <h3>${b.name}</h3>
        Date Taken: ${b.date}<br>
        Amount: ₹${b.amount}<br>
        Interest Rate: ${b.rate}% per month<br>
        Duration: ${months} Month ${remainingDays} Days<br>
        Interest Till Today: ₹${interest.toFixed(2)}<br>
        Total Due: ₹${total.toFixed(2)}
        <br><br>
        <button onclick="loadBorrowers()">Back</button>
<button onclick="markPaid(${index})">✅ Paid</button>
<button onclick="deleteBorrower(${index})">🗑️</button>
    </div>`;
}

function markPaid(index) {
    const borrowers = JSON.parse(localStorage.getItem("borrowers") || "[]");
    const paid = JSON.parse(localStorage.getItem("paid") || "[]");

    const person = borrowers[index];

    paid.push({
        ...person,
        paidDate: new Date().toISOString().split("T")[0]
    });

    borrowers.splice(index, 1);

    localStorage.setItem("borrowers", JSON.stringify(borrowers));
    localStorage.setItem("paid", JSON.stringify(paid));

    loadBorrowers();
}

window.onload = loadBorrowers;