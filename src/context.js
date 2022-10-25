import { createContext } from 'react'
import io from 'socket.io-client'

export const userContext = createContext()
export const socket = io.connect('http://localhost:3001')

// socket.emit("newmessage",{message:"hey"})

// socket.on('receivemessage', (data)=>{
//     alert("hello")
// })

export const socketContext = createContext()

export const messagesContext = createContext()
