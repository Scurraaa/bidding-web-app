import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import * as FeatherIcon from 'react-icons/fi'
import './styles.css';

class PasswordInput extends PureComponent {

    state= {
        type: 'password'
    }
    
    onChangeText = ({ target }) => {
        const { value } = target;
        const { name, onChange } = this.props;

        onChange(value, name);
    }

    handleClick = () => {
        const newState = this.state.type === 'text' ? 'password' : 'text'
        this.setState({type: newState})
    }

    render() {
        const { type } = this.state
        const { className, placeholder, value, name, error } = this.props
        const Icon = this.state.type === 'password' ? FeatherIcon['FiEye'] : FeatherIcon['FiEyeOff']
        return (
            <div className={`password-input ${className} ${error ? 'password-input-error' : ''}`}>
                <input
                    className='password-input__value'
                    placeholder={placeholder}
                    value={value}
                    onChange={this.onChangeText}
                    name={name}
                    type={type}
                />
                <div className='password__show-container'>
                    {value.length > 0 ? <Icon className='password__show' onClick={this.handleClick} size={28}/> : null}
                </div>
            </div>
        )
    }
}

PasswordInput.propTypes = {
    className: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    name: PropTypes.string
}

export default PasswordInput
