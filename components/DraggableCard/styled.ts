import styled from 'styled-components';

export const Card = styled.div(({ theme }) => ({
    padding: '8px 12px',
    borderRadius: 8,
    backgroundColor: theme.colors.textColor,
    color: theme.colors.secondaryColor,
    marginBottom: 8,
    zIndex: 200,
}));