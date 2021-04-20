import React, {createContext, useState, useEffect} from 'react'
import CoursesAPI from './api/CoursesAPI'
import UserAPI from './api/UserAPI'

import axios from 'axios'

export const GlobalState = createContext()


export const DataProvider = ({children}) =>{
    const [token, setToken] = useState(false)


    useEffect(() =>{
        const firstLogin = localStorage.getItem('firstLogin')
        if(firstLogin){
            const refreshToken = async () =>{
                const res = await axios.get('/user/refresh_token')
        
                setToken(res.data.accesstoken)
    
                setTimeout(() => {
                    refreshToken()
                }, 10 * 60 * 1000)
            }
            refreshToken()
        }
    },[])


    
    const state = {
        token: [token, setToken],
        coursesAPI: CoursesAPI(),
        userAPI: UserAPI(token),
        
    }

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>


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