import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      nav: {
        home: 'Home',
        about: 'About',
        contact: 'Contact',
        dashboard: 'Dashboard',
        login: 'Login',
        logout: 'Logout',
      },
      
      // Hero
      hero: {
        title: 'FRA-Wise Atlas',
        subtitle: 'Empowering Community Forest Rights holders with digital tools for forest management and monitoring',
        getStarted: 'Get Started',
        exploreMap: 'Explore Map',
        feature1: 'Real-Time Mapping',
        feature1Desc: 'Monitor CFR forests across Madhya Pradesh, Telangana, Tripura, and Odisha',
        feature2: 'IoT Integration',
        feature2Desc: 'Track soil, water, and air quality with real-time sensor data',
        feature3: 'Community Support',
        feature3Desc: 'AI chatbot with multilingual support for easy assistance',
      },
      
      // About
      about: {
        title: 'About FRA-Wise Atlas',
        subtitle: 'A comprehensive digital platform for Community Forest Rights management and monitoring',
        feature1: 'Document Digitalization',
        feature1Desc: 'OCR and NER technology to extract Patta holder information, IDs, and land details automatically',
        feature2: 'Mobile Feedback',
        feature2Desc: 'Easy-to-use mobile forms for Patta holders to upload land photos and submit updates with GPS location',
        feature3: 'AI Assistant',
        feature3Desc: 'Multilingual AI chatbot with audio support in Hindi, Telugu, Odia, and Bengali for instant help',
        feature4: 'Real-Time Monitoring',
        feature4Desc: 'IoT sensor integration for monitoring soil health, water quality, and environmental conditions',
      },
      
      // Contact
      contact: {
        title: 'Contact Us',
        subtitle: 'Have questions? We\'re here to help',
        getInTouch: 'Get in Touch',
        email: 'Email',
        phone: 'Phone',
        address: 'Address',
        name: 'Name',
        emailLabel: 'Email',
        message: 'Message',
        send: 'Send Message',
        success: 'Message Sent',
        successDesc: 'We will get back to you soon!',
      },
      
      // Footer
      footer: {
        rights: 'All rights reserved.',
      },
      
      // Intro Modal
      intro: {
        title: 'Welcome to FRA-Wise Atlas',
        p1: 'FRA-Wise Atlas is a comprehensive digital platform designed to empower Community Forest Rights (CFR) holders across India.',
        p2: 'Our platform provides:',
        feature1: 'Real-time satellite mapping of CFR forests',
        feature2: 'IoT sensor integration for environmental monitoring',
        feature3: 'Mobile-friendly feedback and reporting system',
        feature4: 'AI-powered multilingual chatbot assistance',
        feature5: 'Document digitalization with OCR technology',
        feature6: 'Personalized dashboard for Patta holders',
        p3: 'This platform is designed to be simple, accessible, and useful for rural communities while maintaining robust security and data protection.',
        getStarted: 'Get Started',
      },
      
      // FRA Atlas
      fraAtlas: {
        title: 'FRA Atlas',
        subtitle: 'Monitor CFR forests across India',
        allStates: 'All States',
        mp: 'Madhya Pradesh',
        telangana: 'Telangana',
        tripura: 'Tripura',
        odisha: 'Odisha',
        legend: 'CFR Parcels',
        totalParcels: 'Total Parcels',
      },
      
      // DSS
      dss: {
        title: 'Decision Support System',
        subtitle: 'AI-powered insights for forest management',
        aiAnalysis: 'AI Analysis',
        accuracy: 'Prediction accuracy',
        healthScore: 'Forest Health',
        trending: 'Trending upward',
        alerts: 'Active Alerts',
        needsAttention: 'Needs attention',
        recommendations: 'Recommendations',
        actionable: 'Actionable items',
        insights: 'AI-Generated Insights',
        insightsDesc: 'Based on real-time data analysis',
        positive: 'Positive Trend',
        positiveDesc: 'Soil moisture levels have improved by 15% in the last month across monitored areas.',
        warning: 'Warning',
        warningDesc: 'Three sensors in District-A showing declining air quality. Recommend immediate inspection.',
        recommendation: 'Recommendation',
        recommendationDesc: 'Consider increasing irrigation frequency in parcels 101-105 based on current weather patterns.',
      },
      
      // AI Insights
      insights: {
        title: 'AI-Powered Insights',
        subtitle: 'Real-time analysis of your forest data',
        improvement: 'Forest Health Improving',
        improvementDesc: 'Sensor data shows 12% increase in soil moisture and 8% improvement in air quality over the past 30 days.',
        attention: 'Attention Required',
        attentionDesc: '3 parcels showing declining water levels. Consider irrigation or water conservation measures.',
        recommendation: 'AI Recommendation',
        recommendationDesc: 'Based on weather forecasts, consider planning tree plantation activities in the next 2 weeks.',
        alert: 'Critical Alert',
        alertDesc: 'Sensor offline in Sector 4B for 48 hours. Immediate inspection recommended.',
      },
      
      // States
      madhyaPradesh: 'Madhya Pradesh',
      odisha: 'Odisha',
      tripura: 'Tripura',
      telangana: 'Telangana',
      
      // Common
      submit: 'Submit',
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
    }
  },
  hi: {
    translation: {
      nav: {
        home: 'होम',
        about: 'के बारे में',
        contact: 'संपर्क करें',
        dashboard: 'डैशबोर्ड',
        login: 'लॉग इन करें',
        logout: 'लॉग आउट',
      },
      hero: {
        title: 'FRA-Wise Atlas',
        subtitle: 'वन प्रबंधन और निगरानी के लिए डिजिटल उपकरणों के साथ सामुदायिक वन अधिकार धारकों को सशक्त बनाना',
        getStarted: 'शुरू करें',
        exploreMap: 'मानचित्र देखें',
      },
      footer: {
        rights: 'सर्वाधिकार सुरक्षित।',
      },
    }
  },
  te: {
    translation: {
      nav: {
        home: 'హోమ్',
        about: 'గురించి',
        contact: 'సంప్రదించండి',
        dashboard: 'డాష్‌బోర్డ్',
        login: 'లాగిన్',
        logout: 'లాగ్అవుట్',
      },
      hero: {
        title: 'FRA-Wise Atlas',
        subtitle: 'అటవీ నిర్వహణ మరియు పర్యవేక్షణ కోసం డిజిటల్ సాధనాలతో కమ్యూనిటీ అటవీ హక్కుల హోల్డర్‌లను శక్తివంతం చేయడం',
        getStarted: 'ప్రారంభించండి',
        exploreMap: 'మ్యాప్ అన్వేషించండి',
      },
      footer: {
        rights: 'అన్ని హక్కులు రిజర్వ్ చేయబడ్డాయి.',
      },
    }
  },
  or: {
    translation: {
      nav: {
        home: 'ହୋମ୍',
        about: 'ବିଷୟରେ',
        contact: 'ଯୋଗାଯୋଗ',
        dashboard: 'ଡ୍ୟାସବୋର୍ଡ',
        login: 'ଲଗଇନ୍',
        logout: 'ଲଗଆଉଟ୍',
      },
      footer: {
        rights: 'ସମସ୍ତ ଅଧିକାର ସଂରକ୍ଷିତ।',
      },
    }
  },
  bn: {
    translation: {
      nav: {
        home: 'হোম',
        about: 'সম্পর্কে',
        contact: 'যোগাযোগ',
        dashboard: 'ড্যাশবোর্ড',
        login: 'লগইন',
        logout: 'লগ আউট',
      },
      footer: {
        rights: 'সমস্ত অধিকার সংরক্ষিত।',
      },
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
