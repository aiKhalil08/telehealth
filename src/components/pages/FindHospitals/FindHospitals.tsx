import React, { FC, useEffect, useState } from 'react';
import styles from './FindHospitals.module.css';

import locationIcon from '../../../assets/icons/small-location.svg';
import searchRadiusIcon from '../../../assets/icons/search-radius.svg';
import optionsIcon from '../../../assets/icons/options.svg';
import { Hospital } from '../../../types';
import RatingStars from '../../partials/RatingStars/RatingStars';
import Map from '../../partials/Map/Map';
import MBMap from '../../partials/MBMap/MBMap';
import { Loader2 } from 'lucide-react';

interface FindHospitalsProps {}

const FindHospitals: FC<FindHospitalsProps> = () => {

    const [hospitals, setHospitals] = useState<Hospital[] | null>(null);
    const [isFetchingHospitals, setIsFetchingHospitals] = useState(false);
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
    const [focusedHospital, setFocusedHospital] = useState<[number, number] | null>(null);
    const [searchRadius, setSearchRadius] = useState<{value: number, text: string}>({value: 10, text: '10 km'});
    const [radiiExpanded, setRadiiExpanded] = useState(false);
    const [showRoute, setShowRoute] = useState<{coordinates: [number, number][][]} | null>(null)

    useEffect(() => {
        const getUserLocation = async () => {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        const { longitude, latitude } = position.coords;
                        // console.log(longitude, latitude)
                        setUserLocation([longitude, latitude]);
                    },
                    error => {
                        console.error("Error getting user location:", error);
                        // Fallback to IP-based geolocation or ask user to input location
                    }
                );
            } else {
              console.error("Geolocation is not supported by this browser.");
              // Fallback to IP-based geolocation or ask user to input location
            }

            // try {
            //     let response = await fetch('https://api.geoapify.com/v1/ipinfo?&apiKey=d1a3972d953e4f14a930cedc55f274df');

            //     let data: {location: {longitude: number, latitude: number}} = await response.json();

            //     console.log(data)

            //     setUserLocation([data.location.longitude, data.location.latitude]);
            // } catch (e) {
            //     console.error(e)
            // }
        };

        getUserLocation();
    }, []);

    async function createRoute(dest: [number, number]) {
        if (userLocation) {
            let res = await fetch(`https://api.geoapify.com/v1/routing?waypoints=lonlat:${userLocation[0]},${userLocation[1]}|lonlat:${dest[0]},${dest[1]}&mode=drive&apiKey=d1a3972d953e4f14a930cedc55f274df`);
    
            let data = await res.json();
    
            console.log(data)
    
            setShowRoute({coordinates: data.features[0].geometry.coordinates});
        }
    }

    const radii = [
        {value: 0.5, text: '500 m'},
        {value: 1, text: '1 km'},
        {value: 5, text: '5 km'},
        {value: 10, text: '10 km'},
        {value: 20, text: '20 km'},
        {value: 50, text: '50 km'},
    ]

    return (
        <div data-testid="FindHospitals" className='px-9 py-6 flex gap-9'>
            <div className='flex flex-col gap-6 flex-[0_0_483px]'>
                <div className='flex flex-col gap-2'>
                    <h2 className='text-heading-5 font-semibold'>Hospitals near me</h2>
                    <div className='flex gap-6 flex-wrap'>
                        <UserLocation coordinates={userLocation} />
                        <div className='flex gap-2 w-20'>
                            <img src={searchRadiusIcon} height={20} width={20} alt="" />
                            <div className='relative'>
                                <button type='button' onClick={() => setRadiiExpanded(!radiiExpanded)} className='w-full outline-none border-b border-b-grey-400 text-paragraph-small curs'>
                                    {searchRadius.text}
                                </button>
                                {
                                    radiiExpanded &&
                                    <div className='absolute top-full w-32 left-0 mt-2 z-10'>
                                        <ul className='border border-grey-200 bg-white rounded-xl'>
                                            {
                                                radii.map((r: {value: number, text: string}) => {
                                                    return (
                                                        <li key={r.value} onClick={() => {setSearchRadius(r); setRadiiExpanded(false)}} className='text-paragraph-small cursor-pointer p-2 border-b border-b-grey-100 last:border-b-0'>
                                                            {r.text}
                                                        </li>
                                                    );
                                                })
                                            }
                                        </ul>
                                    </div>
                                }
                            </div>
                        </div>
                        {/* <button type='button' className='text-paragraph-small font-semibold text-primary-500'>Change</button> */}
                    </div>
                </div>
                <section className=''>
                    <HospitalList {...{hospitals, isFetchingHospitals, setFocusedHospital, createRoute}} />
                </section>
            </div>
            <div className='grow sticky h-[600px] top-[88px]'>
                {/* <Map /> */}
                <MBMap {...{onFetchedHospitals: setHospitals, isFetchingHospitals, setIsFetchingHospitals, userLocation, focusedHospital, setFocusedHospital, searchRadius: searchRadius.value, showRoute}} />
            </div>
        </div>
    );
}

