import React, { PureComponent } from 'react';
import TableButton from './ProductsTableButton'
import Modal from '../../../components/Modal'
import Label from '../../../components/Label'
import Button from '../../../components/Button'
import TextInput from '../../../components/TextInput'
import FileUpload from '../../../components/FileUpload'
import './styles.css'

class ProductTableItem extends PureComponent {

    state = {
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

    onChangeValue = (name, value) => {
        this.setState({
            ...this.state.form,
            [name]: value
        })
    }

    filehandleChange = e => {
        if(e.target.files.length) {
            this.setState({preview: URL.createObjectURL(e.target.files[0]), raw: e.target.files[0]})
        }
    }

    onChangeNumberValue = (name, value) => {
        this.setState({
            ...this.state.form,
            [name]: parseInt(value) || 0
        })
    }

    render() {
        const { data } = this.props
        const {form } = this.state
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
                        className='product-action-view-payment'
                        onClick={() => this.setState({form_modal: true})} 
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
                                onClick={() => console.log('here')}
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
                                    <TextInput 
                                        className='product-expiry-date-input'
                                        placeholder='Please Input the Expiry Date Here'
                                        onChange={this.onChangeValue}
                                        value={form.expiry_date}
                                        name='expiry_date'
                                    />
                                </div>
                            </div>
                            <div className='edit-product-modal__body-inline-2'>
                                <div className='edit-product-modal__body-inline-2-minimum-bid'>
                                    <Label className='product-minimum-bid'>Minimum Bid</Label>
                                    <TextInput 
                                        className='product-minimum-bid-input'
                                        placeholder='Please Input the Minimum Bid Here'
                                        onChange={this.onChangeValue}
                                        value={form.minimum_bid}
                                        name='minimum_bid'
                                    />
                                </div>
                                <div className='edit-product-modal__body-inline-2-maximum-bid'>
                                    <Label className='product-maximum-bid'>Maximum Bid</Label>
                                    <TextInput 
                                        className='product-maximum-bid-input'
                                        placeholder='Please Input the maximum-bid Here'
                                        onChange={this.onChangeValue}
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
                                onClick={() => this.setState({form_modal: false})}
                            />
                        </div>
                    </div>
                </Modal>

            </div>
        )
    }
}

export default ProductTableItem