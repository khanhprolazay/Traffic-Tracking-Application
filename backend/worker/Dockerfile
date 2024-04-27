FROM python:3.8

RUN apt-get update -q && apt-get install --no-install-recommends -qy  gcc inetutils-ping && rm -rf /var/lib/apt/lists/*

ADD . /backend/
WORKDIR /backend

ADD requirements.txt /backend/

RUN pip3 install --upgrade pip

RUN pip3 install -r requirements.txt

RUN pip3 install --upgrade urllib3==1.26.15

CMD ./run.sh