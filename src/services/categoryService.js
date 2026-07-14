import API from "./api";
import { getData } from "../storage/storage";

// Get Categories
export const getCategories = async () => {
  const response = await API.get("/category");

  console.log("Categories API Response:", response.data);

  return response.data;
};

// Add Category
export const addCategory = async (name) => {
  try {
    const token = await getData("token");

    const response = await API.post(
      "/category",
      { name },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete Category
export const deleteCategory = async (id) => {
  try {
    const token = await getData("token");

    const response = await API.delete(`/category/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

//update category
export const updateCategory = async (id, data) => {

  const response = await API.put(
    `/category/${id}`,
    data
  );

  return response.data;

};