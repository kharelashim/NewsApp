import React, { useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



const News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    // document.title = `${this.capitalizeFirstLetter(props.category)} - NewsPortal`;


   const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


   const updateNews = async() => {
        props.setProgress(10);
        console.log("updatenews")
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(30)
        let parseData = await data.json();
        props.setProgress(60);
        setArticles(parseData.articles)
        setTotalResults(parseData.totalResults)
        setLoading(false)
        props.setProgress(100);
    }
    
    useEffect(() => {
        updateNews();
    },[])  

    const fetchMoreData = async () => {
        const nextPage = page + 1; 
        setPage(nextPage);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${nextPage}&pageSize=${props.pageSize}`;

        let data = await fetch(url);
        let parseData = await data.json()
        setArticles(articles.concat(parseData.articles))
        setTotalResults(parseData.totalResults)
        setLoading(false)
    };

    
        return (
            <>
                <h1 style={{ margin: '20px 50px 60px 10px', textAlign: 'center', color: '#103589', fontWeight: 'bold', fontSize: '50px' }}>NewsPortal - Top Headlines from {capitalizeFirstLetter(props.category)} News</h1>
                {loading && <Spinner />}
                <InfiniteScroll style={{ overflow: 'visible' }}
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row">
                            {articles.map((element, index) => {
                                return <div className="col md-4" style={{ marginBottom: '20px' }} key={`${element.url}-${index}`}>
                                    <NewsItem
                                        title={element.title ? element.title.slice(0, 40) : ""}
                                        description={element.description ? element.description.slice(0, 55) : "There is no description for this in my api"}
                                        imageUrl={element.urlToImage}
                                        newsUrl={element.url}
                                        author={element.author}
                                        date={element.publishedAt}
                                        source={element.source.name} />
                                </div>
                            })}

                        </div>
                    </div>

                </InfiniteScroll>
            </>
        )
}

News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News
