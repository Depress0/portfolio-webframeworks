import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { json } from 'stream/consumers';
import { Outlet, createBrowserRouter, RouterProvider, Route, NavLink, useParams } from "react-router-dom";
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
//PROJECT INTERFACES//
/////////////////////////////////////////////////
interface Item {
  name: string,
  quantity: number
}

interface RandomProps {
  min: number,
  max: number
}

export interface Pokemon {
  count: number;
  next: string;
  previous: null;
  results: Result[];
}

export interface Result {
  name: string;
  url: string;
}
/////////////////////////////////////////////////


const Root = () => {
  const [btcPrice, setBtcPrice] = useState<number>();
  const [updateTime, setUpdateTime] = useState<string>('Updating...');
  const [dark,setDark] = useState<boolean>();
  const ChangeTheme = () => {
    if (dark) setDark(false);
    else setDark(true);
  }
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
      <label htmlFor="">       </label>
      <button className={styles.darkmodebutton} onClick={ChangeTheme}>Dark Mode</button>
    </div>
    <div className={dark ? styles.bodyDark : styles.body}>
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

const RandomProject = () => {
  let proNum = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
  let proName = "";
  switch (proNum){
    case 1:
      proName = "Color Picker"
      break;
    case 2:
      proName = "Shopping List"
      break;
      case 3:
      proName = "Timer"
      break;
      case 4:
      proName = "Pokedex"
      break;
  }
  return <div>
    <br />
    <br />
    <NavLink className={styles.homerandomprojectbutton} to={`/projects/${proNum}`}>{proName}</NavLink>
  </div>
}

const Projects = () => {
  let { id } = useParams();

  switch (id) {
    case "1":
      return <ColorPicker />
    case "2":
      return <ShoppingList />
    case "3":
      return <MainTimer />
    case "4":
      return <Pokedex/>
    default:
      return <div>
        <h1>Projects</h1>
        <main className={styles.projectsflexbox}>
          <NavLink className={styles.projectsflexobject} to={"/projects/1"}>Color Picker</NavLink> <br />
          <NavLink className={styles.projectsflexobject} to={"/projects/2"}>Shopping List</NavLink> <br />
          <NavLink className={styles.projectsflexobject} to={"/projects/3"}>Timer</NavLink> <br />
          <NavLink className={styles.projectsflexobject} to={"/projects/4"}>Pokedex</NavLink>

        </main>
      </div>
  }



}

const ColorPicker = () => {
  const [selectedColors, setSelectedColors] = useState<string[]>([""])
  const [colors, setColors] = useState<string[]>([""])
  const colorChange = (event: any) => {
    let selectedColors: string[] = [];
    for (let option of event.target.selectedOptions) {
      selectedColors.push(option.value);
    }
    setSelectedColors(selectedColors);
  }
  return <div>
    <select name="" id="" multiple >
      <option value="red">Red</option>
      <option value="black">Black</option>
      <option value="green">Green</option>
      <option value="blue">Blue</option>
      <option value="yellow">Yellow</option>
      <option value="orange">Orange</option>
    </select>
    <br /><button onClick={colorChange}>Show Colors</button>
    <div style={{ height: 300 }}>
      {selectedColors.map((color, index) => <div key={index} style={{ backgroundColor: color, color: color || "white" }}>a</div>)}
    </div>
  </div>
}

const ShoppingList = () => {
  const [shoppingList, setShoppingList] = useState<Item[]>([])
  const [item, setItem] = useState<string>('');
  const [aantal, setAantal] = useState<number>(0);
  const addItem = () => {
    setShoppingList([...shoppingList, { name: item, quantity: aantal }])
  }
  return <div>
    <div>
      <label htmlFor="">Name: </label> <input type="text" name="" id="" onChange={(event) => setItem(event.target.value)} value={item} /> <br />
      <label htmlFor="">Quantity</label> <input type="number" name="" id="" onChange={(event) => setAantal(parseInt(event.target.value))} value={aantal} /><br />
      <button onClick={addItem}>Add</button>
    </div>
    <div>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <td>{shoppingList.map((name, index) => <td key={index}>{shoppingList[index].name}</td>)} </td>
          </tr>

          <tr>
            <th>Aantal</th>

            <td>{shoppingList.map((quantity, index) => <td key={index}>{shoppingList[index].quantity}</td>)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
}

const MainTimer = () => {
  return <div>
    <Timer />
    <p>Current time: </p><CurrentTime />
    <p>Random number between 0 and 100: </p><RandomNumber min={0} max={100} />
    <p>Random number between 100 and 200</p><RandomNumber min={100} max={200} />
  </div>
}

const Timer = () => {
  const [number, setNumber] = useState(0);
  useEffect(() => {
    let handle = setInterval(() => {
      setNumber(number => number + 1);
    }, 1000);

    return () => {
      clearInterval(handle);
    }



  }, [1000]);

  return <div>
    <p>{number}</p>
  </div>
}
const CurrentTime = () => {
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    setDate(new Date())
  })
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  return <p>{hour}:{minute}:{second}</p>
}
const RandomNumber = ({ min, max }: RandomProps) => {
  const [random, setRandom] = useState(Math.floor(Math.random() * (max - min + 1)) + min);
  useEffect(() => {
    let handle = setInterval(() => {
      setRandom(Math.floor(Math.random() * (max - min + 1)) + min);
    }, 2000);

    return () => {
      clearInterval(handle);
    }
  }, [1000])
  return <p>{random}</p>;
}

const Pokedex = () => {
  //https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151
  const [limit, setLimit] = useState<number>(151);
  const [list, setList] = useState<Pokemon>();

  useEffect(() => {
    const fetchFunction = async (limit: number) => {
      let result = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${limit}`);
      let json: Pokemon = await result.json();
      setList(json)


    }
    fetchFunction(limit);
  }, [])
  console.log(list?.results[1].name)
  return <div>
    {list?.results.map((a, index) => <p key={index}>{a.name}</p>)}
    <input type="number" name="" id="1" /> <button >Set Limit</button>

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
          <RandomProject/>
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
          path: "projects/:id",
          element: <Projects />
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
