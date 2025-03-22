import requests
import xmltodict
import json
from ninja import Router
from django.conf import settings
from pydantic import BaseModel
from django.http import JsonResponse


class Traffic(BaseModel):
    latitude: str
    longitude: str

router = Router()

@router.post('/location')
def location(request, data: Traffic):
    print("Hi")
    latitude = float(data.latitude)
    longitude = float(data.longitude)
    print(latitude)
    print(longitude)

    API_URL = "https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/10/xml"
    API_KEY = settings.TOMTOM_API_KEY
    response = requests.get(f"{API_URL}?key={API_KEY}&point={latitude},{longitude}")
    print(response)
    if response.status_code == 200:
        xml_data = xmltodict.parse(response.text)
        json_data = json.dumps(xml_data, indent=4)
        print(json_data)
        return JsonResponse({"msg": "Traffic data retrieved successfully", "data": json_data}, status=200)
    else:
        print("fail")
        print(response.text)
        return JsonResponse({"msg": "Failed to retrieve traffic data", "error": response.text}, status=response.status_code)