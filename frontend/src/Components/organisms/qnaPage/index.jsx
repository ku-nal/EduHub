import React from 'react';
import { useSelector } from 'react-redux';
/* internal components */
import Navbar from '../../NavBar';
import Question from './sections/question';
import Comment from './sections/comment';

const QnAPage = () => {
  const userRole = useSelector((state) => state.userSlice.role);
  const navbarStudentPage = ["Dashboard", "My Courses", "Community Forum", "Blogs"];
  const navbarTeacherPage = ["Courses Dashboard", "Community Forum", "Blogs", "Pricing"];

  return (
    <div>
      <Navbar pages={userRole === 'teacher' ? navbarTeacherPage : navbarStudentPage} />
      <Question />
      <Comment />
    </div>
  );
};

export default QnAPage;