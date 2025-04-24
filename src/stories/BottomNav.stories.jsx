import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import BottomNav from "../components/BottomNav";
import { setupStore } from "../test-utils/renderWithProvider";

const stories = {
  title: "BottomNav",
  component: BottomNav,
};

export default stories;

function withProviders({ state, url }) {
  return function decorators(Story) {
    return (
      <MemoryRouter initialEntries={[url || "/"]}>
        <Provider store={setupStore(state || {})}>
          <Story />
        </Provider>
      </MemoryRouter>
    );
  };
}

function Template() {
  return <BottomNav />;
}

const authUser = {
  id: "john_doe",
  name: "John Doe",
  email: "john@example.com",
  avatar: "https://generated-image-url.jpg",
};

export const OnHomePageLoggedOut = Template.bind({});
OnHomePageLoggedOut.decorators = [
  withProviders({ state: { authUser: null }, url: "/" }),
];

export const OnLeaderboardPageLoggedOut = Template.bind({});
OnLeaderboardPageLoggedOut.decorators = [
  withProviders({ state: { authUser: null }, url: "/leaderboard" }),
];

export const OnOtherPageLoggedOut = Template.bind({});
OnOtherPageLoggedOut.decorators = [
  withProviders({ state: { authUser: null }, url: "/others" }),
];

export const OnHomePageLoggedIn = Template.bind({});
OnHomePageLoggedIn.decorators = [
  withProviders({ state: { authUser }, url: "/" }),
];

export const OnLeaderboardPageLoggedIn = Template.bind({});
OnLeaderboardPageLoggedIn.decorators = [
  withProviders({
    state: { authUser },
    url: "/leaderboard",
  }),
];

export const OnNewDiscussionPageLoggedIn = Template.bind({});
OnNewDiscussionPageLoggedIn.decorators = [
  withProviders({ state: { authUser }, url: "/new" }),
];

export const OnOtherPageLoggedIn = Template.bind({});
OnOtherPageLoggedIn.decorators = [
  withProviders({ state: { authUser }, url: "/others" }),
];
