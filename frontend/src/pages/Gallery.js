import React, { useEffect, useState } from 'react'
import FileBase64 from 'react-file-base64'
import { RiDeleteBack2Fill } from 'react-icons/ri'
import { AiOutlineAppstoreAdd } from 'react-icons/ai'
import { IoIosCloseCircle } from 'react-icons/io'
import { IoChevronBackCircleSharp } from 'react-icons/io5'
import { IoStatsChart } from 'react-icons/io5'
import { FaHistory } from 'react-icons/fa'

import Modal from 'react-modal'
import { Link, useNavigate } from 'react-router-dom'
import { baseURL } from '../utils/baseURL'

function Gallery() {
  const [AllHamsters, setAllHamsters] = useState([])
  const [hamsterInfo, setHamsterInfo] = useState()
  const [name, setName] = useState()
  const [age, setAge] = useState()
  const [favFood, setFavFood] = useState()
  const [Loves, setLoves] = useState()
  const [img, setImg] = useState()
  const [isOpen, setIsOpen] = useState(false)
  const [modal, setModal] = useState(false);

  const navigate = useNavigate()
  

  //hämtar alla hamstrar
  function getAllHamsters() {
    fetch(`${baseURL}/hamsters`)
      .then((res) => res.json())
      .then((data) => setAllHamsters(data))
  }



  //lägger till en ny hamster

  async function addNewHamster() {
    const newHamster = {
      name: name,
      age: age,
      favFood: favFood,
      loves: Loves,
      imgName: img,
    }
    console.log(newHamster);
    const res = await fetch(`${baseURL}/hamsters`, {
      method: "POST",
      body: JSON.stringify(newHamster),
      headers: { "Content-Type": "application/json" }
    })
    const data = await res.json()
    setAllHamsters([...AllHamsters, data])
  }


  //tar bort en hamster 
  async function deleteHamster(id) {

    const response = await fetch(`${baseURL}/hamsters/` + id, {
      method: "DELETE",

    })
    const data = await response.text()
    console.log(data);
    setAllHamsters(hamsters => hamsters.filter(hamsters => hamsters._id !== id))

  }


  //öppna och stänga form modulen för att lägga till en ny hamster
  function toggleModal() {

    setIsOpen(!isOpen)

  }
  function infoModal() {
    setModal(!modal)
  }


  //get med specifik id testa det!
  function getInfo(hamsterInfo) {
    setHamsterInfo(hamsterInfo)
    infoModal()
  }


  useEffect(() => {
    getAllHamsters()
  }, [])



  return (
    <section>

      <Link to='/statistik'><IoStatsChart className='statsIcon'/></Link>
      
      
      <FaHistory onClick={()=> navigate('/history')} className='historyIcon'/>
      {/* <button onClick={()=> navigate('/history')} className='historyIcon'>jgdf</button> */}
     
      <h2 className="galleryTitle">Gallery</h2>
      <AiOutlineAppstoreAdd className='addIcon' onClick={toggleModal} />
      <IoChevronBackCircleSharp className='backIcon' onClick={() =>navigate('/')}/>


      <section className='galleryContainer'>

        <Modal isOpen={isOpen}
          onRequestClose={toggleModal}
          contentLabel="My dialog"
          className="mymodal"
          overlayClassName="myoverlay"
          closeTimeoutMS={500}
          ariaHideApp={false}
        >

          <form className='addForm' onSubmit={() => addNewHamster()}>
            <h1 >Add your Hamster</h1>
            <b>Name:</b>
            <label>
              <input className='inputText' type="text" placeholder='Name' onChange={(e) => setName(e.target.value)} />
            </label>
            <b>Age:</b>
            <label>
              <input className='inputText' type="number" placeholder='age' onChange={(e) => setAge(e.target.value)} />
            </label>
            <b>Favorite Food:</b>
            <label>
              <input className='inputText' type="text" placeholder='favFood' onChange={(e) => setFavFood(e.target.value)} />
            </label>
            <b>Loves:</b>
            <label>
              <input className='inputText' type="text" placeholder='Loves' onChange={(e) => setLoves(e.target.value)} />
            </label>

            <FileBase64 multiple={false}
              onDone={({ base64 }) => setImg(base64)} />

            <input className='submitBtn' type="submit" />

            <IoIosCloseCircle className='closeModal' onClick={() => toggleModal()} />
          </form>
        </Modal>


        {AllHamsters.map((hamster, i) =>

          <section key={i} >

            <section className='gallerywrapper'>
              <img className='galleryImg' onClick={() => { getInfo(hamster) }} src={hamster.imgName} alt="" />
              <RiDeleteBack2Fill className='delete' onClick={() => deleteHamster(hamster._id)} />
              <h1 className='hamsterName'>{hamster.name}</h1>

            </section>
          </section>)}

        {modal && (
          <div className="modal">
            <div onClick={infoModal} className="myoverlay"></div>
            <div className="mymodal">
              <ul className='infoContainer'>
                <img src={hamsterInfo ? hamsterInfo.imgName : null} alt="profilePic" />
                <li><b>Name</b>: <br />{hamsterInfo ? hamsterInfo.name : null}</li>
                <li><b>Age</b>: <br /> {hamsterInfo ? hamsterInfo.age : null}</li>
                <li><b>Loves</b>: <br />{hamsterInfo ? hamsterInfo.loves : null}</li>
                <li><b>Favorite Foods</b>: <br /> Foods{hamsterInfo ? hamsterInfo.favFood : null}</li>
              </ul>
              <button className="close-modal" onClick={() => infoModal()}>
                X
              </button>
            </div>
          </div>
        )}


      </section>
    </section>
  )
}

export default Gallery
