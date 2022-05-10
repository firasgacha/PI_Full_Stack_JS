import React, { useState } from "react";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import {useApi} from "../../hooks/useApi";


function Map() {
    let markers=[]
    let indexpro=1;
    const [products,err,relaod]= useApi('products/getjson');
    for(var i in products){
        markers.push({
            id:indexpro,
            name:"Store Name: "+products[i]['Store']['fullName']+" Product Name: "+products[i]['Categorie']['name']+" Price: "+products[i]['Price']+" Dt"+" Développé par https://www.facebook.com/selim.benaich/ Selim Ben Aich Tel:+21693165012",
            position: { lat: parseFloat(products[i]['Store']['localisation'].substring(0,products[i]['Store']['localisation'].lastIndexOf(","))), lng: parseFloat(products[i]['Store']['localisation'].substring(products[i]['Store']['localisation'].lastIndexOf(",")+2)) },
            img:products[i]['Images'][0]['img']
        })
        indexpro++;
    }
    const [activeMarker, setActiveMarker] = useState(null);

    const handleActiveMarker = (marker) => {
        if (marker === activeMarker) {
            return;
        }
        setActiveMarker(marker);
    };

    const handleOnLoad = (map) => {
        const bounds = new window.google.maps.LatLngBounds();
        markers.forEach(({ position }) => bounds.extend(position));
        map.fitBounds(bounds);
    };

    return (
        <GoogleMap
            center={{ lat: 36.74553118657863, lng: 9.892030375477106 }}
            onLoad={handleOnLoad}
            onClick={() => setActiveMarker(null)}
            zoom={4}
            mapContainerStyle={{ height: "84vh" }}
        >
            {markers.map(({ id, name, position ,img}) => (
                <Marker
                    key={id}
                    icon={{
                        url:img,
                        scaledSize:  new window.google.maps.Size(150,130),
                        rigin: new window.google.maps.Point(0, 0),
                        optimized: false,
                        anchor: new window.google.maps.Point(0, 32),
                }}
                    position={position}
                    onClick={() => handleActiveMarker(id)}
                >
                    {activeMarker === id ? (
                        <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                            <div>{name}</div>
                        </InfoWindow>
                    ) : null}
                </Marker>
            ))}
        </GoogleMap>
    );
}

export default Map;