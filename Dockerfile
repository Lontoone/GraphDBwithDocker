FROM python:3.8.13
LABEL maintainer twtrubiks
ENV PYTHONUNBUFFERED 1
RUN mkdir /docker_api
WORKDIR /docker_api
COPY . /docker_api/
RUN pip install -r requirements.txt

# neuralcoref
#RUN mkdir -p /nutc_gdb/src/
#WORKDIR /docker_api/nutc_gdb/src
#RUN pip uninstall neuralcoref
#RUN git clone https://github.com/huggingface/neuralcoref.git
WORKDIR /docker_api/nutc_gdb/src/neuralcoref
RUN pip install -r requirements.txt
RUN pip install -e .
RUN python setup.py install
RUN python setup.py build

WORKDIR /docker_api
RUN python -m spacy download en
RUN python3 -m spacy download en_core_web_sm

#WORKDIR /nutc_gdb/src/neuralcoref/
#RUN pip install -r /nutc_gdb/src/neuralcoref/requirements.txt
#RUN pip install -e /nutc_gdb/src/neuralcoref/.
#RUN python /nutc_gdb/src/neuralcoref/setup.py install
#RUN python /nutc_gdb/src/neuralcoref/setup.py build


# Run the app.  CMD is required to run on Heroku
# $PORT is set by Heroku
EXPOSE $PORT
CMD python ./nutc_gdb/manage.py runserver 0.0.0.0:$PORT