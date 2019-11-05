import React from 'react';
import { Form, Upload, Icon, Button } from "antd";
import PropTypes from 'prop-types';

const FileUpload = (
    {
        getFieldDecorator,
        name,
        label,
        title,
        initialValue
    }) => {

    const customRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    }

    const normFile = e => {
        // console.log('Upload event:', e);
        if (Array.isArray(e)) {
          return e;
        }

        if (e.fileList.length > 1) {
          e.fileList.shift();
        }

        return e && e.fileList;
    };

    return (
        <Form.Item label={label}>
          {getFieldDecorator(name, {
              initialValue: initialValue,
            valuePropName: 'fileList',
            getValueFromEvent: normFile,
          })(
            <Upload name={name} customRequest={customRequest}>
              <Button>
                <Icon type="upload" /> {title}
              </Button>
            </Upload>,
          )}
        </Form.Item>
    );
}

FileUpload.propTypes = {
    getFieldDecorator: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
}

FileUpload.defaultProps = {

}

export default FileUpload;