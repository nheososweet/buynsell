import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  uiType?: "first" | "second" | "third" | "fourth" | "disabled";
  twClassAddition?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const BaseButton = ({
  title,
  uiType = "first",
  twClassAddition,
  leftIcon,
  rightIcon,
  ...buttonProps
}: Props) => {
  switch (uiType) {
    case "second":
      return (
        <button
          type="button"
          className={
            `flex items-center outline-none bg-login-bg rounded-radius-base px-4 py-[10px] font-["SVN-SemiBold"] text-size-medium lead-[15.75px] text-login-button disabled:bg-secondart disabled:text-login-bg ` +
            twClassAddition
          }
          {...buttonProps}
        >
          {leftIcon}
          <span
            className={leftIcon ? "ml-[10px]" : rightIcon ? "mr-[10px]" : ""}
          >
            {title}
          </span>
          {rightIcon}
        </button>
      );
    case "third":
      return (
        <button
          type="button"
          className={
            `outline-none bg-grey-f6 rounded-radius-base px-4 py-[10px] font-["SVN-SemiBold"] text-size-medium lead-[15.75px] text-login-button disabled:bg-secondart disabled:text-login-bg ` +
            twClassAddition
          }
          {...buttonProps}
        >
          {leftIcon}
          <span
            className={leftIcon ? "ml-[10px]" : rightIcon ? "mr-[10px]" : ""}
          >
            {title}
          </span>
          {rightIcon}
        </button>
      );
    case "fourth":
      return (
        <button
          type="button"
          className={
            `flex items-center outline-none bg-grey-f6 rounded-radius-base px-4 py-[10px] font-["SVN-SemiBold"] text-size-medium lead-[15.75px] text-first-black disabled:bg-secondart disabled:text-login-bg ` +
            twClassAddition
          }
          {...buttonProps}
        >
          {leftIcon}
          <span
            className={leftIcon ? "ml-[10px]" : rightIcon ? "mr-[10px]" : ""}
          >
            {title}
          </span>
          {rightIcon}
        </button>
      );
    case "disabled":
      return (
        <button
          type="button"
          className={
            `pointer-events-none flex items-center outline-none bg-grey-f6 rounded-radius-base px-4 py-[10px] font-["SVN-SemiBold"] text-size-medium lead-[15.75px] text-secondart disabled:bg-secondart disabled:text-login-bg ` +
            twClassAddition
          }
          {...buttonProps}
        >
          {leftIcon}
          <span
            className={leftIcon ? "ml-[10px]" : rightIcon ? "mr-[10px]" : ""}
          >
            {title}
          </span>
          {rightIcon}
        </button>
      );
    default:
      return (
        <button
          type="button"
          className={
            `outline-none bg-login-button rounded-radius-base px-4 py-[10px] font-["SVN-SemiBold"] text-size-medium lead-[15.75px] text-login-bg disabled:bg-secondart disabled:text-login-bg ` +
            twClassAddition
          }
          {...buttonProps}
        >
          {leftIcon}
          <span
            className={leftIcon ? "ml-[10px]" : rightIcon ? "mr-[10px]" : ""}
          >
            {title}
          </span>
          {rightIcon}
        </button>
      );
  }
};

export default BaseButton;
