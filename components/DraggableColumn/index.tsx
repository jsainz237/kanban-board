import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import * as Styled from './styled';


export interface Props {
    name: string;
    index: number;
    onNameEdit: (ind: number, name: string) => any;
}

export const DraggableColumn: React.FC<Props> = ({ name, index, onNameEdit: changeColumnName }) => {
    const inputRef = useRef<any>();
    const [columnName, setName] = useState<string>(name);

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

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    })

    useEffect(() => {
        if(name === '') {
            inputRef.current.focus();
        }
    });

    const handleClickOutside = (e: MouseEvent) => {
        if(e.target !== inputRef.current) {
            changeColumnName(index, columnName);
        }
    }

    const onInputChange = (p: any) => {
        setName(p.target.value);
    }

    const handleKeyPress = (e: any) => {
        if(e.keyCode === 13) {
            e.target.blur();
            changeColumnName(index, e.target.value);
        }
    }

    return (
        <Styled.Column ref={setSortableRef} style={style} {...attributes}>
            <div className='column-header'>
                <Styled.Input ref={inputRef} value={columnName} onChange={onInputChange} onKeyDown={handleKeyPress} />
                <div style={{ cursor: 'grab' }} {...listeners}>
                    <FontAwesomeIcon icon={faGripVertical} size='lg' />
                </div>
            </div>
        </Styled.Column>
    )
}