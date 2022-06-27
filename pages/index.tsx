import { useState } from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, MouseSensor, useSensor, useSensors } from '@dnd-kit/core';
import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';

import { useAppDispatch, useAppSelector } from '../state/hooks';
import { ProjectSelector } from '../components/ProjectSelector';
import { ColumnAdder } from '../components/Column/ColumnAdder';
import { Column, Props as IColumn } from '../components/Column';
import { DraggableColumn } from '../components/Column/DraggableColumn';
import { Card, Props as ICard } from '../components/Card';
import { moveColumns, selectColumns, moveCard, selectActiveProject } from '../state/projects.reducer';
import * as Styled from '../styles/Home.styled';

const Home: NextPage = () => {
  const [activeElement, setActiveElement] = useState<
    { type: 'CARD' | 'COL', props: ICard | IColumn } | null
  >(null);

  const activeProject = useAppSelector(selectActiveProject)
  const columns = useAppSelector(selectColumns);
  const dispatch = useAppDispatch();

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 15,
    }
  });

  const sensors = useSensors(mouseSensor);

  const onDragStart = ({ active }: DragStartEvent) => {
    if(active?.data?.current?.type === 'CARD') {
      const { cardProps } = active.data.current;
      setActiveElement({
        type: 'CARD',
        props: cardProps,
      });
      return;
    }

    if(active?.data?.current?.type === 'COL') {
      const { columnProps } = active.data.current;
      setActiveElement({
        type: 'COL',
        props: columnProps,
      });
      return;
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

    setActiveElement(null);
  }

  const renderActiveElement = () => {
    if(!activeElement) {
      return null;
    }

    if(activeElement.type === 'CARD') {
      return <Card {...activeElement?.props as ICard} />
    }

    if(activeElement.type === 'COL') {
      return <Column {...activeElement?.props as IColumn} />
    }
  }

  return (
    <div>
      <Head>
        <title>Kanban Board - {activeProject.name}</title>
        <meta name="description" content="Kanban board showcase application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Styled.Main>
        <ProjectSelector />
        <Styled.ColumnContainer>
          <DndContext
            sensors={sensors}
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
              { activeElement && (
                <DragOverlay>
                  {renderActiveElement()}
                </DragOverlay>
              )}
            </SortableContext>
          </DndContext>
        </Styled.ColumnContainer>
      </Styled.Main>
    </div>
  )
}

export default Home
