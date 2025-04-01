import { PropsWithChildren } from "react";
import MasterFooter from "./footer";
import MasterHeader from "./header";
import "./style.scss";

interface Props extends PropsWithChildren {
  children: React.ReactNode;
}

const MasterLayout = ({ children }: Props) => {
  return (
    <div className="">
      <MasterHeader />
      <div
        className="mt-[98px]"
        style={{
          overflowY: "auto",
        }}
      >
        {children}
      </div>

      <MasterFooter />
    </div>
  );
};

export default MasterLayout;
