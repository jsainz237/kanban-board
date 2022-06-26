import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { Card as ICard } from '../../state/cards.reducer';
import { Card } from './Card';

export interface Props extends ICard {
    columnId: string;
};

export const DraggableCard: React.FC<Props> = ({ columnId, ...props }) => {
    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        active,
    } = useSortable({ id: props.id, data: {
        type: 'CARD',
        columnId,
        cardProps: props as ICard 
    }});

    const style = {
        opacity: active?.id === props.id ? 0.5 : 1,
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <Card ref={setNodeRef} {...props} style={style} {...listeners} {...attributes} />
    )
}