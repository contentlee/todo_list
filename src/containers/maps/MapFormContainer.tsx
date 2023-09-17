import { useEffect, useState } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";

import { Place, Position, placeAtomFamily, setPlaceAction } from "@atoms/mapAtom";
import { alertAtom, modalAtom } from "@atoms/stateAtom";

import { Button, Input, Select } from "@components/common";
import { Map, MapLayout } from "@components/maps";
import { useMutation, useQuery } from "react-query";
import { ResPlace, getPlaces, resisterPlace } from "@api/place";

interface Props {
  id: string;
  value?: Place;
  handleSubmitPlace?: () => {};
}

const MapFormContaienr = ({ id, value }: Props) => {
  const resetModal = useResetRecoilState(modalAtom);
  const [_, setAlert] = useRecoilState(alertAtom);

  const resetPlace = useResetRecoilState(placeAtomFamily(id));
  const [__, setPlace] = useRecoilState(placeAtomFamily(id));

  const { data, refetch } = useQuery("places", () => getPlaces());
  const { mutate } = useMutation(resisterPlace);

  const [name, setName] = useState<string>();
  const [selected, setSelected] = useState<Position>();
  const [curCenter, setCurCenter] = useState<Position>();
  const [places, setPlaces] = useState<ResPlace[]>([]);

  const handleClickPoint = (e: google.maps.MapMouseEvent) => {
    const position = e.latLng;
    if (position) {
      setSelected({ lat: position.lat(), lng: position.lng() });
    }
  };

  const handleClickMarker = (e: google.maps.MapMouseEvent) => {
    const place = e.latLng;
    if (place) {
      const value = places.find((v) => v.lat === place.lat() && v.lng === place.lng());
      setName(value!.name);
      setSelected({ lat: value!.lat, lng: value!.lng });
      setCurCenter({ lat: value!.lat, lng: value!.lng });
    }
  };

  const handleClickOption = (e: React.MouseEvent, item: string) => {
    e.preventDefault();
    const place = places.find((v) => v.name === item);

    if (place) {
      setName(item);
      setSelected({ lat: place.lat, lng: place.lng });
      setCurCenter({ lat: place.lat, lng: place.lng });
    }
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleClickSubmit = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!selected) return setAlert({ isOpened: true, type: "warning", children: "위치가 선택되지 않았습니다." });
    if (!name) return setAlert({ isOpened: true, type: "warning", children: "이름을 입력해주세요." });

    if (selected && name) {
      setPlace(setPlaceAction({ name, ...selected }));
      resetModal();
    }
  };

  const handleClickCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    resetModal();
  };

  const handleClickResister = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!selected) return setAlert({ isOpened: true, type: "warning", children: "위치가 선택되지 않았습니다." });
    if (!name) return setAlert({ isOpened: true, type: "warning", children: "이름을 입력해주세요." });

    if (places.findIndex((v) => v.name === name) >= 0)
      return setAlert({ isOpened: true, type: "warning", children: "중복된 이름이 존재합니다." });

    if (places.findIndex((v) => v.lat === selected.lat && v.lng === selected.lng) >= 0)
      return setAlert({ isOpened: true, type: "warning", children: "중복된 장소가 존재합니다." });

    if (selected && name) {
      mutate(
        { place: { name, marker: "A", ...selected } },
        {
          onSuccess: () => {
            setAlert({ isOpened: true, type: "success", children: "장소가 등록되었습니다." });
            refetch();
          },
          onError: () => {
            setAlert({ isOpened: true, type: "success", children: "장소 등록에 실패하였습니다." });
          },
        }
      );
    }
  };

  useEffect(() => {
    if (value && value.name !== "") {
      setCurCenter({ lat: value.lat, lng: value.lng });
      setName(value.name);
    } else {
      window.navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
        setCurCenter({ lat: latitude, lng: longitude });
      });
    }
  }, []);

  useEffect(() => {
    if (data) {
      setPlaces(data.places);
    }
  }, [data]);

  return (
    <MapLayout>
      {curCenter && (
        <div
          css={{
            width: "100%",
            height: "320px",
          }}
        >
          <Map
            places={places}
            center={curCenter}
            selected={selected && { lat: selected.lat, lng: selected.lng }}
            handleClickMap={handleClickPoint}
            handleClickMarker={handleClickMarker}
          ></Map>
        </div>
      )}
      <Select label="나의 장소" option={places.map((v) => v.name)} handleClickOption={handleClickOption}></Select>
      <Input label="이름" defaultValue={name} onChange={handleChangeName}></Input>
      <div
        css={{
          width: "100%",
        }}
      >
        <Button variant="secondary" css={{ width: "50%" }} onClick={handleClickCancel}>
          취소
        </Button>
        <Button css={{ width: "50%" }} onClick={handleClickSubmit}>
          확인
        </Button>
      </div>
      <Button variant="secondary" css={{ width: "100%" }} onClick={handleClickResister}>
        내장소 등록
      </Button>
    </MapLayout>
  );
};

export default MapFormContaienr;
