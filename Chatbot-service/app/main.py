# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import chatbot

app = FastAPI(title="Bank Chatbot API with KB")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# include chatbot routes without /api/v1 prefix since it's handled by proxy
app.include_router(chatbot.router)

@app.get("/")
def root():
    return {"message": "Chatbot Service is running, You can Try sending Post requests now"}
