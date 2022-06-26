import RBButton from 'react-bootstrap/Button';
import styled from 'styled-components';

export const Button = styled(RBButton)<{ variant?: 'primary' | 'secondary' }>`
    color: #cbd7e3 !important;
    border-color: ${({ theme }) => theme.colors.primary};
    border-width: 2px;

    ${({ theme, variant = 'primary' }) => ({
        backgroundColor: variant === 'primary' 
            ? theme.colors.primary
            : 'transparent',
    })}

    &:hover, &:focus {
        border-width: 2px;
        border-color: #87bce4;
        ${({ theme, variant = 'primary' }) => ({
            backgroundColor: variant === 'primary' 
                ? theme.colors.primary
                : 'transparent',
        })}
    }

    &:focus {
        box-shadow: 0 0 0 0.25rem #87bce480;
    }
`;