#!/c/Users/chris/.windows-build-tools/python27/python
import requests

def GET_CONFIG():
    url = "https://friendover.daily.co/"
    headers = {"authorization": "Bearer df261218037500729cdac61661314544617ca031dcd44880f07f6ca6cf737108"}
    response = requests.request("GET", url, headers=headers)
    print(response.text)

def POST_CONFIG():
    url = "https://friendover.daily.co/"
    headers = {
    "content-type": "application/json",
    "authorization": "Bearer df261218037500729cdac61661314544617ca031dcd44880f07f6ca6cf737108"
    }
    response = requests.request("POST",url,headers=headers)
    print(response.text)

def LIST_ROOMS(limit):
    url = "https://friendover.daily.co/rooms/"
    querystring = {"limit":"{limit}"}
    headers = {"authorization": "Bearer df261218037500729cdac61661314544617ca031dcd44880f07f6ca6cf737108"}
    response = requests.request("GET", url, headers=headers, params=querystring)
    print(response.text)

def CREATE_ROOM(name):
    url = "https://friendover.daily.co/rooms/{name}/"
    payload = {"name": "chrisroom"}
    headers = {
    "content-type": "application/json",
    "authorization": "Bearer df261218037500729cdac61661314544617ca031dcd44880f07f6ca6cf737108"
    }
    response = requests.request("POST",url,json=payload,headers=headers)
    print(response.text)

def GET_INFO(room_name):
    url = "https://friendover.daily.co/rooms/{room_name}/"
    headers = {"authorization": "Bearer df261218037500729cdac61661314544617ca031dcd44880f07f6ca6cf737108"}
    response = requests.request("GET", url, headers=headers)
    print(response.text)

def ROOM_CONFIG(room_name):
    url = "https://friendover.daily.co/rooms/{room_name}/"
    headers = {
    "content-type": "application/json",
    "authorization": "Bearer df261218037500729cdac61661314544617ca031dcd44880f07f6ca6cf737108"
    }
    response = requests.request("POST",url,headers=headers)
    print(response.text)

def DELETE_ROOM(room_name):
    url = "https://friendover.daily.co/rooms/{room_name}/"
    headers = {"authorization": "Bearer df261218037500729cdac61661314544617ca031dcd44880f07f6ca6cf737108"}
    response = requests.request("DELETE", url, headers=headers)
    print(response.text)

