import React from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Styled from './styled';

export interface Props {
    onClick: () => any;
}

export const ColumnAdder: React.FC<Props> = ({ onClick }) => (
    <Styled.AddColumnButton onClick={onClick}>
        <FontAwesomeIcon icon={faPlus} size='2x' />
    </Styled.AddColumnButton>
)