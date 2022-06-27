import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, Props } from '.';

export const DraggableCard: React.FC<Props> = (props) => {
    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        active,
    } = useSortable({ id: props.id, data: {
        type: 'CARD',
        columnId: props.columnId,
        cardProps: props, 
    }});

    const style = {
        opacity: active?.id === props.id ? 0.5 : 1,
        transition,
    };

    return (
        <Card ref={setNodeRef} {...props} style={style} {...listeners} {...attributes} />
    )
}