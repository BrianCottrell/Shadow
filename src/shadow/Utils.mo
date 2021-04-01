// Import standard libraries
import Array "mo:base/Array";
import Nat "mo:base/Nat";

// Import the 'Room' type definition
import Types "Types";

module Utils {

  type Room = Types.Room;

  // Add to-do item utility
  public func add(rooms : [Room], name : Text, url : Text, nextId : Nat) : [Room] {
    let room : Room = {
      id = nextId;
      name = name;
      url = url;
      upvotes = 0;
    };
    Array.append<Room>([room], rooms)
  };

    // Complete to-do item utility
  public func upvoteRoom(rooms : [Room], id : Nat) : [Room] {
    Array.map<Room,Room>(rooms, func (room : Room) : Room {
      if (room.id == id) {
        return {
          id = room.id;
          name = room.name;
          url = room.url;
          upvotes = room.upvotes + 1;
        };
      };
      room
    })
  };

};
