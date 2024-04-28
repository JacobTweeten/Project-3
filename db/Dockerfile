FROM postgres:15
ENV POSTGRES_PASSWORD=postgres
RUN apt-get update && apt-get install -y curl unzip
RUN curl -o dvdrental.zip https://www.postgresqltutorial.com/wp-content/uploads/2019/05/dvdrental.zip
RUN unzip dvdrental.zip
COPY init.sh /docker-entrypoint-initdb.d/