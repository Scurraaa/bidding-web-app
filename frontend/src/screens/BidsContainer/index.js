import React, { PureComponent } from 'react'
import Label from '../../components/Label'
import Dropdown from '../../components/DropDown'
import Button from '../../components/Button'
import BidTableItem from './BidsTable/BidsTableItem'
import { SAMPLE_BID_TABLE_ITEM, BID_STATUS_CHOICES } from '../../utils/constant'
import './styles.css'

class BidContainer extends PureComponent {

    state = {
        bid_status: ''
    }

    _renderBidTableItem = (data, index) => (
        <BidTableItem
            key={index}
            data={data}
        />
    )

    onChangeValueSelect = (name, value) => {
        this.setState({
            [name]: value.value
        })
    }

    render() {
        return (
            <div className='bid-container'>
                <div className='top-section-bid'>
                    <h2 className='content-title'>MY BIDS</h2>
                </div>
                <div className='mid-section-bid'>
                    <Label className='bid-search-status'>Search Bid Status: </Label>
                    <Dropdown
                        options={BID_STATUS_CHOICES}
                        className='bid-search-status-dropdown'
                        placeholder='Choose a Bid Status'
                        value={this.state.bid_status}
                        onChange={this.onChangeValueSelect}
                        name='bid_status'
                    />

                    <Button
                        className='search-btn'
                        label='Go'
                        onClick={() => console.log('hello')}                    
                    />
                </div>
                <div className='table-section-bid'>
                    <div className='table-section-bid__header'>
                        <div className='table-section-bid__header-product'>
                            <Label className='table-bid-product'>PRODUCT</Label>
                        </div>
                        <div className='table-section-bid__header-amount'>
                            <Label className='table-bid-product'>AMOUNT</Label>
                        </div>
                        <div className='table-section-bid__header-status'>
                            <Label className='table-bid-status'>STATUS</Label>
                        </div>
                    </div>
                    <div className='table-section-bid__body'>
                        {SAMPLE_BID_TABLE_ITEM.length > 0 ? (
                            SAMPLE_BID_TABLE_ITEM.map(this._renderBidTableItem)
                        ) : (
                        <div className='bid-table-not-found-data'> 
                            <h2 className='bid-table-not-found-label'> No Data Found </h2>
                        </div>
                        )}  
                    </div>
                </div>
            </div>
        )
    }
}

export default BidContainer