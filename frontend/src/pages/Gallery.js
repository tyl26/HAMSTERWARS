import React, { useEffect, useState } from 'react'

function Gallery() {
  const [AllHamsters, setAllHamsters] = useState([])



  function getAllHamsters(){
    fetch('http://localhost:1997/hamsters')
    .then((res)=> res.json())
    .then((data)=> setAllHamsters(data))
  }
  useEffect(()=>{
  getAllHamsters()
  },[])



  
  return (
    <div>
    {AllHamsters.map((hamster)=>
    <section>
      <img src={hamster.imgName} alt="" srcset="" />
      <h1>{hamster.name}</h1>
 
    </section>)}
    </div>
  )
}

export default Gallery
