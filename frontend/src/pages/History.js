import { useEffect, useState } from 'react'
import { IoChevronBackCircleSharp } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { baseURL } from '../utils/baseURL'

function History() {
    const [matches, setMatches] = useState([])
    const [Hamsters, setHamsters] = useState([])


    //hämtar alla hamstrar
    function getAllHamsters() {
        fetch(`${baseURL}/hamsters`)
            .then((res) => res.json())
            .then((data) => setHamsters(data))
    }

    //hämtar alla id i matches
    async function getMatches() {
        const response = await fetch(`${baseURL}/matches`, {
            method: 'GET'
        })
        const data = await response.json()
        setMatches(data)
    }

    //tar bort hamstrarna från historiken md hjälp av id
    async function deleteMatch(id) {
        window.location.reload();
        const response = await fetch(`${baseURL}/matches/` + id,
            { method: 'DELETE' })

        const data = await response.json()
        console.log(data);
        console.log('Deleted: ')


    }

    useEffect(() => {
        getAllHamsters()
        getMatches()


    }, [])


    return (
        <div>
            <Link to='/gallery'> <IoChevronBackCircleSharp className='backIcon' /></Link>

            <h1 className='galleryTitle'>Hamsters History</h1>

            {/* kolla om det finns nåt i matches och hamstrar sen mappa */}
            <section className="galleryContainer">
                {matches.length > 0 && Hamsters.length > 0 ? [...matches].reverse().map(match => {

                    // jämför om match id matccher med hamster id. Om matchar ska vi kunna ha till gång till info så som bilder och namn.
                    let winner = Hamsters.find(id => { return id._id === match.winner });
                    let loser = Hamsters.find(({ _id }) => _id === match.loser);

                    return (

                        //om id matchar --> skriver ut de som har varit med i matchen. 
                        <div key={match._id}>
                            <section className="wrapper">
                                <section className="items">
                                    <section>
                                        <img className='battleImg' src={winner && winner.imgName} alt="" width="300" height="300" />
                                        <p className='name'> Winner: {winner && winner.name} </p>
                                    </section>
                                    <section>
                                        <img className='battleImg' src={loser.imgName} alt="" width="300" height="300" />
                                        <p className='name'>Loser: {loser.name}</p>
                                    </section>
                                </section>
                                <button className='deleteMatch' onClick={() => deleteMatch(match._id)}> Remove</button>
                            </section>
                        </div>

                    )
                }) : null}
            </section>
        </div>
    )
}

export default History
