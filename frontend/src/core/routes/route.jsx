import React, {
  lazy, Suspense, useState, useEffect,
} from 'react';
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Loader from '../../Components/atom/loader';
import { setUserData } from '../../Components/slices/userSlice';
import Cookies from 'universal-cookie';

/* internal components */
const SignUp = lazy(() => import('../../pages/Signup'));
const Login = lazy(() => import('../../pages/Login'));
const ForgotPwd = lazy(() => import('../../pages/ForgotPwd'));
const LandingPage = lazy(() => import('../../pages/Landing'));
const Error = lazy(() => import('../../Components/error'));
const Faqs = lazy(() => import('../../pages/Faqs/Faqs.tsx'));
const Dashboard = lazy(() => import('../../pages/Dashboard/Dashboard.tsx'));
const Contactus = lazy(() => import('../../pages/Contact/Contactus.tsx'));
const PricingPage = lazy(() => import('../../Components/PricingPage'));
const BlogList = lazy(() => import('../../Components/BlogListPage'));
const BlogFormPage = lazy(() => import('../../Components/BlogFormPage'));
const BlogDetailsPage = lazy(() => import('../../Components/BlogDetails'));
const QuestionBank = lazy(() => import('../../pages/Tests/Professor/JSX/QuestionBank'));
const AddQuestion = lazy(() => import('../../pages/Tests/Professor/JSX/AddQuestion'));
const CreateTest = lazy(() => import('../../pages/Tests/Professor/JSX/CreateTest'));
const EditQuestion = lazy(() => import('../../pages/Tests/Professor/JSX/EditQuestion'));
const TestList = lazy(() => import('../../pages/Tests/Student/JSX/TestList'));
const TestScreen = lazy(() => import('../../pages/Tests/Student/JSX/TestScreen'));
const ResultList = lazy(() => import('../../pages/Tests/Student/JSX/ResultList'));
const ResultDetailedView = lazy(() => import('../../pages/Tests/Student/JSX/ResultDetailedView'));
const FinishTestScreen = lazy(() => import('../../pages/Tests/Student/JSX/FinishTestScreen'));

const Questions = lazy(() => import('../../Components/molecules/questions/Questions'));
const QnAPage = lazy(() => import('../../Components/organisms/qnaPage'));
const EditBlog = lazy(() => import('../../Components/EditBlog'));
const Success = lazy(() => import('../../Components/molecules/payment/success'));
const Cancel = lazy(() => import('../../Components/molecules/payment/failure'));
const ProfessorCoursePage = lazy(() => import('../../pages/Courses/ProfessorCoursePage'));
const EditCoursePage = lazy(() => import('../../pages/Courses/EditCoursePage'));
const MyCoursePage = lazy(() => import('../../pages/Courses/MyCoursesPage'));
const ChapterDetailsPage = lazy(() => import('../../pages/Courses/ChapterDetailsPage'));
const UserProfile = lazy(() => import('../../Components/profilePage'));
const ResetPwd = lazy(() => import('../../pages/ResetPwd'));
const StreamClass = lazy(() => import('../../pages/StreamClass'));
const Logout = lazy(() => import('../../Components/logout'));

const Meeting = lazy(() => import("../../pages/Meeting/Meeting.tsx"));

const StudentMeeting = lazy(() => import("../../pages/Meeting/StudentMeeting.tsx"));

const ErrorElement = () => {
  <Suspense fallback={<Loader />}>
    <Error />
  </Suspense>;
};

