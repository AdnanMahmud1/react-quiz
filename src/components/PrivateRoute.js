// Version 1
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";

// export default function PrivateRoute({ component: Component, ...rest }) {
//   const { currentUser } = useAuth();


//   return currentUser? Component : <Navigate to="/login" />;
// //   return currentUser ? (
// //     <Navigate {...rest}>{(props) => <Component {...rest} />}</Navigate>
// //   ) : (
// //     <Navigate to="/login" />
// //   );
// }

 // version 2
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";

export default function PrivateRoute() {
    const {currentUser} =useAuth()
    return currentUser ? <Outlet /> : <Navigate to="/login" />;
}
