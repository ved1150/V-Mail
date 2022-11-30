import React, { useEffect, useRef, useState } from "react";
import "./Homepage.css";
import { useDispatch, useSelector } from "react-redux";
import Showmsg from "./Showmsg";
import {
  Link,
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { PopActions } from "../Store/Pop";
import { inboxActions } from "../Store/InboxReducer";
import { openMailActions } from "../Store/OpenMailReducer";
import inboxMail from "./InboxMail";
import { addListener, current } from "@reduxjs/toolkit";
export default function Homepage() {
  const [render, setRender] = useState(0);
  const popOpen = useSelector(state => state.pop.open)
  const [isOpen , setISOpen] = useState(false)
  const dispatch = useDispatch();
  const loginEmail = JSON.parse(localStorage.getItem("userEmail"));
  let userEmail = loginEmail.replace(/[&,+()$~%@.'":*?<>{}]/g, "");
  console.log(userEmail);
  const inboxMails = useSelector((state) => state.inbox.inboxList);
  console.log(inboxMails);
  useEffect(() => {
    fetch(
      `https://v-mail-a0a46-default-rtdb.firebaseio.com/mail/${userEmail}.json`
    ).then((res) => {
      if (res.ok) {
        setRender((pre) => pre + 1);
        res.json().then((data) => {
          let arr = [];
          {
            for (let keys in data) {
              let obj = {
                ...data[keys],
                id: keys,
              };
              console.log(arr);
              arr.push(obj);
            }
            dispatch(inboxActions.updateInboxList([...arr]));
          }
        });
      } else {
        res.json().then((data) => console.log(data));
      }
    });
  }, [render]);
  function userClickOnMail(emailFrom, subject, text) {
    let obj = {
      emailFrom: emailFrom,
      subject: subject,
      text: text,
    };
    dispatch(openMailActions.updateopenMailValue(obj));
  }
  function logOut() {
    localStorage.clear();
    window.location.reload();
  }
  function hideThePop(){
    console.log("click")
    setISOpen(false)
}
 function deleteMsg(id){
  alert("delete")
  fetch(
    `https://v-mail-a0a46-default-rtdb.firebaseio.com/mail/${userEmail}/${id}.json`,
    {
      method: "DELETE",
    }
  ).then((res) => {
    if (res.ok) {
      setRender((pre) => pre - 1);
      alert("Expense successfuly deleted 💸");
    } else {
      res.json().then((data) => alert(data.error.message));
    }
  });
 }
  return (
    <div className="container">
      <div className="mail-box">
        <aside className="sm-side">
          {" "}
          <div className="user-head">
            <a className="inbox-avatar" href="javascript:;">
              <img
                width="64"
                hieght="60"
                src="https://cdn-icons-png.flaticon.com/512/131/131690.png"
              />
            </a>
            <div className="user-name">
              <h5>Alireza Zare</h5>
              <span>
                <a href="#">Info.Ali.Pci@Gmail.com</a>
                {/* ahi login email pakdin nakhvo */}
              </span>
            </div>
          </div>
          <div className="inbox-body">
            <Link to="./send-box" className="btn btn-compose">
              Compose
            </Link>
          </div>
          <ul className="inbox-nav inbox-divider">
            <li className="active">
              <Link to="/inbox">
                Inbox-
                {/* ahi upar sankya add krvsni */}
                <span className="email-count"> 2</span>
              </Link>
            </li>
            <li>
              <Link to="/sent">Sent Mail</Link>
            </li>
            <li>
              <Link to="#">Important</Link>
            </li>
            <li>
              <Link to="#">
                Drafts
                <span className="label label-info pull-right">30</span>
              </Link>
            </li>
            <li>
              <Link to="#">Trash</Link>
            </li>
            <li>
              <Link to="#" onClick={logOut}>
                Sign Out
              </Link>
            </li>
          </ul>
        </aside>
        <aside className="lg-side">
          <div className="inbox-head">
            <h3>Inbox</h3>
          </div>

          <table className="table table-inbox table-hover">
            <tbody  >
              {inboxMails.map((item) => {
                return (
                  <>
                    <tr className="unread">
                      <td className="inbox-small-cells">
                        <input type="checkbox" className="mail-checkbox" />
                      </td>
                      <td className="inbox-small-cells" onClick={() => dispatch(PopActions.isOpen(item))}></td>
                      <td className="view-message  dont-show" onClick={() => dispatch(PopActions.isOpen(item))}>{item.emailFrom}</td>
                      <td className="view-message " onClick={() => dispatch(PopActions.isOpen(item))}>
                       {item.subject}
                      </td>
                      <img src="https://cdn-icons-png.flaticon.com/512/9039/9039011.png" alt="" className="view-message  inbox-small-cells" style={{width:"30px", height : "30px"}}  onClick={() => deleteMsg(item.id)}/>
                      <td className="view-message  text-right" onClick={() => dispatch(PopActions.isOpen(item))}>{item.date} </td>
                    </tr>
                    {popOpen && <Showmsg />}
                  </>
                );
                
              })}
            </tbody>
          </table>
        </aside>
      </div>
     
    </div>
  );
}
