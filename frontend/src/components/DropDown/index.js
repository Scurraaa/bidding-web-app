import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import ReactSelect from 'react-select';
import './styles.css'

class DropDown extends PureComponent {
    
    onSelect = (value) => {
        const { name, onChange } = this.props;

        onChange(value, name);
    }

    render() {
        const { placeholder, options, className, rest, disabled, error } = this.props
        return (
            <div className={`select ${className}`}>
                <ReactSelect
                    {...rest}
                    isSearchable={false}
                    options={options}
                    placeholder={placeholder}
                    isDisabled={disabled}
                    onChange={this.onSelect}
                    classNamePrefix={`select-input${error ? ' select-input-error' : ''}`} 
                />
            </div>
        )
    }
}

DropDown.propTypes = {
    options: PropTypes.array,
    name: PropTypes.string,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    onChange: PropTypes.func,
    rest: PropTypes.object
}

export default DropDown;