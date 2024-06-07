// Funzione per calcolare il tempo trascorso in anni e mesi
function calculatePassedTime(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    let difference = Math.abs(end - start);
    const millisecondsPerMonth = 1000 * 60 * 60 * 24 * 30.4375;
    const millisecondsPerYear = millisecondsPerMonth * 12;

    const yearsPassed = Math.floor(difference / millisecondsPerYear);
    difference -= yearsPassed * millisecondsPerYear;

    const monthsPassed = Math.floor(difference / millisecondsPerMonth);

    let yearsText = yearsPassed === 1 ? " anno" : " anni";
    let monthsText = monthsPassed === 1 ? " mese" : " mesi";

    return { years: yearsPassed, months: monthsPassed, yearsText: yearsText, monthsText: monthsText };
}

// Funzione per aggiornare il tempo trascorso
function updatePassedTime(startDate) {
    const passedTime = calculatePassedTime(startDate, new Date());
    document.getElementById("months").textContent = passedTime.months + passedTime.monthsText;
    document.getElementById("years").textContent = passedTime.years + passedTime.yearsText;
}

// Funzione per calcolare la prossima data di countdown mensile
function getNextCountdownDate(day) {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    let targetDate = new Date(currentYear, currentMonth, day);

    if (targetDate.getTime() < now.getTime()) {
        targetDate = new Date(currentYear, currentMonth + 1, day);

        if (targetDate.getMonth() !== (currentMonth + 1) % 12) {
            targetDate = new Date(currentYear + 1, 0, day);
        }
    }

    return targetDate;
}

const specificDay = 4;

function showLoveMessage() {
    const loveMessages = [
        "I FREAKING LOVE YOU DARLING!",
        "YOU MEAN EVERYTHING TO ME!",
        "YOU ARE MY SUNSHINE!",
        "YOU MAKE MY WORLD BRIGHTER!",
        "YOU ARE MY ROCK!",
        "I AM SO LUCKY TO HAVE YOU!",
        "MY LOVE FOR YOU IS ENDLESS!",
        "YOU COMPLETE ME!",
        "YOU ARE MY EVERYTHING!",
        "YOU ARE THE BEST THING IN MY LIFE!",
        "YOU LIGHT UP MY LIFE!",
        "I LOVE YOU MORE THAN WORDS CAN EXPRESS!"
    ];

    const currentMonth = new Date().getMonth();
    const selectedMessage = loveMessages[currentMonth % loveMessages.length];
    document.getElementById("countdown").innerHTML = selectedMessage;
}

function startMonthlyCountdown() {
    const countDownDate = getNextCountdownDate(specificDay).getTime();

    const x = setInterval(function() {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        if (distance < 0) {
            clearInterval(x);
            showLoveMessage();

            setTimeout(function() {
                startMonthlyCountdown();
            }, 24 * 60 * 60 * 1000); // 24 ore in millisecondi
        } else {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            let daysText = days === 1 ? " Giorno " : " Giorni ";
            let hoursText = hours === 1 ? " Ora " : " Ore ";
            let minutesText = minutes === 1 ? " Minuto " : " Minuti ";
            let secondsText = seconds === 1 ? " Secondo " : " Secondi ";

            document.getElementById("countdown").innerHTML = days + daysText + hours + hoursText + minutes + minutesText + seconds + secondsText;
        }
    }, 1000);
}

document.addEventListener("DOMContentLoaded", function() {
    const now = new Date();
    if (now.getDate() === specificDay) {
        showLoveMessage();
    } else {
        startMonthlyCountdown();
    }
    updatePassedTime("2024-04-04");
});

// Aggiorna il tempo trascorso ogni minuto
setInterval(function() {
    updatePassedTime("2024-04-04");
}, 60000); 
