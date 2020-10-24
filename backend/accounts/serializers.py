from rest_framework import serializers
from django.contrib.auth.models import User

class LoginSerializers(serializers.ModelSerializer):
    class Meta:
        fields = ('id',
                    'username',
                    'password')
        model = User