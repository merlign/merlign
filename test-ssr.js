
import React from 'react';
import { renderToString } from 'react-dom/server';
import Home from '../src/pages/Home.jsx';

try {
    const html = renderToString(React.createElement(Home));
    console.log('RENDER SUCCESS');
    console.log(html.substring(0, 500));
} catch (err) {
    console.error('RENDER FAILED:', err);
}
