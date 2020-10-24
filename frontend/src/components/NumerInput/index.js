import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import './styles.css'

class NumberInput extends PureComponent {
    onChangeText = ({ target }) => {
        const { value } = target;
        const { name, onChange } = this.props
        
        onChange(value, name)
    }
    render() {
        const { placeholder, min, max, value, className, name, disabled, error, rest} = this.props;
        const min_input = min ? min.toString() : null
        const max_input = max ? max.toString() : null
        console.log(min_input, max_input)
        return (
            <div className={`number-input ${className} ${error ? 'number-input-error' : ''}`}>
                <input
                    className='number-input__value'
                    minLength='11'
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    onChange={this.onChangeText}
                    type='number'
                    autoComplete='off'
                    disabled={disabled}
                    min={`${min_input ? min_input : '0'}`}
                    max={max_input}
                    {...rest}
                />
            </div>
        )
    }
}

NumberInput.propTypes = {
    name: PropTypes.string,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    rest: PropTypes.object
};

export default NumberInput