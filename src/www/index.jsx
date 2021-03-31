import canister from "ic:canisters/shadow";
import React, { useState, useEffect } from "react";
import { render } from "react-dom";

// import "./index.css";

const getRoomUrl = (url) => `https://talky.io/${url || "shadow"}`;

const Shadow = () => {
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState();

  const getRooms = () => {
    canister.getRooms().then((result) => {
      console.log("rooms", result);
      setRooms(result);
    });
  };

  useEffect(() => {
    getRooms();
  }, []);

  async function doInsert() {
    let name = document.getElementById("newEntryName").value;
    let url = document.getElementById("newEntryUrl").value;
    await canister.addRoom(name, url);
    getRooms();
  }

  const goToRoom = (r) => {
    console.log("set room", r);
    const roomUrl = getRoomUrl(r.url);
    window.open(roomUrl);
  };

  return (
    <div style="
      text-align: center;
      font-family: Arial, Helvetica, sans-serif;
      color: rgb(68, 68, 68);
    ">
      <img src="https://res.cloudinary.com/dhl3gjazr/image/upload/v1617234571/shadow/shadow3.png">
      <h1>Shadow | A video platform for aspiring mentors</h1>
      <div>
        <p>
          Shadow is an app to help new mentors hone their skills by observing existing mentors during live video sessions.
        </p>
        <br />
        <div>
          <b>Join a mentoring session as an observer:</b>
          <br />
          <br />
          {rooms.map((room, i) => {
            return (
              <div
                onClick={() => goToRoom(room)}
                key={i}
                style={{
                  border: "1px solid rgb(0, 176, 235)",
                  fontSize: "16px",
                  padding: "10px 20px 10px 20px",
                  width: "800px",
                  cursor: "pointer",
                  margin: "auto",
                }}
              >
                <img src="https://res.cloudinary.com/dhl3gjazr/image/upload/v1617232918/shadow/shadow4.png" style="position: absolute;">
                <span style="position: absolute; font-size: 15px; padding: 6px;">12</span>
                <b style={{color: "rgb(0, 176, 235)", marginLeft: "50px"}}>{room.name}</b> - /{room.url}
              </div>
            );
          })}
        </div>
        <hr style="width: 800px" />
        <div>
          Register a new mentoring room
          <table style="margin: auto;">
            <tr>
              <td>Name:</td>
              <td>
                <input required id="newEntryName"></input>
              </td>
            </tr>
            <tr>
              <td>Room code:</td>
              <td>
                <input id="newEntryUrl"></input>
              </td>
            </tr>
          </table>
          <br />
          <button onClick={() => doInsert()}>Register your room!</button>
        </div>
      </div>
    </div>
  );
};

document.title = "Shadow | Mentorship shadowing for potential mentors";

render(<Shadow />, document.getElementById("app"));
