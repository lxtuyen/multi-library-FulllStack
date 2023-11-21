import React, { createContext, useReducer, useContext } from 'react';

const FollowedContext = createContext();

const initialState = {
    book: [],
    bookId: [],
    followId: [],
};

const followedReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_FOLLOWED':
            return {
                followId: [...state.followId, action.payload],
                bookId: [...state.bookId, action.payload],
            };
        case 'ADD_ALL_BOOKS':
            return Object.assign({}, initialState, {
                book: action.payload,
            });
        case 'REMOVE_FOLLOWED':
            return {
                followId: state.followId.filter((book) => book !== action.payload.foundBookIds),
                bookId: state.bookId.filter((id) => id !== action.payload._id),
            };
        case 'SET_BOOK_ID':
            return { ...state, bookId: action.payload };

        case 'SET_FOLLOW_ID':
            return { ...state, followId: action.payload };
        default:
            return state;
    }
};

const FollowedProvider = ({ children }) => {
    const [state, dispatch] = useReducer(followedReducer, initialState);

    return <FollowedContext.Provider value={{ state, dispatch }}>{children}</FollowedContext.Provider>;
};

const useFollowedContext = () => {
    const context = useContext(FollowedContext);
    if (!context) {
        throw new Error('useFollowedContext phải được sử dụng trong FollowedProvider');
    }
    return context;
};

export { FollowedProvider, useFollowedContext };
