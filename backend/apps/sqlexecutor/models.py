from django.db import models
from django.utils import timezone


# 创建服务器类
class Service(models.Model):
    name = models.CharField(max_length=30, unique=True, verbose_name='服务器名称')
    service_ip = models.CharField(max_length=100, verbose_name='服务器ip')
    username = models.CharField(max_length=30, verbose_name='数据库用户')
    password = models.CharField(max_length=30, verbose_name='数据库密码')
    port = models.CharField(max_length=30, verbose_name='数据库端口号')
    database = models.CharField(max_length=30, verbose_name='数据库库名')
    create_time = models.DateTimeField(default=timezone.now, verbose_name='创建时间')
    isActive = models.BooleanField(default=True, verbose_name='是否激活')

    class Meta:
        db_table = 'sql_service'


# 创建文件分组
class Group(models.Model):
    name = models.CharField(max_length=30, unique=True, verbose_name='分组名称')
    url = models.CharField(max_length=100, null=True, verbose_name='下载文件路由')
    create_time = models.DateTimeField(default=timezone.now, verbose_name='创建时间')
    update_time = models.DateTimeField(auto_now=True, verbose_name='更新时间')

    class Meta:
        db_table = 'sql_group'


# 创建文件类
class Files(models.Model):
    index = models.IntegerField(verbose_name='执行顺序')
    file_name = models.CharField(max_length=100, verbose_name='文件名称')
    project = models.CharField(max_length=100, verbose_name='项目名称')
    file_url = models.CharField(max_length=100, verbose_name='文件路由')
    create_time = models.DateTimeField(default=timezone.now, verbose_name='创建时间')
    group = models.ForeignKey('Group', on_delete=models.CASCADE, related_name='files')

    class Meta:
        db_table = 'sql_files'
