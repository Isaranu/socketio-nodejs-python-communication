# Use as client to connect to SOCKET.io sever on Nodejs.
# package : python-socketio v4.6.0
# package : python-engineio v3.14.2

import socketio

sio = socketio.Client()

@sio.event
def connect():
    print('Connected to NODEJS SOCKET server !')

@sio.event
def response(data):
    print('[response] = ', data)
    sio.emit('ai', 'This is AI modules script')

@sio.event
def hstoai(data):
    print('[hstoai] = ', data)
    sio.emit('hstonodejs', 'pong')

@sio.event
def disconnect():
    print('disconnected from server')

sio.connect('http://localhost:5000')
sio.wait()