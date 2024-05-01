/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Input, Button, message,
} from 'antd';
import { Editor, EditorState, RichUtils } from 'draft-js';
/* internal components */
import Modal from '../../atom/modal/index';
/* slices */
import { setDescription, setTitle, setModalVisible } from './slice/modalSlice';
/* services */
import { postQuestion } from '../questions/Questions.service';
/* styles */
import styles from './index.module.scss';

const ModalWrapper = ({
  title = '',
  onSubmit = () => {},
}) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const dispatch = useDispatch();
  const qTitle = useSelector(state => state.modalReducer.qTitle);
  const isModalVisible = useSelector(state => state.modalReducer.isModalVisible);
  const { userFullName = '' } = useSelector(state => state.userSlice);

  const onChange = (editorState) => {
    setEditorState(editorState);
    const contentState = editorState.getCurrentContent();
    const text = contentState.getPlainText();
    dispatch(setDescription(text));
  };

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const handleCancel = () => {
    dispatch(setModalVisible(false));
  };

  const resetData = () => {
    dispatch(setModalVisible(false));
    dispatch(setTitle(''));
    dispatch(setDescription(''));
  };

  const handleSave = () => {
    const payload = {
      qTitle,
      qDesc: editorState.getCurrentContent().getPlainText(),
      askedByUsername: userFullName,
    };
    postQuestion(payload)
      .then(() => {
        onSubmit();
        resetData();
        message.success('Your question has been posted.');
      })
      .catch((err) => {
        message.error(err);
      })
      .finally(() => {
        dispatch(setModalVisible(false));
      });
  };

  return (
    <Modal
      open={isModalVisible}
      onCancel={handleCancel}
      title={title}
      className={styles.modalContainer}
      footer={[<Button key="post" onClick={handleSave}>Post</Button>]}
    >
      <div className={styles.postCreationContainer}>
        <section>
          <label htmlFor="title">Title</label>
          <Input
            id="title"
            name="title"
            value={qTitle}
            onChange={e => dispatch(setTitle(e.target.value))}
          />
        </section>
        <section>
          <label htmlFor="description">Description</label>
          <div className={styles.editorContainer}>
            <Editor
              editorState={editorState}
              onChange={onChange}
              handleKeyCommand={handleKeyCommand}
            />
          </div>
        </section>
      </div>
    </Modal>
  );
};

export default ModalWrapper;