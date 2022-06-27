import React, { useState } from 'react';
import { faEllipsis, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown } from 'react-bootstrap';

import { Card as ICard, CardDto, deleteCard, editCard } from '../../state/projects.reducer';
import * as Styled from './styled';
import { useAppDispatch } from '../../state/hooks';
import { CardModal } from './CardModal';

export interface Props extends ICard {
    columnId: string;
};

export interface DraggableProps extends 
    Props,
    Partial<Omit<
        React.HTMLProps<HTMLDivElement>,
        'id' | 'name'
    >>{};

export const Card = React.forwardRef<{}, DraggableProps>(({
    id,
    name,
    description,
    createdDate,
    status,
    columnId,
    style,
    ...props
}, ref) => {
    const [show, setShow] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const handleClose = () => setShow(false);

    const onEdit = () => {
        setShow(true);
    }

    const onArchive = () => {
        dispatch(deleteCard({
            columnId,
            cardId: id,
        }));
    }

    const onSubmit = (editedValues: CardDto) => {
        dispatch(editCard({
            columnId,
            cardId: id,
            card: editedValues,
        }))
    }

    return (
        <>
            <Styled.Card ref={ref as any} style={style} {...props as any}>
                <div>
                    <Styled.CardHeader>
                        <div className='title'>{name}</div>
                        <Dropdown onMouseDown={e => { console.log("HELLO" ); e.stopPropagation() }} style={{ pointerEvents: 'fill' }}>
                            <Dropdown.Toggle as={CardOptionsToggle} />
                            <Styled.DropdownMenu variant='dark'>
                                <Styled.DropdownItem onClick={onEdit} className='edit-btn'>
                                    <FontAwesomeIcon style={{ marginRight: 8 }} icon={faPen} />
                                    Edit task
                                </Styled.DropdownItem>
                                <Dropdown.Divider style={{ margin: '0.5rem' }} />
                                <Styled.DropdownItem onClick={onArchive} className='archive-btn'>
                                    <FontAwesomeIcon style={{ marginRight: 8 }} icon={faTrash} />
                                    Archive
                                </Styled.DropdownItem>
                            </Styled.DropdownMenu>
                        </Dropdown>
                    </Styled.CardHeader>
                    <Styled.DescriptionContainer>
                        {description}
                    </Styled.DescriptionContainer>
                </div>
                <Styled.FooterContainer>
                    <div className='date'>
                        {new Date(createdDate).toLocaleDateString()}
                    </div>
                    <Styled.StatusLabel status={status}>
                        {status}
                    </Styled.StatusLabel>
                </Styled.FooterContainer>
            </Styled.Card>

            <CardModal
                show={show}
                type="edit"
                handleClose={handleClose}
                onSubmit={onSubmit}
                initialValues={{
                    name,
                    description,
                    status,
                }}
            />
        </>
    );
});
Card.displayName = 'Card';

const CardOptionsToggle = React.forwardRef<any, any>(({ onClick }, ref) => (
    <div 
        ref={ref as any} 
        onClick={e => {
            onClick(e);
            e.stopPropagation();
        }}
    >
        <FontAwesomeIcon
            className='options-icon'
            icon={faEllipsis}
        />
    </div>

));
CardOptionsToggle.displayName = 'CardOptionsToggle';