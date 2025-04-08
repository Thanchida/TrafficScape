from flask import abort
from ninja_extra import api_controller
from ninja_extra import http_post, http_get
from django.conf import settings
from django.http import JsonResponse
from mysite.db import pool
import pandas as pd
from ..schemas import WeatherSchema
from ..ml.train import train_model
from ..ml.predict import predict


@api_controller("/prediction")
class PredictionController:
    @http_post('/weather')
    def post_weather_data(self, data:WeatherSchema):
        light = float(data.light)
        temperature = float(data.temperature)
        humidity = float(data.humidity)
        pm2_5 = float(data.pm2_5)
        data = {"light": light,
                "temperature": temperature,
                "humidity": humidity,
                "pm2_5": pm2_5}
        df = pd.DataFrame([data])
        # train_model()
        traffic_prediction = predict(df)
        print(traffic_prediction)
        return JsonResponse({"msg": "Traffic prediction retrieved successfully", "data": traffic_prediction}, status=200)
