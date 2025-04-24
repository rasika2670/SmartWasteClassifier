from flask import Flask, request, jsonify
from flask_cors import CORS
from model.classifier import classify_image
from model.waste_mapper import map_to_waste_category

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests from your React Native app

@app.route('/classify', methods=['POST'])
def classify():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    file = request.files['image']
    
    # Check if the file is a valid image (optional validation)
    if not file.mimetype.startswith('image/'):
        return jsonify({'error': 'Invalid image file'}), 400
    
    # Read image bytes and classify
    image_bytes = file.read()
    label = classify_image(image_bytes)
    
    # Map the predicted label to a waste category
    category, method = map_to_waste_category(label)

    # Debug: print the backend result for verification
    print(f"Label: {label}, Category: {category}, Disposal Method: {method}")

    # Return classification results
    return jsonify({
        "predicted_label": label,
        "category": category,
        "disposal_method": method
    })

if __name__ == "__main__":
    # Run the Flask app on 0.0.0.0 to make it accessible from other devices on the same network
    app.run(debug=True, host="0.0.0.0", port=5000)
