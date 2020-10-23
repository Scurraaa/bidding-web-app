import React, { PureComponent } from 'react'
import Loading from '../../components/PageLoading'
import TextInput from '../../components/TextInput'
import PasswordInput from '../../components/PasswordInput'
import Button from '../../components/Button'
import Label from '../../components/Label'
import Modal from '../../components/Modal'
import './styles.css'

class Login extends PureComponent {

    state = {
        form_modal: false,
        form: {
            username: '',
            password: ''
        },
        user_type: '',
        signup_form: {
            username: '',
            password: '',
        }
    }

    onChangeValue = (value, name) => {
        this.setState({
            form: {
                ...this.state.form,
                [name]: value
            }
        })
    }

    onChangeValueSignUpForm = (value, name) => {
        this.setState({
            signup_form: {
                ...this.state.signup_form,
                [name]: value
            }
        })
    }

    render() {
        const { form, signup_form } = this.state
        return (
            <div className='login-container'>
                <div className='login-container__form'>
                    <div className='login-container__form-header'>
                        <Label className='login-form-title'>
                            BIDDING
                        </Label>
                    </div>
                    <div className='login-container__form-body'>
                        <TextInput
                            className='username-text-input'
                            placeholder='Username'
                            onChange={this.onChangeValue}
                            value={form.username}
                            name='username'                    
                        />
                        <PasswordInput
                            className='password-text-input'
                            placeholder='Password'
                            onChange={this.onChangeValue}
                            value={form.password}
                            name='password'
                        />
                    </div>
                    <div className='login-container__form-footer'>
                        <Button
                            className='login-btn'
                            label='LOGIN'
                            onClick={() => console.log('hello world!')}
                        />

                        <Button
                            className='signup-btn'
                            label="Create an Account"
                            onClick={() => this.setState({form_modal: true})}
                        />
                    </div>
                </div>
                <Modal modalVisibility={this.state.form_modal} className='signup-form-modal'>
                    <div className='signup-form'>
                        <div className='signup-form__header'>
                            <Label className='signup-form__header-title'>Sign Up</Label>
                        </div>
                        <div className='signup-form__body'>
                            <div className='signup-form__body-username'>
                                <Label className='signup-username-label'>Username</Label>
                                <TextInput
                                    className='signup-username-input'
                                    name='username'
                                    onChange={this.onChangeValueSignUpForm}
                                    placeholder='Please Input your Desired Username Here'
                                    value={signup_form.username}
                                />
                                <Label className='signup-password-label'>Password</Label>
                                <PasswordInput
                                    className='signup-password-input'
                                    name='password'
                                    onChange={this.onChangeValueSignUpForm}
                                    placeholder='Please Input your Desired Password Here'
                                    value={signup_form.password}
                                />
                                <Label className='signup-user-type-label'>User Type: </Label>
                                <div className='signup-user-type'>
                                    <input type='radio' value='Buyer' name='user_type' onChange={(e) => this.setState({user_type: e.target.value})} />
                                    <Label className='buyer-label'>Buyer</Label>
                                    <input type='radio' value='Seller' name='user_type' onChange={(e) => this.setState({user_type: e.target.value})} />
                                    <Label className='seller-label'>Seller</Label>
                                </div>
                                <div className='signup-form__footer'>
                                    <Button 
                                        className='form-cancel-btn'
                                        label='Cancel'
                                        onClick={() => this.setState({form_modal: false})}
                                    />
                                    <Button
                                        className='form-save-btn'
                                        label='Save'
                                        onClick={() => console.log(this.state)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default Login