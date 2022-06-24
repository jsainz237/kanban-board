import { useState } from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
import Container from 'react-bootstrap/Container';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { horizontalListSortingStrategy, SortableContext, arrayMove } from '@dnd-kit/sortable';
import { ProjectSelector } from '../components/ProjectSelector';
import { DraggableColumn } from '../components/DraggableColumn';
import * as Styled from '../styles/Home.styled';

const Home: NextPage = () => {
  const [columns, setColumns] = useState<string[]>(['To do', 'In progress', 'Completed']);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if(active.id !== over?.id) {
      setColumns(prev => {
        const oldIndex = prev.indexOf(String(active.id));
        const newIndex = prev.indexOf(String(over?.id));

        return arrayMove(prev, oldIndex, newIndex);
      })
    }

  }

  return (
    <div>
      <Head>
        <title>Kanban Board</title>
        <meta name="description" content="Kanban board showcase application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container>
          <ProjectSelector />
          <Styled.ColumnContainer>
            <DndContext onDragEnd={handleDragEnd}>
              <SortableContext
                items={columns}
                strategy={horizontalListSortingStrategy}
              >
                {columns.map(name => <DraggableColumn key={name} name={name} /> )}
              </SortableContext>
            </DndContext>
          </Styled.ColumnContainer>
        </Container>
      </main>
    </div>
  )
}

export default Home
