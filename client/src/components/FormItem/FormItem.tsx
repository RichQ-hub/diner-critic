import React from 'react'

interface FormItemProps {
    children: React.ReactNode;
    title: string;
    pageStyle: string;
}

export default function FormItem(props: FormItemProps) {
    const { children, title, pageStyle } = props;

    return (
        <div className={pageStyle}>
            <h2>{title}</h2>
            {children}
        </div>
    )
}
