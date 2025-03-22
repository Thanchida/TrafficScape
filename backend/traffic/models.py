from django.db import models

# Create your models here.
class TrafficFlow(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    latitude = models.FloatField()
    longitude = models.FloatField()
    frc = models.CharField(max_length=10, null=True, blank=True)
    current_speed = models.FloatField(null=True, blank=True)
    free_flow_speed = models.FloatField(null=True, blank=True)
    current_travel_time = models.IntegerField(null=True, blank=True)
    free_flow_travel_time = models.IntegerField(null=True, blank=True)
    confidence = models.FloatField(null=True, blank=True)

    class Meta:
        ordering = ['-timestamp']

    def __str__(self):
        return f"Traffic @ ({self.latitude}, {self.longitude}) Speed: {self.current_speed} km/h"