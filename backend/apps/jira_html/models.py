from django.db import models
from django.utils import timezone

# Create your models here.

# epic实体类
class Story(models.Model):
    number = models.CharField(max_length=30, verbose_name="story编号")
    name = models.CharField(max_length=30, verbose_name="名称")
    module = models.CharField(max_length=30, verbose_name="模块")
    desc = models.TextField(verbose_name="详情")
    detail = models.TextField(verbose_name="描述")
    time = models.CharField(max_length=20, verbose_name="计划时间")
    epic = models.ForeignKey('Epic', on_delete=models.CASCADE, related_name='story')
    photo = models.CharField(max_length=50, default="无")
    create_time = models.DateTimeField(default=timezone.now, verbose_name='创建时间')


    class Meta:
        db_table = 'jira_story'

# 故事点实体类
class Epic(models.Model):
    number = models.CharField(max_length=30, verbose_name="epic编号")
    name = models.CharField(max_length=30, verbose_name="名称")
    module = models.CharField(max_length=30, verbose_name="模块")
    e_name = models.CharField(max_length=20, verbose_name="epic名称")
    data = models.ForeignKey('Data', related_name='epic')
    create_time = models.DateTimeField(default=timezone.now, verbose_name='创建时间')

    class Meta:
        db_table = 'jira_epic'


# 生成文件实体类
class File(models.Model):
    name = models.CharField(max_length=50, verbose_name="文件名")
    path = models.CharField(max_length=100, verbose_name="文件路径")
    file_type = models.CharField(max_length=10, verbose_name="文件类型")
    create_time = models.DateTimeField(default=timezone.now, verbose_name='创建时间')

    class Meta:
        db_table = 'jira_file'


# 原数据实体类
class Data(models.Model):
    name = models.CharField(max_length=50,verbose_name="数据名称")
    path = models.CharField(max_length=100, verbose_name="数据路径")
    create_time = models.DateTimeField(default=timezone.now, verbose_name='创建时间')

    class Meta:
        db_table = 'jira_data'