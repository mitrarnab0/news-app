import React, { Component } from 'react'
import NewsItems from './NewsItems';
// import Spinner from './Spinner.js'
import Spinner from './Spinner'

export class News extends Component {

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1

        }

    };

    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=1ce0d7f388d74ef6982b7514c929e54f&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json()

        // console.log(parsedData.articles)
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
    }

    prevBtn = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=1ce0d7f388d74ef6982b7514c929e54f&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
        this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json()

        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false
        })

    }

    nextBtn = async () => {
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
            let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=1ce0d7f388d74ef6982b7514c929e54f&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
            this.setState({ loading: true })
            let data = await fetch(url);
            let parsedData = await data.json()

            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles,
                loading: false
            })
        }
    }

    render() {
        return (
            <div className='container-fluid mt-4'>
                <div className="container my-4">
                    <h1 className='text-center mb-4'>Headlines -
                        <span className="text-danger">Top</span> headlines
                    </h1>
                    {this.state.loading && <Spinner />}
                    <div className="row">
                        {!this.state.loading && this.state.articles.map((element) => {
                            return <div className='col-md-4 col-12' key={element.url}>
                                <NewsItems
                                    title={element.title}
                                    description={element.description}
                                    imageUrl={element.urlToImage}
                                    newsUrl={element.url}
                                />
                            </div>
                        })}
                    </div>
                </div>

                <div className="d-flex justify-content-between mb-5">
                    <button className="btn-dark btn" disabled={this.state.page <= 1} onClick={this.prevBtn}>
                        Previous
                    </button>
                    <button className="btn-dark btn" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} onClick={this.nextBtn}>
                        Next
                    </button>
                    {/* <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-end">
                            <li className={`page-item `} disabled={this.state.page > 1} onClick={this.prevBtn}>
                                <span className="page-link user-select-none" disabled={this.state.page > 1} >Previous</span>
                            </li>
                            <li className="page-item"><a className="page-link" href="/">1</a></li>
                            <li className="page-item"><a className="page-link" href="/">2</a></li>
                            <li className="page-item"><a className="page-link" href="/">3</a></li>
                            <li className={`page-item`} onClick={this.nextBtn}>
                                <span className={`page-link user-select-none`}>Next</span>
                            </li>
                        </ul>
                    </nav> */}
                </div>
            </div>
        )
    }
}

export default News
