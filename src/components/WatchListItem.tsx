import { Alert, Box, Divider, Grid, Typography } from "@mui/material";
import { Component, ReactNode } from "react";
import CardComponent from "./Card";
import { LOCAL_STORAGE } from "../constant/local-storeage";
import { useParams } from "react-router-dom";

class WatchListItem extends Component<any> {
    state = {
        moviesList: []
    }
    componentDidMount(): void {
       this.onGetMoviesFromWatchList();
    }
    onGetMoviesFromWatchList = () => {
        const watchListFromLocalStorage = localStorage.getItem(LOCAL_STORAGE.MOVIES_IN_WATCH_LIST_BY_ID + this.props.params.id)
        if (watchListFromLocalStorage) {
            this.setState({
                moviesList: JSON.parse(watchListFromLocalStorage)
            })
        }
    }

    render(): ReactNode {
        const moviesList = this.state.moviesList;
        return(
            <>
            <Box component="section" sx={{ pt:5, pl: 10, pr: 10,}}>
        <div className="trending-now movies-list">
         <Box sx={{pb: 2}}>
              <Typography gutterBottom variant="h5" className="movie-heading" component="div">
        {this.props.params.title} </Typography>
        <Divider />

        </Box>   
        {moviesList.length > 0 ? 
        <Grid container spacing={2}>
            {moviesList.map((imageObj: any) => 
                <Grid item xs={6} md={2}>
                <CardComponent myList={true} myListID={this.props.params.id} 
                updateWatchList={this.onGetMoviesFromWatchList} imageData={imageObj} />
            </Grid>
                )}

        </Grid>
        :         <Alert variant="filled" severity="warning">
Opps! There are no movies added to this playlist.
        </Alert>}
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
   
export default withRouter(WatchListItem);

