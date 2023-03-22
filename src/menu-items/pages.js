// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconLicense, IconSquarePlus } from '@tabler/icons';

// constant
const icons = { IconLicense, IconSquarePlus };

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
    id: 'pages',
    title: <FormattedMessage id="pages" />,
    caption: <FormattedMessage id="pages-caption" />,
    icon: icons.IconKey,
    type: 'group',
    children: [
        {
            id: 'add',
            title: <FormattedMessage id="add" />,
            type: 'item',
            url: '/add',
            icon: icons.IconSquarePlus,
            breadcrumbs: false
        },
        {
            id: 'terms',
            title: <FormattedMessage id="terms" />,
            type: 'item',
            url: '/terms',
            icon: icons.IconLicense,
            breadcrumbs: false
        }
    ]
};

export default pages;
