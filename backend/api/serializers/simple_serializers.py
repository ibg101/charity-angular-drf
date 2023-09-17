from rest_framework import serializers


class UserEmailSerializer(serializers.Serializer):
    """
    Simple Serializer for Logout/Delete-token purposes ONLY.
    """
    email = serializers.EmailField(max_length=254)


class AuthTokenSerializer(serializers.Serializer):
    """
    Simple Serializer, that serializes only key field.
    """
    key = serializers.CharField(max_length=40)


class RememberMeSerializer(serializers.Serializer):
    """
    Simple Serializer specifically for DefiningTokenExpiry function. 
    """
    remember_me = serializers.BooleanField(allow_null=True)