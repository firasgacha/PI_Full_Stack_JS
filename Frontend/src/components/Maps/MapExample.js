import React from "react";
import {useLoadScript} from "@react-google-maps/api";
import Map from "./Map";

function MapExample() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyAObzCbk0hwnk8LbUcTeFguDk5ZDr36VS4"
    });
    return isLoaded ?<>
        <div className="relative w-full rounded h-600-px">
            <Map />
        </div>
    </>  : null;
}

export default MapExample;
