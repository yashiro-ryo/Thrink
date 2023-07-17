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
