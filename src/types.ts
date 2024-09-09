import { LngLatLike } from "mapbox-gl";

export type Doctor = {
    name: string,
    specialty: string,
    online?: boolean,
    imageUrl: string
};

export type IconProps = {
    fill: string;
    rectFill?: string;
    width?: number;
    height?: number;
};

export type Visitation = {
    doctor: Doctor,
    address: {
        name: string,
        location: string,
    },
    dateTime: {
        date: string,
        time: string
    }
};

export type StaticHospital = {
    name: string,
    address: string,
    phoneNumber: string,
    rating: number
}

export interface Hospital {
    id: string;
    properties: {
        name: string;
        address: string;
    };
    geometry: {
        distance: number;
        coordinates: LngLatLike;
    };
}