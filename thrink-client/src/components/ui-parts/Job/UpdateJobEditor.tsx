import apiClient from '@/lib/http-common'
import { Job } from '@/values/Jobs'
import { useEffect, useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useAppSelector } from '@/redux/hooks'

type Props = {
  isVisible: boolean
  setVisible: (isVisible: boolean) => void
  updateTargetJob: Job | null
}

export default function UpdateJobModal(props: Props) {
  const userProfileMeta = useAppSelector((state) => state.userProfileMetaReducer.profileMeta)
  const [inputDetail, setInputDetail] = useState('')
  const [inputReward, setInputReward] = useState('')
  const [inputCondition, setInputCondition] = useState('')
  const [inputTime, setInputTime] = useState('')
  const [inputPlace, setInputPlace] = useState('')
  const handleClose = () => {
    props.setVisible(false)
  }
  const onChangeInputDetail = (e: any) => {
    setInputDetail(e.target.value)
  }
  const onChangeInputReward = (e: any) => {
    setInputReward(e.target.value)
  }
  const onChangeInputCondition = (e: any) => {
    setInputCondition(e.target.value)
  }
  const onChangeInputTime = (e: any) => {
    setInputTime(e.target.value)
  }
  const onChnageInputPlace = (e: any) => {
    setInputPlace(e.target.value)
  }
  const updateJob = () => {
    console.log(inputDetail, inputCondition, inputPlace, inputReward, inputTime)
    if (userProfileMeta !== null && props.updateTargetJob !== null) {
      apiClient
        .post(`/v1/manage/update`, {
          uid: userProfileMeta.uid,
          jobId: props.updateTargetJob.jobId,
          detail: inputDetail,
          reward: inputReward,
          condition: inputCondition,
          workingTime: inputTime,
          place: inputPlace,
        })
        .then((res) => {
          console.log(res)
        })
    }
    handleClose()
    clearEditor()
  }
  const clearEditor = () => {
    setInputCondition('')
    setInputDetail('')
    setInputPlace('')
    setInputReward('')
    setInputTime('')
  }
  useEffect(() => {
    console.log(props.updateTargetJob)
    if (props.updateTargetJob !== undefined && props.updateTargetJob !== null) {
      setInputDetail(props.updateTargetJob.detail)
      setInputCondition(props.updateTargetJob.applicationRequirements)
      setInputPlace(props.updateTargetJob.place)
      setInputReward(props.updateTargetJob.reward)
      setInputTime(props.updateTargetJob.workingTime)
    }
  }, [props.updateTargetJob])
  return (
    <Modal show={props.isVisible} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>求人更新</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
            <Form.Label>求人内容</Form.Label>
            <Form.Control
              as='textarea'
              rows={3}
              value={inputDetail}
              onChange={onChangeInputDetail}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
            <Form.Label>時給</Form.Label>
            <Form.Control
              as='textarea'
              rows={3}
              value={inputReward}
              onChange={onChangeInputReward}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
            <Form.Label>応募条件</Form.Label>
            <Form.Control
              as='textarea'
              rows={3}
              value={inputCondition}
              onChange={onChangeInputCondition}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
            <Form.Label>勤務時間</Form.Label>
            <Form.Control as='textarea' rows={3} value={inputTime} onChange={onChangeInputTime} />
          </Form.Group>
          <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
            <Form.Label>勤務地</Form.Label>
            <Form.Control as='textarea' rows={3} value={inputPlace} onChange={onChnageInputPlace} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          閉じる
        </Button>
        <Button variant='primary' onClick={() => updateJob()}>
          作成する
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
