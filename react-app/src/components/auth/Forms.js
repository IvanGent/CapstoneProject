import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import './Forms.css'

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

const background = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 }
}

const Forms = ({authenticated, setAuthenticated, showLogin, setShowLogin, showSignUp, setShowSignUp, showForms, setShowForms}) => {
  return (
    <AnimatePresence exitBeforeEnter>
      {showForms && (
      <motion.div className='formContainer'
        variants={background}
        initial='hidden'
        animate='visible'
      >
        {showLogin && (
          <LoginForm
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
            showLogin={showLogin}
            showSignUp={showSignUp}
            setShowLogin={setShowLogin}
            setShowSignUp={setShowSignUp}
            setShowForms={setShowForms}
           />
        )}
        {showSignUp && (
          <SignUpForm 
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
            showSignUp={showSignUp}
            setShowSignUp={setShowSignUp}
            setShowLogin={setShowLogin}
            setShowForms={setShowForms}
          />
        )}
      </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Forms;