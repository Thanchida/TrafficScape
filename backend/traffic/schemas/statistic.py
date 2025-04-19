from ninja import Schema


class WeatherSchema(Schema):
    light: float
    temperature: float
    humidity: float
    pm2_5: float

class StatBlock(Schema):
    avg: float
    stddev: float
    min: float
    max: float

class DescriptiveStatSchema(Schema):
    light: StatBlock
    temperature: StatBlock
    humidity: StatBlock
    pm2_5: StatBlock

