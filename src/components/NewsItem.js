import React, { Component } from 'react'

export class NewsItem extends Component {
    
  render() {
    let {title, description, imageUrl, newsUrl, author, date, source} = this.props
    return (
      <div>
            <div className="card" style={{width: "18rem"}}>
            <img
            src={!imageUrl ? 'https://images.cnbctv18.com/wp-content/uploads/2024/02/federal-bank-1019x573.jpeg' : imageUrl}
            className="card-img-top"
            alt="..."
            style={{ height: '200px', objectFit: 'cover' }} 
          />
                <div className="card-body">
                      <span className="position-absolute top-0  translate-middle badge rounded-pill " style={{zIndex: '1', left: '80% ', background: 'rgb(16, 53, 137)'}}> {source}
                      </span> 
                    <h5 className="card-title">{title}   
                    </h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-body-secondary">By {!author?"Unknown": author} on {new Date(date).toGMTString()} </small></p>
                    <a href={newsUrl} className="btn btn-sm btn-dark">Read More</a>
                </div>
            </div>
      </div>    
    )
  }
}

export default NewsItem

