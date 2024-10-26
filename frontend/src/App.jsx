import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import TaskHome from './components/TaskHome';

const App = () => {
    return (
      <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/tasks" element={<TaskHome />} />

      </Routes>
    );
};

export default App;
