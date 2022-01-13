import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Container from '../components/shared/Container';
import MonthlyActivity from '../components/AppContent/MonthlyActivity';

import CommunityArticle from '../components/AppContent/CommunityArticle';

const AppContentDetail = () => {
  const { itemName, mode } = useParams();
  const isEditing = mode === 'edit';
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const prevLocation = `/${pathname.split('/')[1]}`;

  return (
    <Container sectionTitle={isEditing ? 'EDIT CONTENT' : 'NEW CONTENT'} goBack={() => navigate(prevLocation)}>
      {itemName === 'community-article' ? <CommunityArticle /> : <MonthlyActivity /> }
    </Container>
  );
};

export default AppContentDetail;
