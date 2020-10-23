import React, { PureComponent } from 'react'
import Button from '../../components/Button'
import Label from '../../components/Label'
import Dropdown from '../../components/DropDown'
import ProductTableItem from './ProductsTable'
import Modal from '../../components/Modal'
import TextInput from '../../components/TextInput'
import FileUpload from '../../components/FileUpload'
import { PRODUCT_STATUS_CHOICES, SAMPLE_PRODUCT_TABLE_ITEM } from '../../utils/constant'
import './styles.css'

class Products extends PureComponent {

    state = {
        product_status: '',
        form_modal: false,
        preview: '',
        raw: '',
        form: {
            name: '',
            description: '',
            minimum_bid: '',
            maximum_bid: '',
            expiry_date: '',
            photo: ''
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

    onChangeValueSelect = (name, value) => {
        this.setState({
            [name]: value.value
        })
    }

    _renderProductTableItem = (data, index) => (
        <ProductTableItem
            key={index}
            data={data}
        />
    )

    render() {
        const { form } = this.state
        return (
            <div className='products-container'>
                <div className='top-section-products'>
                    <h2 className='content-title'>MY PRODUCTS</h2>
                    <Button
                        className='add-product-btn'
                        label='ADD'
                        onClick={() => this.setState({form_modal: true})}
                    />
                </div>
                <div className='mid-section-products'>
                    <Label className='product-search-status'>Search Product Status: </Label>
                        <Dropdown
                            options={PRODUCT_STATUS_CHOICES}
                            className='product-search-status-dropdown'
                            placeholder='Choose a Product Status'
                            value={this.state.product_status}
                            onChange={this.onChangeValueSelect}
                            name='product_status'
                        />

                        <Button
                            className='search-btn'
                            label='Go'
                            onClick={() => console.log('hello')}                    
                        />
                </div>
                <div className='table-section-products'>
                    <div className='table-section-products__header'>
                        <div className='table-section-products_header-name'>
                            <Label className='table-product-name'>PRODUCT NAME</Label>
                        </div>
                        <div className='table-section-products__header-description'>
                            <Label className='table-product-description'>DESCRIPTION</Label>
                        </div>
                        <div className='table-section-products__header-status'>
                            <Label className='table-product-status'>STATUS</Label>
                        </div>
                        <div className='table-section-products__header-expiry-date'>
                            <Label className='table-product-expiry-date'>EXPIRY DATE</Label>
                        </div>
                        <div className='table-section-products__header-action'>
                            <Label className='table-product-action'>ACTION</Label>
                        </div>
                    </div >
                    <div className='table-section-products__body'>
                        {SAMPLE_PRODUCT_TABLE_ITEM.length > 0 ? (
                            SAMPLE_PRODUCT_TABLE_ITEM.map(this._renderProductTableItem)
                        ) : (
                        <div className='bid-table-not-found-data'> 
                            <h2 className='bid-table-not-found-label'> No Data Found </h2>
                        </div>
                        )}
                    </div>
                    <Modal modalVisibility={this.state.form_modal} className='add-product-modal'>
                        <div className='add-product-modal-container'>
                            <div className='add-product-modal__header'>
                                <Label className='add-product-modal__header-title'>ADD PRODUCT</Label>
                            </div>
                            <div className='add-product-modal__body'>
                                <div className='add-product-modal__body-inline-1'>
                                    <div className='add-product-modal__body-inline-1-name'>
                                        <Label className='product-name'>Product Name</Label>
                                        <TextInput 
                                            className='product-name-input'
                                            placeholder='Please Input the Product Name Here'
                                            onChange={this.onChangeValue}
                                            value={form.name}
                                            name='name'
                                        />
                                    </div>
                                    <div className='add-product-modal__body-inline-1-expiry-date'>
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
                                <div className='add-product-modal__body-inline-2'>
                                    <div className='add-product-modal__body-inline-2-minimum-bid'>
                                        <Label className='product-minimum-bid'>Minimum Bid</Label>
                                        <TextInput 
                                            className='product-minimum-bid-input'
                                            placeholder='Please Input the Minimum Bid Here'
                                            onChange={this.onChangeValue}
                                            value={form.minimum_bid}
                                            name='minimum_bid'
                                        />
                                    </div>
                                    <div className='add-product-modal__body-inline-2-maximum-bid'>
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
                                <div className='add-product-modal__body-inline-3'>
                                    <Label className='product-description'>Description</Label>
                                    <TextInput
                                        className='product-description-input'
                                        placeholder='Please Input the Product Description Here'
                                        onChange={this.onChangeValue}
                                        value={form.description}
                                        name='description'
                                    />
                                </div>
                                <div className='add-product-add-photo'>
                                <Label className='add-modal-upload-image'>Product Image</Label>
                                <div className='file-upload-container'>
                                    <FileUpload label='Upload Photo' onChange={this.filehandleChange}/>
                                </div>
                                    <div className='add-modal-upload-image-container'>
                                        {this.state.preview ? (
                                            <img src={this.state.preview} alt='preview-img' className='file-preview'/>
                                        ) : (
                                            null
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className='add-product-modal__footer'>
                                <Button
                                    className='add-product-cancel-btn'
                                    label='Cancel'
                                    onClick={() => this.setState({form_modal: false})}
                                />
                                <Button
                                    className='add-product-save-btn'
                                    label='Save'
                                    onClick={() => this.setState({form_modal: false})}
                                />
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        )
    }
}

export default Products