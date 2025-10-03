# Download pico_12c.py library from:
# https://github.com/T-622/RPI-PICO-I2C-LCD/blob/main/pico_i2c_lcd.py
# Download lcd_api.py library from:
# https://github.com/dhylands/python_lcd/blob/master/lcd/lcd_api.py

import network
import utime
import urequests
import dht
from machine import Pin, I2C
from pico_i2c_lcd import I2cLcd

utime.sleep(1)
# LCD
i2c = I2C(0, scl=Pin(1), sda=Pin(0), freq=400000)
lcd = I2cLcd(i2c, 0x27, 4, 20)

#Wifi connection
ssid = 'Wokwi-GUEST'
password = ''

THINGSPEAK_API_KEY = 'BTCTJ89D31BBF173'
THINGSPEAK_URL = 'https://api.thingspeak.com/update'

wlan = network.WLAN(network.STA_IF)
wlan.active(True)
wlan.connect(ssid, password)

print("Connecting to Wi-Fi...", end="")
while not wlan.isconnected():
  print(".", end="")
  utime.sleep(0.5)

print("\nConnected!")
print("IP address:", wlan.ifconfig()[0])

sensor = dht.DHT22(Pin(15))

def send_to_thingspeak(temp, humi):
    print("Parameters: ", temp, ', ', humi)
    try:
        response = urequests.post(
            THINGSPEAK_URL,
            data = 'api_key={}&field1={}&field2={}'.format(THINGSPEAK_API_KEY, temp, humi),
            headers={'Content-Type': 'application/x-www-form-urlencoded'}
        )
        print("ThingSpeak response:", response.text)
        response.close()  
    except Exception as e:
        print("Error: ", e)

while True:
  try:
    sensor.measure()
    temperature = sensor.temperature()
    humidity = sensor.humidity()
    lcd.putstr('Temperature: {}c\nHumidity: {}%'.format(temperature, humidity))
    print("Temperature:", temperature, "°C")
    print("Humidity:", humidity, "%")
    send_to_thingspeak(temperature, humidity)
  except Exception as e:
    print("Error:", e)

  utime.sleep(15)