import { useEffect, useState, useRef } from "react";

export default function useCallbackState(od) {
  const cbRef = useRef();
  const [data, setData] = useState(od);

  useEffect(() => {
    // setTimeout(() => {
    cbRef.current && cbRef.current(data);
    // }, 200);
  }, [data]);

  return [
    data,
    function(d, callback) {
      cbRef.current = callback;
      setData(d);
    },
  ];
}
