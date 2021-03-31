import Types "Types";
import Utils "Utils";

// Define the actor
actor Assistant {

  type Room = Types.Room;

  var nextId : Nat = 1;
  var rooms : [Room] = [];

    public query func getRooms() : async [Room] {
    return rooms;
  };

   public func addRoom(name : Text, url : Text) : async () {
    rooms := Utils.add(rooms, name, url, nextId);
    nextId += 1;
  };

    public func clearRooms() : async () {
    rooms := [];
    nextId -= (nextId-1);
  };



};
