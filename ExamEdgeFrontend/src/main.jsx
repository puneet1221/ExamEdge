import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

import { AppProvider } from './Components/AppContext/AppContext.jsx';

createRoot(document.getElementById('root')).render(
 <AppProvider><App></App></AppProvider>
  
);
