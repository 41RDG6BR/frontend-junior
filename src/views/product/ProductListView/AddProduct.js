import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import { save as saveProduct } from '../../../services/ProductsServer';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const AddProductView = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Page
      className={classes.root}
      title="Novo produto"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              name: 'Produto',
              price: '1',
              image: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
              ingredients: [{
                id: 0, name: 'leite', cost: 10, quantity: 10
              }]
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().max(255).required('Nome é obrigatório'),
              price: Yup.number().required('Preço é obrigatório'),
              image: Yup.string().url().required('Imagem é obrigatório'),
            })}
            onSubmit={(data, { setFieldError, setSubmitting }) => {
              saveProduct(0,
                data.image,
                data.ingredients,
                data.name,
                data.price).then((response) => {
                setSubmitting(false);
                // console.log('test', response.error);
                if (response.error) {
                  setFieldError('name', response.message);
                } else {
                  navigate('/app/products', { replace: true });
                }
              });
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Produto
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.name && errors.name)}
                  fullWidth
                  helperText={touched.name && errors.name}
                  label="Nome"
                  margin="normal"
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.name}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.price && errors.price)}
                  fullWidth
                  helperText={touched.price && errors.price}
                  label="Preço"
                  margin="normal"
                  name="price"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="number"
                  value={values.price}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.image && errors.image)}
                  fullWidth
                  helperText={touched.image && errors.image}
                  label="Imagem"
                  margin="normal"
                  name="image"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.image}
                  variant="outlined"
                />
                <Typography
                  color="textPrimary"
                  variant="h2"
                />
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Enviar
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default AddProductView;
