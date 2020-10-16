import React from 'react';
import styled from "styled-components";
import {ReactComponent as Check} from "../Media/check.svg";
import {StyledButton} from "../GlobalStylings";
import {Story} from "../GlobalTypes";

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

const List: React.FunctionComponent<ListProps> = ({list, onRemoveItem}: ListProps) => (
    <>
        {list.map(item => {
                return (<Item
                    key={item.objectID}
                    item={item}
                    onRemoveItem={onRemoveItem}
                />)
            }
        )}
    </>
);

export default List;