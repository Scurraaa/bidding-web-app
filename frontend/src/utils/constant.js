export const NAVIGATION_LINKS_SELLER = [
    {
        label: 'PRODUCT BIDS',
        route: '/dashboard/products'
    },
    {
        label: 'MY PRODUCTS',
        route: '/dashboard/my-products'
    },
    {
        label: 'USER INFO',
        route: '/dashboard/user-info'
    },
]

export const NAVIGATION_LINKS_BUYER = [
    {
        label: 'PRODUCT BIDS',
        route: '/dashboard/products'
    },
    {
        label: 'MY BIDS',
        route: '/dashboard/my-bids'
    },
    {
        label: 'USER INFO',
        route: '/dashboard/user-info'
    },

]

export const BID_STATUS_CHOICES = [
    {
        label: 'ALL',
        value: 'ALL'
    },
    
    {
        label: 'SUCCESSFUL',
        value: 'SUCCESSFUL'
    },
    {
        label: 'UNSUCCESSFUL',
        value: 'UNSUCCESSFUL'
    },
    {
        label: 'WAITING',
        value: 'WAITING'
    }
]

export const PRODUCT_STATUS_CHOICES = [
    {
        label: 'OPEN',
        value: 'OPEN'
    },
    {
        label: 'CLOSED',
        value: 'CLOSED'
    }
]

export const SAMPLE_BID_TABLE_ITEM = [
    {
        product: 'Product A',
        amount: '5000',
        status: 'WAITING'
    },

    {
        product: 'Product A',
        amount: '5250',
        status: 'WAITING'
    },

    {
        product: 'Product A',
        amount: '6000',
        status: 'WAITING'
    }
]

export const SAMPLE_PRODUCT_TABLE_ITEM = [
    {
        name: 'Product A',
        description: 'Product A is A',
        expiry_date: '2020-10-23',
        status: 'OPEN'
    },
    {
        name: 'Product B',
        description: 'Product B is B',
        expiry_date: '2020-10-23',
        status: 'OPEN'
    },
    {
        name: 'Product B',
        description: 'Product B is B',
        expiry_date: '2020-10-23',
        status: 'OPEN'
    }
]

export const PRODUCT_CARD_SAMPLE = [
    {
        name: 'PRODUCT A',
        description: 'PRODUCT A IS A',
        image: require('../assets/images/loader.svg'),
        expiry_date: '2020-10-23'
    },

    {
        name: 'PRODUCT B',
        description: 'PRODUCT A IS B',
        image: require('../assets/images/loader.svg'),
        expiry_date: '2020-10-21'
    },

    {
        name: 'PRODUCT C',
        description: 'PRODUCT C IS C',
        image: require('../assets/images/loader.svg'),
        expiry_date: '2020-10-15'
    },

    {
        name: 'PRODUCT D',
        description: 'PRODUCT D IS D',
        image: require('../assets/images/loader.svg'),
        expiry_date: '2020-10-1'
    }
]