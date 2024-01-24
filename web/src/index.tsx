import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import Routes from 'routes';

import 'assets/styles/tailwind.css';

const root = createRoot(document.getElementById('root')!);

root.render(
  <BrowserRouter>
    <Routes />
  </BrowserRouter>
);
