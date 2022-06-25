import React from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch } from '../../state/hooks';
import { addColumn } from '../../state/columns.reducer';
import * as Styled from './styled';

export const ColumnAdder: React.FC = () => {
    const dispatch = useAppDispatch();

    const createNewColumn = () => {
        dispatch(addColumn());
    }

    return (
        <Styled.AddColumnButton onClick={createNewColumn}>
            <FontAwesomeIcon icon={faPlus} size='2x' />
        </Styled.AddColumnButton>
    );
}