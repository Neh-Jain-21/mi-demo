import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyBoJ527JdYnfLqijx6kYjAal9WbJ-BC33g',
	authDomain: 'mi-demo-d048a.firebaseapp.com',
	projectId: 'mi-demo-d048a',
	storageBucket: 'mi-demo-d048a.appspot.com',
	messagingSenderId: '234443890286',
	appId: '1:234443890286:web:ffdc1e159e9a331247907f',
	measurementId: 'G-HG78W46N7Q'
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
