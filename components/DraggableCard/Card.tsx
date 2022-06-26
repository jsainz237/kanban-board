import React from 'react';
import { Card as ICard } from '../../state/cards.reducer';
import * as Styled from './styled';

export interface Props extends 
    ICard,
    Partial<Omit<
        React.HTMLProps<HTMLDivElement>,
        'id' | 'name'
    >>{};

export const Card = React.forwardRef<{}, Props>(({ id, name, style, ...props }, ref) => (
    <Styled.Card ref={ref as any} style={style} {...props as any}>
        {name}
    </Styled.Card>
))

Card.displayName = 'Card';