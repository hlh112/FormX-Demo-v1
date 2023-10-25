import styled from "styled-components";
import { YellowButton, BorderButton } from "./button";

const BubbleWrapper = styled.div`
    background: white;
    padding: 16px;
    box-shadow: 2px 5px 40px #0000001a;
    position: absolute;
    ${props => props.xPosition};
    ${props => props.yPosition};
    height: fit-content;
    width: 320px;
    z-index: 1000;
    display: none;

    &.show {
        display: block;
    }

    &:before {
        content:"";
        border-style: solid;
        position: absolute;
        ${props => props.arrow==='left'? 'border-width: 10px 15px 10px 0;' : ''};
        ${props => props.arrow==='left'? 'left: -15px' : ''};
        ${props => props.arrow==='left'? 'border-color: transparent #fff transparent transparent' : ''};

        ${props => props.arrow==='right'? 'border-width: 10px 0 10px 15px;' : ''};
        ${props => props.arrow==='right'? 'right: -15px' : ''};
        ${props => props.arrow==='right'? 'border-color: transparent transparent transparent #fff' : ''};

        ${props => props.arrow==='bottom'? 'border-width: 15px 10px 0 10px;' : ''};
        ${props => props.arrow==='bottom'? 'bottom: -15px' : ''};
        ${props => props.arrow==='bottom'? 'border-color: #fff transparent transparent transparent' : ''};

        ${props => props.arrow==='top'? 'border-width: 0 10px 15px 10px;' : ''};
        ${props => props.arrow==='top'? 'top: -15px' : ''};
        ${props => props.arrow==='top'? 'border-color: transparent transparent #fff transparent' : ''};

        ${props => props.arrow==='topRight'? 'border-width: 0 10px 15px 10px;' : ''};
        ${props => props.arrow==='topRight'? 'top: -15px' : ''};
        ${props => props.arrow==='topRight'? 'right: 15px' : ''};
        ${props => props.arrow==='topRight'? 'border-color: transparent transparent #fff transparent' : ''};
    }
`
const BubbleContent = styled.div`

    margin-bottom: 20px;

    h1 {
        font-size: 16px;
        font-weight: normal;
        margin: 6px 0 8px 0;
    }
    p {
        font-size: 12px;
        opacity: .5;
        margin: 8px 0 0 0;
        line-height: 1.5;
    }
`
const BubbleAction = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    .step-count {
        font-size: 12px;
        opacity: .5;
        margin: 0;
    }
`
const ButtonWrapper = styled.div`
    display: flex;
    gap: 6px;
`

export default function TeachingBubble(props) {
    //page composition
    return <BubbleWrapper arrow={props.arrow} xPosition={props.xPosition} yPosition={props.yPosition} className={props.className}>
        <BubbleContent>
            <h1>{props.title}</h1>
            <p>{props.content}</p>
        </BubbleContent>
        <BubbleAction>
            <p className='step-count'>{props.count}</p>
            <ButtonWrapper>
                {props.secondaryAction? <div><BorderButton text={props.secondaryAction} /></div> : ''}
                <div onClick={props.onClick}><YellowButton text={props.primaryAction} /></div>
            </ButtonWrapper>
        </BubbleAction>
    </BubbleWrapper>   
}