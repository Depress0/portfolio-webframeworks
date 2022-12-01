import React, { useState } from 'react';
import axios from 'axios';
import { Outlet, createBrowserRouter, RouterProvider, Route, NavLink } from "react-router-dom";

//Interfaces Bitcoin Api
interface Bitcoin {
  time:       Time;
  disclaimer: string;
  chartName:  string;
  bpi:        Bpi;
}

interface Bpi {
  USD: Eur;
  GBP: Eur;
  EUR: Eur;
}

interface Eur {
  code:        string;
  symbol:      string;
  rate:        string;
  description: string;
  rate_float:  number;
}

interface Time {
  updated:    string;
  updatedISO: Date;
  updateduk:  string;
}
/////////////////////////////////////////////////

const Root = () => {
  const [ranFirstTime,setRanFirstTime] = useState<boolean>(false)
  const [btcPrice,setBtcPrice] = useState<number>();
  const [updateTime,setUpdateTime] = useState<string>('Updating...');
  const ApiCall = async() => {
    let result = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
    let data:Bitcoin = await result.data
    setBtcPrice(data.bpi.EUR.rate_float)
    setUpdateTime(data.time.updateduk)
    setTimeout(ApiCall,10000)
  }
  ApiCall()
    return <div>
    <div className='nav'>
      <NavLink to={"/"}>Home</NavLink>
      <NavLink to={"projects"}>Projects</NavLink>
      <NavLink to={"contact"}>Contact</NavLink>
    </div>
    <div className='nav-api'>
      <div>Current Bitcoin price: €{btcPrice} ({updateTime})</div>
    </div>
    <div>
      <Outlet />
    </div>
  </div>
}

const Home = () => {
  return <div>
    <h1 className='home-title'>Ian Segers</h1>
    <main className='home-main'>
      <article className='home-description'>
        Welcome to my personal portfolio! <br />
        I am a web application developer based in Belgium. <br />
        Experienced in multiple programming languages listed below. <br />
        <article className='home-skills'>
          <div className='home-skills-comp'>
            <img src="./csharp.png" width='75' alt="CSharp Logo" /> Good
          </div>
          <div className='home-skills-comp'>
            <img src="./ts.png" width='75' alt="TypeScript Logo" /> Very Good
          </div>
          <div className='home-skills-comp'>
            <img src="./react.png" width='75' alt="React Logo" /> Good
          </div>
          <div className='home-skills-comp'>
            <img src="./mysql.png" width='75' alt="MySQL Logo" /> Very Good
          </div>
        </article>
        <br /> Further in this portfolio you can find some of my projects. <br />
        <NavLink to={"projects"}>Projects</NavLink>
      </article>
    </main>
  </div>
}


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "",
          element: <Home />
        },
      ]
    }
  ]);
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
