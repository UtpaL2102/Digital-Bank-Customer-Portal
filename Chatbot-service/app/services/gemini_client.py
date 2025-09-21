import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")
MODEL_NAME = os.getenv("GEMINI_MODEL", "models/gemini-1.5-pro-latest")

genai.configure(api_key=API_KEY)

model = genai.GenerativeModel(MODEL_NAME)

def ask_gemini(prompt: str) -> str:
    if not API_KEY:
        return "Gemini API key missing."

    try:
        print(f"DEBUG: Using model {MODEL_NAME} with prompt: {prompt}")
        model = genai.GenerativeModel(MODEL_NAME)
        resp = model.generate_content(prompt)

        # Show full response for debugging
        print("DEBUG: Raw Gemini response:", resp)

        if hasattr(resp, "text") and resp.text:
            return resp.text
        return str(resp)

    except Exception as e:
        import traceback
        print("DEBUG: Gemini call failed!")
        traceback.print_exc()
        return "Sorry, I couldn’t connect to Gemini right now."

