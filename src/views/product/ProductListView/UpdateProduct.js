import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

const EditeProduct = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const params = useParams();
  console.log(params.id);

  return (
    <Page
      className={classes.root}
      title="Editar produto"
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
              name: '',
              price: '',
              image: '',
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().max(255).required('Nome é obrigatório'),
              price: Yup.number().required('Preço é obrigatório'),
              image: Yup.string().url().required('Imagem é obrigatório'),
            })}
            onSubmit={(data, { setFieldError, setSubmitting }) => {
              saveProduct(params.id, data.image, [{
                id: 0, name: 'test', cost: 10, quantity: 10
              }], data.name, data.price).then((response) => {
                setSubmitting(false);
                console.log('test', response.error);
                if (response.error) {
                  setFieldError('name', response.message);
                } else {
                  navigate('/app/dashboard', { replace: true });
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
                    Editar Produto
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
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Editar
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

export default EditeProduct;
