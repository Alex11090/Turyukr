

import './App.css'
import ListTouristCards from './component/list-of-tourist-cards/list-of-tourist-cards';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DiscriptionTour from './component/tour-description/tour-description';

const App = () => {
  return (
    <div >
      <Router>
        <Routes>
          <Route exact path="/tours/:id" element={<DiscriptionTour />} />
          <Route exact path="/" element={<ListTouristCards />} />


        </Routes>

      </Router>
    </div>
  );
}

export default App;
