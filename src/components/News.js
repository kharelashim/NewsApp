import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    constructor() {
        super();
        this.state = {
             articles: [],
             loading: false

        }
    }

   async componentDidMount(){
        let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=0308b5ec401147a7a4515e071083ff8f";
        let data = await fetch(url);
        let parseData = await data.json()
        console.log(parseData)
        this.setState({ articles: parseData.articles })
    }
    
    render() {  
        return (
            <div className='container '>
                <h1>NewsPortal - Top headlines</h1>
                <div className="row">
                    {this.state.articles.map((element) => {
                        return <div className="col md-4" key={element.url} >
                            <NewsItem  title={element.title?element.title.slice(0,40):""} description={element.description?element.description.slice(0,60):"There is no description for this in my api"} imageUrl={element.urlToImage} newsUrl={element.url} />
                        </div>
                    })}

                </div>

            </div>
        )
    }
}

export default News
