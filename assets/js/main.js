/* ========================================================
   BITCOIN PRICE TICKER
======================================================== */

async function fetchBTCPrice() {
    try {
        const res = await fetch("https://api.coindesk.com/v1/bpi/currentprice/USD.json");
        const data = await res.json();

        const price = data.bpi.USD.rate_float;
        const priceElement = document.getElementById("btc-price");
        const arrowElement = document.getElementById("btc-arrow");

        if (priceElement) {
            let last = parseFloat(priceElement.getAttribute("data-last")) || price;
            priceElement.setAttribute("data-last", price.toString());

            priceElement.textContent = `$${price.toLocaleString()}`;

            // Price arrow indicator
            if (price > last) {
                arrowElement.textContent = "↑";
                arrowElement.style.color = "green";
            } else if (price < last) {
                arrowElement.textContent = "↓";
                arrowElement.style.color = "red";
            } else {
                arrowElement.textContent = "→";
                arrowElement.style.color = "#555";
            }
        }
    } catch (error) {
        console.log("BTC price fetch error:", error);
    }
}

// Update every 15 seconds
setInterval(fetchBTCPrice, 15000);
fetchBTCPrice();

/* ========================================================
   DCA CALCULATOR
======================================================== */

function calculateDCA() {
    const amount = parseFloat(document.getElementById("dca-amount").value);
    const frequency = document.getElementById("dca-frequency").value;
    const months = parseFloat(document.getElementById("dca-months").value);
    const currentPrice = parseFloat(document.getElementById("current-btc-price").value);

    if (!amount || !months || !currentPrice) {
        alert("Please complete all DCA fields.");
        return;
    }

    let periods = months;
    if (frequency === "weekly") {
        periods = months * 4.345; // approx weeks per month
    }

    const totalInvested = amount * periods;
    const btcAccumulated = totalInvested / currentPrice;

    document.getElementById("dca-invested").textContent =
        `Total Invested: $${totalInvested.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;

    document.getElementById("dca-btc").textContent =
        `Total BTC Accumulated: ${btcAccumulated.toFixed(6)} BTC`;
}

/* ========================================================
   INFLATION CALCULATOR
======================================================== */

function calculateInflation() {
    const amount = parseFloat(document.getElementById("inflation-amount").value);
    const rate = parseFloat(document.getElementById("inflation-rate").value);
    const years = parseFloat(document.getElementById("inflation-years").value);

    if (!amount || !rate || !years) {
        alert("Please complete all inflation fields.");
        return;
    }

    // Calculate future value under inflation
    const inflationFactor = Math.pow(1 + rate / 100, years);
    const realValue = amount / inflationFactor;
    const lostValue = amount - realValue;

    document.getElementById("inflation-loss").textContent =
        `Value Lost to Inflation: $${lostValue.toFixed(2)}`;

    document.getElementById("inflation-real").textContent =
        `Future Purchasing Power: $${realValue.toFixed(2)}`;
}

/* ========================================================
   BITCOIN HALVING COUNTDOWN (Next Halving April 2028)
======================================================== */

function updateHalvingCountdown() {
    const halvingDate = new Date("2028-04-12T00:00:00Z"); 
    const now = new Date();
    const diff = halvingDate - now;

    if (diff <= 0) {
        document.getElementById("halving-countdown").textContent = "The Halving Has Arrived!";
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById("halving-countdown").textContent =
        `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

// Update every second
setInterval(updateHalvingCountdown, 1000);
updateHalvingCountdown();
