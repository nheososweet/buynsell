import BasePage from "@/layouts/base-page";
import "./style.scss";
import { useState } from "react";
import TuneIcon from "@mui/icons-material/Tune";
type Props = {};

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import faker from "faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Thống kê",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Doanh thu",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Đơn hàng",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const AnalysisPage = ({}: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <BasePage
        topLeftTitle=""
        topNodeLeft={<h1>Buy</h1>}
        topLeftSubTitle=""
        bottomRightNode={<h1>Buy</h1>}
        title="Thống kê"
      >
        <div className="px-4 pt-4 pb-2 flex flex-col gap-6">
          <div className="p-3 shadow-default rounded-md bg-gray-100">
            <p className="text-base font-bold text-primary-color">
              Tổng thu nhập
            </p>
            <p className="text-base font-bold text-sub-primary-color">
              10,000,000 đ
            </p>
          </div>

          <div className="p-3 shadow-default rounded-md bg-gray-100 flex flex-col gap-4">
            <div className=" flex items-center justify-between mb-2">
              <p className="text-base font-bold text-primary-color">Thống kê</p>
              <div onClick={handleClick}>
                <TuneIcon className="text-primary-color" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-base">Tổng khối lượng thu mua</p>
              <p className="font-bold text-sub-primary-color">50kg</p>
            </div>
            <div className="flex items-center justify-between">
              <p>Tổng thu nhập</p>
              <p className="font-bold text-sub-primary-color">500,000 đ</p>
            </div>
            <div className="flex items-center justify-between">
              <p>Tổng đơn hàng</p>
              <p className="font-bold text-sub-primary-color">10 đơn</p>
            </div>
            <div>
              <Bar options={options} data={data} />
            </div>
          </div>
        </div>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>Kim loại</MenuItem>
          <MenuItem onClick={handleClose}>Nhựa</MenuItem>
          <MenuItem onClick={handleClose}>Giấy & carton</MenuItem>
          <MenuItem onClick={handleClose}>Đồ điện tử</MenuItem>
          <MenuItem onClick={handleClose}>Đồ điện tử</MenuItem>
          <MenuItem onClick={handleClose}>Đồ gia dụng</MenuItem>
        </Menu>
      </BasePage>
    </div>
  );
};

export default AnalysisPage;
