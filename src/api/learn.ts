import axiosInstance from "../lib/axiosInstance"
import { toast } from "react-toastify"

export const getAllLesson = async (userId: string) => {
    const res = await axiosInstance.get("/api/v1/learn/getAllLesson", { data: userId })
    toast.success("All lessons fetched successfully")
    return res.data

}

export const generatePath = async (topic: string, level: string) => {
    const res = await axiosInstance.post("/api/v1/learn/generate-path", { topic, level })
    toast.success("Path generated successfully")
    return res.data

}