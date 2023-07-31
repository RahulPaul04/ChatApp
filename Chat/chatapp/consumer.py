from channels.generic.websocket import WebsocketConsumer
import json

def SendMessage(message,sender,reciever):
    connection = connected_cliets[reciever]
    msg = {
        "message":message,
        "sender":sender
    }
    connection.send(json.dumps(msg))


connected_cliets = {}
class ChatConsumer(WebsocketConsumer):
    def connect(self):

        number = self.scope['query_string'].decode('utf-8')
        print(number)
        li = number.split("=")
        print(li[1])
        connected_cliets[int(li[1])] = self
        print(connected_cliets)
        self.accept()

    def disconnect(self, code):
        number = self.scope['query_string'].decode('utf-8')
        if number in connected_cliets:
            del connected_cliets[number]

    def receive(self,text_data):
        text = json.loads(text_data)
        message = text["message"]
        sender = text["sender"]
        reciever = text["receiver"]
        SendMessage(message,sender,reciever)


