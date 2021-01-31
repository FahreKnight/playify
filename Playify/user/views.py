from django.http.response import HttpResponse
from django.shortcuts import render,redirect
from .forms import ProfileForm, RegisterForm,LoginForm,SettingsForm
from django.contrib import messages
from django.contrib.auth.models import AnonymousUser, User
from django.contrib.auth import login,authenticate,logout
from .models import Profile
import sys, os
sys.path.insert(0, os.path.abspath('..article.models'))
from article.models import Article

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
    if not request.user.is_authenticated:
        return render(request,"404.html")
    u_form = SettingsForm()
    article = Article.objects.filter(author = request.user)
    context = {
        'u_form': u_form,
        'articles': article

    }
    return render(request,"user_profile.html",context)

def profilesettings(request):
    if not request.user.is_authenticated:
        return render(request,"404.html")
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

def get_user_profile(request, username):
    loggeduser = request.user
    if not loggeduser.is_authenticated:
        return render(request,"404.html")
    loggedprofile = Profile.objects.get(user=loggeduser)
    if User.objects.filter(username=username).exists():
        user = User.objects.get(username=username)
        article = Article.objects.filter(author = user)
        viewedprofile = user.profile
        isSame = (loggedprofile==viewedprofile)
        if viewedprofile.user in loggedprofile.following.all():
            follow = True
        else:
            follow = False
        if request.method == 'POST':
            if follow==True:
                loggedprofile.following.remove(viewedprofile.user)
            else:
                loggedprofile.following.add(viewedprofile.user)
            if viewedprofile.user in loggedprofile.following.all():
                follow = True
            else:
                follow = False
            return render(request, "user_profile.html", {"user":user,"articles":article,"follow":follow,"isSame":isSame})
        return render(request, "user_profile.html", {"user":user,"articles":article,"follow":follow,"isSame":isSame})
    return render(request,"404.html")

def following(request,username):
     if User.objects.filter(username=username).exists():
        user = User.objects.get(username=username)
        following = [user for user in user.profile.following.filter()]
        followers = Profile.objects.filter(following=user)
        n = 0
        for f in following:
            n= n+1
        return render(request,"following.html",{"following":following,"n":n,"followers":followers})
