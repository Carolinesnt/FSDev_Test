import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader} from "../components/ui/card";
import { CardTitle } from '../components/ui/card';
import { api } from '../services/api';
import DataForm from '../components/DataForm';  // Hapus kurung kurawal

const EditData = () => {
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

    const handleSubmit = async (formData) => {
        try {
            await api.updateTransaction(id, formData);
            navigate('/');
        } catch (error) {
            console.error('Error updating transaction:', error);
        }
    };

    if (!transaction) return null;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Edit Transaction</CardTitle>
            </CardHeader>
            <CardContent>
                <DataForm
                    initialData={transaction}
                    onSubmit={handleSubmit}
                    onCancel={() => navigate('/')}
                />
            </CardContent>
        </Card>
    );
};

export default EditData;  // Ubah menjadi export default