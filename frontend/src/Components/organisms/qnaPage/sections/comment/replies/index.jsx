/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
/* external imports */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { message } from 'antd';
import cx from 'classnames';
import moment from 'moment';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
/* service */
import { replyToComment } from '../comment.service';
/* slice */
import { setComment } from '../slice/commentsSlice';
/* styles */
import styles from '../../../qnaPage.module.scss';
import QnAUtility from '../../../utils';

const Replies = ({ comment = {}, fetchComment }) => {
  const { qId } = useParams();
  const dispatch = useDispatch();
  const [replyText, setReplyText] = useState('');
  const [replyCardCollapse, setReplyCardCollapse] = useState(true);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const { userFullName = '' } = useSelector(state => state.userSlice);

  const {
    userName = 'anonymous',
    parentId = '0',
    replies = [],
    text: commentText = '',
    _id: docId = '',
    answeredDate = '',
  } = comment || {};

  const onAddNewComment = async () => {
    const payload = {
      parentId: comment?._id,
      questionId: qId,
      text: replyText,
      answeredDate: new Date().valueOf(),
      userName: userFullName,
    };
    await replyToComment(payload)
      .then((response) => {
        dispatch(setComment(response.data));
      })
      .catch((error) => {
        const errorMessage = error.message || 'An error occurred';
        message.error(errorMessage);
      });
  };

  const toggleReplyInputShow = () => {
    setShowReplyInput(!showReplyInput);
  };

  const toggleReplyCardCollapse = () => {
    setReplyCardCollapse(!replyCardCollapse);
  };

  const onPostReplyHandler = async () => {
    if (!replyText.length) return;
    await onAddNewComment();
    await fetchComment();
    setReplyText('');
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  if (parentId === '0') {
    return (replies || []).map(reply => (
      <Replies
        comment={reply}
        fetchComment={fetchComment}
      />
    ));
  }

  return (
    <div className={styles.replyContainer}>
      <section
        role="button"
        tabIndex={0}
        className={cx(styles.replyCard, { [styles.collapsed]: replyCardCollapse })}
        key={docId}
        onClick={toggleReplyCardCollapse}
      >
        {/* Left Panel */}
        <div
          className={styles.leftPanel}
          onClick={e => stopPropagation(e)}
          role="button"
          tabIndex={0}
        >
          <span
            style={{
              backgroundColor: QnAUtility.getColorForLetter(
                (userName.charAt(0) || '').toUpperCase(),
              ),
            }}
          >{(userName.charAt(0) || '').toUpperCase()}
          </span>
        </div>
        {/* Right Panel */}
        <div
          className={styles.rightPanel}
          onClick={e => stopPropagation(e)}
          role="button"
          tabIndex={0}
        >
          {/* 1. Comment Part */}
          <div className={styles.commentPart}>
            <div className={styles.nameDateContainer}>
              <div className={styles.userName}>
                {userName}
              </div>
              {(moment(answeredDate).fromNow() !== 'Invalid date') && (
                <div className={styles.date}>
                  {moment(answeredDate).fromNow()}
                </div>
              )}
            </div>
            <div className={styles.replyText}>
              {commentText}
            </div>
          </div>
          {/* 2. Reply Part */}
          <div
            className={cx(
              styles.replyPart,
              showReplyInput ? styles.replyPartBackground : '',
            )}
          >
            {!showReplyInput && (
              <button
                type="button"
                className={styles.replyBtn}
                onClick={toggleReplyInputShow}
              >
                <span>Reply</span>
              </button>
            )}
            {showReplyInput && (
              <section className={styles.replyInputSection}>
                <div className={styles.replyingUserLogo}>
                  <span
                    style={{
                      backgroundColor: QnAUtility.getColorForLetter(
                        (userFullName.charAt(0) || '').toUpperCase(),
                      ),
                    }}
                  >{(userFullName.charAt(0) || '').toUpperCase()}
                  </span>
                </div>
                <div className={styles.inputContainer}>
                  <input
                    type="text"
                    value={replyText}
                    className={styles.inputBox}
                    onChange={e => setReplyText(e.target.value)}
                    placeholder="Add a reply..."
                  />
                  <div className={styles.actionBtns}>
                    <span
                      role="button"
                      tabIndex={0}
                      onClick={toggleReplyInputShow}
                    >
                      Cancel
                    </span>
                    <span
                      role="button"
                      tabIndex={0}
                      style={{
                        backgroundColor: replyText.length ? '#065fd4' : '#f2f2f2',
                        color: replyText.length ? '#fff' : '#909090',
                        borderRadius: '3rem',
                      }}
                      onClick={onPostReplyHandler}
                    >
                      Reply
                    </span>
                  </div>
                </div>
              </section>
            )}
          </div>
          {/* 3. Show More */}
          {(replies.length !== 0) && (
            <div
              className={styles.showMorePart}
              onClick={toggleReplyCardCollapse}
              role="button"
              tabIndex={0}
            >
              {replyCardCollapse && <CaretDownOutlined />}
              {!replyCardCollapse && <CaretUpOutlined />}
              <span className={styles.seeMoreReplies}>
                {replies.length} replies
              </span>
            </div>
          )}
        </div>
      </section>
      {!replyCardCollapse && (
        <div className={styles.recurRepliesContainer}>
          {(replies || []).map(reply => (
            <Replies
              key={reply._id}
              comment={reply}
              fetchComment={fetchComment}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Replies;
