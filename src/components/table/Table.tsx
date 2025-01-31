import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  Box,
} from '@mui/material';
import { useAppSelector } from '../../store/hooks';
import { Sale } from '../../models/models';

const SalesTable = () => {
  const sales = useAppSelector((state) => state.products.products[0]?.sales) || [];

  const [orderBy, setOrderBy] = useState<keyof Sale | null>(null);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const sortedSales = [...sales].sort((a, b) => {
    if (!orderBy) return 0;
    const valueA = a[orderBy];
    const valueB = b[orderBy];

    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return order === 'asc' ? valueA - valueB : valueB - valueA;
    }
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return order === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    }
    return 0;
  });

  const handleSort = (property: keyof Sale) => {
    const isAscending = orderBy === property && order === 'asc';
    setOrder(isAscending ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <Box className="sales-table" sx={{ width: '100%', borderRadius: 2, boxShadow: 2, mt: 5 }}>
      <TableContainer component={Paper} sx={{ height: '400px', overflowY: 'auto' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f4f4f4' }}>
              {[
                { id: 'weekEnding', label: 'Week Ending' },
                { id: 'retailSales', label: 'Retail Sales' },
                { id: 'wholesaleSales', label: 'Wholesale Sales' },
                { id: 'unitsSold', label: 'Units Sold' },
                { id: 'retailerMargin', label: 'Retailer Margin' },
              ].map((column) => (
                <TableCell key={column.id} onClick={() => handleSort(column.id as keyof Sale)}>
                  <TableSortLabel active={orderBy === column.id} direction={order}>
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedSales.map((sale, index) => (
              <TableRow key={index} hover>
                <TableCell>{sale.weekEnding}</TableCell>
                <TableCell>${sale.retailSales.toLocaleString()}</TableCell>
                <TableCell>${sale.wholesaleSales.toLocaleString()}</TableCell>
                <TableCell>{sale.unitsSold.toLocaleString()}</TableCell>
                <TableCell>${sale.retailerMargin.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SalesTable;
