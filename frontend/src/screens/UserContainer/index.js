import React, { PureComponent } from 'react'
import Label from '../../components/Label'
import { connect } from 'react-redux'
import { updateCredentials } from '../../redux/actions/AuthActions'
import PageLoading from '../../components/PageLoading'
import './styles.css'

const mapStateToProps = state => ({
    credentials: state.authentication.credentials,
    authentication: state.authentication
})

const mapDispatchToProps = (dispatch) => ({
    updateCredentials: (data) => { dispatch(updateCredentials(data)) }
})


class UserInfo extends PureComponent {

    componentDidMount() {
        this.props.updateCredentials(
            {
                'username': this.props.credentials.username,
                'password': this.props.credentials.password
            }
        )
    }

    render() {
        return this.props.authentication.isLoading ? (
            <PageLoading/>
        ) : ( this.props.credentials.user_type === 'buyer' ? (
                <div className='user-info-container'>
                    <div className='top-section-user-info'>
                        <h2 className='content-title'> USER INFO </h2>
                    </div>
                    <div className='main-section-user-info'>
                        <div className='main-section-user-info__inline-1'>
                            <Label className='user-info'>Name: {this.props.credentials.username}</Label>
                            <Label className='user-info'>Bid Credits Remaining: {this.props.credentials.bid_credits} PHP </Label>
                            <Label className='user-info'>Commited Bids: {this.props.credentials.commited_bids}</Label>
                        </div>
                        <div className='main-section-user-info__inline-2'>
                            <Label className='user-info'>Total Bids Spent: {this.props.credentials.total_spent} PHP</Label>
                            <Label className='user-info'>Total Bids Placed: {this.props.credentials.total_bids}</Label>
                            <Label className='user-info'>Total Winning Bids: {this.props.credentials.winning_bids}</Label>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='user-info-container'>
                    <div className='top-section-user-info'>
                        <h2 className='content-title'> USER INFO </h2>
                    </div>
                    <div className='main-section-user-info'>
                        <div className='main-section-user-info__inline-1'>
                            <Label className='user-info'>Name: {this.props.credentials.username}</Label>
                            <Label className='user-info'>Product Bids: {this.props.credentials.products}</Label>
                            <Label className='user-info'>Ongoing Product: {this.props.credentials.ongoing_products}</Label>
                        </div>
                        <div className='main-section-user-info__inline-2'>
                            <Label className='user-info'>Closed Product: {this.props.credentials.done_products}</Label>
                            <Label className='user-info'>Total Earnings: {this.props.credentials.earnings} PHP</Label>
                            <Label className='user-info'>Potential Earnings: {this.props.credentials.potential_earnings} PHP</Label>
                        </div>
                    </div>
                </div>
            )
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo)