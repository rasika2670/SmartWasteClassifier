from flask import Flask, request, jsonify
from model.classifier import classify_image
from model.waste_mapper import map_to_waste_category

app = Flask(__name__)

@app.route('/classify', methods=['POST'])
def classify():
    file = request.files['image']
    image_bytes = file.read()
    label = classify_image(image_bytes)
    category, method = map_to_waste_category(label)
    return jsonify({
        "predicted_label": label,
        "waste_type": category,
        "disposal_method": method
    })

if __name__ == "__main__":
    app.run(debug=True)
