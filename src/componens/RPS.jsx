import { Button, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { Link } from 'react-router-dom'
import gameData from '../data/rps.data'
const RPS = ({ select, setSelect, systemMessage, newGame }) => {

  const handleSelect = (value) => {

    setSelect(value)
  }
  return (
    <>
      {
        systemMessage &&
        <Box
          sx={{
            position: 'fixed',
            left: '50%',
            top: '50%',
            zIndex: 99,
            background: '#00000050',
            transform: 'translate(-50%, -50%)',
            padding: '10px',
          }}
        >
          <Typography variant="h3" component="h3">
            {systemMessage}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-around', margin: 1 }}>
            <Button color='success' variant='contained' onClick={() => newGame()} >New Game</Button>
            <Link to={'/'}> <Button color='secondary' sx={{ textDecoration: 'none' }} variant='contained' >Go Home</Button> </Link>
          </Box>
        </Box>
      }
      <Box
        sx={{
          width: '100vw',
          height: '50vh',
          backgroundColor: '#c1c1c1',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center'
          
        }}
      >

        <Grid container spacing={2} >

          {
            gameData.map((game) =>
       

              <Grid item xs={4} key={game.value}>
                <Button disabled variant="contained" onClick={() => handleSelect(game.value)}>{game.text} </Button>
              </Grid>
           
            )
          }

        </Grid>

      </Box>

      <Box
        sx={{
          width: '100vw',
          height: '50vh',
          backgroundColor: '#a1a1a1',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
         
        }}
      >

        <Grid container spacing={2} >
          {
            gameData.map((game) => {
              const disabled = select && (select !== game.value) ? true : false
              return (
                <Grid item xs={4} key={game.value}>
                  <Button disabled={disabled} variant="contained" onClick={() => handleSelect(game.value)}>{game.text} </Button>
                </Grid>
              )
            }
            )
          }

        </Grid>

      </Box>

    </>

  )
}



export default RPS
