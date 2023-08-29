import React, { useState } from 'react'

/**
 * This hook accepts both text and textarea form input types.
 */
export const useFormInputRating = () => {
    const [value, setValue] = useState<number>(0);

    function handleChangeRating(newRating: number) {
        setValue(newRating);
    }

    const inputProps = {
        value,
        handleChangeRating,
    }

    return inputProps;
}