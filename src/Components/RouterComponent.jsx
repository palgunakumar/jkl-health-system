import React from "react";
  import Loading from "./Loading/loading";
import NotificationsSystem, {
  wyboTheme,
  dismissNotification,
  FadeTransition,
} from "reapop";
import { setUpNotifications } from "reapop";
import {  useDispatch, useSelector } from "react-redux";
import AppRoutes from "./Routes";
 
setUpNotifications({
  defaultProps: {
    title: "JKL Health Services",
    position: "top-right",
    dismissible: true,
    dismissAfter: 5000,
    showDismissButton: true,
  },
});
const RouterComponent = () => {
  const notifications = useSelector((state)   => state.notifications);

  const dispatch = useDispatch();
    
  return (
    <React.Suspense fallback={<Loading />}>
      <NotificationsSystem
        notifications={notifications}
        dismissNotification={(id) => dispatch(dismissNotification(id))}
        theme={wyboTheme}
        smallScreenBreakpoint
        components={{ Transition: FadeTransition }}
      /> 
      <AppRoutes />
    </React.Suspense>
  )
}
 
export default  RouterComponent; 