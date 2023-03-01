from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from bs4 import BeautifulSoup

# User inputs (Using static inputs for now for testing)
depart_city = "CLE" #input("Enter the departing city: ")
arrival_city = "TPA" #input("Enter the arrival city: ")
depart_date = "2023-05-09" #input("Enter the depart date (YYYY-MM-DD): ")
return_date = "2023-05-14" #input("Enter the return date (YYYY-MM-DD): ")

# Use Selenium to open the Kayak website
kayak = 'https://www.kayak.com/flights/{}-{}/{}/{}'.format(depart_city, arrival_city, depart_date, return_date)
driver = webdriver.Chrome() 
driver.get(kayak)
WebDriverWait(driver, 60)

# find the list of flights
flights = driver.find_elements(By.CLASS_NAME, "resultWrapper")

list_prices = []
list_airlines = []

for WebElement in flights:
    elementHTML = WebElement.get_attribute('outerHTML')
    elementSoup = BeautifulSoup(elementHTML, 'html.parser')

    #find prices
    temp_price = elementSoup.find("div", {"class": 'col-price result-column js-no-dtog'})
    price = temp_price.find("span", {"class": "price-text"})
    list_prices.append(price.text)

    #find airline name
    airline = elementSoup.find("div", {"dir": "ltr"}).text
    list_airlines.append(airline)

print(*list_airlines)
print(*list_prices)
