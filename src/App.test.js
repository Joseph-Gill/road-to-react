import React from 'react';
import renderer from 'react-test-renderer';
import App, {Item, List, SearchForm, InputWithLabel} from "./App";

describe('Item', () => {
    const item = {
        title: 'React',
        url: 'https://reactjs.org/',
        author: 'Jordan Walke',
        num_comments: 3,
        points: 4,
        objectID: 0,
    };

    const handleRemoveItem = jest.fn();

    let component;

    beforeEach(() => {
        component = renderer.create(<Item item={item} onRemoveItem={handleRemoveItem} /> );
    });

    it('renders all properties', () => {
        expect(component.root.findByType('a').props.href).toEqual('https://reactjs.org/');
        expect(component.root.findAllByType('span')[1].props.children).toEqual('Jordan Walke');
        expect(component.root.findAllByProps({ children: 'Jordan Walke'}).length).toEqual(2);
        expect(component.root.findAllByProps({ children: 3}).length).toEqual(2);
        expect(component.root.findAllByProps({ children: 4}).length).toEqual(2);
    });

    it('calls onRemoveItem on button click', () => {
       component.root.findByType('button').props.onClick();
       expect(handleRemoveItem).toHaveBeenCalledTimes(1);
       expect(handleRemoveItem).toHaveBeenCalledWith(item);
       expect(component.root.findAllByType(Item).length).toEqual(1);
    });

});
