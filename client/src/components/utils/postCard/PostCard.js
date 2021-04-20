import React from 'react'
import {Link} from 'react-router-dom'
import './ProductCard.css'

function PostCard({posts}) {
    
    return (
        <div className="product_card">
            
            <h3>{posts.title}</h3>
       
            <p>{posts.description}</p>
            <div className="product_card_row">
                <Link to={`/forum/posts/${posts._id}`}>View Detail</Link>
         
            </div>
        </div>
    )
}

export default PostCard
