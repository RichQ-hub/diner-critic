import React, { useState } from 'react'

export const useFormInputText = () => {
    const [value, setValue] = useState<string>("");

    function handleChange(e: React.FormEvent<HTMLInputElement>) {
        setValue(e.currentTarget.value);
    }

    const inputProps = {
        value,
        handleChange,
    }

    return inputProps;
}
