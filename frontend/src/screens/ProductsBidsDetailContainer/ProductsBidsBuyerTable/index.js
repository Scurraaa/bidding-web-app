import React, { PureComponent } from 'react';
import TableButton from './ProductsBidsTableButton'
import Modal from '../../../components/Modal'
import Label from '../../../components/Label'
import Button from '../../../components/Button'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withdrawBid } from '../../../redux/actions/BidActions'
import './styles.css'


const mapStateToProps = state => {
    return {
        token: state.authentication.credentials.token,
        user_id: state.authentication.credentials.id,
        products: state.products
    }
}

const mapDispatchToProps = (dispatch) => ({
    withdrawBid: (bid_id, props, token) => { dispatch(withdrawBid(bid_id, props, token))}
})


class ProductTableItem extends PureComponent {

    state = {
        withdraw_modal: false,
    }

    _onDelete = (bid_id) => {
        this.props.withdrawBid(bid_id, this.props.history, this.props.token)
        this.setState({ withdraw_modal: false })
    }

    render() {
        const { data } = this.props
        return (
            <div className='product-buyer-table__item'>
                <div className='item__amount'>
                    {data.amount}
                </div>
                <div className='item__actions'>
                    <TableButton label='[ Withdraw Bid ]'
                        className='product-action-delete'
                        onClick={() => this.setState({withdraw_modal: true})} 
                     />
                </div>

                <Modal modalVisibility={this.state.withdraw_modal} className='withdraw-confirm-modal'>
                    <div className='withdraw-confirm-modal-container'>
                        <div className='withdraw-confirm-modal__body'>
                            <Label className='withdraw-confirm-modal-label'>Are you sure you want to withdraw this bid?</Label>
                        </div>
                        <div className='withdraw-confirm-modal__footer'>
                            <Button
                                className='withdraw-modal-no-btn'
                                label='No'
                                onClick={() => this.setState({ withdraw_modal: false })}
                            />
                            <Button
                                className='delete-modal-yes-btn'
                                label='Yes'
                                onClick={() => this._onDelete(data.id)}
                            />
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductTableItem))