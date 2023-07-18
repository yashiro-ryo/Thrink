import { Router, Request, Response } from "express";
import { JobModels, JobDB } from "../models/jobModels";

export const jobRouter = Router();
const jobModels = new JobModels();

// GET /v1/manage/jobs
jobRouter.get("/manage/jobs/:uid", (req: Request, res: Response) => {
  jobModels
    .getCreatedJobByUid(Number(req.params.uid))
    .then((queryRes: Array<JobDB>) => {
      const jobsForFrontend = queryRes.map((job: JobDB) => {
        return jobModels.migrateSnakeCaseToCamelCase(job);
      });
      res.status(200).json({ jobs: jobsForFrontend });
    });
});

// POST /v1/manage/create
jobRouter.post(`/manage/create`, async (req: Request, res: Response) => {
  console.log(req.body);
  if (
    !(
      "uid" in req.body &&
      "detail" in req.body &&
      "reward" in req.body &&
      "condition" in req.body &&
      "workingTime" in req.body &&
      "place" in req.body
    )
  ) {
    res.status(500).json({ msg: "Internal server error" });
    return;
  }
  await jobModels.createJob(
    Number(req.body.uid),
    req.body.detail,
    req.body.reward,
    req.body.condition,
    req.body.workingTime,
    req.body.place
  );
  await jobModels
    .getCreatedJobByUid(Number(req.body.uid))
    .then((queryRes: Array<JobDB>) => {
      const jobsForFrontend = queryRes.map((job: JobDB) => {
        return jobModels.migrateSnakeCaseToCamelCase(job);
      });
      res.status(200).json({ jobs: jobsForFrontend });
    });
});

// POST /v1/manage/update
jobRouter.post("/manage/update", async (req: Request, res: Response) => {
  console.log(req.body);
  if (
    !(
      "uid" in req.body &&
      "jobId" in req.body &&
      "detail" in req.body &&
      "reward" in req.body &&
      "condition" in req.body &&
      "workingTime" in req.body &&
      "place" in req.body
    )
  ) {
    res.status(500).json({ msg: "Internal server error" });
    return;
  }
  await jobModels.updateJob(
    Number(req.body.jobId),
    req.body.detail,
    req.body.reward,
    req.body.condition,
    req.body.workingTime,
    req.body.place
  );
  await jobModels
    .getCreatedJobByUid(Number(req.body.uid))
    .then((queryRes: Array<JobDB>) => {
      const jobsForFrontend = queryRes.map((job: JobDB) => {
        return jobModels.migrateSnakeCaseToCamelCase(job);
      });
      res.status(200).json({ jobs: jobsForFrontend });
    });
});

// POST /v1/manage/delete
jobRouter.post("/manage/delete", async (req: Request, res: Response) => {
  if (!("jobId" in req.body && "uid" in req.body)) {
    res.status(500).json({ msg: "Internal server error" });
    return;
  }
  await jobModels.deleteJob(req.body.jobId);
  await jobModels
    .getCreatedJobByUid(Number(req.body.uid))
    .then((queryRes: Array<JobDB>) => {
      const jobsForFrontend = queryRes.map((job: JobDB) => {
        return jobModels.migrateSnakeCaseToCamelCase(job);
      });
      res.status(200).json({ jobs: jobsForFrontend });
    });
});
