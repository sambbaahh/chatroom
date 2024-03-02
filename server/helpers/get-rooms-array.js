const getRoomsArray = (rooms) => {
  return (
    Array.from(rooms, ([key, value]) => ({
      id: key,
      name: value.name,
      userCount: value.users.length,
    }))
  );
};

export default getRoomsArray;