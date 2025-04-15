from django.test import TestCase
from rest_framework.test import APIClient

class PredictionTestCase(TestCase):

    def setUp(self):
        self.client = APIClient()

    def test_prediction_success(self):
        data = {
            "light": '120.0',
            "temperature": '29.0',
            "humidity": '60.0',
            "pm2_5": '35.0'
        }
        response = self.client.post("/api/prediction/weather", data, format="json")
        self.assertEqual(response.status_code, 200)
        self.assertIn("data", response.json())

    def test_prediction_missing_field(self):
        data = {
            "light": '120.0',
            "temperature": '29.0',
            "pm2_5": '35.0'
        }
        response = self.client.post("/api/prediction/weather", data, format="json")
        self.assertEqual(response.status_code, 422)

    def test_prediction_invalid_type(self):
        data = {
            "light": "bright",
            "temperature": '29.0',
            "humidity": '60.0',
            "pm2_5": '35.0'
        }
        response = self.client.post("/api/prediction/weather", data, format="json")
        self.assertEqual(response.status_code, 400)
