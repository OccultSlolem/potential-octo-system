import type { FirebaseApp } from 'firebase/app';
import type { Analytics } from 'firebase/analytics';
import { type User, type Auth, connectAuthEmulator } from 'firebase/auth';
import type { FirebasePerformance } from 'firebase/performance';
import type { AppCheck } from 'firebase/app-check';
import { connectStorageEmulator, type FirebaseStorage } from 'firebase/storage';
import { connectFunctionsEmulator, type Functions } from 'firebase/functions';

import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getPerformance } from "firebase/performance";
import { getAuth } from "firebase/auth";
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import { connectFirestoreEmulator, Firestore, getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';

import { firebaseApiKey, recaptchaDebugSiteKey, recaptchaSiteKey } from './Keys'

let app: FirebaseApp;
export let analytics: Analytics;
export let performance: FirebasePerformance;
export let auth: Auth;
export let user: User;
export let appCheck: AppCheck;
export let firestore: Firestore;
export let storage: FirebaseStorage;
export let functions: Functions;

export function initialize() {
  const isLocalHost = (location.hostname == 'localhost' || location.hostname == '127.0.0.1');
  const cookieConsent = JSON.parse(localStorage.getItem('cookie-consent'))
  // Firebase Configuration
  const firebaseConfig = {
    apiKey: (isLocalHost ? firebaseApiKey : process.env.FIREBASE_KEY),
    authDomain: "trilinkt.firebaseapp.com",
    projectId: "trilinkt",
    storageBucket: "trilinkt.appspot.com",
    messagingSenderId: "872437238476",
    appId: "1:872437238476:web:ee4b98357d524050a8d069",
    measurementId: "G-Z7VQD0G0EG"
  };
 
  self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
  app = initializeApp(firebaseConfig)
  auth = getAuth(app);
  analytics = getAnalytics(app);
  firestore = getFirestore(app);
  storage = getStorage(app);
  functions = getFunctions(app);

  if (cookieConsent == null || cookieConsent.value == true) {
    performance = getPerformance(app);
  }

  if (isLocalHost) {
    // Enable emulators on localhost
    connectAuthEmulator(auth, 'http://localhost:9099');
    connectFirestoreEmulator(firestore, 'localhost', 8082);
    connectStorageEmulator(storage, 'localhost', 9199);
    connectFunctionsEmulator(functions, 'localhost', 5001);
  }

  appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(isLocalHost ? recaptchaDebugSiteKey: process.env.APPCHECK_RECAPTCHA_SITE_KEY),
    isTokenAutoRefreshEnabled: true
  });

  auth.onAuthStateChanged((auth: User) => {
    if (auth) {
      user = auth;
      console.log('User signed in');
    } else {
      user = undefined;
      console.log('User signed out');
    }
  });
}

export interface Merchant {
  name: string
  logo: string;
  apiKey: string;
  products: []
}

export function disableTelemetry() {
  if (performance != undefined) {
    performance.instrumentationEnabled = false;
    performance.dataCollectionEnabled = false;
  }
}

export function enableTelemetry() {
  if (performance == undefined) {
    performance = getPerformance(app);
  } else {
    performance.instrumentationEnabled = true;
    performance.dataCollectionEnabled = true;
  }
}

export function validateEmail(email: string): boolean {
  // eslint-disable-next-line no-useless-escape
  const regex = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
  return regex.test(email);
}
