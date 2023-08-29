import React from 'react'
import FormItem from '../FormItem/FormItem';

interface FormItemTextProps {
    title: string;
    pageStyle: string;
    inputStyle: string;
    onChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

export default function FormItemText(props: FormItemTextProps) {
    const { title, pageStyle, inputStyle, onChange } = props;

    return (
        <FormItem title={title} pageStyle={pageStyle}>
            <input 
                className={inputStyle}
                type="text" 
                onChange={onChange}
            />
        </FormItem>
    )
}
