import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthToken } from '../../auth/hooks/useAuthToken';
import { usePlayersQuery } from '../queries/usePlayers';
import { useActivateSubscription, useCancelSubscription } from '../../subscription/mutations/useSubscription';
import { Card, Button, Pagination, Row, FloatingLabel, Form } from 'react-bootstrap'

const PAGE_SIZE = 20;
const OPTIONS_FOR_SELECT = ['name_desc', 'position_asc', 
                            'position_desc', 'nationality_asc', 
                            'nationality_desc', 'age_asc', 'age_desc']

export function PlayersListPage() {
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState('name_asc');
  const authToken = useAuthToken();
  
  const subscribe = useActivateSubscription();
  const cancelSub = useCancelSubscription();

  const activateSubscription = (player_id) => {
    subscribe({ variables: { playerId: player_id } })
  }

  const cancelSubscription = (player_id) => {
    cancelSub({ variables: { playerId: player_id } })
  }

  console.log(`----->> ${authToken}`);
  const players = usePlayersQuery({ skip: page * PAGE_SIZE, limit: PAGE_SIZE, orderBy: orderBy })
  
  if (players.loading) return '...';
  if (players.error) return <React.Fragment>Error: ${players.error.message}</React.Fragment>;

  // if (!authToken) {
  //   return <Navigate to="/login" />;
  // }

  return (
    <div className="container">
      <Row className='mt-3'>
        <FloatingLabel controlId="floatingSelect" label="Order by">
          <Form.Select aria-label="floatingSelect" onChange={(event) => setOrderBy(event.target.value)}>
            <option value='name_asc'>Choose one</option>
            {OPTIONS_FOR_SELECT.map((opt) => (
              <>
                <option value={opt}>{opt.split('_').map((str) => str.charAt(0).toUpperCase() + str.slice(1)).join(' ')}</option>
              </>
            ))}
          </Form.Select>
        </FloatingLabel>
      </Row>
      {players.data.players.nodes.map((player) => (
        <Card className='mt-3'>
          <Card.Header as="h5"> {player.name} </Card.Header>
          <Card.Body>
            <Card.Title>Player {player.name}, {player.age} years old.</Card.Title>
            <Card.Text>
              <ul>
                <li key={((player || {}).team || {}).name}> Plays for: {((player || {}).team || {}).name} </li>
                <li key={player.nationality}> Nationality: {player.nationality} </li>
                <li key={player.position}> Position: {player.position} </li>
                <li key={player.number}> Number: {player.number} </li>
              </ul>
            </Card.Text>
            {player.subscribed && <Button variant="danger" onClick={() => cancelSubscription(parseInt(player.id))}>Unsubscribe notifications</Button>}
            {!player.subscribed && <Button variant="primary" onClick={() => activateSubscription(parseInt(player.id))}>Subscribe for notifications</Button>}
          </Card.Body>
        </Card>
      ))}

      <Pagination className='justify-content-center'>
        <Pagination.Prev disabled={!page} onClick={() => setPage((prev) => prev - 1)} />
        <Pagination.Item active>{page + 1}</Pagination.Item>
        <Pagination.Next onClick={() => setPage((prev) => prev + 1)} />
      </Pagination>
    </div>
  )
}
