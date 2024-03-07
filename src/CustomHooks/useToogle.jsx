/**
 * hook personnalisé
 */
import {  useState } from "react";
export default function useToogle(initial = false ) {


    const [state, setState] = useState(initial);

    const toogle = () => setState((prevState) => !prevState)


    return [state, toogle]
}