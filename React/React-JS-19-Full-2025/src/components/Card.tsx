import { useEffect, useState } from "react";

export default function Card({ title }: { title: string }) {
  const [count, setCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    console.log(`${title} use effect ${hasLiked}`);
  }, [hasLiked]);

  // to mount
  useEffect(() => {
    console.log("card rendered");
  }, []);

  return (
    <div
      className="card"
      onClick={() => setCount((prevState) => prevState + 1)}
    >
      {/*         
      <h2>
        {title} <br></br> {count ? count : null}
      </h2>
       */}
      <h2>
        {title} <br></br> {count || null}
      </h2>

      <button onClick={() => setHasLiked(!hasLiked)}>
        {hasLiked ? "Liked" : "Like"}
      </button>
    </div>
  );
}
