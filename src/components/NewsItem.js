import React, { Component } from 'react'

export class NewsItem extends Component {
    
  render() {
    let {title, description, imageUrl, newsUrl} = this.props
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
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <a href={newsUrl} className="btn btn-sm btn-dark">Read More</a>
                </div>
            </div>
      </div>    
    )
  }
}

export default NewsItem

