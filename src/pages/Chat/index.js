import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import { BASE_URL } from 'hooks/config';
import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
    TypingIndicator,
} from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { toast } from 'react-toastify';
import axios from 'axios';

import style from './Chat.module.scss';
import { AuthContext } from '~/context/AuthContext';

const cx = classNames.bind(style);

const API_KEY = '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';

function Chat() {
    const { id } = useParams();
    const [isTyping, setTyping] = useState(false);
    const [messages, setMessages] = useState([]);
    const { user  } = useContext(AuthContext);
    useEffect(() => {
        const getAllBook = async () => {
            try {
                const url = `${BASE_URL}/message/${id}`;
                const { data } = await axios.get(url, {
                    headers: {
                      Authorization: `Bearer ${user.token}`,
                    },
                  });
                const messages = data.messages
                setMessages(messages);
            } catch (err) {
                console.log(err.message);
            }
        };
        getAllBook();
    }, [id, user.token]);
    const handleSend = async (message) => {
        const newMessage = {
            message: message,
            sender: 'user',
            direction: 'outgoing',
        };
        const newMessages = [...messages, newMessage];
        setMessages(newMessages);
        setTyping(true);
        try {
            const res = await fetch(`${BASE_URL}/message/${id}`, {
                method: 'post',
                headers: { 'content-type': 'application/json', 'Authorization': `Bearer ${user.token}`, },
                credentials: 'include',
                body: JSON.stringify(newMessage),
            });
            const result = await res.json();
            if (!res.ok) {
                return toast.error(result.message);
            } 
        } catch (err) {
            toast.error(err);
        }
        await processMessageToChatGPT(newMessages);
    };

    async function processMessageToChatGPT(chatMessages) {
        try {
            let apiMessages = chatMessages.map((messagesObject) => {
                let role = messagesObject.sender === 'chatGPT' ? 'assistant' : 'user';
                return { role: role, content: messagesObject.message };
            });

            const systemMessage = {
                role: 'system',
                content: 'Nói chuyện như bạn là một chuyên gia về sách',
            };

            const apiRequestBody = {
                model: 'gpt-3.5-turbo',
                messages: [systemMessage, ...apiMessages],
            };

            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'post',
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(apiRequestBody),
            });

            const responseData = await response.json();
            console.log(responseData);

            if (!response.ok) {
                return alert(responseData.message);
            } else {
                setMessages([
                    ...chatMessages,
                    {
                        message: responseData.choices[0].message.content,
                        sender: 'chatGPT',
                    },
                ]);
                try {
                    const newMessage = {
                        message: responseData.choices[0].message.content,
                        sender: 'chatGPT',
                    };
                    const res = await fetch(`${BASE_URL}/message/${id}`, {
                        method: 'post',
                        headers: { 'content-type': 'application/json' },
                        credentials: 'include',
                        body: JSON.stringify(newMessage),
                    });
                    const result = await res.json();
                    if (!res.ok) {
                        return toast.error(result.message);
                    }
                } catch (err) {
                    toast.error(err);
                }
            }

            setTyping(false);
        } catch (error) {
            console.error('Error processing message:', error);
            setTyping(false);
        }
    }
    console.log(messages);
    return (
        <div className="container">
            <div className={cx('wrapper')}>
                <MainContainer>
                    <ChatContainer>
                        <MessageList
                            scrollBehavior="smooth"
                            typingIndicator={isTyping ? <TypingIndicator content="Multi-library is typing" /> : null}
                        >
                            {messages?.map((message, i) => {
                                return <Message key={i} model={message} />;
                            })}
                        </MessageList>
                        <MessageInput onSend={handleSend} placeholder="Enter text here..." />
                    </ChatContainer>
                </MainContainer>
            </div>
        </div>
    );
}

export default Chat;

