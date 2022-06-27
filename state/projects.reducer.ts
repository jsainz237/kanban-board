import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { arrayMove } from '@dnd-kit/sortable';
import { v4 as uuid } from 'uuid';
import { RootState } from '.';

export interface Board {
    id: string;
    name: string;
}

export interface Column {
    id: string;
    name: string;
}

export interface Card {
    id: string;
    name: string;
    description: string;
    createdDate: string;
    status: 'open' | 'closed';
}

export type CardDto = Pick<Card, 'name' | 'status' | 'description'>;

export interface ProjectState {
    activeProject: Board;
    boards: Board[],
    columns: {
        [boardId: string]: Column[]
    },
    cards: {
        [colId: string]: Card[]
    },
}

const initialBoards: Board[] = [
    { id: uuid(), name: 'Example project' },
    { id: uuid(), name: 'Another example' },
];

const initialColumns: Record<string, Column[]> = {
    [initialBoards[0].id]: [
        { id: uuid(), name: 'To do' },
        { id: uuid(), name: 'In progress' },
        { id: uuid(), name: 'Completed' },
    ],
    [initialBoards[1].id]: [
        { id: uuid(), name: 'Backlog' },
        { id: uuid(), name: 'Started' },
    ],
};

const initialCards: Record<string, Card[]> = {
    // board 0 - column 0
    [initialColumns[initialBoards[0].id][0].id]: [
        {
            id: uuid(),
            name: 'Welcome to my Kanban board',
            description: 'These starter cards will detail how to go about using the boards',
            createdDate: new Date().toLocaleDateString(),
            status: 'closed',
        },
        {
            id: uuid(),
            name: 'Drag `n Drop',
            description: 'You can drag both the columns and the cards to where you want to place them',
            createdDate: new Date().toLocaleDateString(),
            status: 'open',
        },
    ],
    // board 0 - column 1
    [initialColumns[initialBoards[0].id][1].id]: [
        {
            id: uuid(),
            name: 'You can also edit and archive existing tasks',
            description: 'Click on the three dots at the top-right of the task card to try this out',
            createdDate: new Date().toLocaleDateString(),
            status: 'open',
        },
    ],
    // board 0 - column 2
    [initialColumns[initialBoards[0].id][2].id]: [],
    // board 1 - column 0
    [initialColumns[initialBoards[1].id][0].id]: [],
    // board 1 - column 1
    [initialColumns[initialBoards[1].id][1].id]: [],
}

const initialState: ProjectState = {
    activeProject: initialBoards[0],
    boards: initialBoards,
    columns: initialColumns,
    cards: initialCards,
}

export const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        /**** BOARD REDUCER FUNCTIONS ****/
        setActiveProject: (state, action: PayloadAction<Board>) => {
            state.activeProject = action.payload;
        },
        createNewBoard: (state, action: PayloadAction<string>) => {
            const board = { id: uuid(), name: action.payload };

            state.boards.push(board);
            state.columns[board.id] = [];

            state.activeProject = board;
        },

        /**** COLUMN REDUCER FUNCTIONS ****/
        moveColumns: ({ columns, activeProject }, action: PayloadAction<{ activeId: string, overId: string | undefined }>) => {
            const { activeId, overId } = action.payload;
            const oldIndex = columns[activeProject.id].findIndex(col => col.id === activeId);
            const newIndex = columns[activeProject.id].findIndex(col => col.id === overId);
      
            columns[activeProject.id] = arrayMove(columns[activeProject.id], oldIndex, newIndex);
        },
        addColumn: ({ columns, activeProject }, action: PayloadAction<{ id: string }>) => {
            const { id } = action.payload;
            columns[activeProject.id] = columns[activeProject.id].concat([{ id, name: '' }]);
        },
        deleteColumn: ({ columns, activeProject }, action: PayloadAction<{ index: number }>) => {
            columns[activeProject.id].splice(action.payload.index, 1);
        },
        editColumnName: ({ columns, activeProject }, action: PayloadAction<{ index: number, name: string }>) => {
            const { index, name } = action.payload;
            columns[activeProject.id][index].name = name;
        },

        /**** CARD REDUCER FUNCTIONS ****/
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
            cards[columnId] = cards[columnId].filter(card => card.id !== cardId);
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
    }
});

export const {
    // board actions
    setActiveProject,
    createNewBoard,

    // column actions
    moveColumns,
    addColumn,
    deleteColumn,
    editColumnName,
    
    // card actions
    addNewCard,
    deleteCard,
    editCard,
    addEmptyCardList,
    moveCard,
} = projectsSlice.actions;

export const selectActiveProject = (state: RootState) => state.activeProject;

export const selectBoards = (state: RootState) => state.boards;

export const selectColumns = (state: RootState) => state.columns[state.activeProject.id];

export const selectCards = (columnId: string) =>
    (state: RootState) => state.cards[columnId];

export default projectsSlice.reducer;