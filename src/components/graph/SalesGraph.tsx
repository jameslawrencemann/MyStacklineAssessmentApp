import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import { useAppSelector } from '../../store/hooks';
import dayjs from 'dayjs';
import { Sale } from '../../models/models';

const SalesGraph = () => {
  const sales = useAppSelector((state) => state.products.products[0]?.sales) || [];

  let lastMonth: string | null = null;
  const formattedSales = sales.map((sale: Sale) => {
    const month = dayjs(sale.weekEnding).format('MMM');

    if (month !== lastMonth) {
      lastMonth = month;
      return { ...sale, monthLabel: month };
    }

    return { ...sale, monthLabel: '' };
  });

  return (
    <div className="sales-graph" style={{ background: 'white', borderRadius: 8, padding: 16 }}>
      <h3 style={{ marginBottom: 16, textAlign: 'left', fontWeight: 'bold', fontSize: '1.2rem' }}>
        Retail Sales
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={formattedSales}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="monthLabel" tick={{ fontSize: 12 }} interval={0} />

          <YAxis hide={true} />

          <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />

          <Line
            type="monotone"
            dataKey="retailSales"
            stroke="#4285F4"
            strokeWidth={2}
            dot={{ r: 2 }}
          />
          <Line
            type="monotone"
            dataKey="wholesaleSales"
            stroke="#9E9E9E"
            strokeWidth={2}
            dot={{ r: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesGraph;
