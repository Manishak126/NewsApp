import './App.css';
import React, {useState } from 'react'
//import {Router, Routes, Route } from "react-router-dom";
import NavBar from './Components/NavBar';
import News from './Components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App =()=> {
  const apiKey=process.env.REACT_APP_NEWS_API
  
  const[progress,setProgress]=useState(0)
  
    return (
      // <div>
      //   <NavBar/>
      //   <News country='us' pageSize='12' category='health'/>
      // </div>
    
   <div>
      <Router>
      <NavBar/>
      <LoadingBar
        height={3}
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
        <Routes> 
            <Route exact path="/" element={<News apiKey={apiKey} setProgress={setProgress} key="general" pageSize={5} country= 'in' category="general"/>}></Route>
            <Route exact path="/business" element={<News apiKey={apiKey} setProgress={setProgress}key="business" pageSize={5} country= 'in' category="business"/>}></Route>
            <Route exact path="/entertainment" element={<News apiKey={apiKey} setProgress={setProgress}key="entertainment" pageSize={5} country= 'in' category="entertainment"/>}></Route>
            <Route exact path="/general" element={<News apiKey={apiKey} setProgress={setProgress}key="general" pageSize={5} country= 'in' category="general"/>}></Route>
            <Route exact path="/health" element={<News apiKey={apiKey} setProgress={setProgress}key="health" pageSize={5} country= 'in' category="health"/>}></Route>
            <Route exact path="/science" element={<News apiKey={apiKey} setProgress={setProgress}key="science" pageSize={5} country= 'in' category="science"/>}></Route>
            <Route exact path="/sports" element={<News apiKey={apiKey} setProgress={setProgress}key="sports" pageSize={5} country= 'in' category="sports"/>}></Route>
            <Route exact path="/technology" element={<News apiKey={apiKey} setProgress={setProgress}key="technology" pageSize={5} country= 'in' category="technology"/>}></Route>
        </Routes>
      </Router>
   </div>


    
   
    
    )
  
}

export default App
