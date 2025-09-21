from dotenv import load_dotenv
import os, traceback
import sys
sys.stdout.reconfigure(line_buffering=True)
load_dotenv()  # load .env file
key = os.getenv("GEMINI_API_KEY")
print("Key present?", bool(key))
if key:
    print("First 8 chars:", key[:8])

try:
    import google.generativeai as genai
    genai.configure(api_key=key)
    print("Calling list_models() ...")
    models = genai.list_models()
    print("Available models:")
    for m in models:
        try:
            name = getattr(m, "name", None) or getattr(m, "id", None) or str(m)
            print(" -", name)
        except Exception:
            print(" -", m)
except Exception:
    traceback.print_exc()
