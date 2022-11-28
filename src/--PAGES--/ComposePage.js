import React, { useRef, useState , useEffect} from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useSelector ,useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { composeActions } from "../Store/ComposeReducer";
export default function ComposePage() {
  // let Email ;
  const resiveMail = useSelector((state) => state.compose.list);
  console.log(resiveMail)
  const dispatch = useDispatch()
  const emailId= useSelector(state => state.auth.loginEmail)
  let sentEmail = emailId.replace(
    /[&,+()$~%@.'":*?<>{}]/g,
    ""
  );
  console.log(emailId)
  const state = useSelector(state => state)
  console.log(state)
  const email = useRef();
  const subject = useRef(); 
  const [text, setText] = useState("");
  const [render, setRender] = useState(0);
  async function send(event) {
    event.preventDefault();
    const enteredEmail = email.current.value;
    dispatch(composeActions.setEmail(enteredEmail))
    const enteredSubject = subject.current.value;
    let userEmail = enteredEmail.replace(
      /[&,+()$~%@.'":*?<>{}]/g,
      ""
    );
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    
    let currentDate = `${day}-${month}-${year}`;

    // POST TO UNDER OTHER MAIL (FOR other PERSON )
    fetch(
      `https://v-mail-a0a46-default-rtdb.firebaseio.com/mail/${userEmail}.json`,
      {
        method: "POST",
        body: JSON.stringify({
          emailFrom : emailId,
          email: enteredEmail,
          subject: enteredSubject,
          text: text,
          date : currentDate
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        setRender((pre) => pre + 1);
        alert("Your mail is send");
      } else {
        res.json().then((data) => alert(data.error.message));
      }
    });

     // POST TO self  MAIL (FOR sent method )
     fetch(
      `https://v-mail-a0a46-default-rtdb.firebaseio.com/sent/${sentEmail}.json`,
      {
        method: "POST",
        body: JSON.stringify({
          emailFrom : emailId,
          email: enteredEmail,
          subject: enteredSubject,
          text: text,
          date : currentDate
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        setRender((pre) => pre + 1);
      } else {
        res.json().then((data) => console.log("error from sent post"));
      }
    });
}
 
  return (
    <div>
      <div>
        <label>To:</label>
        <input type="email" ref={email} required />
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
      <button onClick={send}>send</button>
      <Link to="/inbox">
        <button>Back to Home</button>
      </Link>
    </div>
  );
}
