import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { PopActions } from "../Store/Pop";
export default function Showmsg(props) {
  console.log(props)
  let dispatch = useDispatch()
  const item = useSelector(state => state.pop.item)
  console.log(item)
  return (
    <div className="mail-message" style={OVERLAY}>
      <div style={STYLE}>
        <img onClick={() => dispatch(PopActions.isOpen())} style={{width:"30px" ,height: "30px",position: "absolute",left: 0 ,top : 10}} src="https://cdn-icons-png.flaticon.com/128/2459/2459427.png"/>
        <h1>{item.subject}</h1>
        <div className="sender-options">
          <img src="http://placekitten.com/g/48/48" />
          <div>
            <a href="#">{item.emailFrom}</a>
          </div>
          <ul>
            <li>{item.date}</li>
            <li>
              <span className="fa fa-mail-reply"></span>
            </li>
            <li>
              <span className="fa fa-trash-o"></span>
            </li>
          </ul>
        </div>
        <div className="mail-message-body">
          <p>{item.text}</p>
          <p>................................................................................................

          </p>
        </div>
      </div>
    </div>
  );
}
const STYLE = {
  position: "fixed",
  left: "22% ",
  top: "10% ",
  zIndex: 1000,
  padding: "50px",
  backgroundColor: "#fff",
};

const OVERLAY = {
  position: "fixed",
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
  backgroundColor: "rgba(0,0,0,0.3)",
};
