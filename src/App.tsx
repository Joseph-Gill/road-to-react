import React, {useCallback, useEffect, useMemo, useReducer, useState} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import List from './Components/List';
import SearchForm from "./Components/SearchForm";
import useSemiPersistentState from "./CustomHooks";
import storiesReducer from "./Reducer";
import {Stories, Story} from "./GlobalTypes";
import {API_ENDPOINT} from "./constants";
import { StyledButton } from './GlobalStylings';

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

    const getUrl = (searchTerm: string) => `${API_ENDPOINT}${searchTerm}`

    const [searchTerm, setSearchTerm] = useSemiPersistentState('search', 'React');

    const [urls, setUrls] = useState([
        getUrl(searchTerm)
    ]);

    const [stories, dispatchStories] = useReducer(
        storiesReducer,
        {data: [], isLoading: false, isError: false}
    );

    const extractSearchTerm = (url: string) => url.replace(API_ENDPOINT, '');

    const getLastSearches = (urls: Array<string>) =>
        urls.slice(-5).map(url => extractSearchTerm(url));

    const handleSearch = (searchTerm: string) => {
        const url = getUrl(searchTerm);
        setUrls(urls.concat(url));
    }

    const handleLastSearch = (searchTerm: string) => {
        handleSearch(searchTerm);
    }

    const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleSearch(searchTerm);
    };

    const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    }

    const handleFetchStories = useCallback(async () => {
        dispatchStories({type: 'STORIES_FETCH_INIT'});

        try {
            const lastUrl = urls[urls.length - 1];
            const result = await axios.get(lastUrl)
            dispatchStories({
                type: 'STORIES_FETCH_SUCCESS',
                payload: result.data.hits,
            });
        } catch {
            dispatchStories({type: 'STORIES_FETCH_FAILURE'})
        }
    }, [urls]);

    useEffect(() => {
        handleFetchStories();
    }, [handleFetchStories]);

    const handleRemoveStory = useCallback((item: Story) => {
        dispatchStories({
            type: 'REMOVE_STORY',
            payload: item
        });
    }, []);

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

            {getLastSearches(urls).map((searchTerm, index) => (
                <StyledButton
                    key={searchTerm + index}
                    type='button'
                    onClick={() => handleLastSearch(searchTerm)}
                >
                    {searchTerm}
                </StyledButton>
            ))}

            {stories.isError && <p>Something went wrong ...</p>}
            {stories.isLoading ?
                (<p>Loading ...</p>) : (<List list={stories.data} onRemoveItem={handleRemoveStory}/>)}
        </StyledContainer>
    )
};

export default App;