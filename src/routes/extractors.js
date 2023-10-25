import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import {Navbar} from '../ui-components/navbar';
import callToaster from "../helper/CallToaster";

import TeachingBubble from '../ui-components/teachingBubble';
import { Icon } from '@fluentui/react/lib/Icon';
import { YellowButtonWithIconLeft } from '../ui-components/button';
import { useEffect, useState } from 'react';
import { getFieldsSchema } from "../data/field_schema";
import { getSampleData } from "../data/fsl_sample";

const RateLimitBanner = styled.div`
    padding: 6px 40px;
    background: #F6F8FA;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
        margin-right: 16px;
    }
`

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`
const InnerPageWrapper = styled.div`
    padding: 12px 40px 45px 40px;
    overflow-y: scroll;
    height: 100%;
`

const PageHead = styled.div`
    margin-bottom: 20px;

    h1 {
        font-size: 28px;
    }
`

const ExtractorsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
    flex-wrap: wrap;
`

const ExtractorCard = styled.div`
    border-radius: 16px;
    border: solid 1px #eaeaea;
    ${props => props.extractorType === 'ShoppingCart'? 'background: radial-gradient(farthest-corner at 390px 200px, #BFF0B3 0%, #fdfdfd 60%)' : ''};
    ${props => props.extractorType === 'Repair'? 'background: radial-gradient(farthest-corner at 390px 200px, #B3F0E8 0%, #fdfdfd 60%)' : ''};
    ${props => props.extractorType === 'Bank'? 'background: radial-gradient(farthest-corner at 390px 200px, #F0D7B3 0%, #fdfdfd 60%)' : ''};
    ${props => props.extractorType === 'Product'? 'background: radial-gradient(farthest-corner at 390px 200px, #C6B3F0 0%, #fdfdfd 60%)' : ''};
    ${props => props.extractorType === 'Lightbulb'? 'background: radial-gradient(farthest-corner at 390px 200px, #B3C0F0 0%, #fdfdfd 60%)' : ''};
    ${props => props.extractorType === 'ContactCard'? 'background: radial-gradient(farthest-corner at 390px 200px, #F0EDB3 0%, #fdfdfd 60%)' : ''};
    box-shadow: 2px 5px 20px #0000000f;
    padding: 20px;
    transition: 500ms ease 0s;
    max-width: 370px;
    width: 370px;
    cursor: pointer;
    position: relative;
    box-sizing: border-box;

    &.create-extractor-button {
       background: #f8f8f8; 
       box-shadow: none;
       display: flex;
       flex-direction: column;
       justify-content: center;
       align-items: center;
       transform: scale(1);

       &:hover {
        background: white;
        border: 1px solid #444;
        transform: scale(.98);
       }

       h3 {
        font-size: 16px;
        margin: 16px 0;
        opacity: .7;
       }
       
       i {
        font-size: 40px;
        margin-top: 16px;
        opacity: .7;
       }


    }

    i {
        font-size: 22px;
        pointer-events: none;
    }

    h3 {
        font-weight: 400;
        margin: 50px 0 20px 0;
        pointer-events: none;
    }

    p {
        display: inline-block;
        font-size: 12px;
        color: #201F1E;
        opacity: .7;
        margin: 0 0 8px 0;
        pointer-events: none;

        &.key {
            width: 110px;
        }
    }

    &:hover {
        box-shadow: none;
        transform: scale(.98);
    }

    .card-details {
        pointer-events: none;
    }
`
const DeleteButton = styled.span`
    position: absolute;
    bottom: 20px;
    right: 20px;
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 2px;
    transition: 500ms ease 0s;

    i {
        font-size: 12px;
        opacity: .5;
    }

    &:hover {
        background: #0001; 

        i {
            opacity: .7;
        }
    }
`

const contactUs = () => {
    callToaster('green', 'We will come back to you shortly! Stay tuned:)')
}

