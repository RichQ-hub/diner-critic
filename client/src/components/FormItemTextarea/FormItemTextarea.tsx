import React from 'react'
import FormItem from '../FormItem/FormItem';

interface FormItemTextareaProps {
    title: string;
    pageStyle: string;
    inputStyle: string;
    onChange: (e: React.FormEvent<HTMLTextAreaElement>) => void;
}

export default function FormItemTextarea(props: FormItemTextareaProps) {
    const { title, pageStyle, inputStyle, onChange } = props;

    return (
        <FormItem title={title} pageStyle={pageStyle}>
            <textarea 
                className={inputStyle}
                onChange={onChange}
            />
        </FormItem>
    )
}
