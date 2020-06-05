import admin from 'firebase-admin';

const conf = {
    type: "service_account",
    project_id: "picross-online",
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: Buffer.from(process.env.PRIVATE_KEY, 'base64').toString(),
    client_email: process.env.CLIENT_EMAIL,
    client_id: process.env.CLIENT_ID,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: process.env.CLIENT_URL
};

try {
    admin.initializeApp({
        credential: admin.credential.cert(conf),
        databaseURL: "https://picross-online.firebaseio.com"
    });
} catch (error) {
    if (!/already exists/u.test(error.message)) {
        console.error('Firebase admin initialization error', error.stack);
    }
}

export default admin.firestore();