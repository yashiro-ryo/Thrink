import db from "./database";

export type JobDB = {
  job_id: number;
  uid: number;
  detail: string;
  reward: string;
  application_requirements: string;
  working_time: string;
  place: string;
  start_at: any;
  end_at: any;
};

export type Job = {
  jobId: number;
  uid: number;
  detail: string;
  reward: string;
  applicationRequirements: string;
  workingTime: string;
  place: string;
  startAt: any;
  endAt: any;
};

export class JobModels {
  constructor() {}

  getCreatedJobByUid(uid: number) {
    return db.query(`select * from job where uid = ${uid}`);
  }

  createJob(
    uid: number,
    detail: string,
    reward: string,
    condition: string,
    workingTime: string,
    place: string
  ) {
    db.query(
      `insert into job (uid, detail, reward, application_requirements, working_time, place, start_at, end_at) values (${uid}, '${detail}', '${reward}', '${condition}', '${workingTime}', '${place}', '2022/09/22 12:00:00', '2022/09/30 12:00:00');`
    );
  }

  updateJob(
    jobId: number,
    detail: string,
    reward: string,
    condition: string,
    workingTime: string,
    place: string
  ) {
    db.query(
      `update job set detail = '${detail}', reward = '${reward}', application_requirements = '${condition}', working_time = '${workingTime}', place = '${place}' where job_id = ${jobId}`
    );
  }

  migrateSnakeCaseToCamelCase(job: JobDB): Job {
    return {
      jobId: job.job_id,
      uid: job.uid,
      detail: job.detail,
      reward: job.reward,
      applicationRequirements: job.application_requirements,
      workingTime: job.working_time,
      place: job.place,
      startAt: job.start_at,
      endAt: job.end_at,
    };
  }
}
