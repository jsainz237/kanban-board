import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Card as ICard } from '../../state/cards.reducer';
import * as Styled from './styled';

export interface Props extends 
    ICard,
    Partial<Omit<
        React.HTMLProps<HTMLDivElement>,
        'id' | 'name'
    >>{};

export const Card = React.forwardRef<{}, Props>(({
    id,
    name,
    description,
    createdDate,
    status,
    style,
    ...props
}, ref) => (
    <Styled.Card ref={ref as any} style={style} {...props as any}>
        <div>
            <Styled.CardHeader>
                <div className='title'>{name}</div>
                <FontAwesomeIcon className='options-icon' icon={faEllipsis} />
            </Styled.CardHeader>
            <Styled.DescriptionContainer>
                {description}
            </Styled.DescriptionContainer>
        </div>
        <Styled.FooterContainer>
            <div className='date'>
                {new Date(createdDate).toLocaleDateString()}
            </div>
            <Styled.StatusLabel status={status}>
                {status}
            </Styled.StatusLabel>
        </Styled.FooterContainer>
    </Styled.Card>
))

Card.displayName = 'Card';