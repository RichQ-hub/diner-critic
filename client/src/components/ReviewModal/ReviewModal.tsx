import { useState } from 'react';
import FormItemText from '../FormItemText/FormItemText';
import './ReviewModal.css';
import ReactDOM from 'react-dom';
import { useFormInputText } from '../../hooks/useFormInputText';
import FormItemTextarea from '../FormItemTextarea/FormItemTextarea';

const MODAL_STYLE_CLASSNAME = 'review-modal-input';
const TEXT_STYLE_CLASSNAME = 'review-modal-text review-input--bg';
const TEXTAREA_STYLE_CLASSNAME = 'review-modal-textarea review-input--bg';

interface ReviewModalProps {
    handleToggleModal: (bool: boolean) => void;
}

export default function ReviewModal(props: ReviewModalProps) {
    const { handleToggleModal } = props;

    const title = useFormInputText();
    const reviewContent = useFormInputText();

    return ReactDOM.createPortal(
        <div className='review-modal-bg' onClick={() => handleToggleModal(false)}>
            <div className="review-modal modal--border" onClick={(e) => e.stopPropagation()}>
                <div className="review-modal-dark-bg"></div>
                <div className="review-modal-body">
                    {/* Close Button. */}
                    <div className='review-modal-close-btn' onClick={() => handleToggleModal(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/></svg>
                    </div>

                    {/* Header Section. */}
                    <div className="review-modal__header">
                        <p>Create a Review</p>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg>
                    </div>

                    <hr />

                    {/* Form Section. */}
                    <form className="review-modal__form">
                        <div className="review-modal-inputs">
                            <FormItemText 
                                title='Title'
                                pageStyle={MODAL_STYLE_CLASSNAME}
                                inputStyle={TEXT_STYLE_CLASSNAME}
                                onChange={title.handleChange}
                            />
                            <FormItemTextarea 
                                title='Review'
                                pageStyle={MODAL_STYLE_CLASSNAME}
                                inputStyle={TEXTAREA_STYLE_CLASSNAME}
                                onChange={reviewContent.handleChange}
                            />
                        </div>
                        <div className="review-modal-ratings">

                        </div>
                    </form>
                </div>
            </div>
        </div>, document.getElementById("portal")!
    )
}

/**
 * React Portals: (Uses the concept of closure to essentially delegate (move) this component
 * to a different place while it can still use the variables in the environment that it was
 * defined in.)
 * 
 * Ref: https://www.youtube.com/watch?v=LyLa7dU5tp8&t=626s
 */
