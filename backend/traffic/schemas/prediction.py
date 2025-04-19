from ninja import Schema


class WeatherInputSchema(Schema):
    pm2_5: str
    light: str
    humidity: str
    temperature: str
