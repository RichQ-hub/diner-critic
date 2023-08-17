import React, { useState } from 'react'

export const useToggleDropdown = (initial: boolean) => {
    const [isOpen, setIsOpen] = useState<boolean>(initial);

    function handleToggle() {
        setIsOpen(!isOpen);
    }

    return {
        isOpen,
        handleToggle
    }
}
