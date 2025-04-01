import ChangePasswordPopup from "@/components/change-password";
import ConfirmActionPopup from "@/components/ConfirmAction/confirm-action-popup";
import ChatIcon from "@/components/Icon/chat-icon";
import HistoryIcon from "@/components/Icon/history-icon";

import { useUserStore } from "@/pages/authenticate/state";
import { useSignal } from "@preact/signals-react";
import React, { JSX, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface INavbar {
  route: string;
  label: string;
  icon?: JSX.Element;
  childrens?: INavbar[];
}

const ListNavbar: INavbar[] = [
  {
    route: "/chat",
    label: "New chat",
    icon: <ChatIcon />,
  },
  {
    route: "/history",
    label: "History",
    icon: <HistoryIcon />,
  },
];

const MasterHeader = () => {
  const { user, getUserInformation, logout } = useUserStore();
  const chooseNav = useSignal<string>("");
  const [openConfirmLogout, setOpenConfirmLogout] = useState<boolean>(false);
  const navigate = useNavigate();
  const route = useLocation();
  const changePasswrodState = useSignal<{
    isOpen: boolean;
    id: string;
  }>({
    isOpen: false,
    id: "",
  });

  useEffect(() => {
    if (route.pathname) {
      chooseNav.value = route.pathname;
    }
  }, []);

  const selectNav = (route: string) => () => {
    chooseNav.value = route;
    navigate(route);
  };

  useEffect(() => {
    if (!user) {
      getUserInformation();
    }
  }, [user]);

  const navToLogin = () => {
    navigate("/login");
  };

  const renderChildNav = (itemNav: INavbar) => {
    return (
      <div
        className={`nested-nav py-2 px-4 hover:bg-grey-f4 rounded-radius-base cursor-pointer ${
          itemNav.route === chooseNav.value
            ? "text-primary-9d"
            : "text-first-black text-size-subkey-table font-normal leading-[22px] font-['SVN-Regular']"
        }`}
        key={itemNav.label + "-" + itemNav.route}
        onClick={selectNav(itemNav.route)}
      >
        {itemNav.label}
        {itemNav.childrens && itemNav.childrens.length > 0 && (
          <div className="child-nested-nav left-[100%] top-0 gap-2 w-[240px] absolute">
            {itemNav.childrens.map((snc) => renderChildNav(snc))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed left-0 right-0 top-0 z-[10] bg-white h-[98px] border-b-[1px] border-grey-ed pl-[72px] pr-[2rem] py-6 flex items-center justify-between">
      <div className="flex gap-[40px] items-center">
        <div className="">
          <img
            className="h-[31px] w-auto"
            alt="Sphinx Chatbot"
            src="/assets/sphinx-logo.png"
          />
        </div>
        <div className="flex items-center text-size-medium gap-[40px]">
          {ListNavbar.map((it) => (
            <div
              onClick={() => {
                if (it.childrens && it.childrens.length > 0) {
                  return;
                } else {
                  selectNav(it.route)();
                }
              }}
              key={it.label + "-" + it.route}
              className={`parent-nav flex items-center gap-2 py-2 px-4 ${
                chooseNav.value === it.route ||
                (it.childrens?.length &&
                  it.childrens.some(
                    (child: INavbar) => chooseNav.value === child.route
                  ))
                  ? "bg-grey-f4 rounded-radius-8 font-extrabold text-primary-9d "
                  : ""
              } nav-item hover:bg-grey-f4 hover:rounded-radius-8 hover:font-extrabold hover:text-primary-9d relative cursor-pointer hover:fill-primary-9d`}
            >
              {React.cloneElement(it.icon!, {
                className: `${
                  chooseNav.value === it.route ||
                  (it.childrens?.length &&
                    it.childrens.some(
                      (child: INavbar) => chooseNav.value === child.route
                    ))
                    ? "fill-primary-9d"
                    : "fill-text-primary"
                } icon-nav`,
              })}{" "}
              {it.label}
              {it.childrens && it.childrens.length > 0 && (
                <div
                  className={`${
                    chooseNav.value === it.route ? "" : ""
                  } z-50 gap-2 child-nav top-[3rem] bg-white p-[10px] left-0 rounded-radius-8 border border-purple-100 absolute shadow-[0px_4px_4px_0px_#f5ecfb]`}
                >
                  <div className="relative">
                    <div className="flex flex-col gap-1 w-[240px]">
                      {it.childrens.map((sn) => renderChildNav(sn))}
                    </div>
                  </div>
                </div>
              )}
              {it.childrens && it.childrens.length > 0 && (
                <span className="expand-arrow-icon">v</span>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2 text-size-medium"></div>
      <ConfirmActionPopup
        isOpen={openConfirmLogout}
        onConfirm={() => {
          logout(navToLogin);
        }}
        onCancel={() => {
          setOpenConfirmLogout(false);
        }}
        title="Bạn có chắc chắn muốn đăng xuất khỏi hệ thống?"
      />
      <ChangePasswordPopup openState={changePasswrodState} />
    </div>
  );
};

export default MasterHeader;
