import React, { PureComponent } from 'react'
import Card from '../../components/Card'
import { getProducts } from '../../redux/actions/ProductActions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import './styles.css'
import PageLoading from '../../components/PageLoading'
import Disconnected from '../../components/Disconnected'

const mapStateToProps = state => {
    return {
        token: state.authentication.credentials.token,
        products: state.products,
        user_id: state.authentication.credentials.id
    }
}

const mapDispatchToProps = (dispatch) => ({
    getProducts: (user_id, product_status, token) => { dispatch(getProducts(user_id, product_status, token)) }
})

class ProductsBids extends PureComponent {

    state = {
        form: {
            name: '',
            description: '',
            minimum_bid: '',
            maximum_bid: '',
            expiry_date: '',
            status: '',
        },
        preview: '',
        product_id: '',
        product_status: '',
        product_modal: false
    }

    componentDidMount() {
        this.props.getProducts(null, null, this.props.token)
    }

    _renderProductCards = (data) => (
        <Card item={data} onClick={() => this.props.history.push('/dashboard/product-details?product_id='+data.id)}/>
    )

    render() {
        return this.props.products.isLoading ? (
            <PageLoading/>
        ) :this.props.products.errMess === 'HTTP status: 500' ? (
            <Disconnected/>
        ) : (
            <div className='products-bids-container'>
                <div className='top-section-products-bids'>
                    <h2 className='content-title'>PRODUCT BIDS</h2>
                </div>
                <div className='main-section-product-bids'>
                    <div className='main-section-product-bids-grid'>
                        {this.props.products.products.count > 0 ? (
                            this.props.products.products.results.map(this._renderProductCards)
                        ) : (
                            null
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductsBids))