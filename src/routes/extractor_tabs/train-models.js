import { useState, useEffect } from "react";
import styled from "styled-components";
import { Icon } from '@fluentui/react/lib/Icon';
import callToaster from "../../helper/CallToaster";
import callLoading from "../../helper/CallLoading";
import TeachingBubble from '../../ui-components/teachingBubble';
import { YellowButton, BorderButtonWithIconLeft, BorderButton } from '../../ui-components/button';
import FilePicker from '../../ui-components/file-picker';
import useMountTransition from "../../helper/CallTransition";

const PageWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
`
const LeftWrapper = styled.div`
    width: 100%;
    height: 100%;
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
const SchemaWrapper = styled.div`
    border-left: solid 1px #e1e1e1;
    width: 30%;
    height: 100%;
    overflow-y: scroll;
`
const FieldsWrapper = styled.div`
    height: 100%;
` 
const FieldInnerWrapper = styled.div`
    height: calc(50% - 82px);
    overflow-y: scroll;
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

  .field-result {
    border: 1px solid #e1e1e1;
    font-size: 12px;
    padding: 4px 8px;
    transition: 500ms ease 0s;
    border-radius: 2px;
    width: 180px;
  }
  &:hover {
    .field-result {
        border: 1px solid #999;
    }
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
const TableWrapper = styled.div`
    height: calc(100% - 100px);
    overflow-y: scroll;
`
const SampleTable = styled.table`
    width: 100%;
    border-spacing: 0px;
    
    .checkbox {
        accent-color: #25D0B1;
    }
`
const TableRow = styled.tr`
    &.table-head {
        background: #FAF9F8;
    }
    transition: 500ms ease 0s;

    &.table-content{
        cursor: pointer;
        &:hover {
            background: #f9f9f9;
        }
    }
`
const TableHead = styled.th`
    font-size: 12px;
    padding: 8px 20px;
    font-weight: normal;
    color: #000;
    text-align: left;

    &.xs {
        width: 50px;
        min-width: 50px;
    }
    &.s {
        width: 100px;
        min-width: 100px;
    }
    &.m {
        width: 150px;    
        min-width: 150px;       
    }
`
const TableCell = styled.td`
    img {
        width: 60px;
        max-height: 80px;
        border-radius: 4px;
    }
    font-size: 12px;
    color: #323130;
    padding: 14px 20px;
    text-align: left;

    &.xs {
        width: 50px;
        min-width: 50px;
    }
    &.s {
        width: 100px;
        min-width: 100px;
    }
    &.m {
        width: 150px;    
        min-width: 150px;    
    }
    .switch {
        position: relative;
        display: inline-block;
        width: 34px;
        height: 21px;
    }
    .switch input { 
        opacity: 0;
        width: 0;
        height: 0;
    }
    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: .4s;
        transition: .4s;
    }
    .slider:before {
        position: absolute;
        content: "";
        height: 13px;
        width: 13px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
    }
    input:checked + .slider {
        background-color: #25D0B1;
    }
    input:focus + .slider {
        box-shadow: 0 0 1px #25D0B1;
    }
    input:checked + .slider:before {
        -webkit-transform: translateX(13px);
        -ms-transform: translateX(13px);
        transform: translateX(13px);
    }
    .slider.round {
        border-radius: 34px;
    }
    .slider.round:before {
        border-radius: 50%;
    }
    .badge {
        padding: 4px 8px;
        border-radius: 4px;
        width: fit-content;
        text-align: center;
        text-wrap: nowrap;
        background: ${props => props.status === 'Reviewed'? '#EFFCFA' : '#FFEDE7'};
        color: ${props => props.status === 'Reviewed'? '#27AE60' : '#D83B01'};
    }
    &.delete-button {

        i {
            transition: 500ms ease 0s;
            cursor: pointer;
        
            &:hover {
                color: #791010;
            }
        }
      }
