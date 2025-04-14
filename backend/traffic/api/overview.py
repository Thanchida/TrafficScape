from ninja_extra import api_controller, http_get
from django.http import JsonResponse
from mysite.db import pool
import pandas as pd
from ..data_utils import remove_outliers_iqr

@api_controller("/overview")
class OverviewController:

    @http_get("/pm25_speed/")
    def pm25_vs_speed(self):
        with pool.connection() as conn, conn.cursor() as cs:
            try:
                cs.execute("""
                    SELECT pm2_5, current_speed
                    FROM combined_weather_traffic
                """)

                result = cs.fetchall()
                data = {
                    "pm2_5": [row[0] for row in result],
                    "current_speed": [row[1] for row in result],
                }
                df = pd.DataFrame(data)
                df = remove_outliers_iqr(df, ['pm2_5'])
                return JsonResponse({"msg": "Descriptive statistics retrieved successfully", "data": df.to_dict(orient="records")}, status=200)
            finally:
                print(f"Idle connections in the pool: {len(pool._idle_cache)}")


    @http_get("/humidity_speed/")
    def humidity_vs_speed(self):
        with pool.connection() as conn, conn.cursor() as cs:
            try:
                cs.execute("""
                    SELECT humidity, current_speed
                    FROM combined_weather_traffic
                """)

                result = cs.fetchall()
                data = {
                    "humidity": [row[0] for row in result],
                    "current_speed": [row[1] for row in result],
                }
                df = pd.DataFrame(data)
                df = remove_outliers_iqr(df, ['humidity'])
                return JsonResponse({"msg": "Descriptive statistics retrieved successfully", "data": df.to_dict(orient="records")}, status=200)
            finally:
                print(f"Idle connections in the pool: {len(pool._idle_cache)}")
    
    @http_get("/light_speed/")
    def light_vs_speed(self):
        with pool.connection() as conn, conn.cursor() as cs:
            try:
                cs.execute("""
                    SELECT light, current_speed
                    FROM combined_weather_traffic
                """)

                result = cs.fetchall()
                data = {
                    "light": [row[0] for row in result],
                    "current_speed": [row[1] for row in result],
                }
                df = pd.DataFrame(data)
                df = remove_outliers_iqr(df, ['light'])
                return JsonResponse({"msg": "Descriptive statistics retrieved successfully", "data": df.to_dict(orient="records")}, status=200)
            finally:
                print(f"Idle connections in the pool: {len(pool._idle_cache)}")


    @http_get("/correlation/")
    def correlation_matrix(self):
        with pool.connection() as conn, conn.cursor() as cs:
            try:
                cs.execute("""
                    SELECT light, temperature, humidity, pm2_5, current_speed, current_travel_time
                    FROM combined_weather_traffic
                """)

                result = cs.fetchall()
                data = {
                    "light": [row[0] for row in result],
                    "temperature": [row[1] for row in result],
                    "humidity": [row[2] for row in result],
                    "pm2_5": [row[3] for row in result],
                    "current_speed": [row[4] for row in result],
                    "current_travel_time": [row[5] for row in result]
                }
                df = pd.DataFrame(data)
                df = remove_outliers_iqr(df, ['light', 'temperature'])
                corr = df.corr(method='pearson').round(3)
                return JsonResponse({"msg": "Descriptive statistics retrieved successfully", "correlation": corr.to_dict()}, status=200)
            finally:
                print(f"Idle connections in the pool: {len(pool._idle_cache)}")

        return JsonResponse({"correlation": corr.to_dict()}, status=200)

