import Dropdown from 'react-bootstrap/Dropdown';
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