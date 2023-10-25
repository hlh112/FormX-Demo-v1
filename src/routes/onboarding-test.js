import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { Icon } from '@fluentui/react/lib/Icon';
import { getFieldsSchema } from "../data/field_schema";
import { getExtractedData } from "../data/extracted_data";
import { YellowButton, BorderButton } from '../ui-components/button';
import callToaster from "../helper/CallToaster";
import callLoading from '../helper/CallLoading';
import TeachingBubble from '../ui-components/teachingBubble';
import { getPreTrainedSchema } from '../data/pre_trained_schema';
import FilePicker from '../ui-components/file-picker';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  position: relative;
  height: 100%;
`
const Header = styled.div`
    border-bottom: 1px solid #e1e1e1;
    padding: 20px;

    h3{
        font-size: 24px;
        font-weight: normal;
        margin: 20px 0px 4px 0px;
    }

    p{
        margin: 0;
        font-size: 14px;
        opacity: .5;
    }
`

const EditModeWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
`
const MainWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
`
const SchemaWrapper = styled.div`
    border-right: solid 1px #e1e1e1;
    width: 30%;
    overflow-y: scroll;
    position: relative;
`
const TestingWrapper = styled.div`
  background: #F6FDFC;
  width: 70%;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
  transition: 500ms ease 0s;

  &:hover {
    padding: 30px;
  }
`
const InnerTestingWrapper = styled.div`
  width: 100%;
  border: dashed 2px #25D0B1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h2 {
    color: #25D0B1;
    font-weight: 400;
    margin: 16px 0 0 0;
  }

  p {
    font-size: 14px;
    opacity: .7;
    margin: 6px 0 24px 0;
  }
`
const ModelHead = styled.div`
  background: #F6F8FA;
  font-size: 12px;
  font-weight: 600;
  color: #3D8AA1;
  padding: 12px 12px 12px 20px;
  display: flex;
  gap: 10px;
  justify-content: space-between;

    p {
        margin:0;
    }

    .desc {
        font-weight: 400;
        color: #605E5C;
        margin: 4px 0 0 0;
    }

  .train-model-button {
    font-weight: 400;
    cursor: pointer;
    transition: 500ms ease 0s;

    i {
        margin-left: 8px;
    }

    &:hover {
        opacity: .5;
    }
  }
`
const FieldContainer = styled.div`
  font-size: 12px;
  padding: 12px 20px;
  display: flex;
  justify-content: space-between;
  transition: 500ms ease 0s;
  align-items: center;

  &.display-only {
    opacity: .4;
  }

  .delete-button {
    display: none;
    padding: 0px 1px;
    transition: 500ms ease 0s;

    &:hover {
        color: #791010;
    }
  }

  &.field-container {
    cursor: pointer;

    &:hover {
        background: #f0f0f0;
        padding-left: 28px;

        .delete-button {
            display: block;
        }

        .field-container-field-type {
            display: none;
        }
    }
    }

  &.active {
    background-color: #f0f0f0;
    font-weight: bold;
  }
  
  .green-badge {
    width: 10px;
    height: 10px;
    background: #25D19D;
    border-radius: 2px;
    margin-right: 10px;
  }

  div {
    display: inline-block;
  }

  &:last-child {
    margin-bottom: 24px;
  }

  .field-type {
    opacity: .4;
  }
  .field-container-field-type {
    opacity: .4;
    font-weight: normal;
  }

  .field-container-field-status {
    accent-color: #25D0B1;
  }
`

const Toolbar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: white;
  padding: 10px 20px;
`
const ToolBtn = styled.div`
    margin-right: 20px;
    display: inline-block;
    font-size: 12px;
    color: #201F1E;
    transition: 500ms ease 0s;
    cursor: pointer;

    &:hover {
        color: #53B2a1;
    }
    
    i {
        margin-right: 6px;
        font-size: 10px;
        color: #53B2A1;
    }
`
const TestImageWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100% - 166px);
    overflow: hidden;

    img {
        height: calc(100% - 100px);
        width: fit-content;
    }
`
const Dialog = styled.div`
    position: absolute;
    left: -450px;
    bottom: 20px;
    width: 400px;
    padding: 20px;
    border-left: 3px solid #6888FA;
    box-shadow: 2px 5px 10px #00000025;
    background: white;
    transition: 500ms ease 0s;
    opacity: 0;
    
    h4 {
        margin: 0;
    }
    p {
        font-size: 12px;
        opacity: .5;
        margin: 6px 0 16px 0;
    }
    div {
        margin-bottom: 8px;
        width: fit-content;
    }

    &.show {
        left: 20px;
        opacity: 1;
    }
