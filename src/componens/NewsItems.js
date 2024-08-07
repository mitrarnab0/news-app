import React, { Component } from 'react'

export class NewsItems extends Component {
    render() {
        let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
        return (
            <>
                <div className="card my-2">
                    <span className="position-absolute top-0 end-0 translate-middle badge rounded-pill bg-danger">
                        {source}
                    </span>
                    <img src={imageUrl ? imageUrl : 'https://st4.depositphotos.com/17828278/24401/v/450/depositphotos_244011872-stock-illustration-image-vector-symbol-missing-available.jpg'} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-body-secondary">by <strong>{author ? author : 'Unknown'}</strong> on <strong>Date</strong>: {new Date(date).toDateString()} </small></p>
                        <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-dark btn-small">Details</a>
                    </div>
                </div>
            </>
        )
    }
}

export default NewsItems
