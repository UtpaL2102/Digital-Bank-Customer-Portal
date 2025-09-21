# app/services/kb_search.py
import os
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Load knowledge base once
KB_PATH = os.path.join(os.getcwd(), "bank_knowledge.txt")

if os.path.exists(KB_PATH):
    with open(KB_PATH, "r", encoding="utf-8") as f:
        KB_DOCS = [line.strip() for line in f if line.strip()]
else:
    KB_DOCS = ["No knowledge base found."]

# Build TF-IDF
vectorizer = TfidfVectorizer()
KB_EMBEDDINGS = vectorizer.fit_transform(KB_DOCS)

def search_knowledgebase(query: str, top_k: int = 2) -> str:
    """
    Given a user query, return the top_k most relevant chunks from the knowledge base.
    """
    try:
        query_vec = vectorizer.transform([query])
        scores = cosine_similarity(query_vec, KB_EMBEDDINGS).flatten()
        top_indices = scores.argsort()[-top_k:][::-1]
        results = [KB_DOCS[i] for i in top_indices if scores[i] > 0]
        if not results:
            return "No relevant information found in knowledge base."
        return "\n".join(results)
    except Exception as e:
        return f"Knowledge search failed: {e}"
