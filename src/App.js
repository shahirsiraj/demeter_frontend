import LoginPage from "./components/pages/login_page";
import HomePage from "./components/pages/landing";
import RegisterPage from "./components/pages/AuthPageRegister";
import ListPage from "./components/pages/lists"
import GetList from "./components/individuallist"
import ListForm from "./components/createListForm"
import DisplayLists from "./components/listDisplay"
import CreateNewList from "./components/pages/createnewlist"
import SharePage from './components/pages/showallusers'

import ExplorePage from "./components/pages/explore"
import NavBar from "./components/navbar"
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import ProfilePage from "./pages/ProfilePage";

export default function App() {
  // const mode = useSelector((state) => state.mode);
  // useSelector is a hook that extracts data from Redux store in the functional components

  // const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  // useMemo is a hook that takes two arguments. function that computes value and an array of dependencies(prevents unecessary re-rendering).

  const isAuth = Boolean(useSelector((state) => state.token));

  // console.log("Mode:", mode);
  // console.log("Theme:", theme);

  return (
    <div className="app">
      <NavBar/>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
             <Route
              path="/home"
              element={isAuth ? <ExplorePage /> : <Navigate to="/" />}
            />
            <Route 
            path="/register"
            element={ <RegisterPage/> }
            />
            <Route 
            path="/login"
            element={ <LoginPage/> }
            />
            <Route
            path="/explore"
            element={<ExplorePage/>}
            />
             <Route
          path="/lists"
          element={isAuth ? <ListPage/> : <alert>You are not signed in!</alert>}/>
          <Route
          path="/createnewlist"
          element={<CreateNewList/>}
          />
          <Route path="/edit-list" element={<GetList />} />
          <Route path="/share" element={<SharePage/>}/>
          <Route path="/displaylists" element= {< DisplayLists/>} />
          </Routes>
          
         
      </BrowserRouter>
    </div>
  );
}

/*
<ThemeProvider> provides the theme object as a prop to all the components in the app.
<CssBaseline> is a materialUI component that resets the CSS styling.
<AuthPage/> = User authentication (Login or Register)
*/
