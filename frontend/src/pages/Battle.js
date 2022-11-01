import React, { useEffect, useState } from 'react'

function Battle() {
    const [battle, setHamsterBattle] = useState([])
    let [hamsterWins, setWins] = useState(0)
    let [hamsterGamse, setGames] = useState(0)
    let [hamsterdefeat, setDeafet] = useState(0)
    // const [updatedLirst , setUpdatedList] =useState([])

    function getRandom() {
        fetch('http://localhost:1997/hamster/random')
            .then(res => res.json())
            .then(data => setHamsterBattle(data))
    }

    useEffect(() => {

        getRandom()
    }, [])

    async function updatePoints(id) {

        
            hamsterWins = hamsterWins + 1;
            setWins(hamsterWins)
            hamsterGamse = hamsterGamse + 1;
            setGames(hamsterGamse)
        
        // else if(!id) {
            
        //     hamsterdefeat = hamsterdefeat + 1;
        //     setDeafet(hamsterdefeat)
        //     hamsterGamse = hamsterGamse + 1;
        //     setGames(hamsterGamse)
        // }


        const points = {
            wins: hamsterWins,
            defeats: hamsterdefeat,
            games: hamsterGamse
        }
        const response = await fetch('http://localhost:1997/hamsters/' + id, {
            method: "PUT",
            body: JSON.stringify(points),
            headers: { "Content-Type": "application/json" }
        })
        const data = await response.text()
        console.log(data);
    }

    console.log(battle);

    return (
        <div>
            {battle.length > 0 ? battle.map((hamster, i) =>
                <section key={i}>
                    <h1>{hamster.wins}</h1>
                    <h1>{hamster.name}</h1>
                    <img className='battleImg' src={hamster.imgName} />
                    <button onClick={() => {hamster._id ? updatePoints(hamster._id) : setDeafet(hamster.defeats ++)} } >cutest?</button>
                </section>

            ) : null}

            <button onClick={() => getRandom()}>New battle</button>
        </div>
    )
}

export default Battle
