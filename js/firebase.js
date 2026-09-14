// ==========================================
// IMPORTAR FIREBASE
// ==========================================

import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";

import { getFirestore }
from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";


// ==========================================
// CONFIGURACIÓN DEL PROYECTO
// ==========================================

const firebaseConfig = {

    apiKey: "AIzaSyDKl5oLRePF8gmfFxG5TAvjhTRXGNSfJ8k",

    authDomain: "cloud-computing-182c3.firebaseapp.com",

    projectId: "cloud-computing-182c3",

    storageBucket: "cloud-computing-182c3.firebasestorage.app",

    messagingSenderId: "41255628144",

    appId: "1:41255628144:web:08087224475d81cc8273b5"
};


// ==========================================
// INICIALIZAR FIREBASE
// ==========================================

const app = initializeApp(firebaseConfig);


// ==========================================
// CONECTAR FIRESTORE
// ==========================================

const db = getFirestore(app);


// ==========================================
// EXPORTAR LA BASE DE DATOS
// ==========================================

export { db };