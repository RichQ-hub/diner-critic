import React from 'react'

interface FormItemProps {
    children: React.ReactNode;
    title: string;
}

export default function FormItem(props: FormItemProps) {
    const { children, title } = props;

    return (
        <div className='create-rest-form-item'>
            <h2>{title}</h2>
            {children}
        </div>
    )
}
