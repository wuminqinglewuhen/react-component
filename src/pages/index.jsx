import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import CustomName from "../components/CustomName.jsx";


const routes = [
    {
        path: "/home",
        component: Home
    },
    {
        path: '/CustomInputSearch',
        component: CustomName
    }
];
function Home() {
    return <h2>Home</h2>;
}

export default function App() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/CustomInputSearch">CustomInputSearch</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <Switch>
                {routes.map((route, i) => (
                    <RouteWithSubRoutes key={i} {...route} />
                ))}
            </Switch>
        </Router>
    );
}
function RouteWithSubRoutes(route) {
    return (
        <Route
            path={route.path}
            render={props => (
                // pass the sub-routes down to keep nesting
                <route.component {...props} routes={route.routes} />
            )}
        />
    );
}
