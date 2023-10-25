import styled from "styled-components";
import { YellowButton, BorderButton } from '../ui-components/button';
import { useState } from "react";
import callLoading from "../helper/CallLoading";

const Overlay = styled.div`
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.2);
    position: absolute;
    color: #25D0B1;
    font-size: 14px;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    display: none;

    &.show {
        display: flex;
    }
`
const Modal = styled.div`
    background: white;
    padding: 8px;
    border-radius: 4px;
`
const FileWrapper = styled.div`
    border: 1px solid #e1e1e1;
    background: #FAF9F8;
    padding: 20px;
    border-radius: 2px;
    height: 350px;
    width: 550px;
    overflow-y: scroll;
    display: flex;
    flex-wrap: wrap;
    align-items: ;
    gap: 20px;

    img {
        width: 80px;
        height: 100px;
        border-radius: 4px;
        transition: 100ms ease 0s;
        box-sizing: border-box;
        border: 2px solid transparent;
        cursor: pointer;

        &:hover {
            border: 2px solid #25D19D;
            opacity: .8;
        }

        &.selected {
            border: 2px solid #25D19D;
        }
    }
`
const ButtonWrapper = styled.div`
    margin: 12px 0;
    display: flex;
    gap: 4px;
    justify-content: end;
`

export default function FilePicker(props) {

    const [selectedFile, setSelectedFile] = useState('')
    const [selectedFilePath, setSelectedFilePath] = useState('')
    const [selectedFileGroundTruth, setSelectedFileGroundTruth] = useState([])

    const selectImg = (e) => {
        const elems = document.querySelectorAll('.data-file')
        elems.forEach(elem => elem.classList.remove('selected'))
        e.currentTarget.classList.add('selected')

        setSelectedFile(e.currentTarget.getAttribute('file'))
        setSelectedFilePath(e.currentTarget.getAttribute('path'))
        setSelectedFileGroundTruth(JSON.parse(e.currentTarget.getAttribute('truth')))  
    }
    const closePicker = () => {
        document.querySelector('.file-picker.show').classList.remove('show')
    }

    const uploadSample = (extractorId) => {
        if (extractorId) {
            const today = new Date();
            const day = today.getDate();
            const month = today.getMonth() + 1; // Note: January is 0
            const year = today.getFullYear();
            const newDate = `${day}/${month}/${year}`
    
            const sampleObj = {
                fileName: selectedFile,
                filePath: selectedFilePath,
                reviewStatus: 'Pending Review',
                dateUploaded: newDate,
                includeStatus: false,
                groundTruth : selectedFileGroundTruth
            }
            const allExtractor = JSON.parse(sessionStorage.getItem("allFSLSampleContent"))
            const thisExtractor = allExtractor.filter(elem => elem.extractorID === extractorId)
            const thisSampleArray = thisExtractor[0].samples
            thisSampleArray.push(sampleObj)
    
            sessionStorage.setItem("allFSLSampleContent", JSON.stringify(allExtractor));
            document.querySelector('.file-picker').classList.remove('show')
    
            props.setSampleData(thisExtractor[0].samples)

        } else {

            const selectedSampleData = props.images.filter(image => image.fileName === selectedFile)
            props.setSampleData(selectedSampleData)
            document.querySelector('.file-picker.show').classList.remove('show')
            callLoading('Extracting Document...', props.displayTestResults, selectedSampleData)
        }
    }
    //page composition
    return <>
        <Overlay className={`${props.className} file-picker`}>
            <Modal>
                <FileWrapper>
                    {props.images.map((image, index) => {
                        return <div key={index} style={{textAlign:'center'}}>
                            <img className='data-file' onClick={(e) => selectImg(e)} src={image.filePath} alt='' path={image.filePath} file={image.fileName} truth={JSON.stringify(image.initialGroundTruth)}/>
                            <p style={{color:'#6d6d6d', fontSize: '10px'}}>{image.fileName}</p>
                        </div>
                    })}
                </FileWrapper>
                <ButtonWrapper>
                    <div onClick={closePicker}><BorderButton text='Cancel' /></div>
                    <div onClick={() => uploadSample(props.extractorID)}><YellowButton text='Upload' /></div>
                </ButtonWrapper>
            </Modal>
        </Overlay>
    </>   
}