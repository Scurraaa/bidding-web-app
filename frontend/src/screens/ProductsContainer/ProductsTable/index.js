import React, { PureComponent } from 'react';
import TableButton from './ProductsTableButton'
import Modal from '../../../components/Modal'
import Label from '../../../components/Label'
import Button from '../../../components/Button'
import TextInput from '../../../components/TextInput'
import FileUpload from '../../../components/FileUpload'
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import NumberInput from '../../../components/NumerInput'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { deleteProduct, editProduct } from '../../../redux/actions/ProductActions'
import './styles.css'
import moment from 'moment'

const yesterday = moment().subtract(1, 'day');
const disablePastDt = current => {
  return current.isAfter(yesterday);
};

const mapStateToProps = state => {
    return {
        token: state.authentication.credentials.token,
        user_id: state.authentication.credentials.id,
        products: state.products
    }
}

const mapDispatchToProps = (dispatch) => ({
    deleteProduct: (product_id, props, token) => { dispatch(deleteProduct(product_id, props, token)) },
    editProduct: (product_id, data, props, token) => { dispatch(editProduct(product_id, data, props, token))}
})

class ProductTableItem extends PureComponent {

    state = {
        id: '',
        delete_modal: false,
        form_modal: false,
        preview: '',
        raw: '',
        form:{
            name: '',
            description:'',
            expiry_date: '',
            minimum_bid: '',
            maximum_bid: '',
        }
    }

    componentDidUpdate() {
        const oldForm = {
            form: {
                name: '',
                description:'',
                expiry_date: '',
                minimum_bid: '',
                maximum_bid: '',
            }
        }
        let product
        if(this.props.products.products.results.filter(element => element.id === this.state.id).length) {
            product = this.props.products.products.results.filter(element => element.id === this.state.id)
        }
        if (JSON.stringify(oldForm.form) === JSON.stringify(this.state.form) && product) {
            this.setState({
                form: {
                    name: product[0].name,
                    description: product[0].description,
                    expiry_date: product[0].expiry_date,
                    maximum_bid: product[0].maximum_bid,
                    minimum_bid: product[0].minimum_bid
                },
                preview: product[0].image,
            })
        }
    }

    onChangeDateTime = (date) => {
        this.setState({
            form: {
                ...this.state.form,
                expiry_date: date
            }
        })
    }

    onChangeValue = (value, name) => {
        this.setState({
            form: {
                ...this.state.form,
                [name]: value
            }
        })
    }

    filehandleChange = e => {
        if(e.target.files.length) {
            this.setState({preview: URL.createObjectURL(e.target.files[0]), raw: e.target.files[0]})
        }
    }

    onChangeNumberValue = (value, name) => {
        this.setState({
            form: {
                ...this.state.form,
                [name]: parseInt(value) || 0
            }
        })
    }

    _onDelete = (product_id) => {
        this.props.deleteProduct(product_id, this.props.history, this.props.token)
        this.setState({delete_modal: false})
    }

    _onEdit = (product_id) => {
        const date_format = 'YYYY-MM-DD HH:mm:ss'
        const newDatetime = moment(this.state.form.expiry_date).format(date_format)
        const newForm = {
            name: this.state.form.name,
            user: this.props.user_id,
            description: this.state.form.description,
            minimum_bid: this.state.form.minimum_bid,
            maximum_bid: this.state.form.maximum_bid,
            expiry_date: newDatetime,
            image: this.state.raw
        }
        this.props.editProduct(product_id, {...newForm}, this.props.history, this.props.token)
    }

