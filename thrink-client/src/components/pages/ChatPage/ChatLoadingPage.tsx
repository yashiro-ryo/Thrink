import { Spinner } from 'react-bootstrap'
import styled from 'styled-components'

const LoadingPage = styled.div`
  width: 100%;
  height: calc(100vh - 50px);
  text-align: center;
`
const SpinnerWrapper = styled.div`
  margin-top: 100px;
`

export default function ChatLoadingPage() {
  return (
    <LoadingPage>
      <SpinnerWrapper>
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      </SpinnerWrapper>
      <div>
        <p>Loading...</p>
      </div>
    </LoadingPage>
  )
}
