from django.conf.urls import url, include
from django.urls import path, include

from rest_framework.routers import DefaultRouter
from problems import views

router = DefaultRouter()
router.register(r'problems', views.ProblemViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
    path('compile/', views.compileHandler, name='compile'),
    path('run/', views.runHandler, name='run')
]
