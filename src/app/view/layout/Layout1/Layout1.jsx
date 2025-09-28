import { Suspense, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import IdleTimer from "react-idle-timer";
import Layout1Sidenav from "./Layout1Sidenav";
import Layout1Header from "./Layout1Header";
import Footer from "../SharedComponents/Footer";
import { classList } from "../../../utils/@utils";
import { setLayoutSettings } from "app/redux/actions/LayoutActions";
import { logoutUser } from "app/redux/actions/LoginActions";
import Loading from "../../../components/GullLoadable/Loading";
import { BasicModal } from "../../../components";
import { NotificationContainer } from "react-notifications";
import { getLangText } from "app/utils/@lang";

let countdownInterval;
let timeoutHandle;

export default function Layout1() {
  const dispatch = useDispatch();

  // Redux state
  const settings = useSelector((state) => state.layout.settings);
  const language = useSelector((state) => state.language);

  // Local state
  const [sessionShow, setSessionShow] = useState(false);
  const [countDown, setCountDown] = useState(0);
  const timeout = window.Configs?.IDIE_TIME
    ? window.Configs.IDIE_TIME * 1000
    : 5 * 60 * 1000; // fallback 5 phút

  // IdleTimer handlers
  const clearSessionTimeout = () => clearTimeout(timeoutHandle);
  const clearSessionInterval = () => clearInterval(countdownInterval);

  const onActive = () => {
    if (!sessionShow) {
      clearSessionInterval();
      clearSessionTimeout();
    }
  };

  const onIdle = () => {
    if (!sessionShow) {
      timeoutHandle = setTimeout(() => {
        let cd = 10;
        setSessionShow(true);
        setCountDown(cd);

        countdownInterval = setInterval(() => {
          if (cd > 0) {
            setCountDown(--cd);
          } else {
            clearSessionInterval();
            clearSessionTimeout();
            dispatch(logoutUser());
          }
        }, 1000);
      }, 1000);
    }
  };

  const handleClose = () => setSessionShow(false);

  const handleContinue = () => {
    setSessionShow(false);
    setCountDown(0);
    clearSessionInterval();
    clearSessionTimeout();
  };

  return (
    <div className="app-admin-wrap layout-sidebar-large">
      <Layout1Header />
      <Layout1Sidenav />

      <div
        className={classList({
          "main-content-wrap d-flex flex-column": true,
          "sidenav-open": settings.layout1Settings.leftSidebar.open,
        })}
      >
        <Suspense fallback={<Loading />}>
          <NotificationContainer />
          <div className="main-content">
            {/* 👉 React Router v6 thay renderRoutes bằng <Outlet /> */}
            <Outlet />
          </div>
        </Suspense>

        <IdleTimer
          onActive={onActive}
          onIdle={onIdle}
          debounce={250}
          timeout={timeout}
        />

        <BasicModal
          show={sessionShow}
          title={getLangText("sessiontimeout", language.lang)}
          bodyText={
            getLangText("sessiontimeoutwarning", language.lang) + countDown
          }
          handleClose={handleClose}
          handleAccept={handleContinue}
          acceptText={getLangText("keepsession", language.lang)}
          closeText={getLangText("close", language.lang)}
        />

        {settings.footer.show && <Footer />}
      </div>
    </div>
  );
}
