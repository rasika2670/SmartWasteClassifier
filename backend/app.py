from flask import Flask, request, jsonify
from flask_cors import CORS
from model.classifier import classify_image
from model.waste_mapper import map_to_waste_category

app = Flask(__name__)
CORS(app)  # Allow CORS for React Native requests

@app.route('/classify', methods=['POST'])
def classify():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    file = request.files['image']

    # Optional: Validate image MIME type
    if not file.mimetype.startswith('image/'):
        return jsonify({'error': 'Invalid image file'}), 400

    try:
        image_bytes = file.read()
        label = classify_image(image_bytes)
        category, method = map_to_waste_category(label)

        print(f"[DEBUG] Label: {label}, Category: {category}, Disposal Method: {method}")

        return jsonify({
            "predicted_label": label,
            "category": category,
            "disposal_method": method
        })

    except Exception as e:
        print(f"[ERROR] Classification failed: {e}")
        return jsonify({'error': 'Classification failed'}), 500

if __name__ == "__main__":
    # Run on all interfaces for LAN access
    app.run(debug=True, host="0.0.0.0", port=5000)
