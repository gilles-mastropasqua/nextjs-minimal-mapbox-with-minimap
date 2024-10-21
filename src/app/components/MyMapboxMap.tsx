"use client";

// Importing Mapbox and its CSS styles
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef } from "react";

// Setting the Mapbox access token from the environment variable
// Make sure to add your Mapbox API key in the .env.local file like this:
// NEXT_PUBLIC_MAPBOX_API_KEY=your-mapbox-access-token
if (!process.env.NEXT_PUBLIC_MAPBOX_API_KEY) {
    throw new Error("Mapbox API key is not defined in the environment variables.");
}

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;

const Map = () => {
    // Reference to the map container in the DOM
    const mapContainer = useRef<HTMLDivElement | null>(null);
    // Reference to store the Mapbox instance
    const map = useRef<mapboxgl.Map | null>(null);

    useEffect(() => {
        // Prevent re-initializing the map if it already exists
        if (!mapContainer.current || map.current) return;

        // Initialize the Mapbox map instance
        map.current = new mapboxgl.Map({
            container: mapContainer.current as HTMLDivElement, // The HTML container for the map
            style: "mapbox://styles/mapbox/outdoors-v12", // Mapbox style to use
            center: [114.21, 0.87], // Initial longitude and latitude for the map's center
            zoom: 5, // Initial zoom level
        });

        // Clean up the map instance only when the component unmounts
        return () => {
            if (map.current) {
                map.current.remove(); // Properly remove the map instance
                map.current = null;
            }
        };
    }, []);

    // Render the map container as a full-screen div
    return <div className="w-full h-screen" ref={mapContainer} />;
};

export default Map;
