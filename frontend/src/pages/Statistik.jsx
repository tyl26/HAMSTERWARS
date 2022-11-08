import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { IoChevronBackCircleSharp } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { baseURL } from '../utils/baseURL'

function Statistik() {

    const [topFives, setTopFives] = useState([])



    useEffect(() => {
        fetch(`${baseURL}hamsters`)
            .then((res) => res.json())
            .then((data) => setTopFives(data))

    }, [])

    return (
        <section>
            <Link to='/gallery'> <IoChevronBackCircleSharp className='backIcon' /></Link>


            <section className='topFives'>


                {/* getting top winners */}
                <section>
                    <h1>Top Winners</h1>
                    {topFives ? topFives
                        .sort((a, b) => a.wins > b.wins ? -1 : 1).slice(0, 5)
                        .map(winners => {

                            return (
                                <section key={winners._id} >

                                    <section className='topWinners'>
                                        <img className='topImg' src={winners.imgName} alt="" />
                                        <h2 className='name'>{winners.name}</h2>
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
                                <section key={defeat._id}>
                                    <section className='topWinners'>
                                        <img className='topImg' src={defeat.imgName} alt="" />
                                        <h2 className='name'>{defeat.name}</h2>
                                        <b>Loses</b><p>{defeat.defeats}</p>                                </section>
                                </section>
                            )
                        }) : null}
                </section>
            </section>
        </section>
    )
}

export default Statistik
