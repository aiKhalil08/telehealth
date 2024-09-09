import { RouteObject } from "react-router-dom";
import Layout from "./components/layout/Layout/Layout";
import Dashboard from "./components/pages/Dashboard/Dashboard";
import Consult from "./components/pages/Consult/Consult";
import Appointments from "./components/pages/Appointments/Appointments";
import Hospitals from "./components/pages/Hospitals/Hospitals";
import FindHospitals from "./components/pages/FindHospitals/FindHospitals";

const routes: RouteObject[] = [
    {
        path: '/',
        element: <Layout />,
        children: [
            {index: true, element: <Dashboard />},
            {path: 'consult', element: <Consult />},
            {path: 'appointments', element: <Appointments />},
            {path: 'history', element: <div>History</div>},
            {path: 'my-hospitals', element: <Hospitals />},
            {path: 'find', element: <FindHospitals />},
            {path: 'settings', element: <div>Settings</div>},
            {path: 'help', element: <div>Help</div>},
            {path: 'refer', element: <div>Refer</div>}
        ]
    }
];

export default routes;