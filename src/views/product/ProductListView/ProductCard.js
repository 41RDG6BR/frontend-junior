import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { Delete, Edit } from 'react-feather';
import { remove as deleteProduct } from '../../../services/ProductsServer';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  }
}));

const ProductCard = ({
  className,
  product,
  loadProducts,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Box p={2}>
          <Grid
            container
            justify="space-between"
            spacing={2}
          >
            <Grid
              className={classes.statsItem}
              item
            >
              <RouterLink to={`/app/product/${product.id}`}>
                <Edit />
              </RouterLink>
            </Grid>
            <Grid
              className={classes.statsItem}
              item
            >
              <Typography
                color="textSecondary"
                display="inline"
                variant="body2"
              >
                <Delete
                  onClick={(e) => {
                    deleteProduct(product.id).then(() => {
                      loadProducts();
                    });
                    e.preventDefault();
                    return false;
                  }}
                />
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          mb={3}
        >
          <Avatar
            style={{ height: '200px', width: '200px' }}
            alt="Product"
            src={product.image}
            variant="square"
          />
        </Box>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
          {product.name}
        </Typography>
        <Typography
          align="center"
          color="textPrimary"
          variant="body1"
        >
          {product.description}
        </Typography>
      </CardContent>
      <Box flexGrow={1} />
      <Divider />
      <Box p={2}>
        <Grid
          container
          justify="space-between"
          spacing={2}
        >
          <Grid
            className={classes.statsItem}
            item
          >
            <Typography
              color="textSecondary"
              display="inline"
              variant="body2"
            >
              R$
              {' '}
              {product.price}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

ProductCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired,
  loadProducts: PropTypes.func.isRequired
};

export default ProductCard;
