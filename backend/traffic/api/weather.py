# from ninja_extra import api_controller, http_post
# from ..schemas import WeatherSchema


# @api_controller("/weather")
# class WeatherController:
#     @http_post('/')
#     def weather(self, data:WeatherSchema):
#         light = float(data.light)
#         temperature = float(data.temperature)
#         humidity = float(data.humidity)
#         pm2_5 = float(data.pm2_5)
#         print(light, temperature, humidity, pm2_5)