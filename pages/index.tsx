import type { NextPage } from 'next'
import Head from 'next/head'
import Container from 'react-bootstrap/Container';
import { ProjectSelector } from '../components/ProjectSelector';

const Home: NextPage = () => {
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
        </Container>
      </main>
    </div>
  )
}

export default Home
