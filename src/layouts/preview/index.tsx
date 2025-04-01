import { PropsWithChildren } from "react";
import MasterFooter from "./footer";
import PreviewHeader from "./header";
import "./style.scss";

interface Props extends PropsWithChildren {
  children: React.ReactNode;
}

const PreviewLayout = ({ children }: Props) => {
  return (
    <div className="master-layout">
      <PreviewHeader />
      <div className="">{children}</div>

      <MasterFooter />
    </div>
  );
};

export default PreviewLayout;
