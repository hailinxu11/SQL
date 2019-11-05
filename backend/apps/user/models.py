from django.db import models
from django.utils import timezone

# 创建用户类
class Users(models.Model):
    number = models.CharField(max_length=30, unique=True, verbose_name='登录账号')
    name = models.CharField(max_length=30, verbose_name='昵称')
    password = models.CharField(max_length=100, verbose_name='密码')
    create_time = models.DateTimeField(default=timezone.now, verbose_name='创建时间')
    isActive = models.BooleanField(default=True, verbose_name='是否激活')

    class Meta:
        db_table = 'user_users'

# 创建token类
class UserToken(models.Model):
    user = models.OneToOneField('Users', on_delete=models.CASCADE)
    token = models.CharField(max_length=100)

    class Meta:
        db_table = 'user_token'
