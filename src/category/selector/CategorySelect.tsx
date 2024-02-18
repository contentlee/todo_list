import { HTMLAttributes, useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import { useGetCategories, useRegisterCategory } from "@api/category";

import { alertAtom } from "@atoms/alertAtom";

import { Select } from "@components";

interface Props extends HTMLAttributes<typeof Select> {
  value?: string;
}

const CategorySelect = ({ value }: Props) => {
  const [_, setAlert] = useRecoilState(alertAtom);

  const { data } = useGetCategories();

  const { mutate } = useRegisterCategory();

  const [options, setOptions] = useState<string[]>([]);
  const [category, setCategory] = useState<string>("");

  const handleAddOption = (category: string) => {
    if (!category) return setAlert({ isOpened: true, type: "warning", children: "이름을 입력해주세요." });
    if (options.includes(category))
      return setAlert({ isOpened: true, type: "warning", children: "중복된 이름이 존재합니다." });

    mutate({ category });
  };

  useEffect(() => {
    if (value) setCategory(value);
    if (data) setOptions(data.category?.map((v) => v.name));
  }, [data]);

  return <Select type="add" label="분류" value={category} options={options} handleAddOption={handleAddOption}></Select>;
};

export default CategorySelect;
