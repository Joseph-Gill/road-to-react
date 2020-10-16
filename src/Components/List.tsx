import React, {useState} from 'react';
import styled from "styled-components";
import {ReactComponent as Check} from "../Media/check.svg";
import {StyledButton} from "../GlobalStylings";
import {Story} from "../GlobalTypes";
import { sortBy } from 'lodash';

// TypeScript //

type Stories = Array<Story>;

type ListProps = {
    list: Stories;
    onRemoveItem: (item: Story) => void;
};

type ItemProps = {
    item: Story;
    onRemoveItem: (item: Story) => void;
};

interface MyProps {
    width: string;
}

// Styling //

const StyledItem = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 5px;
`

const StyledColumn = styled.span`
  padding: 0 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  a {
    color: inherit;
  }
  width: ${(props: MyProps) => props.width};
  
`;

const StyledButtonSmall = styled(StyledButton)`
  padding: 5px;
`;

// React //

const Item = ({item, onRemoveItem}: ItemProps) => (
    <StyledItem>
        <StyledColumn width="40%">
            <a href={item.url}>{item.title}</a>
        </StyledColumn>
        <StyledColumn width="30%">{item.author}</StyledColumn>
        <StyledColumn width="10%">{item.num_comments}</StyledColumn>
        <StyledColumn width="10%">{item.points}</StyledColumn>
        <StyledColumn width="10%">
            <StyledButtonSmall type='button' onClick={() => onRemoveItem(item)}>
                <Check height='18px' width='18px'/>
            </StyledButtonSmall>
        </StyledColumn>
    </StyledItem>
);

const List: React.FunctionComponent<ListProps> = ({list, onRemoveItem}: ListProps) => {

    const [sort, setSort] = useState('NONE');

    const handleSort = (sortKey: string) => {
        setSort(sortKey);
    }

    const SORTS = {
        NONE: (list: Stories) => list,
        TITLE: (list: Stories) => sortBy(list, 'title'),
        AUTHOR: (list: Stories) => sortBy(list, 'author'),
        COMMENT: (list: Stories) => sortBy(list, 'num_comments').reverse(),
        POINT: (list: Stories) => sortBy(list, 'points').reverse(),
    };

    const sortFunction = SORTS[sort];

    const sortedList = sortFunction(list);

    return (
        <>
            <StyledItem>
                <StyledColumn width="40%">
                    <StyledButtonSmall type='button' onClick={() => handleSort('TITLE')}>Title</StyledButtonSmall>
                </StyledColumn>
                <StyledColumn width="30%">
                    <StyledButtonSmall type='button' onClick={() => handleSort('AUTHOR')}>Author</StyledButtonSmall>
                </StyledColumn>
                <StyledColumn width="10%">
                    <StyledButtonSmall type='button' onClick={() => handleSort('COMMENT')}>Comments</StyledButtonSmall>
                </StyledColumn>
                <StyledColumn width="10%">
                    <StyledButtonSmall type='button' onClick={() => handleSort('POINT')}>Points</StyledButtonSmall>
                </StyledColumn>
                <StyledColumn width="10%">Actions</StyledColumn>
            </StyledItem>
            {sortedList.map((item: Story) => {
                    return (<Item
                        key={item.objectID}
                        item={item}
                        onRemoveItem={onRemoveItem}
                    />)
                }
            )}
        </>
    );
}

export default List;