FROM python:3.6
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY pip.conf /root/.pip/pip.conf
COPY start.sh /usr/src/app/
COPY requirements.txt /usr/src/app/
RUN pip install -r /usr/src/app/requirements.txt
RUN rm -rf /usr/src/app
COPY . /usr/src/app
WORKDIR /usr/src/app
CMD ["/bin/sh", "start.sh"]
CMD ["python3", "manage.py", "runserver", "0.0.0.0:6064"]