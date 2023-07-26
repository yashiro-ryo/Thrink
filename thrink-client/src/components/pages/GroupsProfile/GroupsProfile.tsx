import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Container, Image, Button, Card } from 'react-bootstrap'
import apiClient from '@/lib/http-common'
import { GroupProfile } from '@/values/Groups'
import { Job } from '@/values/Jobs'
import { nullCheck } from '@/lib/stringHelper'
import { filterIconImgUrl, filterHeaderImgUrl } from '@/lib/imgUrlHelper'

const HeaderImagePart = styled.div`
  width: 100%;
  height: 300px;
`

const UserIconPart = styled(Image)`
  width: 120px;
  height: 120px;
`

const CustomContainer = styled(Container)`
  @media screen and (min-width: 992px) {
    padding-left: 100px;
    padding-right: 100px;
  }
`

const UserProfileBody = styled.div`
  position: relative;
  top: -60px;
`

const StyledGroupProfileLabel = styled.h5`
  font-weight: bold;
`

const StyledGroupJobInfoLabel = styled.h6`
  font-weight: bold;
`
const StyledGroupDisplayName = styled.h3`
  margin-top: 20px;
  margin-bottom: 30px;
`
const JobCard = styled(Card)`
  padding: 10px;
  margin-bottom: 20px;
`

export default function GroupsProfile(props: { gidStr: string }) {
  const [profile, setProfile] = useState<GroupProfile>({
    uid: 0,
    displayName: '',
    location: '',
    activityDetail: '',
    activityDay: '',
    activityTime: '',
    membersNum: 0,
    awards: '',
    iconImgUrl: '',
    headerImgUrl: '',
  })
  const [jobs, setJobs] = useState<Array<Job>>([])
  const getGroupProfile = (gid: number) => {
    apiClient.get(`/v1/groups/${gid}`).then((res: any) => {
      console.log(res.data)
      setProfile(res.data.groupProfile)
    })
  }
  const getGroupJob = (gid: number) => {
    apiClient.get(`/v1/manage/jobs/${gid}`).then((res) => {
      console.log(res)
      setJobs(res.data.jobs)
    })
  }
  useEffect(() => {
    console.log(`gid: ${props.gidStr}`)
    getGroupProfile(Number(props.gidStr))
    getGroupJob(Number(props.gidStr))
  }, [props.gidStr])

  const UserProfileNull = () => {
    return (
      <div>
        <p>プロフィールの取得に失敗しました。</p>
        <Button href={`/student/${props.gidStr}`} variant='secondary'>
          リロードする
        </Button>
      </div>
    )
  }
  const GroupListItem = (props: { titleText: string; bodyText: string | null }) => {
    return (
      <>
        <StyledGroupProfileLabel>{props.titleText}</StyledGroupProfileLabel>
        <p>{nullCheck(props.bodyText)}</p>
      </>
    )
  }
  const GroupJobListItem = (props: { title: string; body: string | null }) => {
    return (
      <>
        <StyledGroupJobInfoLabel>{props.title}</StyledGroupJobInfoLabel>
        <p>{nullCheck(props.body)}</p>
      </>
    )
  }
  return (
    <div>
      <HeaderImagePart>
        <Image
          src={filterHeaderImgUrl(profile)}
          alt='ヘッダー画像'
          width={'100%'}
          height={'100%'}
        />
      </HeaderImagePart>
      <CustomContainer>
        <UserProfileBody>
          <UserIconPart
            src={filterIconImgUrl(profile)}
            roundedCircle
            alt='〇〇さんのプロフィール画像'
            width={'120px'}
            height={'120px'}
          />
          {profile === null ? (
            <UserProfileNull />
          ) : (
            <div>
              <StyledGroupDisplayName>{profile.displayName}</StyledGroupDisplayName>
              <GroupListItem titleText='活動詳細' bodyText={profile.activityDetail} />
              <GroupListItem titleText='活動日' bodyText={profile.activityDay} />
              <GroupListItem titleText='活動時間' bodyText={profile.activityTime} />
              <GroupListItem titleText='活動場所' bodyText={profile.location} />
              <GroupListItem titleText='所属人数' bodyText={String(profile.membersNum)} />
              <GroupListItem titleText='受賞歴' bodyText={profile.awards} />
              <StyledGroupProfileLabel>募集中の求人({jobs.length}件)</StyledGroupProfileLabel>
              {jobs.map((job: Job, index: number) => {
                return (
                  <JobCard key={`joblist-${job.jobId}-${index}`}>
                    <GroupJobListItem title='募集詳細' body={job.detail} />
                    <GroupJobListItem title='募集条件' body={job.applicationRequirements} />
                    <GroupJobListItem title='勤務時間' body={job.workingTime} />
                    <GroupJobListItem title='勤務地' body={job.place} />
                    <GroupJobListItem title='報酬' body={job.reward} />
                    <Button>応募する</Button>
                  </JobCard>
                )
              })}
            </div>
          )}
        </UserProfileBody>
      </CustomContainer>
    </div>
  )
}
