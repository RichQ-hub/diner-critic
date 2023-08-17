import React, { useState } from 'react'

/**
 * This hook accepts both text and textarea form input types.
 */
export const useFormInputText = () => {
    const [value, setValue] = useState<string>("");

    function handleChange(e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setValue(e.currentTarget.value);
    }

    const inputProps = {
        value,
        handleChange,
    }

    return inputProps;
}

/**
 * NOTE:
 * Remember that all custom hooks are UNIQUE for each component instance
 * and thus does not share state if this hook is called in multiple different
 * places.
 * 
 * Ref: https://react.dev/learn/reusing-logic-with-custom-hooks#custom-hooks-let-you-share-stateful-logic-not-state-itself
 */
