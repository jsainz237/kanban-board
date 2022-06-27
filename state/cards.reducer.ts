import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { arrayMove } from '@dnd-kit/sortable';
import { v4 as uuid } from 'uuid';

import { initialState as initialColumns } from './columns.reducer';
import { RootState } from '.';

export interface Card {
    id: string;
    name: string;
    description: string;
    createdDate: string;
    status: 'open' | 'closed';
}

export type CardDto = Pick<Card, 'name' | 'status' | 'description'>;

export interface CardState {
  cards: {
    [key: string]: Card[];
  };
}

const { columns } = initialColumns;

const initialState: CardState = {
    cards: {
        [columns[0].id as string]: [
            {
                id: uuid(),
                name: 'This is a card',
                description: 'This is an example card',
                createdDate: new Date().toLocaleDateString(),
                status: 'closed',
            },
            {
                id: uuid(),
                name: 'This is another card',
                description: 'This is an example card',
                createdDate: new Date().toLocaleDateString(),
                status: 'open',
            },
        ],
        [columns[1].id as string]: [
            {
                id: uuid(),
                name: 'Yikers',
                description: 'This is an example card',
                createdDate: new Date().toLocaleDateString(),
                status: 'open',
            },
        ],
        [columns[2].id as string]: [],
    }
}

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    addNewCard: ({ cards }, action: PayloadAction<{ columnId: string, card: CardDto }>) => {
        const { columnId, card } = action.payload;
        cards[columnId].push({
            id: uuid(),
            createdDate: new Date().toLocaleDateString(),
            ...card,
        })
    },
    deleteCard: ({ cards }, action: PayloadAction<{ columnId: string, cardId: string }>) => {
        const { columnId, cardId } = action.payload;
        const ind = cards[columnId].findIndex(card => card.id === cardId);
        cards[columnId].splice(ind, 1);
    },
    editCard: ({ cards }, action: PayloadAction<{ columnId: string, cardId: string, card: CardDto }>) => {
        const { columnId, cardId, card } = action.payload;
        const ind = cards[columnId].findIndex(c => c.id === cardId);
        const existing = cards[columnId][ind];

        cards[columnId][ind] = {
            ...existing,
            ...card,
        };
    },
    addEmptyCardList: ({ cards }, action: PayloadAction<{ columnId: string }>) => {
        const { columnId } = action.payload;
        cards[columnId] = [];
    },
    moveCard: ({ cards }, action: PayloadAction<{ oldColId: string, newColId: string, cardId: string, overId: string }>) => {
        const { oldColId, newColId, cardId, overId } = action.payload;
        
        if(!newColId) {
            return;
        }

        const card = cards[oldColId].find(c => c.id === cardId);
        const cardInd = cards[oldColId]?.findIndex(c => c.id === cardId);
        const newInd = cards[newColId]?.findIndex(c => c.id === overId);

        // if over card and not column
        if(overId !== newColId) {
            cards[oldColId].splice(cardInd, 1);
            cards[newColId].splice(newInd, 0, card!);
            return;
        }

        // if moving within same column
        if(newColId === oldColId) {
            cards[newColId] = arrayMove(cards[newColId], cardInd, newInd);
            return;
        }
        
        cards[oldColId].splice(cardInd, 1);
        cards[newColId].push(card!);
    },
  },
})

export const {
    addNewCard,
    deleteCard,
    editCard,
    addEmptyCardList,
    moveCard,
} = cardsSlice.actions;

export const selectCards = (columnId: string) => (state: RootState) => state.cardsState.cards[columnId];

export default cardsSlice.reducer;