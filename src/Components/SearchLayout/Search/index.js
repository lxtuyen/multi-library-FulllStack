import { useRef, useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import classNames from 'classnames/bind';

import styles from './Search.module.scss';

const cx = classNames.bind(styles);

const Search = ({ setSearch, search }) => {
    const inputRef = useRef();
    const startListening = () => SpeechRecognition.startListening({ continuous: true });
    const { transcript, listening, browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition()
    const [inputFocused, setInputFocused] = useState(false);

    useEffect(() => {
        if (listening && transcript) {
            // Update the input field with the recognized speech
            setSearch(transcript);
            inputRef.current.value = transcript;
            console.log(transcript)
            // Scroll to the end of the input field
            inputRef.current.scrollIntoView({ behavior: "smooth" });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listening, transcript, inputFocused]);
    if (!browserSupportsSpeechRecognition) {
        console.log('loi');
    }
    return (
        <div className={cx('search')}>
            <input
                input
                type="text"
                ref={inputRef}
                className={cx('input')}
                placeholder="Tìm kiếm"
                onChange={({ currentTarget: input }) => {
                    setSearch(input.value);
                }}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
            />
            {!!search && (
                <buttton
                    className={cx('clear')}
                    onClick={() => {
                        setSearch('');
                        inputRef.current.focus();
                        inputRef.current.value = '';
                        resetTranscript();
                    }}
                >
                    <i className="fa-solid fa-circle-xmark"></i>
                </buttton>
            )}
            <buttton className={cx('search-btn')}
                //onTouchStart={startListening}
                //onTouchEnd={SpeechRecognition.stopListening}
                onMouseDown={startListening}
                onMouseUp={SpeechRecognition.stopListening}
                
            >   {listening ? <i className="fa-solid fa-circle-xmark"></i> : <i className="fa-solid fa-microphone"></i>  }
                
            </buttton>
        </div>
    );
};

export default Search;
//               