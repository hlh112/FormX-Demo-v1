import styled from "styled-components";
import { Icon } from '@fluentui/react/lib/Icon';

const Button = styled.button`
    border: 1px solid #FFD633;
    background: #FFD633;
    padding: 8px 12px;
    border-radius: 2px;
    transition: 500ms ease 0s;
    cursor: pointer;
    font-size: 12px;
    min-width: fit-content;
    box-sizing: border-box;
    white-space: nowrap;
    letter-spacing: 0.3px;

    &:hover {
        border: 1px solid #d4af1b;
        background: #d4af1b;
        border-radius: 4px;
        transform: scale(.95);
    }
    
    i {
        padding-right: 8px;
        vertical-align: middle;
    }
`

const Borderbutton = styled.button`
    border: 1px solid #e1e1e1;
    padding: 8px 12px;
    border-radius: 2px;
    transition: 500ms ease 0s;
    cursor: pointer;
    font-size: 12px;
    min-width: fit-content;
    box-sizing: border-box;
    white-space: nowrap;
    letter-spacing: 0.3px;

    &:hover {
        border-radius: 4px;
        transform: scale(.95);
    }
    
    i {
        padding-right: 8px;
        vertical-align: middle;
    }
`



export function YellowButtonWithIconLeft(props) {
    const MyIcon = () => <Icon iconName={props.iconName} />;
    return <Button><MyIcon />{props.text}</Button>
}

export function YellowButton(props) {
    return <Button>{props.text}</Button>
}

export function BorderButtonWithIconLeft(props) {
    const MyIcon = () => <Icon iconName={props.iconName} />;
    return <Borderbutton><MyIcon />{props.text}</Borderbutton>
}

export function BorderButton(props) {
    return <Borderbutton>{props.text}</Borderbutton>
}