# Create your views here.
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from django.http import JsonResponse, Http404
from user.serializers import *
from user.models import *
import datetime
from user.auth import *


# 用户登录
class UserLogin(APIView):
    '''post:用户登录'''

    def post(self, request):
        number = request.data.get('number')
        password = request.data.get('password')
        password = get_password(password)
        # 密码加密
        user = Users.objects.filter(number=number, password=password).first()
        if user:
            token = get_token(number)
            UserToken.objects.update_or_create(user=user, defaults={'token': token})
            result = Result().login_result('登录成功', number, token)
        else:
            result = Result().error('用户名或密码错误')
        return JsonResponse(result)



# 增删改查通用类
class GenericAPIView(APIView):
    queryset = None

    def get_queryset(self):
        return self.queryset.all()

    def get_serializer(self, *args, **kwargs):
        return UserGetSerializer(*args, **kwargs)

    def post_serializer(self, *args, **kwargs):
        return UserPostSerializer(*args, **kwargs)

    # 查询
    def retrieve(self, request, id=None):
        if not id:
            queryset = self.get_queryset()
            ser_obj = self.get_serializer(queryset, many=True)
            result = Result().resultData(ser_obj.data)
        else:
            user_obj = self.get_queryset().filter(id=id).first()
            if user_obj: # 不为空时
                ser_obj = self.get_serializer(user_obj)
                result = Result().resultData(ser_obj.data)
            else:
                result = Result().error('查询用户不存在')
        return Response(result)

    # 创建
    def create(self, request):
        data = request.data
        password = get_password(data['password'])
        data['password'] = password
        ser_obj = self.post_serializer(data=data)
        if ser_obj.is_valid():
            ser_obj.save()
            result = Result().successful('添加用户成功')
            return JsonResponse(result)
        else:
            result = Result().error('用户已存在')
            return JsonResponse(result)

    # 修改
    def update(self, request, id):
        user_obj = self.get_queryset().filter(id=id).first()
        try:
            password = get_password(request.data['password'])
            request.data['password'] = password
        except:
            pass
        finally:
            ser_obj = self.post_serializer(user_obj, data=request.data, partial=True)
            if ser_obj.is_valid() and user_obj:
                ser_obj.save()
                result = Result().successful('用户修改成功')
                return JsonResponse(result)
            else:
                result = Result().error('请求错误', ser_obj.errors)
                return JsonResponse(result)


    # 删除
    def destroy(self, request, id):
        result = Result.result()
        user_obj = self.get_queryset().filter(id=id).first()
        if user_obj:
            user_obj.delete()
            result = Result().successful("删除用户成功")
            return JsonResponse(result)
        else:
            result = Result().error("删除对象不存在")
            return JsonResponse(result)


class UserList(GenericAPIView):
    queryset = Users.objects.all()
    authentication_classes = [LoginAuthenticate]


    def get(self, request):
        '用户列表'
        return self.retrieve(request)

    def post(self, request):
        '添加用户'
        return self.create(request)




class OperationUser(GenericAPIView):
    queryset = Users.objects.all()
    authentication_classes = [LoginAuthenticate]

    def get(self, request, id):
        '查询指定用户信息'
        return self.retrieve(request, id)

    def patch(self, request, id):
        '修改用户信息'
        return self.update(request, id)

    def delete(self, request, id):
        '删除指定用户'
        return self.destroy(request, id)