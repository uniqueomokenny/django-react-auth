import React from 'react';
import { Input, Form, DatePicker, Select } from "antd";
import PropTypes from 'prop-types';

const FormField = (
    {
        element,
        getFieldDecorator,
        label,
        hasFeedback,
        name,
        initialValue,
        errorRequired,
        size,
        rows,
        placeholder,
        suffix,
        prefix,
        validateToNextPassword,
        compareToFirstPassword,
        onBlur,
        options
    }) => {

    const { TextArea } = Input;

    const { Option } = Select;

    const displayOption = (options) => (
        options.map((option, index) => (
            <Option key={index} value={option}>{option}</Option>
        ))
    )

    const renderItem = () => {
        let formTemplate = null;
        const FormItem = Form.Item;

        switch(element) {
            case("text"):
                formTemplate = (
                    <FormItem label={label} hasFeedback={hasFeedback}>
                        {getFieldDecorator(name, {
                            initialValue: initialValue,
                          rules: [
                            {
                              required: true,
                              message: errorRequired,
                            }
                          ],
                        })(<Input size={size} placeholder={placeholder} suffix={suffix} prefix={prefix} />)}
                    </FormItem>
                )
                break;

            case("textarea"):
                formTemplate = (
                    <FormItem label={label} hasFeedback={hasFeedback}>
                        {getFieldDecorator(name, {
                            initialValue: initialValue,
                          rules: [
                            {
                              required: true,
                              message: errorRequired,
                            }
                          ],
                        })(<TextArea placeholder={placeholder} rows={rows} />)}
                    </FormItem>
                )
                break;

            case("select"):
                formTemplate = (
                    <FormItem label={label} hasFeedback>
                      {getFieldDecorator(name, {
                        rules: [{ required: true, message: errorRequired }],
                      })(
                        <Select placeholder={placeholder} size={size}>
                            {displayOption(options)}
                        </Select>,
                      )}
                    </FormItem>
                )
                break;

            case("email"):
                formTemplate = (
                    <FormItem label={label} hasFeedback={hasFeedback}>
                        {getFieldDecorator(name, {
                          initialValue: initialValue,
                          rules: [
                            {
                              type: 'email',
                              message: 'The input is not valid E-mail!',
                            },
                            {
                              required: true,
                              message: errorRequired,
                            },
                          ],
                        })(<Input size={"large"} placeholder={placeholder} prefix={prefix} suffix={suffix} />)}
                    </FormItem>
                )
                break;

            case("password"):
                formTemplate = (
                    <FormItem label={label} hasFeedback={hasFeedback}>
                        {getFieldDecorator(name, {
                          initialValue: initialValue,
                          rules: [
                            {
                              required: true,
                              message: errorRequired,
                            },
                              {
                                validator: validateToNextPassword ? validateToNextPassword: compareToFirstPassword,
                              },
                          ],
                        })(<Input.Password size={"large"} placeholder={placeholder} onBlur={onBlur} prefix={prefix} />)}
                    </FormItem>
                )
                break;

            case("number"):
                formTemplate = (
                    <FormItem label={label} hasFeedback={hasFeedback}>
                        {getFieldDecorator(name, {
                          initialValue: initialValue,
                          rules: [
                            {
                              required: true,
                              message: errorRequired,
                            },
                          ],
                        })(<Input size={"large"} placeholder={placeholder} />)}
                    </FormItem>
                )
                break;

            case("datepicker"):
                formTemplate = (
                    <FormItem label={label} hasFeedback={hasFeedback}>
                      {getFieldDecorator(name, {
                          initialValue: initialValue,
                          rules: [
                              {
                                  type: 'object',
                                  required: true,
                                  message: errorRequired,
                              }
                          ],
                        })(<DatePicker size={"large"} placeholder={placeholder} />)}
                    </FormItem>
                )
                break;

            default:
                formTemplate = null;
        }
        return formTemplate;
    }

    return (
        <div>
            {renderItem()}
        </div>
    );
}

FormField.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    initialValue: PropTypes.string,
    errorRequired: PropTypes.string,
    element: PropTypes.string.isRequired,
    label: PropTypes.string,
    getFieldDecorator: PropTypes.func.isRequired,
    hasFeedback: PropTypes.bool,
    size: PropTypes.string,
    suffix: PropTypes.object,
    validateToNextPassword: PropTypes.func,
    compareToFirstPassword: PropTypes.func,
    onBlur: PropTypes.func

}

FormField.defaultProps = {
    element: "text",
    size: "large"

}

export default FormField;