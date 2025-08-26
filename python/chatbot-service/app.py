from fastapi import FastAPI, Query
from typing import List, Optional

app = FastAPI()

@app.get("/healthz")
def healthz():
    return {"status": "ok"}

@app.get("/faqs")
def faqs(category: Optional[str] = None, q: Optional[str] = None):
    return {"faqs": []}

@app.post("/chat/ask")
def chat_ask(question: str):
    return {"answer": "This is a stubbed response.", "confidence": 0.99}

@app.get("/chat/logs")
def chat_logs():
    return {"logs": []}
