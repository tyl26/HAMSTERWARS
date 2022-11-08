import React, { useEffect, useState } from 'react'
import Result from '../components/Result';
import { IoChevronBackCircleSharp } from 'react-icons/io5'
import { Link } from 'react-router-dom';
import { baseURL } from '../utils/baseURL';


function Battle() {
    const [battle, setHamsterBattle] = useState([])
    const [setMatch] = useState([])
    const [winner, setWinner] = useState()
    const [loser, setLoser] = useState()
    const [modal, setModal] = useState(false);


    //fetchar random hamsters
    function getRandom() {
        fetch(`${baseURL}/hamster/random`)
            .then(res => res.json())
            .then(data => setHamsterBattle(data))
    }

    useEffect(() => {
        getRandom(setHamsterBattle)
    }, [])


    //hanterar och uppdaterar vår hamsters vinster
    async function updatePoints(hamster) {

        //den nya state på poängen 
        const points = {
            wins: hamster.wins + 1,
            defeats: hamster.defeats,
            games: hamster.games + 1
        }

        const response = await fetch(`${baseURL}/hamsters/` + hamster._id, {
            method: "PUT",
            body: JSON.stringify(points),
            headers: { "Content-Type": "application/json" }
        })
        //har text för att det hämtar statusen koden 200 från backend
        const data = await response.text()
        console.log(data);


    }

    //hanterar och uppdaterar vår hamsters defeats
    async function uppdateLoser(hamster) {

        //den nya state på poängen 

        const points = {
            wins: hamster.wins,
            defeats: hamster.defeats + 1,
            games: hamster.games + 1
        }

        const response = await fetch(`${baseURL}/hamsters/` + hamster._id, {
            method: "PUT",
            body: JSON.stringify(points),
            headers: { "Content-Type": "application/json" }
        })

        //har text för att det hämtar statusen koden 200 från backend

        const data = await response.text()
        console.log(data);


    }


    //hanterar dessa functioner on click 
    async function handleCute(winner, loser) {
        await updatePoints(winner)
        await uppdateLoser(loser)
        setWinner(winner)
        setLoser(loser)
        getRandom()
        winnerModal()
        addMatch(winner, loser)
    }

    //hämstar modal för slut resultatet
    function winnerModal() {
        setModal(!modal)

    }


    //Lägger till matches winner och loser i en matches listan. 
    //matches endpoint
    async function addMatch(winner, loser) {
        const matchObj = {
            winner: winner._id,
            loser: loser._id,
            namewinner: winner.name,
            nameloser: loser.name,
            gameswinner: winner.games,
            gamesloser: loser.games
        }
        const response = await fetch(`${baseURL}/matches`, {
            method: 'POST',
            body: JSON.stringify(matchObj),
            headers: { "Content-Type": "application/json" }
        });
        const data = await response.text();
        console.log(data);
        setMatch({ "winner": winner._id, "loser": loser._id })
    }
    return (
        <div>

            <Link to='/'> <IoChevronBackCircleSharp className='backIcon' /></Link>

            <h1 className='pick'>Pick who is the cutest!</h1>


            {/* mappar listan för att få random hamster */}
            <section className='battleContainer'>
                {battle && battle.map((hamster, i) =>
                    <section key={i}>

                        <img className='battleImg' src={hamster.imgName} alt='battlePic' onClick={() => {
                            handleCute(hamster, battle?.filter(hams => hams !== hamster)[0])
                        }} />
                        <h1 className='name'>{hamster.name}</h1>

                    </section>

                )}

            </section>


            {/* modal för slut resultat med poäng osv. */}
            {modal && (
                <div className="modal">
                    <div onClick={winnerModal} className="myoverlay"></div>
                    <div className="mymodal">

                        <h1 className='resultTitle'>Result!</h1>
                        <section className='container'>


                            {/* skickar in states till reslut componant  */}
                            <Result result={{ winner, loser }} />


                            <button className="close-modal" onClick={() => { winnerModal(); getRandom() }}>
                                X
                            </button>

                            <button className='newBattle' onClick={() => { getRandom(); winnerModal(); }}>New battle</button>
                        </section>
                    </div>
                </div>
            )}

            {/* kör ett nytt spel */}
            <button className='newBattle' onClick={() => getRandom()}>New battle</button>
        </div>
    )
}

export default Battle
