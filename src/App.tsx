import React, {useCallback, useEffect, useMemo, useReducer, useState} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import List from './Components/List';
import SearchForm from "./Components/SearchForm";
import useSemiPersistentState from "./CustomHooks";
import storiesReducer from "./Reducer";
import {Stories, Story} from "./GlobalTypes";
import {API_ENDPOINT} from "./constants";

// Styling //

const StyledContainer = styled.div`
  height: 100%;
  padding: 20px;
  background: #83a4d4;
  background: linear-gradient(to left, #b6fbff, #83a4d4);
  color: #171212;
`;

const StyledHeadlinePrimary = styled.h1`
  font-size: 48px;
  font-weight: 300;
  letter-spacing: 2px;
`;

// React //

const App: React.FunctionComponent = () => {

    const [searchTerm, setSearchTerm] = useSemiPersistentState('search', 'React');

    const [url, setUrl] = useState(
        `${API_ENDPOINT}${searchTerm}`
    )

    const [stories, dispatchStories] = useReducer(
        storiesReducer,
        {data: [], isLoading: false, isError: false}
    );

    const handleFetchStories = useCallback(async () => {
        dispatchStories({type: 'STORIES_FETCH_INIT'});

        try {
            const result = await axios.get(url)
            dispatchStories({
                type: 'STORIES_FETCH_SUCCESS',
                payload: result.data.hits,
            });
        } catch {
            dispatchStories({type: 'STORIES_FETCH_FAILURE'})
        }
    }, [url]);

    useEffect(() => {
        handleFetchStories();
    }, [handleFetchStories]);

    const handleRemoveStory = useCallback((item: Story) => {
        dispatchStories({
            type: 'REMOVE_STORY',
            payload: item
        });
    }, []);

    const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    }

    const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setUrl(`${API_ENDPOINT}${searchTerm}`)
    };

    const getSumComments = (stories: { data: Stories; }) => {
        return stories.data.reduce(
            (result: number, value: { num_comments: number; }) => result + value.num_comments,
            0
        );
    };

    const sumComments = useMemo(() => getSumComments(stories), [stories]);

    return (
        <StyledContainer>
            <StyledHeadlinePrimary>My Hacker Stories with {sumComments} comments.</StyledHeadlinePrimary>
            <SearchForm
                searchTerm={searchTerm}
                onSearchInput={handleSearchInput}
                onSearchSubmit={handleSearchSubmit}
            />
            {stories.isError && <p>Something went wrong ...</p>}
            {stories.isLoading ?
                (<p>Loading ...</p>) : (<List list={stories.data} onRemoveItem={handleRemoveStory}/>)}
        </StyledContainer>
    )
};

export default App;