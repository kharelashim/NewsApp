import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
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
        let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=0308b5ec401147a7a4515e071083ff8f&page=1&pageSize=20";
        let data = await fetch(url);
        let parseData = await data.json()
        this.setState({ articles: parseData.articles, totalResults: parseData.totalResults})
    }

    handlePrevClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=0308b5ec401147a7a4515e071083ff8f&page=${this.state.page - 1}&pageSize=20`;
        let data = await fetch(url);
        let parseData = await data.json()
        this.setState({
            page: this.state.page - 1,
            articles: parseData.articles
        })


    }

    handleNextClick = async () =>{
        if (this.state.page + 1 > Math.ceil(this.state.totalResults / 20)) {
            
        } else {  
            let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=0308b5ec401147a7a4515e071083ff8f&page=${this.state.page + 1}&pageSize=20`;
            let data = await fetch(url);
            let parseData = await data.json()
            this.setState({
                page: this.state.page + 1,
                articles: parseData.articles

            })
        }
    }


    render() {
        return (
            <div className='container '>
                <h1>NewsPortal - Top headlines</h1>
                <div className="row">
                    {this.state.articles.map((element) => {
                        return <div className="col md-4" style={{ marginBottom: '20px' }} key={element.url} >
                            <NewsItem title={element.title ? element.title.slice(0, 40) : ""} description={element.description ? element.description.slice(0, 55) : "There is no description for this in my api"} imageUrl={element.urlToImage} newsUrl={element.url} />
                        </div>
                    })}
                </div>

                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr;    Previous</button>
                    <button type="button" className="btn btn-dark" onClick={this.handleNextClick} >Next &rarr;</button>
                </div>

            </div>
        )
    }
}

export default News
