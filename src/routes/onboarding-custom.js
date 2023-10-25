import { useState } from 'react';
import { useNavigate, useHistory } from 'react-router-dom';
import styled from "styled-components";
import { Icon } from '@fluentui/react/lib/Icon';
import { YellowButton } from '../ui-components/button';
import { getFieldsSchema } from "../data/field_schema";
import callLoading from '../helper/CallLoading';
import { getPreTrainedSchema } from '../data/pre_trained_schema';

const PageWrapper = styled.div`
    padding: 32px;
    width: 100%;
    background: #FAF9F8;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const TestWrapper = styled.div`
    background: white;
    border: 1px solid #e1e1e1;
    padding: 20px 20px 30px 20px;
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 640px;
    box-sizing: border-box;
    border-radius: 4px;

    h3 {
        color: #605E5C;
        margin: 12px 0;
    }
    strong {
        color: #25D0B1;
    }
    p {
        font-size: 12px;
        opacity: .5;
        margin: 0px;
        line-height: 1.5;
    }
`
const InputWrapper = styled.div`
    border: 1px solid #25D0B1;
    padding: 4px;
    background: #white;
    border-radius: 4px;
    display: flex;
    gap: 10px;
    height: fit-content;
    margin-top: 12px;
    margin-bottom: 12px;

    input {
        width: 100%;
        border: none;
        padding-left: 8px;

        &:focus {
            outline: none;
        }
    }
`
const ToolBtn = styled.div`
    display: inline-block;
    font-size: 12px;
    color: #201F1E;
    transition: 500ms ease 0s;
    cursor: pointer;
    margin-bottom: 8px;
    width: 640px;

    &:hover {
        color: #53B2a1;
    }
    
    i {
        margin-right: 6px;
        font-size: 10px;
        color: #53B2A1;
    }
`
const ChipsWrapper = styled.div`
    border: 1px solid #e1e1e1;
    background: #faf9f8;
    padding: 8px;
    height: 320px;
    overflow-y: scroll;
    display: flex;
    gap: 4px;
    flex-wrap: wrap;
    border-radius: 4px;
    margin-bottom: 12px;
    align-content: flex-start;
`
const Chip = styled.div`
    background: white;
    border-radius: 4px;
    padding: 8px 10px;
    font-size: 12px;
    width: fit-content;
    height: fit-content;
    cursor: pointer;
    display: flex;
    gap: 8px;
    border: 1px solid #e1e1e1;
    align-items: center;
    transition: 500ms ease 0s;

    &:hover {
        background: #eee;
    }

    i {
        color: #53B2A1;
        font-size: 12px;
    }
`

export default function OnboardingCustom() {
    //Basic utilities
    const navigate = useNavigate();
    const MyIcon = (props) => <Icon iconName={props.IconName} className={props.ClassName}/>;

    //get all pre-built extractor schema
    const allSchema = getPreTrainedSchema()
    //get selected extractor type
    const extractorType = JSON.parse(sessionStorage.getItem("selectedExtractorType"));
    //find the matching schema
    const schema = allSchema.filter(schema => schema.extractorType === extractorType)
    const CustomContent = schema[0].CustomFields
    const [currentCustomContent, setCustomContent] = useState(CustomContent)

    //Capture Doc Type
    const [DocType, SetDocType] = useState('')
    const generateFields = () => {
        const docTypeValue = document.querySelector('#docType').value
        SetDocType(docTypeValue)
        document.querySelector('#docType').value = ''
    }
    
    //Add or Remove Fields
    const addNewField = (e) => {
        const inputValue = document.querySelector('#fieldName').value

        const formattedValue = inputValue.trim().replace(/\s+/g, '_').toLowerCase();

        const newFieldObj = {
            field_name: formattedValue,
            field_type: 'single-line text'
        }

        const newCustomContent = [...currentCustomContent, newFieldObj]
        setCustomContent(newCustomContent)

        sessionStorage.setItem("newCustomContent", JSON.stringify(newCustomContent));
        
        document.querySelector('#fieldName').value = ''
    }

    const removeChip = (e, value) => {
        const newCustomContent = currentCustomContent.filter(content => content.field_name !== value)
        setCustomContent(newCustomContent)
        sessionStorage.setItem("newCustomContent", JSON.stringify(newCustomContent));
    }
    //Create Extractor
    const createExtractor = () => {
        const existingCount = JSON.parse(sessionStorage.getItem("extractorIdCount"))? JSON.parse(sessionStorage.getItem("extractorIdCount")) : 0;
        const newCount = existingCount + 1
        sessionStorage.setItem("extractorIdCount", JSON.stringify(newCount));
        const newID = '00' + newCount

        const today = new Date();
            const day = today.getDate();
            const month = today.getMonth() + 1; // Note: January is 0
            const year = today.getFullYear();
            const newDate = `${day}/${month}/${year}`

        //generate extractor details
        const extractorDetails = {
            extractorID: newID,
            extractorName: DocType,
            extractorIcon: 'Repair',
            extractorType: 'Custom Extractor',
            lastEditDate: newDate,
            PreTrainedFields: [],
            CustomFields : currentCustomContent
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

        callLoading('Finish Setting Up Your Account...', navigate, '../extractors')
    }

    //Go Back
    const goBack = () => {
        SetDocType('')
        navigate(-1)
    }

    //page composition
    return <>
        <PageWrapper style={{marginTop: '-100px', background:'radial-gradient(farthest-corner at 50% 50%, #B3F0E8 0%, #fdfdfd 60%)'}}>
            <ToolBtn onClick={() => goBack()}><MyIcon IconName='Back'/>Back</ToolBtn>
            {DocType? <TestWrapper>
                <h3>Are the <strong>Fields</strong> below what you want to extract?</h3>
                <p>Review and adjust the fields you want to extract using FormX</p>
                <InputWrapper>
                    <input id='fieldName' type='text' placeholder='Enter a field name'></input>
                    <div onClick={(e) => addNewField(e)}><YellowButton text='Add New Fields' /></div>
                </InputWrapper>
                <ChipsWrapper>
                    {currentCustomContent.map((content, key) => {
                        return <Chip>{content.field_name}<div style={{height:'12px'}} onClick={(e) => removeChip(e, content.field_name)}><MyIcon IconName='Cancel'/></div></Chip>
                    })}
                </ChipsWrapper>
                <div style={{textAlign:'right'}} onClick={createExtractor}><YellowButton text='Proceed with these fields' /></div>
            </TestWrapper>
            : <TestWrapper>
                <h3>What type of <strong>Document</strong> are you extracting?</h3>
                <p>Please provide a descriptive and meaningful document name in full form<br></br>e.g. use Business Registration' instead of 'BR’</p>
                <InputWrapper>
                    <input id='docType' type='text' placeholder='Enter the document type you want to process..'></input>
                    <div onClick={() => callLoading('Generating Fields...', generateFields)}><YellowButton text='Generate Fields' /></div>
                </InputWrapper>
            </TestWrapper>}
            <img style={{position:'absolute', bottom:'50px'}} src='/../img/formx_logo.svg' alt='' />
        </PageWrapper>
    </>
}