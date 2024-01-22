import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { isEmpty, timestampParser } from '../Utils';



function NewPostForm() {
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [postPicture, setPostPicture] = useState(null);
    const [video, setVideo] = useState('');
    const [file, setFile] = useState();
    const userData = useSelector((state) => state.userReducer);

    const handlePicture = (e) => {

    }
    const handlePost = (e) => {

    }
    const handleVideo = (e) => {
        let findLink = message.split(' ');
        findLink.forEach((mot, index) => {
            console.log(index);
            if (mot.includes('https://www.youtube') || mot.includes('https://youtube')) {
                let embed = mot.replace('watch?v=', 'embed/');
                setVideo(embed.split('&')[0]);
                findLink.splice(index, 1)
                setMessage(findLink.join(' '));
                setPostPicture('');
            }
        })
    }
    const cancelPost = (e) => {
        setMessage('');
        setPostPicture('');
        setVideo('');
        setFile('');
    }

    useEffect(() => {
        if (!isEmpty(userData)) setIsLoading(false);
        else setIsLoading(true);

        handleVideo();
    }, [userData, message, video]);

    return (
        <div className="post-container">
            {isLoading ? (
                <i className='fas fa-spinner fa-pulse'></i>
            ) : (
                <>
                    <div className="data">
                        <p><span>{userData.following && userData.following.length}</span> Abonnement{userData.following && userData.following.length > 1 && 's'}</p>
                        <p><span>{userData.followers && userData.followers.length}</span> Abonné{userData.followers && userData.followers.length > 1 && 's'}</p>
                    </div>
                    <NavLink to="profil">
                        <div className="user-info">
                            <img src={userData.picture} alt="user-img" />
                        </div>
                    </NavLink>
                    <div className="post-form">
                        <textarea
                            name="message"
                            id="message"
                            placeholder='Quoi de neuf ?'
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                        />
                        {message || postPicture || video.length > 20 ? (
                            <li className="card-container">
                                <div className="card-left">
                                    <img src={userData.picture} alt="user-pic" />
                                </div>
                                <div className="card-right">
                                    <div className="card-header">
                                        <div className="pseudo">
                                            <h3>{userData.pseudo}</h3>
                                        </div>
                                        <span>{timestampParser(Date.now())}</span>
                                    </div>
                                    <div className="content">
                                        <p>{message}</p>
                                        {postPicture && <img src={postPicture} alt="post-pic" />}
                                        {video && (
                                            <iframe
                                                width="500"
                                                height="300"
                                                src={video}
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                title={video}
                                            ></iframe>
                                        )}
                                    </div>
                                </div>
                            </li>
                        ) : ''}
                        <div className="footer-form">
                            <div className="icon">
                                {isEmpty(video) && (
                                    <>
                                        <img src="./img/icons/picture.svg" alt="image" />
                                        <input type="file" id='file-upload' name='file' accept='.jpg, .jpeg, .png' onChange={(e) => handlePicture(e)} />
                                    </>
                                )}
                                {video && (
                                    <button onClick={() => setVideo('')}>Supprimer video</button>
                                )}
                            </div>
                            <div className="btn-send">
                                {message || postPicture || video.length > 20 ? (
                                    <button className="cancel" onClick={cancelPost}>Annuler message</button>
                                ) : ''}
                                <button className="send" onClick={handlePost}>Envoyer</button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
export default NewPostForm;