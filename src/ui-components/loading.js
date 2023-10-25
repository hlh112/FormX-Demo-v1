import styled from "styled-components";

const Overlay = styled.div`
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.2);
    position: absolute;
    color: #25D0B1;
    font-size: 14px;
    justify-content: center;
    align-items: center;
    animation: flashAnimation 1s infinite;
    display: none;
    z-index: 1000;

    @keyframes flashAnimation {
        0% {
          color: #25D0B1;
        }
        50% {
          color: #A3EADD;
        }
        100% {
          color: #25D0B1;
        }
      }

    div {
        background: white;
        border-radius: 6px;
        padding: 10px 16px;
        width: fit-content;
    }
    &.show {
        display: flex;
    }
`

export default function LoadingState() {
    return<Overlay className='loading-overlay'>
        <div className='loading-overlay-content'></div>
    </Overlay>
}