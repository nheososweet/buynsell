import DropdownMenu from "@/components/DropdownMenu";
import IconArrowOne from "@/components/Icon/arrow-one";
import IconEye from "@/components/Icon/eye";
import OutsideDetectWrapper from "@/hocs/OutsideDetectWrapper";
import { useSignal } from "@preact/signals-react";
import { JSX } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

interface IAccountMenu {
  label: string;
  icon: JSX.Element;
  id: string;
  action: string;
}

const PreviewHeader = () => {
  const { id } = useParams();
  const expandAccountMenu = useSignal<boolean>(false);
  const navigate = useNavigate();

  const { pathname } = useLocation();
  console.log("🚀 ~ PreviewHeader ~ pathname:", pathname);
  console.log(`/preview/s/${id}`);

  const MenuListPreviewScan: IAccountMenu[] = [
    {
      label: "Xem trước giao diện quét mã",
      icon: (
        <IconEye
          additionClass={
            `/preview/s/${id}` === pathname ? "fill-login-button" : ""
          }
        />
      ),
      id: uuidv4(),
      action: `/preview/s/${id}`,
    },
    {
      label: "Xem trước nhãn",
      icon: (
        <IconEye
          additionClass={`/dpp/${id}` === pathname ? "fill-login-button" : ""}
        />
      ),
      id: uuidv4(),
      action: `/dpp/${id}`,
    },
  ];

  return (
    <div className=" bg-black-1f h-[64px] border-b-[1px] border-grey-ed pl-[72px] pr-[2rem] py-6 flex items-center justify-between relative z-[2]">
      <div className="flex gap-16 items-center">
        <div className="pr-[14px]">
          <img
            alt="logo tachyon"
            src="/assets/logo_nbc_white.png"
            className="cursor-pointer"
            onClick={() => navigate("/digital-product-passport")}
          />
        </div>
      </div>
      <div
        className="flex items-center gap-2 text-size-medium text-white absolute left-1/2 -translate-x-1/2 cursor-pointer"
        onClick={() => (expandAccountMenu.value = true)}
      >
        {MenuListPreviewScan.find((item) => item.action === pathname)?.label}
        <div
          className={`${
            expandAccountMenu.value ? "" : ""
          } flex relative justify-center items-center px-2 py-2  w-[22px] h-[22px] rounded-[1px] cursor-pointer`}
        >
          <IconArrowOne className={`!fill-white hover:fill-login-button`} />
          {expandAccountMenu.value && (
            <OutsideDetectWrapper
              callback={() => (expandAccountMenu.value = false)}
            >
              <DropdownMenu
                selectedItemId={
                  MenuListPreviewScan.find((item) => item.action === pathname)
                    ?.id
                }
                additionClass="w-[325px] absolute top-[150%] right-0 z-[5]"
                itemAdditionClass={`text-first-black font-['SVN-SemiBold'] `}
                data={MenuListPreviewScan}
                onClickRow={(action) => {
                  expandAccountMenu.value = false;
                  if (action) navigate(action);
                }}
              />
            </OutsideDetectWrapper>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewHeader;
