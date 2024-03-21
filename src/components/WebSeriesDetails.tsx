import { Box, Divider, Grid, Rating, Typography } from "@mui/material";
import { Component, ReactNode } from "react";
import Loader from "./Loader";
import axios from "axios";
import { API_URLS, API_PARAMS } from "../constant/api-params";
import { useParams } from "react-router-dom";
import CardComponent from "./Card";
import { LOCAL_STORAGE } from "../constant/local-storeage";

class WebSeriesDetails extends Component<any> {
    state = {
        loading: 0,
        movieDetails: {},
        recommendMovies: [],
        watchList: []
    }
    componentDidMount(): void {
        window.scrollTo(0, 0);
        this.onLoadMovie();
        this.onLoadRecommendMovie();
        this.onLoadWatchList();
    }
    componentDidUpdate(prevProps: any) {
        if (this.props.params.id !== prevProps.params.id) {
            window.scrollTo(0, 0);
            this.onLoadMovie();
            this.onLoadRecommendMovie();
            this.onLoadWatchList();
        }
      }
    onLoadMovie(){
        const that = this;
        this.setState({loading: this.state.loading + 1})
        axios.get(API_URLS.WEB_SERIES_BY_ID + that.props.params.id, {
            params: API_PARAMS
          })
          .then(function (response) {
            that.setState({
                movieDetails: response.data,
            })
            setTimeout(() => {
                that.setState({
                    loading: that.state.loading - 1
                })
                }, 2000);
            })

    }
    onLoadRecommendMovie() {
        const that = this;
        this.setState({loading: this.state.loading + 1})
        const path = API_URLS.RECOMMEND_WEB_SERIES.replace('{ID}', that.props.params.id)
        axios.get(path, {
            params: API_PARAMS
          })
          .then(function (response) {
            that.setState({
                recommendMovies: response.data.results.slice(0, 18),
            })
            setTimeout(() => {
                that.setState({
                    loading: that.state.loading - 1
                })
                }, 2000);
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
    render(): ReactNode {
        const movieDetails: any = this.state.movieDetails;
        const imgSrc = `url(https://image.tmdb.org/t/p/original/` + movieDetails.backdrop_path + `})`
        const posterImg = 'https://image.tmdb.org/t/p/w370_and_h556_bestv2/' + movieDetails.poster_path;
    const spokenLang = movieDetails.spoken_languages || [];
    const genres = movieDetails.genres || [];
    console.log('loading', this.props.params)
        return(
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
                            {movieDetails.original_name}
                            </Typography>
                            <Grid container spacing={2}>
                                    <Grid xs={6} md={12}>
                                        <Box sx={{ml: 3, mb: 2}}>
                                        <svg style={{height: '15px', fill: '#faaf00'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                        <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
                                    </svg>   <span>{(movieDetails.vote_average / 2).toString().slice(0, 3)} / 5 </span>
                                    <span style={{marginLeft: 15, marginRight: 15}}>|</span>
                                      <span >{movieDetails.vote_count} Reviews</span>
                                      <span style={{marginLeft: 15, marginRight: 15}}>|</span>
                                      <span >Release Date  -  {movieDetails.first_air_date}</span>

                                        </Box>
                             
                                    </Grid>
                                
                                </Grid>
                            </Box>
                         
                              
                      
                            <Typography variant="body2" color="text.secondary">
                            {movieDetails.overview}
                            </Typography>
                        </div>
                    </Grid>
                
                </Grid>

            </div>
        </Grid>


    </Grid>
    </Box> 

    <Box component="main" sx={{pl: 15, pt:10, pr: 15, pb: 3}}>
        <Grid container spacing={0}>
            <Grid item xs={4} md={4}>
                 <img style={{height: '500px'}} src={posterImg} />
            </Grid>
            <Grid item xs={6} md={6}>
                   <Typography gutterBottom variant="h3" component="div">
                            {movieDetails.original_name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            {movieDetails.overview}
                            </Typography>    
                <Box sx={{mt: 2}}>
                <Grid container spacing={3}>
                     <Grid item xs={3} md={3}>
                         <h4>
                        Rating
                        </h4>
                        <h4>
                        Released
                        </h4>
                        <h4>
                        Episode
                        </h4>
                        <h4>
                        Genre
                        </h4>
                        <h4>
                        Status
                        </h4>
                        <h4>
                        Language
                        </h4>
                    </Grid>
                    <Grid item xs={4} md={4}>
                        <h4>
                  <Rating className='rating' disabled size='small' name="half-rating"
          defaultValue={this.props.params.rating} 
          precision={0.5} /> <br />
                        </h4>
                        <h4>
                        {movieDetails.first_air_date}
                        </h4>
                        <h4>
                        {movieDetails.number_of_episodes} episodes
                        </h4>
                        <h4>
                        {genres.map((item: any) => 
                        <span style={{color: '#dc4666'}}>{item.name} ,  </span>
                            )}
                        </h4>
                        <h4>
                        {movieDetails.status}
                        </h4>
                        <h4>
                        {spokenLang.map((item: any) => 
                          <span>{item.name} </span>
                            )}
                        </h4>
                    </Grid>
                </Grid>    
                </Box>
                   

            </Grid>
        </Grid>
    </Box>   

        <Box component="section" sx={{ pl: 10, pr: 10,}}>
        <div className="trending-now">

        <Box sx={{pb: 2}}>
            <Typography gutterBottom variant="h5" className="heading" component="div">
            Recommend Movies </Typography>
            <Divider />
            </Box>
        <Grid container spacing={2}>
            {this.state.recommendMovies.map((imageObj: any) => 
                <Grid item xs={6} md={2}>
                <CardComponent isWebSeries={true}  watchList={this.state.watchList} imageData={imageObj} />
            </Grid>
                )}
        </Grid>
        </div>
    </Box> 

            </>
        )
    }
}
const withRouter = (WrappedComponent: any) => (props:any) => {
    const params = useParams();
   
    return (
      <WrappedComponent
        {...props}
        params={params}
      />
    );
  };
   
export default withRouter(WebSeriesDetails);
