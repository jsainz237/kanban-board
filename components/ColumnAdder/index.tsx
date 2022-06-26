import React from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { v4 as uuid } from 'uuid';

import { useAppDispatch } from '../../state/hooks';
import { addColumn } from '../../state/columns.reducer';
import * as Styled from './styled';
import { addEmptyCardList } from '../../state/cards.reducer';

export const ColumnAdder: React.FC = () => {
    const dispatch = useAppDispatch();

    const createNewColumn = () => {
        const columnId = uuid();
        dispatch(addColumn({ id: columnId }));
        dispatch(addEmptyCardList({ columnId }));
    }

    return (
        <Styled.AddColumnButton onClick={createNewColumn}>
            <FontAwesomeIcon icon={faPlus} size='2x' />
        </Styled.AddColumnButton>
    );
}