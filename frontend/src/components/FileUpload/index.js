import React, { PureComponent } from 'react'
import './styles.css'

class FileUpload extends PureComponent {
    render(){
        const { className, onChange, label } = this.props;
        return (
            <div className={`file-upload-container ${className}`}>
                <input accept='image/*' id='file' type='file' className={`file-input ${className}`} onChange={onChange}/>
                <label className={`file-input-btn ${className}`} htmlFor='file'>{label}</label>
            </div>
        )
    }
}

export default FileUpload