from django.utils import timezone

from rest_framework import exceptions
from rest_framework.authentication import TokenAuthentication


class ExpiryTokenAuthentication(TokenAuthentication):
    """
    Extended TokenAuthentication Class that provides Token expiry proccess.
    """
    def __init__(self) -> None:
        super().__init__()
        self._expiry_date = 1

    @property
    def expiry_date(self):
        return self._expiry_date

    @expiry_date.setter
    def expiry_date(self, value):
        self._expiry_date = value

    def authenticate_credentials(self, key):
        model = self.get_model()    
        try:
            token = model.objects.select_related('user').get(key=key)
        except model.DoesNotExist:
            raise exceptions.AuthenticationFailed('Invalid token.')

        if not token.user.is_active:
            raise exceptions.AuthenticationFailed('User inactive or deleted.')

        expires_in = timezone.now() + timezone.timedelta(days=self.expiry_date)
        if token.created >= expires_in:
            raise exceptions.AuthenticationFailed('Authentication token is expired.')

        return (token.user, token)