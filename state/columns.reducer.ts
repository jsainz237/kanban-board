import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { arrayMove } from '@dnd-kit/sortable';
import { RootState } from '.';
import { UniqueIdentifier } from '@dnd-kit/core';

export interface ColumnsState {
  columns: string[];
}

const initialState: ColumnsState = {
  columns: ['To do', 'In Progress', 'Completed'],
}

export const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    moveColumns: (state, action: PayloadAction<{ activeId: UniqueIdentifier, overId: UniqueIdentifier | undefined }>) => {
      const { activeId, overId } = action.payload;
      const oldIndex = state.columns.indexOf(String(activeId));
      const newIndex = state.columns.indexOf(String(overId));

      state.columns = arrayMove(state.columns, oldIndex, newIndex);
    },
    addColumn: (state) => {
      state.columns = state.columns.concat(['']);
    },
    deleteColumn: (state, action: PayloadAction<{ index: number }>) => {
      state.columns.splice(action.payload.index, 1);
    },
    editColumnName: (state, action: PayloadAction<{ index: number, name: string }>) => {
      state.columns[action.payload.index] = action.payload.name;
    },
  },
})

export const { moveColumns, addColumn, deleteColumn, editColumnName } = columnsSlice.actions;

export const selectColumns = (state: RootState) => state.columnsState.columns;

export default columnsSlice.reducer;