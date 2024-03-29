import { ReactNode } from "react";

import BarTooltip from "./BarTooltip";
import Bar from "./Bar";

interface Props {
  width: number;
  children: ReactNode;
}

const BarItem = ({ width, children }: Props) => {
  return (
    <div
      css={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "end",
        width: `${width}%`,
        height: "100%",
        overflow: "visible",
        transition: ".5s",
        "&:hover": {
          transform: "scale(110%)",

          "span:first-child": {
            display: "inline",
          },
        },
      }}
    >
      {children}
    </div>
  );
};

BarItem.Tooltip = BarTooltip;
BarItem.Bar = Bar;

export default BarItem;
