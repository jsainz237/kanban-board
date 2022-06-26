import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap';

import Modal from '../Modal';
import { Button } from '../Button';
import { Card } from '../../state/cards.reducer';

export interface Props {
    header: string;
    show: boolean;
    handleClose: () => any;
    onSubmit: (data: Pick<Card, 'name' | 'status' | 'description'>) => any;
}

export const CardModal: React.FC<Props> = ({ header, show, handleClose, onSubmit }) => {
    const theme = useTheme();
    const [name, setName] = useState<string>('');
    const [status, setStatus] = useState<'open' | 'closed'>();
    const [description, setDescription] = useState<string>('');

    const submitAndClose = () => {
        onSubmit({ name, description, status: status as 'open' | 'closed' });
        handleClose();
    }

    return (
        <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Header closeButton closeVariant='white'>
                <Modal.Title>{header}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Row>
                    <Col xs={8}>
                        <Form.Group className="mb-3">
                            <Form.Label>Task name</Form.Label>
                            <Form.Control
                                type="email"
                                autoFocus
                                value={name}
                                onChange={e => setName(e.target.value)}
                                style={{
                                    background: '#11151b',
                                    borderColor: theme.colors.secondaryBackgroundColor,
                                }}
                            />
                        </Form.Group>
                    </Col>
                    <Col xs={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Select
                                value={status}
                                onChange={e => setStatus(e.target.value as any)}
                                style={{
                                    backgroundColor: '#11151b',
                                    borderColor: theme.colors.secondaryBackgroundColor,
                                }}>
                                <option selected disabled>status</option>
                                <option>open</option>
                                <option>closed</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group className="mb-3">
                    <Form.Label>description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        style={{
                            background: '#11151b',
                            borderColor: theme.colors.secondaryBackgroundColor,
                        }}
                    />
                </Form.Group>
            </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={submitAndClose}>Create</Button>
                <Button variant='secondary' onClick={handleClose}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
}