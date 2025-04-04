from flask import abort
from ninja_extra import api_controller
from ninja_extra import http_post, http_get
from django.conf import settings
from django.http import JsonResponse
from ..schemas import TrafficFlowSchema
from mysite.db import pool



@api_controller("/descriptive")
class DescriptiveController:
    # @http_get("/traffic/")
    # def get_data(self):
    #     with pool.connection() as conn, conn.cursor() as cs:
    #         try:
    #             cs.execute("""
    #                 SELECT 
    #                     AVG(current_speed) AS avg_current_speed,
    #                     AVG(free_flow_speed) AS avg_free_flow_speed,
    #                     AVG(current_travel_time) AS avg_current_travel_time,
    #                     AVG(free_flow_travel_time) AS avg_free_flow_travel_time,
    #                     STDDEV(current_speed) AS stddev_current_speed,
    #                     STDDEV(free_flow_speed) AS stddev_free_flow_speed,
    #                     STDDEV(current_travel_time) AS stddev_current_travel_time,
    #                     STDDEV(free_flow_travel_time) AS stddev_free_flow_travel_time,
    #                     MIN(current_speed) AS min_current_speed,
    #                     MAX(current_speed) AS max_current_speed,
    #                     MIN(free_flow_speed) AS min_free_flow_speed,
    #                     MAX(free_flow_speed) AS max_free_flow_speed,
    #                     MIN(current_travel_time) AS min_current_travel_time,
    #                     MAX(current_travel_time) AS max_current_travel_time,
    #                     MIN(free_flow_travel_time) AS min_free_flow_travel_time,
    #                     MAX(free_flow_travel_time) AS max_free_flow_travel_time
    #                 FROM traffic_flow_data
    #             """)

    #             result = cs.fetchone()
    #             descriptive_stats = {
    #                 "average_current_speed": result[0],
    #                 "average_free_flow_speed": result[1],
    #                 "average_current_travel_time": result[2],
    #                 "average_free_flow_travel_time": result[3],
    #                 "stddev_current_speed": result[4],
    #                 "stddev_free_flow_speed": result[5],
    #                 "stddev_current_travel_time": result[6],
    #                 "stddev_free_flow_travel_time": result[7],
    #                 "min_current_speed": result[8],
    #                 "max_current_speed": result[9],
    #                 "min_free_flow_speed": result[10],
    #                 "max_free_flow_speed": result[11],
    #                 "min_current_travel_time": result[12],
    #                 "max_current_travel_time": result[13],
    #                 "min_free_flow_travel_time": result[14],
    #                 "max_free_flow_travel_time": result[15]
    #             }

    #             json_output = json.dumps(descriptive_stats, indent=2)
    #             print(json_output)

    #             return JsonResponse({"msg": "Descriptive statistics retrieved successfully", "data": json_output}, status=200)
    #         finally:
    #             conn.close()  # Explicitly close the connection
    #             print(f"Connection closed: {conn.closed}")  # This will print 1 if the connection is closed
                

    @http_get("/weather/")
    def get_weather(self):
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
