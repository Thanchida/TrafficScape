from ninja_extra import NinjaExtraAPI
from traffic.api import TrafficController, WeatherController, StatisticController

api = NinjaExtraAPI()

api.register_controllers(TrafficController, WeatherController, StatisticController)