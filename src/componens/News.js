import React, { Component } from 'react'
import NewsItems from './NewsItems';
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
    };


    newsHub = async () => {
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({ loading: true })
        let data = await fetch(url);
        this.props.setProgress(40);
        let parsedData = await data.json()
        this.props.setProgress(80);
        // console.log(parsedData.articles)
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false,
        })
        this.props.setProgress(100);

    }

    async componentDidMount() {
        this.newsHub();
    }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })

        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
        })
    };




    render() {
        return (
            <div className='container-fluid mt-4'>
                <div className="container my-4">
                    <h1 className='text-center mb-4'>Headlines -
                        Top <span className="text-danger"> {this.props.category}</span>  headlines
                    </h1>
                    {this.state.loading && <Spinner />}
                    <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length !== this.state.totalResults}
                        loader={<Spinner />}
                    >
                        <div className="container">
                            <div className="row">
                                {this.state.articles.map((element) => {
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
                    </InfiniteScroll>
                </div>

                {/* <div className="d-flex justify-content-between mb-5">
                    <button className="btn-dark btn" disabled={this.state.page <= 1} onClick={this.prevBtn}>
                        Previous
                    </button>
                    <button className="btn-dark btn" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} onClick={this.nextBtn}>
                        Next
                    </button>

                </div> */}
            </div>
        )
    }
}

export default News
