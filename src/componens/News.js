import React, { Component } from 'react'
import NewsItems from './NewsItems';
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


    newsHub = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1ce0d7f388d74ef6982b7514c929e54f&page=${this.state.page}&pageSize=${this.props.pageSize}`
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

    async componentDidMount() {
        this.newsHub();
    }

    prevBtn = async () => {
        this.newsHub();

        this.setState({
            page: this.state.page - 1,
        })

    }

    nextBtn = async () => {
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {

            this.newsHub();

            this.setState({
                page: this.state.page + 1,

            })
        }
    }

    render() {
        return (
            <div className='container-fluid mt-4'>
                <div className="container my-4">
                    <h1 className='text-center mb-4'>Headlines -
                        Top <span className="text-danger"> {this.props.category}</span>  headlines
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
                                    author={element.author}
                                    date={element.publishedAt}
                                    source={element.source.name}
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

                </div>
            </div>
        )
    }
}

export default News
