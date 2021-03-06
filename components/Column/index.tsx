import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical, faMultiply } from '@fortawesome/free-solid-svg-icons';
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { DraggableAttributes } from '@dnd-kit/core';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';

import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { DraggableCard } from '../Card/DraggableCard';
import { Column as IColumn, deleteColumn, editColumnName, selectCards } from '../../state/projects.reducer';
import * as Styled from './styled';
import { CardAdder } from '../Card/CardAdder';

export interface Props extends IColumn {
    index: number;
}

export interface DraggableProps extends
    IColumn,
    Partial<Omit<
        React.HTMLProps<HTMLDivElement>,
        'id' | 'name'
    >> {
        index: number;
        attributes?: DraggableAttributes;
        listeners?: SyntheticListenerMap
    };

export const Column = React.forwardRef<{}, DraggableProps>(({
    id,
    name,
    index,
    attributes,
    listeners,
    style,
}, ref) => {
    const inputRef = useRef<any>();
    const [columnName, setName] = useState<string>(name);

    const cards = useAppSelector(selectCards(id));
    const dispatch = useAppDispatch();

    useEffect(() => {
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
            return;
        }

        dispatch(editColumnName({ index, name: e.target.value }));
    }

    const handleKeyPress = (e: any) => {
        if(e.keyCode === 13 && document.activeElement === inputRef.current) {
            e.target.blur();
            onBlur(e);
        }
    }

    const onArchive = () => {
        dispatch(deleteColumn({ index }));
    }

    return (
        <Styled.Column ref={ref as any} style={style} {...attributes}>
            <div className='column-header'>
                <Styled.Input
                    ref={inputRef}
                    value={columnName}
                    onChange={onInputChange}
                    onKeyDown={handleKeyPress}
                    onBlur={onBlur}
                />
                { cards.length === 0 && (
                    <FontAwesomeIcon
                        className={`archive-btn ${cards.length > 0 ? 'disabled' : ''}`}
                        icon={faMultiply}
                        size='lg'
                        onClick={onArchive}
                    />
                )}
                <div style={{ cursor: 'grab' }} {...listeners}>
                    <FontAwesomeIcon icon={faGripVertical} size='lg' />
                </div>
            </div>
            <Styled.CardContainer>
                <SortableContext items={cards.map(c => c.id)} strategy={rectSortingStrategy}>
                    {cards.map(card => <DraggableCard key={card.id} columnId={id} {...card} />)}
                </SortableContext>
            </Styled.CardContainer>
            <div style={{ padding: '12px 16px' }}>
                <CardAdder columnId={id} />
            </div>
        </Styled.Column>
    )
})

Column.displayName = 'Column';