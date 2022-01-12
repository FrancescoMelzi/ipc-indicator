import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyCyl0G1Ymdyi4Ra_OHFPBxouj_45noW3io",
  authDomain: "gbmipc.firebaseapp.com",
  projectId: "gbmipc",
  storageBucket: "gbmipc.appspot.com",
  messagingSenderId: "935067650530",
  appId: "1:935067650530:web:dfde3c69ca0810bd6ed1bb",
  measurementId: "G-E70PYKB8W5"
}

const initApp = () => {
  initializeApp(firebaseConfig);
};

export default initApp;