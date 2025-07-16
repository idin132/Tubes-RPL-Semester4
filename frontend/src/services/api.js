import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getMenus = async () => {
  const res = await axios.get(`${API_URL}/menu`);
  return res.data;
};



export const createMenu = async (data) => {
  return axios.post(`${API_URL}/menu`, data);
};

export const updateMenu = async (id, data) => {
  return axios.put(`${API_URL}/menu/${id}`, data);
};

export const deleteMenu = async (id) => {
  return axios.delete(`${API_URL}/menu/${id}`);
};

export const getMeja = async () => {
  const res = await axios.get(`${API_URL}/meja`);
  return res.data;
};

export const updateStatusMeja = async (id, status) => {
  return axios.put(`${API_URL}/meja/${id}`, { status_meja: status });
};

export const createTransaksi = async (data) => {
  return axios.post('http://localhost:5000/api/transaksi', data);
};

export const getTransaksiBelumBayar = async () => {
  const res = await axios.get(`${API_URL}/transaksi/belum-bayar`);
  return res.data;
};

export const batalkanTransaksi = async (id) => {
  return await axios.put(`${API_URL}/transaksi/${id}/batalkan`);
};

export const getTransaksiById = async (id) => {
  const res = await fetch(`http://localhost:5000/api/transaksi/${id}`);
  if (!res.ok) throw new Error('Gagal mengambil transaksi');
  return res.json();
};

export const updatePembayaranTransaksi = async (id, data) => {
  return axios.put(`http://localhost:5000/api/transaksi/${id}`, data);
};

