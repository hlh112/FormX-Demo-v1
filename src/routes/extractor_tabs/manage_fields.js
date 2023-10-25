import { getFieldsSchema } from "../../data/field_schema";
import { getExtractedData } from "../../data/extracted_data";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { YellowButton, BorderButtonWithIconLeft, BorderButton } from '../../ui-components/button';
import { Icon } from '@fluentui/react/lib/Icon';
import callToaster from "../../helper/CallToaster";
import callLoading from "../../helper/CallLoading";
import TeachingBubble from '../../ui-components/teachingBubble';
import useMountTransition from "../../helper/CallTransition";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: calc(100vh - 91px);
`
const EditModeWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    transition: 500ms ease 0s;
`
const EditModeOnWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    transition: 500ms ease 0s;
    transform: translateY(100px);
    opacity: 0;

    &.show {
        opacity: 1;
        transform: translateY(0);
    }
`
const EditModeInnerWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
`
const SchemaWrapper = styled.div`
    border-right: solid 1px #e1e1e1;
    width: 30%;
    height: 100%;
`
const FieldsWrapper = styled.div`
    height: calc(100% - 61px);
    overflow-y: scroll;

    &.editing {
        height: 100%;
    }
`
const FieldInnerWrapper = styled.div`
    height: ${props => props.height > 0? 'calc(50% - 40px)' : 'calc(100% - 100px)'};
    overflow-y: scroll;
`
const EditFieldWrapper = styled.div`
    width: 70%;
    padding: 20px 20px;
`
const TestingWrapper = styled.div`
  background: #F6FDFC;
  width: 70%;
  padding: 20px;
  box-sizing: border-box;
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
const TabHeader = styled.div`
  padding: 12px 20px;
  border-bottom: 1px solid #e1e1e1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  h4{
    font-size: 14px;
    margin: 0 0 6px 0;
  }

  p{
    font-size: 12px;
    opacity: .5;
    margin: 0;
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
        line-height: 1.5;
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

  .extracted-data {
    background: transparent;
    animation: extractedGreen 1200ms 1;
    opacity: 1;

    @keyframes extractedGreen {
        0% {
            background: transparent;
        }
        50% {
            background: #DFF6DD;
        }
        100% {
            background: transparent;
        }
      }
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
const AddFieldButton = styled.div`
  background: #E0EBEF;
  transition: 500ms ease 0s;
  width: 12px;
  height: 12px;
  line-height: 1;
  padding: 6px;
  border-radius: 2px;
  cursor: pointer;
  &:hover {
    background: #B6CED7;
  }
`
const FieldInfoWrapper = styled.div`
  width: 100%;
  border: 1px solid #e1e1e1;
  font-size: 14px;
`
const FieldInfoHead = styled.div`
  background: #F6F8FA;
  padding: 8px 12px;
`
const FieldInfoContent = styled.div`
    padding: 16px 12px;

    .input-container {
        display: flex;
        flex-direction: column;
        gap: 4px;
        margin-bottom: 20px;
        max-width: 420px;

        input {
            height: 24px;
        }

        select {
            height: 30px;
        }
    }
`
const TestImageWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100% - 40px);
    overflow: hidden;

    img {
        height: calc(100% - 100px);
        width: fit-content;
    }
`
const CustomEmpty = styled.div`
    padding: 14px 20px;
    border-top: 1px solid #e1e1e1;
    h4 {
        font-size: 12px;
        font-weight: normal;
        margin: 0;
    }
    p {
        font-size: 12px;
        color: #0078D4;
        cursor: pointer;
        margin: 4px 0 0 0;
        transition: 500ms ease 0s;
        &:hover {
            opacity: .5;
        }
    }
`
export default function ManageFields(props) {
    
    const MyIcon = (props) => <Icon iconName={props.IconName} className={props.ClassName}/>;
    //load schema content for this form

    const allSchema = JSON.parse(sessionStorage.getItem("allExtractorContent"));
    const thisExtractorID = JSON.parse(sessionStorage.getItem("selectedExtractorID"));
    const schema = allSchema.filter(item => item.extractorID === thisExtractorID)
    const extractorName = schema[0].extractorName
    const PreTrainedContent = schema[0].PreTrainedFields
    const CustomContent = schema[0].CustomFields

    const [firstTimeTesting, setFirstTimeTesting] = useState(() => {
        const storage = JSON.parse(sessionStorage.getItem("firstTimeTesting"));
        if (storage) {
            return storage
        } else {
            return 0
        }
    })

    const triggerGuide = () => {
        document.querySelector('.guide-trigger').click()
    }

    useEffect(() => {
        console.log(firstTimeTesting)
        if (firstTimeTesting > 0 && firstTimeTesting < 2) {
            setTimeout(triggerGuide, 1500)
            setFirstTimeTesting(firstTimeTesting + 1)
            sessionStorage.setItem("firstTimeTesting", JSON.stringify(firstTimeTesting));
            
        }
    }, [firstTimeTesting])

    const [currentPreTrainedContent, setPreTrainedContent] = useState(() => {
        const storage = JSON.parse(sessionStorage.getItem(thisExtractorID + "_newPreTrainedContent"));
        if (storage) {
            return storage
        } else {
            return PreTrainedContent
        }
    });

    const [currentCustomContent, setCustomContent] = useState(() => {
        const storage = JSON.parse(sessionStorage.getItem(thisExtractorID + "_newCustomContent"));
        if (storage) {
            return storage
        } else {
            return CustomContent
        }
    });

    useEffect(() => {
        sessionStorage.setItem("key-here", JSON.stringify(currentPreTrainedContent));
    }, [currentPreTrainedContent])

    useEffect(() => {
        if (props.runTesting === true) {
            runTesting()
            props.resetTest()
        }
    }, [props.runTesting])

    //test extractor related handelings
    const [extractedPreTrainedData, setExtractedPreTrainedData] = useState([])
    const [extractedCustomData, setExtractedCustomData] = useState([])
    const [nullPreTrainedData, setNullPreTrainedData] = useState([])
    const [nullCustomData, setNullCustomData] = useState([])
    const [extractStatus, setExtractStatus] = useState(false)
    const [selectedImage, setSelectedImage] = useState('')

    const testExtractor = (e) => {
        document.querySelector('.file-picker.test-extractor').classList.add('show')
    }

    const runTesting = () => {
        //////
        console.log(props.selectedImage)
        const sampleData = props.selectedImage
        const extractedPreTrainModelData = sampleData[0].PreTrainedModelResults
        const extractedCustomModelData = sampleData[0].CustomModelResults

        const SelectedPreTrainedContent = currentPreTrainedContent.filter(field =>
              field.field_status === true
        );

        const matchingPreTrainedFields = extractedPreTrainModelData.filter(obj1 =>
            SelectedPreTrainedContent.some(obj2 => obj2.default_field_name === obj1.field_name)
        );

        const nonMatchingPreTrainedFields = SelectedPreTrainedContent.filter(obj1 =>
            extractedPreTrainModelData.every(obj2 => obj2.field_name !== obj1.default_field_name)
        );

        const matchingCustomFields = extractedCustomModelData.filter(obj1 =>
            currentCustomContent.some(obj2 => obj2.field_name === obj1.field_name)
        );

        const nonMatchingCustomFields = currentCustomContent.filter(obj1 =>
            extractedCustomModelData.every(obj2 => obj2.field_name !== obj1.field_name)
        );

        setExtractedPreTrainedData(matchingPreTrainedFields)
        setNullPreTrainedData(nonMatchingPreTrainedFields)
        setExtractedCustomData(matchingCustomFields)
        setNullCustomData(nonMatchingCustomFields)
        setExtractStatus(true)
        setEditMode(false)
        console.log(firstTimeTesting)
        setFirstTimeTesting(firstTimeTesting + 1)
        sessionStorage.setItem("firstTimeTesting", JSON.stringify(firstTimeTesting));
        console.log(firstTimeTesting)
        setSelectedImage(sampleData[0].filePath)

        //sessionStorage.setItem("ExtractStatus", JSON.stringify(true));
    }

    const resetTest = () => {
        setEditMode(false)
        setExtractStatus(false)
        //sessionStorage.setItem("ExtractStatus", JSON.stringify(false));
    }

    const reTest = () => {
        callLoading('Extracting Document...', runTesting)
        
    }

    //edit mode handelings
    const [editMode, setEditMode] = useState(false)
    const hasTransitionedIn = useMountTransition(editMode, 100);

    const enterEditMode = () => {
        setEditMode(true)
        //setExtractStatus(false)
        //sessionStorage.setItem("ExtractStatus", JSON.stringify(extractStatus));
    }

    //select first field when entering edit mode
    useEffect(() => {
        const activeElements = document.querySelectorAll('.field-container');
        if (activeElements.length > 0) { activeElements[0].click() }
        document.querySelector('.guide-trigger').classList.remove('hide')
    }, [editMode])
    //select a field
    const selectField = (fieldName, fieldType, fieldCustomName, e) => {
        const activeElements = document.querySelectorAll('.field-container');
        activeElements.forEach(element => {
            element.classList.remove('active')
          });
        e.currentTarget.classList.add('active')

        const nameField = document.querySelector('#fieldName')
        const typeField = document.querySelector('#fieldType')
        const defaultField = document.querySelector('#defaultFieldName')

        const currentNameValue = document.querySelector('.field-container.active .field-container-field-name').innerHTML
        const currentTypeValue = document.querySelector('.field-container.active .field-container-field-type').innerHTML

        nameField.value = currentNameValue? currentNameValue : ''
        typeField.value = currentTypeValue? currentTypeValue : ''
        currentTypeValue? typeField.style.display = 'block' : typeField.style.display = 'none';
        currentTypeValue? typeField.parentNode.style.display = 'flex' : typeField.parentNode.style.display = 'none';
        defaultField.value = fieldCustomName? fieldCustomName : ''
        fieldCustomName? defaultField.style.display = 'block' : defaultField.style.display = 'none';
        fieldCustomName? defaultField.parentNode.style.display = 'flex' : defaultField.parentNode.style.display = 'none';
        
        nameField.focus()
        nameField.select()
    }
    //change field name
    const changeFieldName = (e) => {
        const newFieldName = document.querySelector('.field-container.active .field-container-field-name')
        const formattedValue = e.currentTarget.value.trim().replace(/\s+/g, '_').toLowerCase();
        newFieldName.innerHTML = formattedValue
    }
    //change field type
    const changeFieldType = (e) => {
        const newFieldType = document.querySelector('.field-container.active .field-container-field-type')
        newFieldType.innerHTML = e.currentTarget.value
    }
    //add fields
    const addNewField = () => {
        const newFieldObj = {
            field_name: 'New Field',
            field_type: 'single-line text'
        }

        const newCustomContent = [...currentCustomContent, newFieldObj]
        setCustomContent(newCustomContent)
        //sessionStorage.setItem("newCustomContent", JSON.stringify(newCustomContent));
    }

    useEffect(()=>{
        const elem = document.querySelectorAll('.custom-field-container')
        elem[elem.length-1]?.click()
        elem[elem.length-1]?.scrollIntoView()

        if (currentCustomContent.length === 0) {
            document.querySelector('.tab-train-models').style.display = 'none'
        } else {
            document.querySelector('.tab-train-models').style.display = 'block'
        }
    }, [currentCustomContent])

    //delete fields handling
    const deleteField = (fieldName, e) => {
        e.stopPropagation();
        const selectedDiv = e.currentTarget.parentNode;
        selectedDiv.parentNode.removeChild(selectedDiv);
    };
    //save schema
    const saveSchema = () => {
        const newCustomFields = Array.from(document.querySelectorAll('.custom-field-container'))
        const newCustomFieldArray = newCustomFields.map(item => {
            const fieldName = item.querySelector('.field-container-field-name').textContent;
            const fieldType = item.querySelector('.field-container-field-type').textContent;
            return {field_name: fieldName, field_type: fieldType}
        })
        setCustomContent(newCustomFieldArray)
        sessionStorage.setItem(thisExtractorID + "_newCustomContent", JSON.stringify(newCustomFieldArray));

        const newPreTrainedFields = Array.from(document.querySelectorAll('.pre-trained-field-container'))
        const newPreTrainedFieldArray = newPreTrainedFields.map(item => {
            const fieldName = item.querySelector('.field-container-field-name').textContent;
            const fieldDefaultName = item.querySelector('.field-container-default-field-name').textContent;
            const fieldStatus = item.querySelector('.field-container-field-status').checked? true : false;
            return {field_name: fieldName, default_field_name: fieldDefaultName, field_status: fieldStatus}
        })
        setPreTrainedContent(newPreTrainedFieldArray)
        sessionStorage.setItem(thisExtractorID + "_newPreTrainedContent", JSON.stringify(newPreTrainedFieldArray));

        setEditMode(false)
        callToaster('green', 'Schema Saved')
        //window.location.reload()
    }
    //discard changes
    const discardChanges = () => {
        //window.location.reload()
        setEditMode(false)
    }

    const changeTab = (identifier) => {
        const tab = document.querySelectorAll(identifier)
        console.log(tab[0])
        tab[0]?.click()
    }

      const dismissBubble = (e) => {
        if (e.currentTarget.parentNode.parentNode.parentNode.classList.contains('edit-field-bubble')) {
            sessionStorage.setItem("EditFieldTutorialCompleted", JSON.stringify(true));
            console.log('executed')
        } 
        if (e.currentTarget.parentNode.parentNode.parentNode.classList.contains('manage-field-bubble')) {
            sessionStorage.setItem("ManageFieldTutorialCompleted", JSON.stringify(true));
        }
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

      const lastBubble = () => {
        const bubble = document.querySelector('.stepTwo')
        const nextBubble = document.querySelector('.stepThree')
        bubble.classList.remove('show')
        nextBubble.classList.add('show')
      }

      const [manageFieldTutorialCompleted, setManageFieldTutoiralCompleted ] = useState(() => {
        const storage = JSON.parse(sessionStorage.getItem("ManageFieldTutorialCompleted"));
        if (storage) { 
            return storage 
        } else { 
            return false 
        }
    });

    const [editFieldTutorialCompleted, setEditFieldTutoiralCompleted ] = useState(() => {
        const storage = JSON.parse(sessionStorage.getItem("EditFieldTutorialCompleted"));
        if (storage) { 
            return storage 
        } else { 
            return false 
        }
    });

    useEffect(() => {
        const manageFieldBubble = document.querySelector('.stepOne.manage-field-bubble')
        const manageStatus = JSON.parse(sessionStorage.getItem("ManageFieldTutorialCompleted"))
        if (!manageStatus) {
            manageFieldBubble?.classList.add('show')
        }
        const editFieldBubble = document.querySelector('.stepOne.edit-field-bubble')
        const editStatus = JSON.parse(sessionStorage.getItem("EditFieldTutorialCompleted"))
        if (!editStatus) {
            editFieldBubble?.classList.add('show')
        }
    },[editMode])

    //page composition
        return <PageWrapper>
            {editMode? <EditModeOnWrapper className={`${hasTransitionedIn && 'show'}`}>
                <TabHeader>
                    <div>
                        <h4>Field Schema</h4>
                        <p>Adjust the data fields you want to extract</p>
                    </div>
                    <div style={{display:'flex', gap:'6px'}}>
                        <div onClick={discardChanges}><BorderButton text='Discard Changes' /></div>
                        <div onClick={saveSchema}><YellowButton text='Save' /></div>
                    </div>
                </TabHeader>
                <EditModeInnerWrapper>
                    <TeachingBubble title='These are your data fields' content='You can add or remove the fields you want here.' count='1 of 3' arrow='left' xPosition='left: 27%' yPosition='top: 138px' primaryAction='Next' secondaryAction='' className='stepOne bubble edit-field-bubble' onClick={nextBubble} />
                    <TeachingBubble title='Adjust the details of each field' content='Select the field you want to adjust, then edit the field settings here.' count='2 of 3' arrow='top' xPosition='left: 31%' yPosition='top: 350px' primaryAction='Next' secondaryAction='' className='stepTwo bubble edit-field-bubble' onClick={lastBubble} />
                    <TeachingBubble title='Remember saving your changes' content='Save the changes before you leave this page.' count='3 of 3' arrow='topRight' xPosition='right: 18px' yPosition='top: 70px' primaryAction='Got it' secondaryAction='' className='stepThree bubble edit-field-bubble' onClick={dismissBubble} />
                    <SchemaWrapper>
                        <FieldsWrapper className='editing'>
                        {currentPreTrainedContent.length?<><ModelHead>
                            <div>
                                <p>Pre-trained Model Fields ({extractorName})</p>
                                <p className='desc'>Fields that are readily available for extraction without further AI model training needed.</p>
                            </div>
                        </ModelHead>
                        <FieldInnerWrapper height={currentPreTrainedContent.length}>
                        {currentPreTrainedContent.map((dataSets, index) => {
                            return <FieldContainer key={index} className={'field-container pre-trained-field-container'} onClick={(e) => selectField(dataSets.field_name, dataSets.field_type, dataSets.default_field_name, e)}>
                                <div style={{display: 'flex', gap:'10px', alignItems:'center'}}>
                                {dataSets.field_status? <input type='checkbox' className={'field-container-field-status'} defaultChecked={true}></input> : <input className={'field-container-field-status'} type='checkbox'></input>}
                                <div className={'field-container-field-name'}>{dataSets.field_name}</div>
                                <div className={'field-container-default-field-name'} style={{display:'none'}}>{dataSets.default_field_name}</div>
                                </div>
                                <div className={'field-container-field-type'} style={{display:'none'}}>{dataSets.field_type}</div>
                            </FieldContainer>
                        })}
                        </FieldInnerWrapper></>: ''}
                        {currentCustomContent.length?<ModelHead>
                            <div>
                                <p>Custom Model Fields (Instant)</p>
                                <p className='desc'>Fields that are readily available for extraction. You can further train the AI model with some sample data later on.</p>
                            </div>
                            <AddFieldButton onClick={addNewField}><MyIcon IconName='Add'/></AddFieldButton>
                        </ModelHead> : <CustomEmpty>
                            <h4>Don’t see the fields you need? </h4>
                            <p onClick={addNewField}>Create your own fields using the FormX custom model.</p>
                            </CustomEmpty>}
                        <FieldInnerWrapper height={currentPreTrainedContent.length}>
                        {currentCustomContent.map((dataSets, index) => {
                            return <FieldContainer key={index} className={'field-container custom-field-container'} onClick={(e) => selectField(dataSets.field_name, dataSets.field_type, dataSets.custom_field_name, e)}>
                                    <div className={'field-container-field-name'}>{dataSets.field_name}</div>
                                    <div className={'field-container-field-type'}>{dataSets.field_type}</div>
                                    <div className={'delete-button'} onClick={(e) => deleteField(dataSets.field_name, e)}><MyIcon IconName='Delete'/></div>
                                </FieldContainer>
                        })}
                        </FieldInnerWrapper>
                        </FieldsWrapper>
                    </SchemaWrapper>
                    <EditFieldWrapper>
                        <h2 style={{fontWeight:'normal', margin: '0 0 12px 0', fontSize:'20px'}}>Field Settings</h2>
                        <FieldInfoWrapper>
                            <FieldInfoHead>Field Info</FieldInfoHead>
                            <FieldInfoContent>
                                <div className='input-container'>
                                    <label>Field Name</label><input id='fieldName' type='text' placeholder="new field" onChange={(e) => changeFieldName(e)}></input>
                                </div>
                                <div className='input-container'>
                                    <label>Mapped to Pre-Trained Field</label><input id='defaultFieldName' type='text' value={``} disabled></input>
                                </div>
                                <div className='input-container'>
                                    <label>Field Type</label><select id='fieldType' type='text' onChange={(e) => changeFieldType(e)}>
                                        <option>single-line text</option>
                                        <option>multi-line text</option>
                                        <option>date</option>
                                        <option>time</option>
                                        <option>numbers</option>
                                        <option>monetary_amount</option>
                                    </select>
                                </div>
                            </FieldInfoContent>
                        </FieldInfoWrapper>
                    </EditFieldWrapper>
                </EditModeInnerWrapper>
            </EditModeOnWrapper> 
            : 
            <>{extractStatus===false? <EditModeWrapper>
                <EditModeInnerWrapper>
                <TeachingBubble title='Access your data fields in this tab' content='You can adjust the data you want to extract by editing the field schema inside this tab.' count='1 of 2' arrow='top' xPosition='left: 20px' yPosition='top: 110px' primaryAction='Next' secondaryAction='' className='stepOne bubble manage-field-bubble' onClick={nextBubble} />
                <TeachingBubble title='Click here to edit the data fields' content='Start editing the data fields schema by clicking this button here.' count='2 of 2' arrow='left' xPosition='left: 30%' yPosition='top: 95px' primaryAction='Got it' secondaryAction='' className='stepTwo bubble manage-field-bubble' onClick={dismissBubble} />
                <SchemaWrapper>
                <TabHeader>
                    <div>
                        <h4>Field Schema</h4>
                        <p>Adjust the data fields you want to extract</p>
                    </div>
                    <div className='edit-button' onClick={enterEditMode}><BorderButtonWithIconLeft iconName='Edit' text='Edit Schema' /></div>
                </TabHeader>
                <FieldsWrapper>
                {currentPreTrainedContent.map(obj => obj.field_status).filter(value => value === true).length > 0? <ModelHead>Pre-trained Model Fields ({extractorName})</ModelHead> : ''}
                    {currentPreTrainedContent.map((dataSets, index) => {
                        return <>
                            {dataSets.field_status? <FieldContainer key={index}>
                                <div>
                                    <div className="green-badge"></div>
                                    <div>{dataSets.field_name}</div>
                                </div>
                            </FieldContainer> : ''}
                        </>
                    })}
                {currentCustomContent.length > 0? <ModelHead>Custom Model Fields (Instant) <div className='train-model-button' onClick = {() => changeTab('.tab-train-models')}>Improve Accuracy<MyIcon IconName='Forward'/></div></ModelHead> : ''}
                {currentCustomContent.map((dataSets, index) => {
                    return <FieldContainer key={index}>
                        <div>
                            <div className="green-badge"></div>
                            <div>{dataSets.field_name}</div>
                        </div>
                        <div className='field-type'>{dataSets.field_type}</div>
                    </FieldContainer>
                })}
                </FieldsWrapper>
            </SchemaWrapper>
            <TestingWrapper>
                        <InnerTestingWrapper>
                        <img src='/../img/upload icon.svg' alt='' />
                        <h2>Quick Test With a File</h2>
                        <p>Drag or upload a file to test the extraction performance.</p>
                        <div onClick={testExtractor}><YellowButton text='Upload Files' /></div>
                        </InnerTestingWrapper>
                    </TestingWrapper>
            </EditModeInnerWrapper></EditModeWrapper> 
            : 
            <EditModeWrapper>
                <EditModeInnerWrapper>
                    <SchemaWrapper>
                <TabHeader>
                    <div>
                        <h4>Field Schema</h4>
                        <p>Adjust the data fields you want to extract</p>
                    </div>
                    <div className='edit-button' onClick={enterEditMode}><BorderButtonWithIconLeft iconName='Edit' text='Edit Schema' /></div>
                </TabHeader>
                <FieldsWrapper>
                {currentPreTrainedContent.map(obj => obj.field_status).filter(value => value === true).length > 0? <><ModelHead>Pre-trained Model Fields ({extractorName})</ModelHead><FieldContainer className='display-only'><div>Fields</div><div>Extracted Data</div></FieldContainer></> : ''}
                    {extractedPreTrainedData.map((dataSets, index) => {
                            return <FieldContainer key={index}>
                                <div>
                                    <div className="green-badge"></div>
                                    <div>{currentPreTrainedContent.filter(data => data.default_field_name === dataSets.field_name)[0].field_name}</div>
                                </div>
                                <div className='extracted-data'>{dataSets.extracted_data}</div>
                            </FieldContainer>
                    })}
                    {nullPreTrainedData.map((dataSets, index) => {
                            return <FieldContainer key={index}>
                                <div>
                                    <div className="green-badge"></div>
                                    <div>{dataSets.field_name}</div>
                                </div>
                                <div style={{opacity:'.4'}} className='extracted-data'>No Data Extracted</div>
                            </FieldContainer>
                    })}
                {currentCustomContent.length > 0? <><ModelHead>Custom Model Fields (Instant) <div className='train-model-button' onClick = {() => changeTab('.tab-train-models')}>Improve Accuracy<MyIcon IconName='Forward'/></div></ModelHead><FieldContainer className='display-only'><div>Fields</div><div>Extracted Data</div></FieldContainer></> : ''}
                {extractedCustomData.map((dataSets, index) => {
                            return <FieldContainer key={index}>
                                <div>
                                    <div className="green-badge"></div>
                                    <div>{dataSets.field_name}</div>
                                </div>
                                <div className='extracted-data'>{dataSets.extracted_data}</div>
                            </FieldContainer>
                        })}
                {nullCustomData.map((dataSets, index) => {
                            return <FieldContainer key={index}>
                                <div>
                                    <div className="green-badge"></div>
                                    <div>{dataSets.field_name}</div>
                                </div>
                                <div style={{opacity:'.4'}} className='extracted-data'>No Data Extracted</div>
                            </FieldContainer>
                        })}
                    </FieldsWrapper>
                    </SchemaWrapper>
                    <TestingWrapper style={{padding: 0}}>
                        <Toolbar>
                            <div>
                                <ToolBtn onClick={() => callToaster('red', 'Function not implemented')}><MyIcon IconName='Code'/>View in JSON</ToolBtn>
                                <ToolBtn onClick={() => callToaster('red', 'Function not implemented')}><MyIcon IconName='Download'/>Download XLSX</ToolBtn>
                            </div>
                            <div>
                                <ToolBtn onClick={testExtractor}><MyIcon IconName='TestBeaker'/>Test Another file</ToolBtn>
                                <ToolBtn onClick={reTest}><MyIcon IconName='Refresh'/>Re-Test This File</ToolBtn>
                                <ToolBtn onClick={resetTest} style={{marginRight:'0'}}><MyIcon IconName='Cancel'/>Clear</ToolBtn>
                            </div>
                        </Toolbar>
                        <TestImageWrapper>
                            <img src={selectedImage} alt='' />
                        </TestImageWrapper>
                    </TestingWrapper>
                </EditModeInnerWrapper>
            </EditModeWrapper>}</> }
        </PageWrapper>
}