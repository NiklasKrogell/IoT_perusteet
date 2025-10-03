import time
from machine import Pin 
time.sleep(0.1)

pir = Pin(0, Pin.IN)
led = Pin(16, Pin.OUT)

while True:
    if(pir.value()==1):
        print("Motion Detected")
        while pir.value()==1: #The led blinks when there is motion
            led.value(1)
            time.sleep(0.2)
            led.value(0)
            time.sleep(0.2)
    led.value(0)     
    time.sleep(0.5)


