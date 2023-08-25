from typing import Union, Dict


def get_id_or_username(data) -> Union[Dict[str, int | str], None]:
    '''
    Helper function, that returns User ID or Username Dictionaries, if they exist in request. Otherwise -> None\n
    Note! If both, ID and Username keys exist - returns only ID !
    '''
    id: Union[int, None] = data['id'] if 'id' in data else None
    username: Union[str, None] = data['username'] if 'username' in data else None
    if id:
        return {'id': id}
    elif username:
        return {'username': username}
    return None