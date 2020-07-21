import React from 'react';
import './Loading.scss';
import { Spinner } from 'react-bootstrap';

const Loading = () => {
    return (
        <div className="loading">
            <Spinner animation="border" role="status" />
            <h5>Cargando....</h5>
        </div>
    );
};

export default Loading;