import { FaQuestionCircle } from "react-icons/fa";

import './HelpButton.css'

function HelpButton () {
    const displayPopup = () => {
        alert('Press record to begin recording an audio demo.\nThen, upload the recording to the band or delete it.')
    }

    return (
        <button className='help-button' onClick={ displayPopup }>
            <FaQuestionCircle />
        </button>
    );
}

export default HelpButton;