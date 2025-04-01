import BaseButton from "@/components/Button";
// import IconCarretDown from "@/components/Icon/carret-down";
// import IconCarretLeft from "@/components/Icon/carret-left";
// import IconCarretRight from "@/components/Icon/carret-right";
import BaseTag from "@/components/Tag";
import OutsideDetectWrapper from "@/hocs/OutsideDetectWrapper";
import { useSignal } from "@preact/signals-react";
import { v4 as uuid } from "uuid";

type Props = {
  rowPerPage?: number;
  totalRow?: number;
  page?: number;
  onChangeSize?: (size: number) => void;
  onChangePage?: (page: number) => void;
  additionalClass?: string;
  selectedAllRecord?: boolean;
  selectedAllRecordConfirm?: () => void;
  selectedAllRecordCancel?: () => void;
};

const draft_waiting_action = [
  {
    id: uuid(),
    value: 5,
  },
  {
    id: uuid(),
    value: 10,
  },
  {
    id: uuid(),
    value: 15,
  },
];

const PagingPart = ({
  page = 1,
  totalRow = 100,
  additionalClass,
  rowPerPage = 10,
  onChangeSize,
  onChangePage,
  selectedAllRecord,
  selectedAllRecordConfirm,
  selectedAllRecordCancel,
}: Props) => {
  const expandRowAction = useSignal<boolean>(false);
  const totalPage = Math.ceil(totalRow / rowPerPage);

  const getVisiblePages = (currentPage: number, totalPage: number) => {
    const pages = [];

    if (totalPage <= 6) {
      for (let i = 1; i <= totalPage; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPage - 1, currentPage + 1);
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (currentPage < totalPage - 2) pages.push("...");
      pages.push(totalPage);
    }

    return pages;
  };

  const visiblePages = getVisiblePages(page, totalPage);

  const firstPage = visiblePages[0];
  const lastPage = visiblePages[visiblePages.length - 1];

  return (
    <div
      className={`items-center fixed w-full bottom-bottom-master-footer bg-white px-[72px] h-[92px] flex ${
        selectedAllRecord ? "justify-between" : "justify-end"
      } border-t-[1px] border-grey-ed z-[1] ${additionalClass}`}
    >
      {selectedAllRecord && (
        <div className="flex items-center gap-2">
          <BaseButton title="Xác nhận" onClick={selectedAllRecordConfirm} />
          <BaseButton
            title="Từ chối"
            uiType="fourth"
            onClick={selectedAllRecordCancel}
          />
        </div>
      )}
      <div className="flex items-center gap-[6px] text-sm">
        <BaseTag
          onClick={(e) => {
            e.stopPropagation();
            expandRowAction.value = !expandRowAction.value;
          }}
          label={rowPerPage.toString()}
          additionClass="cursor-pointer relative flex items-center gap-1 !py-1 !px-2 bg-grey-f6 rounded-radius-base z-30"
          absoluteChildNode={
            <OutsideDetectWrapper
              callback={() => {
                expandRowAction.value = false;
              }}
            >
              <div
                className={`absolute !z-40 w-[60px] top-[calc(110%)] right-0 min-h-10 rounded-radius-base bg-white border border-grey-ed cursor-default ${
                  expandRowAction.value ? "block" : "hidden"
                }`}
              >
                {draft_waiting_action.map((item, idx) => (
                  <div
                    key={idx}
                    className={`px-2 py-1 text-sm text-center hover:bg-grey-f6 cursor-pointer`}
                    onClick={() => onChangeSize && onChangeSize(item.value)}
                  >
                    {item.value}
                  </div>
                ))}
              </div>
            </OutsideDetectWrapper>
          }
          // lastIcon={<IconCarretDown />}
        />

        <p className="text-secondart font-['SVN-Regular'] leading-5 text-size-medium">
          Trên tổng số {totalRow}
        </p>

        {visiblePages.length > 0 && (
          <div className="flex items-center gap-[6px]">
            <div
              className={`select-none px-2 py-1 cursor-pointer text-first-black text-size-subkey-table leading-5 font-['SVN-SemiBold'] bg-grey-f6 w-[28px] h-[28px] flex items-center justify-center rounded-radius-base ${
                page === firstPage ? "pointer-events-none" : ""
              }`}
              onClick={() => onChangePage?.(Math.max(1, page - 1))}
            >
              {/* <IconCarretLeft
                className={page === firstPage ? "fill-secondart" : ""}
              /> */}
            </div>

            {visiblePages.map((item, idx) => (
              <div
                key={idx}
                className={`select-none px-2 py-1 cursor-pointer text-size-subkey-table leading-5 font-['SVN-SemiBold'] ${
                  item === page
                    ? "text-white bg-first-black"
                    : "text-first-black bg-grey-f6"
                } w-[28px] h-[28px] flex items-center justify-center rounded-radius-base`}
                onClick={() => {
                  if (item !== page && typeof item === "number") {
                    onChangePage?.(item);
                  }
                }}
              >
                {item}
              </div>
            ))}

            <div
              className={`px-2 py-1 cursor-pointer text-first-black text-size-subkey-table leading-5 font-['SVN-SemiBold'] bg-grey-f6 w-[28px] h-[28px] flex items-center justify-center rounded-radius-base ${
                page === lastPage ? "pointer-events-none" : ""
              }`}
              onClick={() => onChangePage?.(Math.min(totalPage, page + 1))}
            >
              {/* <IconCarretRight
                className={page === lastPage ? "fill-secondart" : ""}
              /> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PagingPart;
