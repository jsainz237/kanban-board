import React, { BaseSyntheticEvent, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons';
import { rectSortingStrategy, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import * as Styled from './styled';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { Column, deleteColumn, editColumnName } from '../../state/columns.reducer';
import { DraggableCard } from '../DraggableCard';
import { CardContainer } from './CardContainer';
import { selectCards } from '../../state/cards.reducer';

export interface Props extends Column {
    index: number;
}

export const DraggableColumn: React.FC<Props> = ({ id, name, index }) => {
    const inputRef = useRef<any>();
    const [isMounted, setMounted] = useState<boolean>(false);
    const [columnName, setName] = useState<string>(name);

    const cards = useAppSelector(selectCards(id));
    const dispatch = useAppDispatch();

    const {
        setNodeRef: setSortableRef,
        attributes,
        listeners,
        transform,
        transition,
    } = useSortable({ id, data: { type: 'COL' } });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    useEffect(() => {
        setMounted(true);
        if(name === '') {
            inputRef.current.focus();
        }
    }, []);

    const onInputChange = (e: any) => {
        setName(e.target.value);
    }

    const onBlur = (e: any) => {
        if(e.target.value === '') {
            dispatch(deleteColumn({ index }));
        }
    }

    const handleKeyPress = (e: any) => {
        if(e.keyCode === 13 && document.activeElement === inputRef.current) {
            e.target.blur();
            onBlur(e);
        }
    }

    return (
        <Styled.Column ref={setSortableRef} style={style} {...attributes}>
            <div className='column-header'>
                <Styled.Input
                    ref={inputRef}
                    value={columnName}
                    onChange={onInputChange}
                    onKeyDown={handleKeyPress}
                    onBlur={onBlur}
                />
                <div style={{ cursor: 'grab' }} {...listeners}>
                    <FontAwesomeIcon icon={faGripVertical} size='lg' />
                </div>
            </div>
            {/* <CardContainer columnId={id as string}> */}
                <SortableContext items={cards.map(c => c.id)} strategy={rectSortingStrategy}>
                    {cards.map(card => <DraggableCard key={card.id} columnId={id} {...card} />)}
                </SortableContext>
            {/* </CardContainer> */}
        </Styled.Column>
    )
}