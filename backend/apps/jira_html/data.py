'''抓取csv数据'''
import csv
import os
import requests
import json
import collections
from .models import *



# 获取索取值的下标
def index(csv_path):
    data = []
    with open(csv_path, encoding='utf-8') as csvred:
        reader = csv.reader(csvred)
        for row in reader:
            if row[0] == '概要':
                data.append(row.index('问题关键字'))
                data.append(row.index('概要'))
                data.append(row.index('模块'))
                data.append(row.index('描述'))
                data.append(row.index('自定义字段(Epic Link)'))
                data.append(row.index('自定义字段(Story Points)'))
                data.append(row.index('自定义字段(Epic Name)'))
    return data


# 生成epic数据列表
def StoryList(csv_path, data_id):
    nummber = 0
    # 获取索引对象
    indexes = index(csv_path)
    storyList = []
    with open(csv_path, encoding='utf-8') as csvred:
        reader = csv.reader(csvred)
        # 设置i 为最后一条数据的id值加1
        key = Story.objects.values('id').last()
        if key:
            i = key['id'] + 1
        else:
            i = 1
        for row in reader:
            if row[0] != '概要' and "Epic" not in row:
                number = row[indexes[0]]
                name = row[indexes[1]]
                if row[indexes[3]] != '':
                    d = row[indexes[3]].split('详细：')
                    desc = d[0].split('描述：')[1]
                    detail = d[1]
                else:
                    desc = ''
                    detail = ''
                e_number = row[indexes[4]]
                epic = Epic.objects.filter(number=e_number, data_id=data_id).first()
                if row[indexes[5]] == '':
                    time = '未预估'
                else:
                    time = int(float(row[indexes[5]]))
                    nummber += int(float(row[indexes[5]]))
                storyList.append(Story(i, number, name, epic.module, desc, detail, time, epic.id))
                i += 1
    csvred.close()
    Story.objects.bulk_create(storyList)


# 生成story数据列表
def EpicList(csv_path, fileName):
    indexes = index(csv_path)
    # 根据文件名字获取对象
    data = Data.objects.filter(name=fileName).first()
    epicList = []
    with open(csv_path, encoding='utf-8') as csvred:
        reader = csv.reader(csvred)
        # 设置i 为最后一条数据的id值加1
        key = Epic.objects.values('id').last()
        if key: # 不为空时
            i = key['id'] + 1
        else:
            i = 1
        for row in reader:
            if row[0] != '概要' and "Epic" in row:
                number = row[indexes[0]]
                name = row[indexes[1]]
                e_name = row[indexes[6]]
                if row[indexes[2]] == '':
                    module = '未定义'
                else:
                    module = row[indexes[2]]
                epicList.append(Epic(i, number, name, module, e_name, data.id))
                i += 1
    # 关闭csv文件
    csvred.close()
    # 插入数据
    Epic.objects.bulk_create(epicList)
    # 返回源数据的id
    return data.id

# 模拟登陆JIA获取cookie
def loginJIA():
    url = 'http://182.151.43.82:6060/rest/gadget/1.0/login'
    data = {'os_username': 'xuhailin', 'os_password': '12345678'}
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'User-Agent': 'Mozilla / 5.0(Macintosh;IntelMacOSX10_15_0) AppleWebKit \
        /537.36(KHTML, likeGecko) Chrome / 76.0.3809.132Safari / 537.36'
    }
    response = requests.post(url, headers=headers, data=data)
    if response.status_code != 200:
        return "500"
    else:
        cookies = requests.utils.dict_from_cookiejar(response.cookies)
        return cookies


# 获取详情面熟html
def obtainHtml(data, cookies):
    url = 'http://182.151.43.82:6060/rest/api/1.0/render'
    data = {
        "rendererType": "atlassian-wiki-renderer",
        "unrenderedMarkup": data,
        "forWysiwyg": True,
        "issueKey": "TOUR-94",
        "formToken": "undefined"
    }
    headers = {
        "Content-Type": "application/json"
    }
    response = requests.post(url=url, headers=headers, data=json.dumps(data), cookies=cookies)
    return response.text


# 将详细内容转为html
def htmlList(data_id):
    maps = {}
    maps = collections.OrderedDict()  # 将普通字典转为有序字典
    epics = Epic.objects.filter(data_id=data_id).all()
    cookies = loginJIA()
    if cookies == "500":
        maps['code'] = 500
    else:
        for epic in epics:
            data = epic.story.all().values_list('number', 'detail')
            for d in data:
                text = obtainHtml(d[1], cookies)
                maps[d[0]] = text
    return maps

# 组装html需要的数据
def codeList(data_id):
    maps = {}
    maps = collections.OrderedDict()  # 将普通字典转为有序字典
    # 获取data_id中的第一个对象
    epic = Epic.objects.filter(data_id=data_id).first()
    epic_id = epic.id
    # 根据源数据id获取modules
    modules = Epic.objects.filter(data_id=data_id).values_list('module').distinct()
    # modules = Epic.objects.values_list('module').distinct()
    for module in modules:
        story = Story.objects.filter(module=module[0], epic_id__gte=epic_id)
        code = []
        for s in story:
            code2 = []
            code2.append(s.number)
            code2.append(s.name)
            code2.append(s.desc)
            code2.append(s.time)
            code2.append(s.epic.e_name)
            code.append(code2)
        maps[module[0]] = code
    return maps


# 获取html目录数据数据
def dataList(data_id):
    code = []
    # storys = Story.objects.all()
    epics = Epic.objects.filter(data_id=data_id).all()
    for epic in epics:
        storys = epic.story.all()
        for story in storys:
            code2 = []
            code2.append(story.number)
            code2.append(story.name)
            code2.append(story.time)
            code2.append(story.photo)
            code2.append(story.epic.e_name)
            code.append(code2)
    return code

# 组装word需要的数据
def wordList(data_id):
    maps = {} # 大字典
    maps = collections.OrderedDict()  # 将普通字典转为有序字典
    # 获取data_id中的第一个对象
    epic = Epic.objects.filter(data_id=data_id).first()
    epic_id = epic.id
    modules = Epic.objects.filter(data_id=data_id).values_list('module').distinct()
    for module in modules:
        code = []
        story = Story.objects.filter(module=module[0],epic_id__gte=epic_id)
        for s in story:
            code2 = []
            code2.append(s.epic.name)
            code2.append(s.name)
            code2.append(s.desc)
            code.append(code2)
        maps[module[0]] = code
    return maps



