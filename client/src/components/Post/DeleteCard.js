import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../actions/post.actions';


function DeleteCard({ id }) {
    const dispatch = useDispatch();

    const deleteQuote = () => dispatch(deletePost(id));

    return (
        <div className='DeleteCard' onClick={() => {
            if (window.confirm('Voulez-vous supprimer cet article ?')) { deleteQuote() }
        }}>
            <img src="./img/icons/trash.svg" alt="trash" />
        </div>
    )
}
export default DeleteCard;