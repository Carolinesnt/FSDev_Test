import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Button } from "../components/ui/button";
import { Edit2, Eye } from 'lucide-react';

const DataTable = ({ groupedData, onEdit, onView }) => {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div className="space-y-4">
      {Object.keys(groupedData).sort().reverse().map(year => (
        <div key={year} className="space-y-2">
          <h2 className="text-xl font-bold">{year}</h2>
          {Object.keys(groupedData[year]).sort().reverse().map(month => (
            <div key={`${year}-${month}`} className="space-y-2">
              <h3 className="text-lg font-semibold">{monthNames[month]}</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product ID</TableHead>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Customer Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {groupedData[year][month].map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.productID}</TableCell>
                      <TableCell>{transaction.productName}</TableCell>
                      <TableCell>{transaction.amount}</TableCell>
                      <TableCell>{transaction.customerName}</TableCell>
                      <TableCell>{transaction.status === 0 ? 'SUCCESS' : 'FAILED'}</TableCell>
                      <TableCell className="space-x-2">
                        <Button variant="outline" size="icon" onClick={() => onEdit(transaction.id)}>
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => onView(transaction.id)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DataTable;