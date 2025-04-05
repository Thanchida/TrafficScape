from flask import abort
from ninja_extra import api_controller
from ninja_extra import http_post, http_get
from django.conf import settings
from django.http import JsonResponse
from ..schemas import TrafficFlowSchema
from mysite.db import pool
import pandas as pd


@api_controller("/distribution")
class DistributionController:
    @http_get("/")
    def get_data(self):
        with pool.connection() as conn, conn.cursor() as cs:
            try:
                cs.execute("""
                    SELECT light, temperature, humidity, pm2_5
                    FROM test_combine
                """)

                result = cs.fetchall()
                print(result)
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
