// import firebase from 'firebase';
// require('firebase/auth');

import firebase from "firebase/compat/app" //resolve
import "firebase/compat/auth" //resolve
import "firebase/compat/firestore" //resolve
import "firebase/compat/storage" //resolve

firebase.initializeApp({
	apiKey: "AIzaSyAhpkppDoN2geNDX5sLKBD3SwRnC7a4p2s",
	authDomain: "tambal-ban-3081c.firebaseapp.com",
	projectId: "tambal-ban-3081c",
	storageBucket: "tambal-ban-3081c.appspot.com",
	messagingSenderId: "742528959230",
	appId: "1:742528959230:web:85920c293d0816fcd79baf",
	measurementId: "G-D18VNEHHLT"
	// apiKey: "AIzaSyDeFcyBQtCVJwjH_kIoqZWOwEz5HeGfm9g",
	// authDomain: "tambal-ban-266713.firebaseapp.com",
	// databaseURL: "https://tambal-ban-266713.firebaseio.com",
	// projectId: "tambal-ban-266713",
	// storageBucket: "tambal-ban-266713.appspot.com",
	// messagingSenderId: "265882458226",
	// appId: "1:265882458226:web:cf7f25ef5c45df7a330aeb",
	// measurementId: "G-VMYJ92ZCGH",
})

// Initialize Firebase
const FIREBASE = firebase
export const firestore = firebase.firestore();

export default FIREBASE
