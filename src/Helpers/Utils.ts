import { Timestamp } from 'firebase/firestore';

export const convertTimestamp = (timestamp: Timestamp) => {
	const date = timestamp.toDate();

	return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
};
