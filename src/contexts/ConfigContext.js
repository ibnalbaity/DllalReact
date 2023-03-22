import PropTypes from 'prop-types';
import { createContext } from 'react';

// project import
import defaultConfig from 'config';
import useLocalStorage from 'hooks/useLocalStorage';

// initial state
const initialState = {
    ...defaultConfig,
    onChangeLayout: () => {},
    onChangeDrawer: () => {},
    onChangeMenuType: () => {},
    onChangePresetColor: () => {},
    onChangeLocale: () => {},
    onChangeRTL: () => {},
    onChangeContainer: () => {},
    onChangeFontFamily: () => {},
    onChangeBorderRadius: () => {},
    onChangeOutlinedField: () => {},
    onChangeCategory: () => {},
    onChangeCity: () => {}
};

// ==============================|| CONFIG CONTEXT & PROVIDER ||============================== //

const ConfigContext = createContext(initialState);

function ConfigProvider({ children }) {
    const [config, setConfig] = useLocalStorage('berry-config', {
        layout: initialState.layout,
        drawerType: initialState.drawerType,
        fontFamily: initialState.fontFamily,
        borderRadius: initialState.borderRadius,
        outlinedFilled: initialState.outlinedFilled,
        navType: initialState.navType,
        presetColor: initialState.presetColor,
        locale: initialState.locale,
        rtlLayout: initialState.rtlLayout,
        category: initialState.category,
        city: initialState.city
    });

    const onChangeLayout = (layout) => {
        setConfig({
            ...config,
            layout
        });
    };

    const onChangeDrawer = (drawerType) => {
        setConfig({
            ...config,
            drawerType
        });
    };

    const onChangeMenuType = (navType) => {
        setConfig({
            ...config,
            navType
        });
    };

    const onChangePresetColor = (presetColor) => {
        setConfig({
            ...config,
            presetColor
        });
    };

    const onChangeLocale = (locale) => {
        setConfig({
            ...config,
            locale
        });
    };

    const onChangeRTL = (rtlLayout) => {
        setConfig({
            ...config,
            rtlLayout
        });
    };

    const onChangeContainer = () => {
        setConfig({
            ...config,
            container: !config.container
        });
    };

    const onChangeFontFamily = (fontFamily) => {
        setConfig({
            ...config,
            fontFamily
        });
    };

    const onChangeBorderRadius = (event, newValue) => {
        setConfig({
            ...config,
            borderRadius: newValue
        });
    };

    const onChangeOutlinedField = (outlinedFilled) => {
        setConfig({
            ...config,
            outlinedFilled
        });
    };

    const onChangeCategory = (category) => {
        setConfig({
            ...config,
            category
        });
    };

    const onChangeCity = (city) => {
        setConfig({
            ...config,
            city
        });
    };

    return (
        <ConfigContext.Provider
            value={{
                ...config,
                onChangeLayout,
                onChangeDrawer,
                onChangeMenuType,
                onChangePresetColor,
                onChangeLocale,
                onChangeRTL,
                onChangeContainer,
                onChangeFontFamily,
                onChangeBorderRadius,
                onChangeOutlinedField,
                onChangeCategory,
                onChangeCity
            }}
        >
            {children}
        </ConfigContext.Provider>
    );
}

ConfigProvider.propTypes = {
    children: PropTypes.node
};

export { ConfigProvider, ConfigContext };
