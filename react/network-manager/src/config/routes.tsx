import * as Pages from "../pages";

export interface Route {
    key: String
    title: String
    tooltip?: String
    path?: String
    element: React.ReactElement
    enabled: boolean
    index?: boolean
    subRoutes?: Array<Route>
    appendDivider?: boolean
}

export const routes: Array<Route> = [
    {
        key: "layout",
        title: "layout",
        tooltip: "Layout",
        path: "/",
        enabled: true,
        element: <Pages.Layout />,
        subRoutes: [
            {
                key: "home",
                title: "home",
                tooltip: "home",
                element: <Pages.Home />,
                enabled: true,
                index: true,
            },
            {
                key: "subnet",
                title: "Subnet",
                tooltip: "Subnet",
                path: "subnet/:subnetId",
                enabled: true,
                element: <Pages.Subnet />,
            },
        ]
    },
]

