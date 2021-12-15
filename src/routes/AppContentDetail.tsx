import { createUseStyles } from 'react-jss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import Container from '../components/shared/Container';
import MonthlyActivity from '../components/AppContent/MonthlyActivity';
import {
  MonthlyActivityTypes, MonthlyActivityContentType, CommunityArticleType, GetCommunityDataItem,
} from '../types/appContent';
import { saveAppContentItem, getAppContentCategory, saveCommunityData } from '../store/ducks/appContentDuck';
import CommunityArticle from '../components/AppContent/CommunityArticle';
import { RootState } from '../store/configureStore';
import FormSharedComponent from '../components/shared/FormsSharedComponent';
import Title from '../components/shared/Title';

interface MonthlyActivityValueTypes {
  type: MonthlyActivityTypes,
  contentType: MonthlyActivityContentType,
  title: string,
  subTitle: string,
  description: string,
  companyId?: string | null
}

interface CommunityArticleValuesTypes {
  type: CommunityArticleType,
  isFeatured: boolean,
  written: {
    title: string,
    subTitle: string,
    category: any,
    text: string,
  },
  external: {
    title: string,
    category: null,
    description: string,
    URL: string,
  }
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
  const { communityDataItem } : { communityDataItem: GetCommunityDataItem } = useSelector((state: RootState) => state.appContentReducer);
  const { itemName, mode, id } = useParams();
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
    type: communityDataItem ? communityDataItem.type : 'WRITTEN',
    isFeatured: true,
    written: {
      title: '',
      subTitle: '',
      category: null,
      text: '',
    },
    external: {
      title: '',
      category: null,
      description: '',
      URL: '',
    },
  });
  const isEditing = mode === 'edit' && id;
  const [uploadedFile, setUploadedFIle] = useState<any>(null);
  const handleSave = () => {
    setSaving(true);
    if (itemName === 'community-article') {
      const reqData = {
        type: communityArticleValues.type,
        isFeatured: communityArticleValues.isFeatured,
        ...communityArticleValues.type === 'WRITTEN' ? {
          ...communityArticleValues.written,
          category: communityArticleValues.written.category['_id'],
        } : {
          ...communityArticleValues.external,
          category: communityArticleValues.external.category && communityArticleValues.external.category['_id'],
        },
      };
      dispatch(saveCommunityData(
        {
          data: reqData,
          image: uploadedFile,
          id: isEditing && id,
        },
        { success: () => setSaving(false), error: () => setSaving(false) },
      ));
    } else {
      dispatch(saveAppContentItem(
        {
          data: {
            ...monthlyActivityValues,
            type: isEditing ? searchParams.get('fieldName') : monthlyActivityValues.type,
          },
          file: uploadedFile,
          companyId: isEditing && id,
        },
        { success: () => setSaving(false), error: () => setSaving(false) },
      ));
    }
  };

  const validateInputs = () => {
    if (itemName !== 'community-article') {
      return (!monthlyActivityValues.title || !monthlyActivityValues.subTitle || !monthlyActivityValues.description || (!isEditing && !uploadedFile));
    }
    if (communityArticleValues.type === 'WRITTEN') {
      return (!communityArticleValues.written.title || !communityArticleValues.written.subTitle
        || !communityArticleValues.written.category || !communityArticleValues.written.text);
    }
    if (communityArticleValues.type === 'EXTERNAL') {
      return (!communityArticleValues.external.title || !communityArticleValues.external.URL
        || !communityArticleValues.external.category || !communityArticleValues.external.description);
    }
    return false;
  };

  useEffect(() => {
    if (itemName === 'community-article') {
      dispatch(getAppContentCategory());
    }
  }, [itemName]);

  return (
    <Container sectionTitle={isEditing ? 'NEW CONTENT' : 'EDIT CONTENT'}>
      <div className={classes.wrapper}>
        {itemName === 'community-article' ? (
          <CommunityArticle
            contentType={communityArticleContentType}
            values={communityArticleValues}
            setValues={setCommunityArticleValues}
            uploadedFile={uploadedFile}
            setUploadedFIle={setUploadedFIle}
          />
        ) : (
          <MonthlyActivity
            values={monthlyActivityValues}
            setValues={setMonthlyActivityValues}
            types={monthlyActivityTypes}
            uploadedFile={uploadedFile}
            setUploadedFIle={setUploadedFIle}
            contentType={monthlyActivityContentType}
          />
        )}

        <div className={classes.justifyEnd}>
          {isEditing && communityDataItem?.image?.imgURL && <Title title="Featured Image" />}
          <FormSharedComponent
            save={{
              handler: handleSave,
              label: 'Save Content',
              disabled: validateInputs(),
              loading: saving,
            }}
            remove={{
              handler: undefined,
              label: 'Delete Content',
              hidden: !isEditing,
              disabled: saving,
            }}
            image={{
              url: communityDataItem?.image?.imgURL,
              hidden: !isEditing || itemName !== 'community-article',
              loading: Boolean(isEditing && !communityDataItem),
              hideUpload: true,
            }}
          />
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
