from rest_framework.views import APIView
from django.http import JsonResponse, FileResponse
from jira_html.serializers import *
from user.auth import *
from jira_html.Html import *
from django.utils.encoding import escape_uri_path

# 生成新文件的下载
class FileAPIView(APIView):
    authentication_classes = [LoginAuthenticate]

    # 查询文件列表
    def get(self, request):
        '生成文件列表'
        files = File.objects.all()
        ser_obj = DataSerializer(files, many=True)
        result = Result().resultData(ser_obj.data)
        return JsonResponse(result)

    # 下载文件
    def put(self, request, id):
        '下载生成文件'
        file = File.objects.filter(id=id).first()
        if file:
            file_name = file.name
            response = FileResponse(open(file.path, 'rb'))
            response['Content-Type'] = 'application/octet-stream'
            response['Content-Disposition'] = "attachment;filename*=UTF-8''{}".format(escape_uri_path(file_name))
            return response
        else:
            result = Result().error('下载文件不存在')
            return JsonResponse(result)

    # 删除文件
    def delete(self, request, id):
        file = File.objects.filter(id=id).first()
        if file:
            # 服务器删除文件
            if(os.path.exists(file.path)):
                os.remove(file.path)
            file.delete()
            result = Result().successful('删除成功')
        else:
            result = Result().error('删除失败')
        return JsonResponse(result)