import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { api } from '../services/api'; // Pastikan API service sudah tersedia
import DataForm from '../components/DataForm';

const EditData = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    fetchTransaction();
  }, [id]);

  const fetchTransaction = async () => {
    try {
      const response = await api.getTransactionById(id); // Mendapatkan transaksi berdasarkan id
      setTransaction(response.data);
    } catch (error) {
      console.error('Error fetching transaction:', error);
      navigate('/'); // Navigasi kembali jika error
    }
  };

  const handleSubmit = async (formData) => {
    try {
      await api.updateTransaction(id, formData); // Mengupdate transaksi
      navigate('/'); // Navigasi kembali setelah berhasil
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };

  if (!transaction) return <div>Loading...</div>; // Tampilkan loading jika data belum tersedia

  return (
    <Card className="max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>Edit Transaction</CardTitle>
      </CardHeader>
      <CardContent>
        <DataForm 
          initialData={transaction} // Kirim data transaksi untuk diedit
          onSubmit={handleSubmit}
          onCancel={() => navigate('/')} // Aksi cancel untuk kembali ke halaman utama
        />
      </CardContent>
    </Card>
  );
};

export default EditData;
