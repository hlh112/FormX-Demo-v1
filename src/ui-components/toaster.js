import styled from "styled-components";

const ToasterWrapper = styled.div`
    padding: 15px;
    width: fit-content;
    min-width: 200px;
    background: white;
    box-shadow: 2px 5px 20px #0000000f;
    text-align: left;
    border-radius: 3px;
    position: absolute;
    top: 35px;
    right: -400px;
    z-index: 1000;
    font-size: 14px;
    transition: all 500ms ease 0s;
    opacity: 0;
    visibility: hidden;

    &.green{ 
        color: #25d0ab;
        border-left: 3px solid #25d0ab;
    }
    &.red{ 
        color: red;
        border-left: 3px solid red;
    }
    &.blue{ 
        color: blue;
        border-left: 3px solid blue;
    }
    &.show{
        right: 35px;   
        opacity: 1;
        visibility: visible;
    }
`

export function Toaster(props) {
    return <ToasterWrapper id='toasterBox'></ToasterWrapper>
}