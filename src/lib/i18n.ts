import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      home: 'Home',
      map: 'CFR Atlas',
      dashboard: 'Dashboard',
      feedback: 'Report Issue',
      iot: 'IoT Monitor',
      chat: 'AI Assistant',
      docs: 'Documents',
      login: 'Login',
      logout: 'Logout',
      
      // Hero
      heroTitle: 'Empowering Tribal Communities Through Digital Forest Rights Management',
      heroSubtitle: 'Track your Community Forest Resources, monitor land health with IoT sensors, and connect with forest officers — all in your language.',
      viewDashboard: 'View Your Land Dashboard',
      reportIssue: 'Report an Issue',
      
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
      home: 'होम',
      map: 'सीएफआर एटलस',
      dashboard: 'डैशबोर्ड',
      feedback: 'समस्या रिपोर्ट करें',
      iot: 'आईओटी मॉनिटर',
      chat: 'एआई सहायक',
      docs: 'दस्तावेज़',
      login: 'लॉग इन करें',
      logout: 'लॉग आउट',
      
      heroTitle: 'डिजिटल वन अधिकार प्रबंधन के माध्यम से आदिवासी समुदायों को सशक्त बनाना',
      heroSubtitle: 'अपने सामुदायिक वन संसाधनों को ट्रैक करें, आईओटी सेंसर के साथ भूमि स्वास्थ्य की निगरानी करें, और वन अधिकारियों से जुड़ें - सभी आपकी भाषा में।',
      viewDashboard: 'अपना भूमि डैशबोर्ड देखें',
      reportIssue: 'समस्या रिपोर्ट करें',
      
      madhyaPradesh: 'मध्य प्रदेश',
      odisha: 'ओडिशा',
      tripura: 'त्रिपुरा',
      telangana: 'तेलंगाना',
      
      submit: 'जमा करें',
      cancel: 'रद्द करें',
      save: 'सहेजें',
      delete: 'हटाएं',
      edit: 'संपादित करें',
      loading: 'लोड हो रहा है...',
      error: 'त्रुटि',
      success: 'सफलता',
    }
  },
  te: {
    translation: {
      home: 'హోమ్',
      map: 'CFR అట్లాస్',
      dashboard: 'డాష్‌బోర్డ్',
      feedback: 'సమస్యను నివేదించండి',
      iot: 'IoT మానిటర్',
      chat: 'AI అసిస్టెంట్',
      docs: 'పత్రాలు',
      login: 'లాగిన్',
      logout: 'లాగ్అవుట్',
      
      heroTitle: 'డిజిటల్ అటవీ హక్కుల నిర్వహణ ద్వారా గిరిజన సమాజాలను శక్తివంతం చేయడం',
      heroSubtitle: 'మీ కమ్యూనిటీ అటవీ వనరులను ట్రాక్ చేయండి, IoT సెన్సార్లతో భూమి ఆరోగ్యాన్ని పర్యవేక్షించండి మరియు అటవీ అధికారులతో కనెక్ట్ అవ్వండి — అన్నీ మీ భాషలో.',
      viewDashboard: 'మీ భూమి డాష్‌బోర్డ్ చూడండి',
      reportIssue: 'సమస్యను నివేదించండి',
      
      madhyaPradesh: 'మధ్యప్రదేశ్',
      odisha: 'ఒడిశా',
      tripura: 'త్రిపుర',
      telangana: 'తెలంగాణ',
      
      submit: 'సమర్పించు',
      cancel: 'రద్దు చేయి',
      save: 'సేవ్ చేయి',
      delete: 'తొలగించు',
      edit: 'సవరించు',
      loading: 'లోడ్ అవుతోంది...',
      error: 'లోపం',
      success: 'విజయం',
    }
  },
  or: {
    translation: {
      home: 'ହୋମ୍',
      map: 'CFR ଆଟ୍ଲାସ୍',
      dashboard: 'ଡ୍ୟାସବୋର୍ଡ',
      feedback: 'ସମସ୍ୟା ରିପୋର୍ଟ କରନ୍ତୁ',
      iot: 'IoT ମନିଟର',
      chat: 'AI ସହାୟକ',
      docs: 'ଡକ୍ୟୁମେଣ୍ଟ',
      login: 'ଲଗଇନ୍',
      logout: 'ଲଗଆଉଟ୍',
      
      madhyaPradesh: 'ମଧ୍ୟ ପ୍ରଦେଶ',
      odisha: 'ଓଡ଼ିଶା',
      tripura: 'ତ୍ରିପୁରା',
      telangana: 'ତେଲେଙ୍ଗାନା',
    }
  },
  bn: {
    translation: {
      home: 'হোম',
      map: 'CFR অ্যাটলাস',
      dashboard: 'ড্যাশবোর্ড',
      feedback: 'সমস্যা রিপোর্ট করুন',
      iot: 'IoT মনিটর',
      chat: 'AI সহায়ক',
      docs: 'নথি',
      login: 'লগইন',
      logout: 'লগ আউট',
      
      madhyaPradesh: 'মধ্য প্রদেশ',
      odisha: 'ওড়িশা',
      tripura: 'ত্রিপুরা',
      telangana: 'তেলেঙ্গানা',
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
