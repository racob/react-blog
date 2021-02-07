import Navbar from "./Header";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from "./Home";
import Create from "./Create";
import BlogDetails from "./BlogDetails";
import NotFound from "./NotFound";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/new_blog">
            <Create />
          </Route>
          <Route path="/blog/:id">
            <BlogDetails />
          </Route>
          <Route path='*'>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
