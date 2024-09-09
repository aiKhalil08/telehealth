import React, { FC, useEffect, useRef } from 'react';
import styles from './Map.module.css';
import H from '@here/maps-api-for-javascript';


const API_KEY = 'a-EIDm3CsK7Me0s8LjAAr3_VkW_lMkFnLyJMfKj-ByE';

interface MapProps {}

const Map: FC<MapProps> = () => {

    const mapContainer = useRef(null);
    const platform = useRef<H.service.Platform | null>(null);
    const map = useRef<H.Map | null>(null);

    useEffect(() => {

        function loadScript(url: string): Promise<void> {
            return new Promise((resolve, reject) => {
                let script = document.createElement('script');
                script.src = url;
                script.type = 'text/javascript';
                script.async = true;
                script.onload = () => resolve();
                script.onerror = reject;
                document.head.appendChild(script);
            })
        }

        function initializeMap() {
            if (typeof H === 'undefined' || !mapContainer.current) {
                console.error('HERE Maps scripts not loaded or map container not found');
                return;
            }

            platform.current = new H.service.Platform({
                'apikey': API_KEY
            });

            const defaultLayers = platform.current.createDefaultLayers() as any;

            const newMap = new H.Map(
                mapContainer.current,
                defaultLayers.vector.normal.map,
                {
                    zoom: 14,
                    center: { lat: 64.144, lng: -21.94 }
                }
            );

            const mapBehavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(newMap));
            const ui = H.ui.UI.createDefault(newMap, defaultLayers);

            map.current = newMap
        }

        async function loadMaps() {
            try {
                await loadScript("https://js.api.here.com/v3/3.1/mapsjs-core.js");
                await loadScript("https://js.api.here.com/v3/3.1/mapsjs-service.js");
                initializeMap()
            } catch (error) {
                console.log('error occured: ',error);
            }
        }

        if (!map.current) loadMaps();
    }, []);

    return (
        <div data-testid="Map" ref={mapContainer} className='w-full h-96 overflow-hidden' >
        </div>
    );
}

export default Map;
