import React, { PureComponent } from 'react'
import Label from '../Label'
import './styles.css'

class Card extends PureComponent {
    render() {
        const { item, onClick } = this.props
        return (
            <div onClick={onClick} className='card-container'>
                <div className='card-content'>
                    <div className='card-header'>
                        <Label className='product-title-label'>{item.name}</Label>
                        <Label className='product-title-description'>{item.description}</Label>
                    </div>
                    <div className='card-body'>
                        <img src={item.image} className='product-bid-image' alt='product'/>
                    </div>
                    <div className='card-footer'>
                        <div className='product-status-container'>
                            <Label className='product-status-label'>Product Status: </Label>
                            <Label className={`${item.status === 'OPEN' ? 'product-status-open' : 'product-status-closed'}`}>{item.status}</Label>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Card