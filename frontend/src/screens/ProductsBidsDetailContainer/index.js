import React, { PureComponent } from 'react'
import Button from '../../components/Button'
import Label from '../../components/Label'
import { withRouter } from 'react-router-dom'
import { getProduct, getProductBids } from '../../redux/actions/ProductActions'
import { postBid } from '../../redux/actions/BidActions'
import { connect } from 'react-redux'
import * as qs from 'query-string'
import './styles.css'
import PageLoading from '../../components/PageLoading'
import Disconnected from '../../components/Disconnected'
import BuyerTableItem from './ProductsBidsBuyerTable'
import SellerTableItem from './ProductsBidsSellerTable'
import NumberInput from '../../components/NumerInput'
import SuccessAlert from '../../components/Alerts/SuccessAlert'
import FailedAlert from '../../components/Alerts/FailedAlerts'
import Modal from '../../components/Modal'

const mapStateToProps = state => {
    return {
        authentication: state.authentication.credentials,
        token: state.authentication.credentials.token,
        user_id: state.authentication.credentials.id,
        bids: state.bids,
        products: state.products
    }
}

const mapDispatchToProps = (dispatch) => ({
    getProduct: (product_id, token) => { dispatch(getProduct(product_id, token))},
    getProductBids: (product_id, buyer_id, token) => { dispatch(getProductBids(product_id, buyer_id, token)) },
    postBid : (data, props, token) => { dispatch(postBid(data, props, token))}
})

class ProductBidDetails extends PureComponent {

    state = {
        preview: '',
        amount: '',
        winner: '',
        form: {
            name: '',
            description: '',
            minimum_bid: '',
            maximum_bid: '',
            status: '',
            expiry_date: ''
        }
    }
    componentDidMount() {
        const query_param = qs.parse(this.props.location.search)
        this.props.getProduct(query_param.product_id, this.props.token)
        if(this.props.products.product.user === this.props.user_id) {
            this.props.getProductBids(query_param.product_id, null, this.props.token)
        } else {
            this.props.getProductBids(query_param.product_id, this.props.user_id, this.props.token)
        }
    }
    componentDidUpdate() {
        console.log(this.props.products.product.data)
        const oldForm = {
            form: {
                name: '',
                description: '',
                minimum_bid: '',
                maximum_bid: '',
                status: '',
                expiry_date: ''
            }
        }
        if(JSON.stringify(oldForm.form) === JSON.stringify(this.state.form) && this.props.products.product.id) {
            this.setState({
                form: {
                    name: this.props.products.product.name,
                    description: this.props.products.product.description,
                    minimum_bid: this.props.products.product.minimum_bid.toString(),
                    maximum_bid: this.props.products.product.maximum_bid.toString(),
                    status: this.props.products.product.status,
                    expiry_date: new Date(this.props.products.product.expiry_date).toUTCString()
                },
                preview: this.props.products.product.image
            })
        }
    }

    _renderBuyerItemTable = (item) => (
        <BuyerTableItem data={item} product_id={this.props.products.product.id} />
    )

    _renderSellerItemTable = (item) => (
        <SellerTableItem data={item} product_id={this.props.products.product.id} product_status={this.props.products.product.status} />
    )

    _onAddBid = () => {
        this.props.postBid(
            {
                product: this.props.products.product.id,
                buyer: this.props.user_id,
                amount: this.state.amount
            },
            this.props.history,
            this.props.token
        )
        this.setState({bid_form: false})
    }

