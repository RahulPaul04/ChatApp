from django.db import models

# Create your models here.


class User(models.Model):
    phone_number = models.CharField(max_length=10, unique=True)
    

    def __str__(self):
        return self.phone_number
    
class Message(models.Model):
    message_id = models.AutoField(primary_key=True)
    sender_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages')
    receiver_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_messages')
    timestamp = models.DateTimeField(auto_now_add=True)
    content = models.TextField()
    message_received = models.BooleanField(default=False)
    

    def __str__(self):
        return f"Message {self.message_id} from {self.sender_id.phone_number} to {self.receiver_id.phone_number}: {self.content}"
