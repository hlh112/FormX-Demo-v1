import styled from "styled-components";
import { Link } from "react-router-dom";
import { Icon } from '@fluentui/react/lib/Icon';
import callToaster from "../helper/CallToaster";
import { useState } from "react";

const NavbarWrapper = styled.aside`
    background: #f8f8f8;
    height: 100vh;
    width: 210px;
    min-width: 210px;
    padding: 20px 0px;
    border-right: 1px solid #e1e1e1;
    box-sizing: border-box;
    position: relative;
    transition: 300ms ease 0s;
    z-index: 999;
`
const NavbarWrapperCollapsed = styled.aside`
    background: #f8f8f8;
    height: 100vh;
    width: 60px;
    min-width: 60px;
    border-right: 1px solid #e1e1e1;
    box-sizing: border-box;
    position: relative;
    transition: 300ms ease 0s;
    z-index: 999;
`

const NavbarSection = styled.div`
    margin-bottom: 20px;

    &.last-section {
        position: absolute;
        bottom: 20px;
        margin-bottom: 0;
        width: 100%;
    }
`

const NavbarButton = styled.div`
    transition: 500ms ease 0s;
    position: relative;
    font-size: 14px;
    display: block;
    padding: 0px 20px;

    img {
        padding: 12px 0px;
    }
    
    a {
        transition: 500ms ease 0s;
        text-decoration: none;
        color: #5e5e5e;
        display: block;
        padding: 12px 0px;
        border-radius: 4px;
        text-wrap: nowrap;

        &:hover {
            background: #e9e9e9;
            padding: 12px 0px 12px 8px;
        }

        &.active {
            color: #09c9a7;
        }
    }

    i {
        vertical-align: middle;
        color: #5e5e5e;
        padding: 0px 16px 0px 0px;
    }
`
const NavbarButtonCollapsed = styled.div`
    transition: 500ms ease 0s;
    position: relative;
    font-size: 14px;
    display: block;
    padding: 0 10px;
    text-align: center;

    * {
        text-align: center;
    }

    img {
        padding: 28px 0px;
    }
    
    a {
        transition: 500ms ease 0s;
        text-decoration: none;
        color: #5e5e5e;
        display: block;
        padding: 12px 0px;
        border-radius: 4px;

        &:hover {
            background: #e9e9e9;
        }

        &.active {
            color: #09c9a7;
        }
    }

    i {
        vertical-align: middle;
        color: #5e5e5e;
    }
`

export function Navbar() {

    const MyIcon = (props) => <Icon iconName={props.IconName} />;

    const NotReady = () => {
        callToaster('red', 'Feature Not Implemented')
    }

    return <>
        <NavbarWrapper>
            <NavbarSection>
                <NavbarButton><img src='/../img/formx_logo.svg' alt='' /></NavbarButton>
            </NavbarSection>
            <NavbarSection>
                <NavbarButton><Link to={'../extractors'}><MyIcon IconName='Home'/>Extractors</Link></NavbarButton>
            </NavbarSection>
            <NavbarSection>
                <div onClick={NotReady}><NavbarButton><Link to={'./#'}><MyIcon IconName='DocumentSearch'/>Detect Documents</Link></NavbarButton></div>
            </NavbarSection>
            <NavbarSection>
                <div onClick={NotReady}><NavbarButton><Link to={'./#'}><MyIcon IconName='People'/>Manage Team</Link></NavbarButton></div>
                <div onClick={NotReady}><NavbarButton><Link to={'./#'}><MyIcon IconName='BarChartVertical'/>Usage</Link></NavbarButton></div>
                <div onClick={NotReady}><NavbarButton><Link to={'./#'}><MyIcon IconName='PaymentCard'/>Biling</Link></NavbarButton></div>
                <div onClick={NotReady}><NavbarButton><Link to={'./#'}><MyIcon IconName='Dictionary'/>API Doc</Link></NavbarButton></div>
            </NavbarSection>
            <NavbarSection className='last-section'>
                <div onClick={NotReady}><NavbarButton><Link to={'./#'}><MyIcon IconName='Help'/>Get Support</Link></NavbarButton></div>
                <div onClick={NotReady}><NavbarButton><Link to={'./#'}><MyIcon IconName='UserOptional'/>Account Settings</Link></NavbarButton></div>
            </NavbarSection>
        </NavbarWrapper>
    </>
}

export function NavbarCollapsed() {

    const MyIcon = (props) => <Icon iconName={props.IconName} />;

    const NotReady = () => {
        callToaster('red', 'Feature Not Implemented')
    }

    return <>
        <NavbarWrapperCollapsed>
            <NavbarSection>
                <NavbarButtonCollapsed><img src='/../img/logo-icon.svg' alt='' /></NavbarButtonCollapsed>
            </NavbarSection>
            <NavbarSection>
                <NavbarButtonCollapsed><Link to={'../extractors'}><MyIcon IconName='Home'/></Link></NavbarButtonCollapsed>
            </NavbarSection>
            <NavbarSection>
                <div onClick={NotReady}><NavbarButtonCollapsed><Link to={'./#'}><MyIcon IconName='DocumentSearch'/></Link></NavbarButtonCollapsed></div>
            </NavbarSection>
            <NavbarSection>
                <div onClick={NotReady}><NavbarButtonCollapsed><Link to={'./#'}><MyIcon IconName='People'/></Link></NavbarButtonCollapsed></div>
                <div onClick={NotReady}><NavbarButtonCollapsed><Link to={'./#'}><MyIcon IconName='BarChartVertical'/></Link></NavbarButtonCollapsed></div>
                <div onClick={NotReady}><NavbarButtonCollapsed><Link to={'./#'}><MyIcon IconName='PaymentCard'/></Link></NavbarButtonCollapsed></div>
                <div onClick={NotReady}><NavbarButtonCollapsed><Link to={'./#'}><MyIcon IconName='Dictionary'/></Link></NavbarButtonCollapsed></div>
            </NavbarSection>
            <NavbarSection className='last-section'>
                <div onClick={NotReady}><NavbarButtonCollapsed><Link to={'./#'}><MyIcon IconName='Help'/></Link></NavbarButtonCollapsed></div>
                <div onClick={NotReady}><NavbarButtonCollapsed><Link to={'./#'}><MyIcon IconName='UserOptional'/></Link></NavbarButtonCollapsed></div>
            </NavbarSection>
        </NavbarWrapperCollapsed>
    </>
}