`
const EmptyWrapper = styled.div`
  background: #F6FDFC;
  width: 100%;
  height: calc(100% - 155px);
  padding: 20px;
  box-sizing: border-box;
  transition: 500ms ease 0s;

  &:hover {
    padding: 30px;
  }
`
const EmptyInnerWrapper = styled.div`
  width: 100%;
  border: dashed 2px #25D0B1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const EditorWrapper = styled.div`
    display: flex;
    width: 100%;
    height: calc(100vh - 91px);
    transition: 500ms ease 0s;

      &.show {
        opacity: 1;
        transform: translateY(0); 
      }

      &.hide {
        transform: translateY(100px);
        opacity: 0;
      }
`
const EditSchemaWrapper = styled.div`
    border-left: solid 1px #e1e1e1;
    width: 30%;
    min0width: 390px; 
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow-y: scroll;
    position: relative;
`
const TestImageWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70%;
    background: #FAF9F8;

    img {
        height: calc(100% - 100px);
        width: fit-content;
    }
`
const ResultsWrapper = styled.div`
padding-bottom: 50px;
`
const ButtonWrapper = styled.div`
      border-top: 1px solid #e1e1e1;
      padding: 12px 12px 24px 12px;
      display: flex;
      gap: 6px;
      justify-content: end;
      background: white;
      position: fixed;
      bottom: 0;
      right: 0;
      width: calc(30% - 43px);
      overflow-x: scroll;
`

