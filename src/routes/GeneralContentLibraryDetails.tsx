import { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import GeneralContentEthosDetails from '../components/GeneralContentLibrary/GeneralContentEthosDetails';
import GeneralContentItemDetails from '../components/GeneralContentLibrary/GeneralContentItemDetails';
import { GeneralContentLibraryType } from '../types/generalContentLibrary';

const GeneralContentLibraryDetails = () => {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const isNewItem = params?.mode === 'new';
  const [selectedType, setSelectedType] = useState<GeneralContentLibraryType>((searchParams.get('type') as GeneralContentLibraryType) || 'POWER_UP');

  return (
    selectedType === 'ETHOS'
      ? <GeneralContentEthosDetails selectedType={selectedType} setSelectedType={setSelectedType} isNewItem={isNewItem} />
      : <GeneralContentItemDetails selectedType={selectedType} setSelectedType={setSelectedType} isNewItem={isNewItem} />
  );
};

export default GeneralContentLibraryDetails;
