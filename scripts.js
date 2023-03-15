document.getElementById("currentYear").textContent = new Date().getFullYear();

async function fetchCheapestFlight(departure_city, arrival_city, departure_date, travel_class) {
    const API_KEY = "34f2de9890msh7a926fcb0807e79p1ea45djsnb0bc9330aa86";
    const url = new URL("https://priceline-com-provider.p.rapidapi.com/v2/flight/departures");
    const params = {
        adults: "1",
        departure_date: departure_date,
        sid: "iSiX639",
        origin_airport_code: departure_city,
        destination_airport_code: arrival_city,
        travel_class: travel_class,
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

async function validateRecaptcha() {
    const captchaResponse = document.querySelector("[name='g-recaptcha-response']").value;

    if (!captchaResponse) {
        alert("Please complete the reCAPTCHA.");
        return false;
    }

    return true;
}

async function displayResult(airline, price, departureCity, arrivalCity, departureDate, flightClass) {
    const googleFlightsUrl = `https://www.google.com/flights?hl=en#flt=${departureCity}.${arrivalCity}.${departureDate}*${arrivalCity}.${departureCity}.*;c:USD;e:1;sd:1;t:f;tt:o;sp:.${flightClass}`;

    document.getElementById("output").innerHTML = `The cheapest ${flightClass} class flight from ${departureCity} to ${arrivalCity} departing on ${departureDate} is approximately $${price} on ${airline}. <a href="${googleFlightsUrl}" target="_blank">Click here to search for the ticket on Google Flights</a>.`;
}

document.getElementById("flight-search-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const isCaptchaValid = await validateRecaptcha();
    if (!isCaptchaValid) return;

    const departure_city = document.getElementById("departure_city").value;
    const arrival_city = document.getElementById("arrival_city").value;
    const departure_date = document.getElementById("departure_date").value;
    const travel_class = document.getElementById("travel_class").value;

    const data = await fetchCheapestFlight(departure_city, arrival_city, departure_date, travel_class);
    const airline = data.getAirFlightDepartures.results.result.itinerary_data.itinerary_0.slice_data.slice_0.airline.name;
    const price = data.getAirFlightDepartures.results.result.itinerary_data.itinerary_0.price_details.baseline_total_fare;

    await displayResult(airline, price, departure_city, arrival_city, departure_date, travel_class);
});
