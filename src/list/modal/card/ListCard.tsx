import { ReactNode } from "react";

import { Card } from "@components";

import ListCardTitle from "./ListCardTitle";
import ListCardFlex from "./ListCardFlex";
import ListCardLocation from "./ListCardLocation";
import ListCardCategory from "./ListCardCategory";
import ListCardMap from "./ListCardMap";
import ListCardContent from "./ListCardContent";
import ListCardEditDate from "./ListCardEditDate";
import ListCardEmpty from "./ListCardEmpty";
import ListCardButtonLayout from "./ListCardButtonLayout";
import ListCardDate from "./ListCardDate";

import DeleteButton from "../../common/DeleteButton";
import EditButton from "../../common/EditButton";
import HoldButton from "../../common/HoldButton";
import ReturnButton from "../../common/ReturnButton";

interface Props {
  type: "todo" | "complete" | "hold";
  children: ReactNode;
}

const ListCard = ({ type, children }: Props) => {
  return (
    <Card type={type} css={{ zIndex: 1000 }}>
      {children}
    </Card>
  );
};

ListCard.ButtonLayout = ListCardButtonLayout;
ListCard.Delete = DeleteButton;
ListCard.Edit = EditButton;
ListCard.Hold = HoldButton;
ListCard.Return = ReturnButton;
ListCard.Date = ListCardDate;
ListCard.Title = ListCardTitle;
ListCard.Flex = ListCardFlex;
ListCard.Location = ListCardLocation;
ListCard.Category = ListCardCategory;
ListCard.Map = ListCardMap;
ListCard.Content = ListCardContent;
ListCard.EditDate = ListCardEditDate;
ListCard.Empty = ListCardEmpty;

export default ListCard;
