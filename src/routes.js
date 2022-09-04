/*!

=========================================================
* Paper Dashboard React - v1.3.1
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import TableList from "views/Tables.js";
import UserPage from "views/User.js";
import UpgradeToPro from "views/Upgrade.js";
import Places from "views/Places";
import PlaceDetail from "views/Places/detail"
import AddPlace from 'views/Places/add'
import Gallery from "views/Gallery";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
    sidebar: true
  },
  {
    path: "/places",
    name: "Tambal Ban",
    icon: "nc-icon nc-pin-3",
    component: Places,
    layout: "/admin",
    sidebar: true
  },
  {
    path: "/place/detail/:id",
    name: "Tambal Ban",
    component: PlaceDetail,
    layout: "/admin",
    sidebar: false
  },
  {
    path: "/place/add",
    name: "Tambal Ban",
    component: AddPlace,
    layout: "/admin",
    sidebar: false
  },
  {
    path: "/gallery",
    name: "Gallery",
    icon: "nc-icon nc-album-2",
    component: Gallery,
    layout: "/admin",
    sidebar: true
  },
  {
    path: "/user-page",
    name: "User Profile",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/admin",
    sidebar: true
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-diamond",
    component: Icons,
    layout: "/admin",
    sidebar: true
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: Notifications,
    layout: "/admin",
    sidebar: true
  },
  {
    path: "/tables",
    name: "Table List",
    icon: "nc-icon nc-tile-56",
    component: TableList,
    layout: "/admin",
    sidebar: true
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "nc-icon nc-caps-small",
    component: Typography,
    layout: "/admin",
    sidebar: true
  },
  {
    pro: true,
    path: "/upgrade",
    name: "Upgrade to PRO",
    icon: "nc-icon nc-spaceship",
    component: UpgradeToPro,
    layout: "/admin",
    sidebar: true
  }
];
export default routes;
