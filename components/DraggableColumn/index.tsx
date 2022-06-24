import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import * as Styled from './styled';

export interface Props {
    name: string;
}

export const DraggableColumn: React.FC<Props> = ({ name }) => {
    const {
        setNodeRef: setSortableRef,
        attributes,
        listeners,
        transform,
        transition,
    } = useSortable({ id: name });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <Styled.Column ref={setSortableRef} style={style} {...listeners} {...attributes}>
            {name}
        </Styled.Column>
    )
}