import React from 'react'
import './DetailProductCard.css'
import Rating from '../rating/Rating'

function DetailPostsCard({posts}) {
    return (
        <div className="detail_product_card">
       

        <div className="detail_product_card_content">
            <h2>{posts.title}</h2>

            <p>{posts.description}</p>


            <div>
    
                <Rating props={posts} />
            </div>
        </div>
    </div>
    )
}

export default DetailPostsCard
