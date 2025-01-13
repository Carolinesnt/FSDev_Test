import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Plus } from 'lucide-react';
import DataTable from '../components/DataTable';
import { api } from '../services/api';

const Home = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [groupedData, setGroupedData] = useState({});

  const groupDataByDate = (data) => {
    return data.reduce((acc, transaction) => {
      const date = new Date(transaction.transactionDate);
      const year = date.getFullYear();
      const month = date.getMonth();
  
      if (!acc[year]) {
        acc[year] = {};
      }
      if (!acc[year][month]) {
        acc[year][month] = [];
      }
      acc[year][month].push(transaction);
      return acc;
    }, {});
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await api.getAllTransactions();
      setTransactions(response.data);
      setGroupedData(groupDataByDate(response.data));
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Transactions</CardTitle>
        <Button onClick={() => navigate('/add')} className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add New
        </Button>
      </CardHeader>
      <CardContent>
        <DataTable 
          groupedData={groupedData}
          onEdit={(id) => navigate(`/edit/${id}`)}
          onView={(id) => navigate(`/view/${id}`)}
        />
      </CardContent>
    </Card>
  );
};

export default Home;