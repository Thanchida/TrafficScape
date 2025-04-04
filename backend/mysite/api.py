from ninja_extra import NinjaExtraAPI
from traffic.api import TrafficController, WeatherController, DescriptiveController

api = NinjaExtraAPI()

api.register_controllers(TrafficController, WeatherController, DescriptiveController)