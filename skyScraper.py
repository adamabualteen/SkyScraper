import requests
import json

API_KEY = "34f2de9890msh7a926fcb0807e79p1ea45djsnb0bc9330aa86"

def get_cheapest_flight(arrival_city, departure_city, departure_date):
    url = "https://priceline-com-provider.p.rapidapi.com/v2/flight/departures"

    querystring = {"adults":"1","departure_date":departure_date,"sid":"iSiX639","origin_airport_code":departure_city,"destination_airport_code":arrival_city}

    headers = {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": "priceline-com-provider.p.rapidapi.com"
    }

    response = requests.request("GET", url, headers=headers, params=querystring)

    data = json.loads(response.text)

    airline = data["getAirFlightDepartures"]["results"]["result"]["itinerary_data"]["itinerary_0"]["slice_data"]["slice_0"]["airline"]["name"]
    price = data["getAirFlightDepartures"]["results"]["result"]["itinerary_data"]["itinerary_0"]["price_details"]["baseline_total_fare"]

    return airline, price
    

# Prompt the user to input the departure city, arrival city, and departure date.
departure_city = input("Enter the departure city (Airport Code): ")
arrival_city = input("Enter the arrival city (Airport Code): ")
departure_date = input("Enter the departure date (YYYY-MM-DD): ")

# Call the function to retrieve the cheapest flight and airline
airline, price = get_cheapest_flight(arrival_city, departure_city, departure_date)

# Output the result
print("The cheapest flight from " + departure_city + " to " + arrival_city + " departing on " + departure_date + " is $" + str(price) + " on " + str(airline))
