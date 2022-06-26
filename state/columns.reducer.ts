import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { arrayMove } from '@dnd-kit/sortable';
import { v4 as uuid } from 'uuid';
import { RootState } from '.';
import { UniqueIdentifier } from '@dnd-kit/core';

export interface Column {
  id: string;
  name: string;
}

export interface ColumnsState {
  columns: Column[];
}

export const initialState: ColumnsState = {
  columns: [
    {
      id: uuid(),
      name: 'To do',
    },
    {
      id: uuid(),
      name: 'In progress',
    },
    {
      id: uuid(),
      name: 'Completed',
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
      state.columns = state.columns.concat([{ id: uuid(), name: '' }]);
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