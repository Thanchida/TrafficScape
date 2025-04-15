from django.test import TestCase
from rest_framework.test import APIClient

class OverviewEndpointTests(TestCase):

    def setUp(self):
        self.client = APIClient()

    def test_pm25_speed_endpoint_returns_data(self):
        response = self.client.get("/api/overview/pm25_speed/")
        self.assertEqual(response.status_code, 200)

        json_data = response.json()
        self.assertIn("data", json_data)
        self.assertIsInstance(json_data["data"], list)
        if json_data["data"]:
            self.assertIn("pm2_5", json_data["data"][0])
            self.assertIn("current_speed", json_data["data"][0])

    def test_pm_time_endpoint_returns_data(self):
        response = self.client.get("/api/overview/pm_time/")
        self.assertEqual(response.status_code, 200)

        json_data = response.json()
        self.assertIn("data", json_data)
        self.assertIsInstance(json_data["data"], list)
        if json_data["data"]:
            self.assertIn("pm2_5", json_data["data"][0])
            self.assertIn("current_travel_time", json_data["data"][0])
    
    def test_light_speed_endpoint_returns_data(self):
        response = self.client.get("/api/overview/light_speed/")
        self.assertEqual(response.status_code, 200)

        json_data = response.json()
        self.assertIn("data", json_data)
        self.assertIsInstance(json_data["data"], list)
        if json_data["data"]:
            self.assertIn("light", json_data["data"][0])
            self.assertIn("current_speed", json_data["data"][0])

    def test_correlation_endpoint_returns_data(self):
        response = self.client.get("/api/overview/correlation/")
        self.assertEqual(response.status_code, 200)

        json_data = response.json()
        corr = json_data["correlation"]
        expected_keys = ["light", "temperature", "humidity", "pm2_5", "current_speed", "current_travel_time"]
        for key in expected_keys:
            self.assertIn(key, corr)
            for inner_key in expected_keys:
                self.assertIn(inner_key, corr[key])
                self.assertIsInstance(corr[key][inner_key], float)
