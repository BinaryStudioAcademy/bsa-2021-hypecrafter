import MicroMq from 'micromq';
import * as cron from 'node-cron';
import { dataToScheduleForm } from '../helpers/dataToScheduleForm';
import { Services } from '../services';

export const initSchedule = async (app: MicroMq, services: Services) => {
  const jobs = await services.jobService.getAll();
  jobs.forEach(job => {
    const { finishDate, projectId } = job;

    const finishDateToScheduleForm = dataToScheduleForm(new Date(finishDate));

    cron.schedule(
      finishDateToScheduleForm,
      async () => {
        // const projectId = 'a9ea4107-10de-44f0-93da-3c24c1932e56';
        const { response } = (await app.ask('backend', {
          server: {
            action: 'getWatchingUsers',
            meta: {
              projectId
            },
          },
        })) as { response: { users: string } };

        services.jobService.deleteByProjectId(projectId);
        console.log(response.users);
      },
      { scheduled: true }
    );
  });
};
