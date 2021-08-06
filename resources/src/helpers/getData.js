/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-loop-func */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const chance = require('chance').Chance();
const randomDate = require('random-datetime');
const getRandomNumber = require('./getRandomNumber');

const getUserData = files => {
  let response = [];
  for (const file in files) {
    const result = files[file].map(project => {
      const names = project.creator.name.split(' ');

      return {
        user: {
          firstName: names[0] !== 'The' ? names[0] : `The ${names[1]}`,
          lastName: names[0] !== 'The' ? names[1] || '' : '',
          email: `${names[0]}${names[1] || ''}@gmail.com`.toLowerCase(),
          phoneNumber: `+1 ${chance.phone()}`,
          balance: project.pledged,
          lastLoginDate: randomDate({
            year: 2021,
            month: 7
          }),
          description: `${project.creator.urls.web.user}/about`,
          region: project.location.name
        },
        project: {
          name: project.name,
          description: project.blurb,
          isActive: true,
          goal: project.goal,
          startDate: new Date(new Date() - project.launched_at).toISOString(),
          finishDate: new Date(new Date() + project.deadline).toISOString(),
          totalViews: getRandomNumber(100),
          minutesToRead: getRandomNumber(5),
          totalInteractionTime: getRandomNumber(2600000),
          region: project.location.name,
          category: project.category.parent_name || project.category.analytics_name,
          donates: '',
          team: '',
          faqs: ''
        }
      };
    });
    response = [...response, ...result];
  }
  return Buffer.from(JSON.stringify(response));
};

module.exports = getUserData;
