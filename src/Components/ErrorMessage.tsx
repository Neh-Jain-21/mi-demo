import { memo } from 'react';
import { Typography } from '@mui/material';

type ErrorMessageType = {
	text: string;
};

/** Error message component */
const ErrorMessage = memo((props: ErrorMessageType) => (
	<Typography fontSize={14} height="28px" color="red">
		{props.text}
	</Typography>
));

export default ErrorMessage;
