import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useCreatePlayer } from "../mutations/useCreatePlayer";
import { useUpdatePlayer } from "../mutations/useUpdatePlayer";
import { useTeamsQuery } from "../../teams/queries/useTeams";

export function PlayerForm({ actionForm, player }) {
  const { register, handleSubmit } = useForm();
  
  const [name, setName] = useState(player?.name)
  const [position, setPosition] = useState(player?.position)
  const [number, setNumber] = useState(player?.number && parseInt(player?.number) || '')
  const [nationality, setNationality] = useState(player?.nationality)
  const [age, setAge] = useState(player?.age && parseInt(player?.age) || '') 
  const [teamId, setTeamId] = useState(player?.team?.id)

  const teams = useTeamsQuery();

  const useCreatePlayerMutation = useCreatePlayer();
  const useUpdatePlayerMutation = useUpdatePlayer();

  const onSubmit = (values) => {
    const id = actionForm == 'create' ? null : { id: player?.id }

    const formParams = { 
      name: values.name,
      position: values.position,
      number: parseInt(values.number),
      nationality: values.nationality,
      age: parseInt(values.age),
      teamId: Number.isSafeInteger(parseInt(values.team_id)) ? parseInt(values.team_id) : null,
      ...id
    }
    
    if(actionForm == 'create') {
      useCreatePlayerMutation({ variables: formParams });
    } else {
      useUpdatePlayerMutation({ variables: formParams });
    }
  };
  
  let teamsObject = teams.loading ? null : teams.data.teams.nodes;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group as={Row} className="mb-3" controlId="formHorizontal">
        <Form.Label>Name</Form.Label>
        <Form.Control {...register('name', { required: true })} type="text" placeholder="Name" value={name} onChange={(event) => setName(event.target.value)}/>

        <Form.Label>Position</Form.Label>
        <Form.Control {...register('position', { required: true })} type="text" placeholder="Position" value={position} onChange={(event) => setPosition(event.target.value)}/>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontal">
        <Form.Label>Number</Form.Label>
        <Form.Control {...register('number', { required: false, min: 1, max: 999 })} type="number" placeholder="Number" value={number} onChange={(event) => setNumber(parseInt(event.target.value))}/>

        <Form.Label>Nationality</Form.Label>
        <Form.Control {...register('nationality', { required: false, })} type="text" placeholder="Nationality" value={nationality} onChange={(event) => setNationality(event.target.value)}/>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontal">
        <Form.Label>Age</Form.Label>
        <Form.Control {...register('age', { required: true, min: 16 })} type="number" placeholder="Age" value={age} onChange={(event) => setAge(parseInt(event.target.value))}/>

        <Form.Label>Team</Form.Label>
        <Form.Select aria-label="Default select example" {...register('team_id', { required: false })} value={teamId} onChange={(event) => setTeamId(parseInt(event.target.value))}>
          <option value="">Choose one team</option>
          {teamsObject?.map((team) => (
            <option key={team.id} value={team.id}>{team.name}</option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Col sm={3}>
          <Link to='/players' className="btn btn-secondary w-100">Back</Link>
        </Col>
        <Col>
          <Button type="submit" className='w-100'>
            {actionForm == 'create' ? 'Create' : 'Update'}
          </Button>
        </Col>
      </Form.Group>
    </Form>
  )
}