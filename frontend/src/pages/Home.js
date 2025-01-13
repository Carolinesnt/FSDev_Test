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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const groupDataByDate = (transactions) => {
    if (!Array.isArray(transactions)) {
      console.error('Transactions is not an array:', transactions);
      return {};
    }
    
    return transactions.reduce((acc, transaction) => {
      // Pastikan transactionDate ada, jika tidak gunakan createdAt atau tanggal hari ini
      const date = transaction.transactionDate 
        ? new Date(transaction.transactionDate)
        : new Date();
        
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
      setIsLoading(true);
      setError(null);
      const response = await api.getAllTransactions();
      
      // Periksa apakah response memiliki properti data dan data adalah array
      if (!response?.data?.data || !Array.isArray(response.data.data)) {
        throw new Error('Invalid response format');
      }

      const transactionsData = response.data.data;
      setTransactions(transactionsData);
      setGroupedData(groupDataByDate(transactionsData));
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setError(error.message || 'Failed to fetch transactions');
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    if (error) {
      return (
        <Card className="mt-4">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-red-500 mb-4">Error loading transactions: {error}</p>
              <Button onClick={fetchTransactions}>
                Retry
              </Button>
            </div>
          </CardContent>
        </Card>
      );
    }

    if (isLoading) {
      return (
        <Card className="mt-4">
          <CardContent className="pt-6">
            <div className="text-center">
              Loading transactions...
            </div>
          </CardContent>
        </Card>
      );
    }

    return (
      <DataTable 
        groupedData={groupedData}
        onEdit={(id) => navigate(`/edit/${id}`)}
        onView={(id) => navigate(`/view/${id}`)}
      />
    );
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Transactions</CardTitle>
        <Button 
          onClick={() => navigate('/add')} 
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> Add New
        </Button>
      </CardHeader>
      <CardContent>
        {renderContent()}
      </CardContent>
    </Card>
  );
};

export default Home;