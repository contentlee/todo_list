import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const PageLayout = ({ children, ...props }: Props) => {
  return (
    <main
      css={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "100%",
        padding: "20px",
        paddingBottom: "64px",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
      {...props}
    >
      {children}
    </main>
  );
};

export default PageLayout;
