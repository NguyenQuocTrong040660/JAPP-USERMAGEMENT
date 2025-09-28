import { Suspense, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import AppContext from "app/appContext";
import { setLayoutSettings, setDefaultSettings } from "app/redux/actions/LayoutActions";
import { GullLayouts } from ".";

export default function GullLayout({ route, matched }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const appContext = useContext(AppContext);

  // Lấy state từ Redux
  const settings = useSelector((state) => state.layout.settings);
  const activeLayout = settings.activeLayout;
  const defaultSettings = useSelector((state) => state.layout.defaultSettings);

  // Khi location thay đổi
  useEffect(() => {
    // initCodeViewer();
    // updateSettingsFromRouter();
  }, [location]);

  // Khi component mount, set dir
  useEffect(() => {
    const initAppDirection = () => {
      setTimeout(() => {
        document.documentElement.setAttribute("dir", settings.dir);
      });
    };
    initAppDirection();
  }, [settings.dir]);

  let Layout = GullLayouts[activeLayout];

  return (
    <Suspense>
      <Layout routes={route?.routes} matched={matched} />
    </Suspense>
  );
}

GullLayout.propTypes = {
  route: PropTypes.object,
  matched: PropTypes.any,
};
