from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError

from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('id', 'email', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = get_user_model().objects.create_user(**validated_data)
        return user
    
    def update(self, instance, validated_data):
        instance.set_password(validated_data.pop('password'))
        return super().update(instance, validated_data)