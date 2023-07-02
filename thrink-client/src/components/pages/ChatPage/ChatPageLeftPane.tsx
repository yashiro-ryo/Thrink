import styled from 'styled-components'
const LeftPane = styled.div`
  width: 300px;
  height: calc(100vh - 56px - 50px);
  border-right: 1px solid #636363;
`
const Lists = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
`
const ListItem = styled.button`
  border: none;
  border-bottom: 1px solid #636363;
  border-right: 1px solid #636363;
  height: 60px;
  &:hover {
    background-color: #d6d6d6;
  }
`

export default function ChatPageLeftPane() {
  return (
    <LeftPane>
      <Lists>
        <ListItem>
          <p>チャットルーム1</p>
        </ListItem>
        <ListItem>
          <p>チャットルーム2</p>
        </ListItem>
        <ListItem>
          <p>チャットルーム3</p>
        </ListItem>
      </Lists>
    </LeftPane>
  )
}
