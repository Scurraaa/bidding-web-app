import React, { PureComponent } from 'react'
import Label from '../../components/Label'
import Dropdown from '../../components/DropDown'
import Button from '../../components/Button'
import BidTableItem from './BidsTable/BidsTableItem'
import PageLoading from '../../components/PageLoading'
import Disconnected from '../../components/Disconnected'
import { connect } from 'react-redux'
import { getBids } from '../../redux/actions/BidActions'
import { BID_STATUS_CHOICES } from '../../utils/constant'
import './styles.css'

const mapStateToProps = state => {
    return {
        token: state.authentication.credentials.token,
        user_id: state.authentication.credentials.id,
        bids: state.bids
    }
}

const mapDispatchToProps = (dispatch) => ({
    getBids: (user_id, bid_status, token) => { dispatch(getBids(user_id, bid_status, token)) }
})

class BidContainer extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            bid_status: ''
        }
    }

    componentDidMount() {
        this.props.getBids(this.props.user_id, null, this.props.token)
    }

    _renderBidTableItem = (data, index) => (
        <BidTableItem
            key={index}
            data={data}
        />
    )

    onChangeValueSelect = (value, name) => {
        this.setState({
            [name]: value.value
        })
    }

    _onSearch = () => {
        if(this.state.bid_status === 'ALL') {
            this.props.getBids(this.props.user_id, null, this.props.token)
        } else {
            this.props.getBids(this.props.user_id, this.state.bid_status, this.props.token)
        }
    }

    render() {
        return this.props.bids.isLoading ? (
            <PageLoading/>
        ) :this.props.bids.errMess === 'HTTP status: 500' ? (
            <Disconnected/>
        ) : (
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
                        onClick={this._onSearch}                    
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
                        {this.props.bids.bids.count > 0 ? (
                            this.props.bids.bids.results.map(this._renderBidTableItem)
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

export default connect(mapStateToProps, mapDispatchToProps)(BidContainer)