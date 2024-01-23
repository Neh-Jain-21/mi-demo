import { Box } from '@mui/material';
import styled from 'styled-components';

const AppWrapper = styled(Box)`
	padding: 20px;

	.note-container {
		padding: 20px;

		.edit-btn-container {
			display: flex;
			justify-content: flex-end;
		}
	}

	.user-list {
		padding: 20px;
		margin-top: 20px;

		ul {
			margin: 0;
			padding: 0;
			list-style-type: none;
		}

		li {
			margin-bottom: 5px;
		}
	}

	.history-container {
		padding: 20px;
		margin-top: 20px;

		.content-container {
			margin-bottom: 10px;

			.content-title-container {
				display: flex;
				align-items: center;
				justify-content: space-between;
			}

			.content {
				font-size: 14px;
			}
		}
	}
`;

export default AppWrapper;
