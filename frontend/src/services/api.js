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

export const getMejaOwner = async () => {
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

export const updateDetailTransaksi = async (id, detail_transaksis) => {
  return axios.put(`http://localhost:5000/api/transaksi/${id}/detail`, { detail_transaksis });
};

export const getTransaksiSudahBayar = async () => {
  const res = await axios.get(`${API_URL}/transaksi/sudah-bayar`);
  return res.data;
};

// export const getStatistikKasir = async () => {
//   const res = await axios.get(`${API_URL}/transaksi/statistik`);
//   return res.data;
// };

export const getStatistikKasir = async (id) => {
  const res = await fetch(`http://localhost:5000/api/transaksi/statistik`);
  if (!res.ok) throw new Error('Gagal mengambil transaksi');
  return res.json();
};

export const getStatistikOwner = async (id) => {
  const res = await fetch(`http://localhost:5000/api/transaksi/statistik`);
  if (!res.ok) throw new Error('Gagal mengambil transaksi');
  return res.json();
};

export const updateStatusMenu = async (id, status) => {
  return axios.put(`${API_URL}/menu/${id}`, { status_menu: status });
};

export const updateStatusPesanan = async (id) => {
  const res = await axios.patch(`${API_URL}/transaksi/${id}/selesai`);
  return res.data;
};

export const getTransaksiPending = async () => {
  const res = await axios.get(`${API_URL}/transaksi/pending`);
  return res.data;
};

export const getAllMenu = async () => {
  const res = await axios.get(`${API_URL}/menu`);
  return res.data;
};

export const CreateMenu = async (data) => {
  const res = await axios.post(`${API_URL}/menu`, data);
  return res.data;
};

export const UpdateMenu = async (id, data) => {
  const res = await axios.put(`${API_URL}/menu/${id}`, data);
  return res.data;
};

export const DeleteMenu = async (id) => {
  const res = await axios.delete(`${API_URL}/menu/${id}`);
  return res.data;
};
