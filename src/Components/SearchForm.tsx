import React from 'react';
import styled from "styled-components";
import InputWithLabel from './InputWithLabel';
import {StyledButton} from "../GlobalStylings";

// Typescript //

type SearchFormProps = {
    searchTerm: string;
    onSearchInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

// Styling //

const StyledSearchForm = styled.form`
  padding: 10px 0 20px 0;
  display: flex;
  align-items: baseline;
`;

const StyledButtonLarge = styled(StyledButton)`
  padding: 10px;
`;

// React //

const SearchForm: React.FunctionComponent<SearchFormProps> = ({searchTerm, onSearchInput, onSearchSubmit}: SearchFormProps) => {

    return (
        <StyledSearchForm onSubmit={onSearchSubmit}>
            <InputWithLabel
                id='search'
                value={searchTerm}
                isFocused
                onInputChange={onSearchInput}
            >
                <strong>Search:</strong>
            </InputWithLabel>
            <StyledButtonLarge
                type='submit'
                disabled={!searchTerm}
            >
                Submit
            </StyledButtonLarge>
        </StyledSearchForm>
    )
};

export default SearchForm;