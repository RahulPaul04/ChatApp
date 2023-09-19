from channels.generic.websocket import WebsocketConsumer
import json
from .models import User,Message

def SendMessage(message,sender,reciever):

    sender_id = User.objects.get(phone_number=sender)
    receiver_id = User.objects.get(phone_number = reciever)
    new_message = Message(sender_id=sender_id,
                          receiver_id=receiver_id,
                          content=message,
                          message_received=False)
    try:
        connection = connected_cliets[reciever]
        msg = {
            "message":message,
            "sender":sender
        }
    
        connection.send(json.dumps(msg))
        new_message.message_received = True
        print("message send to",reciever)
    except KeyError:
        print("User Not Connected")    

    new_message.save()
    

    
    


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
        print("New CLient Connected",number)
        re_id = User.objects.get(phone_number=int(li[1]))
        messages = Message.objects.filter(receiver_id=re_id.id,message_received=False)
        print(messages)
        for message in messages:
            content = message.content
            print(type(message.sender_id.phone_number))
            print(type(content))
            msg = {
                "message":content,
                "sender":message.sender_id.phone_number
            }
            
            self.send(json.dumps(msg))
            message.message_received = True
            message.save()
            print("send message",msg)

    def disconnect(self, code):
        number = self.scope['query_string'].decode('utf-8')
        if number in connected_cliets:
            del connected_cliets[number]
            print(number,"Disconnected")

    def receive(self,text_data):
        text = json.loads(text_data)
        message = text["message"]
        sender = text["sender"]
        reciever = text["receiver"]
        
        SendMessage(message,sender,reciever)


