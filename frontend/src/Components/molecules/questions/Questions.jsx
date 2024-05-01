/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-unused-expressions */
/* external imports */
import React, { useEffect } from 'react';
import { message } from 'antd';
import moment from 'moment';
import cx from 'classnames';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
/* styles */
import styles from './Questions.module.scss';
/* services */
import { getAllQuestions } from './Questions.service';
/* internal components */
import CustomBtn from '../../button';
import ModalWrapper from '../modalWrapper';
import { setquestionData } from './slice/questionSlice';
import { setModalVisible } from '../modalWrapper/slice/modalSlice';
import Navbar from '../../NavBar';

const Questions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const questionData = useSelector(
    state => state.questionsDisplay.questionData,
  );
  const isModalVisible = useSelector(
    state => state.modalReducer.isModalVisible,
  );
  const userRole = useSelector((state) => state.userSlice.role);

  const navbarStudentPage = ["Dashboard", "My Courses", "Community Forum", "Blogs"];
  const navbarTeacherPage = ["Courses Dashboard", "Community Forum", "Blogs", "Pricing"];

  useEffect(() => {
    fetchQuestionData();
  }, []);

  const fetchQuestionData = () => {
    getAllQuestions()
      .then(({ data }) => {
        dispatch(setquestionData(data));
      })
      .catch((err) => {
        message.error(err);
      });
  };

  const handleButtonClick = () => {
    dispatch(setModalVisible(true));
  };

  const handleQuestionClick = (questionId) => {
    navigate(`${location.pathname}/${questionId}`);
  };

  return (
    <div>
      <Navbar pages={userRole === 'teacher' ? navbarTeacherPage : navbarStudentPage} />
      <div className={styles.container}>
        <CustomBtn
          title="Ask a Question"
          className={styles.askButton}
          onClickHandler={handleButtonClick}
        />
      </div>
      <div className={styles.questions}>
        <div className={styles.topQuestions}>Questionarium</div>
        {(questionData || []).map((questions) => {
          const {
            _id: qId = '',
            qTitle = '',
            qDesc = '',
            totalAnswers = 0,
            timeStamp = 0,
            askedByUsername = '',
          } = questions || {};

          return (
            /* container */
            <div key={qId} className={styles.questionContainer}>
              {/* 1. answer section */}
              <section className={styles.answerCountSection}>
                <p
                  className={cx(
                    styles.answers,
                    totalAnswers === 0 ? styles.noAnswer : '',
                  )}
                >
                  {totalAnswers} answers
                </p>
              </section>
              {/* 2. main question */}
              <section
                className={styles.questionArea}
                onClick={() => handleQuestionClick(qId)}
                role="button"
                tabIndex={0}
              >
                <div className={styles.qTitle} title={qTitle}>
                  <p className={styles.qTitle__para}>
                    {qTitle}
                  </p>
                </div>
                <div className={styles.qDesc} title={qDesc}>
                  <p className={styles.qDesc__para}>
                    {qDesc}
                  </p>
                </div>
              </section>
              {/* 3. author */}
              <section className={styles.authorSection}>
                <p className={styles.creator}>
                  <span className={styles.icon}>
                    <FaUser />
                  </span>
                </p>
                <span className={styles.authorName}>{askedByUsername}</span>
                <p className={styles.created}>
                  asked {moment(timeStamp).fromNow()}
                </p>
              </section>
            </div>
          );
        })}
      </div>
      {isModalVisible && (
        <ModalWrapper title="Ask a Question" onSubmit={fetchQuestionData} />
      )}
    </div>
  );
};

export default Questions;