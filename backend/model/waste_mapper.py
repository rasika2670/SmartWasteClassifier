def map_to_waste_category(label):
    label = label.lower()
    if any(word in label for word in ['banana', 'apple', 'food', 'peel', 'vegetable', 'fruit']):
        return "Biodegradable", "Dispose in compost bin"
    elif any(word in label for word in ['plastic', 'bottle', 'bag']):
        return "Recyclable - Plastic", "Dispose in plastic recycling bin"
    elif any(word in label for word in ['metal', 'can', 'foil', 'screw']):
        return "Recyclable - Metal", "Dispose in metal bin"
    elif any(word in label for word in ['paper', 'book', 'magazine', 'envelope']):
        return "Recyclable - Paper", "Dispose in paper bin"
    elif any(word in label for word in ['glass', 'jar', 'cup']):
        return "Recyclable - Glass", "Dispose in glass recycling bin"
    elif any(word in label for word in ['battery', 'electronics', 'lightbulb', 'mobile', 'cellphone']):
        return "Hazardous Waste", "Send to e-waste recycling center"
    else:
        return "Unknown", "Check manually or contact waste management"
