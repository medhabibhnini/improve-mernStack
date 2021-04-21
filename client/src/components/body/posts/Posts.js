import React, {useContext} from 'react'
import {DataContext} from '../../../GlobalState'
import PostCard from '../../utils/postCard/PostCard'
import Header from '../../header/Header'
import Footer from '../../footer/Footer'
import {Link} from 'react-router-dom'
function Posts() {
    const state = useContext(DataContext)
    const [posts] = state.posts
    console.log(posts)

    
    return (
        <>
        <Header/>
        
<br>
</br>
<br></br>
<br>
</br>
<br></br>
<div className="container mt-5">
               <h3 className="pt-4 d-inline latest-news">Forum</h3>
               <Link to="/posts/add" className="btn btn-outline-primary btn-circle d-inline float-right">Add Post</Link>
              
               <p className="h5 text-center text-muted"></p> 
   
       
                
                {
                    posts.map(posts => (
                        <PostCard  key={posts._id} posts={posts} />
                    ))
                }
         
           
         
            </div>
            <Footer/>
        </>
    )
}

export default Posts
