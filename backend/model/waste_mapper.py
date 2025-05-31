def map_to_waste_category(label):
    label = label.lower()
    
    # Biodegradable Waste
    if any(word in label for word in ['banana', 'apple', 'food', 'peel', 'vegetable', 'fruit', 'leaves', 'tea bag', 'coffee grounds', 'bread']):
        return "Biodegradable", "Dispose in compost bin"
    
    # Recyclable - Plastic
    elif any(word in label for word in ['plastic', 'bottle', 'bag', 'straw', 'container', 'wrap', 'cup', 'cap']):
        return "Recyclable - Plastic", "Dispose in plastic recycling bin"
    
    # Recyclable - Metal
    elif any(word in label for word in ['metal', 'can', 'foil', 'screw', 'aluminum', 'tin', 'iron']):
        return "Recyclable - Metal", "Dispose in metal bin"
    
    # Recyclable - Paper
    elif any(word in label for word in ['paper', 'book', 'magazine', 'envelope', 'cardboard', 'newspaper', 'notebook', 'post-it', 'paper towel', 'wrapping paper', 'binder']):
        return "Recyclable - Paper", "Dispose in paper bin"
    
    # Recyclable - Glass
    elif any(word in label for word in ['glass', 'jar', 'bottle', 'cup', 'container']):
        return "Recyclable - Glass", "Dispose in glass recycling bin"
    
    # Hazardous Waste (E-waste)
    elif any(word in label for word in ['battery','hard disk', 'hard disc', 'electronics', 'lightbulb', 'mobile', 'cellphone', 'charger', 'circuit board', 'tv', 'computer', 'laptop', 'remote']):
        return "Hazardous Waste", "Send to e-waste recycling center"
    
    # Recyclable - Textiles (Clothing)
    elif any(word in label for word in ['t-shirt', 'jersey', 'shirt', 'pants', 'jacket', 'sweater', 'shoes', 'jeans', 'clothing', 'sarong','fabric', 'overskirt']):
        return "Recyclable - Textiles", "Donate or recycle in textile bin"
    
    # Electronic Waste (small devices)
    elif any(word in label for word in ['charger', 'headphones', 'earphones', 'adapter', 'keyboard', 'mouse', 'monitor', 'tv', 'tablet']):
        return "Hazardous Waste - Electronics", "Send to e-waste recycling center"
    
    # Recyclable - Batteries
    elif any(word in label for word in ['lithium', 'rechargeable', 'alkaline', 'battery', 'car battery']):
        return "Recyclable - Batteries", "Dispose in special battery recycling bin"
    
    # Recyclable - Cartons
    elif any(word in label for word in ['milk carton', 'juice carton', 'carton', 'tetra pak']):
        return "Recyclable - Cartons", "Dispose in carton recycling bin"
    
    # General Waste
    else:
        return "General Waste", "Dispose in general waste bin"

