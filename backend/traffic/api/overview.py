from ninja_extra import api_controller, http_get
from django.http import JsonResponse
from mysite.db import pool
import pandas as pd

@api_controller("/overview")
class OverviewController:

    @http_get("/pm25_speed/")
    def pm25_vs_speed(self):
        with pool.connection() as conn:
            traffic_df = pd.read_sql("SELECT timestamp, current_speed FROM traffic_flow_data", conn)
            weather_df = pd.read_sql("SELECT timestamp, pm2_5 FROM weather_data", conn)

        traffic_df["timestamp"] = pd.to_datetime(traffic_df["timestamp"])
        weather_df["timestamp"] = pd.to_datetime(weather_df["timestamp"])
        weather_df = weather_df[weather_df["pm2_5"] > 0]

        traffic_df = traffic_df.sort_values("timestamp")
        weather_df = weather_df.sort_values("timestamp")

        merged = pd.merge_asof(traffic_df, weather_df, on="timestamp", direction="nearest", tolerance=pd.Timedelta("2min"))

        result = merged.dropna().to_dict(orient="records")
        return JsonResponse({"data": result}, status=200)

    @http_get("/humidity_speed/")
    def humidity_vs_speed(self):
        with pool.connection() as conn:
            traffic_df = pd.read_sql("SELECT timestamp, current_speed FROM traffic_flow_data", conn)
            weather_df = pd.read_sql("SELECT timestamp, humidity FROM weather_data", conn)

        traffic_df["timestamp"] = pd.to_datetime(traffic_df["timestamp"])
        weather_df["timestamp"] = pd.to_datetime(weather_df["timestamp"])

        traffic_df = traffic_df.sort_values("timestamp")
        weather_df = weather_df.sort_values("timestamp")

        merged = pd.merge_asof(traffic_df, weather_df, on="timestamp", direction="nearest", tolerance=pd.Timedelta("2min"))

        result = merged.dropna().to_dict(orient="records")
        return JsonResponse({"data": result}, status=200)
    
    @http_get("/light_speed/")
    def light_vs_speed(self):
        with pool.connection() as conn:
            traffic_df = pd.read_sql("SELECT timestamp, current_speed FROM traffic_flow_data", conn)
            weather_df = pd.read_sql("SELECT timestamp, light FROM weather_data", conn)

        traffic_df["timestamp"] = pd.to_datetime(traffic_df["timestamp"])
        weather_df["timestamp"] = pd.to_datetime(weather_df["timestamp"])

        traffic_df = traffic_df.sort_values("timestamp")
        weather_df = weather_df.sort_values("timestamp")

        merged = pd.merge_asof(traffic_df, weather_df, on="timestamp", direction="nearest", tolerance=pd.Timedelta("2min"))

        result = merged.dropna().to_dict(orient="records")
        return JsonResponse({"data": result}, status=200)


    @http_get("/correlation/")
    def correlation_matrix(self):
        with pool.connection() as conn:
            traffic_df = pd.read_sql("SELECT timestamp, current_speed, current_travel_time FROM traffic_flow_data", conn)
            weather_df = pd.read_sql("SELECT timestamp, light, temperature, humidity, pm2_5 FROM weather_data", conn)

        traffic_df["timestamp"] = pd.to_datetime(traffic_df["timestamp"])
        weather_df["timestamp"] = pd.to_datetime(weather_df["timestamp"])

        traffic_df = traffic_df.sort_values("timestamp")
        weather_df = weather_df.sort_values("timestamp")

        merged = pd.merge_asof(
            traffic_df, weather_df, on="timestamp",
            direction="nearest", tolerance=pd.Timedelta("2min")
        )

        merged = merged.dropna()

        numeric_cols = ["current_speed", "current_travel_time", "light", "temperature", "humidity", "pm2_5"]
        corr = merged[numeric_cols].corr().round(2)

        return JsonResponse({"correlation": corr.to_dict()}, status=200)

