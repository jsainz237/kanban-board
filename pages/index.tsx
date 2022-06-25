import { useState } from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { horizontalListSortingStrategy, SortableContext, arrayMove } from '@dnd-kit/sortable';
import { ProjectSelector } from '../components/ProjectSelector';
import { DraggableColumn } from '../components/DraggableColumn';
import * as Styled from '../styles/Home.styled';
import { ColumnAdder } from '../components/ColumnAdder';

const Home: NextPage = () => {
  const [columns, setColumns] = useState<string[]>(['To do', 'In progress']);

  const onColumnNameEdit = (ind: number, name: string) => {
    const cols = [...columns];
    cols[ind] = name;
    console.log(name);
    setColumns(cols);
  }

  const addColumn = () => {
    setColumns(prev => prev.concat(['']));
  }

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

      <main style={{ paddingLeft: 48 }}>
        <ProjectSelector />
        <Styled.ColumnContainer>
          <DndContext onDragEnd={handleDragEnd}>
            <SortableContext
              items={columns}
              strategy={horizontalListSortingStrategy}
            >
              {columns.map((name, ind) => <DraggableColumn key={name} name={name} index={ind} onNameEdit={onColumnNameEdit} /> )}
              <ColumnAdder onClick={addColumn} />
            </SortableContext>
          </DndContext>
        </Styled.ColumnContainer>
      </main>
    </div>
  )
}

export default Home
