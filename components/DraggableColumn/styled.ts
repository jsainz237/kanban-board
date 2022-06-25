import { Form } from 'react-bootstrap';
import styled from 'styled-components';

export const Column = styled.div`
    cursor: default;
    min-width: 350px;
    background-color: ${({ theme }) => theme.colors.secondaryColor};
    border-radius: 0.5rem;
    overflow: hidden;
    margin-right: 12px;

    .column-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 12px 16px;
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