from . import *
from user.auth import LoginAuthenticate

# 服务器
class ServiceAPI(GenericAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    authentication_classes = [LoginAuthenticate]

    def get(self, request, id=None):
        '服务器列表'
        return self.retrieve(request)

    def post(self, request):
        '添加服务器'
        return self.create(request)

# 服务器操作
class OperationService(GenericAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    authentication_classes = [LoginAuthenticate]


    def get(self, request, id):
        '查询指定服务器'
        return self.retrieve(request, id)

    def patch(self, request, id):
        '修改指定服务器'
        return self.update(request, id)

    def delete(self, request, id):
        '删除指定服务器'
        return self.destroy(request, id)