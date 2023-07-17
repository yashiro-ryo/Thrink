'use client'
import Footer from '@/components/ui-parts/Footer/Footer'
import NavbarComp from '@/components/ui-parts/Navbar/Navbar'
import { Container, Button, Modal, Form } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { useAppSelector } from '@/redux/hooks'
import apiClient from '@/lib/http-common'
import { Job } from '@/values/Jobs'

export default function JobManagePage() {
  const [show, setShow] = useState(false)
  const [createdJobs, setCreatedJobs] = useState<Array<Job>>([])
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const userProfileMeta = useAppSelector((state) => state.userProfileMetaReducer.profileMeta)
  const getCreatedJobs = (uid: number) => {
    apiClient.get(`/v1/manage/jobs/${uid}`).then((res) => {
      console.log(res.data.jobs)
      setCreatedJobs(res.data.jobs)
    })
  }

  useEffect(() => {
    console.log(userProfileMeta)
    if (userProfileMeta !== null) {
      getCreatedJobs(userProfileMeta.uid)
    }
  }, [userProfileMeta])

  const CreatedJobList = () => {
    return (
      <div>
        {createdJobs.map((createdJob: Job, index: number) => {
          return (
            <div key={`created-joblist-${index}`}>
              <p>{createdJob.jobId}</p>
              <p>{createdJob.detail}</p>
            </div>
          )
        })}
      </div>
    )
  }
  return (
    <>
      <NavbarComp />
      <Container>
        <h4>求人管理</h4>
        <h5>求人作成</h5>
        <Button variant='primary' onClick={handleShow}>
          求人作成
        </Button>
        <h5>作成した求人</h5>
        <div>{createdJobs.length > 0 ? <CreatedJobList /> : '作成された求人はありません。'}</div>
      </Container>
      <Footer />
      {/* modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>求人作成</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
              <Form.Label>求人内容</Form.Label>
              <Form.Control as='textarea' rows={3} />
            </Form.Group>
            <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
              <Form.Label>時給</Form.Label>
              <Form.Control as='textarea' rows={3} />
            </Form.Group>
            <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
              <Form.Label>応募条件</Form.Label>
              <Form.Control as='textarea' rows={3} />
            </Form.Group>
            <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
              <Form.Label>勤務時間</Form.Label>
              <Form.Control as='textarea' rows={3} />
            </Form.Group>
            <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
              <Form.Label>勤務地</Form.Label>
              <Form.Control as='textarea' rows={3} />
            </Form.Group>
            <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
              <Form.Label>掲載期間</Form.Label>
              <Form.Control as='textarea' rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            閉じる
          </Button>
          <Button variant='primary' onClick={handleClose}>
            作成する
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
