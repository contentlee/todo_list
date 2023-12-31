import { LoadScriptNext, GoogleMap, MarkerF } from "@react-google-maps/api";

import { Position } from "@atoms/mapAtom";

import { LoadingContainer } from "@containers/common";
import { ResPlace } from "@api/place";

interface Props {
  center: Position;
  selected?: Position;
  places?: ResPlace[];
  handleClickMap?: (e: google.maps.MapMouseEvent) => void;
  handleClickMarker?: (e: google.maps.MapMouseEvent) => void;
}

const Map = ({ center, selected, places, handleClickMap = () => {}, handleClickMarker = () => {} }: Props) => {
  return (
    <LoadScriptNext
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      id="map"
      language="KO"
      region="KO"
      version="weekly"
      loadingElement={<LoadingContainer></LoadingContainer>}
      preventGoogleFontsLoading={false}
    >
      <GoogleMap
        zoom={18}
        mapContainerClassName="map-container"
        center={center}
        clickableIcons={true}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        onClick={handleClickMap}
      >
        {selected && <MarkerF position={selected}></MarkerF>}
        {places?.map(({ id, lat, lng, name }) => {
          return <MarkerF key={id} title={name} position={{ lat, lng }} onClick={handleClickMarker}></MarkerF>;
        })}
      </GoogleMap>
    </LoadScriptNext>
  );
};

export default Map;
