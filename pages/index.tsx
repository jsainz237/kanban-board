import { useEffect, useState } from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';

import { ProjectSelector } from '../components/ProjectSelector';
import { DraggableColumn } from '../components/DraggableColumn';
import { ColumnAdder } from '../components/ColumnAdder';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { moveColumns, selectColumns } from '../state/columns.reducer';
import { Card } from '../components/DraggableCard/Card';
import { Card as ICard, moveCard } from '../state/cards.reducer';
import * as Styled from '../styles/Home.styled';

const Home: NextPage = () => {
  const [activeCard, setActiveCard] = useState<ICard | null>(null);
  const columns = useAppSelector(selectColumns);
  const dispatch = useAppDispatch();

  const onDragStart = ({ active }: DragStartEvent) => {
    if(active?.data?.current?.type === 'CARD') {
      setActiveCard(active.data.current.cardProps);
    }
  }

  const onDragOver = ({ active, over }: DragOverEvent) => {    
    if(active?.data?.current?.type === 'CARD') {
      const oldColId = active.data?.current?.columnId;
      const newColId = over?.data?.current?.type === 'CARD'
        ? over?.data?.current?.columnId
        : over?.id;

      dispatch(moveCard({
        oldColId,
        newColId,
        cardId: active.id as string,
        overId: over?.id as string,
      }))
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if(active.data?.current?.type === 'COL' && active.id !== over?.id) {
      dispatch(moveColumns({
        activeId: active.id as string,
        overId: over?.id as string
      }));
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
