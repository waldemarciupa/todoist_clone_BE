import Modal from '../../components/Modal';

const ProjectDelete = ({ hideModal }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Delete');
  };

  return (
    <Modal
      onClick={hideModal}
      title={'Delete'}
      handleSubmit={handleSubmit}
      hideProjectModal={hideModal}
    >
      <div>Are you sure you want to delete PROJECT_NAME?</div>
    </Modal>
  );
};

export default ProjectDelete;
