import axios from "axios";
import { Component, ReactNode } from "react";
import { API_URLS, API_PARAMS } from "../constant/api-params";
import { Box, Typography, Grid, TextField, Divider, Button, ButtonGroup } from "@mui/material";
import CardComponent from "./Card";
import { LOCAL_STORAGE } from "../constant/local-storeage";
import Loader from "./Loader";

export default class Movies extends Component {
    state: any = {
        nowPlaying: [],
        trendingMovie: [],
        warning: false,
        watchList: [],
        movieGenre: [],
        activeGenre: '',
        loading: false
    }
    componentDidMount(): void {
        window.scrollTo(0, 0);
        this.onLoadMovies();
        this.onLoadWatchList();
        this.onGetGenre();
    }
    onLoadMovies(){
        const that = this;
        this.setState({loading: true})
        axios.get(API_URLS.TOP_RATED_MOVIE, {
            params: API_PARAMS
          })
          .then(function (response) {
            that.setState({
                trendingMovie: response.data.results.slice(0 ,12),
            })
            setTimeout(() => {
                that.setState({loading: false})
            }, 2000)
          })
    }
    onGetGenre(){
        // 
        const that = this;
        this.setState({loading: true})
        axios.get(API_URLS.MOVIE_GENRE, {
            params: API_PARAMS
          })
          .then(function (response) {
            that.setState({
                movieGenre: response.data.genres.slice(0, 16),
            })
            setTimeout(() => {
                that.setState({loading: false})
            }, 2000)
          })
    }
    onLoadWatchList = () => {
        const watchListFromLocalStorage = localStorage.getItem(LOCAL_STORAGE.WATCH_LIST)
        if (watchListFromLocalStorage) {
            this.setState({
                watchList: JSON.parse(watchListFromLocalStorage)
            })
        }
    }
    searchMovie = (event: any) => {
        const searchText = event.target.value;
        if (searchText && searchText.length < 3) {
            this.setState({
                warning: true
            })
            return
        } else if (!searchText) {
            this.onLoadMovies();
            return;
        }
        this.setState({
            warning: false
        })
        const that = this;
        this.setState({loading: true})
        axios.get(API_URLS.SEARCH_MOVIE, {
            params: {
                api_key: API_PARAMS.api_key,
                query: searchText
            }
          })
          .then(function (response) {
            that.setState({
                trendingMovie: response.data.results,
            })
            setTimeout(() => {
                that.setState({loading: false})
            }, 1000)
          })

    }
    onClickGenre = (item: any) => {
        this.setState({activeGenre: item.name})
        const that = this;
        this.setState({loading: true})
        axios.get(API_URLS.GENRE_MOVIE_LIST, {
            params: {
                with_genres: item.id,
                api_key: API_PARAMS.api_key
            },
          })
          .then(function (response) {
            that.setState({
                trendingMovie: response.data.results.slice(0 ,12),
            })
            setTimeout(() => {
                that.setState({loading: false})
            }, 2000)
          })
    }
    render() {
        const trendingMovie: any = this.state.trendingMovie;
        return(
           <>
          {this.state.loading ? <Loader /> : null}
             <Box component="section" sx={{ pl: 10, pr: 10,}}>
        <div className="trending-now movies-list">
        <Typography gutterBottom variant="h5" className="movie-heading" 
         component="div">
         Movies </Typography>
         <Divider />

         <TextField className="input-search" id="standard-basic"
         style={{marginTop: 20}}
                   helperText={this.state.warning ? 'Enter minimum 3 characters': ''}
                   color={this.state.warning ? 'warning' : 'primary'}
                   onChange={this.searchMovie} label="Search for Movies" variant="standard" />

        <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
            <ButtonGroup  variant="outlined" aria-label="Basic button group">
                {this.state.movieGenre.map((item: any) => 
                  <Button onClick={() => this.onClickGenre(item)} className={this.state.activeGenre === item.name ? 'active-btn' : ''}>{item.name}</Button>
                    )}
</ButtonGroup>
            </Grid>
            {trendingMovie.map((imageObj: any) => 
                <Grid item xs={6} md={2}>
                <CardComponent watchList={this.state.watchList} imageData={imageObj} />
            </Grid>
                )}
        </Grid>
        </div>
    </Box>

           </>
        )
    }
}