function HospitalList({hospitals, isFetchingHospitals, setFocusedHospital, createRoute}: {hospitals: Hospital[] | null, isFetchingHospitals: boolean, setFocusedHospital: (a: [number, number]) => void, createRoute: (c: [number,number]) => void}) {

    if (isFetchingHospitals) {
        return (
            <div className='w-full h-96 grid place-items-center'>
                <div className='flex flex-col gap-4 items-center'>
                    <Loader2 className='animate-spin text-grey-400 w-16 h-16' />
                    <span className='text-paragraph-small text-grey-700'>Looking for hospitals near you...</span>
                </div>
            </div>
        );
    }

    if (!hospitals) return null;

    if (hospitals.length === 0) {
        return (
            <div className='w-full h-96 grid place-items-center'>
                <span className='text-paragraph-small text-grey-700'>No hospitals near you.</span>
            </div>
        );
    }

    const sortedHospitals = hospitals.sort((a, b) => a.geometry.distance - b.geometry.distance);

    return (
        <ul className='flex flex-col gap-4'>
            {
                sortedHospitals.map(hospital => {
                    return (
                        <li key={hospital.properties.name}>
                            <HospitalCard {...{hospital, setFocusedHospital, createRoute}} />
                        </li>
                    );
                })
            }
        </ul>
    );
}

function HospitalCard({hospital, setFocusedHospital, createRoute}: {hospital: Hospital, setFocusedHospital: (a: [number, number]) => void, createRoute: (c: [number, number]) => void}) {

    const [optionsExpanded, setOptionsExpanded] = useState(false);

    return (
        <div className='bg-white p-6 flex gap-6 border border-grey-200 rounded-xl cursor-pointer'>
            <div className='grow flex flex-col gap-1'>
                <div className='text-paragraph-medium font-semibold text-grey-700'>
                    {hospital.properties.name}{' '}
                    <span className='text-paragraph-small font-normal'>({hospital.geometry.distance} km)</span>
                </div>
                <div className='flex gap-2 text-paragraph-small font-semibold text-grey-500'>
                    <span>5</span>
                    <RatingStars rating={5} />
                    <span>(70)</span>
                </div>
                <span className='text-paragraph-small text-grey-600'>{hospital.properties.address}</span>
                <div className='space-x-2'>
                    <span className='text-paragraph-small font-medium text-success-700'>Open 24 hours</span>
                    <span className='text-grey-600'>&bull;</span>
                    <span className='text-paragraph-small text-grey-600'>08134570987</span>
                </div>
            </div>
            <div className='shrink-0 self-start relative'>
                <button type="button" onClick={() => {setOptionsExpanded(!optionsExpanded)}} className=''>
                    <img src={optionsIcon} alt="" />
                </button>
                {
                    optionsExpanded &&
                    <div className='absolute top-0 w-32 right-full mr-2'>
                        <ul className='border border-grey-200 bg-white rounded-xl'>
                            <li onClick={() => {
                                setFocusedHospital(hospital.geometry.coordinates as [number, number]);
                                setOptionsExpanded(false);
                                }}
                                className='text-paragraph-small cursor-pointer p-2 border-b border-b-grey-100 last:border-b-0'>Show on map</li>
                            <li onClick={() => {
                                createRoute(hospital.geometry.coordinates as [number, number]);
                                setOptionsExpanded(false);
                                }}
                                className='text-paragraph-small cursor-pointer p-2 border-b border-b-grey-100 last:border-b-0'>Show route</li>
                        </ul>
                    </div>
                }
            </div>
        </div>
    );
}


function UserLocation({coordinates}: {coordinates: [number, number] | null}) {
    const [locationName, setLocationName] = useState<{street: string, city: string, state: string} | null>(null);

    useEffect(() => {
        if (coordinates === null) return;

        async function getLocationName() {
            const [longitude, latitude] = coordinates as [number, number];
            try {
                let response = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=d1a3972d953e4f14a930cedc55f274df`);

                let data = await response.json();

                const {street, city, state} = data.features[0].properties;
                setLocationName({street, city, state});
            } catch (e) {
                console.error(e)
            }
        }

        getLocationName();
    }, [coordinates]);

    return (
        <div className='flex gap-1'>
            <img src={locationIcon} alt="" />
            {
                locationName ?
                <div className='min-w-fit'>
                    <span className='text-paragraph-small font-medium text-grey-500'>
                        {locationName.street}, {locationName.city}, {locationName.state}
                    </span>
                </div> :
                <span className='min-w-fit text-paragraph-small text-grey-500 italic'>detecting location</span>
            }
        </div>
    );
}


export default FindHospitals;
