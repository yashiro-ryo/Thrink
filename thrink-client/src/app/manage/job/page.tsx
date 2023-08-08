'use client'
import Footer from '@/components/ui-parts/Footer/Footer'
import NavbarComp from '@/components/ui-parts/Navbar/Navbar'
import { Container, Button, Modal, Form, Card, ListGroup, ListGroupItem } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { useAppSelector } from '@/redux/hooks'
import apiClient from '@/lib/http-common'
import { Job } from '@/values/Jobs'
import CreateJobModal from '@/components/ui-parts/Job/CreateJobModal'
import UpdateJobModal from '@/components/ui-parts/Job/UpdateJobEditor'
import DeleteJobModal from '@/components/ui-parts/Job/DeleteJobModal'
import { useRouter } from 'next/navigation'
import { checkUserSession } from '@/lib/auth'
import { useDispatch } from 'react-redux'
import { saveUserProfileMeta } from '@/redux/slices/userProfileMetaSlice'
import { signin } from '@/redux/slices/signedinStateSlice'
import { UserProfileMetaWithoutSecureData } from '@/values/UserProfileMeta'
import { styled } from 'styled-components'

const ContentBody = styled.div`
  margin: 30px 0;
`
const PageTitle = styled.h4`
  font-weight: bold;
  margin-left: 15px;
`
const StyledCard = styled(Card)`
  margin-top: 20px;
`
const ListLabel = styled.h5`
  font-weight: bold;
`

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
      setCreatedJobs(res.data.jobs)
    })
  }
  useEffect(() => {
    const onSuccessCheckSession = (userProfileMeta: UserProfileMetaWithoutSecureData | null) => {
      if (userProfileMeta === null) {
        router.push('/signin?redirect=manage-job')
        return
      }
      dispatch(signin())
      dispatch(saveUserProfileMeta(userProfileMeta))
    }
    if (userProfileMeta !== null) {
      getCreatedJobs(userProfileMeta.uid)
    } else {
      checkUserSession(onSuccessCheckSession)
    }
  }, [userProfileMeta]) // eslint-disable-line

  const CreatedJobList = () => {
    return (
      <ListGroup>
        {createdJobs.map((createdJob: Job, index: number) => {
          return (
            <ListGroupItem key={`created-joblist-${index}`}>
              <ListLabel>求人ID</ListLabel>
              <p>{createdJob.jobId}</p>
              <ListLabel>求人内容</ListLabel>
              <p>{createdJob.detail}</p>
              <Button
                variant='primary'
                onClick={() => {
                  setUpdateJobModalVisible(true)
                  setUpdateTargetJob(createdJob)
                }}
              >
                求人内容を更新する
              </Button>
              <Button
                variant='danger'
                onClick={() => {
                  setDeleteModalVisible(true)
                  setDeleteTargetJobId(createdJob.jobId)
                }}
              >
                求人を削除する
              </Button>
            </ListGroupItem>
          )
        })}
      </ListGroup>
    )
  }
  return (
    <>
      <NavbarComp />
      <Container>
        <ContentBody>
          <PageTitle>求人管理</PageTitle>
          <StyledCard>
            <Card.Header>
              <h5>求人作成</h5>
            </Card.Header>
            <Card.Body>
              <Button variant='primary' onClick={() => setCreateJobModalVisible(true)}>
                求人作成
              </Button>
            </Card.Body>
          </StyledCard>
          <StyledCard>
            <Card.Header>
              <h5>作成した求人 ({createdJobs.length}件)</h5>
            </Card.Header>
            <Card.Body>
              <div>
                {createdJobs.length > 0 ? <CreatedJobList /> : '作成された求人はありません。'}
              </div>
            </Card.Body>
          </StyledCard>
        </ContentBody>
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
