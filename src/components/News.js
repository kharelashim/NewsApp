import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {
    static defaultProps = {
        country: "in",
        pageSize: 12,
        category: "general"
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
    }

    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0308b5ec401147a7a4515e071083ff8f&page=1&pageSize=${this.props.pageSize}`;
        this.setState({
            loading: true
        });
        let data = await fetch(url);
        let parseData = await data.json()
        this.setState({ 
            articles: parseData.articles, 
            totalResults: parseData.totalResults,
            loading:false
        })
    }

    handlePrevClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&category=${this.props.category}&apiKey=0308b5ec401147a7a4515e071083ff8f&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({
            loading: true
        });
        let data = await fetch(url);
        let parseData = await data.json()
        this.setState({
            page: this.state.page - 1,
            articles: parseData.articles,
            loading: false
        })
    }

    handleNextClick = async () => {
        if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {

        } else {
            let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&category=${this.props.category}&apiKey=0308b5ec401147a7a4515e071083ff8f&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({
                loading: true
            });
            let data = await fetch(url);
            let parseData = await data.json()
            this.setState({
                page: this.state.page + 1,
                articles: parseData.articles,
                loading: false

            })
        }
    }


    render() {
        return (
            <div className='container ' > 
                <h1 style={{ margin: '20px 50px 60px 10px', textAlign: 'center', color: '#103589', fontWeight: 'bold', fontSize: '60px'}}>NewsPortal - Top headlines</h1>
                {this.state.loading && <Spinner/>}
                <div className="row">
                    {this.state.articles.map((element) => {
                        return <div className="col md-4" style={{ marginBottom: '20px' }} key={element.url} >
                            <NewsItem title={element.title ? element.title.slice(0, 40) : ""} description={element.description ? element.description.slice(0, 55) : "There is no description for this in my api"} imageUrl={element.urlToImage} newsUrl={element.url}  author={element.author} date={element.publishedAt} source={element.source.name}/>
                        </div>
                    })}                     
                </div>

                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr;    Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick} >Next &rarr;</button>
                </div>

            </div>
        )
    }
}

export default News
