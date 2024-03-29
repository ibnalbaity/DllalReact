import LAYOUT_CONST from 'constant';

export const JWT_API = {
    secret: 'SECRET-KEY',
    timeout: '1 days'
};

export const FIREBASE_API = {
    apiKey: 'AIzaSyCiQCjk5jSx2OY4QTM7xWbKdoaGCBgLCfA',
    authDomain: 'dllal-ibn.firebaseapp.com',
    projectId: 'dllal-ibn',
    storageBucket: 'dllal-ibn.appspot.com',
    messagingSenderId: '916200765788',
    appId: '1:916200765788:web:0b6ef7675d63ef72ca6999',
    measurementId: 'G-W3G4QS2631'
};

export const AUTH0_API = {
    client_id: '7T4IlWis4DKHSbG8JAye4Ipk0rvXkH9V',
    domain: 'dev-w0-vxep3.us.auth0.com'
};

export const AWS_API = {
    poolId: 'us-east-1_AOfOTXLvD',
    appClientId: '3eau2osduslvb7vks3vsh9t7b0'
};

// basename: only at build time to set, and Don't dllal '/' at end off BASENAME for breadcrumbs, also Don't put only '/' use blank('') instead,
// like '/berry-material-react/react/default'
// export const BASE_URL = 'https://apis.dllal.net';
export const BASE_URL = 'http://localhost:1337';

export const BASE_SITE = 'https://dllal.net';

export const BASE_PATH = '';

export const DASHBOARD_PATH = '/home';

export const HORIZONTAL_MAX_ITEM = 6;

const config = {
    layout: LAYOUT_CONST.VERTICAL_LAYOUT, // vertical, horizontal
    drawerType: LAYOUT_CONST.MINI_DRAWER, // default, mini-drawer
    fontFamily: `'Roboto', sans-serif`,
    borderRadius: 8,
    outlinedFilled: true,
    navType: 'light', // light, dark
    presetColor: 'theme3', // default, theme1, theme2, theme3, theme4, theme5, theme6
    locale: 'en', // 'en' - English, 'fr' - French, 'ro' - Romanian, 'zh' - Chinese
    rtlLayout: true,
    container: false
};

export default config;
