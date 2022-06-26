import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import * as Styled from './styled';

export const CardAdder: React.FC = () => {
    return (
        <Styled.AddCardButton>
            <FontAwesomeIcon icon={faPlus} />
            <div style={{ marginBottom: 3, marginLeft: 8 }}>
                new task
            </div>
        </Styled.AddCardButton>
    );
}