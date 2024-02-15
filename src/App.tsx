import React, { useEffect, useState } from "react";

import "./App.css";
import PrivateRoute from "./utils/PrivateRoute";
import OverlayLoader from "./components/OverlayLoader/OverlayLoader";

import { useDispatch, useSelector } from "react-redux";
import { setPageSettings } from "./store/slices/settingsSlice";
import SettingsService from "./services/SettingsService";
import { Helmet } from "react-helmet";
import Router from "./routes/Router";

function App() {
  const settings = useSelector((state: any) => state.settings.setting);
  const dispatch = useDispatch();
  const handleSetPageSettings = async () => {
    const response = await SettingsService.getById(1);
    dispatch(setPageSettings(response.data.data));
  };

  useEffect(() => {
    handleSetPageSettings();
  }, []);

  if (!settings) return <div>Şeyhmus will be modify here .. :)</div>;

  return (
    <>
      <Helmet>
        <title>{settings.title}</title>
        <link rel="icon" href={settings.logo} />
      </Helmet>
      <main>
        <OverlayLoader />
        <Router />
      </main>
    </>
  );
}

export default App;
