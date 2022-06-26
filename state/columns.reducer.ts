import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { arrayMove } from '@dnd-kit/sortable';
import { RootState } from '.';
import { UniqueIdentifier } from '@dnd-kit/core';

export interface Card {
  id: UniqueIdentifier;
  name: string;
  description: string;
  createdDate: string;
  status: 'open' | 'closed';
}

export interface Column {
  id: UniqueIdentifier;
  name: string;
  cards: Card[];
}

export interface ColumnsState {
  columns: Column[];
}

const initialState: ColumnsState = {
  columns: [
    {
      id: 'col-0',
      name: 'To do',
      cards: [{
        id: 'card-1',
        name: 'This is a card',
        description: 'This is an example card',
        createdDate: new Date().toLocaleDateString(),
        status: 'open',
      }],
    },
    {
      id: 'col-1',
      name: 'In progress',
      cards: [],
    },
    {
      id: 'col-2',
      name: 'Completed',
      cards: [],
    }
  ]
}

export const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    moveColumns: (state, action: PayloadAction<{ activeId: UniqueIdentifier, overId: UniqueIdentifier | undefined }>) => {
      const { activeId, overId } = action.payload;
      console.log({ activeId, overId });
      const oldIndex = state.columns.findIndex(col => col.id === activeId);
      const newIndex = state.columns.findIndex(col => col.id === overId);
      console.log({ oldIndex, newIndex });
      state.columns = arrayMove(state.columns, oldIndex, newIndex);
    },
    addColumn: (state) => {
      state.columns = state.columns.concat([{ id: `col-${state.columns.length}`, name: '', cards: [] }]);
    },
    deleteColumn: (state, action: PayloadAction<{ index: number }>) => {
      state.columns.splice(action.payload.index, 1);
    },
    editColumnName: (state, action: PayloadAction<{ index: number, name: string }>) => {
      const { index, name } = action.payload;
      state.columns[index].name = name;
    },
  },
})

export const { moveColumns, addColumn, deleteColumn, editColumnName } = columnsSlice.actions;

export const selectColumns = (state: RootState) => state.columnsState.columns;

export default columnsSlice.reducer;