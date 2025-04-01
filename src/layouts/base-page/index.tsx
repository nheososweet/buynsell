import { PropsWithChildren, ReactNode } from "react";
import BottomPart from "./bottom";
import PagingPart from "./paging";
import TopPart from "./top";

interface Props extends PropsWithChildren {
  topNodeLeft: React.ReactNode;
  topLeftTitle: string;
  topLeftSubTitle?: string;
  bottomRightNode: React.ReactNode;
  noPaging?: boolean;
  rowPerPage?: number;
  totalRow?: number;
  page?: number;
  onChangeRowPerPage?: (rowPerPage: number) => void;
  onChangePage?: (page: number) => void;
  noPadding?: boolean;
  selectedAllRecord?: boolean;
  selectedAllRecordConfirm?: () => void;
  selectedAllRecordCancel?: () => void;
  customTopPart?: React.ReactNode;
  title?: string;
  isChatLayout?: boolean;
  isBackLayout?: string;
  headerContent?: ReactNode;
  onBack?: () => void;
}

const BasePage = (props: Props) => {
  return (
    <div className="bg-gray-100 h-screen w-screen overflow-hidden">
      <div className="w-full md:w-[430px] h-full mx-auto bg-white relative">
        <TopPart
          leftTitle={props.topLeftTitle}
          leftSubTitle={props.topLeftSubTitle || ""}
          nodeRight={props.topNodeLeft}
          customTopPart={props.customTopPart}
          title={props.title}
          isChatLayout={props.isChatLayout}
          isBackLayout={props.isBackLayout}
          headerContent={props.headerContent}
          onBack={props.onBack}
        />
        <div
          style={{
            height: props.isChatLayout
              ? "calc(100vh - 70px)"
              : "calc(100vh - 143px)",
          }}
          className={`${
            props.isBackLayout
              ? "h-[calc(100vh-70px)]"
              : "h-[calc(100vh-143px)]"
          } overflow-auto`}
        >
          {props.children}
        </div>
        {/* {!props.noPaging && (
          <PagingPart
            rowPerPage={props.rowPerPage}
            totalRow={props.totalRow}
            page={props.page}
            onChangeSize={props.onChangeRowPerPage}
            onChangePage={props.onChangePage}
            selectedAllRecord={props.selectedAllRecord}
            selectedAllRecordConfirm={props.selectedAllRecordConfirm}
            selectedAllRecordCancel={props.selectedAllRecordCancel}
          />
        )}
        */}
        {!props.isChatLayout && !props.isBackLayout && <BottomPart />}
      </div>
    </div>
  );
};

export default BasePage;
