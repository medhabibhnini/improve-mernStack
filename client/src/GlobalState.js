import React, {createContext, useState, useEffect} from 'react'
import {getData} from './components/utils/FetchData'
import io from 'socket.io-client'

export const DataContext = createContext()

export const DataProviders = ({children}) => {
    const [posts, setPosts] = useState([])


    useEffect(() => {
        getData('/forum/posts')
            .then(res => setPosts(res.data.posts))
            .catch(err => console.log(err.response.data.msg))

       
    },[])

    const state = {
        posts: [posts, setPosts],
      
    }

    return(
        <DataContext.Provider value={state}>
            {children}
        </DataContext.Provider>
    )
}