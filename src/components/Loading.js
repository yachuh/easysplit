import React, { useState } from 'react'

// import LoadingModal from '../components/LoadingModal'
// import LoadingModal from '../LoadingModal'

const [isLoading, setIsLoading] = useState(false)

setIsLoading(true)
setIsLoading(false)


{
    isLoading
        ? <LoadingModal />
        : 
}
