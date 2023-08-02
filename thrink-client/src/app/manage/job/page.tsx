'use client'
import Footer from '@/components/ui-parts/Footer/Footer'
import NavbarComp from '@/components/ui-parts/Navbar/Navbar'
import { Container, Button, Modal, Form } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { useAppSelector } from '@/redux/hooks'
import apiClient from '@/lib/http-common'
import { Job } from '@/values/Jobs'
import CreateJobModal from '@/components/ui-parts/Job/CreateJobModal'
import UpdateJobModal from '@/components/ui-parts/Job/UpdateJobEditor'
import DeleteJobModal from '@/components/ui-parts/Job/DeleteJobModal'
import { useRouter } from 'next/navigation'
import Log from '@/lib/logger'
import { checkUserSession } from '@/lib/auth'
import { useDispatch } from 'react-redux'
import { saveUserProfileMeta } from '@/redux/slices/userProfileMetaSlice'
import { signin } from '@/redux/slices/signedinStateSlice'
import { UserProfileMetaWithoutSecureData } from '@/values/UserProfileMeta'

export default function JobManagePage() {
  const [isCreateaJobModalVisible, setCreateJobModalVisible] = useState(false)
  const [isUpdateJobModalVisible, setUpdateJobModalVisible] = useState(false)
  const [isDeleteJobModalVisible, setDeleteModalVisible] = useState(false)
  const [createdJobs, setCreatedJobs] = useState<Array<Job>>([])
  const [updateTargetJob, setUpdateTargetJob] = useState<Job | null>(null)
  const [deleteTargetJobId, setDeleteTargetJobId] = useState<number | null>(null)
  const router = useRouter()
  // redux
  const dispatch = useDispatch()
  const userProfileMeta = useAppSelector((state) => state.userProfileMetaReducer.profileMeta)
  const getCreatedJobs = (uid: number) => {
    apiClient.get(`/v1/manage/jobs/${uid}`).then((res) => {
      Log.v(res.data.jobs)
      setCreatedJobs(res.data.jobs)
    })
  }
  useEffect(() => {
    const onSuccessCheckSession = (userProfileMeta: UserProfileMetaWithoutSecureData) => {
      dispatch(signin())
      dispatch(saveUserProfileMeta(userProfileMeta))
    }
    const onErrorCheckSession = () => router.push('/signin?redirect=manage-job')
    if (userProfileMeta !== null) {
      getCreatedJobs(userProfileMeta.uid)
    } else {
      checkUserSession(onSuccessCheckSession, onErrorCheckSession)
    }
  }, [userProfileMeta]) // eslint-disable-line

  const CreatedJobList = () => {
    return (
      <div>
        {createdJobs.map((createdJob: Job, index: number) => {
          return (
            <div key={`created-joblist-${index}`}>
              <p>{createdJob.jobId}</p>
              <p>{createdJob.detail}</p>
              <Button
                variant='primary'
                onClick={() => {
                  setUpdateJobModalVisible(true)
                  setUpdateTargetJob(createdJob)
                  Log.v(createdJob)
                }}
              >
                求人内容を更新する
              </Button>
              <Button
                variant='danger'
                onClick={() => {
                  setDeleteModalVisible(true)
                  setDeleteTargetJobId(createdJob.jobId)
                  Log.v(createdJob)
                }}
              >
                求人を削除する
              </Button>
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
      <CreateJobModal
        isVisible={isCreateaJobModalVisible}
        setVisible={setCreateJobModalVisible}
        setCreatedJobs={setCreatedJobs}
      />
      <UpdateJobModal
        isVisible={isUpdateJobModalVisible}
        setVisible={setUpdateJobModalVisible}
        updateTargetJob={updateTargetJob}
        setCreatedJobs={setCreatedJobs}
      />
      <DeleteJobModal
        isVisible={isDeleteJobModalVisible}
        setVisible={setDeleteModalVisible}
        jobId={deleteTargetJobId}
        setCreatedJobs={setCreatedJobs}
      />
    </>
  )
}
