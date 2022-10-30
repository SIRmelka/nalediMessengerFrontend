import { createContext } from 'react'
import io from 'socket.io-client'

export const userContext = createContext()
export const socket = io.connect(process.env.REACT_APP_LOCAL_HOST)

export const socketContext = createContext()

export const messagesContext = createContext()
