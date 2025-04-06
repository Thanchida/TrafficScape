from ninja import Schema

# class TrafficSchema(Schema):
#     latitude: str
#     longitude: str


class WeatherSchema(Schema):
    light: str
    temperature: str
    humidity: str
    pm2_5: str


class TrafficFlowSchema(Schema):
    frc: str
    current_speed: float
    free_flow_speed: float
    current_travel_time: float
    free_flow_travel_time: float
    confidence: float