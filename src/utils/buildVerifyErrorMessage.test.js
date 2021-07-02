import { buildVerifyErrorMessage } from "./";

const errorResponse = {
  ok: false,
  data: {
    message: "Error message",
  },
};

const actionNeededResponse = {
  ok: true,
  data: {
    url: "www.test.com",
    status: "ACTION_NEEDED",
  },
};

describe("Build Verify Error Message", () => {
  it("returns default error message if income or employment responses is undefined", () => {
    expect(buildVerifyErrorMessage(undefined, undefined, "test")).toStrictEqual(
      [
        {
          title: "Internal Error",
          message: "An error has occurred, please try again later.",
          severity: "error",
        },
      ]
    );
  });

  it("returns  error message if only employment verify request fails", () => {
    expect(
      buildVerifyErrorMessage(
        errorResponse,
        { ...errorResponse, ok: true },
        "verify"
      )
    ).toStrictEqual([
      {
        title: "Verify Employment",
        message: "Error message",
        severity: "error",
      },
    ]);
  });

  it("returns error message if only income verify request fails", () => {
    expect(
      buildVerifyErrorMessage(
        { ...errorResponse, ok: true },
        errorResponse,
        "verify"
      )
    ).toStrictEqual([
      {
        title: "Verify Income",
        message: "Error message",
        severity: "error",
      },
    ]);
  });

  it("returns error messages if employment and income verify requests fails", () => {
    expect(
      buildVerifyErrorMessage(errorResponse, errorResponse, "verify")
    ).toStrictEqual([
      {
        title: "Verify Employment",
        message: "Error message",
        severity: "error",
      },
      {
        title: "Verify Income",
        message: "Error message",
        severity: "error",
      },
    ]);
  });

  it("returns warning message if employment has ACTION_NEEDED on response", () => {
    expect(
      buildVerifyErrorMessage(
        actionNeededResponse,
        { ...errorResponse, ok: true },
        "verify"
      )
    ).toStrictEqual([
      {
        title: "Verify Employment",
        message:
          "Please copy to clipboard the url by clicking on the button and forward it to the borrower.",
        severity: "warning",
        url: "www.test.com",
      },
    ]);
  });

  it("returns warning message if income has ACTION_NEEDED on response", () => {
    expect(
      buildVerifyErrorMessage(
        { ...errorResponse, ok: true },
        actionNeededResponse,
        "verify"
      )
    ).toStrictEqual([
      {
        title: "Verify Income",
        message:
          "Please copy to clipboard the url by clicking on the button and forward it to the borrower.",
        severity: "warning",
        url: "www.test.com",
      },
    ]);
  });

  it("returns error message if employment retrieve collection request fails", () => {
    expect(
      buildVerifyErrorMessage(
        errorResponse,
        { ...errorResponse, ok: true },
        "retrieveCollection"
      )
    ).toStrictEqual([
      {
        title: "Retrieve Employment Collection",
        message: "Error message",
        severity: "error",
      },
    ]);
  });

  it("returns error message if income retrieve collection request fails", () => {
    expect(
      buildVerifyErrorMessage(
        { ...errorResponse, ok: true },
        errorResponse,
        "retrieveCollection"
      )
    ).toStrictEqual([
      {
        title: "Retrieve Income Collection",
        message: "Error message",
        severity: "error",
      },
    ]);
  });

  it("returns error messages if employment and income retrieve collection requests fails", () => {
    expect(
      buildVerifyErrorMessage(
        errorResponse,
        errorResponse,
        "retrieveCollection"
      )
    ).toStrictEqual([
      {
        title: "Retrieve Employment Collection",
        message: "Error message",
        severity: "error",
      },
      {
        title: "Retrieve Income Collection",
        message: "Error message",
        severity: "error",
      },
    ]);
  });
});
