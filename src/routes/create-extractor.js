import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { Icon } from '@fluentui/react/lib/Icon';
import { Navbar } from '../ui-components/navbar';
import { useState } from 'react';
import { getPreTrainedSchema } from '../data/pre_trained_schema';
import callToaster from '../helper/CallToaster';
import callLoading from '../helper/CallLoading';

const PageWrapper = styled.div`
    padding: 32px;
    width: 100%;
    background: #FAF9F8;
    overflow-y: scroll;

    h3 {
        font-weight: normal;
    }
`
const SolutionsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    gap: 20px;
    align-content: start;
    transform: translateY(0);
    animation: fadeAnimation 500ms 1;

    @keyframes fadeAnimation {
        0% {
            transform: translateY(100px);
        }
        100% {
            transform: translateY(0);
        }
      }
`
const SolutionCard = styled.div`
    border: 1px solid #e1e1e1;
    padding: 16px;
    min-height: 250px;
    width: calc(50% - 44px);
    max-width: 400px;
    height: fit-content;
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

export default function CreateExtractor() {
    const navigate = useNavigate();
    const MyIcon = (props) => <Icon iconName={props.IconName} className={props.ClassName}/>;

    const createPreBuiltExtractor = (e) => {
        //generate new extractor id
        const existingCount = JSON.parse(sessionStorage.getItem("extractorIdCount"))? JSON.parse(sessionStorage.getItem("extractorIdCount")) : 0;
        const newCount = existingCount + 1
        sessionStorage.setItem("extractorIdCount", JSON.stringify(newCount));
        const newID = '00' + newCount
        //generate extractor type icon
        let icon;
        //get schema
        const allSchema = getPreTrainedSchema()
        //get selected extractor type
        const extractorType = e.currentTarget.getAttribute('type')
        //find the matching schema
        const schema = allSchema.filter(schema => schema.extractorType === extractorType)
        const PreTrainedContent = schema[0].PreTrainedFields

        if (extractorType === 'Receipt' || extractorType === 'Credit Card Slip' || extractorType === 'Digital Payment Slip') {
            icon = 'ShoppingCart';
          } else if (extractorType === 'ID card' || extractorType === 'Passport' || extractorType === 'Address Proof') {
            icon = 'ContactCard';
          } else if (extractorType === 'Invoice' || extractorType === 'Bank Statement') {
            icon = 'Bank';
          } else if (extractorType === 'Bill of Lading' || extractorType === 'Airway Bill' || extractorType === 'Shipment Label' ) {
            icon = 'Product';
          } else if (extractorType === 'Business Registration' || extractorType === 'Food License') {
            icon = 'Lightbulb';
          }

          const today = new Date();
          const day = today.getDate();
          const month = today.getMonth() + 1; // Note: January is 0
          const year = today.getFullYear();
          const newDate = `${day}/${month}/${year}`

        //generate extractor details
        const extractorDetails = {
            extractorID: newID,
            extractorName: extractorType,
            extractorIcon: icon,
            extractorType: 'Pre-Trained Extractor',
            lastEditDate: newDate,
            PreTrainedFields: PreTrainedContent,
            CustomFields: []
        }

        const oldArray = JSON.parse(sessionStorage.getItem("allExtractorContent"));
        const newArray = [...oldArray, extractorDetails]

        const extractorSamplePool = {
            extractorID: newID,
            samples: []
          }
  
        const oldSampleArray = JSON.parse(sessionStorage.getItem('allFSLSampleContent'));
        const newSampleArray = [...oldSampleArray, extractorSamplePool]

        sessionStorage.setItem("allExtractorContent", JSON.stringify(newArray));
        sessionStorage.setItem("allFSLSampleContent", JSON.stringify(newSampleArray));

        sessionStorage.setItem("selectedExtractorID", JSON.stringify(newID));

        callLoading('Creating Extractor', navigate, '../extractors/extractor')
    }

    const createCustomExtractor = (e) => {
        const type = e.currentTarget.getAttribute('type')
        sessionStorage.setItem("selectedExtractorType", JSON.stringify(type));
        navigate('/onboarding-custom')
    }

    //page composition
    return <>
        <Navbar />
        <PageWrapper>
            <h3>Select a Solution</h3>
            <SolutionsWrapper>
            <SolutionCard className='kyc-color'>
                <MyIcon IconName='ContactCard'/>
                <h3>KYC Solutions</h3>
                <Border />
                <p>select a solution</p>
                <div className='card-inner-wrapper'>
                    <Solution onClick={(e) => createPreBuiltExtractor(e)} type='ID card'>ID card<MyIcon IconName='Forward'/></Solution>
                    <Solution onClick={(e) => createPreBuiltExtractor(e)} type='Passport'>Passport<MyIcon IconName='Forward'/></Solution>
                    <Solution onClick={(e) => createPreBuiltExtractor(e)} type='Address Proof'>Address Proof<MyIcon IconName='Forward'/></Solution>
                </div>
            </SolutionCard>
            <SolutionCard className='mall-color'>
                <MyIcon IconName='ShoppingCart'/>
                <h3>Shopping Mall Solutions</h3>
                <Border />
                <p>select a solution</p>
                <div className='card-inner-wrapper'>
                    <Solution onClick={(e) => createPreBuiltExtractor(e)} type='Receipt'>Receipt<MyIcon IconName='Forward'/></Solution>
                    <Solution onClick={(e) => createPreBuiltExtractor(e)} type='Credit Card Slip'>Credit Card Slip<MyIcon IconName='Forward'/></Solution>
                    <Solution onClick={(e) => createPreBuiltExtractor(e)} type='Digital Payment Slip'>Digital Payment Slip<MyIcon IconName='Forward'/></Solution>
                </div>
            </SolutionCard>
            <SolutionCard className='finance-color'>
                <MyIcon IconName='Bank'/>
                <h3>Finance Related</h3>
                <Border />
                <p>select a solution</p>
                <div className='card-inner-wrapper'>
                    <Solution onClick={(e) => createPreBuiltExtractor(e)} type='Invoice'>Invoice<MyIcon IconName='Forward'/></Solution>
                    <Solution onClick={(e) => createPreBuiltExtractor(e)} type='Bank Statement'>Bank Statement<MyIcon IconName='Forward'/></Solution>
                </div>
            </SolutionCard>
            <SolutionCard className='logistics-color'>
                <MyIcon IconName='Product'/>
                <h3>Logistics Related</h3>
                <Border />
                <p>select a solution</p>
                <div className='card-inner-wrapper'>
                    <Solution onClick={(e) => createPreBuiltExtractor(e)} type='Bill of Lading'>Bill of Lading<MyIcon IconName='Forward'/></Solution>
                    <Solution onClick={(e) => createPreBuiltExtractor(e)} type='Airway Bill'>Airway Bill<MyIcon IconName='Forward'/></Solution>
                    <Solution onClick={(e) => createPreBuiltExtractor(e)} type='SHipment Label'>Shipment Label<MyIcon IconName='Forward'/></Solution>
                </div>
            </SolutionCard>
            <SolutionCard className='other-color'>
                <MyIcon IconName='Lightbulb'/>
                <h3>Other Common Solutions</h3>
                <Border />
                <p>select a solution</p>
                <div className='card-inner-wrapper'>
                    <Solution onClick={(e) => createPreBuiltExtractor(e)} type='Business Registration'>Business Registration<MyIcon IconName='Forward'/></Solution>
                    <Solution onClick={(e) => createPreBuiltExtractor(e)} type='Food License'>Food License<MyIcon IconName='Forward'/></Solution>
                </div>
            </SolutionCard>
            <SolutionCard className='custom-color'>
                <MyIcon IconName='Repair'/>
                <h3>Build A Custom Solution</h3>
                <div className='card-inner-wrapper'>
                    <Solution onClick={(e) => createCustomExtractor(e)} type='Custom'>Start Building a Custom Model<MyIcon IconName='Forward'/></Solution>
                </div>
            </SolutionCard>
            </SolutionsWrapper>
        </PageWrapper>
    </>
}