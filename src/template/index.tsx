import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '../components/App';
import '../fonts/fonts.scss';

const root = createRoot(document.getElementById('root') as Element);

root.render(<App />);
