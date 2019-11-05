from rest_framework.views import APIView
from user.auth import Result
from django.http import JsonResponse
from sqlexecutor.models import *
from sqlexecutor.serializers import *




# 增删改查通用类
class GenericAPIView(APIView):
    queryset = None
    serializer_class = None

    def get_queryset(self):
        return self.queryset.all()

    def get_serializer(self, *args, **kwargs):
        return self.serializer_class(*args, **kwargs)

    # 查询
    def retrieve(self, request, id=None):
        if not id:
            queryset = self.get_queryset()
            ser_obj = self.get_serializer(queryset, many=True)
            result = Result().resultData(ser_obj.data)
        else:
            obj = self.get_queryset().filter(id=id).first()
            if obj: # 不为空时
                ser_obj = self.get_serializer(obj)
                result = Result().resultData(ser_obj.data)
            else:
                result = Result().error('查询对象不存在')
        return JsonResponse(result)

    # 创建
    def create(self, request):
        ser_obj = self.get_serializer(data=request.data)
        if ser_obj.is_valid():
            ser_obj.save()
            result = Result().successful('添加成功')
            return JsonResponse(result)
        else:
            result = Result().error("请求错误", ser_obj.errors)
            return JsonResponse(result)

    # 修改
    def update(self, request, id):
        obj = self.get_queryset().filter(id=id).first()
        data = request.data
        ser_obj = self.get_serializer(obj, data=data, partial=True)
        if ser_obj.is_valid() and obj and data:
            ser_obj.save()
            result = Result().successful('修改成功')
            return JsonResponse(result)
        else:
            result = Result().error('请求错误', ser_obj.data)
            return JsonResponse(result)

    # 删除
    def destroy(self, request, id):
        obj = self.get_queryset().filter(id=id).first()
        if obj:
            obj.delete()
            result = Result().successful("删除成功")
            return JsonResponse(result)
        else:
            result = Result().error("删除对象不存在")
            return JsonResponse(result)