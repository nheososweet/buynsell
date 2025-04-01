import BasePage from "@/layouts/base-page";
import "./style.scss";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
type Props = {};

import { useNavigate } from "react-router-dom";
import ConfirmActionPopup from "@/components/ConfirmAction/confirm-action-popup";
import InfoPopup from "@/components/InfoPopup/info-popup";
import OrderList from "./OrderList";
export enum TabStatus {
  REQUESTED = "REQUESTED",
  CONFIRMED = "CONFIRMED",
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELED",
}
const tabs = [
  { id: "REQUESTED", label: "Yêu cầu thu gom" },
  { id: "CONFIRMED", label: "Xác nhận thu gom" },
  { id: "COMPLETED", label: "Hoàn thành thu gom" },
  { id: "CANCELED", label: "Đơn thu gom bị hủy" },
];
const OrderPage = ({}: Props) => {
  const nav = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenInfo, setIsOpenInfo] = useState(false);

  const onConfirm = () => {
    setIsOpenInfo(true);
  };

  const onCancel = () => {
    setIsOpen(false);
  };

  const onCancelInfo = () => {
    setIsOpenInfo(false);
  };
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [selectedStatus, setSelectedStatus] = React.useState(
    TabStatus.REQUESTED
  );

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
    if (newValue === 0) {
      setSelectedStatus(TabStatus.REQUESTED);
    }
    if (newValue === 1) {
      setSelectedStatus(TabStatus.CONFIRMED);
    }
    if (newValue === 2) {
      setSelectedStatus(TabStatus.COMPLETED);
    }
    if (newValue === 3) {
      setSelectedStatus(TabStatus.CANCELED);
    }
  };

  return (
    <div>
      <BasePage
        topLeftTitle=""
        topNodeLeft={<h1>Buy</h1>}
        topLeftSubTitle=""
        bottomRightNode={<h1>Buy</h1>}
        title="Đơn hàng"
      >
        <div className="px-4 pt-4 pb-2">
          <div className="bg-gray-200 rounded-sm">
            <Tabs
              value={selectedTab}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
              className={`${selectedTab}`}
            >
              {tabs.map((t, idx) => (
                <Tab
                  key={idx}
                  label={t.label}
                  value={idx}
                  className="text-red-500"
                />
              ))}
            </Tabs>
          </div>
          <div>
            <OrderList selectedStatus={selectedStatus} />
          </div>
        </div>

        <ConfirmActionPopup
          title="Bạn có chắc chắn muốn nhận đơn không?"
          isOpen={isOpen}
          onCancel={onCancel}
          onConfirm={onConfirm}
        />

        <InfoPopup
          title="Bạn đã nhận đơn thành công!"
          isOpen={isOpenInfo}
          type="success"
          onClose={onCancelInfo}
        />
      </BasePage>
    </div>
  );
};

export default OrderPage;
