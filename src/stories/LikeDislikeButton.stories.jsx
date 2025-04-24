/* eslint-disable import/no-extraneous-dependencies */
import { action } from "@storybook/addon-actions";
import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import LikeDislikeButton from "../components/LikeDislikeButton";
import { setupStore } from "../test-utils/renderWithProvider";

const stories = {
  title: "LikeDislikeButton",
  component: LikeDislikeButton,
  args: {
    onUpVote: action("onUpVote"),
    onDownVote: action("onDownVote"),
    onNeutralizeVote: action("onNeutralizeVote"),
  },
};

export default stories;

function withProviders(state) {
  return function decorators(Story) {
    return (
      <MemoryRouter>
        <Provider store={setupStore(state)}>
          <Story />
        </Provider>
      </MemoryRouter>
    );
  };
}

function Template(args) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <LikeDislikeButton {...args} />;
}

const authUser = {
  id: "YOUR_USER_ID",
  name: "YOUR_NAME",
  email: "example@example.com",
  avatar: "https://generated-image-url.jpg",
};

export const LoggedIn = Template.bind({});
LoggedIn.decorators = [withProviders({ authUser })];
LoggedIn.args = {
  upVotes: [],
  downVotes: [],
};

export const LoggedInLiked = Template.bind({});
LoggedInLiked.decorators = [withProviders({ authUser })];
LoggedInLiked.args = {
  upVotes: [authUser.id],
  downVotes: [],
};

export const LoggedInDisliked = Template.bind({});
LoggedInDisliked.decorators = [withProviders({ authUser })];
LoggedInDisliked.args = {
  upVotes: [],
  downVotes: [authUser.id],
};

export const LoggedOut = Template.bind({});
LoggedOut.decorators = [withProviders({ authUser: null })];
LoggedOut.args = {
  upVotes: [],
  downVotes: [],
};
