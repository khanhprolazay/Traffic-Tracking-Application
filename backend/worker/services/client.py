# from confluent_kafka import Producer
# from .config import ConfigService
# import json
# import requests
# import jwt
# from time import time
# import logging
# import functools
# import argparse

# configService = ConfigService()
# ssoServer = configService.get("SSO_SERVER")
# clientId = configService.get("CLIENT_ID")
# clientSecret = configService.get("CLIENT_SECRET")

# def requestAccessToken():
#   url = f"{ssoServer}/protocol/openid-connect/token"
#   headers = {
#     "Content-Type": "application/x-www-form-urlencoded"
#   }
#   data = {
#     "grant_type": "client_credentials",
#     "client_id": clientId,
#     "client_secret": clientSecret
#   }
#   response = requests.post(url, headers=headers, data=data)
#   if response.status_code == 200:
#     return response.json()['access_token']
#   else:
#     raise Exception("Failed to get access token")

# def isTokenExpried(accessToken):
#   try:
#     decode = jwt.decode(accessToken)
#     return True if decode['exp'] < time() - 10 else False
#   except:
#     return True
  
# def producer_config():
#   return {
#       'bootstrap.servers': configService.get('BOOTSTRAP_SERVERS'),
#       'security.protocol': 'sasl_plaintext',
#       'sasl.mechanisms': 'OAUTHBEARER',
#       # sasl.oauthbearer.config can be used to pass argument to your oauth_cb
#       # It is not used in this example since we are passing all the arguments
#       # from command line
#       # 'sasl.oauthbearer.config': 'not-used',
#       'oauth_cb': functools.partial(requestAccessToken()),
#   }

