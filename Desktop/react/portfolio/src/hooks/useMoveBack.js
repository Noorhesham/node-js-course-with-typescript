import { useNavigate } from 'react-router-dom';

export function useMoveBack() {
  //this is using react router to provide us with a function that navigates back 1 step in the history stack 
  const navigate = useNavigate();
  return () => navigate(-1);
}
