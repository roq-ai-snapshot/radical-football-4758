import axios from 'axios';
import queryString from 'query-string';
import { CoachTeamInterface } from 'interfaces/coach-team';
import { GetQueryInterface } from '../../interfaces';

export const getCoachTeams = async (query?: GetQueryInterface) => {
  const response = await axios.get(`/api/coach-teams${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createCoachTeam = async (coachTeam: CoachTeamInterface) => {
  const response = await axios.post('/api/coach-teams', coachTeam);
  return response.data;
};

export const updateCoachTeamById = async (id: string, coachTeam: CoachTeamInterface) => {
  const response = await axios.put(`/api/coach-teams/${id}`, coachTeam);
  return response.data;
};

export const getCoachTeamById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/coach-teams/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCoachTeamById = async (id: string) => {
  const response = await axios.delete(`/api/coach-teams/${id}`);
  return response.data;
};
