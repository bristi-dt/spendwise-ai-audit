//LOAD SAVED DATA ON PAGE LOAD 

window.addEventListener("load", function () {

    const savedData = JSON.parse(localStorage.getItem("auditData"));

    if (savedData) {

        document.getElementById("spend").value = savedData.spend;
        document.getElementById("seats").value = savedData.seats;

        document.getElementById("totalSpend").innerText =
            "$" + savedData.total + "/month";

        document.getElementById("monthlySavings").innerText =
            "$" + savedData.savings;

        document.getElementById("yearlySavings").innerText =
            "$" + savedData.yearly;

        document.getElementById("toolCount").innerText =
            savedData.seats;

        document.querySelector(".dashboard-top span").innerText =
            "Save " + savedData.percent + "%";

        document.getElementById("reportTotal").innerText =
            "$" + savedData.total;

        document.getElementById("reportSavings").innerText =
            "$" + savedData.savings;

        document.getElementById("reportYearly").innerText =
            "$" + savedData.yearly;
    }

    const savedEmail = localStorage.getItem("userEmail");

    if (savedEmail) {
        document.querySelector(".email-box input").value = savedEmail;
    }


});


//NAVBAR

document.querySelectorAll("nav a").forEach(link => {

    link.addEventListener("click", function (e) {

        e.preventDefault();

        const text = this.innerText.toLowerCase();

        if (text === "features") {
            document.querySelector(".features").scrollIntoView({
                behavior: "smooth"
            });
        }

        if (text === "audit") {
            document.querySelector(".form-section").scrollIntoView({
                behavior: "smooth"
            });
        }

        if (text === "faq") {
            document.querySelector(".faq").scrollIntoView({
                behavior: "smooth"
            });
        }

    });

});


//BUTTON 

document.querySelector(".nav-btn").addEventListener("click", function () {

    document.querySelector(".form-section").scrollIntoView({
        behavior: "smooth"
    });

});

document.querySelector(".primary-btn").addEventListener("click", function () {

    document.querySelector(".form-section").scrollIntoView({
        behavior: "smooth"
    });

});


//WATCH DEMO 

document.querySelector(".secondary-btn").addEventListener("click", function () {

    alert("Demo video coming soon");

});


//FORM ANALYZE 

const form = document.querySelector(".audit-form");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const spend = Number(document.getElementById("spend").value);
    const seats = Number(document.getElementById("seats").value);

    if (!spend || !seats) {
        alert("Please fill Monthly Spend and Seats");
        return;
    }

    const total = spend * seats;
    const savings = Math.round(total * 0.35);
    const yearly = Math.round(savings * 12);
    const savingPercent = 35;


    // DASHBOARD

    document.getElementById("totalSpend").innerText =
        "$" + total + "/month";

    document.getElementById("monthlySavings").innerText =
        "$" + savings;

    document.getElementById("yearlySavings").innerText =
        "$" + yearly;

    document.getElementById("toolCount").innerText = seats;

    document.querySelector(".dashboard-top span").innerText =
        "Save " + savingPercent + "%";


    //REPORT UPDATE

    document.getElementById("reportTotal").innerText =
        "$" + total;

    document.getElementById("reportSavings").innerText =
        "$" + savings;

    document.getElementById("reportYearly").innerText =
        "$" + yearly;


    // SAVE DATA

    const auditData = {
        spend: spend,
        seats: seats,
        total: total,
        savings: savings,
        yearly: yearly,
        percent: savingPercent
    };

    localStorage.setItem("auditData", JSON.stringify(auditData));


    // AUDIT HISTORY

    let history = JSON.parse(localStorage.getItem("auditHistory")) || [];

    history.push({
        total: total,
        savings: savings,
        yearly: yearly,
        date: new Date().toLocaleDateString()
    });

    localStorage.setItem("auditHistory", JSON.stringify(history));


    // SUGGESTIONS

    const suggestions = document.getElementById("suggestionList");

    suggestions.innerHTML = "";

    if (savings > 100) {
        suggestions.innerHTML +=
            "<li>Switch to a cheaper AI plan and save money</li>";
    }

    if (seats > 5) {
        suggestions.innerHTML +=
            "<li>Reduce unused team seats</li>";
    }

    if (total > 200) {
        suggestions.innerHTML +=
            "<li>Consider using fewer AI subscriptions</li>";
    }

    if (suggestions.innerHTML === "") {
        suggestions.innerHTML =
            "<li>Your spending looks optimized</li>";
    }


    //SCROLL TO REPORT

    document.getElementById("report").scrollIntoView({
        behavior: "smooth"
    });

    this.reset();
});


//EMAIL VALIDATION

const emailBtn = document.querySelector(".email-box button");

emailBtn.addEventListener("click", function () {

    const email = document.querySelector(".email-box input").value;

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        alert("Please enter a valid email");

    } else {

        localStorage.setItem("userEmail", email);

        alert("Report sent to " + email);

    }
});


// FAQ TOGGLE

const faq = document.querySelectorAll(".faq-box");

faq.forEach(box => {

    box.addEventListener("click", function () {

        this.classList.toggle("active");

        const icon = this.querySelector("span");

        if (this.classList.contains("active")) {
            icon.innerText = "-";
        }
        else {
            icon.innerText = "+";
        }

    });

});

