from rest_framework import serializers
from rest_framework.views import exception_handler
from rest_framework.exceptions import ErrorDetail

def handler(exc, context):
  response = exception_handler(exc, context)

  # USE serializers.ValidationError from DRF instead of Django's ValidationError 
  if isinstance(exc, serializers.ValidationError):
    for details_raw in exc.detail.values():
      detail_raw: ErrorDetail = details_raw[0]
      detail = detail_raw.title()
      if detail_raw.code != 'unique':
        status_code = detail_raw.code
      else:
        status_code = 409 # if unique, then explicitly raise 409

    error_response = {
      'detail': detail,
    }

    # replacing html api response to json response
    response.data = error_response
    response.status_code = status_code
  
  return response