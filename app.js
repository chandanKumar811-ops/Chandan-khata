function getBorrowers(){
    return JSON.parse(localStorage.getItem("borrowers")||"[]");
}

function saveBorrowers(data){
    localStorage.setItem("borrowers",JSON.stringify(data));
}

function calculate(b){

    const p=b.date.split("-");

    const start=new Date(p[0],p[1]-1,p[2]);
    const today=new Date();

    start.setHours(0,0,0,0);
    today.setHours(0,0,0,0);

    const days=Math.round(
        (today-start)/(1000*60*60*24)
    );

    const months=Math.floor(days/30);
    const remain=days%30;

    const monthly=(b.amount*b.rate)/100;
    const daily=monthly/30;

    const interest=
        (monthly*months)+
        (daily*remain);

    return{
        months,
        remain,
        interest,
        total:Number(b.amount)+interest
    };
}

function saveBorrower(){

    const name=document.getElementById("name").value.trim();
    const amount=parseFloat(document.getElementById("amount").value);
    const rate=parseFloat(document.getElementById("rate").value);
    const date=document.getElementById("date").value;

    if(!name||!amount||!rate||!date){
        alert("Fill all fields");
        return;
    }

    const borrowers=getBorrowers();

    borrowers.unshift({
        name,
        amount,
        rate,
        date
    });

    saveBorrowers(borrowers);

    document.getElementById("name").value="";
    document.getElementById("amount").value="";
    document.getElementById("rate").value="";
    document.getElementById("date").value="";

    loadBorrowers();
}

function loadBorrowers(search = "") {

    const borrowers = getBorrowers();
    const list = document.getElementById("list");

    list.innerHTML = "";

    borrowers.forEach((b, index) => {

        if (
            b.name.toLowerCase().includes(search.toLowerCase())
        ) {

            list.innerHTML += `
            <div class="borrower"
                onclick="showDetails(${index})">
                <b>${b.name}</b>
            </div>
            `;
        }

    });

}

function searchBorrowers() {

    const text =
        document.getElementById("search").value;

    loadBorrowers(text);

}

function showDetails(index) {

    const borrowers = getBorrowers();
    const b = borrowers[index];

    const c = calculate(b);

    document.getElementById("details").style.display = "block";

    document.getElementById("details").innerHTML = `
        <h2>${b.name}</h2>

        <p><b>Amount:</b> ₹${b.amount}</p>

        <p><b>Interest:</b> ${b.rate}% / month</p>

        <p><b>Date Taken:</b> ${b.date}</p>

        <p><b>Duration:</b>
        ${c.months} Month ${c.remain} Days</p>

        <p><b>Interest:</b>
        ₹${c.interest.toFixed(2)}</p>

        <p><b>Total Due:</b>
        ₹${c.total.toFixed(2)}</p>

        <br>

        <button onclick="closeDetails()">
        ⬅ Back
        </button>
    `;
}

function closeDetails() {
    document.getElementById("details").style.display = "none";
}

function showDetails(index) {

    const borrowers = getBorrowers();
    const b = borrowers[index];
    const c = calculate(b);

    document.getElementById("list").style.display = "none";
    document.getElementById("search").style.display = "none";

    const details = document.getElementById("details");
    details.style.display = "block";

    details.innerHTML = `
        <div class="borrower">

            <h2>${b.name}</h2>

            <p><b>Amount:</b> ₹${b.amount}</p>

            <p><b>Interest Rate:</b> ${b.rate}% per month</p>

            <p><b>Date Taken:</b> ${b.date}</p>

            <p><b>Duration:</b> ${c.months} Month ${c.remain} Days</p>

            <p><b>Interest Till Today:</b> ₹${c.interest.toFixed(2)}</p>

            <p><b>Total Due:</b> ₹${c.total.toFixed(2)}</p>

            <br>

            <button onclick="closeDetails()">⬅ Back</button>

        </div>
    `;
}

function closeDetails() {

    document.getElementById("details").style.display = "none";

    document.getElementById("list").style.display = "block";

    document.getElementById("search").style.display = "block";

}

window.onload = function () {
    loadBorrowers();
};

