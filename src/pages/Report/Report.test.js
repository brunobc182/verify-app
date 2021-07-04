import React from "react";
import { render } from "@testing-library/react";
import { useHistory } from "react-router-dom";

import Report from "./Report";

jest.mock("react-router-dom", () => ({
  useHistory: jest.fn(),
}));

describe("Verify Report", () => {
  beforeEach(() => {
    useHistory.mockReturnValue({
      push: jest.fn(),
      replace: jest.fn(),
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it("redirets to Verify Page if location state don't have employment and income data", () => {
    render(<Report />);

    expect(useHistory().replace).toBeCalledTimes(1);
    expect(useHistory().replace).toBeCalledWith("/");
  });
});
