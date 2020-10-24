from rest_framework import serializers
from bids.models import Bid

class BidSerializers(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Bid