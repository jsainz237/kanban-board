import styled from 'styled-components';

export const Main = styled.main`
    display: flex;
    flex-direction: column;
    height: 100vh;
    padding-left: 48px;
    padding-bottom: 48px;
`;

export const ColumnContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: row;
    margin-top: 2rem;
    overflow-x: auto;
    overflow-y: visible;
`;