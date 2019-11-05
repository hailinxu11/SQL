from rest_framework import serializers
from .models import *


class UserGetSerializer(serializers.ModelSerializer):
    create_time = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", required=False, read_only=True)

    class Meta:
        model = Users
        fields = ['id', 'number', 'name', 'create_time']

class UserPostSerializer(serializers.ModelSerializer):
    create_time = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", required=False, read_only=True)

    class Meta:
        model = Users
        fields = ['id', 'number', 'name', 'password', 'create_time']

class UserLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['number', 'password']

