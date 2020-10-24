import React, { PureComponent } from 'react';
import TableButton from './ProductsBidsTableButton'
import Modal from '../../../components/Modal'
import Label from '../../../components/Label'
import Button from '../../../components/Button'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { selectBid } from '../../../redux/actions/ProductActions'
import './styles.css'


const mapStateToProps = state => {
    return {
        token: state.authentication.credentials.token,
        user_id: state.authentication.credentials.id,
        products: state.products
    }
}

const mapDispatchToProps = (dispatch) => ({
    selectBid: (product_id, bid_id, token) => { dispatch(selectBid(product_id, bid_id, token))}
})

class ProductTableItem extends PureComponent {

    state = {
        select_modal: false,
    }

    _onSelectBid = (bid_id) => {
        this.props.selectBid(this.props.product_id, {bid_id}, this.props.token)
    }

    render() {
        const { data } = this.props
        console.log(this.props.product_status)
        return (
            <div className='product-seller-table__item'>
                <div className='item__name'>
                    {data.buyer}
                </div>
                <div className='item__amount'>
                    {data.amount}
                </div>
                <div className='item__actions'>
                    {this.props.product_status === 'OPEN' ? (
                        <Label>Selecting of Bid is not yet Available</Label>
                    ) : (
                    <TableButton label='[ Select Bid ]'
                        className='product-action-delete'
                        onClick={() => this.setState({select_modal: true})} 
                     />
                    )}
                </div>

                <Modal modalVisibility={this.state.select_modal} className='select-confirm-modal'>
                    <div className='select-confirm-modal-container'>
                        <div className='select-confirm-modal__body'>
                            <Label className='select-confirm-modal-label'>Are you sure you want to select this bid?</Label>
                        </div>
                        <div className='select-confirm-modal__footer'>
                            <Button
                                className='select-modal-no-btn'
                                label='No'
                                onClick={() => this.setState({ select_modal: false })}
                            />
                            <Button
                                className='select-modal-yes-btn'
                                label='Yes'
                                onClick={() => this._onSelectBid(data.id)}
                            />
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductTableItem))