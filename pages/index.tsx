import { useEffect, useState } from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
import { closestCorners, DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { horizontalListSortingStrategy, SortableContext, arrayMove } from '@dnd-kit/sortable';

import { ProjectSelector } from '../components/ProjectSelector';
import { DraggableColumn } from '../components/DraggableColumn';
import { ColumnAdder } from '../components/ColumnAdder';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { moveColumns, selectColumns } from '../state/columns.reducer';
import * as Styled from '../styles/Home.styled';
import { Card } from '../components/DraggableCard/Card';
import { Card as ICard, moveToColumn } from '../state/cards.reducer';


const Home: NextPage = () => {
  const [activeCard, setActiveCard] = useState<ICard | null>(null);
  const columns = useAppSelector(selectColumns);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(activeCard);
  }, [activeCard]);

  const onDragStart = ({ active }: DragStartEvent) => {
    console.log({ active });
    if(active?.data?.current?.type === 'CARD') {
      setActiveCard(active.data.current.cardProps);
    }
  }

  const onDragOver = ({ active, over }: DragOverEvent) => {    
    // if dragging to different col
    if(active?.data?.current?.type === 'CARD') {
      const oldColId = active.data?.current?.columnId;
      const newColId = over?.data?.current?.type === 'CARD'
        ? over?.data?.current?.columnId
        : over?.id;

      dispatch(moveToColumn({
        oldColId,
        newColId,
        cardId: active.id as string,
      }))
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if(active.data?.current?.type === 'COL' && active.id !== over?.id) {
      dispatch(moveColumns({ activeId: active.id, overId: over?.id }))
    }

    setActiveCard(null);
  }

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
          <DndContext
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={columns.map(col => col.id)}
              strategy={horizontalListSortingStrategy}
            >
              {columns.map((col, ind) => <DraggableColumn key={col.id} index={ind} {...col} /> )}
              <ColumnAdder />
              { activeCard && (
                <DragOverlay>
                  <Card {...activeCard} />
                </DragOverlay>
              )}
            </SortableContext>
          </DndContext>
        </Styled.ColumnContainer>
      </main>
    </div>
  )
}

export default Home
