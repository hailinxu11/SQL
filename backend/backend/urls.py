"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin


# from rest_framework.schemas import get_schema_view
# from rest_framework_swagger.renderers import SwaggerUIRenderer, OpenAPIRenderer
# schema_view = get_schema_view(title='API接口文档', renderer_classes=[OpenAPIRenderer, SwaggerUIRenderer])



urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/user/', include('user.urls', namespace='user')),
    url(r'^api/sql/', include('sqlexecutor.urls', namespace='sql')),
    url(r'^api/jira/', include('jira_html.urls', namespace='jira_html')),
    # url(r'^docs', schema_view),# api接口
]
