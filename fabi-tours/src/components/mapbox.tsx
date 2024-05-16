"use client"

import { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;

export default function Mapbox({lang}: {lang: string}) {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const map = useRef<mapboxgl.Map | null>(null);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current!,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [-70.9, 42.35],
            zoom: 2
        });

        map.current.on("load", () => {
            map.current!.setLayoutProperty('country-label', 'text-field', [
                'get',
                `name_${lang}`
            ]);
        });

        map.current.on('move', () => {
            console.log(map.current?.getCenter())
        });
    });

    return (
        <div ref={mapContainer} style={{height: "400px"}} />
    );
}
