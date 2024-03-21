import { Box, LinearProgress } from '@mui/material'
import React, { useState } from 'react'
import LoadingBar from 'react-top-loading-bar'

const Loader = () => {
  const [progress, setProgress] = useState(10)
    setInterval(() => {
        if (progress < 90) {
            setProgress(progress + 10)
        }
    }, 500)
  return (
    <div className='loader'>
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    </div>
  )
}

export default Loader