import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { DocumentData, addDoc, collection, doc, onSnapshot, setDoc } from 'firebase/firestore';
// HELPERS
import { db } from './Helpers/Firebase';
// STYLES
import './App.css';
import { DATABASE_COLLECTIONS } from './Helpers/Constants';

const App = () => {
	const [note, setNote] = useState<string>('');
	const [users, setUsers] = useState<DocumentData[]>([]);
	const [history, setHistory] = useState<DocumentData[]>([]);
	const [currentUserName, setCurrentUserName] = useState<string>('');

	useEffect(() => {
		const usersRef = collection(db, DATABASE_COLLECTIONS.USERS);
		const historyRef = collection(db, DATABASE_COLLECTIONS.HISTORY);

		// Listen for changes to users
		const unsubscribeUsers = onSnapshot(usersRef, (snapshot) => {
			const updatedUsers = snapshot.docs.map((doc) => doc.data());
			setUsers(updatedUsers);
		});

		// Listen for changes to the note
		const unsubscribeNote = onSnapshot(doc(db, DATABASE_COLLECTIONS.NOTES, 'note'), (doc) => {
			const data = doc.data();

			setNote(data ? data.content : '');
		});

		// Listen for changes to users
		const unsubscribeHistory = onSnapshot(historyRef, (snapshot) => {
			const updatedHistory = snapshot.docs.map((doc) => doc.data());
			setHistory(updatedHistory);
		});

		return () => {
			unsubscribeUsers();
			unsubscribeNote();
			unsubscribeHistory();
		};
	}, []);

	const handleEditNote = async () => {
		const usersRef = collection(db, DATABASE_COLLECTIONS.USERS);
		const notesRef = doc(db, DATABASE_COLLECTIONS.NOTES, 'note');
		const historyRef = collection(db, DATABASE_COLLECTIONS.HISTORY);

		const duplicateUser = users.find((user) => user.name === currentUserName);

		if (!duplicateUser) await addDoc(usersRef, { name: currentUserName });

		await setDoc(notesRef, { content: note, editedBy: currentUserName });

		await addDoc(historyRef, { content: note, editedBy: currentUserName });
	};

	const handleQuillChange = (value: string) => setNote(value);

	return (
		<div className="app">
			<div className="main-container">
				<div className="user-list">
					<h2>Users</h2>

					<ul>
						{users.map((user) => (
							<li key={user.name}>{user.name}</li>
						))}
					</ul>
				</div>

				<div className="note-container">
					<h1>Real-Time Note App</h1>

					<div className="edit-box">
						<input type="text" placeholder="Your Name" value={currentUserName} onChange={(e) => setCurrentUserName(e.target.value)} />
						<button onClick={handleEditNote}>Edit Note</button>
					</div>

					<ReactQuill value={note} onChange={handleQuillChange} />
				</div>
			</div>

			<div className="history-container">
				<h2 className="title">History</h2>

				{history.map((data) => (
					<div className="content-container">
						<h4>Edited by - {data.editedBy}</h4>
						<h6 className="content" dangerouslySetInnerHTML={{ __html: data.content }} />
					</div>
				))}
			</div>
		</div>
	);
};

export default App;
