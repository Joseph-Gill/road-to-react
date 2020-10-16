import React, {useEffect, useRef} from "react";
import styled from "styled-components";

// Styling //

const StyledLabel = styled.label`
  border-top: 1px solid #171212;
  border-left: 1px solid #171212;
  padding-left: 5px;
  font-size: 24px;
`;

const StyledInput = styled.input`
  border: none;
  border-bottom: 1px solid #171212;
  background-color: transparent;
  
  font-size: 24px;
`;

// Typescript //

type InputWithLabelProps = {
    id: string;
    value: string;
    type?: string;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    isFocused?: boolean;
    children: React.ReactNode;
}

// React //

const InputWithLabel: React.FunctionComponent<InputWithLabelProps> = ({
                            id,
                            value,
                            type = 'text',
                            onInputChange,
                            isFocused,
                            children
                        }: InputWithLabelProps) => {

    const inputRef = useRef<HTMLInputElement>(null!);

    useEffect(() => {
        if (isFocused && inputRef.current) {
            inputRef.current.focus();
        }

    }, [isFocused]);

    return (
        <>
            <StyledLabel htmlFor={id}>{children}</StyledLabel>
            &nbsp;
            <StyledInput
                ref={inputRef}
                id={id}
                type={type}
                value={value}
                onChange={onInputChange}
            />
        </>
    )
};

export default InputWithLabel;