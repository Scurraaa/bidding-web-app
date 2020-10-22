from django.db import models
from accounts.models import Seller, Buyer

PRODUCT_STATUS_CHOICES = [
    ('CLOSED', 'CLOSED'),
    ('OPEN', 'OPEN')
]

class Product(models.Model):
    user = models.ForeignKey(Seller, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    minimum_bid = models.FloatField()
    maximum_bid = models.FloatField()
    expiry_date = models.DateTimeField()
    status = models.CharField(max_length=255, choices=PRODUCT_STATUS_CHOICES, default='OPEN')
    winner = models.ForeignKey(Buyer, on_delete=models.CASCADE, null=True, blank=True)

    def __int__(self):
        return self.id

