import { Box, Typography, Divider, TextField, Grid } from "@mui/material";
import axios from "axios";
import { Component, ReactNode } from "react";
import { API_URLS, API_PARAMS } from "../constant/api-params";
import { LOCAL_STORAGE } from "../constant/local-storeage";
import CardComponent from "./Card";
import Loader from "./Loader";

export default class WebSeries extends Component{
    state = {
        topRateWebSeries: [],
        warning: false,
        watchList: [],
        loading: false
    }
    componentDidMount(): void {
        window.scrollTo(0, 0);
        this.onLoadWebSeries();
        this.onLoadWatchList();
    }
    onLoadWebSeries(){
        const that = this;
        this.setState({loading: true})
        axios.get(API_URLS.TOP_RATES_WEB_SERIES, {
            params: API_PARAMS
          })
          .then(function (response) {
            that.setState({
                topRateWebSeries: response.data.results.slice(0 ,12),
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
            this.onLoadWebSeries();
            return;
        }
        this.setState({
            warning: false
        })
        const that = this;
        this.setState({loading: true})
        axios.get(API_URLS.SEARCH_WEB_SERIES, {
            params: {
                api_key: API_PARAMS.api_key,
                query: searchText
            }
          })
          .then(function (response) {
            that.setState({
                topRateWebSeries: response.data.results,
            })
            setTimeout(() => {
                that.setState({loading: false})
            }, 1000)
          })

    }
    render() {
        const topRateWebSeries: any = this.state.topRateWebSeries;
        return(
           <>
                     {this.state.loading ? <Loader /> : null}
             <Box component="section" sx={{ pl: 10, pr: 10,}}>
        <div className="trending-now movies-list">
        <Typography gutterBottom variant="h5" className="movie-heading" 
         component="div">
         Web Series </Typography>
         <Divider />

         <TextField className="input-search" id="standard-basic"
                   helperText={this.state.warning ? 'Enter minimum 3 characters': ''}
                   color={this.state.warning ? 'warning' : 'primary'}
                   
                   onChange={this.searchMovie} label="Search for WebSeries" variant="standard" />
        <Grid container spacing={2}>
            {topRateWebSeries.map((imageObj: any) => 
                <Grid item xs={6} md={2}>
                <CardComponent isWebSeries={true} watchList={this.state.watchList} imageData={imageObj} />
            </Grid>
                )}
        </Grid>
        </div>
    </Box>

           </>
        )
    }
}