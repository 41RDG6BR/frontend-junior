import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import Page from 'src/components/Page';
import { list as productList } from '../../../services/ProductsServer';
import Toolbar from './Toolbar';
import ProductCard from './ProductCard';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  productCard: {
    height: '100%'
  }
}));
const ProductList = () => {
  const classes = useStyles();
  const [products, setProducts] = useState({
    content: [], totalElements: 0, totalPages: 3, numberOfElements: 0
  });

  const loadProducts = async () => {
    const { data } = await productList();
    console.log(data, 'my content');
    setProducts(data);
  };
  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Page
      className={classes.root}
      title="Products"
    >
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Grid
            container
            spacing={3}
          >
            {products.content.map((product) => (
              <Grid
                item
                key={product.id}
                lg={4}
                md={6}
                xs={12}
              >
                <ProductCard
                  loadProducts={loadProducts}
                  className={classes.productCard}
                  product={product}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box
          mt={3}
          display="flex"
          justifyContent="center"
        >
          <Pagination
            color="primary"
            count={products.totalPages}
            size="small"
          />
        </Box>
      </Container>
    </Page>
  );
};

export default ProductList;
