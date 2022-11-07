import React, { useEffect, useState } from 'react'
import Result from '../components/Result';

function Battle() {
    const [battle, setHamsterBattle] = useState([])
    const [winner, setWinner] = useState()
    const [loser, setLoser] = useState()
    const [modal, setModal] = useState(false);


    function getRandom() {
        fetch('http://localhost:1997/hamster/random')
            .then(res => res.json())
            .then(data => setHamsterBattle(data))
    }

    useEffect(() => {

        getRandom(setHamsterBattle)
    }, [])

    async function updatePoints(hamster) {

        // setHamsterBattle(battle => battle.map((hams) => hams._id === hamster._id ? { ...hams, wins: hams.wins + 1, games: hams.games + 1 } : hams))

        const points = {
            wins: hamster.wins + 1,
            defeats: hamster.defeats,
            games: hamster.games + 1
        }

        const response = await fetch('http://localhost:1997/hamsters/' + hamster._id, {
            method: "PUT",
            body: JSON.stringify(points),
            headers: { "Content-Type": "application/json" }
        })
        const data = await response.text()
        console.log(data);

        // winnerModal()

    }
    async function uppdateLoser(hamster) {


        // setHamsterBattle(battle => battle.map((hams) => hams._id !== hamster._id ? { ...hams, defeats: hams.defeats + 1, games: hams.games + 1 } : hams))

        const points = {
            wins: hamster.wins,
            defeats: hamster.defeats + 1,
            games: hamster.games + 1
        }

        const response = await fetch('http://localhost:1997/hamsters/' + hamster._id, {
            method: "PUT",
            body: JSON.stringify(points),
            headers: { "Content-Type": "application/json" }
        })
        const data = await response.text()
        console.log(data);


    }

    async function handleCute(winner, loser) {
        await updatePoints(winner)
        await uppdateLoser(loser)
        setWinner(winner)
        setLoser(loser)
        getRandom()

        winnerModal()
    }

    function winnerModal() {
        setModal(!modal)

    }

    // console.log(winner);

    return (
        <div>
            <h1 className='pick'>Pick who is the cutest!</h1>

            <section className='battleContainer'>


                {battle ? battle.map((hamster, i) =>
                    <section key={i}>

                        {/* <h1>w{hamster.wins}</h1>
                        <h1>d{hamster.defeats}</h1>
                    <h1>g{hamster.games}</h1> */}
                        <img className='battleImg' src={hamster.imgName} onClick={() => {
                            handleCute(hamster, battle?.filter(hams => hams !== hamster)[0])
                        }} />
                        <h1 className='name'>{hamster.name}</h1>

                    </section>

                ) : null}

            </section>


            {modal && (
                <div className="modal">
                    <div onClick={winnerModal} className="myoverlay"></div>
                    <div className="mymodal">
                        
                        <h1 className='resultTitle'>Result!</h1>
                        <section className='container'>

                        <Result result={{ winner, loser }} />


                        <button className="close-modal" onClick={() => { winnerModal(); getRandom() }}>
                            X
                        </button>

                        <button className='newBattle' onClick={() => { getRandom(); winnerModal(); }}>New battle</button>
                        </section>
                    </div>
                </div>
            )}

            {/* <Result data={winner} lose ={loser} /> */}

            <button className='newBattle' onClick={() => getRandom()}>New battle</button>
        </div>
    )
}

export default Battle
