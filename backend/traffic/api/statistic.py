import pandas as pd
from flask import abort
from ninja_extra import api_controller
from ninja_extra import http_get
from django.http import JsonResponse
from mysite.db import pool
from ..data_utils import remove_outliers_iqr
from ..schemas.statistic import WeatherSchema, DescriptiveStatSchema, StatBlock


@api_controller("/statistic")
class StatisticController:
    @http_get("/weather_data")
    def get_data(self):
        with pool.connection() as conn, conn.cursor() as cs:
            try:
                cs.execute("""
                    SELECT light, temperature, humidity, pm2_5
                    FROM combined_weather_traffic
                """)

                columns = ["light","temperature", "humidity", "pm2_5"]
                data = [WeatherSchema(**dict(zip(columns, row))) for row in cs.fetchall()]
                df = pd.DataFrame([d.dict() for d in data])
                return JsonResponse({"msg": "Descriptive statistics retrieved successfully", "data": df.to_dict(orient="records")}, status=200)
            finally:
                print(f"Idle connections in the pool: {len(pool._idle_cache)}")
    
    @http_get("/descriptive")
    def get_descriptive(self):
        with pool.connection() as conn, conn.cursor() as cs:
            try:
                cs.execute("""
                    SELECT 
                        ROUND(AVG(light), 2) AS avg_light,
                        ROUND(STDDEV(light), 2) AS stddev_light,
                        ROUND(MIN(light), 2) AS min_light,
                        ROUND(MAX(light), 2) AS max_light,
                        ROUND(AVG(temperature), 2) AS avg_temperature,
                        ROUND(STDDEV(temperature), 2) AS stddev_temperature,
                        ROUND(MIN(temperature), 2) AS min_temperature,
                        ROUND(MAX(temperature), 2) AS max_temperature,
                        ROUND(AVG(humidity), 2) AS avg_humidity,
                        ROUND(STDDEV(humidity), 2) AS humidity,
                        ROUND(MIN(humidity), 2) AS min_humidity,
                        ROUND(MAX(humidity), 2) AS max_humidity,
                        ROUND(AVG(pm2_5), 2) AS avg_pm2_5,
                        ROUND(STDDEV(pm2_5), 2) AS stddev_pm2_5,
                        ROUND(MIN(pm2_5), 2) AS min_pm2_5,
                        ROUND(MAX(pm2_5), 2) AS max_pm2_5
                    FROM combined_weather_traffic
                """)

                result = cs.fetchone()
                data = DescriptiveStatSchema(
                    light=StatBlock(avg=result[0], stddev=result[1], min=result[2], max=result[3]),
                    temperature=StatBlock(avg=result[4], stddev=result[5], min=result[6], max=result[7]),
                    humidity=StatBlock(avg=result[8], stddev=result[9], min=result[10], max=result[11]),
                    pm2_5=StatBlock(avg=result[12], stddev=result[13], min=result[14], max=result[15])
                )
                descriptive_stat = data.dict()
                return JsonResponse({"msg": "Descriptive statistics retrieved successfully", "data": descriptive_stat}, status=200)
            finally:
                print(f"Idle connections in the pool: {len(pool._idle_cache)}")
        
    @http_get("/correlation")
    def get_correlation(self):
        with pool.connection() as conn, conn.cursor() as cs:
            try:
                cs.execute("""
                    SELECT light, temperature, humidity, pm2_5
                    FROM combined_weather_traffic
                """)

                columns = ["light", "temperature", "humidity", "pm2_5"]
                data = [WeatherSchema(**dict(zip(columns, row))) for row in cs.fetchall()]
                df = pd.DataFrame([d.dict() for d in data])
                df = remove_outliers_iqr(df, ['light', 'temperature', 'humidity', 'pm2_5'])
                corr_matrix = df.corr(method='pearson')
                corr_dict = corr_matrix.round(3).to_dict()
                return JsonResponse({"msg": "Descriptive statistics retrieved successfully", "data": corr_dict}, status=200)
            finally:
                print(f"Idle connections in the pool: {len(pool._idle_cache)}")


