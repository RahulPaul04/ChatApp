from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.urls import reverse


# Create your views here.
from .models import User

    


def login_view(request):
    if request.method == "POST":
        num = request.POST['number']
        if User.objects.filter(phone_number = int(num)).exists():
            return render(request,"chat/chats.html",{
                "number":num
            })
        else:
            return render(request,"chat/login.html",{
                "message":"User Does not Exist"
            })
    else:
        return render(request,"chat/login.html")

    
