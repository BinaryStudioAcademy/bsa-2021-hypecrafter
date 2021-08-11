import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { env } from './env';
import './services/i18n';
import './styles/index.scss';

Sentry.init({
  dsn: env.sentry.dsn,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
