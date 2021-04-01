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
      result.sort((a, b) => b.upvotes - a.upvotes); // sort desc.
      setRooms(result);
    });
  };

  const upvote = async (roomId) => {
    console.log("upvote", roomId);
    try {
      await canister.upvote(roomId);
    } catch (e) {
      console.error("error upvoting", roomId, e);
    }
    getRooms();
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
    <div
      style={{
        textAlign: "center",
        fontFamily: "Arial, Helvetica, sans-serif",
        color: "rgb(68, 68, 68)",
      }}
    >
      <img src="https://res.cloudinary.com/dhl3gjazr/image/upload/v1617234571/shadow/shadow3.png" />
      <h1>Shadow | A video platform for aspiring mentors</h1>
      <div>
        <p>
          Shadow is an app to help new mentors hone their skills by observing
          existing mentors during live video sessions.
        </p>
        <br />
        <div>
          <b>Join a mentoring session as an observer:</b>
          <br />
          <br />
          {rooms.map((room, i) => {
            return (
              <div
                key={i}
                style={{
                  border: "1px solid rgb(0, 176, 235)",
                  fontSize: "16px",
                  padding: "10px 20px 10px 20px",
                  width: "800px",
                  lineHeight: "30px",
                  margin: "auto",
                }}
              >
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => upvote(room.id)}
                >
                  <img
                    src="https://res.cloudinary.com/dhl3gjazr/image/upload/v1617232918/shadow/shadow4.png"
                    style={{ position: "absolute" }}
                  />
                  {/* TODO: variable padding */}
                  <span
                    style={{
                      position: "absolute",
                      fontSize: "15px",
                      paddingLeft: "10px",
                    }}
                  >
                    {(room.upvotes && room.upvotes.toNumber()) || 0}
                  </span>
                </span>
                <span
                  style={{ cursor: "pointer", lineHeight: "30px" }}
                  onClick={() => goToRoom(room)}
                >
                  <b style={{ color: "rgb(0, 176, 235)", marginLeft: "50px" }}>
                    {room.name}
                  </b>{" "}
                  - /{room.url}
                </span>
              </div>
            );
          })}
        </div>
        <hr style={{ width: "800px" }} />
        <div>
          Register a new mentoring room
          <table style={{ margin: "auto" }}>
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
