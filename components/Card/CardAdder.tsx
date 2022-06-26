import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { CardModal } from './CardModal';
import { addNewCard, Card } from '../../state/cards.reducer';
import { useAppDispatch } from '../../state/hooks';
import * as Styled from './styled';

export interface Props {
    columnId: string;
}

export const CardAdder: React.FC<Props> = ({ columnId }) => {
    const dispatch = useAppDispatch();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const createCard = ({
        name,
        description,
        status
    }: Pick<Card, 'name' | 'description' | 'status'>) => {
        dispatch(addNewCard({
            columnId,
            card: { name, description, status },
        }));
    }

    return (
        <>
        <Styled.AddCardButton onClick={handleShow}>
            <FontAwesomeIcon icon={faPlus} />
            <div style={{ marginBottom: 3, marginLeft: 8 }}>
                new task
            </div>
        </Styled.AddCardButton>
        
        <CardModal
            show={show}
            header="Create new task"
            handleClose={handleClose} 
            onSubmit={createCard}
        />
      </>
    );
}