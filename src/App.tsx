import React from 'react';
import Header from "./components/Header";
import Catalog from "./components/Catalog";

const App: React.FC = () => {
  return ( <React.Fragment>
        <Header/>
        <Catalog/>
      </React.Fragment>
  );
};

export default App;
