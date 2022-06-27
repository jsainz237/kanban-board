import React from 'react';
import {Dropdown, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faPlus } from '@fortawesome/free-solid-svg-icons';

import { Button } from '../Button';
import * as Styled from './styled';

export const ProjectSelector: React.FC = () => {
    return (
        <Dropdown>
            <Dropdown.Toggle as={CustomToggle}>
                Example Project
            </Dropdown.Toggle>

            <Styled.DropdownMenu variant='dark'>
                <Styled.DropdownItem href="#/action-2">Another Example</Styled.DropdownItem>
                <Dropdown.Divider style={{ margin: '0.5rem' }} />
                <Styled.MenuButtonContainer>
                    <Button style={{ width: '100%' }}>
                        <FontAwesomeIcon icon={faPlus} style={{ marginRight: 8 }} />
                        Create new board
                    </Button>
                </Styled.MenuButtonContainer>
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