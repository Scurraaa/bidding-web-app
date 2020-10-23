export const NAVIGATION_LINKS = [
    {
        id: 1,
        label: 'Product Bids',
        route: '/dashboard/products'
    },
    {
        id: 2,
        label: 'My Bids',
        route: '/dashboard/my-bids',
    },
    {
        id: 3,
        label: 'My Products',
        route: '/dashboard/my-products'
    },
    {
        id: 4,
        label: 'User Info',
        route: '/dashboard/user-info'
    },
]

export const BID_STATUS_CHOICES = [
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