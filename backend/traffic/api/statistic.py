from flask import abort
from ninja_extra import api_controller
from ninja_extra import http_post, http_get
from django.conf import settings
from django.http import JsonResponse
from mysite.db import pool
import pandas as pd


@api_controller("/statistic")
class StatisticController:
    @http_get("/weather_data")
    def get_data(self):
        with pool.connection() as conn, conn.cursor() as cs:
            try:
                cs.execute("""
                    SELECT light, temperature, humidity, pm2_5
                    FROM test_combine
                """)

                result = cs.fetchall()
                data = {
                    "light": [row[0] for row in result],
                    "temperature": [row[1] for row in result],
                    "humidity": [row[2] for row in result],
                    "pm2_5": [row[3] for row in result],
                }
                df = pd.DataFrame(data)
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
                    FROM weather_data
                """)

                result = cs.fetchone()
                descriptive_stat = {
                    "light": {
                        "avg_light": result[0],
                        "stddev_light": result[1],
                        "min_light": result[2],
                        "max_light": result[3],
                    },
                    "temperature": {
                        "avg_temperature": result[4],
                        "stddev_temperature": result[5],
                        "min_temperature": result[6],
                        "max_temperature": result[7],
                    },
                    "humidity": {
                        "avg_humidity": result[8],
                        "stddev_humidity": result[9],
                        "min_humidity": result[10],
                        "max_humidity": result[11],
                    },
                    "pm2_5": {
                        "avg_pm2_5": result[12],
                        "stddev_pm2_5": result[13],
                        "min_pm2_5": result[14],
                        "max_pm2_5": result[15],
                    }
                }
            
                return JsonResponse({"msg": "Descriptive statistics retrieved successfully", "data": descriptive_stat}, status=200)
            finally:
                print(f"Idle connections in the pool: {len(pool._idle_cache)}")
        
    @http_get("/correlation")
    def get_correlation(self):
        with pool.connection() as conn, conn.cursor() as cs:
            try:
                cs.execute("""
                    SELECT light, temperature, humidity, pm2_5
                    FROM test_combine
                """)

                result = cs.fetchall()
                data = {
                    "light": [row[0] for row in result],
                    "temperature": [row[1] for row in result],
                    "humidity": [row[2] for row in result],
                    "pm2_5": [row[3] for row in result],
                }
                df = pd.DataFrame(data)
                corr_matrix = df.corr(method='pearson')
                corr_dict = corr_matrix.round(3).to_dict()
                return JsonResponse({"msg": "Descriptive statistics retrieved successfully", "data": corr_dict}, status=200)
            finally:
                print(f"Idle connections in the pool: {len(pool._idle_cache)}")


