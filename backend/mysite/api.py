from ninja_extra import NinjaExtraAPI
from traffic.api import TrafficController, StatisticController, PredictionController, OverviewController

api = NinjaExtraAPI()

api.register_controllers(TrafficController, StatisticController, PredictionController, OverviewController)
