import BaseButton from "../Button";

type Props = {
  additionClass?: string;
  children?: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
  title?: string;
  subTitle?: string;
  buttonCancelLabel?: string;
  buttonConfirmLabel?: string;
  actionButtonCancel: () => void;
  actionButtonConfirm?: any;
  disabledSubmitButton?: boolean;
  footerGroupButton?: React.ReactNode;
  hideDefaultButtonGroup?: boolean;
  leftIconTitle?: React.ReactNode;
  closeOutsideClick?: boolean;
  style?: React.CSSProperties | undefined;
};

export default function Dialog({
  additionClass,
  children,
  title,
  isOpen,
  subTitle,
  buttonCancelLabel = "Hủy bỏ",
  buttonConfirmLabel = "Xác nhận",
  actionButtonCancel,
  actionButtonConfirm,
  disabledSubmitButton,
  footerGroupButton,
  hideDefaultButtonGroup = false,
  leftIconTitle,
  onClose,
  closeOutsideClick,
  style,
}: Props) {
  return (
    <div
      className={`relative z-10  ${isOpen ? "block" : "hidden"}`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      onClick={() => {
        if (closeOutsideClick) onClose();
      }}
    >
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          className="flex min-h-full items-center justify-center p-4 text-center"
          onClick={onClose}
        >
          <div
            className={`relative transform rounded-radius-8 bg-[#D1F4D9] border border-primary-color text-left shadow-xl transition-all ${additionClass}`}
            style={style}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`${
                !title && !subTitle ? "" : "pt-[40px] pb-[20px]"
              } px-[40px]`}
            >
              <div
                className={`${leftIconTitle ? "flex items-center gap-2" : ""}`}
              >
                {title && (
                  <p className=" text-base text-primary-color leading-normal">
                    {title}
                  </p>
                )}
                {leftIconTitle}
              </div>
              {subTitle && (
                <p className="text-sm text-primary-color  leading-[20px] mt-[10px] break-words">
                  {subTitle}
                </p>
              )}
            </div>
            {children && <div className="">{children}</div>}
            {hideDefaultButtonGroup && !footerGroupButton ? (
              <></>
            ) : (
              <div
                className={`flex py-[20px] border-t border-grey-e4 px-[40px] ${
                  footerGroupButton && hideDefaultButtonGroup
                    ? ""
                    : footerGroupButton && !hideDefaultButtonGroup
                    ? "justify-between"
                    : "justify-end"
                }`}
              >
                {footerGroupButton}

                {!hideDefaultButtonGroup && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={actionButtonCancel}
                      className="font-semibold text-white bg-red-700 px-3 py-2 rounded-md"
                    >
                      {buttonCancelLabel}
                    </button>
                    {actionButtonConfirm && (
                      <button
                        onClick={actionButtonConfirm}
                        className="font-semibold text-white bg-orange-500 px-3 py-2 rounded-md"
                      >
                        {buttonConfirmLabel}
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
