import { createUseStyles } from 'react-jss';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import Container from '../components/shared/Container';
import MonthlyActivity from '../components/AppContent/MonthlyActivity';
import { MonthlyActivityTypes, MonthlyActivityContentType, CommunityArticleType } from '../types/appContent';
import COLORS from '../services/colors.service';
import Button from '../components/shared/Inputs/Button';
import { addAppContentItem } from '../store/ducks/appContentDuck';
import CommunityArticle from '../components/AppContent/CommunityArticle';

interface MonthlyActivityValueTypes {
  type: MonthlyActivityTypes,
  contentType: MonthlyActivityContentType,
  title: string,
  subTitle: string,
  description: string,
  companyId?: string | null
}

interface CommunityArticleValuesTypes {
  contentType: CommunityArticleType
}

const monthlyActivityTypes: { label: string, value: MonthlyActivityTypes }[] = [
  {
    label: 'KickOff',
    value: 'KICK_OFF',
  },
  {
    label: 'Ethos',
    value: 'ETHOS',
  },
  {
    label: 'Power up',
    value: 'POWER_UP',
  },
  {
    label: 'Gratitude',
    value: 'GRATITUDE',
  },
  {
    label: 'Power down',
    value: 'POWER_DOWN',
  },
];

const monthlyActivityContentType : { label: string, value: MonthlyActivityContentType }[] = [
  {
    label: 'Audio',
    value: 'AUDIO',
  },
  {
    label: 'Video',
    value: 'VIDEO',
  },
];

const communityArticleContentType: { value: string, label: string }[] = [
  {
    label: 'Written Content',
    value: 'WRITTEN',
  },
  {
    label: 'External Content',
    value: 'EXTERNAL',
  },
];

const AppContentDetail = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [searchParams] = useSearchParams();
  const [saving, setSaving] = useState(false);
  const [monthlyActivityValues, setMonthlyActivityValues] = useState<MonthlyActivityValueTypes>({
    type: 'KICK_OFF',
    contentType: 'AUDIO',
    title: '',
    subTitle: '',
    description: '',
    companyId: '',
  });
  const [communityArticleValues, setCommunityArticleValues] = useState<CommunityArticleValuesTypes>({
    contentType: 'WRITTEN',
  });
  const [uploadedFile, setUploadedFIle] = useState<any>(null);

  const handleSave = () => {
    setSaving(true);
    dispatch(addAppContentItem(
      {
        data: monthlyActivityValues,
        file: uploadedFile,
      },
      { success: () => setSaving(false), error: () => setSaving(false) },
    ));
  };

  const validateInputs = () => !monthlyActivityValues.title || !monthlyActivityValues.subTitle || !monthlyActivityValues.description || !uploadedFile;

  return (
    <Container sectionTitle="EDIT CONTENT">
      <div className={classes.wrapper}>
        {searchParams.get('companyId') && searchParams.get('companyName') ? (
          <MonthlyActivity
            values={monthlyActivityValues}
            setValues={setMonthlyActivityValues}
            types={monthlyActivityTypes}
            uploadedFile={uploadedFile}
            setUploadedFIle={setUploadedFIle}
            contentType={monthlyActivityContentType}
          />
        ) : (
          <CommunityArticle
            contentType={communityArticleContentType}
            values={communityArticleValues}
            setValues={setCommunityArticleValues}
            uploadedFile={uploadedFile}
            setUploadedFIle={setUploadedFIle}
          />
        )}

        <div className={classes.justifyEnd}>
          <Button
            bgColor={COLORS.lightBlue}
            textColor={COLORS.white}
            handleClick={handleSave}
            disabled={validateInputs()}
            loading={saving}
          >
            Save content
          </Button>
          {/* <Button
            bgColor={COLORS.red}
            textColor={COLORS.white}
            handleClick={handleSave}
          >
            Delete content
          </Button> */}
        </div>
      </div>
    </Container>
  );
};

export default AppContentDetail;

const useStyles = createUseStyles({
  wrapper: {
    display: 'grid',
    gridTemplateColumns: '1.5fr 1fr',
    gap: '5rem',
  },
  gridWrapper: {
    display: 'grid',
    gridRowGap: '3rem',
  },
  gridInputsWrapper: {
    display: 'grid',
    gridRowGap: '1.5rem',
  },
  justifyEnd: {
    justifySelf: 'end',
    display: 'grid',
    gridTemplateRows: 'repeat( auto-fit, minmax(0, max-content) )',
    gap: '1rem',
    justifyItems: 'end',
  },
});
