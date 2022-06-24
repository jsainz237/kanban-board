import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import * as Styled from './styled';

export const ProjectSelector: React.FC = () => {
    return (
        <Dropdown>
            <Dropdown.Toggle as={CustomToggle}>
                Example Project 1
            </Dropdown.Toggle>

            <Styled.DropdownMenu variant='dark'>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            </Styled.DropdownMenu>
        </Dropdown>
    )
}

const CustomToggle = React.forwardRef<any, any>(({ children, onClick }, ref) => (
    <Styled.SelectionHeader ref={ref as any} onClick={(e) => {
        e.preventDefault();
        onClick(e);
    }}>
        <h1 className='project-name'>{children}</h1>
        <FontAwesomeIcon icon={faChevronDown} />
    </Styled.SelectionHeader>
));
CustomToggle.displayName = 'CustomToggle';