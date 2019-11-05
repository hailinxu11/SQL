from . import *
from user.auth import LoginAuthenticate

# 分组
class GroupAPI(GenericAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    authentication_classes = [LoginAuthenticate]

    def get(self, request, id=None):
        '分组列表'
        return self.retrieve(request)

    def post(self, request):
        '添加分组'
        return self.create(request)


# 分组操作
class OperationGroup(GenericAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    authentication_classes = [LoginAuthenticate]

    def get(self, request, id):
        '查询指定分组'
        return self.retrieve(request, id)

    def patch(self, request, id):
        '修改指定分组'
        return self.update(request, id)

    def delete(self, request, id):
        '删除指定分组'
        return self.destroy(request, id)