const ProtectedRoute = (props) => {
  try {
    const [authenticated, SetAuthenticated] = useState(false);
    const dispatch = useDispatch();
    const cookies = new Cookies();

    useEffect(() => {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/user/validate`, null, {
          withCredentials: true,
          headers: {
            'accesstoken': cookies.get('accesstoken')
          }
        })
        .then((response) => {
          SetAuthenticated(true);
          const id = response?.data?.data._id;

          axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/user/${id}`)
            .then((resp) => {
              const userData = resp?.data?.data;

              const userPayload = {
                userId: userData._id,
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                role: userData.role,
              };
              dispatch(setUserData(userPayload));
            })
            .catch((error) => {
              console.log(error);
              navigate('/login');
            });
        })
        .catch((error) => {
          console.log(error);
          navigate('/login');
        });
    }, []);

    console.log('Inside protected route');
    var navigate = useNavigate();

    return (
      <Suspense fallback={<Loader />}>
        {authenticated && <props.component />}
      </Suspense>
    );
  } catch (error) {
    console.log(error);
    navigate('/login');
  }
};

const PublicRoute = (props) => {
  try {
    const [authenticated, SetAuthenticated] = useState(false);
    const [allowAccess, setAllowAccess] = useState(false);
    const cookies = new Cookies();

    useEffect(() => {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/user/validate`, null, {
          withCredentials: true,
          headers: {
            'accesstoken': cookies.get('accesstoken')
          }
        })
        .then(() => SetAuthenticated(true))
        .catch((error) => {
          console.log(error);
          setAllowAccess(true);
        });
    }, []);

    console.log('Inside public route');
    var navigate = useNavigate();

    return (
      <Suspense fallback={<Loader />}>
        {authenticated && navigate('/dashboard')}
        {allowAccess && <props.component />}
      </Suspense>
    );
  } catch (error) {
    console.log(error);
    navigate('/login');
  }
};

const privateRoutes = {
  '/dashboard': Dashboard,
  '/pricing': PricingPage,
  '/blogs': BlogList,
  '/blog/:id': BlogDetailsPage,
  '/newblog': BlogFormPage,
  '/questions': Questions,
  '/questions/:qId': QnAPage,
  '/success': Success,
  '/cancel': Cancel,
  '/edit-blog/:id': EditBlog,
  '/questionbank': QuestionBank,
  '/createtest': CreateTest,
  '/addquestion': AddQuestion,
  '/editquestion': EditQuestion,
  '/test-list': TestList,
  '/start-test': TestScreen,
  '/result-list': ResultList,
  '/result-detailed-view': ResultDetailedView,
  '/finish-test': FinishTestScreen,
  // soa for routing by Freya on 29 March
  '/professor/courses': ProfessorCoursePage,
  '/my-courses': MyCoursePage,
  '/edit-course/:id': EditCoursePage,
  '/chapter-details/:id': ChapterDetailsPage,
  // eoa for routing by Freya on 29 March
  '/profile': UserProfile,
  '/logout': Logout,
  "/meeting": Meeting,
  "/room/:roomId": StreamClass,
  "/session": StudentMeeting,
  "/contact": Contactus,
  "/faqs": Faqs,
};

const publicRoutes = {
  '/': LandingPage,
  '/login': Login,
  '/register': SignUp,
  '/forgotpwd': ForgotPwd,
  '/contact': Contactus,
  '/faqs': Faqs,
  '/resetpwd/:forgotToken': ResetPwd,
  // '/room/:roomId': StreamClass,
  // "/meeting": Meeting,
};

function RouteConfig() {
  const privateRouteComponents = Object.entries(privateRoutes).map(
    ([path, Component]) => ({
      path,
      element: (
        <Suspense fallback={<Loader />}>
          <ProtectedRoute component={Component} path={path} />
        </Suspense>
      ),
      errorElement: ErrorElement,
    }),
  );

  const publicRouteComponents = Object.entries(publicRoutes).map(
    ([path, Component]) => ({
      path,
      element: (
        <Suspense fallback={<Loader />}>
          <PublicRoute component={Component} path={path} />
        </Suspense>
      ),
      errorElement: ErrorElement,
    }),
  );

  const routeComponents = [...privateRouteComponents, ...publicRouteComponents];

  console.log(routeComponents);

  const router = createBrowserRouter(routeComponents);

  return <RouterProvider router={router} />;
}

export default RouteConfig;
