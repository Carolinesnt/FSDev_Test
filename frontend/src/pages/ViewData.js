import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader} from "../components/ui/card";
import { CardTitle } from '../components/ui/card';
import { api } from '../services/api';
import { Button } from "../components/ui/button";

export const ViewData = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    fetchTransaction();
  }, [id]);

  const fetchTransaction = async () => {
    try {
      const response = await api.getTransactionById(id);
      setTransaction(response.data);
    } catch (error) {
      console.error('Error fetching transaction:', error);
      navigate('/');
    }
  };

  if (!transaction) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>View Transaction</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">Product ID</h3>
            <p>{transaction.productID}</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Product Name</h3>
            <p>{transaction.productName}</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Amount</h3>
            <p>{transaction.amount}</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Customer Name</h3>
            <p>{transaction.customerName}</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Status</h3>
            <p>{transaction.status === 0 ? 'SUCCESS' : 'FAILED'}</p>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <Button onClick={() => navigate('/')}>Back</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ViewData;
