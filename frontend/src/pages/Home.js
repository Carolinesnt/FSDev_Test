// Home.js
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

  const groupDataByDate = (data) => {
    if (!Array.isArray(data)) {
      console.error('Data is not an array:', data);
      return {};
    }
    
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
      setIsLoading(true);
      setError(null);
      const response = await api.getAllTransactions();
      
      if (!response || !response.data) {
        throw new Error('Invalid response format');
      }

      setTransactions(response.data);
      setGroupedData(groupDataByDate(response.data));
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