const API = {};

import reports from 'api/Reports'
import seasons from 'api/Seasons'
import assessments from 'api/Assessments'
import trainings from 'api/Trainings'
import events from 'api/Events'
import equipment from 'api/Equipment'
import login from 'api/Login'
import isAuthError from 'api/helpers/isAuthError'
import trainers from 'api/trainers';

export default {
  reports,
  seasons,
  assessments,
  trainings,
  events,
  equipment,
  login,
  isAuthError,
  trainers
}
