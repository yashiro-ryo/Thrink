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
