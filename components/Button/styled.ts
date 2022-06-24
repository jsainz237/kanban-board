import RBButton from 'react-bootstrap/Button';
import styled from 'styled-components';

export const Button = styled(RBButton)`
    color: white !important;
    background-color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};

    &:hover, &:focus {
        background-color: ${({ theme }) => theme.colors.primary};
        border-color: #87bce4;
    }

    &:focus {
        box-shadow: 0 0 0 0.25rem #87bce480;
    }
`;