export default function Extractors() {
    //basic utilities
    const navigate = useNavigate();
    const MyIcon = (props) => <Icon iconName={props.IconName} className={props.ClassName}/>;

    useEffect(() => {
        //sessionStorage.setItem("allExtractorContent", JSON.stringify(getFieldsSchema()));
        sessionStorage.setItem("allSampleData", JSON.stringify(getSampleData()));
    })

    //const extractor = getFieldsSchema()
    const extractor = JSON.parse(sessionStorage.getItem("allExtractorContent"));

    //Selecting an extractor
    const selectExtractor = (e) => {
        // Trigger navigation to a specific route
        const path = e.target.getAttribute('href')
        navigate(path);
        sessionStorage.setItem("selectedExtractorID", JSON.stringify(e.target.getAttribute('extractorID')));  
    };

    const deleteExtractor = (e) => {
        const thisExtractorID =  e.currentTarget.parentNode.getAttribute('extractorID')

        const allExtractor = JSON.parse(sessionStorage.getItem("allExtractorContent"));
        const newArray = allExtractor.filter(extractor => extractor.extractorID !== thisExtractorID)
        sessionStorage.setItem("allExtractorContent", JSON.stringify(newArray));

        const allFSLSamplePool = JSON.parse(sessionStorage.getItem("allFSLSampleContent"));
        const newSampleArray = allFSLSamplePool.filter(extractor => extractor.extractorID !== thisExtractorID)
        sessionStorage.setItem("allFSLSampleContent", JSON.stringify(newSampleArray));
    }

    //Teaching Bubble Handlings
    const [tutoiralCompleted, setTutoiralCompleted ] = useState(() => {
        const storage = JSON.parse(sessionStorage.getItem("extractorsTutorialCompleted"));
        if (storage) { 
            return storage 
        } else { 
            return false 
        }
    });

    useEffect(() => {
        const bubble = document.querySelector('.stepOne')
        if (tutoiralCompleted===false) {
            bubble?.classList.add('show')
        }
    },[])

    const dismissBubble = () => {
        const bubbles = document.querySelectorAll('.bubble')
        bubbles.forEach(bubble => {
            bubble.classList.remove('show')
        })
        sessionStorage.setItem("extractorsTutorialCompleted", JSON.stringify(true));
    }

    //page composition
    return <>
        <Navbar />
        <PageWrapper>
        <RateLimitBanner>
                <p>Free plan users can use up to 100 API calls. Upgrade to get unlimited usage.</p>
                <div onClick={contactUs}><YellowButtonWithIconLeft iconName='Headset' text='Contact FormX Team'/></div>
        </RateLimitBanner>
        <InnerPageWrapper>
            <PageHead>
                <h1>Extractors</h1>
            </PageHead>
            <ExtractorsWrapper>
                <ExtractorCard className='create-extractor-button' onClick={() => navigate('../create-extractor')}>
                    <MyIcon IconName='AddTo'/>
                    <h3>Create New Extractor</h3>
                </ExtractorCard>
                {extractor.map((each, index) => {
                    return <ExtractorCard key={index} className='extractor-card' href='./extractor' extractorID={each.extractorID} onClick={selectExtractor} extractorType={each.extractorIcon}>
                        <MyIcon IconName={each.extractorIcon}/>
                        <h3>{each.extractorName}</h3>
                        <div className='card-details'><p className='key'>Extractor Type</p><p>{each.extractorType}</p></div>
                        <div className='card-details'><p className='key'>Last edited</p><p>{each.lastEditDate}</p></div>
                        <DeleteButton onClick={(e) => deleteExtractor(e)}><MyIcon IconName='Delete'/></DeleteButton>
                        <TeachingBubble title='This is the extactor you just created' content='This extractor contains the solution you just selected. You can adjust and fine tune the extraction performance inside.' count='' arrow='top' xPosition='left: 0px' yPosition='bottom: -200px' primaryAction='Got it' secondaryAction='' className='stepOne bubble' onClick={dismissBubble} />
                </ExtractorCard>
                })}
            </ExtractorsWrapper>
        </InnerPageWrapper>
        </PageWrapper>
    </>    
}