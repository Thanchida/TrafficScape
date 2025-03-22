import requests
import xmltodict
import json
from django.shortcuts import render
from .models import TrafficFlow
from django.conf import settings


# Create your views here.
def fetch_traffic_data(request):
    API_URL = "https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/10/xml"
    API_KEY = settings.TOMTOM_API_KEY
    LAT, LON = 52.40476, 4.89257
    response = requests.get(f"{API_URL}?key={API_KEY}&point={LAT},{LON}")
    if response.status_code == 200:
        xml_data = xmltodict.parse(response.text)
        json_data = json.dumps(xml_data, indent=4)
        print(json_data)
