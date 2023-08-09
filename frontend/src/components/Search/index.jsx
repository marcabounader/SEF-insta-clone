import Modal from 'react-modal';

const Search = ({isOpen, handleCloseViewModal}) => {
    return (<Modal
        isOpen={isOpen}
        onRequestClose={handleCloseViewModal}
        className="modal"
      >
        <h1>modal</h1>
      </Modal> );
}
 
export default Search;