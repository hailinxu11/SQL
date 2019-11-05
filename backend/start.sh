#!/bin/bash
#命令只执行最后一个,所以用 &&

PID_FILE=".pid" &&
python3 manage.py makemigrations &&
python3 manage.py migrate
PID=$!
echo "-  Started server successful"
echo "-  PID:$PID"
