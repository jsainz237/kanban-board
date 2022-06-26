import styled from 'styled-components';
import { Column as StyledColumn } from '../DraggableColumn/styled';

export const AddColumnButton = styled(StyledColumn)`
    cursor: pointer;
    background: none !important;
    border: 3px dashed ${({ theme }) => theme.colors.secondaryBackgroundColor};
    display: flex;
    justify-content: center;
    align-items: center;

    * {
        color: ${({ theme }) => theme.colors.secondaryBackgroundColor};
    }
`;

