// useEffect vid (from playlist - see useState)

import React, { useState, useEffect } from "react";

export default function App() {
  const [resourceType, setResourceType] = useState("posts");
  const [items, setItems] = useState([]);

  //   console.log("render");
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${resourceType}`)
      .then((response) => response.json())
      .then((json) => setItems(json));
  }, [resourceType]);
  // whenever options inside the dependency array [ ] like resourceType changes, that's when the useEffect() is invoked (rather than every time component is rendered)

  return (
    <>
      <div>
        <button onClick={() => setResourceType("posts")}>Posts</button>
        <button onClick={() => setResourceType("users")}>Users</button>;
        <button onClick={() => setResourceType("comments")}>Comments</button>;
      </div>
      <h1>{resourceType}</h1>

      {items.map((item) => {
        return <pre>{JSON.stringify(item)}</pre>;
        // pre is special HTML that keeps all the original whitespaces spaces (whatever you input, it'll look exactly like orig input)
      })}
    </>
  );
}





// more complex example keeping track of resized window
export function App1() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  }
  
  // how to dynamically keep track of resized window
  useEffect(()=>{
   window.addEventListener("resize", handleResize)

   return () => {
    window.removeEventListener("resize", handleResize)
   }
  },[])

  return <div>
    {windowWidth}
  </div>;
}



// more complex example keeping track of resized window withOUT addEventListener
export function App2() {
  const [resourceType, setResourceType] = useState("posts");

  useEffect(() => {
    console.log('resource changed') // useEffect mounts whenever whatever is inside dependency array changes
    // example: You see the notification (like display function)

    return () => {
        console.log('return from resource change'); // unmounting here 
  // unmount - what useEffect will automatically do
  // FB goes back to observing or whatever else it was doing beforehand
    }
}, [resourceType]); // dependency   FB: someone sends you a friend notficiation

  return (
    <>
      <div>
        <button onClick={() => setResourceType("posts")}>Posts</button>
        <button onClick={() => setResourceType("users")}>Users</button>;
        <button onClick={() => setResourceType("comments")}>Comments</button>;
      </div>
      <h1>{resourceType}</h1>
    
    </>
  );
}