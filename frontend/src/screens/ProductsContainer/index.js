import React, { PureComponent } from 'react'
import Button from '../../components/Button'
import Label from '../../components/Label'
import Dropdown from '../../components/DropDown'
import ProductTableItem from './ProductsTable'
import Modal from '../../components/Modal'
import TextInput from '../../components/TextInput'
import PageLoading from '../../components/PageLoading'
import Disconnected from '../../components/Disconnected'
import NumberInput from '../../components/NumerInput'
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import FileUpload from '../../components/FileUpload'
import SuccessAlert from '../../components/Alerts/SuccessAlert'
import FailedAlert from '../../components/Alerts/FailedAlerts'
import { connect } from 'react-redux'
import { getProducts, postProduct } from '../../redux/actions/ProductActions'
import { PRODUCT_STATUS_CHOICES } from '../../utils/constant'
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
    getProducts: (user_id, product_status, token) => { dispatch(getProducts(user_id, product_status, token)) },
    postProduct: (data, props, token) => { dispatch(postProduct(data, props, token)) }
})

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

    componentDidMount() {
        this.props.getProducts(this.props.user_id, null, this.props.token)
    }

    onChangeValue = (value, name) => {
        this.setState({
            form: {
                ...this.state.form,
                [name]: value
            }
        })
    }

    onChangeDateTime = (date) => {
        this.setState({
            form: {
                ...this.state.form,
                expiry_date: date
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

    onChangeValueSelect = (value, name) => {
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

    _onSearch = () => {
        this.props.getProducts(this.props.user_id, this.state.product_status, this.props.token)
        this.setState({
            product_status: ''
        })
    }
    
    _onAddProduct = () => {
        const date_format = 'YYYY-MM-DD HH:mm:ss'
        const newDatetime = moment(this.state.form.expiry_date).format(date_format)
        const newForm = {
            user: this.props.user_id,
            name: this.state.form.name,
            description: this.state.form.description,
            minimum_bid: this.state.form.minimum_bid,
            maximum_bid: this.state.form.maximum_bid,
            expiry_date: newDatetime,
            image: this.state.raw
        }
        this.props.postProduct(
            {
            ...newForm
            },
            this.props.history,
            this.props.token
        )
    }

    render() {
        const { form } = this.state
        return this.props.products.isLoading ? (
            <PageLoading/>
        ) :this.props.products.errMess === 'HTTP status: 500' ? (
            <Disconnected />
        ) : (
            <div className='products-container'>
                {this.props.products.succMess === 'HTTP DELETE status: 204' ? (
                    <SuccessAlert description='Delete has been Successful!'/>
                ) :this.props.products.succMess === 'HTTP PATCH status: 200' ? (
                    <SuccessAlert description='Changes has been Saved!'/>
                ) : (
                    null
                )}
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
                            onClick={this._onSearch}                    
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
                        {this.props.products.products.count > 0 ? (
                            this.props.products.products.results.map(this._renderProductTableItem)
                        ) : (
                        <div className='product-table-not-found-data'> 
                            <h2 className='product-table-not-found-label'> No Data Found </h2>
                        </div>
                        )}
                    </div>
                    <Modal modalVisibility={this.state.form_modal} className='add-product-modal'>
                        <div className='add-product-modal-container'>
                            <div className='add-product-modal__header'>
                                <Label className='add-product-modal__header-title'>ADD PRODUCT</Label>
                            </div>
                            {this.props.products.succMess === 'HTTP POST status: 201' ? (
                                <SuccessAlert description='Successfully added a new Product!'/>
                            ) :this.props.products.errMess === 'HTTP POST status: 400' ? (
                                <FailedAlert description='Product already exists'/>
                            ) : (  
                                null
                            )}
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
                                <div className='add-product-modal__body-inline-2'>
                                    <div className='add-product-modal__body-inline-2-minimum-bid'>
                                        <Label className='product-minimum-bid'>Minimum Bid</Label>
                                        <NumberInput 
                                            className='product-minimum-bid-input'
                                            placeholder='Please Input the Minimum Bid Here'
                                            onChange={this.onChangeNumberValue}
                                            value={form.minimum_bid}
                                            name='minimum_bid'
                                        />
                                    </div>
                                    <div className='add-product-modal__body-inline-2-maximum-bid'>
                                        <Label className='product-maximum-bid'>Maximum Bid</Label>
                                        <NumberInput 
                                            className='product-maximum-bid-input'
                                            placeholder='Please Input the Maximum bid Here'
                                            onChange={this.onChangeNumberValue}
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
                                    onClick={this._onAddProduct}
                                />
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)