# File: Chatbot-service/Dockerfile
FROM python:3.10-slim AS base
WORKDIR /app

# install build deps (if any Python packages need compilation)
RUN apt-get update && apt-get install -y build-essential gcc --no-install-recommends && rm -rf /var/lib/apt/lists/*

COPY Chatbot-service/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY Chatbot-service/ .

ENV PYTHONUNBUFFERED=1
ENV HOST=0.0.0.0
ENV PORT=8000
EXPOSE 8000

# Production: do NOT use --reload
# If your entry module is app.main:app (per your uvicorn usage), use this:
CMD ["gunicorn", "-k", "uvicorn.workers.UvicornWorker", "app.main:app", "--bind", "0.0.0.0:8000", "--workers", "2", "--timeout", "120"]
# If you prefer uvicorn directly:
# CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "1"]
