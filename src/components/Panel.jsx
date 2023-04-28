import styled from "styled-components";
import FileUpload from "./FileUpload";
import FileDownload from "./FileDownload";

const SectionSync = styled.div`
display: flex;
flex-direction: column;
margin: 5px;
height: auto;
width: 100%;
min-width: 300px;
background-color: #EFF5F6;
padding: 30px;
border-radius:3px;
`;
const Title = styled.div`
margin-top:10px;
font-size: 30px;
display: flex;
margin-left: 40px;
height: auto;
width: 100%;
min-width: 300px;
color: white;
font-weight: bold;
`;

const Panel = () => {
  return (<>
    <Title> Synchronization to mailchimp </Title>
    <SectionSync>
      <FileUpload />
      <FileDownload />
    </SectionSync>
  </>)
}

export default Panel