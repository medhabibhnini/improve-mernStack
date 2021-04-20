import React, {useContext, useState, useEffect, useRef} from 'react'
import {useParams} from 'react-router-dom'
import {DataContext} from '../../../GlobalState'
import {getData} from '../../utils/FetchData'

import DetailPostCard from '../../utils/detailPostsCard/DetailPostCard'
import FormInput from '../../utils/formInput/FormInput'
import CommentItem from '../../utils/commentItem/CommentItem'
import Loading from '../../utils/images/loading.gif'
import Header from '../../header/Header'
import Footer from '../../footer/Footer'
function DetailPost() {
    const {id} = useParams()

    const state = useContext(DataContext)
    const [posts] = state.posts
    const socket = state.socket

    const [detailPost, setDetailPost] = useState([])

    const [rating, setRating] = useState(0)
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(false)

    const [page, setPage] = useState(1)
    const pageEnd = useRef()

 

    return (
        <>
        <Header/>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div className="container">
        <div className="detail_product_page">
            {
                detailPost.map(posts => (
                    <DetailPostCard key={posts._id} posts={posts} />
                ))
            }

            <div className="comments">
                <h2 className="app_title">
                        
                </h2>


              

                <div className="comments_list">
                    {
                        comments.map(comment => (
                            <CommentItem key={comment._id} comment={comment} socket={socket} />
                        ))
                    }
                </div>

            </div>

            
            <button ref={pageEnd} style={{opacity: 0}}>Load more</button>    
        </div>
        </div>
        <Footer/>
        </>
    )
}

export default DetailPost