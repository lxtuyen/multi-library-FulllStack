import { useRef, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import classNames from 'classnames/bind';

import styles from './Search.module.scss';

const cx = classNames.bind(styles);

const Search = ({ setSearch, search }) => {
    const inputRef = useRef();
    const startListening = () => SpeechRecognition.startListening({ continuous: true });
    const { transcript, listening, browserSupportsSpeechRecognition } = useSpeechRecognition()
    
      useEffect(() => {
        if (listening && transcript) {
            // Update the input field with the recognized speech
            setSearch(transcript);
        }
    }, [listening, transcript, setSearch]);

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
                onChange={({ currentTarget: input }) => setSearch(input.value)}
            />
            {!!search && (
            <buttton
            className={cx('clear')}
            onClick={() => {
                setSearch('');
                inputRef.current.focus();
            }}
        >
            <i className="fa-solid fa-circle-xmark"></i>
        </buttton>
            )}
            <buttton className={cx('search-btn')}
                 onTouchStart={startListening}
                 onMouseDown={startListening}
                 onTouchEnd={SpeechRecognition.stopListening}
                 onMouseUp={SpeechRecognition.stopListening}
            >
                <i className="fa-solid fa-microphone"></i>
            </buttton>
        </div>
    );
};

export default Search;
