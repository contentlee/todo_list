import { HTMLAttributes } from "react";
import { palette } from "@utils/palette";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  state?: "non_selected" | "selected" | "current";
}

const MonthComponent = ({ state = "non_selected", children, ...props }: Props) => {
  return (
    <div
      css={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "70px",
        height: "48px",

        fontSize: "14px",
        fontWeight: 400,

        transition: ".1s",
        cursor: "pointer",

        "&:hover": {
          color: palette.white,
          backgroundColor: palette.blue,
        },

        ...STATE_VARIANTS[state],
      }}
      {...props}
    >
      {children}
    </div>
  );
};

const STATE_VARIANTS = {
  non_selected: {
    color: palette.gray500,
    backgroundColor: palette.white,
  },
  selected: {
    color: palette.white,
    backgroundColor: palette.blue,
  },
  current: {
    color: palette.white,
    backgorundColor: palette.yellow,
  },
};

export default MonthComponent;
