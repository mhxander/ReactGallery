import React from 'react';
import {Redirect} from 'react-router-dom';

//App Components
import Photo from './Photo';
import NoResults from './NoResults';
import Loading from './Loading';

//main topics
import mainTopics from '../mainTopics.js'

function PhotoContainer(props) {
    if (props.topic === "") {return <Redirect to={`/${mainTopics[0]}`} />}
    props.onSearch(props.topic)
    if (props.isLoading) {return <Loading />}
    if (props.photos.length===0) {return <ul><NoResults /></ul>}

    const photoComponents = props.photos.map(({farm, server, id, secret}) => {
        const url = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
        return <Photo key={id} url={url} />
    });

    return(
        <div className="photo-container">
            <h2>{props.topic}</h2>
            <ul>
                {photoComponents}
            </ul>
        </div>
    )
};

export default PhotoContainer;