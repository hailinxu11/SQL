from . import *
from user.auth import LoginAuthenticate


# 文件
class FilesAPI(GenericAPIView):
    queryset = Files.objects.all()
    serializer_class = FilesSetSerializer
    authentication_classes = [LoginAuthenticate]

    def get(self, request):
        g_id = request.query_params['g_id']
        if g_id:
            obj = Files.objects.filter(group_id=g_id)
            if obj:  # 不为空时
                ser_obj = FilesSetSerializer (obj, many=True)
                result = Result().resultData(ser_obj.data)
            else:
                result = Result().successful('查询对象不存在')
        else:
            obj = self.get_queryset()
            ser_obj = self.get_serializer(obj, many=True)
            result = Result().resultData(ser_obj.data)
        return JsonResponse(result)

    def post(self, request):
        '添加文件'
        return self.create(request)

# 文件操作
class OperationFiles(GenericAPIView):
    queryset = Files.objects.all()
    serializer_class = FilesSerializer
    authentication_classes = [LoginAuthenticate]

    def get(self, request, id):
        return self.retrieve(request, id)

    def patch(self, request, id):
        '修改指定文件'
        return self.update(request, id)

    def delete(self, request, id):
        '删除指定文件'
        return self.destroy(request, id)


# sql文件下载至本地
from sqlexecutor.download import *
# 文件下载路径
bashir  = os.path.dirname(os.path.dirname(__file__))
class Download(APIView):
    authentication_classes = [LoginAuthenticate]

    def post(self, request):
        '下载SQL文件'
        g_id = str(request.data['g_id'])
        # 下载文件全路径
        fileName = g_id + '.sql'
        upload_path = os.path.join(bashir, 'static/files', fileName)
        try:
            # 查询分组下的所有文件并根据index排序
            fileList = Group.objects.filter(id=g_id).first().files.order_by('index')
        except Exception as e:
            result = Result().error('分组不存在', str(e))
            return JsonResponse(result)
        if fileList:
            Group.objects.filter(id=g_id).update(url=upload_path)
            for file in fileList:
                path = file.file_url + file.file_name
                try:
                    down = OnlineUpdate()
                    code = down.getContent(file.project, path)
                except Exception as e:
                    result = Result().error('解码出错', str(e))
                    return JsonResponse(result)
                else:
                    if code != '未找到对应项目':
                        with open(upload_path, 'a')as f:
                            f.write(code)
                            f.write('\n')
                        f.close()
                        result = Result().successful('文件下载成功')
                    else:
                        result = Result().error(code)
                    return JsonResponse(result)
        else:
            result = Result().error('下载文件不存在')
            return JsonResponse(result)


# sql文件执行
from sqlexecutor.execute import *
class Execute(APIView):
    authentication_classes = [LoginAuthenticate]

    def post(self, request, id=None):
        '执行SQL文件'
        try:
            s_id = str(request.data['s_id'])
            g_id = str(request.data['g_id'])
        except Exception as e:
            result = Result().error("未传数据", str(e))
            return JsonResponse(result)
        else:
            ser = Service.objects.get(id=s_id)
            group = Group.objects.get(id=g_id)
            msg = Setmysql(ser.service_ip, ser.username, ser.password, ser.database)
            try:
                msg.ExecSql(group.url)
                result = Result().successful("sql文件执行成功")
            except Exception as e:
                result = Result().error('请求错误错误' ,str(e))
            return JsonResponse(result)
