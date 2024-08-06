import React, { Component } from 'react'

export class NewsItems extends Component {
    render() {
        let { title, description, imageUrl, newsUrl } = this.props;
        return (
            <>
                <div className="card" style={{ width: '18rem' }}>
                    <img src={imageUrl ? imageUrl : 'https://st4.depositphotos.com/17828278/24401/v/450/depositphotos_244011872-stock-illustration-image-vector-symbol-missing-available.jpg'} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-dark btn-small">Details</a>
                    </div>
                </div>
            </>
        )
    }
}

export default NewsItems
