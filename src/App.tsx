import React from 'react';
import logo from './logo.svg';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Navbar from './components/Navbar';
import { Box, CssBaseline, Divider, ThemeProvider, Typography, createTheme } from '@mui/material';
import { HomeComponent } from './components/Home';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Movies from './components/Movies';
import WatchList from './components/WatchList';
import MovieList from './components/WatchListItem';
import WebSeries from './components/WebSeries';
import WatchListItem from './components/WatchListItem';
import MovieDetails from './components/MovieDetails';
import WebSeriesDetails from './components/WebSeriesDetails';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: "#0f1014"
    }
  }
});


function App() {
  return (
    <div className="App">
          <ThemeProvider theme={darkTheme}>
          <CssBaseline />

          <BrowserRouter> 
          <Navbar/>
              <Routes>
                        <Route
                            path="/"
                            element={<HomeComponent /> }
                        ></Route>
                        <Route
                            path="/movies"
                            element={<Movies />}
                        ></Route>

                          <Route
                            path="/watch-list"
                            element={<WatchList />}
                        ></Route>
                        <Route
                        path='/movie-list/:id/:title'
                        element={<WatchListItem />}
                        ></Route>
                        <Route
                        path='/movie-details/:id/:rating'
                        element={<MovieDetails />}
                        ></Route>
                         <Route
                        path='/web-series-details/:id/:rating'
                        element={<WebSeriesDetails />}
                        ></Route>
                      <Route
                      path='web-series'
                      element={<WebSeries />}></Route>
                    </Routes>
                    <Divider />
            <div className='footer'>
            <Box sx={{pt: 3, pb: 5}}>
                 <Typography gutterBottom variant="h6" style={{fontSize: '15px', textAlign: 'center'}} component="div">
                Designed and Developed By Aditya Mishra (LAAS) </Typography>
                </Box>   
            </div>
               
        </BrowserRouter>
          </ThemeProvider>
    </div>
  );
}

export default App;
