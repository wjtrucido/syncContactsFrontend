import styled from "styled-components"

const Strong = styled.div`
  margin-left:10px;
  font-size: 16px;
`
const ContactsDownloadInfo = (props) => {
  return (
    <>
      {props.message && <Strong> {props.message}</Strong>}
    </>
  )
}

export default ContactsDownloadInfo