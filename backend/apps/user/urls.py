from django.conf.urls import url
from user import views


urlpatterns = [
    url(r'^login/$', views.UserLogin.as_view()),
    url(r'^list/$', views.UserList.as_view()),
    url(r'^operation/(?P<id>\d+)/$', views.OperationUser.as_view()),
]