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