from ninja_extra import NinjaExtraAPI
from traffic.api import TrafficController, WeatherController, DescriptiveController, OverviewController

api = NinjaExtraAPI()

api.register_controllers(TrafficController, WeatherController, DescriptiveController, OverviewController)