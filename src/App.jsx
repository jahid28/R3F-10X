import './App.css';
import { useLocation } from 'react-router-dom';
import { useEffect,memo,useCallback } from 'react';

// import { AnimatePresence, motion } from 'framer-motion';

import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
// https://github.com/jahid28/R3F-10X/blob/main/src/components/Animation.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";

function App() {

  let loc = useLocation()
  let locpath = loc.pathname

  useEffect(() => {
    
    // document.querySelector('.navContact').style.color = 'white'
    document.querySelector('.navHome').style.color = 'white'
    document.querySelector('.navAbout').style.color = 'white'
    // document.querySelector('.navBlog').style.color = 'white'

    switch (locpath) {
      case '/':
        document.querySelector('.navHome').style.color = 'rgb(235, 194, 95)'
        break;
      case '/about':
        document.querySelector('.navAbout').style.color = 'rgb(235, 194, 95)'
        break;
      // case '/contact':
      //   document.querySelector('.navContact').style.color = 'rgb(235, 194, 95)'
      //   break;
      // case '/blog':
      //   document.querySelector('.navBlog').style.color = 'rgb(235, 194, 95)'
      //   break;

    }

   

  }, [locpath])


  return (
    <div id='appBody' className='appBody'>
      <Navbar />

      {/* <AnimatePresenc.e wait> */}

        <Routes location={loc} key={locpath}>

          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          {/* <Route path='/contact' element={<Contact />} /> */}
          {/* <Route path='/allProjects' element={<AllProjects/>} /> */}
          {/* <Route path='/blog' element={<Blog />} /> */}
          {/* <Route path='*' element={<ErrorPage />} /> */}
        </Routes>

      {/* </AnimatePresence> */}



    </div>
  );
}

export default memo(App);
