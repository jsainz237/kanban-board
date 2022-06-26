import { useEffect, useState } from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { horizontalListSortingStrategy, SortableContext, arrayMove } from '@dnd-kit/sortable';

import { ProjectSelector } from '../components/ProjectSelector';
import { DraggableColumn } from '../components/DraggableColumn';
import { ColumnAdder } from '../components/ColumnAdder';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { moveColumns, selectColumns } from '../state/columns.reducer';
import * as Styled from '../styles/Home.styled';


const Home: NextPage = () => {
  const columns = useAppSelector(selectColumns);
  const dispatch = useAppDispatch();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if(active.id !== over?.id) {
      dispatch(moveColumns({ activeId: active.id, overId: over?.id }))
    }
  }

  useEffect(() => {
    console.log(columns);
  }, [columns]);

  return (
    <div>
      <Head>
        <title>Kanban Board</title>
        <meta name="description" content="Kanban board showcase application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ paddingLeft: 48 }}>
        <ProjectSelector />
        <Styled.ColumnContainer>
          <DndContext onDragEnd={handleDragEnd}>
            <SortableContext
              items={columns.map(col => col.id)}
              strategy={horizontalListSortingStrategy}
            >
              {columns.map((col, ind) => <DraggableColumn key={col.id} index={ind} {...col} /> )}
              <ColumnAdder />
            </SortableContext>
          </DndContext>
        </Styled.ColumnContainer>
      </main>
    </div>
  )
}

export default Home
