// Funzione per calcolare il tempo trascorso in anni e mesi
function calculatePassedTime(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Calcola la differenza in millisecondi tra le due date
    let difference = Math.abs(end - start);

    // Calcola il numero di millisecondi in un mese (approssimativo) e in un anno (approssimativo)
    const millisecondsPerMonth = 1000 * 60 * 60 * 24 * 30.4375; // Media approssimativa dei giorni in un mese
    const millisecondsPerYear = millisecondsPerMonth * 12; // Approssimazione del numero di mesi in un anno

    // Calcola il numero di anni passati
    const yearsPassed = Math.floor(difference / millisecondsPerYear);
    difference -= yearsPassed * millisecondsPerYear;

    // Calcola il numero di mesi passati
    const monthsPassed = Math.floor(difference / millisecondsPerMonth);

    // Gestione della concordanza singolare/plurale per anni e mesi passati
    let yearsText = yearsPassed === 1 ? " anno" : " anni";
    let monthsText = monthsPassed === 1 ? " mese" : " mesi";

    return { years: yearsPassed, months: monthsPassed, yearsText: yearsText, monthsText: monthsText };
}

// Funzione per aggiornare il tempo trascorso ogni minuto
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

    // Determine the target date for this month
    let targetDate = new Date(currentYear, currentMonth, day);

    // If the target date is in the past, move to the next month
    if (targetDate.getTime() < now.getTime()) {
        targetDate = new Date(currentYear, currentMonth + 1, day);

        // If incrementing the month changes the year (i.e., from December to January)
        if (targetDate.getMonth() !== (currentMonth + 1) % 12) {
            targetDate = new Date(currentYear + 1, 0, day);
        }
    }

    return targetDate;
}

// Set the specific day of the month you want to count down to (e.g., the 15th)
const specificDay = 4;

// Funzione per avviare il countdown mensile
function startMonthlyCountdown() {
    const countDownDate = getNextCountdownDate(specificDay).getTime();

    // Update the count down every 1 second
    const x = setInterval(function() {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Gestione della concordanza singolare/plurale
        let daysText = days === 1 ? " Giorno " : " Giorni ";
        let hoursText = hours === 1 ? " Ora " : " Ore ";
        let minutesText = minutes === 1 ? " Minuto " : " Minuti ";
        let secondsText = seconds === 1 ? " Secondo " : " Secondi ";

        document.getElementById("countdown").innerHTML = days + daysText + hours + hoursText + minutes + minutesText + seconds + secondsText;

        if (distance < 0) {
            clearInterval(x);
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

            // Ripristina il countdown mensile dopo 24 ore
            setTimeout(function() {
                startMonthlyCountdown(); // Restart the countdown for the next month
            }, 24 * 60 * 60 * 1000); // 24 ore in millisecondi
        }
    }, 1000);
}

// Start the monthly countdown
startMonthlyCountdown();

// Start updating the passed time
updatePassedTime("2024-04-04");

// Update the passed time every minute
setInterval(function() {
    updatePassedTime("2024-04-04");
}, 60000); // 60000 milliseconds = 1 minute
