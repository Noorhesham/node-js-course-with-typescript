import 'swiper/css';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import ProtectedRoute from "./ui/ProtectedRoute"
import AppLayout from "./ui/AppLayout"
import Start from "./pages/Start"
import SignUp from "./pages/SignUp"
import ForgotPass from "./pages/ForgotPass"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from "react-hot-toast"
import Login from "./pages/Login"
import StartPage from "./pages/StartPage"
import Main from "./pages/Main"
import { AvatarProvider } from "./context/useAvatar"
import Shows from "./pages/Shows"
import { SearchProvider } from "./context/useSearchQuery"
import Movie from "./pages/Movie"
import Account from "./pages/Account"
import Player from './pages/Player';
import SearchResults from './pages/SearchResults';
import { GenreProvider } from './context/useGenre';
import Image from './pages/Image';
import Show from './pages/Show';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Person from './pages/Person';
import Recovery from './pages/Recovery';
import Actors from './pages/Actors';
import Movies from './pages/Movies';
import CompanyPage from './pages/CompanyPage';
import ScrollToTop from './hooks/useScrollTop';
import Companies from './pages/Companies';
import List from './pages/List';

const queryClient=new QueryClient()
function App() {

  return (
    <AvatarProvider>
      <SearchProvider>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false}/>
      <GenreProvider>
    <BrowserRouter>
    <ScrollToTop/>
    <Routes>

    <Route element={
    <ProtectedRoute>
      <AppLayout/>
    </ProtectedRoute>}>
    <Route index element={<Navigate to="main" />} />
    <Route index path="main" element={<Main/>} />
    <Route path="shows" element={<Shows/>} />
    <Route path="actors" element={<Actors/>} />
    <Route path="movies" element={<Movies/>} />
    <Route  path="companies" element={<Companies />} />
    <Route path="show/:showId" element={<Show/>} />
    <Route path="account" element={<Account/>} />
    <Route path="search" element={<SearchResults/>} />
    <Route path="movie/:movieId" element={<Movie/>}/>
    <Route  path="player/:media/:url/:id" element={<Player />} />
    <Route  path="image/:media/:id" element={<Image />} />
    <Route  path="person/:id" element={<Person />} />
    <Route  path="company/:id" element={<CompanyPage />} />
    <Route  path="list" element={<List />} />
      </Route>
      <Route path="start" element={<Start/>}>
      <Route index  element={<Navigate replace to="page"/>}/>
      <Route  path="page" element={<StartPage/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="signup" element={<SignUp/>}/>
      <Route path="recover" element={<Recovery/>}/>
      <Route path="update" element={<ForgotPass/>}/>
      </Route>
      <Route path="forgotpassword" element={<ForgotPass/>}/>

    </Routes>
    </BrowserRouter>
    <Toaster position="top-center" gutter={12} containerStyle={{margin:'8px'}} 
  toastOptions={{success:{duration:3000},error:{duration:5000} 
  ,style:{fontSize:'18px',maxWidth:'500px',padding:'16px',backgroundColor:'#565656',color:'white',zIndex:"9999999999999999999999"}}} />
  </GenreProvider>
    </QueryClientProvider>
    </SearchProvider>
    </AvatarProvider>
  )
}

export default App
