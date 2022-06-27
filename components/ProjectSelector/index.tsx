import React, { useState } from 'react';
import {Dropdown, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faPlus } from '@fortawesome/free-solid-svg-icons';

import { Button } from '../Button';
import * as Styled from './styled';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { Board, createNewBoard, selectActiveProject, selectBoards, setActiveProject } from '../../state/projects.reducer';
import Modal from '../Modal';

export const ProjectSelector: React.FC = () => {
    const [show, setShow] = useState<boolean>(false);
    const [boardName, setBoardName] = useState<string>('');
    const [validated, setValidated] = useState<boolean>(false);

    const activeProject = useAppSelector(selectActiveProject);
    const boards = useAppSelector(selectBoards);
    const dispatch = useAppDispatch();

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const onSelect = (board: Board) => {
        dispatch(setActiveProject(board));
    }

    const submit = (event: any) => {
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        if(form.checkValidity()) {
            dispatch(createNewBoard(boardName))
            setBoardName('');
            setValidated(false);
        }

        setValidated(true);
    }

    return (
        <>
            <Dropdown>
                <Dropdown.Toggle as={CustomToggle}>
                    {activeProject.name}
                </Dropdown.Toggle>

                <Styled.DropdownMenu variant='dark'>
                    {boards
                        .filter(b => b.id !== activeProject.id)
                        .map(board => (
                            <Styled.DropdownItem
                                key={board.id}
                                onClick={() => onSelect(board)}
                            >
                                {board.name}
                            </Styled.DropdownItem>
                        )
                    )}
                    <Dropdown.Divider style={{ margin: '0.5rem' }} />
                    <Styled.MenuButtonContainer>
                        <Button style={{ width: '100%' }} onClick={handleShow}>
                            <FontAwesomeIcon icon={faPlus} style={{ marginRight: 8 }} />
                            Create new board
                        </Button>
                    </Styled.MenuButtonContainer>
                </Styled.DropdownMenu>
            </Dropdown>

            <Modal show={show} onHide={handleClose} size="lg" centered>
                <Form noValidate validated={validated} onSubmit={submit}>
                    <Modal.Header closeButton closeVariant='white'>
                        <Modal.Title>Add new project board</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Board name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                autoFocus
                                value={boardName}
                                onChange={e => setBoardName(e.target.value)}
                                style={{ background: '#11151b' }}
                            />
                            <Form.Control.Feedback type="invalid">
                                Board name is required
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit">Create</Button>
                        <Button variant='secondary' onClick={handleClose}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
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