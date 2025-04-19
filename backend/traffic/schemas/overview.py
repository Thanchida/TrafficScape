from ninja import Schema


class PMSpeedSchema(Schema):
    pm2_5: float
    current_speed: float

class PMTimeSchema(Schema):
    pm2_5: float
    current_travel_time: float

class LightSpeedSchema(Schema):
    light: float
    current_speed: float

class CorrelationSchema(Schema):
    light: float
    temperature: float
    humidity: float
    pm2_5: float
    current_speed: float
    current_travel_time: float