import React from "react";
import {
  cleanup,
  render,
  screen,
  waitFor,
  fireEvent,
  act,
} from "@testing-library/react";

import VerifyForm from "./VerifyForm";

const transactionIDLabel = "Transaction ID";
const collectionIDLabel = "Collection ID";
const submitButtonLabel = "Verify";

const transactionErrorText = "Transaction ID is required";
const collectionErrorText = "Collection ID is required";

describe("Verify Form", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it("renders correctly with initial empty state", () => {
    const onSubmit = jest.fn();

    render(<VerifyForm onSubmit={onSubmit} loading={false} />);

    expect(screen.getByLabelText(transactionIDLabel)).toBeInTheDocument();
    expect(screen.getByLabelText(collectionIDLabel)).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: submitButtonLabel })
    ).toBeInTheDocument();
  });

  it("shows required validation error text correctly", async () => {
    const onSubmit = jest.fn();
    render(<VerifyForm onSubmit={onSubmit} loading={false} />);

    const submitButton = screen.getByRole("button", {
      name: submitButtonLabel,
    });

    act(() => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => submitButton);

    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByText(transactionErrorText)).toBeInTheDocument();
    expect(screen.getByText(collectionErrorText)).toBeInTheDocument();
  });

  it("shows loading when submits is in progress", async () => {
    const onSubmit = jest.fn();
    render(<VerifyForm onSubmit={onSubmit} loading={true} />);

    expect(screen.getByLabelText(transactionIDLabel)).toBeInTheDocument();
    expect(screen.getByLabelText(collectionIDLabel)).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toBeInTheDocument();

    expect(screen.queryByText(submitButtonLabel)).not.toBeInTheDocument();
  });

  it("submits forms correctly if all required fields were filled", async () => {
    const onSubmit = jest.fn();

    render(<VerifyForm onSubmit={onSubmit} loading={false} />);

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

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
