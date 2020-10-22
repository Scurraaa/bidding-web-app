from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Buyer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    bid_credit = models.FloatField(default=50000)
    commited_bids = models.FloatField(null=True, blank=True)
    winning_bids = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.user.username

class Seller(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    earnings = models.FloatField(null=True, blank=True)

    def __str_(self):
        return self.user.username