# SmartWasteClassifier

A React Native mobile app that lets users snap or select photos of waste, classifies them via a Hugging Face Vision Transformer model served by a Flask API, and helps users dispose of waste responsibly. Classified results are stored in Firebase Firestore, and users can track their eco-impact over time.

---

## 🚀 Features

- 📸 **Image Classification**  
  • Pick from gallery or take a photo  
  • Sends image to Flask backend for AI classification  
  • Uses a ViT (Vision Transformer) model under the hood  

- ♻️ **Waste Categories & Disposal Tips**  
  • Biodegradable, Recyclable (plastic, paper, metal, glass, cartons, textiles, batteries), Hazardous, E-Waste & General Waste  
  • Clear disposal instructions for each category  

- 🔒 **Authentication**  
  • Firebase Email/Password & Google Sign-In  
  • Secure user sessions  

- 💾 **Data Persistence**  
  • Saves each classification (image URL, category, timestamp, user info) to Firestore  

- 📊 **Impact Dashboard** (coming soon)  
  • Eco-Score, item count, category breakdown  

---

## 📝 Tech Stack

| Layer            | Technology                             |
| ---------------- | -------------------------------------- |
| Mobile App       | React Native 0.78.1, JavaScript (ES6)  |
| Navigation       | React Navigation (Bottom Tabs & Stack) |
| Styling & UI     | Custom components, Vector Icons        |
| Image Picker     | `react-native-image-picker`            |
| State & Network  | Axios                                  |
| Analytics & Chart| `react-native-chart-kit`, `react-native-svg` |
| Backend Service  | Flask + Python, Hugging Face `transformers` |
| Authentication   | Firebase Auth                          |
| Database         | Firebase Firestore                     |
| Continuous Env   | `react-native-dotenv`                  |

---

## 📂 Project Structure

```
SmartWasteClassifier/
├── android/                 # Android native project
├── ios/                     # iOS native project
├── model/                   # (backend) ML model & mapper
│   ├── classifier.py
│   └── waste_mapper.py
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── CustomButton.js
│   │   ├── WasteInfoCard.js
│   │   └── Header.js
│   ├── Camera.js
│   ├── Home.js
│   ├── Profile.js
│   ├── Login.js
│   └── SignUp.js
├── App.js                   # Entry point & navigation
├── package.json
├── .env                     # React Native env variables
└── backend/
    ├── app.py               # Flask server
    └── requirements.txt     # Python deps
```

---

## 🛠 Prerequisites

- **Node.js** ≥ 18  
- **Yarn** or **npm**  
- **Android Studio** / **Xcode** (for emulators)  
- **Python** ≥ 3.8 (for backend)  
- **Firebase project** with Auth & Firestore enabled  

---

## 🔧 Setup & Installation

### 1. Clone the repo
```bash
git clone https://github.com/your-username/SmartWasteClassifier.git
cd SmartWasteClassifier
```

### 2. Mobile App

1. **Install JS dependencies**  
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Create `.env`** in project root (used by `react-native-dotenv`):

   ```env
   # .env
   FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
   FIREBASE_AUTH_DOMAIN=YOUR_PROJECT.firebaseapp.com
   FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
   FIREBASE_STORAGE_BUCKET=YOUR_PROJECT.appspot.com
   FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
   FIREBASE_APP_ID=YOUR_APP_ID
   ```
   
3. **Run on Android**  
   ```bash
   npx react-native run-android
   ```
   
4. **Run on iOS**  
   ```bash
   cd ios && pod install
   cd ..
   npx react-native run-ios
   ```

### 3. Backend (Flask API)

1. **Navigate to backend folder**  
   ```bash
   cd backend
   ```

2. **Create & activate virtualenv**  
   ```bash
   python -m venv venv
   source venv/bin/activate   # macOS/Linux
   venv\Scripts\activate      # Windows
   ```

3. **Install Python dependencies**  
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the Flask server**  
   ```bash
   python app.py
   ```
   The API will listen on `http://0.0.0.0:5000/classify`.

---

## 📱 Usage

1. **Sign Up / Login** via email or Google.
2. **Tap “Camera”** tab to snap or pick a photo.
3. **Wait for classification** (spinner).
4. **View results**: label, category, disposal method.
5. **Tap “Done”** to save to Firestore, or “Retry” to reshoot.
6. **Check “Profile”** for your saved history and eco-score (soon).

---

## 📸 Screenshots

<!--
![Home Screen](./assets/screenshots/home.png)
![Camera Screen](./assets/screenshots/camera.png)
![Profile Screen](./assets/screenshots/profile.png)
-->

---

## 🤝 Contributing

1. Fork this repo  
2. Create a feature branch (`git checkout -b feature/Name`)  
3. Commit your changes (`git commit -m 'Add feature'`)  
4. Push to branch (`git push origin feature/Name`)  
5. Open a Pull Request  

---

## 📄 License

This project is licensed under the **MIT License**.  
See the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements

- 🤗 [Hugging Face Transformers](https://huggingface.co/docs/transformers)  
- 🐍 [Flask](https://flask.palletsprojects.com/)  
- ⚛️ [React Native](https://reactnative.dev/)  
- 🔥 [Firebase](https://firebase.google.com/)  

---

*Happy coding & thank you for making our planet a little greener!* 🌿

