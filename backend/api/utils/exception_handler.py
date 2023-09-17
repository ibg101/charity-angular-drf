from rest_framework import serializers
from rest_framework.views import exception_handler


def handler(exc, context):
  response = exception_handler(exc, context)

  # USE serializers.ValidationError from DRF instead of Django's ValidationError 
  if isinstance(exc, serializers.ValidationError):
    error_response = {
      'error': 'Validation Error',
      'detail': str(exc.detail),
    }

    # replacing html api response to json response
    response.data = error_response
  
  return response