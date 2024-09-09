import React, { FC, useEffect, useRef, useState } from 'react';
import styles from './MBMap.module.css';

import hospitalPinIcon from '../../../assets/icons/hospital-pin.svg';

import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'
import { Hospital } from '../../../types';

mapboxgl.accessToken = 'pk.eyJ1IjoiYWlraGFsaWwwOCIsImEiOiJjbHZlYjhiajIwN3QwMmxsOTI1cnYyeXczIn0.Y5rdQ407hbfQG1aEHJTCBA';

type Map = mapboxgl.Map;

function calculateDistance(center: [number, number], dest: [number, number]) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (dest[1] - center[1]) * Math.PI / 180;
    const dLon = (dest[0] - center[0]) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(center[1] * Math.PI / 180) * Math.cos(dest[1] * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distance in kilometers
  }

interface MBMapProps {
    onFetchedHospitals: (h: Hospital[]) => void;
    setIsFetchingHospitals: (b: boolean) => void;
    userLocation: [number, number] | null;
    focusedHospital: [number, number] | null;
    // setFocusedHospital: (b: [number, number] | null) => void;
    searchRadius: number;
    showRoute: {coordinates: [number, number][][]} | null;
}

const MBMap: FC<MBMapProps> = ({onFetchedHospitals, setIsFetchingHospitals, userLocation, focusedHospital, searchRadius, showRoute}) => {

    const mapContainer = useRef<any>(null);
    const map = useRef<Map | null>(null);
    const [markers, setMarkers] = useState<mapboxgl.Marker[]>([]);
    const [zoom, setZoom] = useState(11);

    // useEffect(() => {
    //     console.log(userLocation)
    // }, [userLocation])

    useEffect(() => {
        if (map.current) return;
        try {
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v12',
            });
        } catch {
            console.log('caught an error')
        }
    }, []);

    useEffect(() => {
        if (userLocation && map.current) {
            const [longitude, latitude] = userLocation;
            
            setTimeout(() => {

                map.current?.flyTo({
                    center: [longitude, latitude],
                    zoom: zoom
                });
    
                new mapboxgl.Marker()
                .setLngLat([longitude, latitude])
                .addTo(map.current as Map);
    
                fetchNearbyHospitals(longitude, latitude, searchRadius);
            }, 1000)
        }
    }, [userLocation, map.current, searchRadius]);

    useEffect(() => {
        if (userLocation && map.current) {
            const [longitude, latitude] = userLocation;
            map.current?.flyTo({
                center: [longitude, latitude],
                zoom: zoom
            });
        }
    }, [zoom, userLocation, map.current]);

    useEffect(() => {
        if (focusedHospital && map.current) {
            const [longitude, latitude] = focusedHospital;
            map.current?.flyTo({
                center: [longitude, latitude],
                zoom: 15
            });
        }
    }, [focusedHospital]);

    useEffect(() => {
        if (showRoute && map.current) {
            const id = `route-${new Date().getTime()}`;
            map.current.addSource(id, {
                'type': 'geojson',
                'data': {
                  'type': 'Feature',
                  'properties': {},
                  'geometry': {
                    // 'type': 'LineString',
                    'type': 'MultiLineString',
                    'coordinates': showRoute.coordinates
                  }
                }
            });
              
              map.current.addLayer({
                'id': id,
                'type': 'line',
                'source': id,
                'layout': {
                  'line-join': 'round',
                  'line-cap': 'round'
                },
                'paint': {
                  'line-color': '#888',
                  'line-width': 4
                }
            });
        }
    }, [showRoute, map.current]);

    const fetchNearbyHospitals = async (longitude: number, latitude: number, radius: number) => {
        try {
            setIsFetchingHospitals(true);
            // let response = await fetch(`https://api.geoapify.com/v2/places?categories=healthcare.clinic_or_praxis&bias=proximity:${longitude},${latitude}&limit=20&apiKey=d1a3972d953e4f14a930cedc55f274df`)
            // 6.554127800958483, 3.2192881716868693
            let response = await fetch(`https://api.geoapify.com/v2/places?categories=healthcare.clinic_or_praxis&filter=circle:${longitude},${latitude},${radius * 1000}&apiKey=d1a3972d953e4f14a930cedc55f274df`);

            let data = await response.json();

            let hospitals: Hospital[] = data.features.map((h: any) => {
                return {
                    id: h.properties.place_id,
                    properties: {
                        name: h.properties.name,
                        address: h.properties.address_line2
                    },
                    geometry: {
                        coordinates: h.geometry.coordinates,
                        distance: calculateDistance((userLocation as [number,number]), h.geometry.coordinates).toFixed(2)
                    }
                };
            });

            onFetchedHospitals(hospitals);
            markers.forEach(marker => marker.remove());
            const zooms: any = {
                50: 10,
                20: 10.5,
                10: 11,
                5: 12,
                1: 13,
                .5: 14,
            }
            setZoom(zooms[searchRadius]);
            addHospitalMarkers(hospitals);
        } catch (e) {
            console.error('Something went wrong ', e)
        } finally {
            setIsFetchingHospitals(false);
        }
    };


    const addHospitalMarkers = (hospitals: Hospital[]) => {
        let newMarkers: mapboxgl.Marker[] = [];
        hospitals.forEach(hospital => {
            const pin = document.createElement('img');
            pin.src = hospitalPinIcon;
            pin.height = 30;
            pin.width = 30;

            let popup = new mapboxgl.Popup({ offset: 10, closeButton: false })
            .setHTML(`
            <div class="flex flex-col p-1">
                <span>${hospital.properties.name}</span>
                <div>
                    <span class="text-paragraph-small text-grey-400">Distance:</span> <span class="text-paragraph-small text-grey-700">${hospital.geometry.distance} km</span>
                </div>
            </div>
            `);
    
            newMarkers.push(
                new mapboxgl.Marker(pin)
                .setLngLat(hospital.geometry.coordinates)
                .setPopup(popup)
                .addClassName(`marker-${hospital.id}`)
                .addTo(map.current!)
            );
        });
        setMarkers(newMarkers);
    };

    return (
        <div data-testid="MbMap" ref={mapContainer} className='h-full'>
        </div>
    );
}

export default MBMap;
