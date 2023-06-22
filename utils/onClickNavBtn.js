import {
  projectsBtn,
  projectsSection,
  tasksBtn,
  tasksSection,
} from './constants.js';

export function clickNavProjects() {
  projectsBtn.classList.add('nav-button_active');
  projectsSection.classList.add('list-section_active');
  tasksBtn.classList.remove('nav-button_active');
  tasksSection.classList.remove('list-section_active');
}

export function clickNavTasks() {
  tasksBtn.classList.add('nav-button_active');
  tasksSection.classList.add('list-section_active');
  projectsBtn.classList.remove('nav-button_active');
  projectsSection.classList.remove('list-section_active');
}
