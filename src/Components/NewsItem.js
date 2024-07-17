import React, { Component } from 'react'

const NewsItem=(props)=> {
  
    let {title,description,imageURL,newsURL,author,date,name}=props
    return (
      <div className='my-3'>
        <div className="card  mx-3" >
          
        <div className="disp">
        <span className="badge rounded-pill bg-danger">
            {name}
          </span>
        </div>
          
          <img src={imageURL} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-body-secondary">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsURL} target='_blank' className="btn btn-dark btn-sm">Read More</a>
          </div>
        </div>
      </div>
    )
  
}

export default NewsItem
