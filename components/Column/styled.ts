import { Form } from 'react-bootstrap';
import styled from 'styled-components';

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 350px;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.secondaryColor};
    border-radius: 0.5rem;
    margin-right: 12px;
    z-index: 0;
    cursor: default;

    .column-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
        padding: 12px 16px 0px 16px;
    }
`;

export const Input = styled(Form.Control).attrs(() => ({
    type: 'text',
    size: 'sm',
}))`
    background: transparent;
    border: none;
    color: ${({ theme }) => theme.colors.textColor};
    box-shadow: none;
    margin-right: 24px;
    font-weight: bold;

    &:focus, &:active {
        background: transparent;
        border: 2px solid ${({ theme }) => theme.colors.textColor};
        color: ${({ theme }) => theme.colors.textColor};
        box-shadow: none;
        font-weight: normal;
    }
`;

export const CardContainer = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 0 16px;
`;

export const AddColumnButton = styled(Column)`
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