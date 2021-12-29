import { useParams } from 'react-router-dom';
import Container from '../components/shared/Container';
import MonthlyActivity from '../components/AppContent/MonthlyActivity';

import CommunityArticle from '../components/AppContent/CommunityArticle';

const AppContentDetail = () => {
  const { itemName, mode } = useParams();
  const isEditing = mode === 'edit';

  return (
    <Container sectionTitle={isEditing ? 'EDIT CONTENT' : 'NEW CONTENT'}>
      {itemName === 'community-article' ? <CommunityArticle /> : <MonthlyActivity /> }
    </Container>
  );
};

export default AppContentDetail;
