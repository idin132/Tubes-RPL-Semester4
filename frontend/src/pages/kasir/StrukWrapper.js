import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTransaksiById } from '../../services/api';
import StrukTransaksi from '../../components/StrukTransaksi';

const StrukWrapper = () => {
  const { id } = useParams();
  const [transaksi, setTransaksi] = useState(null);

  useEffect(() => {
    getTransaksiById(id).then(setTransaksi);
  }, [id]);

  return transaksi ? <StrukTransaksi transaksi={transaksi} /> : <p>Loading...</p>;
};

export default StrukWrapper;
