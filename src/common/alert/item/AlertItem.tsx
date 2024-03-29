import { palette } from "@utils/palette";
import { HTMLAttributes } from "react";
import AlertIcon from "./AlertIcon";
import CloseButton from "./CloseButton";

interface Props extends HTMLAttributes<HTMLDivElement> {
  type: "success" | "error" | "warning" | "alarm";
  children?: React.ReactNode;
}

const AlertItem = ({ type, children, ...props }: Props) => {
  return (
    <div
      css={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        maxWidth: "350px",
        height: "2.5em",
        padding: "0 14px",
        gap: "1.25em",
        color: palette.white,
        ...TYPE_VARIANTS[type],
      }}
      {...props}
    >
      {children}
    </div>
  );
};

const TYPE_VARIANTS = {
  success: {
    backgroundColor: palette.green,
  },
  error: {
    backgroundColor: palette.red,
  },
  warning: {
    backgroundColor: palette.sub_purple,
  },
  alarm: {
    border: `1px solid ${palette.gray600}`,
    color: palette.gray600,
    backgroundColor: palette.white,
  },
};

AlertItem.Icon = AlertIcon;
AlertItem.Close = CloseButton;

export default AlertItem;
