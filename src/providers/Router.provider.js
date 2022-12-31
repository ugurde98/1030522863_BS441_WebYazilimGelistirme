import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Multiplayer from "../pages/Multiplayer";
import Singleplayer from "../pages/Singleplayer";
import Authprovider from "./Auth.provider";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Authprovider />, 
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "multiplayer",
                element: <Multiplayer />,
            },
            {
                path: "singleplayer",
                element: <Singleplayer />,
            },
        ],
    },
]);


export default router