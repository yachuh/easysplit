import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

// Function: account verification API
const accountActivateAPI = async (guid) => {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  const raw = JSON.stringify({
    Guid: guid
  })

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw
  }

  const resp = await fetch(`https://easysplit.rocket-coding.com/api/User/AuthMail/AccountActivation?guid=${guid}`, requestOptions)
  const result = await resp.json()
  console.log(result)
  return result
}

export default function AccountActivationPage () {
  const [isVerified, setIsVerified] = useState(false)
  const [message, setMessage] = useState('')

  // Get the params from the URL
  const [searchParams] = useSearchParams()
  const guid = searchParams.get('guid')
  console.log('guid', guid)
  //

  // trigger accountActivation API
  const accountActivate = async (guid) => {
    const resp = await accountActivateAPI(guid)
    const status = resp.Status
    setIsVerified(status)
    const message = resp.Message
    setMessage(message)
  }
  accountActivate(guid)
  //

  useEffect(() => {
    console.log(isVerified)
  }, [])

  return (
        <div>
            <p>Verification Status: {isVerified ? 'true' : 'false'}</p>
            <p>Message: {message}</p>
        </div>
  )
}
