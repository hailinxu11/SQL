from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from user.models import *
from rest_framework import status



# 检验认证
class LoginAuthenticate(BaseAuthentication):
    def authenticate(self, request):
        # 登录逻辑：如果用户登录了，登录操作产生token，且掐后台同步
        # 登录判断：再次发生请求，没有token代表没登录，错误token代表无效登录
        # 如何将token取出，规定token用请求头传递
        token = request.META.get('HTTP_ACCESS_TOKEN')
        if not token:
            raise AuthenticationFailed('token not is null')
        res = UserToken.objects.filter(token=token).first()
        if res:
            # 认证通过，返货user， token
            return res.user, token
        else:
            result = Result().error("无效token")
            # 验证失败，抛出APIException或自雷对象
            raise  AuthenticationFailed(result)


import hashlib
import time
import datetime

# 生成token
def get_token(name):
    md = hashlib.md5()
    md.update(bytes(str(time.time()), encoding='utf-8'))
    md.update(bytes(name, encoding='utf-8'))
    return md.hexdigest()


# 密码加密
def get_password(password):
    sha1 = hashlib.sha1()
    sha1.update(password.encode('utf-8'))
    return sha1.hexdigest()


# 返回数据
class Result:
    def __init__(self):
        self.res = {
            "code": 1000,
            "msg": None,
            "detail": None,
            "time" : datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        }
    def login_result(self, msg, number, token):
        '''
            msg: 登录提示信息
            number: 登录账号
            token: 登录token
        '''
        self.res['code'] = status.HTTP_200_OK
        self.res['msg'] = msg
        self.res['number'] = number
        self.res['token'] = token
        return self.res


    # 返回正确信息
    def successful(self, msg):
        '''msg: 返回信息'''
        self.res['code'] = status.HTTP_200_OK
        self.res['msg'] = msg
        return self.res

    # 返回数据
    def resultData(self, detail):
        '''detail: 数据信息'''
        self.res['code'] = status.HTTP_200_OK
        self.res['detail'] = detail
        return self.res

    # 返回错误信息
    def error(self, msg, detail=None):
        '''msg: 返回信息，detail: 错误信息'''
        self.res['code'] = status.HTTP_400_BAD_REQUEST
        self.res['msg'] = msg
        self.res['detail'] = detail
        return self.res



















