from django.db import models
from accounts.models import Seller

# Create your models here.
class Product(models.Model):
    user = models.ForeignKey(Seller, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    minimum_bid = models.FloatField()
    maximum_bid = models.FloatField()
    expiry_date = models.DateTimeField()

    def __str__(self):
        return self.name
