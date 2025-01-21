import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,

  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const token = localStorage.getItem("token");
      if(!token){
        set({authUser:null, isCheckingAuth:false});
      }


      const res = await axiosInstance.get("/auth/check", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("CheckAuth res.data : ", res.data);
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async(data)=>{
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      console.log("signup res.data : ", res.data);
      set({ authUser: res.data });
      console.log("toast.success Account created successfully");
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred in toast.error");
    } finally {
      set({ isSigningUp: false });
    }
  },
  logout: async()=>{
    try {
      await axiosInstance.post("/auth/logout");
      set({authUser: null});
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  }
}));
