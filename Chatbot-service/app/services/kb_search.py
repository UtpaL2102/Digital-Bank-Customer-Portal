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

def search_knowledgebase(query: str, top_k: int = 2) -> dict:
    """
    Given a user query, return the top_k most relevant chunks from the knowledge base.
    Returns a dictionary with text, similarity_score, and has_matches fields.
    """
    try:
        query_vec = vectorizer.transform([query])
        scores = cosine_similarity(query_vec, KB_EMBEDDINGS).flatten()
        top_indices = scores.argsort()[-top_k:][::-1]
        
        # Get the highest score for confidence calculation
        max_score = scores[top_indices[0]] if len(top_indices) > 0 else 0.0
        
        results = [KB_DOCS[i] for i in top_indices if scores[i] > 0.1]  # Minimum threshold
        
        if not results:
            return {
                "text": "No relevant information found in knowledge base.",
                "similarity_score": 0.3,
                "has_matches": False
            }
        
        return {
            "text": "\n".join(results),
            "similarity_score": min(max_score, 0.95),  # Cap at 95% to avoid overconfidence
            "has_matches": True
        }
    except Exception as e:
        return {
            "text": f"Knowledge search failed: {e}",
            "similarity_score": 0.3,
            "has_matches": False
        }
