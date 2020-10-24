import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import './styles.css'

class TextInput extends PureComponent {
    onChangeText = ({ target }) => {
        const { value } = target;
        const { name, onChange } = this.props
        
        onChange(value, name)
    }
    render() {
        const { placeholder, value, className, name, disabled, error, rest} = this.props;
        return (
            <div className={`text-input ${className} ${error ? 'text-input-error' : ''}`}>
                <input
                    className='text-input__value'
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    onChange={this.onChangeText}
                    disabled={disabled}
                    autoComplete='off'
                    {...rest}
                />
            </div>
        )
    }
}

TextInput.propTypes = {
    name: PropTypes.string,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    rest: PropTypes.object
};

export default TextInput