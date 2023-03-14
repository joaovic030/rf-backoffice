import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useUserProfile } from '../../auth/hooks/useUserProfile';
import { usePlayersQuery } from '../queries/usePlayers';
import { useDeletePlayer } from '../mutations/useDeletePlayer'
import { Button, Pagination, Row, FloatingLabel, Form, Table, Col } from 'react-bootstrap'
import { Header } from '../../shared/components/Header';
import { useApolloClient } from '@apollo/client';

const PAGE_SIZE = 20;
const OPTIONS_FOR_SELECT = ['name_desc', 'position_asc', 
                            'position_desc', 'nationality_asc', 
                            'nationality_desc', 'age_asc', 'age_desc']

export function PlayersListPage() {
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState('name_asc');
  const userProfile = useUserProfile();
  
  const deletePlayer = useDeletePlayer();
  
  const client = useApolloClient();
  
  const players = usePlayersQuery({ skip: page * PAGE_SIZE, limit: PAGE_SIZE, orderBy: orderBy });
  
  useEffect(() => {
    handleRefetch();
  });

  const handleDelete = (playerId) => {
    deletePlayer({ variables: { id: playerId } });
    handleRefetch();
  }

  const handleRefetch = async () => {
    await players.refetch();

    client.cache.evict({ fieldName: 'PlayersQuery' });
    client.cache.gc();
  }
  
  if (players.loading) return '...';
  if (players.error) return <React.Fragment>Error: ${players.error.message}</React.Fragment>;

  if (!userProfile) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Header />
      <div className="container">
        <Row>
          <Col sm={10}>
            <h1>Players</h1>
          </Col>
          <Col sm={2} className="align-items-center">
            <Link to="/create_player" className='btn btn-success'>Create new player</Link>
          </Col>
        </Row>
        <Row className='mt-3'>
          <FloatingLabel controlId="floatingSelect" label="Order by">
            <Form.Select aria-label="floatingSelect" onChange={(event) => setOrderBy(event.target.value)}>
              <option value='name_asc'>Choose one</option>
              {OPTIONS_FOR_SELECT.map((opt) => (
                <>
                  <option key={opt} value={opt}>{opt.split('_').map((str) => str.charAt(0).toUpperCase() + str.slice(1)).join(' ')}</option>
                </>
              ))}
            </Form.Select>
          </FloatingLabel>
        </Row>

        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Position</th>
              <th>Number</th>
              <th>Nationality</th>
              <th>Age</th>
              <th>Team</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {players.data.players.nodes.map((player) => (
              <tr key={player.id}>
              <td>{player.id}</td>
              <td>{player.name}</td>
              <td>{player.position}</td>
              <td>{player.number}</td>
              <td>{player.nationality}</td>
              <td>{player.age}</td>
              <td>{((player || {}).team || {}).name}</td>
              <td>
                <div className='d-flex justify-content-evenly'>
                  <Link to="/player" state={{ player: player }} className='btn btn-primary'>Show</Link>

                  <Button variant='danger' onClick={() => handleDelete(player.id)}>Delete</Button>
                </div>
              </td>
            </tr>
            ))}
          </tbody>
        </Table>

        <Pagination className='justify-content-center'>
          <Pagination.Prev disabled={!page} onClick={() => setPage((prev) => prev - 1)} />
          <Pagination.Item active>{page + 1}</Pagination.Item>
          <Pagination.Next onClick={() => setPage((prev) => prev + 1)} />
        </Pagination>
      </div>
    </>
  )
}
