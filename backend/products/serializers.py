from rest_framework import serializers
from products.models import Product

class ProductSerializers(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Product