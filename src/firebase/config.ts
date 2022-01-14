import { initializeApp } from 'firebase/app';
/**
 * Complete with firebase credentials.
 */
const firebaseConfig = {

}
/**
 * Init firebase.
 */
const initApp = () => {
  initializeApp(firebaseConfig);
};

export default initApp;