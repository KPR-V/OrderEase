"use client"
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
const connectsocket = () => {
  const [socket,setsocket] = useState(undefined)

    useEffect(()=>{
      const newsocket = io("http://localhost:3000")
        setsocket(newsocket)
        return () => newsocket.close()
    },[])
    return socket
}

export default connectsocket
