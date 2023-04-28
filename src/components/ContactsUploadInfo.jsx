import styled from "styled-components"

const Info = styled.div`
  padding-top:5px;
  font-size: 16px;
  margin-left:10px;
`
const ContactsUploadInfo = (props) => {
  return (
    <>
      {props.message && <Info> {props.message}</Info>}
    </>
  )
}

export default ContactsUploadInfo;