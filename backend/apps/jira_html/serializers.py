from rest_framework import serializers
from .models import *

class EpicSerializer(serializers.ModelSerializer):
    create_time = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", required=False, read_only=True)


    class Meta:
        model = Epic
        fields = "__all__"

class StorySerializer(serializers.ModelSerializer):
    create_time = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", required=False, read_only=True)


    class Meta:
        model = Story
        fields = "__all__"

class FileSeroalizer(serializers.ModelSerializer):
    create_time = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", required=False, read_only=True)


    class Meat:
        model = File
        fields = "__all__"

class DataSerializer(serializers.ModelSerializer):
    create_time = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", required=False, read_only=True)


    class Meta:
        model = Data
        fields = "__all__"
