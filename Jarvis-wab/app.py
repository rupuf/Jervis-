from flask import Flask, render_template, request, jsonify
import os
import openai

app = Flask(__name__)

# Load API key from environment variable
openai.api_key = os.getenv("OPENAI_API_KEY")

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/ask", methods=["POST"])
def ask():
    try:
        user_input = request.json.get("message")
        
        # OpenAI completion
        response = openai.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "Tum Jarvis ho, ek AI assistant jo Hindi aur English dono bol sakta hai."},
                {"role": "user", "content": user_input}
            ]
        )

        answer = response.choices[0].message.content
        return jsonify({"reply": answer})
    
    except Exception as e:
        return jsonify({"reply": f"Error: {str(e)}"})

if __name__ == "__main__":
    app.run(debug=True)
