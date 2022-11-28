import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { openMailActions } from '../Store/OpenMailReducer'
export default function InboxMail() {
   const mailDetail = useSelector(state => state.openMail.openMailValue)
   const dispatch = useDispatch()
   console.log(mailDetail)
  return (
    <Fragment>
      <Link to="/home"><button onClick={() => dispatch(openMailActions.emptyMailValue())}>Back</button></Link>
      <h3>{ mailDetail.subject}</h3>
      <h2>from :{ mailDetail.emailFrom}</h2>
      <p>{ mailDetail.text}</p>
    </Fragment>
  )
}
