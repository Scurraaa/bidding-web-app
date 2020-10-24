from django.db import models
from django.contrib.auth.models import User

class Buyer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    bid_credit = models.FloatField(default=50000)
    commited_bids = models.FloatField(default=0)
    winning_bids = models.IntegerField(default=0)

    def __str__(self):
        return self.user.username

class Seller(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    earnings = models.FloatField(default=0)

    def __str_(self):
        return self.user.username