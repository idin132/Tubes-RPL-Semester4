import React, { useEffect, useState } from "react";
import SidebarOwner from "../../components/SidebarOwner";
import Topbar from "../../components/Topbar";
import DataTable from "react-data-table-component";
import "../../assets/owner.css";
import {
  getAllMenu,
  DeleteMenu,
  CreateMenu,
  UpdateMenu,
} from "../../services/api";

const OwnerMenuPage = () => {
  const [menuList, setMenuList] = useState([]);
  const [form, setForm] = useState({
    nama_menu: "",
    harga_menu: "",
    kategori: "",
    status_menu: "Tersedia",
    deskripsi: "",
  });
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getAllMenu();
    setMenuList(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await UpdateMenu(editId, form);
    } else {
      await CreateMenu(form);
    }
    setForm({
      nama_menu: "",
      harga_menu: "",
      kategori: "",
      status_menu: "Tersedia",
      deskripsi: "",
    });
    setEditId(null);
    setShowForm(false);
    fetchData();
  };

  const handleEdit = (menu) => {
    setForm(menu);
    setEditId(menu.id_menu);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus menu ini?")) {
      await DeleteMenu(id);
      fetchData();
    }
  };

  const filteredMenu = menuList.filter((m) => {
    const text = searchText.toLowerCase();
    return (
      m.nama_menu.toLowerCase().includes(text) ||
      m.kategori.toLowerCase().includes(text) ||
      m.status_menu.toLowerCase().includes(text) ||
      m.harga_menu.toString().includes(text) ||
      m.deskripsi.toLowerCase().includes(text)
    );
  });

  const columns = [
    {
      name: "Nama",
      selector: (row) => row.nama_menu,
      sortable: true,
    },
    {
      name: "Harga",
      selector: (row) => `Rp ${row.harga_menu.toLocaleString()}`,
      sortable: true,
    },
    {
      name: "Kategori",
      selector: (row) => row.kategori,
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) => (
        <span
          className={`badge ${
            row.status_menu === "Tersedia" ? "green" : "red"
          }`}
        >
          {row.status_menu}
        </span>
      ),
      sortable: true,
    },
    {
      name: "Deskripsi",
      selector: (row) => row.deskripsi,
      sortable: true,
    },
    {
      name: "Aksi",
      cell: (row) => (
        <>
          <button className="btn-edit" onClick={() => handleEdit(row)}>
            🖊️
          </button>
          <button
            className="btn-delete"
            onClick={() => handleDelete(row.id_menu)}
          >
            🗑️
          </button>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div className="owner-container">
      <SidebarOwner />
      <div className="owner-main">
        <Topbar />
        <h1>Daftar Menu</h1>

        <div className="menu-toolbar">
          <input
            type="text"
            placeholder="Cari menu..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button onClick={() => setShowForm(!showForm)}>
            {showForm ? "Tutup Form" : "Tambah Menu"}
          </button>
        </div>

        {showForm && (
          <form className="menu-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="nama_menu"
              placeholder="Nama Menu"
              value={form.nama_menu}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="harga_menu"
              placeholder="Harga"
              value={form.harga_menu}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="kategori"
              placeholder="Kategori"
              value={form.kategori}
              onChange={handleChange}
              required
            />
            <select
              name="status_menu"
              value={form.status_menu}
              onChange={handleChange}
            >
              <option value="Tersedia">Tersedia</option>
              <option value="Tidak Tersedia">Tidak Tersedia</option>
            </select>
            <textarea
              name="deskripsi"
              placeholder="Deskripsi"
              value={form.deskripsi}
              onChange={handleChange}
            />
            <button type="submit">{editId ? "Update" : "Tambah"}</button>
          </form>
        )}

        <DataTable
          columns={columns}
          data={filteredMenu}
          pagination
          highlightOnHover
          striped
          responsive
          persistTableHead
          noDataComponent="Tidak ada menu ditemukan."
        />
      </div>
    </div>
  );
};

export default OwnerMenuPage;
