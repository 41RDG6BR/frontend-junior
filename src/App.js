import 'react-perfect-scrollbar/dist/css/styles.css';
import React, { useContext } from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import { Context } from 'src/context/AuthContext';

const App = () => {
  const { signed, loading } = useContext(Context);
  const routing = useRoutes(routes(signed));

  if (loading) {
    return (
      <>Loading</>
    );
  }
  console.log(signed);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
};

export default App;
