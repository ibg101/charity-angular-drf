import json
from json.decoder import JSONDecodeError
from urllib.parse import parse_qs
from typing import Union, Dict

from ..expiry_token_auth import ExpiryTokenAuthentication
from ..serializers.simple_serializers import RememberMeSerializer


def get_id_or_email(data) -> Union[Dict[str, int | str], None]:
    '''
    Helper function, that returns User ID or EMAIL Dictionaries, if they exist in request. Otherwise -> None\n
    Note! If both, ID and EMAIL keys exist - returns only ID !
    '''
    id: Union[int, None] = data['id'] if 'id' in data else None
    email: Union[str, None] = data['email'] if 'email' in data else None
    if id:
        return {'id': id}
    elif email:
        return {'email': email}
    return None

def define_token_expiry(request, serializer=None):
    """
    Provide Serializer with Remember me field, if it doesn\'t contain complex validation logic.\n
    Otherwise - keep it blank 
    to provide validation via RememberMeSerializer. Recommended to keep Serializer argument None.
    """
    if request.method == 'POST':
        try:
            parsed_body = json.loads(request.body)
        except JSONDecodeError as err:
            raw_data: bytes = request.body
            decoded_data = raw_data.decode('utf-8')
            parsed_body = parse_qs(decoded_data)    

        try:
            if not serializer:
                # for better performance use this
                remember_me = parsed_body['remember_me']
                data = {'remember_me': remember_me}
                serializer = RememberMeSerializer(data=data)
            else:
                serializer = serializer(data=parsed_body)
            # cant use raise_exception=True, since it produces a bug that prevents invoking exception_handler
            if serializer.is_valid():
                if serializer.validated_data['remember_me']:
                    ExpiryTokenAuthentication.expiry_date = 12
        except KeyError as err:
            pass