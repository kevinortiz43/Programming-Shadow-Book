import React from "react";

export default function Note({ title, content }:{title:string,content:string}) {
  // console.log(notes);

  return (
    <div className="note">
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
}

// import React from "react";

// export default function Note(props) {
//   // console.log(notes);

//   return (
//     <div className="note">
//       <h1>{props.title}</h1>
//       <p>{props.content}</p>
//     </div>
//   );
// }
