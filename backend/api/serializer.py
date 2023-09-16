from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError

from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('id', 'email', 'username', 'password', 'confirm_password', 'remember_me')
        extra_kwargs = {
            'password': {'write_only': True},
            'confirm_password': {'write_only': True},
        }

    def validate(self, attrs):
        password = self.initial_data['password']
        confirm_password = self.initial_data['confirm_password']
        if password == confirm_password:
            return super().validate(attrs) 
        return ValidationError('Two password fields don\'t match.')

    def create(self, validated_data):
        user = get_user_model().objects.create_user(**validated_data)
        return user
    
    def update(self, instance, validated_data):
        instance.set_password(validated_data.pop('password'))
        instance.set_password(validated_data.pop('confirm_password'))
        return super().update(instance, validated_data)
    

class UserMiniSerializer(serializers.ModelSerializer):
    """
    Serializer, that excludes username, confirm_password fields to fit Sign-in form.
    """
    # must override this field, since i use the same db model and email field is unique (while creating a new instance).
    # however this is not the case
    email = serializers.EmailField()

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        try:
            user = get_user_model().objects.filter(email=email).first() 
        except get_user_model().DoesNotExist:
            raise ValidationError('User with following email does not exist.')

        if not user.check_password(password):
            raise ValidationError('Invalid password. Please, try again.')
        
        attrs['user'] = user
        return attrs

    class Meta:
        model = get_user_model()
        fields = ('id', 'email', 'password', 'remember_me')


class UserEmailSerializer(serializers.Serializer):
    """
    Tiny Serializer for Logout/Delete-token purposes ONLY.
    """
    email = serializers.EmailField()


class AuthTokenSerializer(serializers.Serializer):
    key = serializers.CharField(max_length=40)