import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  firstIcon?: React.ReactNode;
  lastIcon?: React.ReactNode;
  uiType?: "active" | "disabled" | "draft" | "waiting" | "reject";
  additionClass?: string;
  absoluteChildNode?: React.ReactNode;
}

const BaseTag = ({
  label,
  uiType = "draft",
  additionClass,
  firstIcon,
  lastIcon,
  absoluteChildNode,
  ...divProps
}: Props) => {
  switch (uiType) {
    case "active":
      return (
        <div
          className={` w-[fit-content] flex items-center gap-1 bg-green-e4 px-4 py-[7.5px] rounded text-green-2b text-size-base lead-[14.7] font-['SVN-SemiBold'] ${
            additionClass ?? ""
          } `}
          {...divProps}
        >
          {firstIcon}
          {label}
          {lastIcon}
          {absoluteChildNode ?? <></>}
        </div>
      );
    case "waiting":
      return (
        <div
          className={` ${
            additionClass ?? ""
          } w-[fit-content] flex items-center gap-1 bg-yellow-ff px-4 py-[7.5px] rounded text-yellow-ba text-size-base lead-[14.7] font-['SVN-SemiBold']`}
          {...divProps}
        >
          {firstIcon}
          {label}
          {lastIcon}
          {absoluteChildNode ?? <></>}
        </div>
      );
    case "reject":
      return (
        <div
          className={` ${
            additionClass ?? ""
          } w-[fit-content] flex items-center gap-1 bg-red-fff4 px-4 py-[7.5px] rounded text-base-error text-size-base lead-[14.7] font-['SVN-SemiBold']`}
          {...divProps}
        >
          {firstIcon}
          {label}
          {lastIcon}
          {absoluteChildNode ?? <></>}
        </div>
      );
    case "disabled":
      return (
        <div
          className={` ${
            additionClass ?? ""
          } w-[fit-content] flex items-center gap-1 bg-grey-f6 px-4 py-[7.5px] rounded text-secondart text-size-base lead-[14.7] font-['SVN-SemiBold'] pointer-events-none`}
          onClick={() => {}}
          {...divProps}
        >
          {firstIcon}
          {label}
          {lastIcon}
          {absoluteChildNode ?? <></>}
        </div>
      );
    default:
      return (
        <div
          className={` w-[fit-content] flex items-center gap-1 bg-grey-f6 px-4 py-[7.5px] rounded text-first-black text-size-base lead-[14.7] font-['SVN-SemiBold'] ${
            additionClass ?? ""
          }`}
          {...divProps}
        >
          {firstIcon}
          {label}
          {lastIcon}
          {absoluteChildNode ?? <></>}
        </div>
      );
  }
};

export default BaseTag;
