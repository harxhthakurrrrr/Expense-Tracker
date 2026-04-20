# 💰 AI Expense Tracker - Advanced Financial Management

Yeh ek modern aur intelligent **Expense Tracker** application hai jo aapke daily kharchon ko manage karne mein madad karta hai. Isme AI ka use kiya gaya hai taaki user ko manual kaam kam karna pade.

## 🚀 Key Features (Kya-Kya Karta Hai?)

### 1. 🤖 AI Smart Categorization
- **Feature**: Jab aap expense ka title likhte hain (jaise "Dominos" ya "Petrol"), toh **Claude AI** automatically pehchan leta hai ki yeh "Food" hai ya "Transport".
- **Benefit**: Manual category select karne ki zaroorat nahi padti.

### 2. 🌍 Multi-Language Support (Hindi & English)
- **Feature**: Isme **English** aur **Hindi** dono ka support hai. 
- **Hindi Kyu?**: Taaki har koi, chahe woh English mein comfortable ho ya Hindi mein, is app ko aasani se use kar sake. Flags ke saath ek mast Language Switcher diya gaya hai.

### 3. 🔔 Budget Alert System
- **Feature**: Har category ka ek monthly budget set hai. Jab kharcha budget ke **80%** se upar chala jaata hai, toh UI mein red color ki warning aati hai.
- **Benefit**: Aapko pata chal jayega kab kharcha kam karna hai.

### 4. 📊 Export to CSV (Download Report)
- **Feature**: Ek click mein saari expenses ko **CSV file** mein download kar sakte hain.
- **Benefit**: Monthly report banaane aur data backup ke liye best hai.

### 5. ✨ Premium UI/UX
- **Feature**: Isme **GSAP** use kiya gaya hai animations ke liye aur **Tailwind CSS** modern Glassmorphism design ke liye.
- **Benefit**: App dekhne mein college project se kahi zyada professional lagta hai.

## 🛠 Tech Stack (Kisse Bana Hai?)
- **Frontend**: React.js (Vite)
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Animations**: GSAP (GreenSock)
- **AI**: Anthropic Claude API
- **Internationalization**: i18next (React-i18next)
- **Icons**: Lucide React

## ⚙️ Setup Instructions (Kaise Chalaayein?)

1. **Clone the project**:
   ```bash
   git clone <your-repo-url>
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Root folder mein `.env` file banaayein aur apni API key daalein:
   ```env
   VITE_ANTHROPIC_API_KEY=your_claude_api_key
   ```

4. **Run the Project**:
   ```bash
   npm run dev
   ```

## 📝 Resume Points
- Integrated **Anthropic Claude API** for real-time intelligent expense auto-categorization.
- Implemented **Internationalization (i18n)** supporting English and Hindi.
- Built a **Budget Monitoring System** with automated threshold alerts.
- Developed a **Data Export Utility** to generate financial reports in CSV format.

---
Banaaya Gaya Hai **Harsh Thakur** ke dwara! 🚀
