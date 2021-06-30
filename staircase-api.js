const API_KEY = "5e4c2e71-9cad-40b5-a8fc-b3ff4c92660d";

const transaction = {
  transaction_id: "01F9CHBCQR3TVMJDGXKFKT8F41",
  created_at: "2021-06-29T14:43:52.184339-04:00",
};

const requestElements = {
  deal_sets: {
    deal_set: [
      {
        deals: {
          deal: [
            {
              parties: {
                party: [
                  {
                    customer_transaction_id: "e171ec31-75b4-4fd6-ada1-nesto",
                    individual: {
                      name: {
                        first: "John",
                        last: "Deere",
                      },
                      contact_points: {
                        contact_point: [
                          {
                            contact_point_telephone: {
                              value: "+1234567890",
                            },
                            email: "test@test.com",
                          },
                        ],
                      },
                    },
                    roles: {
                      role: [
                        {
                          borrower: {
                            birth_date: "01/01/1984",
                            employers: {
                              employer: [
                                {
                                  legal_entity: {
                                    full_name: "Uber",
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
                      taxpayer_identifier: [
                        {
                          value: "317-21-0001",
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
                      type: "BorrowerApproval",
                    },
                  ],
                },
              },
              foreign_objects: {
                foreign_object: [
                  {
                    description: "BorrowerApproval",
                    mime_type_identifier: "application/pdf",
                    name: "01F1Z5KG9E3CPD78P7GYB3TYC1.pdf",
                    staircase_blob_id: "01F1Z5KG9E3CPD78P7GYB3TYC1",
                  },
                ],
              },
            },
          ],
        },
      },
    ],
  },
};

const collection = {
  metadata: {
    validation: false,
    created_at: "2021-06-29T14:58:41.782454-04:00",
  },
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
                        name: {
                          first: "John",
                          last: "Deere",
                        },
                        contact_points: {
                          contact_point: [
                            {
                              contact_point_telephone: {
                                value: "+1234567890",
                              },
                              email: "test@test.com",
                            },
                          ],
                        },
                      },
                      roles: {
                        role: [
                          {
                            borrower: {
                              birth_date: "01/01/1984",
                              employers: {
                                employer: [
                                  {
                                    legal_entity: {
                                      full_name: "Uber",
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
                        taxpayer_identifier: [
                          {
                            value: "317-21-0001",
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
      ],
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
                          type: "BorrowerApproval",
                        },
                      ],
                    },
                  },
                  foreign_objects: {
                    foreign_object: [
                      {
                        description: "BorrowerApproval",
                        mime_type_identifier: "application/pdf",
                        name: "01F1Z5KG9E3CPD78P7GYB3TYC1.pdf",
                        staircase_blob_id: "01F1Z5KG9E3CPD78P7GYB3TYC1",
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
  },
  transaction_id: "01F9CHBCQR3TVMJDGXKFKT8F41",
  collection_id: "01F9CJ6HFPYBMP3W2F4XVWN4K2",
};

const collection_id_employment = "01F9CK01XZEW44B3KVHQDG42HC";
const collection_id_income = "01F9CKFG1755TCRV8P4P6RQ1SX";
