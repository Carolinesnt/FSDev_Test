import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import DataForm from '../components/DataForm';
import { api } from '../services/api';

const AddData = () => {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      await api.createTransaction(formData);
      navigate('/');
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>Add New Transaction</CardTitle>
      </CardHeader>
      <CardContent>
        <DataForm onSubmit={handleSubmit} onCancel={() => navigate('/')} />
      </CardContent>
    </Card>
  );
};

export default AddData;