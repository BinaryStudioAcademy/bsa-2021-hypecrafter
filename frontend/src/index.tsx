import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.scss';
import App from './components/App';
import './services/i18n';
import { env } from './env';

Sentry.init({
  dsn: env.sentry.dsn,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0
});
localStorage.setItem('ACCESS_TOKEN', 'aaaaaa');
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
