FROM python:3.12-slim
WORKDIR /chub
COPY . .
# using psycopg2-binary so no libpq-dev/build-essential required
RUN apt-get update && apt-get install -y \
    iputils-ping \
    curl \        
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --upgrade pip && pip install --no-cache -r requirements.txt
COPY requirements.txt .
RUN pip install --upgrade pip && pip install --no-cache -r requirements.txt

EXPOSE 8000
CMD ["python3", "index.py"]