`

export default function OnboardingTest() {

    //basic utilities
    const navigate = useNavigate();
    const MyIcon = (props) => <Icon iconName={props.IconName} className={props.ClassName}/>;
    //get all pre-built extractor schema
    const allSchema = getPreTrainedSchema()
    //get selected extractor type
    const extractorType = JSON.parse(sessionStorage.getItem("selectedExtractorType"));
    //find the matching schema
    const schema = allSchema.filter(schema => schema.extractorType === extractorType)
    const PreTrainedContent = schema[0].PreTrainedFields

    const [currentPreTrainedContent, setPreTrainedContent] = useState(PreTrainedContent)
    const [extractStatus, setExtractStatus] = useState(false)

    //test extractor related handelings
    const extractedData = getExtractedData()

    const [selectedImage, setSelectedImage] = useState('')
    const [selectedImagPath, setSelectedImagePath] = useState('')
    const [extractedPreTrainedData, setExtractedPreTrainedData] = useState([])
    const [nullPreTrainedData, setNullPreTrainedData] = useState([])
    //const [extractedCustomData, setExtractedCustomData] = useState([])
    //const [nullCustomData, setNullCustomData] = useState([])



    const updateSchema = () => {
        const newPreTrainedFields = Array.from(document.querySelectorAll('.pre-trained-field-container'))
        const newPreTrainedFieldArray = newPreTrainedFields.map(item => {
            const fieldName = item.querySelector('.field-container-field-name').textContent;
            const fieldDefaultName = item.querySelector('.field-container-default-field-name').textContent;
            const fieldStatus = item.querySelector('.field-container-field-status').checked? true : false;
            return {field_name: fieldName, default_field_name: fieldDefaultName, field_status: fieldStatus}
        })
        setPreTrainedContent(newPreTrainedFieldArray)
        //sessionStorage.setItem("newPreTrainedContent", JSON.stringify(newPreTrainedFieldArray));
    }

    const testExtractor = (e) => {
      document.querySelector('.file-picker').classList.add('show')
    }

    const displayTestResults = (selectedImageData) => {

        const sampledata = selectedImageData
        const imgPath = sampledata[0].filePath
        console.log(sampledata[0].filePath, imgPath)
        const PreTrainedResults = sampledata[0].PreTrainedModelResults
        //const CustomResults = sampledata[0].CustomModelResults

        const SelectedPreTrainedContent = currentPreTrainedContent.filter(field =>
              field.field_status === true
        );

        const matchingPreTrainedFields = PreTrainedResults.filter(obj1 =>
          SelectedPreTrainedContent.some(obj2 => obj2.default_field_name === obj1.field_name)
        );

        const nonMatchingPreTrainedFields = SelectedPreTrainedContent.filter(obj1 =>
          PreTrainedResults.every(obj2 => obj2.field_name !== obj1.default_field_name)
        );

        setExtractedPreTrainedData(matchingPreTrainedFields)
        setNullPreTrainedData(nonMatchingPreTrainedFields)
        //setExtractedCustomData(matchingPreTrainedFields)
        //setNullCustomData(nonMatchingPreTrainedFields)
        setSelectedImagePath(imgPath)
        setExtractStatus(true)

        setTimeout(showDialog, 1200)
    }
 
    const resetTest = () => {
        setExtractStatus(false)
    }

    //Create Extractor
    const createExtractor = () => {
        //generate new extractor id
        const existingCount = JSON.parse(sessionStorage.getItem("extractorIdCount"))? JSON.parse(sessionStorage.getItem("extractorIdCount")) : 0;
        const newCount = existingCount + 1
        sessionStorage.setItem("extractorIdCount", JSON.stringify(newCount));
        const newID = '00' + newCount
        //generate extractor type icon
        let icon;

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
          } else if (extractorType === 'Custom') {
            icon = 'Repair';
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
            extractorType: extractorType == 'Custom'? 'Custom Extractor' : 'Pre-Trained Extractor',
            lastEditDate: newDate,
            PreTrainedFields: currentPreTrainedContent,
            CustomFields: []
        }

        const oldArray = JSON.parse(sessionStorage.getItem("allExtractorContent"));
        const newArray = [...oldArray, extractorDetails]

        const extractorSamplePool = {
          extractorID: newID,
          samples: []
        }

        const oldSampleArray = JSON.parse(sessionStorage.getItem('allFSLSampleContent'));
        console.log(oldSampleArray)
        const newSampleArray = [...oldSampleArray, extractorSamplePool]
        console.log(newSampleArray)
        sessionStorage.setItem("allExtractorContent", JSON.stringify(newArray));
        sessionStorage.setItem("allFSLSampleContent", JSON.stringify(newSampleArray));

        callLoading('Finish Setting Up Your Account...', navigate, '../extractors')
    }

    //Teaching Bubble Handlings
    const showDialog = () => {
        const dialog = document.querySelectorAll('.tutorial-dialog')
        dialog[0].classList.add('show')
    }

    useEffect(() => {
        const bubble = document.querySelector('.stepOne')
        bubble?.classList.add('show')
      },[])

      const dismissBubble = () => {
        const bubbles = document.querySelectorAll('.bubble')
        bubbles.forEach(bubble => {
            bubble.classList.remove('show')
        })
      }

      const nextBubble = () => {
        const bubble = document.querySelector('.stepOne')
        const nextBubble = document.querySelector('.stepTwo')
        bubble.classList.remove('show')
        nextBubble.classList.add('show')
      }

    //Contact Us handling
    const contactUs = () => {
        callToaster('green', 'We will come back to you shortly! Stay tuned:)')
    }

    //page composition
    return <PageWrapper>
        <FilePicker images={extractedData} setSampleData={setSelectedImage} displayTestResults={displayTestResults}/>
        <TeachingBubble title='The data to extract' content='These Data fields are readily available for extraction right out of the box using the FormX pre-built solution. Feel free to play around and select the fields that suit your needs!' count='1 of 2' arrow='left' xPosition='left: 20%' yPosition='top: 120px' primaryAction='Next' secondaryAction='' className='stepOne bubble' onClick={nextBubble} />
        <TeachingBubble title='Test the data extraction here' content='Then, followed by uploading a file and see how the FormX data extraction works! Don’t have a file on hand? No worries, you can use our dummy samples to test the data extraction for now and setup later!' count='2 of 2' arrow='right' xPosition='right: 50%' yPosition='top: 55%' primaryAction='Got it' secondaryAction='' className='stepTwo bubble' onClick={dismissBubble} />
        <EditModeWrapper>
        <Header>
            <ToolBtn onClick={() => navigate('../onboarding')}><MyIcon IconName='Back'/>Back</ToolBtn>
            <h3>Receipt</h3>
            <p>The data fields below are readily available for extraction without the need for any training, right out of the box!</p>
        </Header>
        <MainWrapper>
            {extractStatus===false? <>
                <SchemaWrapper>
                        <ModelHead>
                            <div>
                                <p>Data Fields</p>
                            </div>
                        </ModelHead>
                        {currentPreTrainedContent.map((dataSets, index) => {
                            return <FieldContainer key={index} className={'field-container pre-trained-field-container'}>
                                <div style={{display: 'flex', gap:'10px', alignItems:'center'}}>
                                {dataSets.field_status? <input type='checkbox' className={'field-container-field-status'} defaultChecked={true} onClick={() => updateSchema()}></input> : <input className={'field-container-field-status'} type='checkbox' onClick={() => updateSchema()}></input>}
                                <div className={'field-container-field-name'}>{dataSets.field_name}</div>
                                <div className={'field-container-default-field-name'} style={{display:'none'}}>{dataSets.default_field_name}</div>
                                </div>
                                <div className={'field-container-field-type'} style={{display:'none'}}>{dataSets.field_type}</div>
                            </FieldContainer>
                        })}
                </SchemaWrapper>
                <TestingWrapper>
                        <InnerTestingWrapper>
                        <img src='/../img/upload icon.svg' alt='' />
                        <h2>Quick Test With a File</h2>
                        <p>Drag or upload a file to test the extraction performance.</p>
                        <div onClick={(e) => testExtractor(e)}><YellowButton text='Upload Files' /></div>
                        </InnerTestingWrapper>
                </TestingWrapper>
            </> : <>
            <SchemaWrapper>
                {currentPreTrainedContent.map(obj => obj.field_status).filter(value => value === true).length > 0? <ModelHead>Data Fields<div>Extracted Data</div></ModelHead> : ''}
                    {extractedPreTrainedData.map((dataSets, index) => {
                            return <FieldContainer key={index}>
                                <div>
                                    <div className="green-badge"></div>
                                    <div>{currentPreTrainedContent.filter(data => data.default_field_name === dataSets.field_name)[0].field_name}</div>
                                </div>
                                <div>{dataSets.extracted_data}</div>
                            </FieldContainer>
                    })}
                    {nullPreTrainedData.map((dataSets, index) => {
                            return <FieldContainer key={index}>
                                <div>
                                    <div className="green-badge"></div>
                                    <div>{dataSets.field_name}</div>
                                </div>
                                <div style={{opacity:'.4'}}>No Data Extracted</div>
                            </FieldContainer>
                    })}
                    </SchemaWrapper>
                <TestingWrapper style={{padding: 0}}>
                        <Toolbar>
                            <div>
                                <ToolBtn onClick={() => callToaster('red', 'Function not implemented')}><MyIcon IconName='Code'/>View in JSON</ToolBtn>
                                <ToolBtn onClick={() => callToaster('red', 'Function not implemented')}><MyIcon IconName='Download'/>Download XLSX</ToolBtn>
                            </div>
                            <div>
                                <ToolBtn onClick={resetTest} style={{marginRight:'0'}}><MyIcon IconName='TestBeaker'/>Test Another file</ToolBtn>
                            </div>
                        </Toolbar>
                        <TestImageWrapper>
                            <img src={selectedImagPath} alt='' />
                        </TestImageWrapper>
                </TestingWrapper>
            </>}        
        </MainWrapper>
        </EditModeWrapper>
        <Dialog className='tutorial-dialog'>
            <h4>So What’s Next?</h4>
            <p>Now you have a glimpse of how FormX works, and there are so much more you can do!</p>
            <div onClick={createExtractor}><YellowButton text='I want to keep testing the extractor' /></div>
            <div onClick={createExtractor}><YellowButton text='I want to add additional data fields for extraction' /></div>
            <div onClick={contactUs}><BorderButton text='Contact FormX Team' /></div>
        </Dialog> 
        </PageWrapper>
}