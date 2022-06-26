import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import * as Styled from './styled';

export interface Props {
    columnId: string;
    children: React.ReactNode;
}

export const CardContainer: React.FC<Props> = ({ columnId, children }) => {
    const { setNodeRef } = useDroppable({ id: `${columnId}-droppable` });

    return (
        <Styled.CardContainer ref={setNodeRef}>
            {children}
        </Styled.CardContainer>
    )
}