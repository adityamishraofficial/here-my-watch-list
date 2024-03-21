import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Alert, Button, CardActionArea, CardActions, Menu, MenuItem, Rating, Snackbar } from '@mui/material';
import { LOCAL_STORAGE } from '../constant/local-storeage';
import { Link } from 'react-router-dom';

export default function CardComponent(props: any) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [openNotification, setOpenNotification] = React.useState<boolean>(false);
  const [notiType, setNotiType] = React.useState<string>('success');
  const [notiMsg, setNotiMsg] = React.useState<string>('');

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const onAddToWatchList = (item: any) => {
    if (!item.id) return 
    const watchListMovieByID = localStorage.getItem(LOCAL_STORAGE.MOVIES_IN_WATCH_LIST_BY_ID + item.id)
    let watchListMovie = [];
    if (!watchListMovieByID) {
        watchListMovie.push(props.imageData);
        localStorage.setItem(LOCAL_STORAGE.MOVIES_IN_WATCH_LIST_BY_ID + item.id, JSON.stringify(watchListMovie))
    } else {
      watchListMovie = JSON.parse(watchListMovieByID);
      let index = watchListMovie.findIndex((x: any) => x.id === props.imageData.id);
      if (index !== -1) {
        showNotification('error', 'The movie is already present in the watch list')
        return
      }
      watchListMovie.push(props.imageData);
      localStorage.setItem(LOCAL_STORAGE.MOVIES_IN_WATCH_LIST_BY_ID  + item.id, JSON.stringify(watchListMovie))
    }
    showNotification('success', 'The movie has been added to the watch list!');
    handleClose();
  }
  const showNotification = (type: string, msg: string) => {
    setNotiType(type)
    setOpenNotification(true);
    setNotiMsg(msg)
    setTimeout(()=> {
      setOpenNotification(false);
    }, 4000)
  }
  const removeMovie = () => {
    const watchListMovieByID = localStorage.getItem(LOCAL_STORAGE.MOVIES_IN_WATCH_LIST_BY_ID + props.myListID)
    if (watchListMovieByID){
      const watchListMovie = JSON.parse(watchListMovieByID);
      let index = watchListMovie.findIndex((x: any) => x.id === props.imageData.id);
      watchListMovie.splice(index, 1)
      localStorage.setItem(LOCAL_STORAGE.MOVIES_IN_WATCH_LIST_BY_ID  + props.myListID, JSON.stringify(watchListMovie))
      showNotification('success', 'The movie has been removed from the watch list!');
      props.updateWatchList();
      handleClose();
    }
  

  }
  const onSelectRating = (newValue: any) => {
    const movieRating = localStorage.getItem(LOCAL_STORAGE.MOVIE_RATING)
    let ratings: any = {};
    if (!movieRating || movieRating == '{}') {
        ratings[props.imageData.id] = newValue;
        localStorage.setItem(LOCAL_STORAGE.MOVIE_RATING, JSON.stringify(ratings))
    } else {
      ratings = JSON.parse(movieRating);
      ratings[props.imageData.id] = newValue;
      localStorage.setItem(LOCAL_STORAGE.MOVIE_RATING, JSON.stringify(ratings))
    }
  }
  const movieRating = localStorage.getItem(LOCAL_STORAGE.MOVIE_RATING)
  let ratings = null;
  if (movieRating) {
    ratings = JSON.parse(movieRating);
  }
  ratings = ratings && ratings[props.imageData.id] ? ratings[props.imageData.id] :  props.imageData.vote_average / 2
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <Link to={(props.isWebSeries ? '/web-series-details/' : '/movie-details/') + props.imageData.id + '/' + ratings}>
        <CardMedia
          component="img"
          height="350"
          image={'https://image.tmdb.org/t/p/w370_and_h556_bestv2/' + props.imageData.poster_path}
          alt={props.imageData.title ? props.imageData.title: props.imageData.name}
        />
        </Link>
        <CardContent>
          <Typography className='movie-name' gutterBottom variant="h6" component="div">
          {props.imageData.title ? props.imageData.title:  props.imageData.name}
          </Typography>
          <Rating className='rating' size='small' name="half-rating"
            onChange={(event, newHover) => {
              onSelectRating(newHover);
            }}
          defaultValue={ratings} precision={0.5} />
        </CardContent>
      </CardActionArea>
      <CardActions>
        {/* <Button size="small" color="primary">
          Add to Watch List
        </Button> */}
          <div>
            {props.myList ? 
                  <Button
                  id="basic-button"
                  aria-haspopup="true"
                  onClick={removeMovie}
                >
                  Remove From Watch List
                </Button>: 
                <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Add to watch list
      </Button>
          }
      
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {props.watchList ? props.watchList.map((item: any) => 
         <MenuItem  onClick={() => {onAddToWatchList(item)}}>{item.title}</MenuItem>
        ): null}

      </Menu>
    </div>
      </CardActions>
      <Snackbar 
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={openNotification} autoHideDuration={6000}>
        <Alert
          severity={notiType === 'success' ? 'info' : 'error'}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {notiMsg}
        </Alert>
      </Snackbar>
    </Card>
  );
}