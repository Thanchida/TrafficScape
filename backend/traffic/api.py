import requests
import xmltodict
import json
import mysql.connector
from ninja import Router
from django.conf import settings
from pydantic import BaseModel
from django.http import JsonResponse


router = Router()


class Traffic(BaseModel):
    latitude: str
    longitude: str


def save_to_db(frc, cur_speed, flow_speed, cur_travel_time, flow_travel_time, conf):
    try:
        con = mysql.connector.connect(
            host="iot.cpe.ku.ac.th",
            user="b6610545812",
            password="thanchida.a@ku.th",
            database="b6610545812"
        )
        cursor = con.cursor()
        query = "INSERT INTO traffic_api (frc, current_speed, free_flow_speed, current_travel_time, free_flow_travel_time, confidence) VALUES (%s, %s, %s, %s, %s, %s)"
        cursor.execute(query, (frc, cur_speed, flow_speed, cur_travel_time, flow_travel_time, conf))
        con.commit()
        cursor.close()
        con.close()
        print("Data successfully saved!")
    except mysql.connector.Error as err:
        print(f"Database error: {err}")

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
        frc = xml_data["flowSegmentData"]["frc"]
        cur_speed = xml_data["flowSegmentData"]["currentSpeed"]
        flow_speed = xml_data["flowSegmentData"]["freeFlowSpeed"]
        cur_travel_time = xml_data["flowSegmentData"]["currentTravelTime"]
        flow_travel_time = xml_data["flowSegmentData"]["freeFlowTravelTime"]
        conf = xml_data["flowSegmentData"]["confidence"]
        save_to_db(frc, cur_speed, flow_speed, cur_travel_time, flow_travel_time, conf)
        print(json_data)
        return JsonResponse({"msg": "Traffic data retrieved successfully", "data": json_data}, status=200)
    else:
        print("fail")
        print(response.text)
        return JsonResponse({"msg": "Failed to retrieve traffic data", "error": response.text}, status=response.status_code)