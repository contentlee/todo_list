import { HTMLAttributes } from "react";
import { palette } from "@utils/palette";

interface Props extends HTMLAttributes<HTMLDivElement> {
  type?: "todo" | "complete" | "hold" | "on" | "off";
}

const ListItem = ({ type = "todo", ...props }: Props) => {
  return (
    <div
      css={{
        display: "flex",
        alignItems: "center",
        padding: "0 16px",
        width: "100%",
        maxWidth: "350px",
        minHeight: "40px",
        gap: "32px",
        boxSizing: "border-box",
        border: "1px solid",
        backgroundColor: palette.white,
        userSelect: "none",
        ...TYPE_VARIANTS[type],
      }}
      {...props}
    ></div>
  );
};

const TYPE_VARIANTS = {
  todo: { color: palette.gray600, borderColor: palette.gray600 },
  complete: { color: palette.green, borderColor: palette.green },
  hold: { color: palette.purple, borderColor: palette.purple },
  on: { color: palette.white, borderColor: palette.gray600, background: palette.gray600 },
  off: { color: palette.gray600, borderColor: palette.gray600 },
};

export default ListItem;
