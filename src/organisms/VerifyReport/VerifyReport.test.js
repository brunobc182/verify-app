import React from "react";
import { render, screen } from "@testing-library/react";

import VerifyReport from "./VerifyReport";

const title = "Employment";
const downloadButtonLabel = "Download Full Report";

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

describe("Verify Report", () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it("renders correctly", () => {
    render(<VerifyReport title={title} data={data} />);

    const submitButton = screen.getByRole("link", {
      name: downloadButtonLabel,
    });

    expect(screen.getByText(/Employment/)).toBeInTheDocument();
    expect(
      screen.getByText(/COMPLETED/, {
        exact: true,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Verification is completed, please check response collection to see verification data/
      )
    ).toBeInTheDocument();
    expect(screen.getByText(/06-29-2021/)).toBeInTheDocument();
    expect(screen.getByText(/07-04-2021/)).toBeInTheDocument();

    expect(submitButton).toBeInTheDocument();
    expect(submitButton.href).toBe(
      "data:text/json;charset=utf-8,%7B%22data%22%3A%7B%22deal_sets%22%3A%7B%22deal_set%22%3A%5B%7B%22deals%22%3A%7B%22deal%22%3A%5B%7B%22parties%22%3A%7B%22party%22%3A%5B%7B%22customer_transaction_id%22%3A%22e171ec31-75b4-4fd6-ada1%22%2C%22individual%22%3A%7B%22contact_points%22%3A%7B%22contact_point%22%3A%5B%7B%22contact_point_telephone%22%3A%7B%22value%22%3A%22%2B1234567890%22%7D%2C%22email%22%3A%22test%40test.com%22%7D%5D%7D%2C%22name%22%3A%7B%22first%22%3A%22John%22%2C%22last%22%3A%22Deere%22%7D%7D%2C%22roles%22%3A%7B%22role%22%3A%5B%7B%22borrower%22%3A%7B%22birth_date%22%3A%2201%2F01%2F1984%22%2C%22employers%22%3A%7B%22employer%22%3A%5B%7B%22employment%22%3A%7B%22end_date%22%3Anull%2C%22position_description%22%3Anull%2C%22start_date%22%3A%2208%2F10%2F2016%22%2C%22status_type%22%3A%22Current%22%7D%2C%22legal_entity%22%3A%7B%22full_name%22%3A%22Amazing%20Community%20Pharmacy%20LLC%22%7D%7D%5D%7D%2C%22residences%22%3A%7B%22residence%22%3A%5B%7B%22address%22%3A%7B%22additional_line_text%22%3A%22None%22%2C%22city%22%3A%22NEW%20YORK%22%2C%22country%22%3A%22US%22%2C%22line_text%22%3A%2233%20IRVING%20PLACE%22%2C%22postal_code%22%3A%2210003%22%2C%22state%22%3A%22NY%22%7D%7D%5D%7D%7D%7D%5D%7D%2C%22taxpayer_identifiers%22%3A%7B%22taxpayer_identifier%22%3A%5B%7B%22value%22%3A%22317-21-0001%22%7D%5D%7D%7D%5D%7D%2C%22services%22%3A%7B%22service%22%3A%5B%7B%22verification_of_employment%22%3A%7B%22verification_of_employment_response%22%3A%7B%22partner%22%3A%22Wage%22%2C%22partner_data_source_date%22%3A%2206%2F29%2F2021%22%7D%7D%7D%5D%7D%7D%5D%7D%7D%5D%7D%2C%22document_sets%22%3A%7B%22document_set%22%3A%5B%7B%22documents%22%3A%7B%22document%22%3A%5B%7B%22document_classification%22%3A%7B%22document_classes%22%3A%7B%22document_class%22%3A%5B%7B%22staircase_type%22%3A%22Staircase%22%2C%22type%22%3A%22VerificationOfEmployment%22%7D%5D%7D%7D%2C%22foreign_objects%22%3A%7B%22foreign_object%22%3A%5B%7B%22description%22%3A%22Employment%20Verification%20Report%20prepared%20by%20Staircase%22%2C%22mime_type_identifier%22%3A%22application%2Fpdf%22%2C%22name%22%3A%2201F9CK08BQDECY73E3B2QJ9HPJ.pdf%22%2C%22staircase_blob_id%22%3A%2201F9CK08BQDECY73E3B2QJ9HPJ%22%7D%5D%7D%7D%5D%7D%7D%5D%7D%7D%2C%22metadata%22%3A%7B%22created_at%22%3A%222021-06-29T15%3A12%3A37.823526-04%3A00%22%2C%22dry_run%22%3Afalse%2C%22exclude_borrower%22%3Afalse%2C%22last_updated_at%22%3A%222021-07-04T12%3A32%3A23.645650-04%3A00%22%2C%22manual_verification%22%3Atrue%2C%22partner_name%22%3A%22Wage%22%2C%22results%22%3A%7B%22info%22%3A%22Verification%20is%20completed%2C%20please%20check%20response%20collection%20to%20see%20verification%20data%22%2C%22product%22%3A%22Employment%22%2C%22status%22%3A%22COMPLETED%22%7D%2C%22validation%22%3Afalse%2C%22verification_state%22%3A%22COMPLETED%22%7D%2C%22transaction_id%22%3A%2201F9CHBCQR3TVMJDGXKFKT8F41%22%2C%22collection_id%22%3A%2201F9CK01XZEW44B3KVHQDG42HC%22%7D"
    );
  });
});
