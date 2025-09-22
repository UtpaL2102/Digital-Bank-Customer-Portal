FROM python:3.10-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
ENV PORT=5001
ENV HOST=0.0.0.0
EXPOSE 5001
CMD ["uvicorn", "app.main:app", "--host", "${HOST}", "--port", "${PORT}", "--reload"]