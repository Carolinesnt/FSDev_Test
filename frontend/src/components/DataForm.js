import React, { useState } from 'react';
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Table } from "../components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";

const DataForm = ({ onSubmit, initialData, onCancel }) => {
  const [formData, setFormData] = useState(initialData || {
    productID: '',
    productName: '',
    amount: '',
    customerName: '',
    status: '0'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="productID">Product ID</Label>
        <Input
          id="productID"
          value={formData.productID}
          onChange={e => setFormData({...formData, productID: e.target.value})}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="productName">Product Name</Label>
        <Input
          id="productName"
          value={formData.productName}
          onChange={e => setFormData({...formData, productName: e.target.value})}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          type="number"
          value={formData.amount}
          onChange={e => setFormData({...formData, amount: e.target.value})}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="customerName">Customer Name</Label>
        <Input
          id="customerName"
          value={formData.customerName}
          onChange={e => setFormData({...formData, customerName: e.target.value})}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select
          value={formData.status.toString()}
          onValueChange={value => setFormData({...formData, status: parseInt(value)})}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">SUCCESS</SelectItem>
            <SelectItem value="1">FAILED</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex gap-4">
        <Button type="submit">{initialData ? 'Update' : 'Create'}</Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default DataForm;