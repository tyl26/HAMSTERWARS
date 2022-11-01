import React, { useEffect, useState } from 'react'

function Battle() {
    const [battle, setHamsterBattle] = useState([])

    function getRandom() {
        fetch('http://localhost:1997/hamster/random')
            .then(res => res.json())
            .then(data => setHamsterBattle(data))

    }

    useEffect(() => {

        getRandom()
        // console.log(random);
    }, [])

    console.log(battle);

    return (
        <div>
            {battle.length > 0 ? battle.map((e) =>
                <section>
                    <h1>{e.name}</h1>
                    <img src={e.imgName} />

                </section>

            ) : null}
        </div>
    )
}

export default Battle
