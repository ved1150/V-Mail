//import
import React, { useRef, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { composeActions } from "../Store/ComposeReducer";
export default function ComposePage() {
  //----useRef----//
  const email = useRef();
  const subject = useRef();

  //----redux----//
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.auth.loginEmail);
  let myEmail = userEmail.replace(/[&,+()$~%@.'":*?<>{}]/g, ""); 

  //----for text extention----//
  const [text, setText] = useState("");

  //----send email----//
  async function send(event) {
    event.preventDefault();

    //----entered info----//
    const enteredEmail = email.current.value;
    dispatch(composeActions.setEmail(enteredEmail));
    const enteredSubject = subject.current.value;
    let userEmail = enteredEmail.replace(/[&,+()$~%@.'":*?<>{}]/g, "");

    //----sending date of email----//
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let currentDate = `${day}-${month}-${year}`;

    //----'POST' request for other person(resiver of email)----//
    fetch(
      `https://v-mail-a0a46-default-rtdb.firebaseio.com/mail/${userEmail}.json`,
      {
        method: "POST",
        body: JSON.stringify({
          emailFrom: userEmail,
          email: enteredEmail,
          subject: enteredSubject,
          text: text,
          date: currentDate,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        alert("Your mail is send");
      } else {
        res.json().then((data) => alert(data.error.message));
      }
    });

     //----'POST' request for self(resiver of email in "sent" )----//
    fetch(
      `https://v-mail-a0a46-default-rtdb.firebaseio.com/sent/${myEmail}.json`,
      {
        method: "POST",
        body: JSON.stringify({
          emailFrom: userEmail,
          email: enteredEmail,
          subject: enteredSubject,
          text: text,
          date: currentDate,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
      } else {
        res.json().then((data) => console.log("error from sent post"));
      }
    });
  }
  //----V-DOM----//
  return (
    <div className="compose">
      
      <div>
        <label className="to">To:</label>
        <input type="email" ref={email} required  style={{ border: "none", outline: "none" }} />
      </div>
      <hr />
      <input
        type="text"
        placeholder="Subject"
        style={{ border: "none", outline: "none" }}
        ref={subject}
        required
      />
      <hr />
      <Editor
        onContentStateChange={(x) => setText(x.blocks[0].text)}
        required
      />
      <button onClick={send} className="sendbtn">Send</button>
      <Link to="/inbox">
        <button className="backbtn">❌</button>
      </Link>
    </div>
  );
}
