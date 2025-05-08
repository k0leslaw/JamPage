import { useState, useRef } from "react";

import { FaMicrophone } from "react-icons/fa";
import { FaRegStopCircle } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaRegSave } from "react-icons/fa";

import './Recorder.css';

/**
 * The recording functionality was adapted (and then modified by myself) from the following source
 * https://github.com/recoding-io/react-videos/tree/main/react-audio-recorder
 */

function Recorder ({ band, loadRecordings }) {
    const [isRecording, setIsRecording] = useState(false);
    const [recordedURL, setRecordedURL] = useState('');
    const [seconds, setSeconds] = useState(0);
    const [title, setTitle] = useState('');

    const mediaStream = useRef(null);
    const mediaRecorder = useRef(null);
    const chunks = useRef([]);

    const startRecording = async () => {
        setIsRecording(true)

        try {
            setSeconds(0)

            const stream = await navigator.mediaDevices.getUserMedia({audio: true});
            mediaStream.current = stream
            mediaRecorder.current = new MediaRecorder(stream)

            mediaRecorder.current.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    chunks.current.push(e.data)
                }
            }

            const timer = setInterval(() => {
                setSeconds(prev => prev + 1)
            }, 1000)

            mediaRecorder.current.onstop = () => {
                const recordedBlob = new Blob(chunks.current,{ type: 'audio/mp3' })
                const url = URL.createObjectURL(recordedBlob)
                setRecordedURL(url)

                chunks.current = []
                clearTimeout(timer)
            }

            mediaRecorder.current.start()

        } catch (err) {
            console.log(err)
        }
    }

    const stopRecording = async () => {
        setIsRecording(false)
        if (mediaRecorder.current) {
            mediaRecorder.current.stop()
            mediaStream.current.getTracks().forEach(track => track.stop())
        }
    }

    const formatTime = (totalSeconds) => {
        const mins = Math.floor((totalSeconds % 3600)/60)
        const secs = totalSeconds % 60

        return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
    }

    const onSave = async () => {
        console.log(band)
        if (band === 'Choose Band') {
            alert('Please select a band.');
        } else if (confirm(`REMINDER\nAll members of ${band} will see this recording if saved. Press OK to confirm.`) === true){
            const newIdea = {
                band: band,
                date: new Date(),
                title: title,
                original_recording: recordedURL
            }
    
            const response = await fetch('/ideas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newIdea)
            });
    
            if (response.status === 201) {
                alert(`Your recording has been saved to ${band}.`);
            }
    
            setRecordedURL('');
            setSeconds(0);
            loadRecordings;
        }
    }

    const onDelete = () => {
        if (confirm('WARNING!\nThis cannot be undone. Press \'Ok\' to confirm deleting this recording.') === true) {
            setRecordedURL('');
            setSeconds(0);
        } 
    }
    
    return (
        <div className = 'recorder'>
            <input type='text' id='title' placeholder='title' onChange={ e => {setTitle(e.target.value)} }/>
            <h2 className='timer'>
                {formatTime(seconds)}
            </h2>
            <div></div>
            {recordedURL && <audio controls src={recordedURL} />}
            <br/>
            { isRecording ? <button onClick={ stopRecording } className='record-button'><FaRegStopCircle /></button> : 
            recordedURL === '' ? <button onClick={ startRecording } className='record-button'><FaMicrophone /></button> :
                <div className='save-delete-buttons'>
                    <button onClick={ onSave } className='post-record-button'><FaRegSave /></button>
                    <button onClick={ onDelete } className='post-record-button'><FaRegTrashAlt /></button>
                </div> }
        </div>
    );
}

export default Recorder;