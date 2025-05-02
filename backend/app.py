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
        return jsonify({'error': 'Invalid file type'}), 400

    try:
        image_bytes = file.read()
        prediction = classify_image(image_bytes)  # Replace with your image classification function
        waste_category, disposal_method = map_to_waste_category(prediction)
        return jsonify({
            'predicted_label': prediction,
            'category': waste_category,
            'disposal_method': disposal_method
        })
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)  # Listen on all interfaces
