import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Alert, Divider, IconButton, Menu, MenuItem, Modal, Snackbar, TextField } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { LOCAL_STORAGE } from '../constant/local-storeage';
import { Link } from 'react-router-dom';
const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function WatchListCard(props: any) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [openModal, setOpenModal] = React.useState(false);
    const [openNotification, setOpenNotification] = React.useState<boolean>(false);
    const [notiType, setNotiType] = React.useState<string>('success');
    const [notiMsg, setNotiMsg] = React.useState<string>('');

    const [text, setText] = React.useState(props.item.title);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const deleteWatchList = () => {
        const id  = props.item.id;
        const watchListFromLocalStorage = localStorage.getItem(LOCAL_STORAGE.WATCH_LIST)
        if (watchListFromLocalStorage) {
            const watchList =  JSON.parse(watchListFromLocalStorage)
            let index = watchList.findIndex((x: any) => x.id === id);
             watchList.splice(index, 1);
            localStorage.setItem(LOCAL_STORAGE.WATCH_LIST, JSON.stringify(watchList))
            localStorage.removeItem(LOCAL_STORAGE.MOVIES_IN_WATCH_LIST_BY_ID + id)
            props.updateWatchList();
        }
        showNotification('success', 'The Watch List has been Deleted');
        handleClose();
    }
    const editWatchList = () => {
        const id  = props.item.id;
        const watchListFromLocalStorage = localStorage.getItem(LOCAL_STORAGE.WATCH_LIST)
        if (watchListFromLocalStorage) {
            const watchList =  JSON.parse(watchListFromLocalStorage)
            let index = watchList.findIndex((x: any) => x.id === id);
            watchList[index].title = text;
            localStorage.setItem(LOCAL_STORAGE.WATCH_LIST, JSON.stringify(watchList))
            props.updateWatchList();
            setOpenModal(false)

        }
        showNotification('success', 'The Watch List has been modified');
        handleClose();
    }
    const onTextChange = (event: any) => {
        const watchListText = event.target.value;
        setText(watchListText);
    }
    const handleCloseModal = () => {

    }
    const openEditModal = () => {
        setOpenModal(true)
    }
    const showNotification = (type: string, msg: string) => {
      setNotiType(type)
      setOpenNotification(true);
      setNotiMsg(msg)
      setTimeout(()=> {
        setOpenNotification(false);
      }, 4000)
    }
  return (
    <Box sx={{ pt: 5, minWidth: 275 }}>
      <Card variant="outlined">
        <React.Fragment>
    <CardContent className='watch-list-card-title'>
        <Link to={'/movie-list/' + props.item.id + '/' + props.item.title}>
      <Typography gutterBottom variant="h6" component="div">
        {props.item.title}
      </Typography>
      </Link>
     
    </CardContent>
    <CardActions className='watch-list-card-action'>

    <div>
      <IconButton 
       id="basic-button"
       aria-controls={open ? 'basic-menu' : undefined}
       aria-haspopup="true"
       aria-expanded={open ? 'true' : undefined}
       onClick={handleClick}
      aria-label="add an alarm">
        <MoreVertIcon fontSize="small" />
    </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={openEditModal}>Edit</MenuItem>
        <MenuItem onClick={deleteWatchList}>Delete</MenuItem>
      </Menu>
    </div>

    <Modal
  open={openModal}
  onClose={handleCloseModal}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <Typography className="modal-title" id="modal-modal-title" variant="h6" component="h2">
      Edit your Watch List Name
    </Typography>
    <TextField className="input-watchlist" id="standard-basic"                
                   onChange={onTextChange} value={text} label="Watch List Name" variant="standard" />
                  
                   <Box className="watch-list-save-btn">
                   <Button onClick={editWatchList} variant="contained">Update</Button>
                   </Box>

  </Box>
</Modal>

    </CardActions>
  </React.Fragment>
      </Card>
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
    </Box>
  );
}