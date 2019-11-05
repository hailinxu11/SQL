from django.conf.urls import url
# from sqlexecutor import views
from sqlexecutor.view.service import *
from sqlexecutor.view.group import *
from sqlexecutor.view.file import *


urlpatterns = [
    # 服务器相关url
    url(r'^service/$', ServiceAPI.as_view()),
    url(r'^service/(?P<id>\d+)/$', OperationService.as_view()),


    # 分组相关url
    url(r'^group/$', GroupAPI.as_view()),
    url(r'^group/(?P<id>\d+)/$', OperationGroup.as_view()),


    # 文件相关url
    url(r'^file/$', FilesAPI.as_view()),
    url(r'^file/(?P<id>\d+)/$', OperationFiles.as_view()),
    url(r'^file/download/$', Download.as_view()),
    url(r'^file/execute/$', Execute.as_view()),
]
