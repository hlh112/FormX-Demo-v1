import { useState, useEffect } from 'react';
import ManageFields from './extractor_tabs/manage_fields';
import TrainModels from './extractor_tabs/train-models';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { Icon } from '@fluentui/react/lib/Icon';
import {Navbar, NavbarCollapsed} from '../ui-components/navbar';
import Guide from '../ui-components/guide';
import FilePicker from '../ui-components/file-picker';
import { getSampleSource } from '../data/fsl_sample_source';
import callToaster from '../helper/CallToaster';
import { getExtractedData, getExtractedRefinedData } from '../data/extracted_data';

const ExtractorHeader = styled.div`
    border-bottom: 1px solid #e1e1e1;
    padding: 0px 20px;
`
const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    transform: scale(1);
    animation: fadeInAnimation 500ms 1;
    opacity: 1;

    @keyframes fadeInAnimation {
        0% {
            transform: scale(.99);
            opacity: 0;
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
      }
`
const InnerPageWrapper = styled.div`
`
const Breadcrumb = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
`
const BreadcrumbItem = styled.p`
    display: inline-block;
    transition: 500ms ease 0s;
    font-size: 14px;

    &.selected {
        font-weight: bold;
    }

    &.link {
        opacity: .5;
        cursor: pointer;

        &:hover {
            opacity: 1;
        }
    }

    &.chevron {
        font-size: 14px;
        opacity: .5;
    }
`
const TabBar = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
`
const TabItem = styled.div`
    box-sizing: border-box;
    padding: 10px;
    font-size: 14px;
    opacity: .5;
    cursor: pointer;
    border-bottom: solid 3px transparent;
    transition: 400ms ease 0s;
    font-size: 12px;

    &:hover {
        opacity: .2;
    }

    &.selected {
        border-bottom: solid 3px #25D0B1;
        opacity: 1;
    } 
`

export default function Extractor() {

    const MyIcon = (props) => <Icon iconName={props.IconName} className={props.ClassName}/>;

    const [currentTab, setCurrentTab] = useState('manage-fields')
    const navigate = useNavigate();

    const allSchema = JSON.parse(sessionStorage.getItem("allExtractorContent"));
    const thisExtractorID = JSON.parse(sessionStorage.getItem("selectedExtractorID"));
    const schema = allSchema.filter(item => item.extractorID === thisExtractorID)
    const extractorName = schema[0].extractorName
    const currentPreTrainedContent = schema[0].PreTrainedFields
    const currentCustomContent = schema[0].CustomFields
    
    const selectTab = (e) => {
        const activeElements = document.querySelectorAll('.extractor-tab');
        activeElements.forEach(element => {
            element.classList.remove('selected')
          });
          e.currentTarget.classList.add('selected')

        const tabValue = e.currentTarget.getAttribute('data-label')
        setCurrentTab(tabValue)
    }

    const handleClick = (e) => {
        const path = e.target.getAttribute('href')
        navigate(path);
      };
    //fsl sample testing handings
    const FSLSampleData = getSampleSource()

    const allSampleData = JSON.parse(sessionStorage.getItem("allFSLSampleContent"));
    const rawSampleData = allSampleData.filter(item => item.extractorID === thisExtractorID)[0].samples 
    const [sampleData, setSampleData] = useState(rawSampleData)


    //Test extractor handling
    const [selectedImage, setSelectedImage] = useState('')

    const extractedData = getExtractedData()
    const extractedRefinedData = getExtractedRefinedData()
    const [FSLSampleCount, setFSLSampleCount] = useState(false)
    
    const [dataSet, setDataSet] = useState(() => {
        const storage = JSON.parse(sessionStorage.getItem("sampleCount"));
        if (storage === true) {
            return extractedRefinedData
        } else {
            return extractedData
        }
    })

    useEffect(() => {
        const storage = JSON.parse(sessionStorage.getItem("sampleCount"));
        if ( storage === true) {
            return setDataSet(extractedRefinedData)
        } else {
            return setDataSet(extractedData)
    }}, [FSLSampleCount])

    sessionStorage.setItem("sampleCount", JSON.stringify(FSLSampleCount));

    const [runTesting, setRunTesting] = useState(false)

    const displayTestResults = (selectedImageData) => {
        setRunTesting(true)
    }

    const resetDisplayTestResults = (selectedImageData) => {
        setRunTesting(false)
    }

    //page composition
    return <>
        <FilePicker images={FSLSampleData} extractorID={thisExtractorID} setSampleData={setSampleData} />
        <FilePicker images={dataSet} setSampleData={setSelectedImage} displayTestResults={displayTestResults} className='test-extractor'/>
        <NavbarCollapsed />
        <PageWrapper>
        <ExtractorHeader>
            <Breadcrumb>
                <BreadcrumbItem className='link' href='../extractors' onClick={handleClick}>Extractors</BreadcrumbItem>
                <BreadcrumbItem className='chevron'><MyIcon IconName='ChevronRight'/></BreadcrumbItem>
                <BreadcrumbItem className='selected'>{extractorName}</BreadcrumbItem>
            </Breadcrumb>
            <TabBar>
                    <TabItem className='extractor-tab selected tab-manage-fields' data-label='manage-fields' onClick={selectTab}>Manage Fields</TabItem>
                    <TabItem className='extractor-tab tab-train-models' data-label='train-models' onClick={selectTab}>Train Models</TabItem>
                    <TabItem className='extractor-tab' data-label='' onClick={() => callToaster('red', 'Page not implemented')}>Formatter</TabItem>
                    <TabItem className='extractor-tab' data-label='' onClick={() => callToaster('red', 'Page not implemented')}>Workflow</TabItem>
                    <TabItem className='extractor-tab' data-label='' onClick={() => callToaster('red', 'Page not implemented')}>API</TabItem>
                    <TabItem className='extractor-tab' data-label='' onClick={() => callToaster('red', 'Page not implemented')}>Extraction Panel</TabItem>
                    <TabItem className='extractor-tab' data-label='' onClick={() => callToaster('red', 'Page not implemented')}>Settings</TabItem>
            </TabBar>
        </ExtractorHeader>

        <InnerPageWrapper>     
            {
                (() => {
                    if(currentTab === 'manage-fields') {
                            return (
                                <ManageFields selectedImage={selectedImage} runTesting={runTesting} resetTest={resetDisplayTestResults} />
                            )
                        } else if (currentTab === 'train-models') {
                            return (
                                <TrainModels sampleData={sampleData} setSampleData={setSampleData} setFSLSampleCount={setFSLSampleCount}/>
                            )
                        }
                })()  
            }  
        </InnerPageWrapper>
        <Guide />
        </PageWrapper>
    </>    
}