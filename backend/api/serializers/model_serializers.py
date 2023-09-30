from django.contrib.auth import get_user_model

from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('id', 'email', 'username', 'password', 'remember_me', 'donated', 'collected')
        extra_kwargs = {
            'password': {'write_only': True},
        }
    
    def update(self, instance, validated_data):
        instance.set_password(validated_data.pop('password'))
        return super().update(instance, validated_data)
    

class CreateUserSerializer(serializers.ModelSerializer):
    """
    Serializer for Sign Up purposes.\n 
    Contains confirm_password field, that's ommitted from DB.
    """
    confirm_password = serializers.CharField(max_length=128)

    class Meta:
        model = get_user_model()
        fields = ('id', 'email', 'username', 'password', 'confirm_password', 'remember_me')
        extra_kwargs = {
            'password': {'write_only': True},
            'confirm_password': {'write_only': True},
        }
    
    def validate(self, attrs):
        password = attrs.get('password')
        confirm_password = attrs.get('confirm_password')
        if password == confirm_password:
            return super().validate(attrs) 
        return serializers.ValidationError({'confirm_password': 'Two password fields don\'t match.'})

    def create(self, validated_data):
        validated_data.pop('confirm_password') # since DB doesn't contain confirm_password field -> ommitting it here
        user = get_user_model().objects.create_user(**validated_data)
        return user


class LoginUserSerializer(serializers.ModelSerializer):
    """
    Serializer, that excludes username, confirm_password fields to fit Sign-in form.
    """
    # must override this field, since i use the same db model and email field is unique (while creating a new instance).
    # however this is not the case
    email = serializers.EmailField(max_length=254)

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        try:
            user = get_user_model().objects.filter(email=email).first()
            if not user.check_password(password):
                raise serializers.ValidationError({'password': 'Invalid password. Please, try again.'}, code=401) 
        except (get_user_model().DoesNotExist, AttributeError):
            raise serializers.ValidationError({'email': 'User with following email does not exist.'}, code=404)
        
        attrs['user'] = user
        return attrs

    class Meta:
        model = get_user_model()
        fields = ('id', 'email', 'password', 'remember_me')