export default function TrainModels(props) {
    const MyIcon = (props) => <Icon iconName={props.IconName} className={props.ClassName}/>;

    const thisExtractorID = JSON.parse(sessionStorage.getItem("selectedExtractorID"));

    const allSchema = JSON.parse(sessionStorage.getItem("allExtractorContent"));
    const schema = allSchema.filter(item => item.extractorID === thisExtractorID)
    const CustomContent = schema[0].CustomFields

    const [currentCustomContent, setCustomContent] = useState(() => {
        const storage = JSON.parse(sessionStorage.getItem(thisExtractorID + "_newCustomContent"));
        if (storage) {
            return storage
        } else {
            return CustomContent
        }
    });

    const [editMode, setEditMode] = useState(false)
    const [selectedImage, setSelectedImage] = useState('')
    const [selectedImagePath, setSelectedImagePath] = useState('')

    const hasTransitionedIn = useMountTransition(editMode, 100);

    const openEditor = (fileName, filePath) => {
        setEditMode(true)
        setSelectedImage(fileName)
        setSelectedImagePath(filePath)
        console.log(filePath)
    }

    useEffect(() => {
        if (editMode === true) {
            document.querySelector('.guide-trigger').classList.add('hide')  
        } else if (editMode === false) {
            document.querySelector('.guide-trigger').classList.remove('hide')  
        }
    }, [editMode])

    const handleCheckboxClick = (e) => {
        e.stopPropagation();
    }

    const deleteSample = (e, deleteSampleFileName) => {

        const allExtractorSample = JSON.parse(sessionStorage.getItem("allFSLSampleContent"))
        const extractorIndex = allExtractorSample.findIndex(obj => obj.extractorID === thisExtractorID)

        allExtractorSample[extractorIndex].samples = allExtractorSample[extractorIndex].samples.filter(sample => sample.fileName !== deleteSampleFileName)
        
        sessionStorage.setItem("allFSLSampleContent", JSON.stringify(allExtractorSample));
        props.setSampleData(allExtractorSample[extractorIndex].samples)
        
        handleCheckboxClick(e)
        allExtractorSample[extractorIndex].samples.length === 0? props.setFSLSampleCount(false) : props.setFSLSampleCount(true)
    }

    const deleteAllSample = (e) => {

        const allExtractorSample = JSON.parse(sessionStorage.getItem("allFSLSampleContent"))
        const extractorIndex = allExtractorSample.findIndex(obj => obj.extractorID === thisExtractorID)

        allExtractorSample[extractorIndex].samples = []
        
        sessionStorage.setItem("allFSLSampleContent", JSON.stringify(allExtractorSample));
        props.setSampleData(allExtractorSample[extractorIndex].samples)

        handleCheckboxClick(e)
        props.setFSLSampleCount(false)
    }

    const saveSample = () => {
        setEditMode(false)
        callToaster('green', 'Sample Data Mark as Reviewed')

        const selectedData = props.sampleData.filter(data => data.fileName === selectedImage)
        const index = props.sampleData.findIndex(obj => obj.fileName === selectedImage)

        const dataName = document.querySelectorAll('.ground-truth-name')
        const dataResult = document.querySelectorAll('.ground-truth-data')

        const groundTruthArray = [];

        for (let i = 0; i < dataName.length; i++) {
          const key = dataName[i].textContent;
          const value = dataResult[i].value;
          const pair = {field_name: key, extracted_data: value};

          groundTruthArray.push(pair);
        }

        const sampleObj = {
            fileName: selectedData[0].fileName,
            filePath: selectedData[0].filePath,
            reviewStatus: 'Reviewed',
            dateUploaded: selectedData[0].dateUploaded,
            includeStatus: true,
            groundTruth : groundTruthArray
        }

        props.sampleData[index] = sampleObj

        const allExtractor = JSON.parse(sessionStorage.getItem("allFSLSampleContent"))
        const extractorIndex = allExtractor.findIndex(obj => obj.extractorID === thisExtractorID)

        allExtractor[extractorIndex].samples = props.sampleData
        sessionStorage.setItem("allFSLSampleContent", JSON.stringify(allExtractor));

        props.setFSLSampleCount(true)
    }

    const reprocessSample = () => {
        callLoading('Extracting Document...', callToaster, 'green', 'Extraction Completed')
    }

    const reprocessAllSample = () => {

        const allExtractorSample = JSON.parse(sessionStorage.getItem("allFSLSampleContent"))
        const extractorIndex = allExtractorSample.findIndex(obj => obj.extractorID === thisExtractorID)
        allExtractorSample[extractorIndex].samples.forEach(sample => {

            sample.reviewStatus = 'Pending Review';

        })

        sessionStorage.setItem("allFSLSampleContent", JSON.stringify(allExtractorSample));
        props.setSampleData(allExtractorSample[extractorIndex].samples)

        callLoading('Extracting All Documents...', callToaster, 'green', 'Extraction Completed')
        props.setFSLSampleCount(false)
    }

    const uploadFile = () => {
        document.querySelector('.file-picker').classList.add('show')
    }

    ////////////////
    
    const currentFieldName = currentCustomContent.map(obj => obj.field_name);
    const sampleData = props.sampleData.filter(sample => sample.fileName === selectedImage)[0]?.groundTruth? props.sampleData.filter(sample => sample.fileName === selectedImage)[0]?.groundTruth : []

    const sampleDataFieldName = sampleData.map(obj => obj.field_name)

    const MatchingFields = sampleData.filter(obj1 =>
        currentFieldName.some(obj2 => obj2 === obj1.field_name)
    );

    const notMatchingFields = currentFieldName.filter(fields => !sampleDataFieldName?.includes(fields));
    
    //page composition
    return <>{editMode===false? <PageWrapper>
        <LeftWrapper>
        <TabHeader>
            <div>
                <h4>Training Sample Data</h4>
                <p>To fine-tune the extraction performance, you can provide FormX with some sample data to train the extraction model.</p>
            </div>
        </TabHeader>
        {props.sampleData.length? <>
            <Toolbar>
            <div>
                <ToolBtn onClick={uploadFile}><MyIcon IconName='Add'/>Add New Sample</ToolBtn>
                <ToolBtn onClick={reprocessAllSample}><MyIcon IconName='TestBeaker' />Extract All Files Again</ToolBtn>
            </div>
            <div>
                <ToolBtn style={{marginRight:'0'}} onClick={deleteAllSample}><MyIcon IconName='Delete'/>Delete All</ToolBtn>
            </div>
        </Toolbar>
        <TableWrapper>
        <SampleTable>
            <TableRow className='table-head'>
                <TableHead className='xs'><input className='checkbox' type='checkbox' /></TableHead>
                <TableHead className='s'>File Image</TableHead>
                <TableHead className='m'>File Name</TableHead>
                <TableHead className='s'>Status</TableHead>
                <TableHead className='m'>Including in Training Set</TableHead>
                <TableHead className='s'>Uploaded at</TableHead>
                <TableHead className='xs'>Action</TableHead>
            </TableRow>
            {props.sampleData.map((sample,index) => {

                return <TableRow key={index} className='table-content' onClick={() => openEditor(sample.fileName, sample.filePath)}>
                        <TableCell className='xs'><input className='checkbox' type='checkbox' onClick={(e) => handleCheckboxClick(e)} /></TableCell>
                        <TableCell className='s'><img src={sample.filePath} alt='' /></TableCell>
                        <TableCell className='m'>{sample.fileName}</TableCell>
                        <TableCell className='s' status={sample.reviewStatus}><div className='badge'>{sample.reviewStatus}</div></TableCell>
                        <TableCell className='xs'>
                            <label className="switch" onClick={(e) => handleCheckboxClick(e)}>
                                <input type="checkbox" className='switch-checkbox' defaultChecked={sample.includeStatus} />
                                <span className="slider round"></span>
                            </label>
                        </TableCell>
                        <TableCell className='m'>{sample.dateUploaded}</TableCell>
                        <TableCell className='xs delete-button' onClick={(e) => deleteSample(e, sample.fileName)}><MyIcon IconName='Delete' /></TableCell>
                    </TableRow>
            })}
        </SampleTable>
        </TableWrapper>
        </>: <EmptyWrapper>
                <EmptyInnerWrapper>
                    <img src='../img/fsl-empty.svg' alt='' />
                    <div style={{marginTop:'30px'}} onClick={uploadFile}><YellowButton text='Upload Documents' /></div>
                </EmptyInnerWrapper>
            </EmptyWrapper>
        }
        </LeftWrapper>
        <SchemaWrapper>
                <FieldsWrapper>
                {currentCustomContent.length > 0? <ModelHead>Custom Model Fields (Instant)</ModelHead> : ''}
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
    </PageWrapper> : 
    <EditorWrapper className={`${hasTransitionedIn? 'show' : 'hide'}`}>
        <TestImageWrapper>
            <img src={selectedImagePath} alt='' />
        </TestImageWrapper>
        <EditSchemaWrapper>
            <div>
            <ModelHead>Custom Model Fields (Instant)</ModelHead>
            <FieldContainer className='display-only'><div>Fields</div><div>Extracted Data</div></FieldContainer>
            <ResultsWrapper>
                {MatchingFields.map((dataSets, index) => {
                    return <FieldContainer key={index} className='editable-ground-truth'>
                            <div>
                                <div className="green-badge"></div>
                                <div className='ground-truth-name'>{dataSets.field_name}</div>
                            </div>
                            <input type='text' className='field-result ground-truth-data' defaultValue={dataSets.extracted_data} />
                        </FieldContainer>
                })}
                {notMatchingFields.map((data,index) => {
                    return<FieldContainer key={index} className='editable-ground-truth'>
                            <div>
                                <div className="green-badge"></div>
                                <div className='ground-truth-name'>{data}</div>
                            </div>
                            <input type='text' className='field-result ground-truth-data' placeholder='' />
                        </FieldContainer>
                })}
            </ResultsWrapper>
            </div>
            <ButtonWrapper>
                <div onClick={reprocessSample}><BorderButton text='Reprocess Extraction'/></div>
                <div onClick={saveSample}><YellowButton text='Mark as Reviewed'/></div>
            </ButtonWrapper>
        </EditSchemaWrapper>
    </EditorWrapper>
    }
    </>
}