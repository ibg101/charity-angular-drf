import json
from typing import Union, Dict

from .expiry_token_auth import ExpiryTokenAuthentication


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

def define_token_expiry(request, serializer):
    if request.method == 'POST':
        parsed_body = json.loads(request.body)
        serializer = serializer(data=parsed_body)
        # cant use raise_exception=True, since it produces a bug that prevents invoking exception_handler
        if serializer.is_valid():
            if serializer.validated_data['remember_me']:
                ExpiryTokenAuthentication.expiry_date = 12