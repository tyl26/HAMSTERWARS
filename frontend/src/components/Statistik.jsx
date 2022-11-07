import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

function Statistik() {

    const [topFives, setTopFives] = useState([])
    const [topLosers, setTopLosers] = useState([])



    useEffect(() => {
        fetch('http://localhost:1997/hamsters')
            .then((res) => res.json())
            .then((data) => setTopFives(data))



    }, [])

    console.log(topFives);
    return (
        <section className='topFives'>


            {/* getting top winners */}
            <section>
                <h1>Top Winners</h1>
                {topFives ? topFives
                    .sort((a, b) => a.wins > b.wins ? -1 : 1).slice(0, 5)
                    .map(winners => {
                        return (
                            <section>

                                <section className='topWinners'>
                                    <img className='battleImg' src={winners.imgName} alt="" />
                                    <h2>{winners.name}</h2>
                                    <b>Wins</b><p>{winners.wins}</p>
                                </section>
                            </section>
                        )
                    }) : null}
            </section>



            {/* getting top Losers  */}
            <section>
                <h1>Top Losers</h1>
                {topFives ? topFives
                    .sort((a, b) => a.defeats > b.defeats ? -1 : 1).slice(0, 5)
                    .map(defeat => {
                        return (
                            <section>

                                <section className='topWinners'>
                                    <img className='battleImg' src={defeat.imgName} alt="" />
                                    <h2>{defeat.name}</h2>
                                    <b>Loses</b><p>{defeat.defeats}</p>                                </section>
                            </section>
                        )
                    }) : null}
            </section>
        </section>
    )
}

export default Statistik
