from django.db import models
from accounts.models import Buyer
from products.models import Product

BID_STATUS_CHOICES = [
    ('SUCCESSFUL', 'SUCCESSFUL'),
    ('UNSUCCESSFUL', 'UNSUCCESSFUL'),
    ('WAITING', 'WAITING')
]

class Bid(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    buyer = models.ForeignKey(Buyer, on_delete=models.CASCADE)
    amount = models.FloatField(null=True, blank=True)
    status = models.CharField(max_length=255, choices=BID_STATUS_CHOICES, default='WAITING')