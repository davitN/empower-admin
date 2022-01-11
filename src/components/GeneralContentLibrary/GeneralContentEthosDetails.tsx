import { GeneralContentLibraryType } from '../../types/generalContentLibrary';

const GeneralContentEthosDetails = ({ selectedType, isNewItem }: PropsTypes) => {
  return (
    <p>Ethos</p>
  );
};

export default GeneralContentEthosDetails;

interface PropsTypes {
  selectedType: GeneralContentLibraryType,
  isNewItem: Boolean
}
