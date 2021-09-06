import { Project } from 'hypecrafter-shared/enums';
import MicroMq from 'micromq';
import * as cron from 'node-cron';
import { ActionType } from '../common/enums';
import { Job } from '../common/types';
import { dataToScheduleForm } from '../helpers/dataToScheduleForm';
import { Services } from '../services/index';

export class JobController {
  #jobCollection: Map<string, any> = new Map();

  #services: Services;

  #app: MicroMq;

  constructor(app: MicroMq, services: Services) {
    this.#app = app;
    this.#services = services;

    services.jobService.getAll().then((jobs: Array<Job>) => {
      jobs.forEach(job => this.startJob(job));
    });
  }

  startJob(job: Job) {
    const { finishDate, projectId } = job;
    const finishDateToScheduleForm = dataToScheduleForm(new Date(finishDate));

    const task = cron.schedule(
      finishDateToScheduleForm,
      async () => {
        const { response } = (await this.#app.ask(Project.BACKEND, {
          server: {
            action: ActionType.GET_WATCHING_USERS,
            meta: {
              projectId
            },
          },
        })) as { response: { users: string } };

        this.stopJobByProjectId(projectId);

        console.log(response.users);
      },
      { scheduled: true }
    );

    this.#jobCollection.set(projectId, task);
  }

  stopJobByProjectId(projectId: string) {
    this.#services.jobService.deleteByProjectId(projectId);
    const task = this.#jobCollection.get(projectId);
    task.destroy();
  }
}
