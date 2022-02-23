import React from 'react'

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

const Logout = () => {
  return (
    <Container>
        <h1 className='fw-light'>logout</h1>
        <h2 className='fw-light'>Quieres salir de tu perfil de usuario?</h2>
        <Button className='mt-2'>Salir</Button>
    </Container>
  )
}

export default Logout