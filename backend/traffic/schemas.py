from ninja import Schema

class TrafficSchema(Schema):
    latitude: str
    longitude: str


class WeatherSchema(Schema):
    light: str
    temperature: str
    humidity: str
    pm2_5: str