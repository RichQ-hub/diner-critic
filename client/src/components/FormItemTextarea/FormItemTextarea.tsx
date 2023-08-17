import React from 'react'
import FormItem from '../FormItem/FormItem';

interface FormItemTextareaProps {
    title: string;
    onChange: (e: React.FormEvent<HTMLTextAreaElement>) => void;
}

export default function FormItemTextarea(props: FormItemTextareaProps) {
    const { title, onChange } = props;

    return (
        <FormItem title={title}>
            <textarea 
                className='create-rest-textarea input--bg'
                onChange={onChange}
            />
        </FormItem>
    )
}
