import React from "react";

export default function Showmsg() {
  return (
    <div className="mail-message">
      <div>
        <h1>My First Letter</h1>
        <div className="sender-options">
          <img src="http://placekitten.com/g/48/48" />
          <div> 
            <div className="sender-name">Jane Doe</div>
            <a href="#">@janedoe</a>
          </div>
          <ul>
            <li>7/6/2014</li>
            <li>
              <span className="fa fa-mail-reply"></span>
            </li>
            <li>
              <span className="fa fa-trash-o"></span>
            </li>
          </ul>
        </div>
        <div className="mail-message-body">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at
            vestibulum lorem. Suspendisse id tortor condimentum, malesuada odio
            vitae, vehicula metus. Praesent mattis sem id mauris rutrum, mollis
            condimentum elit ornare. Maecenas in tortor convallis, laoreet orci
            id, suscipit sapien. Duis eu dolor leo. Praesent non posuere lacus.
            Donec sodales eget libero id condimentum.
          </p>
          <p>
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
            posuere cubilia Curae; Phasellus pretium elit ut massa eleifend
            sodales. Cras sem dui, egestas a tincidunt pretium, fringilla id
            diam. Phasellus diam lectus, condimentum nec molestie sed, tincidunt
            bibendum dui. Nam eu nisi lobortis, rutrum sem id, euismod felis.
            Sed sit amet arcu eget ipsum scelerisque feugiat. Vestibulum congue
            semper ligula ut malesuada. Vestibulum sit amet accumsan eros. Ut
            sit amet volutpat lectus.
          </p>
        </div>
      </div>
    </div>
  );
}
