import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';

export const SelectionHeader = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    margin-top: 2rem;
    cursor: pointer;

    .project-name {
        margin-right: 12px;
        font-weight: bold;
        letter-spacing: 1px;
    }
`;

export const DropdownMenu = styled(Dropdown.Menu)`
    margin-top: 0.5rem;
    min-width: 248px;
`;

export const DropdownItem = styled(Dropdown.Item)`
    &:active {
        background-color: ${({ theme }) => theme.colors.textColor} !important;
    }
`;

export const MenuButtonContainer = styled.div`
    padding: 0 0.5rem;
    width: 100%;
`;