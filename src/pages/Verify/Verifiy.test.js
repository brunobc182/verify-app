import React from "react";
import {
  cleanup,
  render,
  screen,
  waitFor,
  fireEvent,
  act,
} from "@testing-library/react";
import { useHistory } from "react-router-dom";

import { useVerify } from "../../hooks";
import Verify from "./Verify";

jest.mock("react-router-dom", () => ({
  useHistory: jest.fn(),
}));

jest.mock("../../hooks", () => ({
  useVerify: jest.fn(),
}));

const transactionIDLabel = "Transaction ID";
const collectionIDLabel = "Collection ID";
const submitButtonLabel = "Verify";

const verifyEmploymentError = "Verify Employment";
const verifyIncomeError = "Verify Income";

const retrieveEmploymentCollectionError = "Retrieve Employment Collection";
const retrieveIncomeCollectionError = "Retrieve Income Collection";

const errorsMessageVerify = [
  {
    title: "Verify Employment",
    message: "Error message",
  },
  {
    title: "Verify Income",
    message: "Error message",
  },
];

const errorsMessageRetrieveCollection = [
  {
    title: "Retrieve Employment Collection",
    message: "Error message",
  },
  {
    title: "Retrieve Income Collection",
    message: "Error message",
  },
];

describe("Verify Form", () => {
  beforeEach(() => {
    useHistory.mockReturnValue({
      push: jest.fn(),
    });
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it("shows error if requests to verify service fails", async () => {
    useVerify.mockReturnValue({
      loading: false,
      errors: errorsMessageVerify,
      verify: jest.fn().mockReturnValue({
        success: false,
      }),
      clear: jest.fn(),
    });

    render(<Verify />);

    const transactionID = screen.getByLabelText(transactionIDLabel);
    const collectionID = screen.getByLabelText(collectionIDLabel);

    act(() => {
      fireEvent.change(transactionID, {
        target: { value: "A54A1F1G4A1FDR954ASXASD1" },
      });
    });

    act(() => {
      fireEvent.change(collectionID, {
        target: { value: "C1H4912384QAS8E283921482" },
      });
    });

    await waitFor(() => transactionID);
    await waitFor(() => collectionID);

    const submitButton = screen.getByRole("button", {
      name: submitButtonLabel,
    });

    act(() => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => submitButton);

    expect(screen.getByText(verifyEmploymentError)).toBeInTheDocument();
    expect(screen.getByText(verifyIncomeError)).toBeInTheDocument();
  });

  it("shows error if requests to retrieve collection service fails", async () => {
    useVerify.mockReturnValue({
      loading: false,
      errors: errorsMessageRetrieveCollection,
      verify: jest.fn().mockReturnValue({
        success: false,
      }),
      clear: jest.fn(),
    });

    render(<Verify />);

    const transactionID = screen.getByLabelText(transactionIDLabel);
    const collectionID = screen.getByLabelText(collectionIDLabel);

    act(() => {
      fireEvent.change(transactionID, {
        target: { value: "A54A1F1G4A1FDR954ASXASD1" },
      });
    });

    act(() => {
      fireEvent.change(collectionID, {
        target: { value: "C1H4912384QAS8E283921482" },
      });
    });

    await waitFor(() => transactionID);
    await waitFor(() => collectionID);

    const submitButton = screen.getByRole("button", {
      name: submitButtonLabel,
    });

    act(() => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => submitButton);

    expect(
      screen.getByText(retrieveEmploymentCollectionError)
    ).toBeInTheDocument();
    expect(screen.getByText(retrieveIncomeCollectionError)).toBeInTheDocument();
  });

  it("navigates to Report page when requests has succeed", async () => {
    useVerify.mockReturnValue({
      loading: false,
      errors: null,
      verify: jest.fn().mockReturnValue({
        success: true,
      }),
      clear: jest.fn(),
    });

    render(<Verify />);

    const transactionID = screen.getByLabelText(transactionIDLabel);
    const collectionID = screen.getByLabelText(collectionIDLabel);

    act(() => {
      fireEvent.change(transactionID, {
        target: { value: "A54A1F1G4A1FDR954ASXASD1" },
      });
    });

    act(() => {
      fireEvent.change(collectionID, {
        target: { value: "C1H4912384QAS8E283921482" },
      });
    });

    await waitFor(() => transactionID);
    await waitFor(() => collectionID);

    const submitButton = screen.getByRole("button", {
      name: submitButtonLabel,
    });

    act(() => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => submitButton);

    expect(useHistory().push).toBeCalledTimes(1);
    expect(useHistory().push).toBeCalledWith("/report");
  });
});
