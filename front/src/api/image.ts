import axiosInstance from "./axios";

const uploadImage = async (body: FormData) => {
  const { data } = await axiosInstance.post("/images", body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data.result;
};

export default uploadImage;
