import { toast } from "react-toastify";
import axiosInstance from "../lib/axiosInstance";
import type { SignIn, SignUp } from "../types/auth";

export const registerUser = async (data: SignUp) => {
    const res = await axiosInstance.post('/api/v1/auth/register', data)
    toast.success("Account created successfully")
    return res.data

}

export const loginUser = async (data: SignIn) => {
    const res = await axiosInstance.post('/api/v1/auth/login', data)
    toast.success("Login successful")
    return res.data

}