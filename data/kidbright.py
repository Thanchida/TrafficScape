import time
import struct
import dht
import machine
import network
import json
import math
from machine import ADC, Pin, UART
from umqtt.robust import MQTTClient
from config import WIFI_SSID, WIFI_PASS, MQTT_BROKER, MQTT_USER, MQTT_PASS

wlan = network.WLAN(network.STA_IF)
wlan.active(True)
wlan.connect(WIFI_SSID, WIFI_PASS)
while not wlan.isconnected():
    time.sleep(0.5)
print("wifi connected")

mqtt = MQTTClient(client_id = "client_" + str(machine.unique_id()),
                  server=MQTT_BROKER,
                  user=MQTT_USER,
                  password=MQTT_PASS)
mqtt.connect()

# light sensor
ldr = ADC(Pin(36))

# temperature and humidity sensor
temp_hum_sensor = dht.DHT11(machine.Pin(33))

# dust sensor
dust_sensor = UART(2, baudrate=9600, tx=19, rx=18)

def get_light_value():
    while True:
        raw_value = ldr.read()
        voltage = (raw_value / 4095) * 3.3

        if voltage <= 0.01:
            return 100000

        resistance = (10000 * voltage) / (3.3 - voltage)

        if resistance <= 0:
            continue

        log_r = math.log10(resistance)
        log_lux = 5.0 - (0.7 * log_r)
        lux = 10 ** log_lux

        return round(lux, 2)


def get_temp_hum_value():
    while True:
        try:
            temp_hum_sensor.measure()
            temp = temp_hum_sensor.temperature()
            humidity = temp_hum_sensor.humidity()
            if temp is not None and humidity is not None:
                return temp, humidity
        except:
            time.sleep(1)


def get_dust_value():
    while True:
        if dust_sensor.any():
            buf = dust_sensor.read(32)
            if buf and buf[0] == 0x42 and buf[1] == 0x4D:
                pm2_5_atm = buf[12] << 8 | buf[13]
                return pm2_5_atm
        time.sleep(1)


while True:
    light_value = get_light_value()
    temp_value, hum_value = get_temp_hum_value()
    pm_value = get_dust_value()

    print(f"light: {light_value}")
    print(f"temp: {temp_value}")
    print(f"humidity: {hum_value}")
    print(f"pm2.5: {pm_value}")
    print("\n")

    data = {
        "light": light_value,
        "temperature": temp_value,
        "humidity": hum_value,
        "pm2_5": pm_value,
    }

    mqtt.publish('b6610545812/weather', json.dumps(data))
    time.sleep(300)
