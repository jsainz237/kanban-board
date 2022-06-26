import { Form } from 'react-bootstrap';
import styled from 'styled-components';

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 350px;
    background-color: ${({ theme }) => theme.colors.secondaryColor};
    border-radius: 0.5rem;
    margin-right: 12px;
    padding: 12px 16px;
    z-index: 0;
    cursor: default;

    .column-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
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
    background-color: red;
    flex: 1;
`;