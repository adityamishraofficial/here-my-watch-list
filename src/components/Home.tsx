import { Box,  Divider,  Grid,  Rating,  Toolbar, Typography } from "@mui/material";
import { Component, ReactNode } from "react";

import axios from "axios";
import { API_PARAMS, API_URLS } from "../constant/api-params";
import Loader from "./Loader";
import CardComponent from "./Card";
import { LOCAL_STORAGE } from "../constant/local-storeage";

export class HomeComponent extends Component {
    state = {
        nowPlaying: [],
        onTheAir: [],
        trendingMovie: [],
        imageSlider: {},
        watchList: [],
        loading: 0
    }
    componentDidMount(): void {
        window.scrollTo(0, 0);
        const that = this;
        this.setState({loading: this.state.loading + 1})
        axios.get(API_URLS.NOW_PLAYING, {
            params: API_PARAMS
          })
          .then(function (response) {
            that.setState({
                nowPlaying: response.data.results,
                trendingMovie: response.data.results.slice(0 ,12),
                imageSlider: response.data.results[0],
            })
            setTimeout(() => {
                that.setState({loading: that.state.loading - 1})
            }, 2000)
            that.onSetImageSlider();
          })

        this.setState({loading: this.state.loading + 1})
        axios.get(API_URLS.ON_THE_AIR, {
            params: API_PARAMS
          })
          .then(function (response) {
            that.setState({
                onTheAir: response.data.results.slice(0, 12)
            })
            setTimeout(() => {
                that.setState({loading: that.state.loading - 1})
            }, 2000)
          })   
         this.onLoadWatchList();
    }
    onLoadWatchList = () => {
        const watchListFromLocalStorage = localStorage.getItem(LOCAL_STORAGE.WATCH_LIST)
        if (watchListFromLocalStorage) {
            this.setState({
                watchList: JSON.parse(watchListFromLocalStorage)
            })
        }
    }
    onSetImageSlider() {
        let i = 1;
            setInterval(() => {
                if (this.state.nowPlaying.length - 1 >= i) {
                    this.setState({
                        imageSlider: this.state.nowPlaying[i]
                    })
                }
               
                i++;
            }, 6000)
        
    }
    render() {
        const imageSlider: any = this.state.imageSlider;
        const onTheAir: any = this.state.onTheAir;
        const trendingMovie: any = this.state.trendingMovie;
        const watchList: any = this.state.watchList;
        const imgSrc = `url(https://image.tmdb.org/t/p/original/` + imageSlider.backdrop_path + `})`
        console.log('imageSlider', imageSlider)
        return (
     <>
    <Box component="main">
        {this.state.loading > 0 ? <Loader /> : null}
    <Grid container spacing={0}>
        <Grid item xs={12} md={12}>
            <div style={{backgroundImage: imgSrc}} className="img-slider">

                <Grid container spacing={2}>
                    <Grid xs={6} md={4}>
                        <div className="slider-content">
                            <Box sx={{marginLeft: 6}}>
                            <Typography gutterBottom variant="h3" component="div">
                            {imageSlider.title}
                            </Typography>
                            <Grid container spacing={2}>
                                    <Grid xs={6} md={12}>
                                        <Box sx={{ml: 3, mb: 2}}>
                                        <svg style={{height: '15px', fill: '#faaf00'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                        <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
                                    </svg>   <span>{(imageSlider.vote_average / 2).toString().slice(0, 3)} / 5 </span>
                                    <span style={{marginLeft: 15, marginRight: 15}}>|</span>
                                      <span >{imageSlider.vote_count} Reviews</span>
                                      <span style={{marginLeft: 15, marginRight: 15}}>|</span>
                                      <span >Release Date  -  {imageSlider.release_date}</span>

                                        </Box>
                             
                                    </Grid>
                                
                                </Grid>
                            </Box>
                         
                              
                      
                            <Typography variant="body2" color="text.secondary">
                            {imageSlider.overview}
                            </Typography>
                        </div>
                    </Grid>
                
                </Grid>

            </div>
        </Grid>
    </Grid>

   
    <Box component="section" sx={{ pl: 10, pr: 10,}}>
        <div className="trending-now">
            <Box sx={{pb: 2}}>
            <Typography gutterBottom variant="h5" className="heading" component="div">
        Trending Movies </Typography>
            <Divider />
            </Box>
  
        
        <Grid container spacing={2}>
            {trendingMovie.map((imageObj: any) => 
                <Grid item xs={6} md={2}>
                <CardComponent watchList={watchList} imageData={imageObj} />
            </Grid>
                )}
        </Grid>
        </div>
    </Box>

    <Box component="section" sx={{ pl: 10, pr: 10,}}>
        <div className="trending-now">

        <Box sx={{pb: 2}}>
            <Typography gutterBottom variant="h5" className="heading" component="div">
            Trending Web Series </Typography>
            <Divider />
            </Box>
        <Grid container spacing={2}>
            {onTheAir.map((imageObj: any) => 
                <Grid item xs={6} md={2}>
                <CardComponent isWebSeries={true} watchList={watchList} imageData={imageObj} />
            </Grid>
                )}
        </Grid>
        </div>
    </Box>

    </Box>
     </>   
    )
}
}