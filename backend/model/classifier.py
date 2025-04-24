from transformers import AutoProcessor, AutoModelForImageClassification
from PIL import Image
import torch
import io

# Load pre-trained model and processor
model_name = "google/vit-base-patch16-224"
model = AutoModelForImageClassification.from_pretrained(model_name)
processor = AutoProcessor.from_pretrained(model_name)

def classify_image(image_bytes):
    try:
        # Convert byte stream to image
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        
        # Preprocess the image
        inputs = processor(images=image, return_tensors="pt")
        
        # Perform inference
        outputs = model(**inputs)
        logits = outputs.logits
        
        # Get the predicted class
        predicted_class_idx = logits.argmax(-1).item()
        label = model.config.id2label[predicted_class_idx]
        
        return label

    except Exception as e:
        print(f"[ERROR] Classification failed: {e}")
        return "Unknown"
