'use client'
import Footer from '@/components/ui-parts/Footer/Footer'
import NavbarComp from '@/components/ui-parts/Navbar/Navbar'
import { Container, Button, Modal, Form } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { useAppSelector } from '@/redux/hooks'
import apiClient from '@/lib/http-common'
import { Job } from '@/values/Jobs'
import CreateJobModal from '@/components/ui-parts/CreateJobModal'

export default function JobManagePage() {
  const [isCreateaJobModalVisible, setCreateJobModalVisible] = useState(false)
  const [createdJobs, setCreatedJobs] = useState<Array<Job>>([])
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
        <Button variant='primary' onClick={() => setCreateJobModalVisible(true)}>
          求人作成
        </Button>
        <h5>作成した求人</h5>
        <div>{createdJobs.length > 0 ? <CreatedJobList /> : '作成された求人はありません。'}</div>
      </Container>
      <Footer />
      <CreateJobModal isVisible={isCreateaJobModalVisible} setVisible={setCreateJobModalVisible} />
    </>
  )
}
