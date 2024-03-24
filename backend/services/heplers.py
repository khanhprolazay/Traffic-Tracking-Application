import requests 
from config import WARP10_URL, WRITE_TOKEN, READ_TOKEN

def create_headers(token: str):
    return { "X-Warp10-Token": token }

def post(data: str):
    headers = create_headers(WRITE_TOKEN)
    response = requests.post(WARP10_URL, headers=headers, data=data)
    return response