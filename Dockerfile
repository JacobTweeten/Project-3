FROM python:latest

WORKDIR /app

COPY . /app

RUN pip install poetry
RUN poetry install

EXPOSE 8000

ENTRYPOINT ["poetry", "run", "uvicorn", "main:app", "--host", "0.0.0.0", "--reload"]
