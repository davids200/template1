import UploadPhoto from '../../components/UploadPhoto';
import PrivateLayout from '../../components/layout/PrivateLayout'

const UploadPage = () => {
  return (
    <div>
    <PrivateLayout>
      <h1>Upload a photo</h1>
      <UploadPhoto />
      </PrivateLayout>
    </div>
  );
};

export default UploadPage;
