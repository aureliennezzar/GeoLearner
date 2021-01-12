import Map from 'domain/Map/Map';
import React, { useEffect, useRef, useState } from 'react';
const MapContainer = () => {
    const mapRef = useRef()
    const wrapperRef = useRef()
    const [countries, setCountries] = useState([])
    useEffect(() => {
        const paths = mapRef.current.querySelectorAll('path')
        paths.forEach(country => {
            setCountries(() => [...countries, country.getAttribute('title')]);
        })
        setCountries(countries);
    }, [])
    console.log(countries);
    return (
        <section className="map-wrapper" ref={wrapperRef}>
            <Map mapRef={mapRef} wrapperRef={wrapperRef} setCountries={setCountries} />
        </section>
    );
}

export default MapContainer;