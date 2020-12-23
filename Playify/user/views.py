from django.http.response import HttpResponse
from django.shortcuts import render,redirect
from .forms import ProfileForm, RegisterForm,LoginForm,SettingsForm
from django.contrib import messages
from django.contrib.auth.models import User
from django.contrib.auth import login,authenticate,logout
from .models import Profile



# Create your views here.

def register(request):

    form = RegisterForm(request.POST or None)
    if form.is_valid():
        username = form.cleaned_data.get("username")
        password = form.cleaned_data.get("password")

##        test_user = authenticate(username = username)
##
##       if test_user is not None:
##           messages.info(request,"This Username already Taken")
##           return render(request,"register.html",context)
##
     
        newUser = User(username = username)
        newUser.set_password(password)

        newUser.save()

        
        #newProfile = Profile(username = username, password = password)
        
        login(request,newUser)
        messages.success(request,"Sign Up Successfully...")

        return redirect("index")
    context = {
            "form" : form
        }
    return render(request,"register.html",context)

    
    
def loginUser(request):
    form = LoginForm(request.POST or None)

    context = {
        "form":form
    }

    if form.is_valid():
        username = form.cleaned_data.get("username")
        password = form.cleaned_data.get("password")

        user = authenticate(username = username,password = password)

        if user is None:
            messages.info(request,"Wrong Username or Password")
            return render(request,"login.html",context)

        messages.success(request,"Login Successfully")
        login(request,user)
        return redirect("index")
    return render(request,"login.html",context)
    
def logoutUser(request):
    logout(request)
    messages.success(request,"Logout Successfully")
    return redirect("index")

def profile(request):
    u_form = SettingsForm()

    context = {
        'u_form': u_form

    }
    return render(request,"profile.html",context)

def profilesettings(request):
    if request.method == 'POST':
        u_form = SettingsForm(request.POST, instance=request.user)
        p_form = ProfileForm(request.POST, files=request.FILES, instance=request.user.profile)
        if u_form.is_valid() and p_form.is_valid():
            u_form.save()
            p_form.save()
            messages.success(request, f'Your account has been updated!')

            return render(request,"profilesettings.html")

    else:
        u_form = SettingsForm(instance=request.user)
        p_form = ProfileForm(instance=request.user.profile)

    context = {
        'u_form': u_form,
        'p_form': p_form
    }
    return render(request,"profilesettings.html",context)

