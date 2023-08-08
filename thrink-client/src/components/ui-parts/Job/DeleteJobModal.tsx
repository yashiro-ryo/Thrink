import apiClient from '@/lib/http-common'
import { Modal, Button } from 'react-bootstrap'
import { Job } from '@/values/Jobs'
import { useAppSelector } from '@/redux/hooks'

type Props = {
  isVisible: boolean
  setVisible: (isVisible: boolean) => void
  jobId: number | null
  setCreatedJobs: (jobs: Array<Job>) => void
}

export default function DeleteJobModal(props: Props) {
  const userProfileMeta = useAppSelector((state) => state.userProfileMetaReducer.profileMeta)
  const deleteJob = () => {
    if (props.jobId !== null && userProfileMeta !== null) {
      apiClient
        .post('/v1/manage/delete', { uid: userProfileMeta.uid, jobId: props.jobId })
        .then((res) => {
          props.setCreatedJobs(res.data.jobs)
        })
    }
    props.setVisible(false)
  }
  return (
    <Modal show={props.isVisible} onHide={() => props.setVisible(false)}>
      <Modal.Header closeButton>
        <Modal.Title>求人削除確認</Modal.Title>
      </Modal.Header>
      <Modal.Body>求人を削除します。この操作は取り消せません。</Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={() => props.setVisible(false)}>
          削除しない
        </Button>
        <Button variant='primary' onClick={() => deleteJob()}>
          削除する
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
