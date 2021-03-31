import canister from "ic:canisters/shadow";
import React, { useState, useEffect } from "react";
import { render } from "react-dom";

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
    <div>
      <h1>Shadow | A video platform for aspiring mentors</h1>

      <div>
        <p>
          Shadow is an app to help new mentors hone their skills by pairing them
          with existing mentors in live video sessions.
        </p>
        <div>
          Register a new mentoring room
          <table>
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
        <br />

        <hr />
        <div>
          <b>Or find an existing session to shadow:</b>
          <br />
          <br />
          {rooms.map((room, i) => {
            return (
              <div
                onClick={() => goToRoom(room)}
                key={i}
                style={{
                  border: "1px solid black",
                  fontSize: "16px",
                  padding: "10px 20px 10px 20px",
                  width: "400px",
                  cursor: "pointer",
                }}
              >
                <b>{room.name}</b> - /{room.url}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

document.title = "Shadow | Mentorship shadowing for potential mentors";

render(<Shadow />, document.getElementById("app"));
