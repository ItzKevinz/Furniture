import axios from "axios";

const API_BASE = "http://localhost:4000";

// get produk
export const getProducts = async () => {
  const res = await axios.get(`${API_BASE}/api/products`);
  if (res.data && res.data.ok) {
    return res.data.data;
  }
  return [];
};

// tambah produk
export const addProduct = async (product, token) => {
  const res = await axios.post(
    `${API_BASE}/api/products`,
    product,
    {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token || "",
      },
    }
  );
  return res.data; 
};

// update produk
export const updateProduct = async (id_furniture, product, token) => {
  const res = await axios.put(
    `${API_BASE}/api/products/${encodeURIComponent(id_furniture)}`,
    product,
    {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token || "",
      },
    }
  );
  return res.data; 
};

// delete produk
export const deleteProduct = async (id_furniture, token) => {
  const res = await axios.delete(
    `${API_BASE}/api/products/${encodeURIComponent(id_furniture)}`,
    {
      headers: {
        "x-auth-token": token || "",
      },
    }
  );
  return res.data; 
};
