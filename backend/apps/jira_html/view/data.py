from rest_framework.views import APIView
from django.http import JsonResponse, FileResponse
from jira_html.serializers import *
from user.auth import *
from jira_html.Html import *
from django.utils.encoding import escape_uri_path



# 数据类
class DataAPIView(APIView):
    authentication_classes = [LoginAuthenticate]

    # 查询数据列表
    def get(self, request):
        '数据/模板列表'
        files = Data.objects.all()
        ser_obj = DataSerializer(files, many=True)
        result = Result().resultData(ser_obj.data)
        return JsonResponse(result)


    # 上传文件并,如果是csv文件则提取数据
    def post(self, request):
        '上传数据/模板'
        basdir = os.path.dirname(os.path.dirname(__file__))
        upload_file = request.FILES.get('file', None)
        file_name = upload_file.name.split('.')[-1]
        newFile = os.path.join(basdir, 'static/data', upload_file.name)
        # 将data路径存入数据库中(get_or_create避免产生重复数据)
        data = Data.objects.get_or_create(name=upload_file.name, path=newFile)
        # 如果重复上传提示文件存在
        if data[1] == False:
            result = Result().error('文件已存在请勿重复上传')
        # 否则上传文件
        else:
            with open(newFile, 'wb+') as desc:
                for chunk in upload_file.chunks():
                    desc.write(chunk)
                desc.close()
            result = Result().successful('文件上传成功')
            # 如果是csv文件
            if file_name == 'csv':
                # 先插入数据至epic表中
                try:
                    # 插入epic数据并返回data_id
                    data_id = EpicList(newFile, upload_file.name)
                    # 插入story数据
                    StoryList(newFile, data_id)
                except Exception as e:
                    result = Result().error('插入数据错误', str(e))
        return JsonResponse(result)

# 数据下载
class OperationData(APIView):
    authentication_classes = [LoginAuthenticate]

    # 下载文件
    def put(self, request, id):
        '下载数据/模板'
        file = Data.objects.filter(id=id).first()
        if file:
            file_name = file.name
            fileOpen = open(file.path, 'rb')
            response = FileResponse(fileOpen)
            response['Content-Type'] = 'application/octet-stream'
            response['Content-Disposition'] = "attachment;filename*=UTF-8''{}".format(escape_uri_path(file_name))
            return response
        else:
            result = Result().error('下载文件不存在')
            return JsonResponse(result)

    # 删除文件
    def delete(self, request, id):
        data = Data.objects.filter(id=id).first()
        if data:
            # 服务器删除文件
            if(os.path.exists(data.path)):
                os.remove(data.path)
            data.delete()
            result = Result().successful('删除成功')
        else:
            result = Result().error('删除失败')
        return JsonResponse(result)


# 生成html文件
class HtmlAPIIView(APIView):
    authentication_classes = [LoginAuthenticate]

    def get(self, request, id):
        '生成html文件'
        file = Data.objects.filter(id=id).first()
        if file:
            try:
                create_index_html(id)
            except Exception as e:
                result = Result().error('登录jira失败！', str(e))
            else:
                result = Result().successful('HTML文件生成完毕')
        else:
            result = Result().error('源文件不存在')
        return JsonResponse(result)

# 生成word文件
class WordAPIView(APIView):
    authentication_classes = [LoginAuthenticate]

    def get(self, request, id):
        '生成word文件'
        file = Data.objects.filter(id=id).first()
        if file:
            try:
                write_to_word(id)
            except Exception as e:
                result = Result().error('生成word文件失败', str(e))
                return JsonResponse(result)
            result = Result().successful('word文件生成完毕')
        else:
            result = Result().error('源文件不存在')
        return JsonResponse(result)
