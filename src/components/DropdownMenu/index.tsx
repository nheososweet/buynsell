import React from "react";

type IData = {
  label?: string;
  icon?: React.ReactNode;
  id: string;
  action?: string;
};

type Props = {
  data: IData[];
  onClickRow: (action?: string) => void;
  additionClass?: string;
  itemAdditionClass?: string;
  selectedItemId?: string;
  ref?: React.Ref<HTMLDivElement>;
  danger_item_idx?: number;
};

const DropdownMenu = ({
  data,
  onClickRow,
  additionClass,
  itemAdditionClass,
  selectedItemId,
  ref,
  danger_item_idx,
}: Props) => {
  return (
    <div
      ref={ref}
      className={`${additionClass} border border-grey-ec rounded-radius-base p-4 flex flex-col gap-1 bg-white`}
    >
      {data.map(({ label, icon, id, action }, idx) => (
        <div
          key={id}
          onClick={(e) => {
            e.stopPropagation();
            if (onClickRow) {
              onClickRow(action);
            }
          }}
          className={`account-menu flex items-center gap-[10px] font-['SVN-Regular'] hover:font-['SVN-SemiBold'] hover:text-login-button py-[11px] px-4 hover:bg-grey-f6 ${itemAdditionClass} ${
            id === selectedItemId
              ? "text-login-button font-['SVN-SemiBold']"
              : ""
          } ${
            danger_item_idx === idx
              ? "!text-base-error !hover:text-base-error !hover:fill-base-error"
              : ""
          }`}
        >
          {icon}
          {label}
        </div>
      ))}
    </div>
  );
};

export default DropdownMenu;