    render() {
        const { data } = this.props
        const { form } = this.state
        return (
            <div className='product-table__item'>
                <div className='item__name'>
                    {data.name}
                </div>
                <div className='item__description'>
                    {data.description}
                </div>
                <div className='item__status'>
                    {data.status}
                </div>
                <div className='item__expiry-date'>
                    {data.expiry_date}
                </div>
                <div className='item__actions'>
                    <TableButton label='[ Delete Product ]'
                        className='product-action-delete'
                        onClick={() => this.setState({delete_modal: true})} 
                     />

                    <TableButton label='[ Edit Product ]'
                        className='product-action-edit'
                        onClick={() => this.setState({id: data.id, form_modal: true})} 
                     />

                     <TableButton label='[ View ]'
                        className='product-action-view-product'
                        onClick={() => this.props.history.push('product-details?product_id='+data.id)}
                    />
                </div>

                <Modal modalVisibility={this.state.delete_modal} className='delete-confirm-modal'>
                    <div className='delete-confirm-modal-container'>
                        <div className='delete-confirm-modal__body'>
                            <Label className='delete-confirm-modal-label'>Are you sure you want to delete this?</Label>
                        </div>
                        <div className='delete-confirm-modal__footer'>
                            <Button
                                className='delete-modal-no-btn'
                                label='No'
                                onClick={() => this.setState({ delete_modal: false })}
                            />
                            <Button
                                className='delete-modal-yes-btn'
                                label='Yes'
                                onClick={() => this._onDelete(data.id)}
                            />
                        </div>
                    </div>
                </Modal>
                <Modal modalVisibility={this.state.form_modal} className='edit-product-modal'>
                    <div className='edit-product-modal-container'>
                        <div className='edit-product-modal__header'>
                            <Label className='edit-product-modal__header-title'>EDIT PRODUCT</Label>
                        </div>
                        <div className='edit-product-modal__body'>
                            <div className='edit-product-modal__body-inline-1'>
                                <div className='edit-product-modal__body-inline-1-name'>
                                    <Label className='product-name'>Product Name</Label>
                                    <TextInput 
                                        className='product-name-input'
                                        placeholder='Please Input the Product Name Here'
                                        onChange={this.onChangeValue}
                                        value={form.name}
                                        name='name'
                                    />
                                </div>
                                <div className='edit-product-modal__body-inline-1-expiry-date'>
                                    <Label className='product-expiry-date'>Expiry Date</Label>
                                        <Datetime
                                            value={form.expiry_date}
                                            onChange={this.onChangeDateTime}
                                            closeOnSelect={true}
                                            className='expiry-date-datetime'
                                            inputProps={{
                                                placeholder: 'Select Date Time'
                                            }}
                                            isValidDate={disablePastDt}
                                        />
                                </div>
                            </div>
                            <div className='edit-product-modal__body-inline-2'>
                                <div className='edit-product-modal__body-inline-2-minimum-bid'>
                                    <Label className='product-minimum-bid'>Minimum Bid</Label>
                                    <NumberInput 
                                        className='product-minimum-bid-input'
                                        placeholder='Please Input the Minimum Bid Here'
                                        onChange={this.onChangeNumberValue}
                                        value={form.minimum_bid}
                                        name='minimum_bid'
                                    />
                                </div>
                                <div className='edit-product-modal__body-inline-2-maximum-bid'>
                                    <Label className='product-maximum-bid'>Maximum Bid</Label>
                                    <NumberInput 
                                        className='product-maximum-bid-input'
                                        placeholder='Please Input the maximum-bid Here'
                                        onChange={this.onChangeNumberValue}
                                        value={form.maximum_bid}
                                        name='maximum_bid'
                                    />
                                </div>
                            </div>
                            <div className='edit-product-modal__body-inline-3'>
                                <Label className='product-description'>Description</Label>
                                <TextInput
                                    className='product-description-input'
                                    placeholder='Please Input the Product Description Here'
                                    onChange={this.onChangeValue}
                                    value={form.description}
                                    name='description'
                                />
                            </div>
                            <div className='edit-product-add-photo'>
                            <Label className='edit-modal-upload-image'>Product Image</Label>
                            <div className='file-upload-container'>
                                <FileUpload label='Upload Photo' onChange={this.filehandleChange}/>
                            </div>
                                <div className='edit-modal-upload-image-container'>
                                    {this.state.preview ? (
                                        <img src={this.state.preview} alt='preview-img' className='file-preview'/>
                                    ) : (
                                        null
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className='edit-product-modal__footer'>
                            <Button
                                className='edit-product-cancel-btn'
                                label='Cancel'
                                onClick={() => this.setState({form_modal: false})}
                            />
                            <Button
                                className='edit-product-save-btn'
                                label='Save'
                                onClick={() => this._onEdit(data.id)}
                            />
                        </div>
                    </div>
                </Modal>

            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ProductTableItem))