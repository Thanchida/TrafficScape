from ninja import NinjaAPI

api = NinjaAPI()

api.add_router("/traffic/", "traffic.api.router")