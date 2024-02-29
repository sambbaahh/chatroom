const getRoomsArray = (rooms) => {
  return JSON.stringify(
    Array.from(rooms, ([key, value]) => ({
      id: key,
      name: value.name,
      userCount: value.users.length,
    }))
  );
};

export default getRoomsArray;