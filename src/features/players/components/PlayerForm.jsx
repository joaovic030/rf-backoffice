import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useUpdatePlayer } from "../mutations/useUpdatePlayer";
import { useTeamsQuery } from "../../teams/queries/useTeams";

export function PlayerForm({ actionForm, player }) {
  const { register, handleSubmit } = useForm();
  
  const [name, setName] = useState(player?.name)
  const [position, setPosition] = useState(player?.position)
  const [number, setNumber] = useState(player?.number && parseInt(player?.number) || nil)
  const [nationality, setNationality] = useState(player?.nationality)
  const [age, setAge] = useState(player.age && parseInt(player?.age) || nil) 
  const [teamId, setTeamId] = useState(player?.team?.id)

  const teams = useTeamsQuery();
  const updatePlayerMutation = useUpdatePlayer();

  const onSubmit = (values) => {
    debugger
    const id = actionForm == 'create' ? nil : { id: player.id }

    const formParams = { 
      name: values.name,
      position: values.position,
      number: parseInt(values.number),
      nationality: values.nationality,
      age: parseInt(values.age),
      team_id: parseInt(values.team_id) ,
      ...id
    }
    
    updatePlayerMutation({ variables: formParams });
  };

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
          <option>Choose one team</option>
          
          {teams.data?.teams?.nodes?.map((team) => {
            <option value={team.id}>{team.name}</option>
          })}
        </Form.Select>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Link to='/players' />
        <Button type="submit" className='w-100'>
          {actionForm == 'create' ? 'Create' : 'Update'}
        </Button>
      </Form.Group>
    </Form>
  )
}