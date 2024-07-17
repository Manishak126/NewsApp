import React, {useState,useEffect } from 'react'
import NewsItem from './NewsItem'
import Loading from './Loading'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";




const News=(props)=>{

  const[articles,setArticles]=useState([])
  const[loading,setLoading]=useState(false)
  const[page,setPage]=useState(1)
  const[totalArticles,setTotalArticles]=useState(0)
  

  const capitalize=(ele)=>{
    return ele.charAt(0).toUpperCase()+ele.slice(1)
  }
 
    document.title=`${capitalize(props.category)}-NewsMonkey`
  

  const updateData=async ()=>{

    props.setProgress(10)
    let URL=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apiKey}&page=1&pageSize=${props.pageSize}`
    setLoading(true)
    let data=await fetch(URL)
    let parsedData=await data.json(URL)

    setArticles(parsedData.articles)
    setTotalArticles(parsedData.totalResults)
    setLoading(false)
    
    props.setProgress(100)
  }

  useEffect(()=>{
    updateData()
  },[])
  

  const fetchMoreData =  async () => { 
    let URL=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`
    setPage(page+1)
    setLoading({loading:true})
    let data=await fetch(URL)
    let parsedData=await data.json(URL)

    setArticles(articles.concat(parsedData.articles))
    setTotalArticles(parsedData.totalResults)
    setLoading(false)
     
  };

  //const handlePrevClick=async ()=>{
  //   setPage(page-1)
  //   updateData();
  // }

  // const handleNextClick=async ()=>{
  //     setPage(page+1)
  //     updateData();
  // }

    return (
      <>
      <div className='container my-3'>
       <h1 className='text-center' style={{margin: '35px 0px',marginTop:'90px'}}>NewsMonkey - Top {capitalize(props.category)} Headlines</h1>
       <div className='text-center'>{loading && <Loading/>}</div>
       
          <InfiniteScroll
              dataLength={articles.length}
              next={fetchMoreData}
              hasMore={articles.length!==totalArticles}
              loader={<Loading />}
          >

                <div className="container">
                    <div className="row">
                    {/*loading &&  */}
                        {articles.map((element)=>{
                          return <div className="col-md-4" key={element.url}  >
                          <NewsItem title={element.title!=null?element.title.slice(0, 45) : element.title} description={element.description!=null?element.description.slice(0,88):element.description} imageURL={element.urlToImage!=null?element.urlToImage:"https://ichef.bbci.co.uk/news/1024/branded_news/83B3/production/_115651733_breaking-large-promo-nc.png"} newsURL={element.url} author={element.author} date={element.publishedAt} name={element.source.name}/>
                        </div>
                        })}
                    </div>
                </div>
         </InfiniteScroll> 
       </div>

{/* _________________________________________________________________
                       Previous Next click button                     */}
      {/* <div className="container d-flex justify-content-between my-3">
        <button type="button" disabled={page<=1} className="btn btn-dark " onClick={handlePrevClick}>&laquo;Previous</button>
        <button type="button" disabled={Math.ceil(state.page>state.totalArticles/props.pageSize)} className="btn btn-dark" onClick={handleNextClick}>Next&raquo;</button>
      </div> */}
{/* _________________________________________________________________ */}
      </>
    )
}

News.defaultProps={
  country:'in',
  pageSize:12,
  category:'general'
 }

News.propTypes={
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
 }

export default News
