import React from "react";
import {StyledButton} from "../GlobalStylings";

// Typescript //

type LastSearchesProps = {
    getLastSearches: (urls: Array<string>) => Array<string>,
    urls: Array<string>,
    handleLastSearch: (searchTerm: string) => void,
}

// React //

const LastSearches: React.FunctionComponent<LastSearchesProps> = ({getLastSearches, urls, handleLastSearch}: LastSearchesProps) => (
    <>
        {
            getLastSearches(urls).map((searchTerm: string, index: number) => (
                <StyledButton
                    key={searchTerm + index}
                    type='button'
                    onClick={() => handleLastSearch(searchTerm)}
                >
                    {searchTerm}
                </StyledButton>
            ))
        }
    </>
);

export default LastSearches;