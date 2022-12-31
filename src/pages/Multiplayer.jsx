import React, { useEffect, useState } from 'react'
import RPS from '../componens/RPS'
import gameData from '../data/rps.data';

import socketIO from 'socket.io-client';
const socket = socketIO.connect('http://192.168.1.20:4001');

const Multiplayer = () => {
    const [select, setSelect] = useState(false)
    const [opponentSelect, setOpponentSelect] = useState(false);
    const [systemMessage, setSystemMessage] = useState(false)
    const [socketId, setSocketId] = useState(0);
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [lastPong, setLastPong] = useState(null);
    const room = 'room-5'
    const state = {
        channels: [{ id: 1, name: 'first', participants: 2 }]
    }
    useEffect(() => {
        socket.on('connect', () => {
            setIsConnected(true);
        });

        socket.on('connection', (id) => {
            setSocketId(id)
            console.log('setSocketId: ', id);
            console.log(`I'm connected with the back-end`);
        });

        socket.on('disconnect', () => {
            setIsConnected(false);
        });

        socket.on('room-5 broadcast', (res) => {
            if (res.socketId !== socketId)
                setOpponentSelect(res.value)
        });
        socket.on('room-5 newgame broadcast', (res) => {
            console.log('res: ', res);
            window.location.reload();
        });
        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('pong');
        };
    }, []);

    useEffect(() => {

        if (select && !opponentSelect) {

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
    useEffect(() => {
        socket.emit('room-5', {
            socketId,
            value: select
        })
    }, [select])

    const newGame = () => {
        setOpponentSelect(false)
        setSelect(false)
        setSystemMessage(false)
        socket.emit('room-5 newgame', {
            socketId
        });
    }

    const brodcastNewGame = () => {
        setOpponentSelect(false)
        setSelect(false)
        setSystemMessage(false)
    }


    return (
        <>

            <p style={{ position: 'absolute' }}>Connected: {'' + isConnected}</p>
            <RPS
                setSelect={setSelect}
                select={select}
                systemMessage={systemMessage}
                newGame={newGame}
            />


        </>
    )
}

export default Multiplayer
