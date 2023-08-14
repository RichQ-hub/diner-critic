import { useState } from 'react'
import FormItem from '../FormItem/FormItem';
import SelectDropdown from './SelectDropdown';

interface FormItemSelectProps {
    title: string;

}

export default function FormItemSelect(props: FormItemSelectProps) {
    const { title } = props;

    const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);

    function handleSelectOpen() {
        setIsSelectOpen(!isSelectOpen);
    }

    return (
        <FormItem title={title}>
            <button className='create-form-select input--bg' >
                
            </button>

            {
                isSelectOpen && 
                <SelectDropdown />
            }
        </FormItem>
    )
}
