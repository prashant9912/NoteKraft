"use client";

import { decrement, increment } from "notekraft/utils/redux/reducers/counter";
import { useSelector, useDispatch } from "react-redux";
import { useToast } from "./ui/use-toast";

function Counter() {
  const { toast } = useToast();

  const count = useSelector((state: any) => state.counter);
  const dispatch = useDispatch();

  const onIncrement = () => {
    dispatch(increment());
    toast({
      title: "Counter updated",
      description: "",
    });
  };
  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={onIncrement}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
}

export default Counter;
