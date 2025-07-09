import admin from 'firebase-admin';
import serviceAccount from './firebase-service-account-key.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export default admin;
