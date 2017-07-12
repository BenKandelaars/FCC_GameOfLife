function convertIndex2Coord(index, width) {
  let vector = {
    x: index % width,
    y: Math.floor(index / width)
  };

  return index === null ? null : vector;
}

export { convertIndex2Coord }
