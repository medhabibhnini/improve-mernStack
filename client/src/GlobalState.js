import React, {createContext, useState, useEffect} from 'react'
import {getData} from './components/utils/FetchData'
import io from 'socket.io-client'

export const DataContext = createContext()

export const DataProvider = ({children}) => {
    const [posts, setPosts] = useState([])
    const [socket, setSocket] = useState(null)

    useEffect(() => {
        getData('/forum/posts')
            .then(res => setPosts(res.data.posts))
            .catch(err => console.log(err.response.data.msg))

        const socket = io()
        setSocket(socket)
        return () =>  socket.close()
    },[])

    const state = {
        posts: [posts, setPosts],
        socket
    }

    return(
        <DataContext.Provider value={state}>
            {children}
        </DataContext.Provider>
    )
}