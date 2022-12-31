import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Outlet, createBrowserRouter, RouterProvider, Route, NavLink } from "react-router-dom";
import styles from './App.module.css';
import emailjs from '@emailjs/browser';
import { init } from '@emailjs/browser/es/methods/init/init';
init("G9l6UDpbY05GTHUkR")

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
  return <div className={styles.navbar}>
    <div className={styles.nav}>
      <NavLink className={({ isActive }) => isActive ? styles.navlinkActive : styles.navlink} to={"/"}>Home</NavLink>
      <NavLink className={({ isActive }) => isActive ? styles.navlinkActive : styles.navlink} to={"projects"}>Projects</NavLink>
      <NavLink className={({ isActive }) => isActive ? styles.navlinkActive : styles.navlink} to={"contact"}>Contact</NavLink>
      <span>
        <label className={styles.navapi}> 1BTC = €{btcPrice} ({updateTime})</label>
      </span>
    </div>
    <div>
      <Outlet />
    </div>
  </div>
}

const Contact = () => {
  let form: any = useRef();
  const sendMail = async (e: any) => {
    e.preventDefault()
    await emailjs.sendForm("service_8uz0jik", "template_uz2jaul", form.current, "G9l6UDpbY05GTHUkR")
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });;
    window.location.reload();
  }


  return <div className={styles.contactpage}>
    <h1 className={styles.title}>Contact</h1>
    <p className={styles.contactinfo}>For any question or inquiries, contact me using the form below</p>
    <form className={styles.contactform} ref={form} onSubmit={sendMail} action="">
      <label htmlFor="">Name</label><br />
      <input defaultValue="" className={styles.contactforminput} required type="text" name='user_name' /><br />
      <label htmlFor="">Email</label><br />
      <input defaultValue="" className={styles.contactforminput} required type="email" name='user_email' /> <br />
      <label htmlFor="">Message</label><br />
      <textarea defaultValue="" className={styles.contactformtextarea} name="message" id="" cols={30} rows={10}></textarea><br />
      <button className={styles.contactformsubmit} type="submit" value="Send">Send</button>
    </form>
  </div>
}

const Projects = () => {
  return <div>

  </div>
}

const Home = () => {
  return <div className={styles.App}>
    <h1 className={styles.title}>Ian Segers</h1>
    <main className={styles.homemain}>
      <article className={styles.homeskills}>
        <div className={styles.aboutme}>
          <p>Welcome to my personal portfolio!</p>
          <p>I am a web app developer based in Belgium.</p>
          <p>Experienced in multiple programming languages/frameworks like:</p>
        </div>
        <div className={styles.homeskillsgrid}>
          <div className={styles.homeskillscomp}>
            <img className={styles.homeskillsimg} src="./csharp.png" width='75' alt="CSharp Logo" />
            <p className={styles.homeskillscomptext}>C#</p>
          </div>
          <div className={styles.homeskillscomp}>
            <img className={styles.homeskillsimg} src="./ts.png" width='75' alt="TypeScript Logo" />
            <p className={styles.homeskillscomptext}>TypeScript</p>
          </div>
          <div className={styles.homeskillscomp} >
            <img className={styles.homeskillsimg} src="./react.png" width='75' height='75' alt="React Logo" />
            <p className={styles.homeskillscomptext}>React</p>
          </div >
          <div className={styles.homeskillscomp}>
            <img className={styles.homeskillsimg} src="./mysql.png" width='75' alt="MySQL Logo" />
            <p className={styles.homeskillscomptext}>MySQL</p>
          </div>
          <div className={styles.homeskillscomp}>
            <img className={styles.homeskillsimg} src="./aspnet.png" width='75' height='75' alt="ASP.NET Logo" />
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
