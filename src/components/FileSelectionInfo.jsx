import styled from "styled-components"

const StateFileSelectInfo = styled.div`
    display:flex;
    font-size: 16px;
    margin-left:10px;
`
const Strong = styled.div`
    font-weight: bold;
`
const FileSelectInfo = (props) => {
  return (
    <>
      {props.fileName ? <StateFileSelectInfo> Select file:&nbsp;<Strong>"{props.fileName}".</Strong></StateFileSelectInfo>
        : <StateFileSelectInfo>No file selected yet.</StateFileSelectInfo>}
    </>
  )
}
export default FileSelectInfo;