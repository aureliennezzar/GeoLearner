import Map from 'domain/Map/Map';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import "./MapContainer.scss"
const MapContainer = () => {
    const mapRef = useRef()
    const wrapperRef = useRef()
    const [countries, setCountries] = useState([])
    const [goodCountry, setGoodCountry] = useState('')
    const [life, setLife] = useState(3)
    const [alive, setAlive] = useState(true)
    useEffect(() => {
        if (life <= 0) gameOver()
    }, [life])
    useEffect(() => {
        document.body.dataset.alive = true
        const paths = mapRef.current.querySelectorAll('path')
        const newCountries = []
        paths.forEach(country => {
            newCountries.push(country.getAttribute('title'))
            country.addEventListener('click', handlePathClick)
        })
        setCountries(newCountries);
        startGame(newCountries)
        return () => {
            paths.forEach(country => {
                country.removeEventListener('click', handlePathClick)
            })
        }
    }, [])
    const handlePathClick = (e) => {
        if (e.target.dataset.disabled === "true" || document.body.dataset.alive === "false") return

        if (e.target.getAttribute('title') === document.body.dataset.goodWord) {
            alert('Bien joué !')
            e.target.style.fill = "green"
            setAlive(false)
            document.body.dataset.alive = false
        } else {
            e.target.style.fill = "#8F282A"
            e.target.dataset.disabled = true
            setLife((prev) => prev - 1)

        }
    }
    const gameOver = () => {
        setAlive(false)
        document.body.dataset.alive = false
        const paths = mapRef.current.querySelectorAll('path')
        paths.forEach(country => {
            if (country.getAttribute('title') === document.body.dataset.goodWord) {
                country.style.fill = "green"
            }
        })
    }

    const resetGame = () => {
        setAlive(true)
        setLife(3)
        document.body.dataset.alive = true
        const paths = mapRef.current.querySelectorAll('path')
        paths.forEach(country => {
            country.dataset.disabled = false
            country.style.fill = "white"
        })
        startGame(countries)
    }
    const startGame = (arr) => {
        let country = arr[Math.floor(Math.random() * arr.length)]
        document.body.dataset.goodWord = country
        setGoodCountry(country);
        alert(`Veuillez trouver : ${country} ! Bonne chance ;)`)
    }
    return (
        <>
            <div className="actions">
                <h2 className="lifes">{"♥ ".repeat(life)}</h2>
                {!alive && <button onClick={resetGame}>RECOMMENCER</button>}
            </div>
            <section className="map-wrapper" ref={wrapperRef}>
                <Map mapRef={mapRef} wrapperRef={wrapperRef} setCountries={setCountries} />
            </section>
        </>
    );
}

export default MapContainer;