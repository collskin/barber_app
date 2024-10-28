/* 
Since the map was loaded on client side, 
we need to make this component client rendered as well else error occurs
*/
'use client'

//Map component Component from library
import { GoogleMap, Marker } from "@react-google-maps/api";

//Map's styling
export const defaultMapContainerStyle = {
    width: '100%',
    height: '400px',
    borderRadius: '15px 0px 0px 15px',
};
const defaultMapCenter = {
    lat: 43.583709994027885,
    lng: 21.31450136253926
}

const defaultMapZoom = 17


const defaultMapOptions = {
    zoomControl: true,
    tilt: 0,
    gestureHandling: 'auto',
    mapTypeId: 'roadmap',
};
const MapComponent = () => {
    return (
        <div>
            <GoogleMap
                mapContainerStyle={defaultMapContainerStyle}
                center={defaultMapCenter}
                zoom={defaultMapZoom}
                options={defaultMapOptions}

            >
                <Marker
                    position={{
                        lat: 43.583709994027885,
                        lng: 21.31450136253926
                    }} // Marker position
                    title="Location Marker" // Optional title for the marker
                />
            </GoogleMap>
        </div>
    )
};

export { MapComponent };