import React from 'react';
import { useAppSelector } from '../../store/hooks';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';

const ProductDisplay = () => {
  const product = useAppSelector((state) => state.products.products[0]);

  if (!product) return <Typography>No product data available.</Typography>;

  return (
    <Card
      className="product-display"
      sx={{ p: 2, borderRadius: 3, boxShadow: 2, bgcolor: 'white', height: '100%' }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <img
          src={product.image}
          alt={product.title}
          style={{ maxWidth: '100%', borderRadius: 8 }}
        />
      </Box>

      <CardContent sx={{ textAlign: 'center' }}>
        <Typography variant="h6" fontWeight="bold">
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.subtitle}
        </Typography>
      </CardContent>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center', mt: 1 }}>
        {product.tags.map((tag: string, index: number) => (
          <Chip key={index} label={tag} sx={{ bgcolor: '#f4f4f4', fontSize: 12 }} />
        ))}
      </Box>
    </Card>
  );
};

export default ProductDisplay;
