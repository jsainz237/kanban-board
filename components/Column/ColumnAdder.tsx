import React from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { v4 as uuid } from 'uuid';

import { useAppDispatch } from '../../state/hooks';
import { addColumn, addEmptyCardList } from '../../state/projects.reducer';
import * as Styled from './styled';

export const ColumnAdder: React.FC = () => {
    const dispatch = useAppDispatch();

    const createNewColumn = () => {
        const columnId = uuid();
        console.log({ columnId });
        dispatch(addColumn({ id: columnId }));
        dispatch(addEmptyCardList({ columnId }));
    }

    return (
        <Styled.AddColumnButton onClick={createNewColumn}>
            <FontAwesomeIcon icon={faPlus} size='2x' />
        </Styled.AddColumnButton>
    );
}