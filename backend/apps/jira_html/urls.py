from django.conf.urls import url
# from jira_html import views
from jira_html.view.file import *
from jira_html.view.data import *

urlpatterns = [
    # 源文件相关url
    url(r'^data/$', DataAPIView.as_view()),
    url(r'^data/(?P<id>\d+)/$', OperationData.as_view()),
    url(r'^html/(?P<id>\d+)/$', HtmlAPIIView.as_view()),
    url(r'^word/(?P<id>\d+)/$', WordAPIView.as_view()),



    # 新文件相关url
    url(r'^file/$', FileAPIView.as_view()),
    url(r'^file/(?P<id>\d+)/$', FileAPIView.as_view()),
]