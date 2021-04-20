import React, {useContext} from 'react'
import {DataContext} from '../../../GlobalState'
import PostCard from '../../utils/postCard/PostCard'
import Header from '../../header/Header'
import Footer from '../../footer/Footer'
function Posts() {
    const state = useContext(DataContext)
    const [posts] = state.posts
    console.log(posts)

    
    return (
        <>
        <Header/>
        
        <div class="main-content">
       
            <h2 className="app_title">
                        </h2>
            <div className="products_page">
                
                {
                    posts.map(posts => (
                        <PostCard key={posts._id} posts={posts} />
                    ))
                }
            </div>
           
            </div>
            
            <Footer/>
        </>
    )
}

export default Posts
