from django.test import TestCase
from rest_framework.test import APIClient

class StatisticEndpointTests(TestCase):

    def setUp(self):
        self.client = APIClient()

    def test_weather_data_endpoint_returns_data(self):
        response = self.client.get("/api/statistic/weather_data")
        self.assertEqual(response.status_code, 200)

        json_data = response.json()
        self.assertIn("data", json_data)
        self.assertIsInstance(json_data["data"], list)
        if json_data["data"]:
            self.assertIn("light", json_data["data"][0])
            self.assertIn("temperature", json_data["data"][0])
            self.assertIn("humidity", json_data["data"][0])
            self.assertIn("pm2_5", json_data["data"][0])

    def test_descriptive_endpoint_returns_data(self):
        response = self.client.get("/api/statistic/descriptive")
        self.assertEqual(response.status_code, 200)

        json_data = response.json()
        expected_keys = ["light", "temperature", "humidity", "pm2_5"]
        for key in expected_keys:
            self.assertIn(key, json_data["data"])
            for stat_name, value in json_data["data"][key].items():
                self.assertIsInstance(value, float)

    def test_correlation_endpoint_returns_data(self):
        response = self.client.get("/api/statistic/correlation")
        self.assertEqual(response.status_code, 200)

        json_data = response.json()
        corr = json_data["data"]
        expected_keys = ["light", "temperature", "humidity", "pm2_5"]
        for key in expected_keys:
            self.assertIn(key, corr)
            for inner_key in expected_keys:
                self.assertIn(inner_key, corr[key])
                self.assertIsInstance(corr[key][inner_key], float)
