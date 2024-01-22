import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { DocumentData, addDoc, collection, doc, onSnapshot, setDoc } from 'firebase/firestore';
// COMPONENTS
import ErrorMessage from './Components/ErrorMessage';
// HELPERS
import { db } from './Helpers/Firebase';
import { DATABASE_COLLECTIONS } from './Helpers/Constants';
// STYLES
import AppWrapper from './App.style';

const App = () => {
	const [users, setUsers] = useState<DocumentData[]>([]);
	const [history, setHistory] = useState<DocumentData[]>([]);

	const formik = useFormik<{ userName: string; note: string }>({
		initialValues: { userName: '', note: '' },
		validationSchema: yup.object().shape({
			userName: yup.string().required('Name is required!'),
			note: yup.string().required('Note is required!')
		}),
		onSubmit: async (values) => {
			const usersRef = collection(db, DATABASE_COLLECTIONS.USERS);
			const notesRef = doc(db, DATABASE_COLLECTIONS.NOTES, 'note');
			const historyRef = collection(db, DATABASE_COLLECTIONS.HISTORY);

			const duplicateUser = users.find((user) => user.name === values.userName);

			if (!duplicateUser) await addDoc(usersRef, { name: values.userName });

			await setDoc(notesRef, { content: values.note, editedBy: values.userName });

			await addDoc(historyRef, { content: values.note, editedBy: values.userName });
		}
	});

	const { setFieldValue } = formik;

	useEffect(() => {
		const usersRef = collection(db, DATABASE_COLLECTIONS.USERS);
		const historyRef = collection(db, DATABASE_COLLECTIONS.HISTORY);

		const unsubscribeUsers = onSnapshot(usersRef, (snapshot) => {
			const updatedUsers = snapshot.docs.map((doc) => doc.data());
			setUsers(updatedUsers);
		});

		const unsubscribeNote = onSnapshot(doc(db, DATABASE_COLLECTIONS.NOTES, 'note'), (doc) => {
			const data = doc.data();

			setFieldValue('note', data ? data.content : '');
		});

		const unsubscribeHistory = onSnapshot(historyRef, (snapshot) => {
			const updatedHistory = snapshot.docs.map((doc) => doc.data());
			setHistory(updatedHistory.reverse());
		});

		return () => {
			unsubscribeUsers();
			unsubscribeNote();
			unsubscribeHistory();
		};
	}, [setFieldValue]);

	const handleQuillChange = (value: string) => setFieldValue('note', value);

	return (
		<AppWrapper>
			<Paper elevation={2} className="note-container">
				<Typography component="h2" variant="h4" mb="20px">
					Real-Time Note App
				</Typography>

				<TextField
					type="text"
					size="small"
					name="userName"
					variant="outlined"
					placeholder="Your Name"
					onBlur={formik.handleBlur}
					value={formik.values.userName}
					onChange={formik.handleChange}
				/>
				<ErrorMessage text={(formik.touched.userName && formik.errors.userName) || ''} />

				<ReactQuill value={formik.values.note} onChange={handleQuillChange} />
				<ErrorMessage text={(formik.touched.note && formik.errors.note) || ''} />

				<Box className="edit-btn-container">
					<Button color="success" disableElevation variant="contained" onClick={formik.submitForm}>
						Edit Note
					</Button>
				</Box>
			</Paper>

			<Paper elevation={2} className="user-list">
				<Typography component="h2" variant="h4" mb="20px">
					Users
				</Typography>

				<ul>
					{users.map((user) => (
						<li key={user.name}>{user.name}</li>
					))}
				</ul>
			</Paper>

			<Paper elevation={2} className="history-container">
				<Typography component="h2" variant="h4" mb="20px">
					Edit History
				</Typography>

				{history.map((data, index) => (
					<Box key={index} className="content-container">
						<Typography component="h4">Edited by - {data.editedBy}</Typography>
						<Typography component="h5" className="content" dangerouslySetInnerHTML={{ __html: data.content }} />
					</Box>
				))}
			</Paper>
		</AppWrapper>
	);
};

export default App;
