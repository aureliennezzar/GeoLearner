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
    const colors = { stroke: "#fff", fill: "#3a3335", good: "green", miss: "#8F282A" }
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
            e.target.style.fill = colors.good
            setAlive(false)
            document.body.dataset.alive = false
        } else {
            e.target.style.fill = colors.miss
            e.target.dataset.disabled = true
            setLife((prev) => prev - 1)

        }
    }
    const gameOver = () => {
        setAlive(false)
        window.open("https://www.google.com/search?q=" + goodCountry);
        document.body.dataset.alive = false
        const paths = mapRef.current.querySelectorAll('path')
        paths.forEach(country => {
            if (country.getAttribute('title') === document.body.dataset.goodWord) {
                country.style.fill = colors.good
                country.dataset.disabled = false
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
            country.style.fill = colors.fill
        })
        startGame(countries)
    }
    const startGame = (arr) => {
        let country = arr[Math.floor(Math.random() * arr.length)]
        document.body.dataset.goodWord = country
        setGoodCountry(country);
    }
    return (
        <>
            <div className="actions">
                <h2 className="lifes">{"♥ ".repeat(life)}</h2>
                <h2 className="lifes">{goodCountry}</h2>
                {!alive && <button onClick={resetGame}>RECOMMENCER</button>}
            </div>
            <section className="map-wrapper" ref={wrapperRef}>
                <Map mapRef={mapRef} wrapperRef={wrapperRef} setCountries={setCountries} />
            </section>
        </>
    );
}

export default MapContainer;