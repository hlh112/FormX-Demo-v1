import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { Icon } from '@fluentui/react/lib/Icon';
import { getFieldsSchema } from '../data/field_schema';
import { getSampleData } from '../data/fsl_sample';

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
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    gap: 20px;
    background: #FAF9F8;
    overflow-y: scroll;
    align-content: start;
`
const SolutionCard = styled.div`
    border: 1px solid #e1e1e1;
    padding: 16px;
    min-height: 250px;
    height: fit-content;
    width: calc(50% - 44px);
    position: relative;

    &.kyc-color{
        background: radial-gradient(farthest-corner at 450px 350px, #F0EDB3 0%, #fdfdfd 60%);
        i {
            color: #DCDAA7;
        }
    }
    &.mall-color{
        background: radial-gradient(farthest-corner at 450px 350px, #BFF0B3 0%, #fdfdfd 60%);
        i {
            color: #ABDCA7;
        }
    }
    &.finance-color{
        background: radial-gradient(farthest-corner at 450px 350px, #F0D7B3 0%, #fdfdfd 60%);
        i {
            color: #F5CC8D;
        }
    }
    &.logistics-color{
        background: radial-gradient(farthest-corner at 450px 350px, #C6B3F0 0%, #fdfdfd 60%);
        i {
            color: #CFBFF5;
        }
    }
    &.other-color{
        background: radial-gradient(farthest-corner at 450px 350px, #B3C0F0 0%, #fdfdfd 60%);
        i {
            color: #8FA7E6;
        }
    }
    &.custom-color{
        background: radial-gradient(farthest-corner at 450px 350px, #B3F0E8 0%, #fdfdfd 60%);
        i {
            color: #A7DCD6;
        }
    }

    h3 {
        font-size: 14px;
        font-weight: normal;
    }

    p {
        font-size: 12px;
        color: 2a2a2a;
        opacity: .4;
        margin-top: 4px;
        margin-bottom: 30px;
        float: right;
    }

    i {
        font-size: 28px;
    }

    .card-inner-wrapper {
        position: absolute;
        bottom: 12px;
        width: calc(100% - 32px);

        i {
            color: #323130;
        }
    }
`
const Border = styled.div`
    border: 1px solid #e1e1e1;
    margin-top: 28px;
`
const Solution = styled.div`
    display: flex;
    gap: 14px;
    align-items: center;
    padding: 4px;
    transition: 500ms ease 0s;
    cursor: pointer;
    background: ;
    border-radius: 2px;
    margin-bottom: 8px;
    justify-content: end;

    &:hover {
        padding-right: 16px;
        background: rgba(0,0,0,.05);
    }

    i {
        font-size: 14px;
    }
`

export default function Onboarding() {
    const navigate = useNavigate();
    const MyIcon = (props) => <Icon iconName={props.IconName} className={props.ClassName}/>;

    const selectExtractor = (e) => {
        const type = e.currentTarget.getAttribute('type')
        sessionStorage.setItem("selectedExtractorType", JSON.stringify(type));
        type==='Custom'? navigate('/onboarding-custom') : navigate('/onboarding-test')
    }

    useEffect(() => {
        sessionStorage.setItem("allExtractorContent", JSON.stringify(getFieldsSchema()));
        sessionStorage.setItem("allFSLSampleContent", JSON.stringify(getSampleData()));
    })

    //page composition
    return <>
        <InfoBar>
            <img src='/../img/onboarding-graphic.svg' alt='' />
            <div>
                <h1>What specific solution are you seeking?</h1>
                <p>Take a look at our Pre-built solutions. Select the one that matches your use case and start extracting instantly.</p>
                <img src='/../img/formx-white.svg' alt='' />
            </div>
        </InfoBar>
        <PageWrapper>
            <SolutionCard className='kyc-color'>
                <MyIcon IconName='ContactCard'/>
                <h3>KYC Solutions</h3>
                <Border />
                <p>select a solution</p>
                <div className='card-inner-wrapper'>
                    <Solution onClick={(e) => selectExtractor(e)} type='ID card'>ID card<MyIcon IconName='Forward'/></Solution>
                    <Solution onClick={(e) => selectExtractor(e)} type='Passport'>Passport<MyIcon IconName='Forward'/></Solution>
                    <Solution onClick={(e) => selectExtractor(e)} type='Address Proof'>Address Proof<MyIcon IconName='Forward'/></Solution>
                </div>
            </SolutionCard>
            <SolutionCard className='mall-color'>
                <MyIcon IconName='ShoppingCart'/>
                <h3>Shopping Mall Solutions</h3>
                <Border />
                <p>select a solution</p>
                <div className='card-inner-wrapper'>
                    <Solution onClick={(e) => selectExtractor(e)} type='Receipt'>Receipt<MyIcon IconName='Forward'/></Solution>
                    <Solution onClick={(e) => selectExtractor(e)} type='Credit Card Slip'>Credit Card Slip<MyIcon IconName='Forward'/></Solution>
                    <Solution onClick={(e) => selectExtractor(e)} type='Digital Payment Slip'>Digital Payment Slip<MyIcon IconName='Forward'/></Solution>
                </div>
            </SolutionCard>
            <SolutionCard className='finance-color'>
                <MyIcon IconName='Bank'/>
                <h3>Finance Related</h3>
                <Border />
                <p>select a solution</p>
                <div className='card-inner-wrapper'>
                    <Solution onClick={(e) => selectExtractor(e)} type='Invoice'>Invoice<MyIcon IconName='Forward'/></Solution>
                    <Solution onClick={(e) => selectExtractor(e)} type='Bank Statement'>Bank Statement<MyIcon IconName='Forward'/></Solution>
                </div>
            </SolutionCard>
            <SolutionCard className='logistics-color'>
                <MyIcon IconName='Product'/>
                <h3>Logistics Related</h3>
                <Border />
                <p>select a solution</p>
                <div className='card-inner-wrapper'>
                    <Solution onClick={(e) => selectExtractor(e)} type='Bill of Lading'>Bill of Lading<MyIcon IconName='Forward'/></Solution>
                    <Solution onClick={(e) => selectExtractor(e)} type='Airway Bill'>Airway Bill<MyIcon IconName='Forward'/></Solution>
                    <Solution onClick={(e) => selectExtractor(e)} type='SHipment Label'>Shipment Label<MyIcon IconName='Forward'/></Solution>
                </div>
            </SolutionCard>
            <SolutionCard className='other-color'>
                <MyIcon IconName='Lightbulb'/>
                <h3>Other Common Solutions</h3>
                <Border />
                <p>select a solution</p>
                <div className='card-inner-wrapper'>
                    <Solution onClick={(e) => selectExtractor(e)} type='Business Registration'>Business Registration<MyIcon IconName='Forward'/></Solution>
                    <Solution onClick={(e) => selectExtractor(e)} type='Food License'>Food License<MyIcon IconName='Forward'/></Solution>
                </div>
            </SolutionCard>
            <SolutionCard className='custom-color'>
                <MyIcon IconName='Repair'/>
                <h3>Build A Custom Solution</h3>
                <div className='card-inner-wrapper'>
                    <Solution onClick={(e) => selectExtractor(e)} type='Custom'>Start Building a Custom Model<MyIcon IconName='Forward'/></Solution>
                </div>
            </SolutionCard>
        </PageWrapper>
    </>    
}