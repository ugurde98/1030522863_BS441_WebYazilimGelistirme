import React, { useEffect, useState } from 'react'
import RPS from '../componens/RPS'
import gameData from '../data/rps.data'
const Singleplayer = () => {
    const [select, setSelect] = useState('')
    const [opponentSelect, setOpponentSelect] = useState('');
    const [systemMessage, setSystemMessage] = useState('')
    useEffect(() => {
        if (select && !opponentSelect) {
            setTimeout(() => {
                const randSelect = Math.floor(Math.random() * gameData.length)
                console.log('randSelect: ', randSelect);
                setOpponentSelect(gameData[randSelect].value)
                console.log('(gameData[randSelect].value: ', gameData[randSelect]);
            }, 1000)
            setSystemMessage('waiting for opponent select')
        }
        if (!select && opponentSelect) {
            setSystemMessage('waiting for your select')
        }
        if (select && opponentSelect) {
            const selectedData = gameData.find(f => f.value === select)
            if (select === opponentSelect) {
                setSystemMessage('the winner is  NAN')
            }
            else if (selectedData.winners.find(f => f === opponentSelect)) {
                setSystemMessage('the winner is  oppenent')
            } else {
                setSystemMessage('Congratulations you are win  🎉 ')
            }
        }
    }, [select, opponentSelect])
    const newGame = () => {
        setOpponentSelect('')
        setSelect('')
        setSystemMessage('')
    }
    return (
        <>
            <RPS
                setSelect={setSelect}
                select={select}
                systemMessage={systemMessage}
                newGame={newGame}
            />
        </>
    )
}
export default Singleplayer
