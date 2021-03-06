import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddEntryForm, { EntryFormValues } from './AddHealthEntryForm';

interface Props {
  modalHealthOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
}

const AddHealthEntryModal = ({ modalHealthOpen, onClose,onSubmit,error }: Props) => (
  <Modal open={modalHealthOpen} onClose={onClose} centered={false} closeIcon style={{padding:"20px"}}>
    <Modal.Header>Add a new Entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddEntryForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export default AddHealthEntryModal;