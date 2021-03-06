import { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { Routes } from '../../common/enums';
import { CreateProject as Project } from '../../common/types';
import LoaderWrapper from '../../components/LoaderWrapper';
import Seo from '../../components/Seo';
import { useAction, useAuth, useTypedSelector } from '../../hooks';
import { useLocalization } from '../../providers/localization';
import Basic from './components/Basic';
import BeforeStart from './components/BeforeStart';
import FAQS from './components/FAQ';
import Funding from './components/Funding';
import Privileges from './components/Privileges';
import Recommendations from './components/Recommendations';
import Settings from './components/Settings';
import Story from './components/Story';
import Team from './components/Team';
import { CurrentPage, ProjectKeys } from './enums';

// import classes from './styles.module.scss';

const CreateProject = () => {
  const initProject: Project = {
    name: '',
    description: '',
    category: '',
    content: '',
    goal: 0,
    region: '',
    team: { name: '', teamUsers: [] },
    imageUrl: '',
    videoUrl: '',
    projectTags: [],
    donatorsPrivileges: [],
    faqs: [],
  };
  const { id: userId } = useAuth();
  const { id } = useParams<{ id: string }>();
  const store = useTypedSelector(({ project: { project, isLoading } }) => ({
    project,
    isLoading,
  }));
  const { createProjectAction, getForEditProjectAction } = useAction();
  const { project, isLoading } = store;
  const [newProject, setNewProject] = useState(initProject);
  const [currentPage, setCurrentPage] = useState(id ? CurrentPage.BASIC : CurrentPage.BEFORE_START);
  const { t } = useLocalization();

  const end = (page: CurrentPage) => {
    if (page === CurrentPage.END) {
      console.log(newProject);
      createProjectAction({ ...newProject, authorId: userId });
    }
    setCurrentPage(page);
  };
  const handleChangeValue = (name: ProjectKeys, value: any) => {
    setNewProject({ ...newProject, [name]: value });
  };
  useEffect(() => {
    if (id) getForEditProjectAction(id, userId);
  }, []);
  useEffect(() => {
    if (id) {
      project.startDate = new Date(project.startDate || '');
      project.finishDate = new Date(project.finishDate || '');
      project.projectTags = project.projectTags || [];
      project.donatorsPrivileges = project.donatorsPrivileges || [];
      project.team = project.team || { name: '', teamUsers: [] };
      project.team.teamUsers = project.team.teamUsers || [];
      project.faqs = project.faqs || [];
      setNewProject(project);
    }
  }, [project]);
  const getView = () => {
    switch (currentPage) {
      case CurrentPage.BEFORE_START:
        return <BeforeStart changePage={setCurrentPage} currentPage={currentPage} />;
      case CurrentPage.BASIC:
        return (
          <Basic
            changePage={setCurrentPage}
            currentPage={currentPage}
            onChangeValue={handleChangeValue}
            name={newProject.name}
            description={newProject.description}
            category={newProject.category}
          />
        );
      case CurrentPage.STORY:
        return (
          <Story
            changePage={setCurrentPage}
            currentPage={currentPage}
            onChangeValue={handleChangeValue}
            content={newProject.content}
          />
        );
      case CurrentPage.TEAM:
        return (
          <Team
            changePage={setCurrentPage}
            currentPage={currentPage}
            team={newProject.team}
            onChangeValue={handleChangeValue}
          />
        );
      case CurrentPage.FUNDING:
        return (
          <Funding
            changePage={setCurrentPage}
            goal={newProject.goal}
            currentPage={currentPage}
            onChangeValue={handleChangeValue}
            startDate={newProject.startDate}
            finishDate={newProject.finishDate}
          />
        );
      case CurrentPage.PRIVILEGES:
        return (
          <Privileges
            changePage={setCurrentPage}
            donatorsPrivileges={newProject.donatorsPrivileges}
            currentPage={currentPage}
            onChangeValue={handleChangeValue}
          />
        );
      case CurrentPage.FAQ:
        return (
          <FAQS
            changePage={setCurrentPage}
            faqs={newProject.faqs}
            currentPage={currentPage}
            onChangeValue={handleChangeValue}
          />
        );
      case CurrentPage.SETTINGS:
        return (
          <Settings
            changePage={setCurrentPage}
            region={newProject.region}
            currentPage={currentPage}
            onChangeValue={handleChangeValue}
            imageUrl={newProject.imageUrl}
            newTags={newProject.projectTags}
            videoUrl={newProject.videoUrl}
            instagramUrl={newProject.instagramUrl}
            facebookUrl={newProject.facebookUrl}
            dribbleUrl={newProject.dribbleUrl}
            pinterestUrl={newProject.pinterestUrl}
            behanceUrl={newProject.behanceUrl}
          />
        );
      case CurrentPage.RECOMMENDATIONS:
        return (
          <Recommendations
            changePage={end}
            currentPage={currentPage}
            region={newProject.region}
            category={newProject.category}
            projectTags={newProject.projectTags}
          />
        );
      case CurrentPage.END:
        return (
          <div>
            {project.id && <Redirect to={`${Routes.PROJECTS}/${project.id}`} />}
            <Settings
              changePage={end}
              region={newProject.region}
              currentPage={currentPage}
              onChangeValue={handleChangeValue}
              imageUrl={newProject.imageUrl}
              videoUrl={newProject.videoUrl}
              newTags={newProject.projectTags}
            />
          </div>
        );
      default:
        return <BeforeStart changePage={setCurrentPage} currentPage={currentPage} />;
    }
  };

  return (
    <LoaderWrapper isLoading={isLoading}>
      <Seo
        title={`${t('Create project')} - HypeCrafter`}
        description=""
      />

      {getView()}
    </LoaderWrapper>
  );
};

export default CreateProject;
