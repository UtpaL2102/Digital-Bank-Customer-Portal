# app/main.py
from fastapi import FastAPI
from app.routers import chatbot

app = FastAPI(title="Bank Chatbot API with KB")

# include chatbot routes
app.include_router(chatbot.router)

@app.get("/")
def root():
    return {"message": "Chatbot Service is running, You can Try sending Post requests now"}
