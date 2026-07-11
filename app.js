function loadBorrowers() {
    const borrowers = JSON.parse(localStorage.getItem("borrowers") || "[]");
    const list = document.getElementById("list");
    list.innerHTML = "";

    borrowers.forEach((b, index) => {
        const startDate = new Date(b.date);
        const today = new Date();

        let totalDays = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
if (totalDays > 0) totalDays--;

const months = Math.floor(totalDays / 30);
const remainingDays = totalDays % 30;

const monthlyInterest = (b.amount * b.rate) / 100;
const dailyInterest = monthlyInterest / 30;

const interest = (monthlyInterest * months) + (dailyInterest * remainingDays);

const total = Number(b.amount) + interest;

        list.innerHTML += `
        <div class="borrower">
    <b>${b.name}</b><br>
    Date Taken: ${b.date}<br>
    Amount: ₹${b.amount}<br>
    Duration: ${months} Month ${remainingDays} Days<br>
    Interest Till Today: ₹${interest.toFixed(2)}<br>
    Total Due: ₹${total.toFixed(2)}
    <br>
    <button onclick="deleteBorrower(${index})">Delete</button>
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

window.onload = loadBorrowers;