import React, { useState } from 'react';
import axios from 'axios';
import { Outlet, createBrowserRouter, RouterProvider, Route, NavLink } from "react-router-dom";
import styles from './App.module.css';

//Interfaces Bitcoin Api
interface Bitcoin {
  time: Time;
  disclaimer: string;
  chartName: string;
  bpi: Bpi;
}

interface Bpi {
  USD: Eur;
  GBP: Eur;
  EUR: Eur;
}

interface Eur {
  code: string;
  symbol: string;
  rate: string;
  description: string;
  rate_float: number;
}

interface Time {
  updated: string;
  updatedISO: Date;
  updateduk: string;
}
/////////////////////////////////////////////////

const Root = () => {
  const [btcPrice, setBtcPrice] = useState<number>();
  const [updateTime, setUpdateTime] = useState<string>('Updating...');
  const ApiCall = async () => {
    let result = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
    let data: Bitcoin = await result.data
    setBtcPrice(data.bpi.EUR.rate_float)
    setUpdateTime(data.time.updateduk)
    setTimeout(ApiCall, 10000)
  }
  ApiCall()
  return <div>
    <div className={styles.nav}>
      <NavLink className={({ isActive }) => isActive ? styles.navlinkActive : styles.navlink} to={"/"}>Home</NavLink>
      <NavLink className={({ isActive }) => isActive ? styles.navlinkActive : styles.navlink} to={"projects"}>Projects</NavLink>
      <NavLink className={({ isActive }) => isActive ? styles.navlinkActive : styles.navlink} to={"contact"}>Contact</NavLink>
    </div>
    <div className={styles.navapi}>
      <div>Current Bitcoin price: €{btcPrice} ({updateTime})</div>
    </div>
    <div>
      <Outlet />
    </div>
  </div>
}

const Contact = () => {
  return <div>

  </div>
}

const Projects = () => {
  return <div>

  </div>
}

const Home = () => {
  return <div className={styles.App}>
    <h1 className={styles.hometitle}>Ian Segers</h1>
    <main className={styles.homemain}>
      <article className={styles.homeskills}>
        Welcome to my personal portfolio! <br />
        I am a web application developer based in Belgium. <br />
        Experienced in multiple programming languages listed below. <br />
        <div className={styles.homeskillsgrid}>
          <div className={styles.homeskillscomp}>
            <img className={styles.homeskillsimg} src="./csharp.png" width='75' alt="CSharp Logo" />
            <p className={styles.homeskillscomptext}>C#</p>
          </div>
          <div className={styles.homeskillscomp}>
            <img  className={styles.homeskillsimg} src="./ts.png" width='75' alt="TypeScript Logo" />
            <p className={styles.homeskillscomptext}>TypeScript</p>
          </div>
          <div className={styles.homeskillscomp} >
            <img className={styles.homeskillsimg}src="./react.png" width='75' height='75' alt="React Logo" />
            <p className={styles.homeskillscomptext}>React</p>
          </div >
          <div className={styles.homeskillscomp}>
            <img className={styles.homeskillsimg}src="./mysql.png" width='75' alt="MySQL Logo" />
            <p className={styles.homeskillscomptext}>MySQL</p>
          </div>
          <div className={styles.homeskillscomp}> 
            <img className={styles.homeskillsimg} src="./aspnet.png" width='75'height='75' alt="ASP.NET Logo" />
            <p className={styles.homeskillscomptext}>ASP.NET</p>
          </div>
        </div>
      </article>
      <article className={styles.homeprojects}>
        Further in this portfolio you can find some of my projects. <br />
        <h2>Random Project</h2>
        <div className={styles.homerandomproject}>
          
        </div>
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
        {
          path: "contact",
          element: <Contact />
        },
        {
          path: "projects",
          element: <Projects />
        },
      ]
    }
  ]);
  return (
    <div className={styles.App}>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
