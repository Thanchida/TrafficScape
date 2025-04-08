from ninja_extra import NinjaExtraAPI
from traffic.api import TrafficController, StatisticController, PredictionController

api = NinjaExtraAPI()

api.register_controllers(TrafficController, StatisticController, PredictionController)