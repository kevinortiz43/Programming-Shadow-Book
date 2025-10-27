import React from 'react'

export default function Search({searchTerm,setSearchTerm}:{searchTerm:string}) {
  return (
    <div>
        {searchTerm}

        <input
        value={searchTerm}
        onChange={(event)=>setSearchTerm(event.target.value)}
        ></input>
    </div>
  )
}
