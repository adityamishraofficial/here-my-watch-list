import { Alert, Box, Button, Divider, Grid, IconButton, Modal, Snackbar, TextField, Typography } from "@mui/material";
import { Component, ReactNode } from "react";
import AddIcon from '@mui/icons-material/Add';
import { LOCAL_STORAGE } from "../constant/local-storeage";
import WatchListCard from "./WatchListCard";
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
export default class WatchList extends Component {
    state = {
        openModal: false,
        watchListName: '',
        watchList: [],
        openNotification: false,
        notiType: 'success',
        notiMsg: ''
    }

    componentDidMount(): void {
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
    handleClose = () => {
        this.setState({
            openModal: false
        })
    }
    handleOpen = () => {
        this.setState({
            openModal: true
        })
    }
    onTextChange = (event: any) => {
        const watchListText = event.target.value;
        this.setState({
            watchListName: watchListText
        })
    }
    onSave = () => {
        const watchListName = this.state.watchListName
        if (watchListName.length < 3) {
            return;
        }
        const watchListFromLocalStorage = localStorage.getItem(LOCAL_STORAGE.WATCH_LIST)
        let myWatchList = [];
        if (!watchListFromLocalStorage) {
            myWatchList.push({id: 1, title: watchListName});
            localStorage.setItem(LOCAL_STORAGE.WATCH_LIST, JSON.stringify(myWatchList))
        } else if (watchListFromLocalStorage && watchListFromLocalStorage === '[]') {
            myWatchList = JSON.parse(watchListFromLocalStorage);
            myWatchList.push({id: 1, title: watchListName});
            localStorage.setItem(LOCAL_STORAGE.WATCH_LIST, JSON.stringify(myWatchList))
        } else {
            myWatchList = JSON.parse(watchListFromLocalStorage);
            myWatchList.push({id: myWatchList[myWatchList.length - 1].id + 1, title: watchListName});
            localStorage.setItem(LOCAL_STORAGE.WATCH_LIST, JSON.stringify(myWatchList))
        }

        this.setState({
            openModal: false,
        })
        this.showNotification('success', 'The watch list has been successfully created')
        this.onLoadWatchList();
    }
    showNotification = (type: string, msg: string) => {
        this.setState({
            openNotification: true,
            notiType: type,
            notiMsg: msg
        })
        setTimeout(()=> {
            this.setState({
                openNotification: false
            })
        }, 4000)
      }

    render(): ReactNode {
        const watchList = this.state.watchList;
        return(
            <>
            <Box component="section" sx={{ height: 800, pt: 20, pl: 30, pr: 30,}}>

            <div className="my-watch-list" >
                <h1>My Watch List</h1>
        <Button className="watch-list-btn" onClick={this.handleOpen}>New Watch List</Button>

<Modal
  open={this.state.openModal}
  onClose={this.handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <Typography className="modal-title" id="modal-modal-title" variant="h6" component="h2">
      Create new Watch List
    </Typography>
    <TextField className="input-watchlist" id="standard-basic"                
                   onChange={this.onTextChange} label="Watch List Name" variant="standard" />
                  
                   <Box className="watch-list-save-btn">
                   <Button onClick={this.onSave} variant="contained">Save</Button>
                   </Box>

  </Box>
</Modal>
            </div>
            <Divider />

                 <Box>
                    {watchList.length > 0 ?
                    <Grid container spacing={2}>
                        {watchList.map(item => 
                            <Grid item xs={6} md={6}>
                                 <WatchListCard 
                                 updateWatchList={this.onLoadWatchList} item={item} />
                            </Grid>
                          )}
                    </Grid>: 
                    <Alert variant="filled" severity="info">
                    Opps! No Watch list available.
                            </Alert>}
                </Box>
            </Box>
            <Snackbar 
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={this.state.openNotification} autoHideDuration={6000}>
        <Alert
          severity={this.state.notiType === 'success' ? 'info' : 'error'}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {this.state.notiMsg}
        </Alert>
      </Snackbar>
            </>
        )
    }
}