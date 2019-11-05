'''sql文件下载'''

import gitlab
import os
import toml

name = os.path.abspath('apps/sqlexecutor/config.toml')
data = toml.load(name)

class OnlineUpdate:
    # 初始化
    def __init__(self):
        # 服务器地址
        self.url = data['url']
        # 前面生成的Access Token
        self.accessToken = data['token']

    # 登录
    def login(self):
        gl = gitlab.Gitlab(self.url, self.accessToken)
        return gl

    # 获得项目
    def getProject(self, projectName):
        gl = self.login()
        project = gl.projects.get(projectName)
        return project

    # 获得project下单个文件
    def getContent(self, projectName, path):
        try:
            project = self.getProject(projectName)
            f = project.files.get(file_path=path, ref='develop')
        except Exception as e:
            print(e)
            return "未找到对应项目"
        else:
            # 获得文件
            #         # 第一次decode获得bytes格式的内容
            content = f.decode()
            # 第二次decode获得str
            cons = content.decode()
            return cons

    # 克隆项目代码
    def clone(self, name):
        projects = self.login()
        for pro in projects:
            if pro.name == name:
                # 获取代码仓库地址
                git_url = pro.http_url_to_repo
                # 拉取代码至指定路径
                Repo.clone_from(git_url, path)
                # 拉取代码
                # subprocess.call(['git', 'clone', git_url])
