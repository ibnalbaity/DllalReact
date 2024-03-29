import { createRoot } from 'react-dom/client';

// third party
import 'moment/locale/ar';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

// project imports
import App from 'App';
import { BASE_PATH } from 'config';
import { store } from 'store';
import * as serviceWorker from 'serviceWorker';
import reportWebVitals from 'reportWebVitals';
import { ConfigProvider } from 'contexts/ConfigContext';

// style + assets
import 'assets/scss/style.scss';
import 'photoswipe/dist/photoswipe.css';

// ==============================|| REACT DOM RENDER  ||============================== //

/* Sentry.init({
    dsn: 'https://502ba6ea99ec4cfeb45836caa2d3e791@o1074883.ingest.sentry.io/4504277252702208',
    integrations: [new BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0
});

Sentry.init({
    dsn: 'https://502ba6ea99ec4cfeb45836caa2d3e791@o1074883.ingest.sentry.io/4504277252702208',

    // This sets the sample rate to be 10%. You may want this to be 100% while
    // in development and sample at a lower rate in production
    replaysSessionSampleRate: 0.1,
    // If the entire session is not sampled, use the below sample rate to sample
    // sessions when an error occurs.
    replaysOnErrorSampleRate: 1.0,

    integrations: [new Sentry.Replay()]
}); */

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    <Provider store={store}>
        <ConfigProvider>
            <BrowserRouter basename={BASE_PATH}>
                <App />
            </BrowserRouter>
        </ConfigProvider>
    </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
