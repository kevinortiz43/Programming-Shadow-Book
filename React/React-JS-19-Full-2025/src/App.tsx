import { useEffect, useState } from "react";
import "./App.css";
import Search from "./components/Search";
// import Card from "./components/Card";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const API_BASE_URL = "https:.api.themoviedb.org/3";

  useEffect(()=>{
    
  },[])

  return (
    <>
      {/* <div className="card-container"> */}
      {/* <Card title={"start Wars"}></Card>

        <Card title={"Avatar"}></Card>

        <Card title={"The Lion king"}></Card> */}

      <h1 className="text-3xl font-bold underline"> Hello world</h1>
          <Search searchTerm ={searchTerm} setSearchTerm={setSearchTerm}></Search>
      {/* </div> */}
    </>
  );
}

export default App;
