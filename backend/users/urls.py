from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework.authtoken import views as authviews
from . import views

appname = 'users'

urlpatterns = [
    url(r'^register/$', views.UserCreateView.as_view(), name='register user'),
    url(r'^login/$', authviews.obtain_auth_token, name='authenticate')

]

urlpatterns = format_suffix_patterns(urlpatterns)