    render() {
        console.log(this.props.authentication.user_type)
        return this.props.products.isLoading ? (
            <PageLoading/>
        ) :this.props.products.errMess === 'HTTP status === 500' ? (
            <Disconnected />
        ) : (
            <div className='product-details-container'>
                {this.props.bids.succMess === 'HTTP DELETE status: 204' ? (
                    <SuccessAlert description='Withdraw Bid was Successful'/>
                ) :this.props.bids.errMess === 'HTTP DELETE status: 400' ? (
                    <FailedAlert description='Withdraw bid is no longer Applicable!'/>
                ) :this.props.bids.succMess === 'HTTP POST status: 201' ? (
                    <SuccessAlert description='Successfully Placed a Bid!'/>
                ) : (
                    null
                )}
                <div className='top-section-product-details'>
                    <h2 className='content-title'>{this.state.form.name}</h2>
                    {this.props.products.product.user !== this.props.user_id && this.props.authentication.user_type !== 'seller' ? (
                    <Button
                        className='place-bid-btn'
                        label='PLACE BID'
                        onClick={() => this.setState({bid_form: true})}
                    />
                    ) : (
                        null
                    )}
                </div>
                <div className='main-section-product-detail'>
                    <div className='main-section-product-details-container'>
                        <div className='main-section-product-details-image'>
                            <img src={this.state.preview} alt='product-preview' className='product-details-image' />
                        </div>
                        <div className='main-section-product-details-inline-1'>
                            <div className='main-section-product-details-inline-1-minimum-bid'>
                                <Label className='minimum-bid-label'>Minimum Bid: </Label>
                                <Label className='minimum-bid-value'> {this.state.form.minimum_bid} PHP</Label>
                            </div>
                            <div className='main-section-product-details-inline-1-maximum-bid'>
                                <Label className='maximum-bid-label'>Maximum Bid: </Label>
                                <Label className='maximum-bid-value'> {this.state.form.maximum_bid} PHP</Label>
                            </div>
                        </div>

                        <div className='main-section-product-details-inline-2'>
                            <div className='main-section-product-details-inline-2-status'>
                                <Label className='product-status-label'>Product Status: </Label>
                                <Label className={`${this.state.form.status === 'OPEN' ? 'product-status-open' : 'product-status-closed'}`}>{this.state.form.status}</Label>
                            </div>
                            <div className='main-section-product-details-inline-2-date'>
                                <Label className='product-expiry-date-label'>Expiring In: </Label>
                                <Label className='product-expiry-date-value'>{this.state.form.expiry_date}</Label>
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.products.product.user === this.props.user_id ? (
                        <div className='product-all-bids'>
                            {this.props.products.product.winner ? (
                                <div className='winer-container'>
                                    <Label className='winner-label'>This Product already have a Winner</Label>
                                </div>
                            ) : (
                                <>
                                    <div className='all-bids'>
                                        <h2>ALL BIDS IN THIS PRODUCT</h2>
                                    </div>
                                    <div className='table-section-buyer-bids'>
                                        <div className='table-section-total-bids__header'>
                                            <div className='table-section-buyer-bids__header-name'>
                                                <Label className='buyer-name'>NAME</Label>
                                            </div>
                                            <div className='table-section-buyer-bids__header-amount'>
                                                <Label className='buyer-amount'>AMOUNT</Label>
                                            </div>
                                            <div className='table-section-buyer-bids__header-action'>
                                                <Label className='buyer-action'>ACTION</Label>
                                            </div>
                                        </div>
                                        <div className='table-section-buyer-bids__body'>
                                            {this.props.products.product_bids.count > 0 ? (
                                                this.props.products.product_bids.results.map(this._renderSellerItemTable)
                                            ) : (
                                            <div className='product-table-not-found-data'> 
                                                <h2 className='product-table-not-found-label'> No Data Found </h2>
                                            </div>
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    ) :this.props.products.product.user !== this.props.user_id && this.props.authentication.user_type !== 'seller' ? (
                        <div className='buyer-bids'>
                            <div className='buyer-bids-container'>
                                <h2>YOUR BIDS IN THIS PRODUCT</h2>
                            </div>
                            <div className='table-section-buyer-bids'>
                                <div className='table-section-buyer-bids__header'>
                                    <div className='table-section-buyer-bids__header-amount'>
                                        <Label className='buyer-amount'>AMOUNT</Label>
                                    </div>
                                    <div className='table-section-buyer-bids__header-action'>
                                        <Label className='buyer-action'>ACTION</Label>
                                    </div>
                                </div>
                                <div className='table-section-buyer-bids__body'>
                                    {this.props.products.product_bids.count > 0 ? (
                                        this.props.products.product_bids.results.map(this._renderBuyerItemTable)
                                    ) : (
                                    <div className='product-table-not-found-data'> 
                                        <h2 className='product-table-not-found-label'> No Data Found </h2>
                                    </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        null
                    )}

                <Modal modalVisibility={this.state.bid_form} className='bid-modal'>
                    <div className='bid-modal-container'>
                        <div className='bid-modal__header'>
                            <Label className='bid-modal-title'>PLACE A BID</Label>
                        </div>
                        <div className='bid-modal__body'>
                            <Label className='bid-modal-amount-label'>Amount:</Label>
                            <NumberInput
                                name='amount'
                                placeholder='Place your Desired Amount Here'
                                className='bid-amount-input'
                                value={this.state.amount}
                                onChange={(value) => this.setState({amount: value})}
                            />
                        </div>
                        <div className='bid-modal__footer'>
                            <Button
                                className='bid-cancel-btn'
                                onClick={() => this.setState({bid_form: false})}
                                label='Cancel'
                            />
                            <Button
                                className='bid-save-btn'
                                onClick={this._onAddBid}
                                label='Save'
                            />
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductBidDetails))