import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap';

import Modal from '../Modal';
import { Button } from '../Button';
import { CardDto } from '../../state/cards.reducer';

export interface Props {
    type: 'new' | 'edit';
    show: boolean;
    initialValues?: CardDto;
    handleClose: () => any;
    onSubmit: (data: CardDto) => any;
}

export const CardModal: React.FC<Props> = ({
    type,
    show,
    initialValues,
    handleClose,
    onSubmit
}) => {
    const [validated, setValidated] = useState(false);

    const [name, setName] = useState<string>(initialValues?.name ?? '');
    const [status, setStatus] = useState<string>(initialValues?.status ?? '');
    const [description, setDescription] = useState<string>(initialValues?.description ?? '');

    const submit = (event: any) => {
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        if(form.checkValidity()) {
            onSubmit({ name, description, status: status as 'open' | 'closed' });
        }

        setValidated(true);
    }

    return (
        <Modal show={show} onHide={handleClose} size="lg" centered>
            <Form noValidate validated={validated} onSubmit={submit}>
                <Modal.Header closeButton closeVariant='white'>
                    <Modal.Title>
                        {type === 'new' ? 'Create new task' : 'Edit task'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col xs={8}>
                            <Form.Group className="mb-3">
                                <Form.Label>Task name</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    autoFocus
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    style={{ background: '#11151b' }}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Task name is required
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col xs={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Status</Form.Label>
                                <Form.Select
                                    required
                                    value={status}
                                    onChange={e => setStatus(e.target.value as any)}
                                    style={{ backgroundColor: '#11151b' }}
                                >
                                    <option value="" disabled>status</option>
                                    <option>open</option>
                                    <option>closed</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    Please select task status
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group className="mb-3">
                        <Form.Label>description</Form.Label>
                        <Form.Control
                            required
                            as="textarea"
                            rows={3}
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            style={{ background: '#11151b' }}
                        />
                        <Form.Control.Feedback type="invalid">
                            Task description is required
                        </Form.Control.Feedback>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit">{type === 'new' ? 'Create' : 'Done'}</Button>
                    <Button variant='secondary' onClick={handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}