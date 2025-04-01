import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  apiGetAddresByParent,
  apiGetAllProvinces,
  ICategory,
  IMe,
} from "./service";
import { apiGetCurrentUser } from "@/pages/authenticate/service";
import { apiGetCategoryWithProduct } from "@/pages/seller/home/service";
import { apiGetListPost, IPost } from "@/pages/seller/forum/service";
import { useNavigate, useLocation } from "react-router-dom"; // Thêm useLocation
import {
  apiGetAllOrder,
  IOrder,
  IOrderAll,
} from "@/pages/seller/order/service";

export interface IAddress {
  id: number;
  code: string;
  name: string;
  level: string;
  parent_id: number;
  created_at: string;
  updated_at: string;
}

interface ApiContextType {
  data: any;
  provinces: IAddress[];
  districts: IAddress[];
  wards: IAddress[];
  fetchProvinces: () => Promise<void>;
  fetchAddressByParent: (
    parent_id: number,
    level: "district" | "ward"
  ) => Promise<void>;
  fetchData: (url: string) => Promise<void>;
  fetchUser: () => Promise<void>;
  user: IMe | null;
  categories: ICategory[];
  fetchCategories: () => Promise<void>;
  forumPosts: IPost[];
  fetchForumPosts: () => Promise<void>;
  orders: IOrderAll | null;
  fetchOrders: () => Promise<void>;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const nav = useNavigate();
  const { pathname } = useLocation(); // Sử dụng useLocation để lấy pathname động
  const excludedPaths = ["/login", "/otp", "/signup"]; // Các route không gọi API
  const shouldFetchData = !excludedPaths.includes(pathname); // Kiểm tra pathname

  const [data, setData] = useState<any>(null);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [forumPosts, setForumPosts] = useState<IPost[]>([]);
  const [user, setUser] = useState<IMe | null>(() => {
    const storedUser = localStorage.getItem("currentUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [provinces, setProvinces] = useState<IAddress[]>([]);
  const [districts, setDistricts] = useState<IAddress[]>([]);
  const [wards, setWard] = useState<IAddress[]>([]);

  const [orders, setOrders] = useState<IOrderAll | null>(null);

  const fetchOrders = async () => {
    const res = await apiGetAllOrder();
    setOrders(res.data);
  };

  const fetchForumPosts = async () => {
    try {
      const res = await apiGetListPost();
      setForumPosts(res.data);
    } catch (err: any) {
      if (err?.status === 401) {
        nav("/login");
      }
      toast.error("Failed to fetch data");
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await apiGetCategoryWithProduct();
      setCategories(response.data);
    } catch (err: any) {
      if (err?.status === 401) {
        nav("/login");
      }
      toast.error("Failed to fetch categories");
    }
  };

  const fetchProvinces = async () => {
    try {
      const response = await apiGetAllProvinces();
      setProvinces(response.data);
    } catch (err: any) {
      if (err?.status === 401) {
        nav("/login");
      }
      toast.error("Failed to fetch province");
    }
  };

  const fetchUser = async () => {
    try {
      const response = await apiGetCurrentUser();
      setUser(response.data);
      localStorage.setItem("currentUser", JSON.stringify(response.data));
    } catch (err: any) {
      if (err?.status === 401) {
        nav("/login");
      }
      toast.error("Failed to fetch user");
    }
  };

  const fetchAddressByParent = async (parent_id: number, level: string) => {
    try {
      const response = await apiGetAddresByParent(parent_id);
      if (level === "district") {
        setDistricts(response.data);
      } else {
        setWard(response.data);
      }
    } catch (err: any) {
      if (err?.status === 401) {
        nav("/login");
      }
      toast.error("Failed to fetch address");
    }
  };

  const fetchData = async (url: string) => {
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (err) {
      toast.error("Failed to fetch data");
    }
  };

  // Giữ nguyên logic useEffect, chỉ thêm điều kiện shouldFetchData
  useEffect(() => {
    if (shouldFetchData && forumPosts.length === 0) {
      fetchForumPosts();
    }
  }, [shouldFetchData, forumPosts.length]);

  useEffect(() => {
    if (shouldFetchData && categories.length === 0) {
      fetchCategories();
    }
  }, [shouldFetchData, categories.length]);

  useEffect(() => {
    if (shouldFetchData && !user) {
      fetchUser();
    }
  }, [shouldFetchData, user]);

  useEffect(() => {
    if (shouldFetchData) {
      fetchProvinces();
    }
  }, [shouldFetchData]);

  useEffect(() => {
    if (shouldFetchData) {
      fetchOrders();
    }
  }, [shouldFetchData]);

  return (
    <ApiContext.Provider
      value={{
        data,
        fetchData,
        fetchProvinces,
        provinces,
        districts,
        wards,
        fetchAddressByParent,
        user,
        fetchUser,
        categories,
        fetchCategories,
        fetchForumPosts,
        forumPosts,
        orders,
        fetchOrders,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApi must be used within an ApiProvider");
  }
  return context;
};
