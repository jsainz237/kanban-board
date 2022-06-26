import React, { useRef } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { Column as IColumn } from '../../state/columns.reducer';
import { Column } from './Column';

export interface Props extends IColumn {
    index: number;
}

export const DraggableColumn: React.FC<Props> = (props) => {
    const colRef = useRef<any>();

    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        active,
    } = useSortable({
        id: props.id,
        data: {
            type: 'COL',
            columnProps: props,
        }
    });

    const style = {
        opacity: active?.id === props.id ? 0.5 : 1,
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <Column
            ref={(node: any) => {
                colRef.current = node;
                setNodeRef(node);
            }}
            {...props}
            style={style}
            attributes={attributes}
            listeners={listeners}
        />
    )
}