from django.db import models
from accounts.models import Buyer
from products.models import Product

BID_STATUS_CHOICES = [
    ('PICKED', 'PICKED'),
    ('NOT PICKED', 'NOT PICKED'),
    ('WAITING', 'WAITING')
]

# Create your models here.
class Bid(models.Model):
    Prodcut = models.ForeignKey(Product, on_delete=models.CASCADE)
    buyer = models.ForeignKey(Buyer, on_delete=models.CASCADE)
    amount = models.FloatField(null=True, blank=True)
    status = models.CharField(max_length=255, choices=BID_STATUS_CHOICES, default='WAITING')