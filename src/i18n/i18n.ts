import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "navbar": {
        "title": "Expense",
        "tracker": "Tracker",
        "premium": "Premium Account"
      },
      "summary": {
        "balance": "Total Balance",
        "expenses": "Total Expenses",
        "filtered": "Filtered Balance",
        "budget_used": "Budget Used",
        "growth": "Growth Rate",
        "trend": "Trend Analysis"
      },
      "form": {
        "title": "Add Expense",
        "label_title": "Title",
        "placeholder_title": "What did you spend on?",
        "label_amount": "Amount",
        "label_category": "Category",
        "select_category": "Select",
        "label_date": "Date",
        "label_note": "Note (Optional)",
        "placeholder_note": "Add some details...",
        "button_save": "Save Expense"
      },
      "list": {
        "title": "Recent Expenses",
        "placeholder_search": "Search expenses...",
        "no_data": "No expenses found.",
        "add_first": "Add your first expense to get started!",
        "download": "Download Report"
      },
      "charts": {
        "daily": "Daily Spending",
        "last_7": "Last 7 Days",
        "mix": "Category Mix",
        "distribution": "Distribution"
      },
      "categories": {
        "Food": "Food",
        "Transport": "Transport",
        "Shopping": "Shopping",
        "Entertainment": "Entertainment",
        "Bills": "Bills",
        "Other": "Other"
      },
      "footer": "Built with React & GSAP"
    }
  },
  hi: {
    translation: {
      "navbar": {
        "title": "खर्च",
        "tracker": "ट्रैकर",
        "premium": "प्रीमियम अकाउंट"
      },
      "summary": {
        "balance": "कुल शेष",
        "expenses": "कुल खर्च",
        "filtered": "फ़िल्टर किया हुआ शेष",
        "budget_used": "बजट का उपयोग",
        "growth": "विकास दर",
        "trend": "रुझान विश्लेषण"
      },
      "form": {
        "title": "खर्च जोड़ें",
        "label_title": "शीर्षक",
        "placeholder_title": "आपने किस पर खर्च किया?",
        "label_amount": "रकम",
        "label_category": "श्रेणी",
        "select_category": "चुनें",
        "label_date": "तारीख",
        "label_note": "नोट (वैकल्पिक)",
        "placeholder_note": "कुछ विवरण जोड़ें...",
        "button_save": "खर्च सहेजें"
      },
      "list": {
        "title": "हाल के खर्च",
        "placeholder_search": "खर्च खोजें...",
        "no_data": "कोई खर्च नहीं मिला।",
        "add_first": "शुरू करने के लिए अपना पहला खर्च जोड़ें!",
        "download": "रिपोर्ट डाउनलोड करें"
      },
      "charts": {
        "daily": "दैनिक खर्च",
        "last_7": "पिछले 7 दिन",
        "mix": "श्रेणी मिश्रण",
        "distribution": "वितरण"
      },
      "categories": {
        "Food": "भोजन",
        "Transport": "परिवहन",
        "Shopping": "खरीदारी",
        "Entertainment": "मनोरंजन",
        "Bills": "बिल",
        "Other": "अन्य"
      },
      "footer": "React और GSAP के साथ बनाया गया"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
