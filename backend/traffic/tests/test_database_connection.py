from django.test import TestCase
from django.db import connection

class DatabaseConnectionTestCase(TestCase):

    def test_database_connection(self):
        try:
            with connection.cursor() as cursor:
                cursor.execute("SELECT 1")
                result = cursor.fetchone()
                self.assertEqual(result[0], 1)
        except Exception as e:
            self.fail(f"Database connection failed: {str(e)}")
