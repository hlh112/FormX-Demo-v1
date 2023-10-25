//import utilities
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Icon } from '@fluentui/react/lib/Icon';
import { YellowButton } from '../ui-components/button';
import callLoading from '../helper/CallLoading';

const InfoBar = styled.div`
    background: #2a2a2a;
    height: 100%;
    color: white;
    width: 40%;

    div {
        padding: 30px 30px;
        height: 100%;

        img {
            position: absolute;
            bottom: 30px;
        }
    }

    h1 {
        font-size: 36px;
        font-weight: normal;
    }

    p {
        opacity: .7;
        font-size: 16px;
        line-height: 1.5;
    }
`
const PageWrapper = styled.div`
    padding: 32px;
    width: 100%;
    background: #FAF9F8;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const FormWrapper = styled.div`
    width: 50%;
`
const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;

    label {
        font-size: 14px;
    }

    p {
        margin: 4px 0 0 0;
        opacity: .7;
        font-size: 12px;
    }

    input {
        margin-top: 10px;
        height: 28px;
        padding-left: 10px;
    }
`
const RegisterWrapper = styled.div`
    background: white;
    border: 1px solid #e1e1e1;
    padding: 20px 20px 30px 20px;
    display: flex;
    flex-direction: column;
    text-align: center;

    button {
        width: 100%;
        margin-top: 14px;
    }
    
    input {
        margin-top: 10px;
        height: 28px;
        padding-left: 10px;
    }
    h3 {
        margin: 12px 0 12px 0;
    }

    p {
        font-size: 12px;
        opacity: .5;
        margin-top: 0px;
    }
`

export default function Login(props) {

    const navigate = useNavigate()
    const [signupStatus, setSignupStatus] = useState(false)

    useEffect(() => {
        document.querySelector('#email')?.focus()
        document.querySelector('#teamname')?.focus()
    })
    const signUp = () => {
        setSignupStatus(true)
    }
    //page composition
    return <>
        {signupStatus===false?
        <PageWrapper style={{marginTop: '-100px', background:'radial-gradient(farthest-corner at 50% 50%, #B3F0E8 0%, #fdfdfd 60%)'}}>
            <RegisterWrapper>
            <h3>Sign Up to FormX</h3>
            <p>Hello Tester! Just enter a dummy email to pretend like you are signing up.</p>
            <input id='email' type='text' placeholder='Email Address'></input>
            <div onClick={()=> callLoading('Signing-up...', signUp)}><YellowButton text='Sign Up' /></div>
            </RegisterWrapper>
            <img style={{position:'absolute', bottom:'50px'}} src='/../img/formx_logo.svg' alt='' />
        </PageWrapper>
        : ''}
        {signupStatus===true? <>
            <InfoBar>
                <img src='/../img/onboarding-graphic.svg' alt='' />
                <div>
                    <h1>Start creating a FormX account</h1>
                    <p>Simply provide us with some basic info to setup your account.</p>
                    <img src='/../img/formx-white.svg' alt='' />
                </div>
            </InfoBar>
            <PageWrapper>
                <FormWrapper>
                    <InputWrapper>
                        <label>Team Name*</label>
                        <p>You can later on invite your colleagues to this team you create. You can always change the name whenever you see fit, no pressure!</p>
                        <input id='teamname' type='text' placeholder='Team Name'></input>
                    </InputWrapper>
                    <InputWrapper>
                        <label>Company Name</label>
                        <input id='companyname' type='text' placeholder='Company Name'></input>
                    </InputWrapper>
                    <div onClick={(e)=> navigate('/onboarding')} style={{marginTop:'20px', float: 'right'}}><YellowButton text='Next, Explore FormX Solutions'/></div>
                </FormWrapper>
            </PageWrapper>
        </>
        :''}
    </>    
}