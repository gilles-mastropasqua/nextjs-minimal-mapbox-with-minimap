# Next.js Mapbox Example

This project is a demonstration of the [`react-mapbox-minimap`](https://www.npmjs.com/package/react-mapbox-minimap) package, showcasing how to integrate Mapbox GL JS into a Next.js application, focusing on adding a minimap to the main interactive map. The map uses Tailwind CSS for styling and supports environment variable configuration for security purposes. 

The minimap displays a smaller version of the main map, highlighting a portion of the view with a tracking rectangle. The minimap can be customized, moved, and resized based on your needs.

![Mapbox Example](https://3w-creation.net/demo-myMapbowWithMinimap.png)

## Live Demo

You can check out the live version of this project here:

[Next.js Minimal Mapbox with minimap - Live Demo](https://nextjs-minimal-mapbox-with-minimap.vercel.app)


## Setup Instructions

### 1. Clone the Repository

First, clone this repository to your local machine:

```bash
git clone https://github.com/gilles-mastropasqua/nextjs-minimal-mapbox-with-minimap.git
```

### 2. Install Dependencies

Navigate to the project directory and install the necessary dependencies using npm or yarn:

```bash
cd nextjs-minimal-mapbox
npm install
# or
yarn install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory of your project and add your Mapbox access token:

```env
NEXT_PUBLIC_MAPBOX_API_KEY=your-mapbox-access-token
```

Make sure to replace `your-mapbox-access-token` with your actual Mapbox access token. This is necessary for authenticating your application with Mapbox services.

### 4. Run the Development Server

After setting up the environment variables, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application running.



## Code Explanation

This project demonstrates how to add a minimap to a Mapbox instance using the Map component, which initializes and renders the interactive map.
```tsx
"use client";

// Importing Mapbox and its CSS styles
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef } from "react";

import Minimap from 'react-mapbox-minimap';
import {MapInstance, MapLib} from "react-mapbox-minimap/dist/types";

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
            center: [178.0, -17.8], // Initial longitude and latitude for the map's center
            zoom: 9, // Initial zoom level
        });

        // Event listener for when the map finishes loading
        map.current.on("load", function () {
            // Initialize the Minimap instance with configuration options
            const minimap = new Minimap(mapboxgl as MapLib<MapInstance>, {
                center: [178.0, -17.8],
                style: "mapbox://styles/mapbox/outdoors-v12",
                toggleDisplay: true,
                zoomLevelOffset: -4,
                scrollZoom: true,
                disableMinimapMoveOnDrag: true,
                enableResize: true,
                enableMove: true,
            });
            // Add the minimap control to the main map, positioned in the bottom-right corner
            map.current!.addControl(minimap as mapboxgl.IControl, "bottom-right");
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


```

### Key Parts of the Code:

1. **Environment Variables**: The Mapbox access token is pulled from `process.env.NEXT_PUBLIC_MAPBOX_API_KEY`. This allows for safe storage and easy updates of API keys without hardcoding them.
2. **`useRef` for DOM Reference**: The `mapContainer` reference is used to point to the DOM element where the map will be rendered. `map` is used to store the map instance.
3. **Mapbox Map Initialization**: The map is initialized using `new mapboxgl.Map()`, with coordinates set to center on Viti Levu (`[114.21, 0.87]`).
4. **Minimap Addition**: A minimap is added to the map once it has finished loading. The minimap uses the same style as the main map but is configured to be zoomed out (zoomLevelOffset: -4). The minimap is positioned in the bottom-right corner, and users can toggle its display, resize, or move it.
5. **Cleanup**: The cleanup function (`map.current.remove()`) ensures that the map is properly destroyed when the component is unmounted, preventing memory leaks.

### Example Usage

To use this `Map` component, simply import and include it in your page component:

```tsx
import MyMapboxMap from "@/app/components/MyMapboxMap";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <MyMapboxMap/>
        </div>
    );
}
```

This example adds a title to the page and renders the `Map` component, displaying the interactive map below the heading.

## Notes

- The Mapbox access token must be kept secret. Avoid sharing your `.env.local` file or exposing your token in public repositories.
- The application uses Tailwind CSS to style the map container (`w-full h-screen`), ensuring the map takes up the full width and height of the viewport.

## Resources

- [Mapbox GL JS Documentation](https://docs.mapbox.com/mapbox-gl-js/guides/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

Feel free to explore these resources to further customize the map or add additional features such as markers, layers, or popups.

## License

This project is open source and available under the MIT License.

