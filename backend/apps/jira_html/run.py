import os

PATH = os.path.dirname(os.path.abspath(__file__))
path = os.path.join(PATH, 'static/data')


def htmlName():
    for file in os.listdir(path):
        if file.split('.')[-1]== 'html':
            print(file)
            return file


def wordName():
    for file in os.listdir(path):
        if file.split('.')[-1]== 'docx':
            print(file)
            return file

