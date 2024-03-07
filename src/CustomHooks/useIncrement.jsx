import { useState } from "react";

export default function useIncrement(initialValue, step=1) {

    const [increment, setIncrement] = useState(initialValue);


    const incrementHandler = () => setIncrement( (increment) => increment + step )
    const decrementHandler = () => setIncrement( (increment) => increment - step )



    return [increment, incrementHandler, decrementHandler]
}
