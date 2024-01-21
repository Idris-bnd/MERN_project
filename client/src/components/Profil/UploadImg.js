import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadPicture } from '../../actions/user.actions';


function UploadImg() {
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userReducer);

    const handlePicture = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("pseudo", userData.pseudo);
        data.append("userId", userData._id);
        data.append("file", file);
        
        dispatch(uploadPicture(data, userData._id));
    }

    return (
        <form onSubmit={handlePicture} className='upload-pic'>
            <label htmlFor="file">Changer d'image</label>
            <input
                type="file"
                name="file"
                id="file"
                accept='.jpg, .jpeg, .png'
                onChange={(e) => setFile(e.target.files[0])}
            />
            <br />
            <input type="submit" value="Envoyer l'image" />
        </form>
    )
}
export default UploadImg;