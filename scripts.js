async function fetchCheapestFlight(departure_city, arrival_city, departure_date) {
    const API_KEY = "34f2de9890msh7a926fcb0807e79p1ea45djsnb0bc9330aa86";
    const url = new URL("https://priceline-com-provider.p.rapidapi.com/v2/flight/departures");
    const params = {
        adults: "1",
        departure_date: departure_date,
        sid: "iSiX639",
        origin_airport_code: departure_city,
        destination_airport_code: arrival_city,
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

document.getElementById("flight-search-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const departure_city = document.getElementById("departure_city").value;
    const arrival_city = document.getElementById("arrival_city").value;
    const departure_date = document.getElementById("departure_date").value;

    const data = await fetchCheapestFlight(departure_city, arrival_city, departure_date);
    const airline = data.getAirFlightDepartures.results.result.itinerary_data.itinerary_0.slice_data.slice_0.airline.name;
    const price = data.getAirFlightDepartures.results.result.itinerary_data.itinerary_0.price_details.baseline_total_fare;
    const output = document.getElementById("output");

    output.textContent = `The cheapest flight from ${departure_city} to ${arrival_city} departing on ${departure_date} is $${price} on ${airline}`;
});
