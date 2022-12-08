"""config URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path

from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="Dr.Eung API",
        default_version="demo",
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

base_url = 'api/'

urlpatterns = [
    path(base_url + 'admin/', admin.site.urls),
    path(base_url + 'report/',include('report.urls')),
    path(base_url + 'book/', include('book.urls')),
    path(base_url + 'quiz/', include('quiz.urls')),
    path(base_url + '', include('accounts.urls')),
]

urlpatterns += [
    re_path(r'^swagger(?P<format>\.jso\.yaml)$',
            schema_view.without_ui(cache_timeout=0), name="schema-json"),
    re_path(r'^swagger/$', schema_view.with_ui('swagger', 
            cache_timeout=0), name="schema-swagger-ui"),
    re_path(r'^redoc/$', schema_view.with_ui('redoc', 
            cache_timeout=0), name="schema-redoc"),
]
