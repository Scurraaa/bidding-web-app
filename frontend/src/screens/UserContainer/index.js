import React, { PureComponent } from 'react'
import Label from '../../components/Label'
import './styles.css'

class UserInfo extends PureComponent {

    state = {
        user_type: 'buyer'
    }

    render() {
        return this.state.user_type === 'buyeasdr' || false ? (
            <div className='user-info-container'>
                <div className='top-section-user-info'>
                    <h2 className='content-title'> USER INFO </h2>
                </div>
                <div className='main-section-user-info'>
                    <div className='main-section-user-info__inline-1'>
                        <Label className='user-info'>Name: John Doe</Label>
                        <Label className='user-info'>Bid Credits Remaining: 45000</Label>
                        <Label className='user-info'>Commited Bids: 5000</Label>
                    </div>
                    <div className='main-section-user-info__inline-2'>
                        <Label className='user-info'>Total Bids Spent: 4500</Label>
                        <Label className='user-info'>Total Bids Placed: 25</Label>
                        <Label className='user-info'>Total Winning Bids: 10</Label>
                    </div>
                </div>
            </div>
        ) : (
            <div className='user-info-container'>
                <div className='top-section-user-info'>
                    <h2 className='content-title'> USER INFO </h2>
                </div>
                <div className='main-section-user-info'>
                    <div className='main-section-user-info__inline-1'>
                        <Label className='user-info'>Name: John Doe</Label>
                        <Label className='user-info'>Product Bids: 25</Label>
                        <Label className='user-info'>Ongoing Product: 10</Label>
                    </div>
                    <div className='main-section-user-info__inline-2'>
                        <Label className='user-info'>Closed Product: 15</Label>
                        <Label className='user-info'>Total Earnings: 25000</Label>
                        <Label className='user-info'>Potential Earnings: 10000</Label>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserInfo