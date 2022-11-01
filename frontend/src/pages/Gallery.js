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

 async function deleteHamster (id){
    // const idn ={
    //     id:id
    // }
    const response =  await fetch ('http://localhost:1997/hamsters/'+ id, {
        method:"DELETE",
        
    })
    const data = await response.text()
    setAllHamsters (hamsters => hamsters.filter (hamsters =>hamsters._id !== id))
    // setDrinks (drinks => drinks.filter (drink => drink._id !== data._id))

}

  
  return (
    <div>
    {AllHamsters.map((hamster, i)=>
    <section key={i} >
      <img className='battleImg' src={hamster.imgName} alt=""/>
      <h1>{hamster.name}</h1>
      <button onClick={() => deleteHamster(hamster._id)} >delete</button>
    </section>)}
    </div>
  )
}

export default Gallery
