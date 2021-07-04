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

const data = {
  data: {
    deal_sets: {
      deal_set: [
        {
          deals: {
            deal: [
              {
                parties: {
                  party: [
                    {
                      customer_transaction_id: "e171ec31-75b4-4fd6-ada1",
                      individual: {
                        contact_points: {
                          contact_point: [
                            {
                              contact_point_telephone: { value: "+1234567890" },
                              email: "test@test.com",
                            },
                          ],
                        },
                        name: { first: "John", last: "Deere" },
                      },
                      roles: {
                        role: [
                          {
                            borrower: {
                              birth_date: "01/01/1984",
                              employers: {
                                employer: [
                                  {
                                    employment: {
                                      end_date: null,
                                      position_description: null,
                                      start_date: "08/10/2016",
                                      status_type: "Current",
                                    },
                                    legal_entity: {
                                      full_name:
                                        "Amazing Community Pharmacy LLC",
                                    },
                                  },
                                ],
                              },
                              residences: {
                                residence: [
                                  {
                                    address: {
                                      additional_line_text: "None",
                                      city: "NEW YORK",
                                      country: "US",
                                      line_text: "33 IRVING PLACE",
                                      postal_code: "10003",
                                      state: "NY",
                                    },
                                  },
                                ],
                              },
                            },
                          },
                        ],
                      },
                      taxpayer_identifiers: {
                        taxpayer_identifier: [{ value: "317-21-0001" }],
                      },
                    },
                  ],
                },
                services: {
                  service: [
                    {
                      verification_of_employment: {
                        verification_of_employment_response: {
                          partner: "Wage",
                          partner_data_source_date: "06/29/2021",
                        },
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
    document_sets: {
      document_set: [
        {
          documents: {
            document: [
              {
                document_classification: {
                  document_classes: {
                    document_class: [
                      {
                        staircase_type: "Staircase",
                        type: "VerificationOfEmployment",
                      },
                    ],
                  },
                },
                foreign_objects: {
                  foreign_object: [
                    {
                      description:
                        "Employment Verification Report prepared by Staircase",
                      mime_type_identifier: "application/pdf",
                      name: "01F9CK08BQDECY73E3B2QJ9HPJ.pdf",
                      staircase_blob_id: "01F9CK08BQDECY73E3B2QJ9HPJ",
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  },
  metadata: {
    created_at: "2021-06-29T15:12:37.823526-04:00",
    dry_run: false,
    exclude_borrower: false,
    last_updated_at: "2021-07-04T12:32:23.645650-04:00",
    manual_verification: true,
    partner_name: "Wage",
    results: {
      info: "Verification is completed, please check response collection to see verification data",
      product: "Employment",
      status: "COMPLETED",
    },
    validation: false,
    verification_state: "COMPLETED",
  },
  transaction_id: "01F9CHBCQR3TVMJDGXKFKT8F41",
  collection_id: "01F9CK01XZEW44B3KVHQDG42HC",
};

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

  it("shows warning if requests to verify service has ACTION_NEEDED on response", async () => {
    useVerify.mockReturnValue({
      loading: false,
      errors: errorsMessageRetrieveCollection,
      verify: jest.fn().mockReturnValue({
        success: false,
        data: {
          ok: true,
          status: "ACTION_NEEDED",
          url: "www.test.com",
        },
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
        employment: {
          data,
        },
        income: {
          data,
        },
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
    expect(useHistory().push).toBeCalledWith("/report", {
      employment: data,
      income: data,
    });
  });
});
