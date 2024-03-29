
async function fetchCheapestFlight(departure_city, arrival_city, departure_date, flight_class) {
    const API_KEY = "34f2de9890msh7a926fcb0807e79p1ea45djsnb0bc9330aa86";
    const url = new URL("https://priceline-com-provider.p.rapidapi.com/v2/flight/departures");
    const params = {
        adults: "1",
        departure_date: departure_date,
        sid: "iSiX639",
        origin_airport_code: departure_city,
        destination_airport_code: arrival_city,
        cabin_class: flight_class,
    };
    url.search = new URLSearchParams(params);

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": API_KEY,
            "X-RapidAPI-Host": "priceline-com-provider.p.rapidapi.com",
        },
    });
    return await response.json();
}
//Captcha Function
async function validateRecaptcha() {
    const captchaResponse = document.querySelector("[name='g-recaptcha-response']").value;

    if (!captchaResponse) {
        alert("Please complete the reCAPTCHA.");
        return false;
    }

    return true;
}

function showLoadingMessage() {
    document.getElementById("loading-message").textContent = "Finding flight...";
}

function hideLoadingMessage() {
    document.getElementById("loading-message").textContent = "";
}

function displayGoogleFlightsLink(departureCity, arrivalCity, departureDate, flight_class) {
    const googleFlightsUrl = `https://www.google.com/travel/flights?q=Flights%20to%20${arrivalCity}%20from%20${departureCity}%20on%20${departureDate}%20under%20${flight_class}%20Class`;
    document.getElementById("google-flights-link").innerHTML = `<a href="${googleFlightsUrl}" target="_blank">Purchase ticket with Google Flights</a>`;
}


document.getElementById("flight-search-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const isCaptchaValid = await validateRecaptcha();
    if (!isCaptchaValid) return;

    const departure_city = document.getElementById("departure_city").value;
    const arrival_city = document.getElementById("arrival_city").value;
    const departure_date = document.getElementById("departure_date").value;
    const flight_class = document.getElementById("flight_class").value;
    const requested_currency = document.getElementById("requested_currency").value;
    //const convertedCanadian = 0.74 * USD
    //const convertedEuro = 1.10 * USD
    //const convertedJapan = 0.0075 * USD
    //const convertedCHF = 1.12 * USD
    //const convertedHKD = 0.13 * USD
    //const convertedSEK = 0.097 * USD
    //const convertedSing = 0.75 * USD
    //const convertedTRY = 0.052 * USD
    //const convertedGBP = 1.24 * USD  
    //const convertedAUD = 0.67 * USD
    //const convertedRUB = 0.012 * USD
    //const convertedCNY = 0.15 * USD

    showLoadingMessage();

    const data = await fetchCheapestFlight(departure_city, arrival_city, departure_date, flight_class);
    //console.log(data);
    const airline = data.getAirFlightDepartures.results.result.itinerary_data.itinerary_0.slice_data.slice_0.airline.name;
    const price = data.getAirFlightDepartures.results.result.itinerary_data.itinerary_0.price_details.baseline_total_fare;
    const output = document.getElementById("output");
    //console.log(data);
    output.textContent = `The cheapest flight from ${departure_city} to ${arrival_city} departing on ${departure_date}, under ${flight_class} Class is ${price} ${requested_currency} on ${airline}`;

    displayGoogleFlightsLink(departure_city, arrival_city, departure_date, flight_class);

    hideLoadingMessage();
    
});


