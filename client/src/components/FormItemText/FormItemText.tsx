import React from 'react'
import FormItem from '../FormItem/FormItem';

interface FormItemTextProps {
    title: string;
    onChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

export default function FormItemText(props: FormItemTextProps) {
    const { title, onChange } = props;

    return (
        <FormItem title={title}>
            <input 
                className='input--bg' 
                type="text" 
                onChange={onChange}
            />
        </FormItem>
    )
}
