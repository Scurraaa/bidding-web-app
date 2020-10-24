import React, { PureComponent } from 'react';
import './styles.css'

class BidsTableItem extends PureComponent {
    render() {
        const { data } = this.props
        return (
            <div className='bid-table__item'>
                <div className='item__product'>
                    {data.product}
                </div>
                <div className='item__amount'>
                    {data.amount}
                </div>
                <div className='item__status'>
                    {data.status}
                </div>
            </div>
        )
    }
}

export default BidsTableItem