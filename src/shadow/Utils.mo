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
    };
    Array.append<Room>([room], rooms)
  };

};
