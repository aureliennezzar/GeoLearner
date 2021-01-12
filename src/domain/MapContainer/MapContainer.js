import Map from 'domain/Map/Map';
import React, { useEffect, useRef, useState } from 'react';
const MapContainer = () => {
    const mapRef = useRef()
    // This function returns an object with X & Y values from the pointer event
    function getPointFromEvent(event) {
        var point = { x: 0, y: 0 };
        // If even is triggered by a touch event, we get the position of the first finger
        if (event.targetTouches) {
            point.x = event.targetTouches[0].clientX;
            point.y = event.targetTouches[0].clientY;
        } else {
            point.x = event.clientX;
            point.y = event.clientY;
        }

        return point;
    }

    // This variable will be used later for move events to check if pointer is down or not
    var isPointerDown = false;

    // This variable will contain the original coordinates when the user start pressing the mouse or touching the screen
    var pointerOrigin = {
        x: 0,
        y: 0
    };

    // Function called by the event listeners when user start pressing/touching
    function onPointerDown(event) {
        isPointerDown = true; // We set the pointer as down

        // We get the pointer position on click/touchdown so we can get the value once the user starts to drag
        var pointerPosition = getPointFromEvent(event);
        pointerOrigin.x = pointerPosition.x;
        pointerOrigin.y = pointerPosition.y;
    }


    // The distances calculated from the pointer will be stored here
    var newViewBox = {
        x: 0,
        y: 0
    };


    // Function called by the event listeners when user start moving/dragging
    function onPointerMove(event, ref, ratio, viewBox) {
        // Only run this function if the pointer is down
        if (!isPointerDown) {
            return;
        }
        // This prevent user to do a selection on the page
        event.preventDefault();

        // Get the pointer position
        var pointerPosition = getPointFromEvent(event);

        newViewBox.x = viewBox.x - ((pointerPosition.x - pointerOrigin.x) * viewBox.width / mapRef.current.getBoundingClientRect().width);
        newViewBox.y = viewBox.y - ((pointerPosition.y - pointerOrigin.y) * viewBox.width / mapRef.current.getBoundingClientRect().width);
        var viewBoxString = `${newViewBox.x} ${newViewBox.y} ${viewBox.width} ${viewBox.height}`;
        // console.log(ref.current.getAttribute('viewBox'),"\n------------\n", viewBoxString);
        ref.current.setAttribute('viewBox', viewBoxString);

        // document.querySelector('.viewbox').innerHTML = viewBoxString;
    }

    function onPointerUp(viewBox) {
        // The pointer is no longer considered as down
        isPointerDown = false;
        viewBox.x = newViewBox.x;
        viewBox.y = newViewBox.y;
    }
    return (
        <section className="map-wrapper">
            <Map mapRef={mapRef} onPointerDown={onPointerDown} onPointerUp={onPointerUp} onPointerMove={onPointerMove} />
        </section>
    );
}

export default MapContainer;