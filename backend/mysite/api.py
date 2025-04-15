from ninja_extra import NinjaExtraAPI
from traffic.api import StatisticController, PredictionController, OverviewController

api = NinjaExtraAPI()

api.register_controllers(StatisticController, PredictionController, OverviewController)
