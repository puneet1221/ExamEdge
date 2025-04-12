import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateCategory from './AdminComponents/CreateCategory.jsx';
import QuizForm from './AdminComponents/createQuiz.jsx';
import AdminDashboard from './AdminComponents/DashBoard/AdminDashBoard.jsx';
import PaymentDetails from './AdminComponents/PaymentDetails.jsx';
import CreateNotices from './Components/AdminPages/CreateNotices.jsx';
import { useAppContext } from './Components/AppContext/AppContext';
import Footer from './Components/Footer/Footer.jsx';
import ForgotPassword from './Components/ForgotPassword';
import Home from './Components/Home';
import Login from './Components/Login';
import LoginSignup from './Components/LoginSignup';
import Menubar from './Components/Menubar.jsx';
import Navbar from './Components/Navbar.jsx';
import UpdateProfile from './Components/Pages/UpdateProfile/UpdateProfile';
import PaymentCancelled from './Components/PaymentComponents/PaymentCancelled.jsx';
import PaymentError from './Components/PaymentComponents/PaymentError.jsx';
import PaypalIntegration from './Components/PaymentComponents/PaypalIntegration.jsx';
import PaypalSuccess from './Components/PaymentComponents/PaypalSuccess.jsx';
import ProfileComponent from './Components/Profile';
import QuizCard from './Components/QuizCard/QuizCard.jsx';
import Leaderboard from './Components/QuizPage/QuizLeaderBoard.jsx';
import QuizPage from './Components/QuizPage/QuizPage.jsx';
import SuccessPage from './Components/QuizPage/SuccessPage.jsx';
import RoleBasedLayout from './Components/RoleBasedLayout';
import ReviewPage from './Components/Review.jsx';
function App() {
  const { loginState } = useAppContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            !loginState ? (
              <>
                <Navbar />
                <Home />
                <Footer />
              </>
            ) : (
              <RoleBasedLayout>
                <Menubar></Menubar>
                <QuizCard></QuizCard>
              </RoleBasedLayout>
            )
          }
        />

        <Route
          path="/login"
          element={
            <>
              <Navbar />
              <Login />
              <Footer />
            </>
          }
        />

        <Route
          path="/signUp"
          element={
            <>
              <Navbar />
              <LoginSignup />
              <Footer />
            </>
          }
        />

        <Route
          path="/resetPassword"
          element={
            <>
              <Navbar />
              <ForgotPassword />
              <Footer />
            </>
          }
        />

        <Route
          path="/updateProfile"
          element={
              <UpdateProfile />
          }
        />

        <Route
          path="/profile"
          element={
            <RoleBasedLayout>
              <ProfileComponent />
            </RoleBasedLayout>
          }
        />

        <Route path='/admin-dashboard' element={<RoleBasedLayout><AdminDashboard></AdminDashboard></RoleBasedLayout>}></Route>
        <Route path='/quizPage/:quizId' element={<RoleBasedLayout><QuizPage></QuizPage></RoleBasedLayout>} />
        <Route path='/quizPage/:quizId/success' element={<SuccessPage></SuccessPage>}></Route>
        <Route path='/payment/success' element={<RoleBasedLayout><PaypalSuccess></PaypalSuccess></RoleBasedLayout>}></Route>
        <Route path='/paypal/payment' element={<RoleBasedLayout><PaypalIntegration></PaypalIntegration></RoleBasedLayout>}></Route>
        <Route path='/payment/cancel' element={<RoleBasedLayout><PaymentCancelled></PaymentCancelled></RoleBasedLayout>}></Route>
        <Route path='/paypal/error' element={<RoleBasedLayout><PaymentError></PaymentError></RoleBasedLayout>}></Route>
        <Route path='/quiz/:quizId/leaderboard' element={<RoleBasedLayout><Leaderboard></Leaderboard></RoleBasedLayout>} />
        <Route path='/admin-dashboard/create-category' element={<RoleBasedLayout><CreateCategory></CreateCategory></RoleBasedLayout>} />
        <Route path='/admin-dashboard/create-quiz' element={<RoleBasedLayout><QuizForm></QuizForm></RoleBasedLayout>} />
        <Route path='/admin-dashboard/create-notification' element={<RoleBasedLayout><CreateNotices></CreateNotices></RoleBasedLayout>}></Route>
        <Route path='/admin-dashboard/manage-payments' element={<RoleBasedLayout><PaymentDetails /></RoleBasedLayout>}></Route>
        <Route path='/exam_edge/review' element={<RoleBasedLayout><ReviewPage/></RoleBasedLayout>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
