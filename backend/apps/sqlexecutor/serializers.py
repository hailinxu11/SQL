from rest_framework import serializers
from .models import *



class ServiceSerializer(serializers.ModelSerializer):
    create_time = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", required=False, read_only=True)

    class Meta:
        model = Service
        fields = "__all__"

class GroupSerializer(serializers.ModelSerializer):
    create_time = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", required=False, read_only=True)

    class Meta:
        model = Group
        fields = "__all__"

class FilesSetSerializer(serializers.ModelSerializer):
    create_time = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", required=False, read_only=True)
    group_name = serializers.CharField(source='group.name', allow_null=True)

    class Meta:
        model = Files
        fields = ('id', 'index', 'file_name', 'project', 'file_url', 'create_time', 'group_id', 'group_name')

class FilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Files
        fields = '__all__'

