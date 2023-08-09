import React from 'react'
import FormItem from '../FormItem/FormItem';

interface FormItemTextProps {
    title: string;
}

export default function FormItemText(props: FormItemTextProps) {
    const { title } = props;

    return (
        <FormItem title={title}>
            <input 
                className='create-rest-form-input' 
                type="text" 
            />
        </FormItem>
    )
}
