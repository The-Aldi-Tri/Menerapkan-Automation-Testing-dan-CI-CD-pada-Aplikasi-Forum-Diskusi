import { configureStore } from "@reduxjs/toolkit";
/* eslint-disable import/no-extraneous-dependencies */
import { render } from "@testing-library/react";
import PropTypes from "prop-types";
import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import { rootReducer } from "../states";

export const setupStore = (preloadedState = {}) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
  });

export function renderWithProvider(ui, extendedRenderOptions = {}) {
  const {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  } = extendedRenderOptions;

  // MemoryRouter: to be able to use react-router
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <MemoryRouter>{children}</MemoryRouter>
      </Provider>
    );
  }
  Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
  };

  // Return an object with the store and all of RTL's query functions
  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}
