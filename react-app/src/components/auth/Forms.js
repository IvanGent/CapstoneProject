import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

// const ProtectedRoute = props => {

//   if (!props.authenticated) {
//     return <Redirect to="/login"/>
//   }

//   return (
//     <Route {...props}/>
//   );
// };

// const ProtectedRoute = props => {
//   return (
//     <Route {...props}>
//       {/* {(props.authenticated) ? props.children : <Redirect to="/login" />} */}
//     </Route>
//   )
// };
// export default ProtectedRoute;

const Forms = ({authenticated, setAuthenticated, showLogin, setShowLogin, showSignUp, setShowSignUp}) => {
  return (
    <>
    {showLogin && (
      <LoginForm
        authenticated={authenticated}
        setAuthenticated={setAuthenticated}
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        setShowSignUp={setShowSignUp}
       />
    )}
    {showSignUp && (
      <SignUpForm 
        authenticated={authenticated}
        setAuthenticated={setAuthenticated}
        showSignUp={showSignUp}
        setShowSignUp={setShowSignUp}
        setShowLogin={setShowLogin}
      />
    )}
    </>
  )
}

export default Forms;